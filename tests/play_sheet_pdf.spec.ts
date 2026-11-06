import {test,expect} from '@playwright/test';
import {readFile} from 'node:fs/promises';
async function saved(page,game='Vampire'){
 await page.addInitScript(()=>localStorage.setItem('whitewolf_locale','pt'));await page.goto('/');
 await page.evaluate(async game=>{const {oInitialCharacter}=await import('/constants.ts');const c={...structuredClone(oInitialCharacter),name:'Camila Álvares',concept:'Investigadora da noite',backstory:'História completa com acentuação: ação, memória e vínculos.',gameType:game,profile:'player',creationCompletedAt:'2026-11-06T12:00:00Z',clan:game==='Vampire'?'brujah':null,tribe:game==='Werewolf'?'blackfuries':null,auspice:game==='Werewolf'?'theurge':null,sire:'Doutora Beatriz',hunger:3,rage:3};const canvas=document.createElement('canvas');canvas.width=40;canvas.height=60;canvas.getContext('2d').fillRect(0,0,40,60);c.portraitUrl=canvas.toDataURL('image/png');c.convictions=[{belief:'Proteger quem não pode se defender.',touchstone:'Doutora Júlia'}];c.skills.Brawl=4;c.attributes.Strength=3;c.disciplines=game==='Vampire'?{presence:1}:{};c.disciplinePowers=game==='Vampire'?{presence:['awe']}:{};localStorage.setItem('whitewolf_save_Camila',JSON.stringify(c));},game);
 await page.getByRole('button',{name:'Abrir personagens salvos'}).click();await page.getByRole('button',{name:'Carregar: Camila',exact:true}).click();
}
test('abrir ficha vai direto para jogo; tocar Briga abre teste simples e conserva opções',async({page},info)=>{
 await page.setViewportSize({width:390,height:844});await saved(page);
 await expect(page.getByRole('region',{name:'Personagem em jogo'})).toBeVisible();await expect(page.locator('.creation-progress')).toHaveCount(0);await expect(page.locator('.app-footer')).toHaveCount(0);
 await page.getByRole('button',{name:'Rolar Briga',exact:true}).click();const dialog=page.getByRole('dialog',{name:'Rolagem de testes'});
 await expect(dialog.getByLabel('Habilidade do teste',{exact:true})).toHaveValue('Brawl');await expect(dialog.getByLabel('Tipo de teste',{exact:true})).toHaveCount(0);await expect(dialog.getByLabel('Modificador de dados',{exact:true})).toHaveCount(0);
 await dialog.getByLabel('Atributo do teste',{exact:true}).selectOption('Strength');await dialog.getByLabel('Dificuldade',{exact:true}).fill('2');await expect(dialog.getByLabel('Parada calculada')).toContainText('7 dados · 4 normais · 3 de Fome');
 await page.screenshot({path:info.outputPath('quick-roll.png')});await dialog.getByRole('button',{name:'Rolar teste',exact:true}).click();await expect(dialog.getByRole('region',{name:'Última rolagem'})).toBeVisible();
 await dialog.getByRole('button',{name:'Mais opções',exact:true}).click();await expect(dialog.getByLabel('Tipo de teste',{exact:true})).toBeVisible();await expect(dialog.getByLabel('Modificador de dados',{exact:true})).toBeVisible();
});
test('concluir criação abre ficha de jogo; edição é explícita e salva as alterações',async({page})=>{
 await page.goto('/');await page.getByRole('button',{name:'Criar NPC',exact:false}).click();await page.getByRole('button',{name:'Gerar NPC',exact:true}).click();await page.getByRole('button',{name:'Concluir criação',exact:true}).click();await page.getByRole('dialog').getByRole('button',{name:'Salvar',exact:true}).click();
 await expect(page.getByRole('region',{name:'Personagem em jogo'})).toBeVisible();await expect(page.getByRole('button',{name:'Concluir criação',exact:true})).toHaveCount(0);
 await page.getByRole('button',{name:'Editar personagem',exact:true}).click();await page.locator('#char-name').fill('Nome revisado');await page.getByRole('button',{name:'Salvar rascunho',exact:true}).click();
 await expect(page.getByRole('region',{name:'Personagem em jogo'})).toContainText('Nome revisado');
 const names=await page.evaluate(()=>Object.keys(localStorage).filter(key=>key.startsWith('whitewolf_save_')).map(key=>JSON.parse(localStorage.getItem(key)!).name));expect(names).toEqual(['Nome revisado']);
});
test('PDF real para download, com foto e múltiplas páginas',async({page},info)=>{
 await saved(page);const download=page.waitForEvent('download');await page.getByRole('region',{name:'Personagem em jogo'}).getByRole('button',{name:'Salvar PDF',exact:true}).click();const file=await download;expect(file.suggestedFilename()).toBe('Camila-Alvares-ficha.pdf');const target=info.outputPath('character.pdf');await file.saveAs(target);expect((await readFile(target)).subarray(0,5).toString()).toBe('%PDF-');
 const result=await page.evaluate(async()=>{const {buildCharacterPdf}=await import('/lib/characterPdf.ts');const c=JSON.parse(localStorage.getItem('whitewolf_draft_v2')!);const t=key=>key;const pdf=await buildCharacterPdf(c,t);return {pages:pdf.pages,size:pdf.blob.size,warnings:pdf.warnings};});
 expect(result.pages).toBeGreaterThanOrEqual(3);expect(result.size).toBeGreaterThan(10000);expect(result.warnings).toEqual([]);
});

test('PDF de W5 inclui Dons e permite história longa sem truncar páginas',async({page},info)=>{
 await saved(page,'Werewolf');
 await page.getByRole('button',{name:'Editar personagem',exact:true}).click();
 await page.evaluate(async()=>{const {W5_GIFTS}=await import('/data/w5.ts');const c=JSON.parse(localStorage.getItem('whitewolf_draft_v2')!);c.gifts=[W5_GIFTS.find(g=>g.origin==='native')].map(g=>({id:g.id,origin:g.origin}));c.backstory=Array.from({length:180},(_,i)=>`Trecho ${i}: A alcateia protege as águas e mantém sua ligação com a comunidade.`).join('\n')+'\nFIM DA HISTÓRIA';localStorage.setItem('whitewolf_save_Long',JSON.stringify(c));});
 await page.reload();await page.getByRole('button',{name:'Abrir personagens salvos'}).click();await page.getByRole('button',{name:'Carregar: Long',exact:true}).click();
 const download=page.waitForEvent('download');await page.getByRole('region',{name:'Personagem em jogo'}).getByRole('button',{name:'Salvar PDF',exact:true}).click();const file=await download;await file.saveAs(info.outputPath('werewolf-long.pdf'));const bytes=await readFile(info.outputPath('werewolf-long.pdf'));expect(bytes.subarray(0,5).toString()).toBe('%PDF-');expect((bytes.toString('latin1').match(/\/Type\s*\/Page\b/g)||[]).length).toBeGreaterThan(4);
});
