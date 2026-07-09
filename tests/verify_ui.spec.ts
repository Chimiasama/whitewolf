import { test, expect } from '@playwright/test';

test('verify ravnos chimerstry and presence level 5 translations', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Select Vampire
  await page.click('text="Vampire: The Masquerade"');
  await page.click('button:has-text("Next")'); // From Game to Concept

  // Concept Step
  await page.fill('input[placeholder="Character Name"]', 'Test Vampire');
  await page.click('button:has-text("Next")'); // From Concept to Clan

  // Clan Step - Select Ravnos
  await page.click('button:has-text("Ravnos")');
  await page.click('button:has-text("Next")'); // From Clan to Attributes

  // Attributes Step - Just click Next (Random Neonate might have filled it, but we are doing it manually)
  // Wait, if we don't fill it, is Next enabled?
  // Let's use the Random button instead but then go back or something?
  // Better: fill attributes.

  // Actually, let's use the Random Neonate button and then check what clan we got.
  // If it's not Ravnos, we can just check whatever we got.
  // BUT the user specifically mentioned Chimerstry and Presence 5.

  // Let's try to automate the full flow for Ravnos.

  // To make Attributes valid (22 dots)
  // Standard: 4, 3, 3, 3, 2, 2, 2, 2, 1
  const setAttribute = async (label, dots) => {
    // This is tricky because of the custom PointAllocator
    // It has buttons with the number.
    const attrContainer = page.locator(`div:has-text("${label}")`).last();
    await attrContainer.locator(`button:has-text("${dots}")`).click();
  };

  await setAttribute('Strength', '4');
  await setAttribute('Dexterity', '3');
  await setAttribute('Stamina', '3');
  await setAttribute('Charisma', '3');
  await setAttribute('Manipulation', '2');
  await setAttribute('Composure', '2');
  await setAttribute('Intelligence', '2');
  await setAttribute('Wits', '2');
  await setAttribute('Resolve', '1');

  await page.click('button:has-text("Next")'); // From Attributes to Skills

  // Skills Step - Select a path
  await page.click('button:has-text("Jack of all Trades")');
  await page.click('button:has-text("Next")'); // From Skills to Finishing Touches

  // Finishing Touches - Disciplines
  // Ravnos should have Obfuscate and Presence available.

  // Check English first
  await page.screenshot({ path: '/home/jules/verification/screenshots/disciplines_en.png', fullPage: true });

  // Manage Obfuscate to see Chimerstry
  const obfuscateCard = page.locator('div:has-text("OBFUSCATE")').filter({ has: page.locator('button:has-text("MANAGE POWERS")') }).first();
  await obfuscateCard.locator('button:has-text("MANAGE POWERS")').click();

  await page.screenshot({ path: '/home/jules/verification/screenshots/obfuscate_powers_en.png' });

  // Check if Chimerstry is there (it's level 2)
  await expect(page.locator('text="Chimerstry"')).toBeVisible();

  await page.click('button:has-text("CLOSE")'); // Close modal

  // Manage Presence to see Level 5
  const presenceCard = page.locator('div:has-text("PRESENCE")').filter({ has: page.locator('button:has-text("MANAGE POWERS")') }).first();
  await presenceCard.locator('button:has-text("MANAGE POWERS")').click();

  // Scroll to level 5 or just check
  await page.screenshot({ path: '/home/jules/verification/screenshots/presence_powers_en.png' });
  await expect(page.locator('text="Majesty"')).toBeVisible();

  await page.click('button:has-text("CLOSE")');

  // Switch to Portuguese
  await page.click('button:has-text("EN")'); // Assuming the language toggle button shows EN when in English
  // Wait, let's find the language toggle. It's usually a button with "EN" or "PT".

  await page.screenshot({ path: '/home/jules/verification/screenshots/disciplines_pt.png', fullPage: true });

  // Check Obfuscate -> Quimerismo
  const obfuscateCardPt = page.locator('div:has-text("OFUSCAÇÃO")').filter({ has: page.locator('button:has-text("GERENCIAR PODERES")') }).first();
  await obfuscateCardPt.locator('button:has-text("GERENCIAR PODERES")').click();
  await page.screenshot({ path: '/home/jules/verification/screenshots/obfuscate_powers_pt.png' });
  await expect(page.locator('text="Quimerismo"')).toBeVisible();
  await page.click('button:has-text("FECHAR")');

  // Check Presence -> Majestade
  const presenceCardPt = page.locator('div:has-text("PRESENÇA")').filter({ has: page.locator('button:has-text("GERENCIAR PODERES")') }).first();
  await presenceCardPt.locator('button:has-text("GERENCIAR PODERES")').click();
  await page.screenshot({ path: '/home/jules/verification/screenshots/presence_powers_pt.png' });
  await expect(page.locator('text="Majestade"')).toBeVisible();
  await page.click('button:has-text("FECHAR")');
});
