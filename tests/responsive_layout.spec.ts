import { test, expect } from '@playwright/test';

async function start(page, game = 'Vampiro: A Máscara') {
  await page.addInitScript(() => {
    localStorage.setItem('whitewolf_locale', 'pt');
    localStorage.setItem('whitewolf_theme', 'vampire');
  });
  await page.goto('/');
  await page.getByRole('button', { name: 'Criar personagem', exact: false }).click();
  await page.getByRole('radio', { name: game, exact: true }).check();
  await page.getByRole('button', { name: 'Começar criação', exact: true }).click();
}

async function assertChrome(page) {
  const layout = await page.evaluate(() => {
    const header = document.querySelector('.app-header')!;
    const brand = header.querySelector('.app-brand')!.getBoundingClientRect();
    const actions = header.querySelector('.app-header-actions')!.getBoundingClientRect();
    const footer = document.querySelector('.app-footer')!.getBoundingClientRect();
    const buttons = [...document.querySelectorAll('.app-footer .ww-button')].map(e => e.getBoundingClientRect());
    const overlap = (a, b) => Math.min(a.right, b.right) - Math.max(a.left, b.left) > 1 && Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 1;
    return {
      brandOverlap: overlap(brand, actions),
      footerOverlap: buttons.some((a, i) => buttons.some((b, j) => j > i && overlap(a, b))),
      outside: [...document.querySelectorAll('.app-header-actions > button,.app-actions-menu > summary,.app-footer .ww-button')].some(e => {
        const r = e.getBoundingClientRect(); return r.left < -1 || r.right > innerWidth + 1 || r.width < 1;
      }),
      clipped: [...document.querySelectorAll('.app-header-actions > button,.app-actions-menu > summary,.app-footer .ww-button')].some(e => e.scrollWidth > e.clientWidth + 1 || e.scrollHeight > e.clientHeight + 1),
      footerBottom: footer.bottom,
      height: innerHeight,
      horizontalOverflow: document.documentElement.scrollWidth > innerWidth + 1,
    };
  });
  expect(layout.brandOverlap).toBe(false);
  expect(layout.footerOverlap).toBe(false);
  expect(layout.outside).toBe(false);
  expect(layout.clipped).toBe(false);
  expect(layout.horizontalOverflow).toBe(false);
  expect(layout.footerBottom).toBeLessThanOrEqual(layout.height + 1);
}

for (const game of ['Vampiro: A Máscara', 'Lobisomem: O Apocalipse']) {
  test(`layout responsivo nas seis etapas: ${game}`, async ({ page }) => {
    await start(page, game);
    for (const width of [320, 390, 768, 1280]) {
      await page.setViewportSize({ width, height: 844 });
      for (let step = 0; step < 6; step++) {
        await assertChrome(page);
        const outside = await page.locator('.app-main').evaluate(main => [...main.querySelectorAll('h2,h3,input:not([type=file]),textarea,select,[role=tab],.catalog-picker')].filter(e => {
          const r = e.getBoundingClientRect();
          return r.width > 0 && r.height > 0 && (r.left < -1 || r.right > innerWidth + 1);
        }).map(e => e.textContent?.slice(0, 80) || e.getAttribute('aria-label') || e.tagName));
        expect(outside).toEqual([]);
        if (step < 5) await page.getByRole('button', { name: 'Continuar', exact: true }).click();
      }
      for (let i = 0; i < 5; i++) await page.locator('.app-footer').getByRole('button', { name: 'Voltar', exact: true }).click();
    }
  });
}

test('texto ampliado, temas, menu e diálogo longo cabem na tela móvel', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await start(page);
  await page.evaluate(() => document.documentElement.style.fontSize = '20px');
  for (const theme of ['minimal','vampire','werewolf','neon','horror','medieval','paper','contrast']) {
    await page.evaluate(theme => document.documentElement.dataset.theme = theme, theme);
    await assertChrome(page);
  }
  await page.locator('.app-actions-menu > summary').click();
  const menu = page.locator('.app-actions-popover');
  await expect(menu).toBeVisible();
  const menuBox = await menu.boundingBox();
  expect(menuBox.x).toBeGreaterThanOrEqual(0);
  expect(menuBox.x + menuBox.width).toBeLessThanOrEqual(321);
  await page.locator('.app-actions-menu > summary').click();
  await page.getByRole('button',{name:'Salvar rascunho',exact:true}).click();
  const saveDialog = page.getByRole('dialog');
  const overflow = await saveDialog.evaluate(el => [...el.querySelectorAll('input,button')].some(control => {
    const r=control.getBoundingClientRect(), panel=el.getBoundingClientRect();
    return r.width>0 && (r.left<panel.left || r.right>panel.right);
  }));
  expect(overflow).toBe(false);
  await expect(saveDialog.getByRole('button',{name:'Salvar',exact:true})).toBeVisible();
  await page.keyboard.press('Escape');
  await page.getByRole('button',{name:'Consultar regras',exact:true}).click();
  await page.getByLabel('Categoria da consulta',{exact:true}).selectOption('predators');
  await page.getByLabel('Buscar na consulta',{exact:true}).fill('Osíris');
  await page.getByRole('button',{name:'Informações: Osíris',exact:true}).click();
  const dialog=page.getByRole('dialog',{name:'Osíris',exact:true});
  await expect(dialog).toBeVisible();
  const box=await dialog.boundingBox();
  expect(box.x).toBeGreaterThanOrEqual(0);
  expect(box.y).toBeGreaterThanOrEqual(0);
  expect(box.x+box.width).toBeLessThanOrEqual(321);
  expect(box.y+box.height).toBeLessThanOrEqual(741);
  await expect(dialog.getByRole('button',{name:'Fechar',exact:true})).toBeVisible();
});
