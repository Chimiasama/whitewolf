import { test, expect } from "@playwright/test";
test.beforeEach(async ({ page }) => {
  await page.goto("/");
});
async function fixture(page, game = "Vampire", patch = {}) {
  return page.evaluate(
    async ({ game, patch }) => {
      const { oInitialCharacter, fnGetDisciplineDetails } = await import(
        "/constants.ts"
      );
      const c = {
        ...structuredClone(oInitialCharacter),
        gameType: game,
        profile: "player",
        name: "Teste de evolução",
        concept: "Personagem em jogo",
        creationCompletedAt: "2026-10-27T12:00:00Z",
        clan: game === "Vampire" ? "brujah" : null,
        tribe: game === "Werewolf" ? "blackfuries" : null,
        auspice: game === "Werewolf" ? "ahroun" : null,
        experience: [
          {
            id: "initial",
            date: "2026-10-27",
            kind: "earned",
            amount: 40,
            note: "Saldo acumulado",
          },
        ],
      };
      c.attributes.Strength = 3;
      return { ...c, ...patch };
    },
    { game, patch },
  );
}
async function load(page, c) {
  await page
    .locator("input[type=file]")
    .first()
    .setInputFiles({
      name: "pc.json",
      mimeType: "application/json",
      buffer: Buffer.from(JSON.stringify(c)),
    });
}
async function shop(page) {
  await page
    .getByRole("button", { name: "Evoluir com XP", exact: true })
    .click();
  return page.getByRole("region", { name: "Compras com XP", exact: true });
}
test("40 XP: Força 3 → 4 custa 20, grava recibo e sobrevive a salvar/exportar/importar", async ({
  page,
}, info) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await load(page, await fixture(page));
  const panel = await shop(page);
  await panel
    .getByLabel("Característica ou benefício")
    .selectOption("Strength");
  await expect(panel.getByLabel("Prévia da compra")).toContainText("3 → 4");
  await expect(panel.getByLabel("Prévia da compra")).toContainText(
    "4 × 5 = 20 XP",
  );
  await panel
    .getByRole("button", { name: "Comprar por 20 XP", exact: true })
    .click();
  await expect(page.getByText("Saldo: 20 XP", { exact: true })).toBeVisible();
  await expect(
    panel.getByRole("button", { name: "Comprar por 25 XP", exact: true }),
  ).toBeDisabled();
  let c = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("whitewolf_draft_v2")!),
  );
  expect(c.attributes.Strength).toBe(4);
  expect(c.experience).toHaveLength(2);
  expect(c.experience[1]).toMatchObject({
    kind: "spent",
    amount: 20,
    purchase: { kind: "attribute", key: "Strength", from: 3, to: 4 },
  });
  await page
    .getByRole("button", { name: "Salvar rascunho", exact: true })
    .click();
  const dialog = page.getByRole("dialog");
  await dialog.locator("input").fill("Evolução");
  await dialog.getByRole("button", { name: "Salvar", exact: true }).click();
  const saved = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("whitewolf_save_Evolução")!),
  );
  expect(saved.attributes.Strength).toBe(4);
  expect(saved.creationCompletedAt).toBeTruthy();
  await page.getByText("Mais ações", { exact: true }).click();
  const wait = page.waitForEvent("download");
  await page
    .getByRole("button", { name: "Exportar JSON", exact: true })
    .click();
  const download = await wait;
  const file = info.outputPath("evolved.json");
  await download.saveAs(file);
  await page.reload();
  await page.locator("input[type=file]").first().setInputFiles(file);
  await expect(
    page.getByRole("heading", { name: "Ficha em jogo", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Capacidades", exact: false }).click();
  await expect(
    page.getByText("A distribuição inicial foi encerrada.", { exact: false }),
  ).toBeVisible();
  expect(errors).toEqual([]);
});
test("ficha antiga habilita evolução sem sessão zero, justificativa ou aprovação", async ({
  page,
}) => {
  const c = await fixture(page);
  delete c.creationCompletedAt;
  await load(page, c);
  await page
    .getByRole("button", { name: "Evoluir com XP", exact: true })
    .click();
  await page
    .getByRole("button", {
      name: "Esta ficha já está pronta: habilitar evolução",
    })
    .click();
  const panel = page.getByRole("region", { name: "Compras com XP" });
  await expect(panel.getByRole("checkbox")).toHaveCount(0);
  await panel.getByLabel("Tipo de compra").selectOption("skill");
  await panel
    .getByLabel("Característica ou benefício")
    .selectOption("Athletics");
  await panel
    .getByRole("button", { name: "Comprar por 3 XP", exact: true })
    .click();
  await expect(page.getByText("Saldo: 37 XP", { exact: true })).toBeVisible();
  const next = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("whitewolf_draft_v2")!),
  );
  expect(next.skills.Athletics).toBe(1);
  expect(next.sessionZero).toBeUndefined();
});
test("W5: Renome mesmo sob Vexame, Rito a 5 XP e nenhum catálogo V5", async ({
  page,
}, info) => {
  await load(
    page,
    await fixture(page, "Werewolf", {
      renown: { glory: 2, honor: 0, wisdom: 1, shame: { glory: true } },
    }),
  );
  const panel = await shop(page);
  await panel.getByLabel("Tipo de compra").selectOption("renown");
  await panel.getByLabel("Característica ou benefício").selectOption("glory");
  await panel
    .getByRole("button", { name: "Comprar por 15 XP", exact: true })
    .click();
  await expect(page.getByText("Saldo: 25 XP", { exact: true })).toBeVisible();
  await panel.getByLabel("Tipo de compra").selectOption("rite");
  await panel
    .getByLabel("Característica ou benefício")
    .selectOption("w5-rite-dedication");
  await panel
    .getByRole("button", { name: "Comprar por 5 XP", exact: true })
    .click();
  await expect(page.getByText("Saldo: 20 XP", { exact: true })).toBeVisible();
  expect(
    await panel
      .getByLabel("Tipo de compra")
      .locator("option")
      .allTextContents(),
  ).not.toContain("Disciplina");
  await page.setViewportSize({ width: 390, height: 844 });
  expect(
    await page.locator("body").evaluate((el) => el.scrollWidth <= innerWidth),
  ).toBe(true);
  await page.screenshot({
    path: info.outputPath("xp-w5-mobile.png"),
    fullPage: true,
  });
});
test("custos e compras sequenciais, limites, erro atômico e duplicação de clique", async ({
  page,
}) => {
  const result = await page.evaluate(async () => {
    const { oInitialCharacter } = await import("/constants.ts");
    const { quotePurchase, purchaseWithExperience } = await import(
      "/lib/advancement.ts"
    );
    const { experienceBalance } = await import("/lib/experience.ts");
    const { parseCharacter, playerIssues } = await import(
      "/lib/characterValidation.ts"
    );
    const base = {
      ...structuredClone(oInitialCharacter),
      gameType: "Vampire",
      clan: "brujah",
      name: "Compra",
      concept: "Evolução",
      creationCompletedAt: "2026-10-27T12:00:00Z",
      experience: [
        {
          id: "earned",
          kind: "earned",
          amount: 40,
          date: "2026-10-27",
          note: "Saldo",
        },
      ],
    };
    base.attributes.Strength = 2;
    const req = { kind: "attribute", key: "Strength" };
    const q = quotePurchase(base, req);
    const receipt = {
      id: "one",
      date: "2026-10-27",
      note: "",
      expectedToken: q.token,
    };
    const first = purchaseWithExperience(base, req, receipt);
    const q2 = quotePurchase(first, req);
    const second = purchaseWithExperience(first, req, {
      ...receipt,
      id: "two",
      expectedToken: q2.token,
    });
    const rejected = [];
    for (const [name, fn] of Object.entries({
      stale: () =>
        purchaseWithExperience(first, req, { ...receipt, id: "stale" }),
      insufficient: () =>
        purchaseWithExperience(second, req, {
          ...receipt,
          id: "low",
          expectedToken: quotePurchase(second, req).token,
        }),
      cap: () =>
        quotePurchase(
          { ...base, attributes: { ...base.attributes, Strength: 5 } },
          req,
        ),
      zero: () =>
        quotePurchase(base, {
          kind: "specialty",
          key: "Academics",
          choice: "História",
        }),
      wrongGame: () => quotePurchase(base, { kind: "renown", key: "glory" }),
      invalidDate: () =>
        purchaseWithExperience(base, req, { ...receipt, date: "2026-02-31" }),
    }))
      try {
        fn();
      } catch {
        rejected.push(name);
      }
    return {
      costs: [q.cost, q2.cost],
      balance: experienceBalance(second),
      strength: second.attributes.Strength,
      baseStrength: base.attributes.Strength,
      rejected,
      parsed: parseCharacter(second).attributes.Strength,
      issues: playerIssues(second),
    };
  });
  expect(result.costs).toEqual([15, 20]);
  expect(result.balance).toBe(5);
  expect(result.strength).toBe(4);
  expect(result.baseStrength).toBe(2);
  expect(result.rejected).toEqual([
    "stale",
    "insufficient",
    "cap",
    "zero",
    "wrongGame",
    "invalidDate",
  ]);
  expect(result.parsed).toBe(4);
  expect(result.issues).toEqual([]);
});
test("V5: clã ×5, fora do clã ×7, Caitiff ×6, poder incluído e requisitos de amálgama", async ({
  page,
}) => {
  const r = await page.evaluate(async () => {
    const { oInitialCharacter, fnGetDisciplineDetails } = await import(
      "/constants.ts"
    );
    const { quotePurchase, purchaseWithExperience } = await import(
      "/lib/advancement.ts"
    );
    const { parseCharacter } = await import("/lib/characterValidation.ts");
    const d = fnGetDisciplineDetails((k) => k);
    const base = {
      ...structuredClone(oInitialCharacter),
      gameType: "Vampire",
      clan: "brujah",
      creationCompletedAt: "2026-10-27T12:00:00Z",
      experience: [
        {
          id: "earned",
          kind: "earned",
          amount: 100,
          date: "2026-10-27",
          note: "Saldo",
        },
      ],
    };
    const potence = d.potence.powers.find(
      (p) => p.level === 1 && !p.prerequisite && !p.amalgam,
    );
    const auspex = d.auspex.powers.find(
      (p) => p.level === 1 && !p.prerequisite && !p.amalgam,
    );
    const req = { kind: "discipline", key: "potence", choice: potence.id };
    const q = quotePurchase(base, req);
    const next = purchaseWithExperience(base, req, {
      id: "buy",
      date: "2026-10-27",
      note: "",
      expectedToken: q.token,
    });
    const amalgam = Object.entries(d).flatMap(([key, v]) =>
      v.powers
        .filter((p) => p.amalgam?.some((a) => a.discipline !== key))
        .map((p) => ({ key, p })),
    )[0];
    let invalid = false;
    try {
      quotePurchase(
        {
          ...base,
          disciplines: { [amalgam.key]: amalgam.p.level - 1 },
          disciplinePowers: {
            [amalgam.key]: d[amalgam.key].powers
              .filter((p) => p.level === 1 && !p.amalgam && !p.prerequisite)
              .slice(0, amalgam.p.level - 1)
              .map((p) => p.id),
          },
        },
        { kind: "discipline", key: amalgam.key, choice: amalgam.p.id },
      );
    } catch {
      invalid = true;
    }
    return {
      clan: q.cost,
      out: quotePurchase(base, {
        kind: "discipline",
        key: "auspex",
        choice: auspex.id,
      }).cost,
      caitiff: quotePurchase({ ...base, clan: "caitiff" }, req).cost,
      dots: next.disciplines.potence,
      powers: next.disciplinePowers.potence,
      parsed: parseCharacter(next).disciplines.potence,
      invalid,
    };
  });
  expect(r.clan).toBe(5);
  expect(r.out).toBe(7);
  expect(r.caitiff).toBe(6);
  expect(r.dots).toBe(1);
  expect(r.powers).toHaveLength(1);
  expect(r.parsed).toBe(1);
  expect(r.invalid).toBe(true);
});
test("V5: fórmulas, rituais, Vantagens, especialidades, Humanidade e teto de Potência por geração", async ({
  page,
}) => {
  const r = await page.evaluate(async () => {
    const { oInitialCharacter, fnGetDisciplineDetails } = await import(
      "/constants.ts"
    );
    const { quotePurchase, purchaseWithExperience } = await import(
      "/lib/advancement.ts"
    );
    const { INITIAL_BLOOD_RITUALS } = await import("/data/bloodRituals.ts");
    const { parseCharacter } = await import("/lib/characterValidation.ts");
    const b = {
      ...structuredClone(oInitialCharacter),
      gameType: "Vampire",
      clan: "thinblood",
      generation: 14,
      bloodPotency: 0,
      creationCompletedAt: "2026-10-27T12:00:00Z",
      experience: [
        {
          id: "earned",
          kind: "earned",
          amount: 100,
          date: "2026-10-27",
          note: "Saldo",
        },
      ],
    };
    const formulas = fnGetDisciplineDetails(
      (k) => k,
    ).thinbloodalchemy.powers.filter((p) => p.level === 1);
    const req = {
      kind: "discipline",
      key: "thinbloodalchemy",
      choice: formulas[0].id,
    };
    const q = quotePurchase(b, req);
    const learned = purchaseWithExperience(b, req, {
      id: "alchemy",
      date: "2026-10-27",
      note: "",
      expectedToken: q.token,
    });
    const add = {
      kind: "formula",
      key: "thinbloodalchemy",
      choice: formulas[1].id,
    };
    const q2 = quotePurchase(learned, add);
    const more = purchaseWithExperience(learned, add, {
      id: "formula",
      date: "2026-10-27",
      note: "",
      expectedToken: q2.token,
    });
    const vampire = {
      ...b,
      clan: "tremere",
      generation: 13,
      bloodPotency: 1,
      disciplines: { bloodsorcery: 1 },
    };
    let cap = false;
    try {
      quotePurchase(
        { ...vampire, bloodPotency: 3 },
        { kind: "bloodPotency", key: "bloodPotency" },
      );
    } catch {
      cap = true;
    }
    const cost = (c, req) => quotePurchase(c, req).cost;
    const trained = { ...vampire, skills: { ...vampire.skills, Athletics: 1 } };
    return {
      alchemy: q.cost,
      formula: q2.cost,
      formulaCount:
        parseCharacter(more).disciplinePowers.thinbloodalchemy.length,
      ritual: cost(vampire, {
        kind: "ritual",
        key: INITIAL_BLOOD_RITUALS[0].id,
      }),
      advantage: cost(vampire, { kind: "advantage", key: "resources" }),
      specialty: cost(trained, {
        kind: "specialty",
        key: "Athletics",
        choice: "Escalada",
      }),
      potency: cost(vampire, { kind: "bloodPotency", key: "bloodPotency" }),
      humanity: cost(
        { ...vampire, humanity: 7 },
        { kind: "humanity", key: "humanity" },
      ),
      cap,
      fast: cost(
        { ...trained, advantages: [{ id: "fastlearner", cost: 5 }] },
        { kind: "skill", key: "Athletics" },
      ),
    };
  });
  expect(r).toEqual({
    alchemy: 5,
    formula: 3,
    formulaCount: 2,
    ritual: 3,
    advantage: 3,
    specialty: 3,
    potency: 20,
    humanity: 80,
    cap: true,
    fast: 4,
  });
});
test("W5: próximo Dom conta os conhecidos, filtra origem/Renome e não compra o mesmo Dom duas vezes", async ({
  page,
}) => {
  const r = await page.evaluate(async () => {
    const { oInitialCharacter } = await import("/constants.ts");
    const { quotePurchase, purchaseWithExperience } = await import(
      "/lib/advancement.ts"
    );
    const { W5_GIFTS } = await import("/data/w5.ts");
    const b = {
      ...structuredClone(oInitialCharacter),
      gameType: "Werewolf",
      tribe: "blackfuries",
      auspice: "ahroun",
      creationCompletedAt: "2026-10-27T12:00:00Z",
      renown: { glory: 2, honor: 0, wisdom: 1, shame: { glory: true } },
      gifts: W5_GIFTS.filter((g) => g.origin === "native")
        .slice(0, 3)
        .map((g) => ({ id: g.id, origin: g.origin })),
      experience: [
        {
          id: "earned",
          kind: "earned",
          amount: 100,
          date: "2026-10-27",
          note: "Saldo",
        },
      ],
    };
    const next = W5_GIFTS.filter((g) => g.origin === "native")[3],
      req = { kind: "gift", key: next.id };
    const q = quotePurchase(b, req);
    const c = purchaseWithExperience(b, req, {
      id: "gift",
      date: "2026-10-27",
      note: "",
      expectedToken: q.token,
    });
    const rejected = [];
    for (const [name, request] of [
      ["duplicate", req],
      [
        "origin",
        {
          kind: "gift",
          key: W5_GIFTS.find(
            (g) => g.origin === "tribe" && g.owner !== "blackfuries",
          ).id,
        },
      ],
      [
        "renown",
        {
          kind: "gift",
          key: W5_GIFTS.filter((g) => g.origin === "native")[4].id,
        },
      ],
    ])
      try {
        quotePurchase(
          name === "renown"
            ? { ...c, renown: { glory: 0, honor: 0, wisdom: 0 } }
            : c,
          request,
        );
      } catch {
        rejected.push(name);
      }
    return {
      cost: q.cost,
      count: c.gifts.length,
      rejected,
      renown: quotePurchase(b, { kind: "renown", key: "glory" }).cost,
    };
  });
  expect(r.cost).toBe(8);
  expect(r.count).toBe(4);
  expect(r.rejected).toEqual(["duplicate", "origin", "renown"]);
  expect(r.renown).toBe(15);
});
test("Loresheets V5 corrigidas: níveis independentes, legado preservado e desconto de Helena", async ({
  page,
}) => {
  const r = await page.evaluate(async () => {
    const { oInitialCharacter, fnGetLoresheets } = await import(
      "/constants.ts"
    );
    const { quotePurchase, purchaseWithExperience } = await import(
      "/lib/advancement.ts"
    );
    const b = {
      ...structuredClone(oInitialCharacter),
      gameType: "Vampire",
      clan: "toreador",
      creationCompletedAt: "2026-10-27T12:00:00Z",
      loresheets: [{ id: "watcherOfMalditos", level: 2 }],
      experience: [
        {
          id: "earned",
          kind: "earned",
          amount: 100,
          date: "2026-10-27",
          note: "Saldo",
        },
      ],
    };
    const buy = (c, req, id) => {
      const q = quotePurchase(c, req);
      return purchaseWithExperience(c, req, {
        id,
        date: "2026-10-27",
        note: "",
        expectedToken: q.token,
      });
    };
    let c = buy(
      b,
      { kind: "loresheet", key: "v5-helena", level: 2, choice: "Craft" },
      "helena",
    );
    c = buy(c, { kind: "loresheet", key: "v5-helena", level: 1 }, "helena1");
    const q = quotePurchase(c, { kind: "skill", key: "Craft" });
    let duplicate = false;
    try {
      quotePurchase(c, {
        kind: "loresheet",
        key: "v5-helena",
        level: 2,
        choice: "Craft",
      });
    } catch {
      duplicate = true;
    }
    return {
      catalog: fnGetLoresheets((k) => k).map((l) => l.id),
      sheets: c.loresheets,
      discount: q.cost,
      duplicate,
    };
  });
  expect(r.catalog).toHaveLength(4);
  expect(r.catalog).not.toContain("watcherOfMalditos");
  expect(r.sheets).toEqual([
    { id: "watcherOfMalditos", level: 2 },
    { id: "v5-helena", level: 2 },
    { id: "v5-helena", level: 1 },
  ]);
  expect(r.discount).toBe(1);
  expect(r.duplicate).toBe(true);
  await load(
    page,
    await fixture(page, "Vampire", {
      loresheets: [{ id: "watcherOfMalditos", level: 2 }],
    }),
  );
  await expect(
    page.getByRole("heading", { name: "Fichas de Conhecimento legadas" }),
  ).toBeVisible();
});

