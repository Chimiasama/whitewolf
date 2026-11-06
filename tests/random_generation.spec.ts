import { test, expect } from '@playwright/test';

async function home(page) {
  await page.addInitScript(() => localStorage.setItem('whitewolf_locale', 'pt'));
  await page.goto('/');
}
for (const game of ['Vampiro: A Máscara', 'Lobisomem: O Apocalipse']) {
  test(`um toque por campo, sem lista e sem alterar outros campos: ${game}`, async ({ page }, info) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await home(page);
    await page.getByRole('button', { name: 'Criar personagem', exact: false }).click();
    await page.getByLabel(game, { exact: true }).check();
    await page.getByRole('button', { name: 'Começar criação' }).click();
    const fields = [
      ['char-name', 'Gerar nome'],
      ['char-mentor', game.startsWith('Vampiro') ? 'Gerar senhor' : 'Gerar mentor'],
      ['char-concept', 'Gerar conceito'],
      ['char-ambition', 'Gerar ambição'],
      ['char-desire', 'Gerar desejo'],
    ];
    for (const [id] of fields) await page.locator(`#${id}`).fill(`Manual ${id}`);
    for (const [id, label] of fields) {
      const other = fields.filter(([key]) => key !== id);
      const before = await Promise.all(other.map(([key]) => page.locator(`#${key}`).inputValue()));
      const seen = new Set<string>();
      for (let i = 0; i < 8; i++) {
        await page.getByRole('button', { name: label, exact: true }).click();
        const value = await page.locator(`#${id}`).inputValue();
        expect(value).not.toContain('Manual');
        expect(seen.has(value)).toBe(false);
        seen.add(value);
      }
      expect(await Promise.all(other.map(([key]) => page.locator(`#${key}`).inputValue()))).toEqual(before);
    }
    for(const id of ['char-concept','char-ambition','char-desire']) {
      expect(await page.locator(`#${id}`).evaluate(field=>field.scrollHeight<=field.clientHeight+1),id).toBe(true);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await expect(page.getByRole('button', { name: /^Usar ideia:/ })).toHaveCount(0);
    await page.evaluate(()=>window.scrollTo({top:0}));
    await page.screenshot({path:info.outputPath('identity-generators.png'),fullPage:true});
  });
}

test('catálogos extensos e sem repetição até esgotar cada conjunto de ideias', async ({ page }) => {
  await home(page);
  const report = await page.evaluate(async () => {
    const { STORY_IDEAS, generateStoryIdea } = await import('/data/storyIdeas.ts');
    const { fnGenerateName, fnGenerateConcept } = await import('/lib/generators.ts');
    const {NPC_ROLE_PROFILES}=await import('/data/npcRoles.ts');
    const {generateNpcNarrative}=await import('/lib/npc.ts');
    const report = [];
    for(const game of ['Vampire','Werewolf'])for(const profile of NPC_ROLE_PROFILES[game])for(const field of ['motivation','secret','relationship','hook']){
      const values=Array.from({length:36},()=>generateNpcNarrative(game,profile.role,field));
      if(new Set(values).size!==36)throw new Error(`Repetição em ${profile.role}: ${field}`);
    }
    for (const game of ['Vampire', 'Werewolf']) {
      for (const kind of ['ambition', 'desire']) {
        const size = STORY_IDEAS[game][kind].length;
        let previous = '';
        const values = Array.from({ length: size }, () => {
          previous = generateStoryIdea(game, kind, previous);
          return previous;
        });
        const next = generateStoryIdea(game, kind, previous);
        report.push({ name: `${game}:${kind}`, size, unique: new Set(values).size, boundaryRepeat: previous === next });
      }
      for (const locale of ['pt', 'en']) for (const field of ['name', 'concept']) {
        const values = Array.from({ length: 500 }, () => field === 'name' ? fnGenerateName(locale, undefined, game) : fnGenerateConcept(locale, undefined, game).concept);
        report.push({ name: `${game}:${locale}:${field}`, size: values.length, unique: new Set(values).size, boundaryRepeat: false });
      }
    }
    return report;
  });
  for (const row of report) {
    expect(row.size, row.name).toBeGreaterThanOrEqual(300);
    expect(row.unique, row.name).toBe(row.size);
    expect(row.boundaryRepeat, row.name).toBe(false);
  }
});

