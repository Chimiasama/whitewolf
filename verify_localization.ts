import { test, expect } from '@playwright/test';

test('verify localization and point counters', async ({ page }) => {
  // Force Portuguese locale via localStorage
  await page.addInitScript(() => {
    window.localStorage.setItem('vtm_locale', 'pt');
  });

  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');

  // Verify we are in Portuguese
  await expect(page.locator('text=ESCOLHA SEU DESTINO')).toBeVisible();

  // Select Vampire
  const vampire_btn = page.locator('button:has-text("PRÓXIMO")').first();
  await vampire_btn.click();

  // Create Character
  await expect(page.locator('text=CRIADOR DE PERSONAGENS')).toBeVisible();

  // Fill name
  await page.fill('input[placeholder="Nome"]', 'Test Character');

  // Go to next step (Concept)
  await page.click('button:has-text("PRÓXIMO")');

  // Go to next step (Clan)
  await page.click('button:has-text("PRÓXIMO")');

  // Select a Clan (e.g., Brujah)
  await page.click('text=Brujah');

  // Verify Potência is visible (Brujah has Potence)
  await expect(page.locator('text=Potência')).toBeVisible();

  // Go to next step (Attributes)
  await page.click('button:has-text("PRÓXIMO")');

  // Check point counters - should NOT have "av."
  // The locator should look for a number alone in the counter area
  // Based on the code: <div className="..."> {nDots} </div>
  const attributeCounter = page.locator('div:has-text("Atributos")').locator('..').locator('div.rounded-full');
  const counterText = await attributeCounter.first().textContent();
  console.log('Counter text:', counterText);
  expect(counterText?.trim()).not.toContain('av.');
  expect(counterText?.trim()).toMatch(/^\d+$/);

  // Jump to finishing touches to check Character Sheet
  await page.click('button:has-text("TOQUES FINAIS")');

  // Wait for Character Sheet
  await expect(page.locator('text=FICHA DE PERSONAGEM')).toBeVisible();

  // Check labels in Character Sheet
  await expect(page.locator('text=Nível')).toBeVisible();
  await expect(page.locator('text=Requisitos')).toBeVisible();

  // Take screenshot of the sheet
  await page.screenshot({ path: '/home/jules/verification/screenshots/character_sheet_pt.png', fullPage: true });
});
