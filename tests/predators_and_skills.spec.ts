import { test, expect } from "@playwright/test";
async function start(page) {
  await page.goto("/");
  await page
    .getByRole("button", { name: "Criar personagem", exact: false })
    .click();
  await page.getByRole("button", { name: "Começar criação" }).click();
  await page.getByRole("button", { name: "Poderes", exact: false }).click();
}
async function choosePredator(page, name) {
  const region = page.getByRole("region", {
    name: "Tipo de predador",
    exact: true,
  });
  await region
    .getByRole("button", { name: /Escolher|Trocar \/ adicionar/ })
    .click();
  await region.getByRole("searchbox").fill(name);
  await region
    .locator("li")
    .getByRole("button", { name: "Escolher", exact: true })
    .click();
}
test("34 predadores dos três livros, todos disponíveis sem filtro comunitário", async ({
  page,
}) => {
  await start(page);
  const region = page.getByRole("region", {
    name: "Tipo de predador",
    exact: true,
  });
  await region.getByRole("button", { name: "Escolher", exact: true }).click();
  await expect(region.getByLabel("Incluir material comunitário")).toHaveCount(
    0,
  );
  await expect(region.locator("li")).toHaveCount(34);
  const data = await page.evaluate(async () => {
    const { fnGetPredatorTypes } = await import("/constants.ts");
    return fnGetPredatorTypes((k) => k).map((p) => ({
      id: p.id,
      source: p.source,
      options: p.disciplineOptions,
    }));
  });
  expect(new Set(data.map((p) => p.id)).size).toBe(34);
  expect(
    data.filter(
      (p) => p.source.includes("Guia 02") || p.source.includes("Guide 02"),
    ),
  ).toHaveLength(18);
  expect(data.filter((p) => p.source.includes("Guide 01"))).toHaveLength(6);
  expect(data.every((p) => p.options.length === 2)).toBe(true);
  for (const row of data) {
    await region.getByRole("searchbox").fill("");
    const translated = await page.evaluate(async (id) => {
      const { fnGetPredatorTypes } = await import("/constants.ts");
      return fnGetPredatorTypes((k) => k).find((p) => p.id === id).name;
    }, row.id);
    expect(translated).not.toContain("[Comunitário");
  }
});
test("troca de predador, Disciplina e alocação não acumula benefícios", async ({
  page,
}) => {
  await start(page);
  await choosePredator(page, "Extorsionário");
  await page.getByLabel("Disciplina concedida").selectOption("potence");
  await page.getByLabel("Contatos e Recursos").selectOption("1");
  let c = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("whitewolf_draft_v2")!),
  );
  expect(c.disciplines.potence).toBe(1);
  expect(c.disciplines.dominate).toBeUndefined();
  expect(c.advantages.map((a) => [a.id, a.cost])).toEqual([
    ["extortionist_contacts", 1],
    ["extortionist_resources", 2],
  ]);
  await choosePredator(page, "Ceifador");
  await page
    .getByLabel("Rede na comunidade médica")
    .selectOption("grimreaper_influence");
  c = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("whitewolf_draft_v2")!),
  );
  expect(c.humanity).toBe(8);
  expect(c.advantages).toHaveLength(1);
  expect(c.advantages[0].id).toBe("grimreaper_influence");
  expect(c.disciplines.potence).toBeUndefined();
  await choosePredator(page, "Monteiro");
  c = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("whitewolf_draft_v2")!),
  );
  expect(c.humanity).toBe(6);
  expect(c.advantages).toHaveLength(1);
  expect(c.advantages[0].cost).toBe(2);
  const downloadPromise = page.waitForEvent("download");
  await page.getByText("Mais ações", { exact: true }).click();
  await page.getByRole("button", { name: "Exportar JSON" }).click();
  expect((await downloadPromise).suggestedFilename()).toMatch(/\.json$/);
});
test("todos os pacotes suportam aplicação, remoção e importação sem perder os pontos base", async ({
  page,
}) => {
  await page.goto("/");
  const result = await page.evaluate(async () => {
    const { fnGetPredatorTypes, oInitialCharacter } = await import(
      "/constants.ts"
    );
    const { changePredator } = await import("/lib/predatorRules.ts");
    const { parseCharacter } = await import("/lib/characterValidation.ts");
    const catalogue = fnGetPredatorTypes((k) => k);
    const errors = [];
    for (const p of catalogue) {
      let base = structuredClone(oInitialCharacter);
      base.gameType = "Vampire";
      base.clan = "tremere";
      base.disciplines = { auspex: 2 };
      for (const discipline of p.disciplineOptions) {
        let c = changePredator(base, catalogue, p.id, {
          predatorDiscipline: discipline,
        });
        c = changePredator(c, catalogue, p.id, {
          predatorDiscipline: discipline,
        });
        try {
          parseCharacter(c);
        } catch (e) {
          errors.push(String(e));
        }
        const cleared = changePredator(c, catalogue, "");
        if (
          JSON.stringify(cleared.disciplines) !==
            JSON.stringify(base.disciplines) ||
          cleared.humanity !== 7 ||
          cleared.bloodPotency !== 1 ||
          cleared.advantages.length ||
          cleared.flaws.length
        )
          errors.push(p.id);
      }
    }
    return errors;
  });
  expect(result).toEqual([]);
});
test("Perícias começam pela escolha explícita do pacote e preservam a decisão no rascunho", async ({
  page,
}) => {
  await start(page);
  await page.getByRole("button", { name: "Capacidades", exact: false }).click();
  await page.getByRole("tab", { name: "Perícias", exact: true }).click();
  await expect(
    page.getByText(
      "Selecione Generalista, Equilibrado ou Especialista para abrir a distribuição. Seus pontos existentes serão preservados se forem compatíveis.",
    ),
  ).toBeVisible();
  await page.getByLabel("Especialista", { exact: false }).check();
  await expect(page.getByText(/Falta distribuir: 1 de 4/)).toBeVisible();
  const data = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("whitewolf_draft_v2")!),
  );
  expect(data.skillPath).toBe("specialist");
  await page.reload();
  await page.getByRole("button", { name: "Continuar personagem" }).click();
  await expect(page.getByLabel("Especialista", { exact: false })).toBeChecked();
});

test("troca de pacote incompatível pede confirmação, sem apagar pontos ao cancelar", async ({
  page,
}) => {
  await start(page);
  await page.getByRole("button", { name: "Capacidades", exact: false }).click();
  await page.getByRole("tab", { name: "Perícias", exact: true }).click();
  await page.getByLabel("Especialista", { exact: false }).check();
  await page
    .getByRole("button", { name: /Atletismo/ })
    .last()
    .click();
  await page
    .getByRole("dialog")
    .locator("button")
    .filter({ has: page.locator("span.text-xl").filter({ hasText: /^4$/ }) })
    .click();
  page.once("dialog", (d) => d.dismiss());
  await page.getByLabel("Generalista", { exact: false }).click();
  await expect(page.getByLabel("Especialista", { exact: false })).toBeChecked();
  expect(
    await page.evaluate(
      () =>
        JSON.parse(localStorage.getItem("whitewolf_draft_v2")!).skills
          .Athletics,
    ),
  ).toBe(4);
  page.once("dialog", (d) => d.accept());
  await page.getByLabel("Generalista", { exact: false }).click();
  await expect(page.getByLabel("Generalista", { exact: false })).toBeChecked();
  expect(
    await page.evaluate(
      () =>
        JSON.parse(localStorage.getItem("whitewolf_draft_v2")!).skills
          .Athletics,
    ),
  ).toBe(0);
});
