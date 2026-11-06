import { test, expect } from '@playwright/test';

async function start(page, game = 'Lobisomem: O Apocalipse') {
  await page.addInitScript(() => localStorage.setItem('whitewolf_locale', 'pt'));
  await page.goto('/');
  await page.getByRole('button', { name: 'Criar personagem', exact: false }).click();
  await page.getByLabel(game, { exact: true }).check();
  await page.getByRole('button', { name: 'Começar criação' }).click();
  await page.locator('#char-name').fill('Teste de retorno');
}

test('celular: cancelar, salvar incompleto e retomar as escolhas', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 740 });
  await start(page);
  await page.locator('#char-concept').fill('Guardião em teste');
  await page.getByRole('button', { name: 'Tela inicial', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'Voltar à tela inicial?' });
  await dialog.getByRole('button', { name: 'Continuar editando' }).click();
  await expect(page.locator('#char-name')).toHaveValue('Teste de retorno');
  await page.getByRole('button', { name: 'Voltar à tela inicial', exact: true }).click();
  await dialog.getByRole('button', { name: 'Salvar e voltar ao início' }).click();
  await expect(page.getByRole('button', { name: 'Criar personagem', exact: false })).toBeVisible();
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('whitewolf_save_Teste de retorno')!));
  expect(saved.concept).toBe('Guardião em teste');
  expect(saved.creationCompletedAt).toBeUndefined();
  await page.getByRole('button', { name: 'Continuar personagem' }).click();
  await expect(page.locator('#char-concept')).toHaveValue('Guardião em teste');
});

test('ficha concluída: sair descarta somente rascunho e permite criar outro jogo', async ({ page }) => {
  await start(page, 'Vampiro: A Máscara');
  await page.evaluate(() => {
    const c = JSON.parse(localStorage.getItem('whitewolf_draft_v2')!);
    c.creationCompletedAt = '2026-11-06T12:00:00Z';
    localStorage.setItem('whitewolf_save_Ficha pronta', JSON.stringify(c));
  });
  await page.reload();
  await page.getByRole('button', { name: 'Abrir personagens salvos', exact: true }).click();
  await page.getByRole('button', { name: /Carregar: Ficha pronta/ }).click();
  await expect(page.getByRole('button', { name: 'Criação concluída', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Voltar à tela inicial', exact: true }).click();
  await page.getByRole('button', { name: 'Sair sem salvar', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Continuar personagem' })).toHaveCount(0);
  expect(await page.evaluate(() => localStorage.getItem('whitewolf_draft_v2'))).toBeNull();
  expect(await page.evaluate(() => localStorage.getItem('whitewolf_save_Ficha pronta'))).not.toBeNull();
  await page.getByRole('button', { name: 'Criar personagem', exact: false }).click();
  await page.getByLabel('Lobisomem: O Apocalipse', { exact: true }).check();
  await page.getByRole('button', { name: 'Começar criação' }).click();
  await expect(page.locator('#char-name')).toBeVisible();
});

test('falha ao salvar mantém o personagem aberto', async ({ page }) => {
  await start(page);
  await page.getByRole('button', { name: 'Voltar à tela inicial', exact: true }).click();
  await page.evaluate(() => {
    Storage.prototype.setItem = () => { throw new Error('QuotaExceededError'); };
  });
  await page.getByRole('button', { name: 'Salvar e voltar ao início' }).click();
  await expect(page.getByRole('alert')).toContainText('Não foi possível salvar');
  await page.getByRole('button', { name: 'Continuar editando' }).click();
  await expect(page.locator('#char-name')).toHaveValue('Teste de retorno');
});
