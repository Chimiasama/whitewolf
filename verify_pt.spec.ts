import { test, expect } from '@playwright/test';

test('verify localization and point counters', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Choose Vampire
  await page.click('text=Vampiro: A Máscara');

  // Click Manual Creation
  await page.click('text=Criação Manual');

  // Name step
  await page.fill('input', 'Test Character');
  await page.click('button:has-text("Próximo")');

  // Concept step
  await page.fill('textarea', 'Test Concept');
  await page.click('button:has-text("Próximo")');

  // Game Selection (Standard)
  await page.click('text=Padrão');
  await page.click('button:has-text("Próximo")');

  // Attributes step
  // Check that "av" is not present in the point counters
  const attributeCounter = page.locator('.flex.items-center.gap-2.mb-1');
  const counterText = await attributeCounter.first().textContent();
  console.log('Attribute counter text:', counterText);
  // It should be something like "1 / 4" without "av"
  expect(counterText).not.toContain('av');
  expect(counterText).not.toContain('Avaliable');

  await page.screenshot({ path: '/home/jules/verification/screenshots/attributes_pt.png' });

  // Navigate to Clan selection to check Potence translation
  // We need to fill attributes first to enable "Próximo"
  // Let's just click some dots.
  // Actually, I can use the RANDOM NEONATE button to jump ahead.
  await page.goto('http://localhost:3000');
  await page.click('text=Vampiro: A Máscara');
  await page.click('text=Aleatório Neonato');

  // Now we are at Finishing Touches or similar?
  // Let's see where we are.
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '/home/jules/verification/screenshots/random_neonate_pt.png' });

  // In random neonate, it jumps to finishing touches.
  // Let's check the disciplines there.
  // We might need to open the character sheet.
  // Wait, the user said "Potence" appears instead of "Potência".
  // This likely happens in Clan selection or the sheet.

  // Go back to manual to check Clan selection
  await page.goto('http://localhost:3000');
  await page.click('text=Vampiro: A Máscara');
  await page.click('text=Criação Manual');
  // Fill enough to get to Clan
  await page.fill('input', 'Test');
  await page.click('button:has-text("Próximo")');
  await page.fill('textarea', 'Test');
  await page.click('button:has-text("Próximo")');
  await page.click('text=Padrão');
  await page.click('button:has-text("Próximo")');

  // Attributes - skip by selecting a path?
  await page.click('text=Equilibrado');
  // Auto fill attributes is not there, so we must click.
  // Or just check if "Brujah" shows "Potência"

  // I'll try to reach Clan step.
  // But I can also just check the translation file and the code.
  // I already did that and it looks correct.
});
