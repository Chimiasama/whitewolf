import {test,expect} from '@playwright/test';
import {readFileSync,existsSync} from 'node:fs';
import path from 'node:path';

async function start(page) {
 await page.addInitScript(()=>{localStorage.setItem('whitewolf_locale','pt');localStorage.setItem('whitewolf_theme','vampire');});
 await page.goto('/');
 await page.getByRole('button',{name:'Criar personagem',exact:false}).click();
 await page.getByRole('button',{name:'Começar criação',exact:true}).click();
}

test('clã Hecata mostra livros ingleses depois das informações',async({page})=>{
 await start(page);
 await page.getByRole('button',{name:'Natureza',exact:false}).click();
 await page.getByRole('button',{name:'Hecata',exact:true}).click();
 const sources=page.getByRole('complementary',{name:'Referências bibliográficas'});
 await expect(sources).toContainText('Players Guide');
 await expect(sources).toContainText('22–24');
 await expect(sources).toContainText('Cults of the Blood Gods');
 await expect(sources).toContainText('inglês');
 await expect(page.getByText('Beijo Doloroso:',{exact:false})).toBeVisible();
 expect(await sources.evaluate(el=>!el.nextElementSibling)).toBe(true);
});

test('ajuda de Vira-lata termina no básico brasileiro e na página da caçada',async({page})=>{
 await start(page);
 await page.getByRole('button',{name:'Poderes',exact:false}).click();
 const region=page.getByRole('region',{name:'Tipo de predador',exact:true});
 await region.getByRole('button',{name:'Escolher',exact:true}).click();
 await region.getByRole('searchbox').fill('Vira-lata');
 await region.getByRole('button',{name:'Informações: Vira-lata',exact:true}).click();
 const dialog=page.getByRole('dialog',{name:'Vira-lata',exact:true});
 await expect(dialog).toContainText('Força + Briga');
 const sources=dialog.getByRole('complementary',{name:'Referências bibliográficas'});
 await expect(sources).toContainText('Vampiro: A Máscara — Livro Básico, 5ª edição');
 await expect(sources).toContainText('página 178');
 await expect(sources).toContainText('306–308');
 await expect(sources).toContainText('português brasileiro');
 expect(await dialog.locator('main').evaluate(el=>el.lastElementChild?.classList.contains('book-sources'))).toBe(true);
 await expect(sources).not.toContainText('docs/');
});

test('bibliografia não confunde as edições nem números de linhas com páginas',async({page})=>{
 const bibliography=JSON.parse(readFileSync(path.resolve('data/bookReferences.json'),'utf8'));
 for(const [key,refs] of Object.entries(bibliography.entries) as [string,any[]][]){
  expect(refs.length,key).toBeGreaterThan(0);
  for(const ref of refs){
   if(ref.language==='unverified'){expect(ref.pages,key).toBe('');continue;}
   expect(ref.pages,key).toMatch(/^\d+(?:[–-]\d+)?(?:,\s*\d+(?:[–-]\d+)?)*$/);
   expect(existsSync(path.resolve('docs',ref.file)),key).toBe(true);
   for(const range of ref.pages.split(',')){const [first,last]=range.trim().split(/[–-]/).map(Number);expect(first,key).toBeGreaterThan(0);expect(last||first,key).toBeGreaterThanOrEqual(first);}
  }
 }
 await page.goto('/');
 const result=await page.evaluate(async()=>{
  const {getBookReferences}=await import('/lib/bookReferences.tsx');
  return {v5:getBookReferences('Força','attribute:Strength','Vampire'),w5:getBookReferences('Força','attribute:Strength','Werewolf'),unknown:getBookReferences('Não existe','unknown')};
 });
 expect(result.v5.every(ref=>ref.book.startsWith('Vampiro: A Máscara'))).toBe(true);
 expect(result.w5.every(ref=>ref.book.startsWith('Werewolf: The Apocalypse'))).toBe(true);
 expect(result.unknown).toEqual([]);
});

test('área de recorte nativa é respeitada no cabeçalho e nos diálogos',async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await start(page);
 await page.evaluate(()=>{
  document.documentElement.style.setProperty('--safe-area-inset-top','32px');
  document.documentElement.style.setProperty('--safe-area-inset-bottom','24px');
 });
 await expect.poll(()=>page.locator('.app-header').evaluate(el=>parseFloat(getComputedStyle(el).paddingTop))).toBeGreaterThanOrEqual(44);
 await page.getByRole('button',{name:'Consultar regras',exact:true}).click();
 const rect=await page.getByRole('dialog',{name:'Consulta de regras',exact:true}).boundingBox();
 expect(rect.y).toBeGreaterThanOrEqual(32);
 expect(rect.y+rect.height).toBeLessThanOrEqual(820);
});
