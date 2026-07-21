import { test, expect } from '@playwright/test';

test('verify ravnos chimerstry and presence level 5 translations', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Select Vampire
  await page.click('text="Vampire: The Masquerade"');
  await page.click('button:has-text("Manual Creation")'); // From Game Mode Selection to Concept

  // Concept Step
  await page.fill('#char-name', 'Test Vampire');
  await page.fill('#char-concept', 'Disillusioned activist');
  await page.fill('#char-ambition', 'To overthrow the Prince');
  await page.fill('#char-desire', 'To taste the blood of a celebrity');
  await page.click('footer button:has-text("Next")'); // From Concept to Clan

  // Clan Step - Select Ravnos
  await page.click('button:has-text("Ravnos")');
  await page.click('footer button:has-text("Next")'); // From Clan to Attributes

  // Attributes Step - Distribute 22 dots (one 4, three 3s, four 2s, one 1)
  const setAttribute = async (label, dots) => {
    await page.locator('button').filter({ hasText: label }).last().click();
    const modal = page.locator('div[role="dialog"]');
    await modal.waitFor({ state: 'visible' });
    await modal.locator('button').filter({ has: page.locator('span.text-xl').filter({ hasText: new RegExp('^' + dots + '$') }) }).click();
    await modal.waitFor({ state: 'hidden' });
  };

  await setAttribute('Strength', '4');
  await setAttribute('Dexterity', '3');
  await setAttribute('Stamina', '3');
  await setAttribute('Charisma', '3');
  await setAttribute('Manipulation', '2');
  await setAttribute('Composure', '2');
  await setAttribute('Intelligence', '2');
  await setAttribute('Wits', '2');

  await page.click('footer button:has-text("Next")'); // From Attributes to Skills

  // Skills Step - Distribute points for Specialist path (one 4, three 3s, three 2s, three 1s)
  const setSkill = async (label, dots) => {
    await page.locator('button').filter({ hasText: label }).last().click();
    const modal = page.locator('div[role="dialog"]');
    await modal.waitFor({ state: 'visible' });
    await modal.locator('button').filter({ has: page.locator('span.text-xl').filter({ hasText: new RegExp('^' + dots + '$') }) }).click();
    await modal.waitFor({ state: 'hidden' });
  };

  await setSkill('Athletics', '4');
  await setSkill('Brawl', '3');
  await setSkill('Craft', '3');
  await setSkill('Drive', '3');
  await setSkill('Firearms', '2');
  await setSkill('Larceny', '2');
  await setSkill('Melee', '2');
  await setSkill('Stealth', '1');
  await setSkill('Survival', '1');
  await setSkill('Animal Ken', '1');

  await page.click('footer button:has-text("Next")'); // From Skills to Finishing Touches

  // Finishing Touches Step
  // Select Predator Type: Siren
  await page.locator('select').first().selectOption('siren');

  // Add remaining advantages to sum to >= 7 (Siren already adds Beautiful - 2 dots)
  const addAdvantage = async (name) => {
    const span = page.locator('span').filter({ hasText: new RegExp(`^${name}( \\(\\d+\\))?$`) }).first();
    const container = span.locator('xpath=..');
    await container.locator('button:has-text("Add")').click();
  };
  await addAdvantage('Allies');
  await addAdvantage('Contacts');
  await addAdvantage('Fame');
  await addAdvantage('Influence');
  await addAdvantage('Resources');

  // Add remaining flaws to sum to >= 2 (Siren already adds Enemy - 1 dot)
  const addFlaw = async (name) => {
    const span = page.locator('span').filter({ hasText: new RegExp(`^${name}( \\(\\d+\\))?$`) }).first();
    const container = span.locator('xpath=..');
    await container.locator('button:has-text("Add")').click();
  };
  await addFlaw('Addiction');

  // Add Specialty
  const specContainer = page.locator('h3:has-text("Specialties")').locator('xpath=..');
  await specContainer.locator('select').selectOption('Athletics');
  await specContainer.locator('input[placeholder="ex: Parkour"]').fill('Running');
  await specContainer.locator('button:has-text("Add")').click();

  // Allocate disciplines (Obfuscate = 2 dots, Presence = 2 dots)
  // 1. Obfuscate to 2 dots
  await page.locator('div:has-text("Obfuscate")').locator('button.rounded-full').nth(1).click();
  // 2. Presence to 2 dots (nth(1) because 0 is filled/disabled by Siren predator type)
  await page.locator('div:has-text("Presence")').locator('button.rounded-full').nth(1).click();

  // Check English first
  await page.screenshot({ path: '/home/jules/verification/screenshots/disciplines_en.png', fullPage: true });

  // Manage Obfuscate to see Chimerstry
  const obfuscateCard = page.locator('div:has-text("Obfuscate")').filter({ has: page.locator('button:has-text("Manage Powers")') }).first();
  await obfuscateCard.locator('button:has-text("Manage Powers")').click();

  await page.screenshot({ path: '/home/jules/verification/screenshots/obfuscate_powers_en.png' });

  await page.click('button:has-text("Confirm")'); // Close modal

  // Switch to Portuguese
  await page.click('button:has-text("EN")'); // Switch from English to Portuguese

  await page.screenshot({ path: '/home/jules/verification/screenshots/disciplines_pt.png', fullPage: true });
});
