import { test, expect } from '@playwright/test';

test.beforeEach(async({page})=>{await page.addInitScript(()=>localStorage.setItem('whitewolf_locale','pt'));await page.goto('/');});

test('rejeita dados inválidos sem derrubar a tela e permite nova importação',async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 for(const data of [{gameType:'Vampire',name:{bad:1}},{gameType:'Werewolf',tribe:'wendigo'},{gameType:'Vampire',schemaVersion:999},{gameType:'Vampire',advantages:[null]}]){
  await page.locator('input[type=file]').first().setInputFiles({name:'invalid.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(data))});
  await expect(page.getByRole('status')).toContainText('inválido');
  await expect(page.getByText('Vampiro: A Máscara',{exact:true})).toBeVisible();
 }
 expect(errors).toEqual([]);
});

test('catálogo W5 não oferece tribos de edições antigas; gerador respeita origens e patrono',async({page})=>{
 const report=await page.evaluate(async()=>{
  const {fnCreateRandomCharacter}=await import('/lib/randomizer.ts');
  const {asNarrativeNpc}=await import('/lib/npc.ts');
  const {parseCharacter}=await import('/lib/characterValidation.ts');
  const {W5_TRIBES,W5_GIFTS}=await import('/data/w5.ts');
  const failures:string[]=[];
  for(const type of ['Vampire','Werewolf'])for(const level of ['fledgling','neonate','ancilla'])for(let i=0;i<40;i++){
   const c=asNarrativeNpc(fnCreateRandomCharacter('pt',level,k=>k,type),level);
   try{parseCharacter(c);}catch(e){failures.push(String(e));}
   if(!c.narrative?.motivation||!c.narrative?.secret||!c.narrative?.hook)failures.push('narrativa');
   if(type==='Werewolf'){
    if(c.renown[W5_TRIBES[c.tribe].renown]!==2)failures.push('patrono');
    if(Object.keys(c.disciplines).length)failures.push('mistura de Disciplinas');
    if(new Set(c.gifts.map(g=>g.origin)).size!==3)failures.push('origens');
    if(c.gifts.some(g=>!W5_GIFTS.some(x=>x.id===g.id)))failures.push('Dom desconhecido');
   }else if(Object.entries(c.disciplines).some(([key,dots])=>c.disciplinePowers[key].length!==dots))failures.push('poderes incompletos');
  }
  return {failures,tribes:Object.keys(W5_TRIBES)};
 });
 expect(report.failures).toEqual([]);expect(report.tribes).toHaveLength(11);
 for(const retired of ['wendigo','uktena','criadefenris','fiandeirosdevidro'])expect(report.tribes).not.toContain(retired);
});

test('atributos com soma correta e distribuição errada não passam',async({page})=>{
 const result=await page.evaluate(async()=>{
  const {oInitialCharacter}=await import('/constants.ts');const {validAttributes,finishingIssues}=await import('/lib/characterValidation.ts');
  const c=structuredClone(oInitialCharacter);c.gameType='Werewolf';c.tribe='blackfuries';c.auspice='ahroun';
  Object.assign(c.attributes,{Strength:4,Dexterity:4,Stamina:4,Charisma:3,Manipulation:2,Composure:2,Intelligence:1,Wits:1,Resolve:1});
  return {sum:Object.values(c.attributes).reduce((a,b)=>a+b,0),valid:validAttributes(c),issues:finishingIssues(c)};
 });
 expect(result.sum).toBe(22);expect(result.valid).toBe(false);expect(result.issues.some(i=>i.includes('Renome'))).toBe(true);expect(result.issues.some(i=>i.includes('Rito'))).toBe(true);
});

for(const game of ['Vampire','Werewolf'])test(`NPC ${game}: exporta, reimporta e salva sem perder narrativa`,async({page},testInfo)=>{
 await page.getByText(game==='Vampire'?'Vampiro: A Máscara':'Lobisomem: O Apocalipse',{exact:true}).click();
 await page.getByRole('button',{name:'NPC em ascensão'}).click();
 await expect(page.getByText('NPC temático — sem orçamento de XP',{exact:true})).toBeVisible();
 await expect(page.getByText('Segredo',{exact:true})).toBeVisible();
 const downloadPromise=page.waitForEvent('download');await page.getByRole('button',{name:'Exportar JSON',exact:true}).click();
 const download=await downloadPromise;const path=testInfo.outputPath('character.json');await download.saveAs(path);
 await page.reload();await page.locator('input[type=file]').first().setInputFiles(path);
 await expect(page.getByText('NPC temático — sem orçamento de XP',{exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Salvar',exact:true}).first().click();
 const dialog=page.getByRole('dialog');await dialog.locator('input').fill('Teste de preservação');await dialog.getByRole('button',{name:'Salvar',exact:true}).click();
 const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('whitewolf_save_Teste de preservação')!));
 expect(saved.schemaVersion).toBe(2);expect(saved.profile).toBe('npc');expect(saved.narrative.secret).toBeTruthy();expect(saved.gameType).toBe(game);
 await page.reload();await page.getByRole('button',{name:'Carregar',exact:true}).click();await page.getByRole('dialog').getByText('Teste de preservação',{exact:true}).click();await expect(page.getByText('NPC temático — sem orçamento de XP',{exact:true})).toBeVisible();
 await page.reload();await page.getByRole('button',{name:'Recuperar rascunho'}).click();await expect(page.getByText('NPC temático — sem orçamento de XP',{exact:true})).toBeVisible();
 await page.setViewportSize({width:390,height:844});await expect(page.getByRole('button',{name:'Exportar JSON',exact:true})).toBeVisible();
 await page.screenshot({path:testInfo.outputPath('mobile.png'),fullPage:true});
});

test('build visual sem requests externos e com estilos/fontes locais',async({page})=>{
 const external:string[]=[];page.on('request',r=>{if(!new URL(r.url()).hostname.match(/^(localhost|127\.0\.0\.1)$/))external.push(r.url());});
 await page.reload();
 await expect(page.locator('html')).toHaveAttribute('lang','pt-BR');
 expect(await page.locator('body').evaluate(el=>getComputedStyle(el).fontFamily)).toContain('Inter');
 expect(external).toEqual([]);
});

test('pacotes de predador conferidos e orçamento adicional de Loresheets',async({page})=>{
 const r=await page.evaluate(async()=>{
  const {fnGetPredatorTypes,oInitialCharacter}=await import('/constants.ts');
  const {finishingIssues}=await import('/lib/characterValidation.ts');
  const types=fnGetPredatorTypes(k=>k);const osiris=types.find(p=>p.id==='osiris');const bagger=types.find(p=>p.id==='bagger');
  const c=structuredClone(oInitialCharacter);c.gameType='Vampire';c.advantages=[{id:'allies',name:'Aliados',description:'',cost:5,type:'advantage'}];c.loresheets=[{id:'reviewed-for-budget',level:2}];
  const budgetIssues=finishingIssues(c).filter(s=>s.includes('7 pontos'));
  return {osiris:{humanity:osiris.humanityModifier,adv:osiris.advantages.reduce((s,a)=>s+a.cost,0),flaws:osiris.flaws.reduce((s,a)=>s+a.cost,0)},farmer:types.find(p=>p.id==='farmer').humanityModifier,bagger:bagger.advantages.map(a=>a.id),budgetIssues,community:types.find(p=>p.id==='business_owner').name};
 });
 expect(r.osiris).toEqual({humanity:0,adv:3,flaws:2});expect(r.farmer).toBe(1);expect(r.bagger).toContain('iron_gullet_bagger');expect(r.budgetIssues).toEqual([]);expect(r.community).toContain('Comunitário');
});

 test('Sangue-Fraco: equilíbrio, incompatibilidades e requisito Tremere',async({page})=>{
 const result=await page.evaluate(async()=>{
 const {thinBloodIssues}=await import('/data/thinBlood.ts');
 const base={thinMerits:['lifelike'],thinFlaws:['dead'],generation:14,bloodPotency:0,predatorType:null};
 return {conflict:thinBloodIssues(base),tremere:thinBloodIssues({...base,thinMerits:['day'],thinFlaws:['curse'],thinCurse:'tremere'}),valid:thinBloodIssues({...base,thinMerits:['catenating'],thinFlaws:['curse'],thinCurse:'tremere'})};
 });
 expect(result.conflict.some(x=>x.includes('incompatíveis'))).toBe(true);expect(result.tremere.some(x=>x.includes('Sangue Vinculante'))).toBe(true);expect(result.valid).toEqual([]);
 });