test('todos os papéis orientam a ficha, respeitam origens e continuam válidos', async ({ page }) => {
  await home(page);
  const result = await page.evaluate(async () => {
    const { NPC_ROLE_PROFILES } = await import('/data/npcRoles.ts');
    const { createNarrativeNpc } = await import('/lib/npc.ts');
    const { withNpcTemplate } = await import('/lib/npcTemplates.ts');
    const { parseCharacter } = await import('/lib/characterValidation.ts');
    const { Clan, Tribe, Auspice } = await import('/types.ts');
    const { W5_GIFTS } = await import('/data/w5.ts');
    const failures = [];
    let count = 0;
    for (const game of ['Vampire', 'Werewolf']) for (const profile of NPC_ROLE_PROFILES[game]) {
      for (const scale of ['fledgling', 'neonate', 'ancilla']) for (let i = 0; i < 5; i++) {
        const c = createNarrativeNpc('pt', scale, k => k, game, profile.role);
        count++;
        try { parseCharacter(c); } catch (e) { failures.push(`${profile.role}: ${e}`); }
        const topAttribute = Math.max(...Object.values(c.attributes));
        if (c.attributes[profile.attributes[0]] !== topAttribute) failures.push(`${profile.role}: atributo principal`);
        const topSkill = Math.max(...Object.values(c.skills));
        if (!profile.skills.slice(0, 3).some(skill => c.skills[skill] === topSkill)) failures.push(`${profile.role}: habilidade principal`);
        if (c.health !== c.attributes.Stamina + 3 || c.willpower !== c.attributes.Composure + c.attributes.Resolve) failures.push('trilhas');
        if (c.concept !== profile.role || !c.narrative.role.startsWith(profile.role)) failures.push('conceito');
        if (profile.role === 'Manipulador da corte' && (c.skills.Brawl > 1 || c.attributes.Strength > 3)) failures.push('manipulador combatente');
      }
    }
    for (const clan of Object.values(Clan).filter(c => c !== 'thinblood')) {
      const c = createNarrativeNpc('pt', 'ancilla', k => k, 'Vampire', 'Manipulador da corte', { clan });
      if (c.clan !== clan || c.attributes.Manipulation !== 5 || c.skills.Brawl > 1) failures.push(`clã ${clan}`);
      if (clan === 'ventrue' && ['farmer', 'bagger'].includes(c.predatorType)) failures.push('predador Ventrue');
      if (clan === 'brujah' && c.disciplines.presence < 3) failures.push('Presença do manipulador Brujah');
      parseCharacter(c);
      const human = withNpcTemplate(c, 'human');
      if (human.npcTemplate.social <= human.npcTemplate.physical) failures.push('modelo social');
    }
    for (const tribe of Object.values(Tribe)) for (const auspice of Object.values(Auspice)) {
      const c = createNarrativeNpc('pt', 'fledgling', k => k, 'Werewolf', 'Mediador espiritual', { tribe, auspice });
      if (c.tribe !== tribe || c.auspice !== auspice) failures.push('origem Garou');
      for (const gift of c.gifts) {
        const entry = W5_GIFTS.find(g => g.id === gift.id);
        if (entry.origin === 'tribe' && entry.owner !== tribe || entry.origin === 'auspice' && entry.owner !== auspice) failures.push('Dom incompatível');
      }
      parseCharacter(c);
    }
    return { failures, count, roles: Object.values(NPC_ROLE_PROFILES).map(rows => rows.length) };
  });
  expect(result.failures).toEqual([]);
  expect(result.roles).toEqual([9, 9]);
  expect(result.count).toBe(270);
});

for (const game of ['Vampiro: A Máscara', 'Lobisomem: O Apocalipse']) {
  test(`mestre escolhe origem e gera narrativa por campo: ${game}`, async ({ page }, info) => {
    await page.setViewportSize({width:390,height:844});
    await home(page);
    await page.getByRole('button', { name: 'Criar NPC', exact: false }).click();
    await page.getByLabel(game, { exact: true }).check();
    await expect(page.getByLabel('Papel narrativo', { exact: true }).locator('option')).toHaveCount(10);
    const vampire = game.startsWith('Vampiro');
    await page.getByLabel('Papel narrativo', { exact: true }).selectOption(vampire ? 'Manipulador da corte' : 'Mediador espiritual');
    if (vampire) await page.getByLabel('Clã do NPC').selectOption('brujah');
    else {
      await page.getByLabel('Tribo do NPC').selectOption('blackfuries');
      await page.getByLabel('Augúrio do NPC').selectOption('theurge');
    }
    await page.screenshot({path:info.outputPath('npc-controls.png'),fullPage:true});
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    await page.getByRole('button', { name: 'Gerar NPC', exact: true }).click();
    const before = await page.evaluate(() => JSON.parse(localStorage.getItem('whitewolf_draft_v2')!));
    expect(vampire ? before.clan : before.tribe).toBe(vampire ? 'brujah' : 'blackfuries');
    await page.locator('.app-footer').getByRole('button', { name: 'Voltar', exact: true }).click();
    await page.getByRole('tab', { name: 'Vínculos', exact: true }).click();
    await page.getByRole('tab', { name: 'Narrativa do NPC', exact: true }).click();
    const old = await page.getByLabel('Motivação', { exact: true }).inputValue();
    await page.getByRole('button', { name: 'Gerar motivação', exact: true }).click();
    expect(await page.getByLabel('Motivação', { exact: true }).inputValue()).not.toBe(old);
    const after = await page.evaluate(() => JSON.parse(localStorage.getItem('whitewolf_draft_v2')!));
    expect(after.attributes).toEqual(before.attributes);
    expect(after.narrative.secret).toBe(before.narrative.secret);
  });
}
