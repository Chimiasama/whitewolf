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
  await page.getByRole("tab", { name: "Habilidades", exact: true }).click();
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
test("Sangue-Ralo exibe escolhas condicionais e não oferece alimentação", async ({
  page,
}) => {
  await start(page);
  await page.getByRole("button", { name: "Natureza", exact: false }).click();
  await page.getByRole("button", { name: /Sangue.Ralo/, exact: true }).click();
  await page.getByRole("button", { name: "Poderes", exact: false }).click();
  await expect(page.getByRole("tab", { name: "Alimentação" })).toHaveCount(0);
  const merits = page.getByRole("region", {
    name: "Qualidades de Sangue-Ralo",
    exact: true,
  });
  await merits.getByRole("button", { name: "Escolher", exact: true }).click();
  await merits.getByRole("searchbox").fill("alquimista");
  await merits
    .locator("li")
    .getByRole("button", { name: "Escolher", exact: true })
    .click();
  await expect(page.getByText(/Na seção Disciplinas e fórmulas/)).toBeVisible();
  await merits.getByRole("searchbox").fill("semblante");
  await merits
    .locator("li")
    .getByRole("button", { name: "Escolher", exact: true })
    .click();
  const flaws = page.getByRole("region", {
    name: "Defeitos de Sangue-Ralo",
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
  await page.getByRole("tab", { name: "Fichas de Conhecimento", exact: true }).click();
  await expect(
    page.getByRole("region", { name: "Fichas de Conhecimento", exact: true }),
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
    page.getByRole("region", { name: "Personagem em jogo" }),
  ).toBeVisible();
  await page.getByText("Mais ações", { exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Exportar JSON", exact: true }),
  ).toBeVisible();
  expect(
    await page.locator("body").evaluate((el) => el.scrollWidth <= innerWidth),
  ).toBe(true);
});

test("V5 mostra nível e texto do poder e libera escolhas ponto a ponto", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await start(page);
  await page.evaluate(async () => {
    const { oInitialCharacter } = await import('/constants.ts');
    localStorage.setItem('whitewolf_draft_v2', JSON.stringify({
      ...oInitialCharacter,
      name: 'Teste de Potência',
      gameType: 'Vampire',
      clan: 'brujah',
      disciplines: { potence: 3 },
    }));
    localStorage.setItem('whitewolf_flow_v1', JSON.stringify({
      step: 4,
      panels: { powers: 'disciplines' },
    }));
  });
  await page.reload();
  await page.getByRole('button', { name: 'Continuar personagem' }).click();
  const powers = page.getByRole('region', { name: 'Potência — poderes' });
  const choose = (name: string) => powers.locator('li').filter({ has: page.getByText(name, { exact: true }) })
    .getByRole('button', { name: 'Escolher', exact: true });
  await expect(page.getByText('Ponto 1 de 3 · Nível 1')).toBeVisible();
  await powers.getByRole('button', { name: 'Escolher', exact: true }).click();
  await powers.getByLabel('Mostrar indisponíveis').check();
  const levelThree = powers.locator('li').filter({ hasText: 'Disponível a partir do ponto 3.' }).first();
  const levelThreeName = await levelThree.locator('[data-help-label]').textContent();
  await expect(levelThree.getByText('Nível 3', { exact: true })).toBeVisible();
  await expect(choose(levelThreeName!)).toBeDisabled();

  const levelOne = powers.locator('li').filter({ has: page.getByText('Nível 1', { exact: true }) });
  const firstName = await levelOne.first().locator('[data-help-label]').textContent();
  const secondName = await levelOne.nth(1).locator('[data-help-label]').textContent();
  await levelOne.first().getByRole('button', { name: /^Informações/ }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.getByText('Texto da fonte (português)')).toBeVisible();
  await expect(dialog.getByText(/^Sistema:/)).toBeVisible();
  await expect(dialog.getByText(/^Duração:/)).toBeVisible();
  await page.keyboard.press('Escape');
  await choose(firstName!).click();
  await expect(page.getByText('Ponto 2 de 3 · Níveis 1 a 2')).toBeVisible();
  await expect(choose(levelThreeName!)).toBeDisabled();
  await choose(secondName!).click();
  await expect(page.getByText('Ponto 3 de 3 · Níveis 1 a 3')).toBeVisible();
  await choose(levelThreeName!).click();
  await expect(page.getByText('3 / 3 poderes escolhidos')).toBeVisible();
  await expect(choose('Poderio')).toBeDisabled();
});

test("V5 exige as especializações das Habilidades adquiridas e limpa as que perdem todos os pontos", async ({ page }) => {
  await start(page);
  await page.getByRole("button", { name: "Capacidades" }).click();
  await page.getByRole("tab", { name: "Habilidades" }).click();
  await page.getByLabel(/^Equilibrado/).check();

  const changeCraft = async (dots: number) => {
    await page.getByRole("button", { name: /^Ofícios \d/ }).click();
    await page.getByRole("dialog", { name: "Ofícios" }).getByRole("button", { name: new RegExp(`^${dots} `) }).click();
  };
  await changeCraft(2);
  await page.getByRole("tab", { name: "Especializações" }).click();
  await expect(page.getByText("Especialização gratuita pendente em Ofícios.")).toBeVisible();
  await page.getByRole("combobox", { name: "Habilidade", exact: true }).selectOption("Craft");
  await page.getByLabel("Especialização", { exact: true }).fill("Marcenaria");
  await page.getByRole("button", { name: "Adicionar especialização" }).click();
  await expect(page.getByText("Especialização gratuita pendente em Ofícios.")).toHaveCount(0);

  await page.getByRole("tab", { name: "Habilidades" }).click();
  await changeCraft(1);
  await page.getByRole("tab", { name: "Especializações" }).click();
  await expect(page.getByText("Ofícios: Marcenaria")).toBeVisible();

  await page.getByRole("tab", { name: "Habilidades" }).click();
  await changeCraft(0);
  await page.getByRole("tab", { name: "Especializações" }).click();
  await expect(page.getByText("Ofícios: Marcenaria")).toHaveCount(0);
  await expect(page.getByRole("option", { name: "Ofícios" })).toHaveCount(0);
});
