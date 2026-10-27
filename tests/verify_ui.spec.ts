import { test, expect } from "@playwright/test";

test("V5: predador precede os poderes e o catálogo filtra requisitos", async ({
  page,
}) => {
  await page.addInitScript(() =>
    localStorage.setItem("whitewolf_locale", "pt"),
  );
  await page.goto("/");
  await page
    .getByRole("button", { name: "Criar personagem", exact: false })
    .click();
  await page.getByRole("button", { name: "Começar criação" }).click();
  await page.getByRole("button", { name: "Natureza", exact: false }).click();
  await page.getByRole("button", { name: "Ravnos", exact: true }).click();
  await page.getByRole("button", { name: "Poderes", exact: false }).click();
  await expect(page.getByRole("tab", { name: "Alimentação" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  const predator = page.getByRole("region", {
    name: "Tipo de predador",
    exact: true,
  });
  await predator.getByRole("button", { name: "Escolher", exact: true }).click();
  await expect(
    predator.getByText("Comunitário · opcional").first(),
  ).toHaveCount(0);
  await predator.getByRole("searchbox").fill("sereia");
  await predator
    .locator("li")
    .getByRole("button", { name: "Escolher", exact: true })
    .click();
  await expect(predator.getByText(/Sereia/).first()).toBeVisible();
  await page.getByRole("tab", { name: "Disciplinas e poderes" }).click();
  await expect(
    page.getByRole("region", { name: /Presença — poderes/ }),
  ).toBeVisible();
  const powers = page.getByRole("region", { name: /Presença — poderes/ });
  await powers.getByRole("button", { name: "Escolher", exact: true }).click();
  await expect(powers.getByText(/Exige 5 pontos/)).toHaveCount(0);
  await powers.getByLabel("Mostrar indisponíveis").check();
  await expect(powers.getByText(/Exige 5 pontos/).first()).toBeVisible();
  await powers.getByRole("searchbox").fill("xxxxxxxx");
  await expect(powers.getByRole("status")).toContainText("Nenhuma opção");
});
