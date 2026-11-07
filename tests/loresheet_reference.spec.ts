import { test, expect } from '@playwright/test';

test('125 benefícios têm descrição revisada, custo independente e referência brasileira', async ({ page }) => {
  await page.goto('/');
  const data = await page.evaluate(async () => {
    const { V5_LORESHEETS } = await import('/data/v5Loresheets.ts');
    const { getBookReferences } = await import('/lib/bookReferences.tsx');
    return V5_LORESHEETS.map(sheet => ({
      id: sheet.id,
      levels: sheet.levels,
      sources: sheet.levels.map(level => getBookReferences('', `loresheet:${sheet.id}:${level.level}`)),
    }));
  });
  expect(data).toHaveLength(25);
  expect(new Set(data.map(row => row.id)).size).toBe(25);
  for (const sheet of data) {
    expect(sheet.levels.map(level => level.level)).toEqual([1, 2, 3, 4, 5]);
    for (const [index, level] of sheet.levels.entries()) {
      expect(level.description.length).toBeGreaterThan(100);
      expect(level.system).toContain(`Custo: ${index + 1} `);
      expect(level.system).toContain('não exige nem concede');
      expect(level.description + level.system).not.toMatch(/resumo autoral|consulte limites|Hand of|Real Talent/);
      expect(sheet.sources[index]).toEqual(expect.arrayContaining([
        expect.objectContaining({ language: 'pt-BR', file: 'Vampiro5edptbr' }),
      ]));
    }
  }
  expect(data.find(sheet => sheet.id === 'v5-cainite-heresy')!.levels[1].name).toBe('Mão da Heresia');
  expect(data.find(sheet => sheet.id === 'v5-helena')!.levels[1].name).toBe('Talento Inato');
});

test('compra direta de 2 pontos usa orçamento de Vantagens e a consulta funciona no celular', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() => localStorage.setItem('whitewolf_locale', 'pt'));
  await page.goto('/');
  await page.getByRole('button', { name: 'Criar personagem', exact: false }).click();
  await page.getByLabel('Vampiro: A Máscara', { exact: true }).check();
  await page.getByRole('button', { name: 'Começar criação', exact: true }).click();
  for (let i = 0; i < 4; i++) await page.getByRole('button', { name: 'Continuar', exact: true }).click();
  await page.getByRole('tab', { name: 'Fichas de Conhecimento', exact: true }).click();
  await expect(page.getByText('Cada benefício é independente:', { exact: false })).toBeVisible();
  const picker = page.getByRole('region', { name: 'Fichas de Conhecimento', exact: true });
  await expect(picker.getByRole('button',{name:'Escolher',exact:true})).toHaveCount(0);
  await picker.locator('summary').filter({hasText:'Heresia Cainita'}).click();
  const two = picker.getByRole('listitem',{name:'Heresia Cainita · 2 pontos',exact:true});
  await two.getByRole('button', { name: 'Informações: Heresia Cainita · 2 pontos', exact: true }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toContainText('Mão da Heresia');
  await expect(dialog).toContainText('Distribua um total de três pontos');
  await expect(dialog).toContainText('Segredo Sombrio');
  await expect(dialog).toContainText('Custo: 2 pontos de Vantagens / Antecedentes');
  await expect(dialog.getByRole('complementary', { name: 'Referências bibliográficas' })).toContainText('página 384');
  await expect(dialog).not.toContainText('Hand of');
  expect(await dialog.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
  await dialog.getByRole('button', { name: 'Fechar', exact: true }).click();
  await two.getByRole('button', { name: 'Escolher', exact: true }).click();
  await expect(page.getByText('2 / 7 pontos', { exact: true })).toBeVisible();
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('whitewolf_draft_v2')!).loresheets)).toEqual([{ id: 'v5-cainite-heresy', level: 2 }]);
  await picker.getByRole('listitem',{name:'Heresia Cainita · 1 ponto',exact:true}).getByRole('button', { name: 'Escolher', exact: true }).click();
  await expect(page.getByText('3 / 7 pontos', { exact: true })).toBeVisible();
  await picker.locator('summary').filter({hasText:'Heresia Cainita'}).click();
  await expect(two).not.toBeVisible();
  await picker.locator('summary').filter({hasText:'Theo Bell'}).click();
  await expect(picker.getByRole('button',{name:'Escolher',exact:true})).toHaveCount(5);
  await picker.locator('summary').filter({hasText:'Heresia Cainita'}).click();
  await picker.getByRole('button', { name: 'Remover Heresia Cainita · 2 pontos', exact: true }).click();
  await expect(page.getByText('1 / 7 pontos', { exact: true })).toBeVisible();
});