test("Méritos comunitários: Competência usa taxa de clã e Alchemy Expert usa taxa externa", async ({
  page,
}) => {
  const r = await page.evaluate(async () => {
    const { oInitialCharacter, fnGetDisciplineDetails } = await import(
      "/constants.ts"
    );
    const { quotePurchase, purchaseWithExperience } = await import(
      "/lib/advancement.ts"
    );
    const { parseCharacter } = await import("/lib/characterValidation.ts");
    const d = fnGetDisciplineDetails((k) => k),
      base = {
        ...structuredClone(oInitialCharacter),
        gameType: "Vampire",
        clan: "brujah",
        creationCompletedAt: "2026-10-27T12:00:00Z",
        experience: [
          {
            id: "earned",
            kind: "earned",
            amount: 100,
            date: "2026-10-27",
            note: "Saldo",
          },
        ],
      };
    const auspex = d.auspex.powers.find(
      (p) => p.level === 1 && !p.amalgam && !p.prerequisite,
    );
    const a = {
      ...base,
      disciplineCompetence: "auspex",
      advantages: [
        {
          id: "disciplinecompetence",
          cost: 6,
          name: "Competência",
          type: "advantage",
          description: "",
        },
      ],
    };
    const alchemy = d.thinbloodalchemy.powers.find((p) => p.level === 1);
    const expert = {
      ...base,
      advantages: [
        {
          id: "alchemyexpert",
          cost: 5,
          name: "Alquimia",
          type: "advantage",
          description: "",
        },
      ],
    };
    const request = {
      kind: "discipline",
      key: "thinbloodalchemy",
      choice: alchemy.id,
    };
    const q = quotePurchase(expert, request);
    const next = purchaseWithExperience(expert, request, {
      id: "buy",
      date: "2026-10-27",
      note: "",
      expectedToken: q.token,
    });
    return {
      competence: quotePurchase(a, {
        kind: "discipline",
        key: "auspex",
        choice: auspex.id,
      }).cost,
      alchemy: q.cost,
      parsed: parseCharacter(next).disciplines.thinbloodalchemy,
      merit: parseCharacter(a).advantages[0].cost,
    };
  });
  expect(r).toEqual({ competence: 5, alchemy: 7, parsed: 1, merit: 6 });
});
test("criação mantém dois níveis da mesma Loresheet e gerador evita Dons duplicados por acesso", async ({
  page,
}) => {
  const c = await fixture(page);
  delete c.creationCompletedAt;
  await load(page, c);
  await page
    .getByRole("button", { name: "Vínculos e recursos", exact: false })
    .click();
  await page.getByRole("tab", { name: "Loresheets", exact: true }).click();
  const region = page.getByRole("region", { name: "Loresheets", exact: true });
  await region.getByRole("button", { name: "Escolher", exact: true }).click();
  await region.getByRole("searchbox").fill("Bahari");
  await region
    .locator("li")
    .filter({ hasText: "Bahari · 1 pontos" })
    .getByRole("button", { name: "Escolher", exact: true })
    .click();
  await region
    .locator("li")
    .filter({ hasText: "Bahari · 2 pontos" })
    .getByRole("button", { name: "Escolher", exact: true })
    .click();
  const r = await page.evaluate(async () => {
    const { fnCreateRandomCharacter } = await import("/lib/randomizer.ts");
    const { w5GiftIdentity } = await import("/data/w5.ts");
    let duplicates = 0;
    for (let i = 0; i < 120; i++) {
      const c = fnCreateRandomCharacter("pt", "ancilla", (k) => k, "Werewolf");
      if (
        c.gifts.length !== 3 ||
        new Set(c.gifts.map((g) => w5GiftIdentity(g.id))).size !== 3
      )
        duplicates++;
    }
    return {
      sheets: JSON.parse(localStorage.getItem("whitewolf_draft_v2")!)
        .loresheets,
      duplicates,
    };
  });
  expect(r.sheets).toEqual([
    { id: "v5-bahari", level: 1 },
    { id: "v5-bahari", level: 2 },
  ]);
  expect(r.duplicates).toBe(0);
});
