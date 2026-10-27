import {test,expect} from '@playwright/test';
async function start(page,game='Vampiro: A Máscara'){
 await page.goto('/');await page.getByRole('button',{name:'Criar personagem',exact:false}).click();await page.getByLabel(game,{exact:true}).check();await page.getByRole('button',{name:'Começar criação',exact:true}).click();
}
async function ties(page){
 await page.getByRole('button',{name:'Vínculos e recursos',exact:false}).click();await page.getByRole('tab',{name:'Vínculos',exact:true}).click();
}
const draft=page=>page.evaluate(()=>JSON.parse(localStorage.getItem('whitewolf_draft_v2')||'null'));
test('relacionamentos e caern validam e preservam JSON sem exigir preenchimento narrativo',async({page})=>{
 await page.goto('/');
 const result=await page.evaluate(async()=>{
  const {oInitialCharacter}=await import('/constants.ts');const {parseCharacter,playerIssues}=await import('/lib/characterValidation.ts');
  const c={...structuredClone(oInitialCharacter),gameType:'Werewolf',relationships:[{id:'r1',name:'Ana',kind:'Vampira',clan:'brujah',tribe:'',faction:'Anarquistas',role:'Aliada',feeling:'Respeito e medo',theirFeeling:'Curiosidade',notes:'Uma dívida antiga.'}],caernRecord:{name:'Nascente',guardian:'Garça',agreements:'Não abandonar os visitantes'}};
  const saved=parseCharacter(JSON.parse(JSON.stringify(c)));let invalid=false,duplicate=false;
  try{parseCharacter({...c,relationships:[{...c.relationships[0],clan:'inexistente'}]});}catch{invalid=true;}
  try{parseCharacter({...c,relationships:[c.relationships[0],c.relationships[0]]});}catch{duplicate=true;}
  return {relationships:saved.relationships,caern:saved.caernRecord,invalid,duplicate,issues:playerIssues(saved).filter(x=>/relacionamento|caern/i.test(x)),legacy:parseCharacter({...oInitialCharacter,gameType:'Vampire'}).relationships};
 });
 expect(result.relationships[0].feeling).toBe('Respeito e medo');expect(result.caern.guardian).toBe('Garça');expect(result.invalid&&result.duplicate).toBe(true);expect(result.issues).toEqual([]);expect(result.legacy).toBeUndefined();
});
test('sugestões só alteram o campo quando uma ideia é escolhida',async({page})=>{
 await start(page);await page.locator('#char-ambition').fill('Minha ambição original');await page.locator('#char-desire').fill('Meu desejo original');
 await page.getByRole('button',{name:'Ideias de ambição',exact:true}).click();await expect(page.locator('#char-ambition')).toHaveValue('Minha ambição original');
 const first=await page.getByRole('button',{name:/^Usar ideia:/}).first().getAttribute('aria-label');
 await page.getByRole('button',{name:'Outras ideias',exact:true}).click();expect(await page.getByRole('button',{name:/^Usar ideia:/}).first().getAttribute('aria-label')).not.toBe(first);
 const selected=(await page.getByRole('button',{name:/^Usar ideia:/}).first().getAttribute('aria-label')).replace('Usar ideia: ','');
 await page.getByRole('button',{name:/^Usar ideia:/}).first().click();await expect(page.locator('#char-ambition')).toHaveValue(selected);await expect(page.locator('#char-desire')).toHaveValue('Meu desejo original');
 await page.getByRole('button',{name:'Ideias de objetivo para a sessão',exact:true}).click();await expect(page.locator('#char-desire')).toHaveValue('Meu desejo original');
});
test('registro de relações e caern é editável e sobrevive a exportar e reimportar',async({page},info)=>{
 await start(page,'Lobisomem: O Apocalipse');await ties(page);
 await page.getByRole('tab',{name:'Relacionamentos',exact:true}).click();await page.getByRole('button',{name:'Adicionar relacionamento',exact:true}).click();
 await page.getByLabel('Nome da relação 1',{exact:true}).fill('Lia');await page.getByLabel('Clã da relação 1',{exact:true}).selectOption('brujah');await page.getByLabel('O que sinto por essa pessoa da relação 1',{exact:true}).fill('Amizade e desconfiança');
 await page.getByLabel('O que ela sente por mim da relação 1',{exact:true}).fill('Respeito');await page.getByRole('tab',{name:'Registro do caern',exact:true}).click();
 await page.getByLabel('Nome do caern',{exact:true}).fill('Jardim da Chuva');await page.getByLabel('Espírito guardião',{exact:true}).fill('Garça da Nascente');
 await page.getByLabel('Tabus, deveres e acordos',{exact:true}).fill('Não poluir a água');
 await expect.poll(async()=>(await draft(page))?.caernRecord?.name).toBe('Jardim da Chuva');
 await page.getByText('Mais ações',{exact:true}).click();const wait=page.waitForEvent('download');await page.getByRole('button',{name:'Exportar JSON',exact:true}).click();const download=await wait;const path=info.outputPath('relationships.json');await download.saveAs(path);
 await page.reload();await page.locator('input[type=file]').first().setInputFiles(path);
 const restored=await draft(page);expect(restored.relationships[0]).toMatchObject({name:'Lia',clan:'brujah',feeling:'Amizade e desconfiança',theirFeeling:'Respeito'});expect(restored.caernRecord.guardian).toBe('Garça da Nascente');
 await page.getByText('Relacionamentos (1)',{exact:true}).click();await expect(page.getByText('Amizade e desconfiança',{exact:true})).toBeVisible();await page.getByText('Caern · Jardim da Chuva',{exact:true}).click();await expect(page.getByText('Garça da Nascente',{exact:true})).toBeVisible();
});
test('biblioteca consulta os cinco níveis e fecha com Escape sem alterar a ficha',async({page})=>{
 await start(page);const before=await draft(page);
 await page.getByRole('button',{name:'Consultar regras',exact:true}).click();await page.getByLabel('Categoria da consulta',{exact:true}).selectOption('disciplines');await page.getByLabel('Buscar na consulta',{exact:true}).fill('potência');
 const library=page.getByRole('dialog',{name:'Consulta de regras',exact:true});await library.getByRole('button',{name:'Informações: Potência',exact:true}).focus();await page.keyboard.press('Enter');
 const detail=page.getByRole('dialog',{name:'Potência',exact:true});for(let n=1;n<=5;n++)await expect(detail.getByRole('heading',{name:'Nível '+n,exact:true})).toBeVisible();
 await page.keyboard.press('Escape');await expect(detail).toHaveCount(0);await expect(library).toBeVisible();await page.keyboard.press('Escape');await expect(library).toHaveCount(0);expect(await draft(page)).toEqual(before);
});
test('segurar atributo abre consulta sem escolher pontos; movimento cancela o gesto',async({page})=>{
 await page.setViewportSize({width:390,height:844});await start(page);await page.getByRole('button',{name:'Capacidades',exact:false}).click();
 const target=page.locator('[data-help-label="Força"]').first();await target.scrollIntoViewIfNeeded();const box=await target.boundingBox();const before=(await draft(page)).attributes;
 await page.mouse.move(box.x+10,box.y+10);await page.mouse.down();await page.waitForTimeout(650);await page.mouse.up();
 const dialog=page.getByRole('dialog',{name:'Força',exact:true});await expect(dialog).toContainText('potência muscular');await expect(dialog.getByRole('button',{name:/^[0-5]/})).toHaveCount(0);expect((await draft(page)).attributes).toEqual(before);
 await page.keyboard.press('Escape');
 const b=await target.boundingBox();await page.mouse.move(b.x+10,b.y+10);await page.mouse.down();await page.mouse.move(b.x+30,b.y+30);await page.waitForTimeout(650);await page.mouse.move(2,2);await page.mouse.up();await expect(page.getByRole('dialog',{name:'Força',exact:true})).toHaveCount(0);
 expect((await draft(page)).attributes).toEqual(before);
});
test('todos os predadores têm consulta de caçada com fontes e distinção comunitária',async({page})=>{
 await page.goto('/');const result=await page.evaluate(async()=>{const {fnGetPredatorTypes}=await import('/constants.ts');const {HUNTING_POOLS}=await import('/data/huntingHelp.ts');const p=fnGetPredatorTypes(k=>k);return {missing:p.filter(p=>!(p.id in HUNTING_POOLS)).map(p=>p.id),farmer:HUNTING_POOLS.farmer,bloodleech:HUNTING_POOLS.bloodleech};});expect(result.missing).toEqual([]);expect(result.farmer).toEqual(['Autocontrole + Empatia com Animais']);expect(result.bloodleech).toEqual([]);
 await start(page);await page.getByRole('button',{name:'Consultar regras',exact:true}).click();await page.getByLabel('Categoria da consulta',{exact:true}).selectOption('predators');await page.getByLabel('Buscar na consulta',{exact:true}).fill('Fazendeiro');await page.getByRole('button',{name:'Informações: Fazendeiro',exact:true}).click();await expect(page.getByRole('dialog',{name:'Fazendeiro',exact:true})).toContainText('Autocontrole + Empatia com Animais');
});
test('Twice-Cursed é Defeito de dois pontos e conserva as duas Maldições',async({page})=>{
 await start(page);await page.getByRole('button',{name:'Natureza',exact:false}).click();await page.getByRole('button',{name:'Brujah',exact:true}).click();await page.getByRole('button',{name:'Vínculos e recursos',exact:false}).click();await page.getByRole('tab',{name:'Defeitos',exact:true}).click();
 const region=page.getByRole('region',{name:'Defeitos',exact:true});await region.getByRole('button',{name:'Escolher',exact:true}).click();await region.getByRole('searchbox').fill('Twice-Cursed');await region.locator('li').getByRole('button',{name:'Escolher',exact:true}).click();
 await expect(page.getByLabel('Maldição aplicada',{exact:true})).toHaveValue('both');await expect(page.getByLabel('Maldição aplicada',{exact:true})).toBeDisabled();const c=await draft(page);expect(c.flaws.find(f=>f.id==='twicecursed').cost).toBe(2);
 await region.getByRole('button',{name:'Remover Duas Vezes Amaldiçoado (Twice-Cursed)',exact:true}).click();await expect(page.getByLabel('Maldição aplicada',{exact:true})).toHaveValue('standard');await expect(page.getByLabel('Maldição aplicada',{exact:true})).toBeEnabled();
});
