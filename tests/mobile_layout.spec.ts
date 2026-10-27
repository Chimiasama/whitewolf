import {test,expect} from '@playwright/test';
async function start(page){await page.goto('/');await page.getByRole('button',{name:'Criar personagem',exact:false}).click();await page.getByRole('button',{name:'Começar criação',exact:true}).click();}
for(const width of [320,360,390,430,844])test('cabeçalho e navegação cabem em '+width+' px',async({page})=>{
 await page.setViewportSize({width,height:740});await start(page);
 const report=await page.evaluate(()=>{const header=document.querySelector('.app-header')!,brand=header.querySelector('h1')!.getBoundingClientRect(),toolbar=header.querySelector('.app-toolbar')!.getBoundingClientRect(),footer=document.querySelector('.app-footer')!,buttons=[...footer.querySelectorAll('button')].map(e=>e.getBoundingClientRect());return {overlap:Math.min(brand.right,toolbar.right)>Math.max(brand.left,toolbar.left)&&Math.min(brand.bottom,toolbar.bottom)>Math.max(brand.top,toolbar.top),headerWidth:header.getBoundingClientRect().width,bodyWidth:document.documentElement.scrollWidth,buttons:buttons.map(r=>({x:r.x,right:r.right,width:r.width,height:r.height}))};});
 expect(report.overlap).toBe(false);expect(report.bodyWidth).toBe(width);expect(report.headerWidth).toBe(width);
 for(const b of report.buttons){expect(b.x).toBeGreaterThanOrEqual(0);expect(b.right).toBeLessThanOrEqual(width);expect(b.height).toBeGreaterThanOrEqual(44);}
 await page.getByRole('button',{name:'Consultar regras',exact:true}).click();const dialog=page.getByRole('dialog',{name:'Consulta de regras',exact:true});const box=await dialog.boundingBox();expect(box.x).toBeGreaterThanOrEqual(0);expect(box.x+box.width).toBeLessThanOrEqual(width);expect(box.height).toBeLessThanOrEqual(740);await page.keyboard.press('Escape');
 await page.getByRole('button',{name:'Continuar',exact:true}).click();await page.getByRole('button',{name:'Continuar',exact:true}).click();
 await expect(page.locator('body')).not.toContainText('ⓘ');await page.locator('[data-help-label="Força"] button').focus();await page.keyboard.press('F1');await expect(page.getByRole('dialog',{name:'Força',exact:true})).toContainText('potência muscular');
});
test('recursos começa pelas escolhas; ajustes ficam em aba própria',async({page})=>{
 await page.setViewportSize({width:390,height:844});await start(page);
 for(let n=0;n<4;n++)await page.getByRole('button',{name:'Continuar',exact:true}).click();
 const tabs=page.getByRole('tablist',{name:'Seções da etapa',exact:true});await expect(tabs).toBeVisible();expect((await tabs.boundingBox()).y).toBeLessThan(400);
 await expect(page.getByRole('heading',{name:'Idade e criação avançada',exact:true})).toHaveCount(0);
 await page.getByRole('tab',{name:'Ajustes e dano',exact:true}).click();await expect(page.getByRole('heading',{name:'Idade e criação avançada',exact:true})).toBeVisible();
 const scroll=await tabs.evaluate(el=>({client:el.clientWidth,scroll:el.scrollWidth,height:el.getBoundingClientRect().height}));expect(scroll.height).toBeLessThan(80);expect(scroll.scroll).toBeGreaterThan(scroll.client);
});
