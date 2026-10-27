import { test, expect } from "@playwright/test";
async function start(page, game = "Vampiro: A Máscara") {
  await page.addInitScript(() =>
    localStorage.setItem("whitewolf_locale", "pt"),
  );
  await page.goto("/");
  await page
    .getByRole("button", { name: "Criar personagem", exact: false })
    .click();
  await page.getByLabel(game, { exact: true }).check();
  await page.getByRole("button", { name: "Começar criação" }).click();
}
test("seis etapas, navegação livre e pendências levam à escolha certa", async ({
  page,
}) => {
  await start(page);
  await page.locator("#char-name").fill("Rascunho intuitivo");
  await page.locator("#char-concept").fill("");
  await page.getByRole("button", { name: "Continuar", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Brujah", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Revisar pendências" }).click();
  await expect(
    page.getByRole("button", { name: "Concluir criação" }),
  ).toBeDisabled();
  const issue = page
    .getByRole("listitem")
    .filter({ hasText: "Preencha nome e conceito." });
  await issue.getByRole("button", { name: "Resolver" }).click();
  await expect(page.locator("#char-name")).toHaveValue("Rascunho intuitivo");
  await page.getByRole("button", { name: "Capacidades", exact: false }).click();
  await page.getByRole("tab", { name: "Perícias", exact: true }).click();
  await page.getByRole("button", { name: "Poderes", exact: false }).click();
  await expect(page.getByRole("tab", { name: "Alimentação" })).toBeVisible();
  await expect(
    page.getByText("Rascunho salvo neste navegador", { exact: true }),
  ).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Continuar personagem" }),
  ).toContainText("Rascunho intuitivo");
  await page.getByRole("button", { name: "Continuar personagem" }).click();
  await expect(page.getByRole("tab", { name: "Alimentação" })).toBeVisible();
  await page.getByRole("button", { name: "Identidade", exact: false }).click();
  await expect(page.locator("#char-name")).toHaveValue("Rascunho intuitivo");
});
test("Sangue-Fraco exibe escolhas condicionais e não oferece alimentação", async ({
  page,
}) => {
  await start(page);
  await page.getByRole("button", { name: "Natureza", exact: false }).click();
  await page.getByRole("button", { name: /Sangue.Fraco/, exact: true }).click();
  await page.getByRole("button", { name: "Poderes", exact: false }).click();
  await expect(page.getByRole("tab", { name: "Alimentação" })).toHaveCount(0);
  const merits = page.getByRole("region", {
    name: "Méritos de Sangue-Fraco",
    exact: true,
  });
  await merits.getByRole("button", { name: "Escolher", exact: true }).click();
  await merits.getByRole("searchbox").fill("alquimista");
  await merits
    .locator("li")
    .getByRole("button", { name: "Escolher", exact: true })
    .click();
  await expect(page.getByText(/Na seção Disciplinas e fórmulas/)).toBeVisible();
  await merits.getByRole("searchbox").fill("semelhança");
  await merits
    .locator("li")
    .getByRole("button", { name: "Escolher", exact: true })
    .click();
  const flaws = page.getByRole("region", {
    name: "Defeitos de Sangue-Fraco",
    exact: true,
  });
  await flaws.getByRole("button", { name: "Escolher", exact: true }).click();
  await flaws.getByRole("searchbox").fill("Carne Morta");
  await expect(flaws.getByText("Carne Morta", { exact: true })).toHaveCount(0);
  await flaws.getByLabel("Mostrar indisponíveis").check();
  await expect(
    flaws.locator("li").getByRole("button", { name: "Escolher", exact: true }),
  ).toBeDisabled();
});
test("W5: tribo, augúrio, Rito pesquisável e Renome sem Disciplinas", async ({
  page,
}) => {
  await start(page, "Lobisomem: O Apocalipse");
  await page.getByRole("button", { name: "Natureza", exact: false }).click();
  await page
    .getByRole("button", { name: "Fúrias Negras", exact: true })
    .click();
  await page.getByRole("tab", { name: "Augúrio", exact: true }).click();
  await page.getByRole("button", { name: "Ahroun", exact: true }).click();
  await page.getByRole("button", { name: "Poderes", exact: false }).click();
  await expect(
    page.getByRole("tab", { name: "Disciplinas e poderes" }),
  ).toHaveCount(0);
  await page.getByRole("tab", { name: "Rito", exact: true }).click();
  const rites = page.getByRole("region", { name: "Rito inicial", exact: true });
  await rites.getByRole("button", { name: "Escolher", exact: true }).click();
  await rites.getByRole("searchbox").fill("Dedicação");
  await rites
    .locator("li")
    .getByRole("button", { name: "Escolher", exact: true })
    .click();
  await expect(
    rites.getByText("Rito de Dedicação", { exact: true }),
  ).toBeVisible();
  await page.getByRole("tab", { name: "Renome", exact: true }).click();
  await page
    .getByLabel("Onde colocar o ponto adicional?")
    .selectOption("wisdom");
  const c = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("whitewolf_draft_v2")!),
  );
  expect(c.renown).toEqual({ glory: 2, honor: 0, wisdom: 1 });
  expect(c.rituals[0].id).toBe("w5-rite-dedication");
});
test("recursos com busca, custo editável e Loresheets em seção própria", async ({
  page,
}) => {
  await start(page);
  await page
    .getByRole("button", { name: "Vínculos e recursos", exact: false })
    .click();
  const picker = page.getByRole("region", { name: "Vantagens", exact: true });
  await picker.getByRole("button", { name: "Escolher", exact: true }).click();
  await picker.getByRole("searchbox").fill("Aliados");
  await picker
    .locator("li")
    .getByRole("button", { name: "Escolher", exact: true })
    .click();
  await picker.getByLabel("Pontos de Aliados").selectOption("3");
  await expect(page.getByText("3 / 7 pontos", { exact: true })).toBeVisible();
  await page.getByRole("tab", { name: "Loresheets", exact: true }).click();
  await expect(
    page.getByRole("region", { name: "Loresheets", exact: true }),
  ).toBeVisible();
});
test("NPC: papel solicitado, conclusão e arquivos acessíveis no celular", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Criar NPC", exact: false }).click();
  await page.getByLabel("Papel narrativo").selectOption("Guardião de um culto");
  await page.getByLabel("Influência na história").selectOption("ancilla");
  await page.getByRole("button", { name: "Gerar NPC" }).click();
  await expect(
    page.getByText("Guardião de um culto · influente", { exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Concluir criação" }).click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Salvar", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Criação concluída" }),
  ).toBeVisible();
  await page.getByText("Mais ações", { exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Exportar JSON", exact: true }),
  ).toBeVisible();
  expect(
    await page.locator("body").evaluate((el) => el.scrollWidth <= innerWidth),
  ).toBe(true);
});
