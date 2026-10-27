import { test, expect } from "@playwright/test";
async function start(page, game = "Vampiro: A Máscara") {
  await page.goto("/");
  await page
    .getByRole("button", { name: "Criar personagem", exact: false })
    .click();
  await page.getByLabel(game, { exact: true }).check();
  await page.getByRole("button", { name: "Começar criação" }).click();
}
async function resources(page) {
  await page
    .getByRole("button", { name: "Vínculos e recursos", exact: false })
    .click();
}
test("nove temas com prévia, persistência e escolha independente do jogo", async ({
  page,
}, info) => {
  await page.goto("/");
  const select = page.getByLabel("Tema visual");
  expect(await select.locator("option").count()).toBe(9);
  for (const theme of [
    "minimal",
    "neon",
    "horror",
    "medieval",
    "vampire",
    "werewolf",
    "paper",
    "contrast",
  ]) {
    await select.selectOption(theme);
    await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
  }
  await select.selectOption("neon");
  await page.reload();
  await expect(select).toHaveValue("neon");
  await page.getByRole("button", { name: "Explorar estilos visuais" }).click();
  const modal = page.getByRole("dialog");
  await expect(modal.getByRole("radio")).toHaveCount(9);
  await modal
    .getByRole("radio", {
      name: "Medieval · pergaminho e brasões",
      exact: false,
    })
    .check();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "medieval");
  await page.keyboard.press("Escape");
  await start(page, "Lobisomem: O Apocalipse");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "medieval");
  await page.getByText("Mais ações", { exact: true }).click();
  await page.getByLabel("Tema visual").selectOption("auto");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "werewolf");
  await page.getByLabel("Tema visual").selectOption("minimal");
  await page.getByText("Mais ações", { exact: true }).click();
  await page.setViewportSize({ width: 390, height: 844 });
  expect(
    await page.locator("body").evaluate((el) => el.scrollWidth <= innerWidth),
  ).toBe(true);
  await page.screenshot({
    path: info.outputPath("minimal-mobile.png"),
    fullPage: true,
  });
  const c = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("whitewolf_draft_v2")!),
  );
  expect(c.theme).toBeUndefined();
});
test("convicções, crônica, sessão zero e XP sobrevivem à exportação e importação", async ({
  page,
}, info) => {
  await start(page);
  await resources(page);
  await page.getByRole("tab", { name: "Vínculos", exact: true }).click();
  await page
    .getByRole("button", { name: "Adicionar Convicção e Pilar" })
    .click();
  await page
    .getByLabel("Convicção 1", { exact: true })
    .fill("Proteja quem depende de você");
  await page.getByLabel("Pilar ligado à Convicção 1").fill("Ana, irmã");
  await page.getByRole("tab", { name: "Crônica", exact: true }).click();
  await page.getByLabel("Coterie", { exact: true }).fill("Os Vigias");
  await page.getByRole("tab", { name: "Sessão zero", exact: true }).click();
  await page.getByLabel("Tom da crônica").fill("Horror pessoal");
  await page.getByRole("tab", { name: "Experiência", exact: true }).click();
  await page.getByLabel("Quantidade de XP").fill("10");
  await page.getByLabel("Descrição do registro").fill("Sessão 1");
  await page.getByRole("button", { name: "Registrar XP" }).click();
  await expect(page.getByText("Saldo: 10 XP", { exact: true })).toBeVisible();
  await page.getByLabel("Movimentação").selectOption("spent");
  await page.getByLabel("Quantidade de XP").fill("11");
  await page.getByLabel("Descrição do registro").fill("Melhoria");
  await page.getByRole("button", { name: "Registrar XP" }).click();
  await expect(page.getByRole("alert")).toContainText("XP insuficiente");
  await page.getByLabel("Quantidade de XP").fill("3");
  await page.getByRole("button", { name: "Registrar XP" }).click();
  await expect(page.getByText("Saldo: 7 XP", { exact: true })).toBeVisible();
  await page.getByText("Mais ações", { exact: true }).click();
  const downloadPromise = page.waitForEvent("download");
  await page
    .getByRole("button", { name: "Exportar JSON", exact: true })
    .click();
  const download = await downloadPromise;
  const file = info.outputPath("story.json");
  await download.saveAs(file);
  await page.reload();
  await page.locator("input[type=file]").first().setInputFiles(file);
  const c = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("whitewolf_draft_v2")!),
  );
  expect(c.convictions[0].touchstone).toBe("Ana, irmã");
  expect(c.chronicle.group).toBe("Os Vigias");
  expect(c.sessionZero.tone).toBe("Horror pessoal");
  expect(c.experience.map((e) => e.amount)).toEqual([10, 3]);
});
test("W5 usa Pilares próprios e NPC tem narrativa editável e ficha compacta funcional", async ({
  page,
}) => {
  await start(page, "Lobisomem: O Apocalipse");
  await resources(page);
  await page.getByRole("tab", { name: "Vínculos", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Adicionar Convicção e Pilar" }),
  ).toHaveCount(0);
  await page
    .getByRole("button", { name: "Adicionar Pilar", exact: true })
    .click();
  await page.getByLabel("Pilar 1", { exact: true }).fill("Miguel");
  await page.getByLabel("Relação", { exact: true }).fill("Vizinho");
  await page.reload();
  await page.getByRole("button", { name: "Criar NPC", exact: false }).click();
  await page.getByRole("button", { name: "Gerar NPC", exact: true }).click();
  await resources(page);
  await page.getByRole("tab", { name: "Vínculos", exact: true }).click();
  await page
    .getByRole("tab", { name: "Narrativa do NPC", exact: true })
    .click();
  await page
    .getByLabel("Segredo", { exact: true })
    .fill("Conhece o refúgio do rival");
  await page.getByRole("button", { name: "Revisar pendências" }).click();
  await page
    .getByRole("radio", { name: "Ficha compacta", exact: true })
    .check();
  await expect(
    page.getByRole("article", { name: "Ficha compacta" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Aumentar Fome" }).click();
  await expect(page.getByLabel("Fome atual")).toContainText("2 / 5");
  await page.getByText("Narrativa do NPC", { exact: true }).click();
  await expect(
    page.getByText("Conhece o refúgio do rival", { exact: true }),
  ).toBeVisible();
  await page
    .getByRole("radio", { name: "Ficha completa", exact: true })
    .check();
});
test("ritual inicial selecionável e novos dados inválidos rejeitados", async ({
  page,
}) => {
  await page.goto("/");
  const c = await page.evaluate(async () => {
    const { oInitialCharacter } = await import("/constants.ts");
    return {
      ...structuredClone(oInitialCharacter),
      gameType: "Vampire",
      clan: "tremere",
      disciplines: { bloodsorcery: 1 },
      disciplinePowers: {},
    };
  });
  await page
    .locator("input[type=file]")
    .first()
    .setInputFiles({
      name: "ritual.json",
      mimeType: "application/json",
      buffer: Buffer.from(JSON.stringify(c)),
    });
  await page.getByRole("button", { name: "Poderes", exact: false }).click();
  await page
    .getByRole("tab", { name: "Rituais de Sangue", exact: true })
    .click();
  const picker = page.getByRole("region", {
    name: "Ritual inicial de Feitiçaria de Sangue",
    exact: true,
  });
  await picker.getByRole("button", { name: "Escolher", exact: true }).click();
  await picker.getByRole("searchbox").fill("Caminhada");
  await picker
    .locator("li")
    .getByRole("button", { name: "Escolher", exact: true })
    .click();
  await expect(
    picker.getByText("Caminhada pelo Sangue", { exact: true }),
  ).toBeVisible();
  const r = await page.evaluate(async () => {
    const { parseCharacter } = await import("/lib/characterValidation.ts");
    const c = JSON.parse(localStorage.getItem("whitewolf_draft_v2")!);
    let rejected = 0;
    for (const patch of [
      { convictions: [null] },
      { sessionZero: [] },
      { chronicle: { group: 2 } },
      {
        experience: [
          {
            id: "bad",
            kind: "spent",
            amount: 10,
            date: "2026-10-27",
            note: "Sem saldo",
          },
        ],
      },
    ])
      try {
        parseCharacter({ ...c, ...patch });
      } catch {
        rejected++;
      }
    return { rejected, rituals: c.rituals };
  });
  expect(r.rejected).toBe(4);
  expect(r.rituals).toHaveLength(1);
});
