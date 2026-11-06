import {test,expect} from '@playwright/test';
async function openSheet(page,game='Vampire',patch={}){
 await page.addInitScript(()=>localStorage.setItem('whitewolf_locale','pt'));
 await page.goto('/');
 await page.evaluate(async({game,patch})=>{
  const {oInitialCharacter}=await import('/constants.ts');
  const c={...structuredClone(oInitialCharacter),gameType:game,name:'Teste de dados',concept:'Ficha para testes',profile:'player',creationCompletedAt:'2026-11-06T12:00:00Z',clan:game==='Vampire'?'brujah':null,tribe:game==='Werewolf'?'blackfuries':null,auspice:game==='Werewolf'?'ahroun':null,hunger:3,rage:3,...patch};
  c.attributes={...c.attributes,Strength:3,Stamina:3,Composure:3,Resolve:3};c.skills={...c.skills,Brawl:4};
  localStorage.setItem('whitewolf_save_Teste de dados',JSON.stringify(c));
 },{game,patch});
 await page.getByRole('button',{name:'Abrir personagens salvos'}).click();
 await page.getByRole('button',{name:'Carregar: Teste de dados',exact:true}).click();
 await page.getByRole('button',{name:'Rolar dados',exact:true}).click();
}
async function fixedDice(page,values:number[]){
 await page.evaluate(values=>{
  let index=0;
  crypto.getRandomValues=(buffer:any)=>{buffer[0]=(values[index++%values.length]-1);return buffer;};
 },values);
}
const modal=page=>page.getByRole('dialog',{name:'Rolagem de testes',exact:true});
const last=page=>modal(page).getByRole('region',{name:'Última rolagem'});

test('motor: críticos, dificuldade, Fome, Fúria e dados protegidos',async({page})=>{
 await page.goto('/');
 const result=await page.evaluate(async()=>{
  const {evaluateDice,rerollEligible,rerollDice,defaultRollConfig}=await import('/lib/dice.ts');
  const dice=(values:number[],type='normal')=>values.map((value,id)=>({id,value,type}));
  const cases=[
   evaluateDice(dice([10,10]),2),evaluateDice(dice([10,10,10]),2),evaluateDice(dice([10,10,10,10]),2),
   evaluateDice([{id:0,value:10,type:'hunger'},{id:1,value:10,type:'normal'}],2),
   evaluateDice([{id:0,value:1,type:'hunger'},{id:1,value:6,type:'normal'}],2),
   evaluateDice([{id:0,value:1,type:'hunger'},{id:1,value:6,type:'normal'}],1),
   evaluateDice([{id:0,value:1,type:'rage'},{id:1,value:2,type:'rage'},...dice([6,7,8]).map(d=>({...d,id:d.id+2}))],3),
   evaluateDice(dice([1,2,1,2],'rage'),2),evaluateDice(dice([1,6],'rage'),1),
   evaluateDice([{id:0,value:10,type:'hunger'},{id:1,value:10,type:'normal'}],8)
  ];
  const protectedDice=[{id:0,value:10,type:'hunger'},{id:1,value:1,type:'rage'},{id:2,value:2,type:'rage'},{id:3,value:3,type:'rage'},{id:4,value:10,type:'rage'},{id:5,value:10,type:'normal'}].map(rerollEligible);
  const base={id:'roll',config:{...defaultRollConfig,difficulty:1},pool:{base:2,total:2,special:1},dice:[{id:0,value:10,type:'hunger'},{id:1,value:10,type:'normal'}],original:[],rerolls:[],game:'Vampire',label:'Teste',timestamp:''};
  const revised=rerollDice(base,[1],()=>6);
  const errors=[];
  for(const ids of [[],[0],[1,1],[2],[0,1,2,3]])try{rerollDice(base,ids,()=>6);errors.push(ids);}catch{}
  for(const kind of ['willpower','humanity','rouse','rageCheck'])try{rerollDice({...base,config:{...base.config,kind}},[1],()=>6);errors.push(kind);}catch{}
  return {cases,protectedDice,errors,revised: evaluateDice(revised.dice,1),original:base.dice,changed:revised.dice};
 });
 expect(result.cases.map(r=>r.successes)).toEqual([4,5,8,4,1,1,3,0,1,4]);
 expect(result.cases[3].messy).toBe(true);expect(result.cases[4].bestial).toBe(true);expect(result.cases[5].bestial).toBe(false);
 expect(result.cases[6]).toMatchObject({brutal:true,brutalSuccesses:7});expect(result.cases[7].brutalSuccesses).toBe(4);expect(result.cases[8].brutal).toBe(false);expect(result.cases[9].messy).toBe(false);
 expect(result.protectedDice).toEqual([false,false,false,true,true,true]);expect(result.errors).toEqual([]);
 expect(result.revised).toMatchObject({successes:2,messy:false});expect(result.original[1].value).toBe(10);expect(result.changed[1].value).toBe(6);
});

test('motor: trilhas, penalidades, mínimo, gasto superficial e legado',async({page})=>{
 await page.goto('/');
 const result=await page.evaluate(async()=>{
  const {oInitialCharacter}=await import('/constants.ts');
  const {buildPool,defaultRollConfig,spendWillpower,canSpendWillpower}=await import('/lib/dice.ts');
  const {trackRemaining}=await import('/lib/damage.ts');
  const c={...structuredClone(oInitialCharacter),gameType:'Vampire',hunger:5,attributes:{...oInitialCharacter.attributes,Strength:3,Stamina:3,Composure:3,Resolve:3},skills:{...oInitialCharacter.skills,Brawl:4},damage:{health:{superficial:6,aggravated:0},willpower:{superficial:6,aggravated:0}}};
  const cfg={...defaultRollConfig};
  const physical=buildPool(c,cfg),partial=buildPool({...c,damage:{...c.damage,health:{superficial:5,aggravated:0}}},cfg);
  const reduced=buildPool(c,{...cfg,penaltyReduction:1}),ignored=buildPool(c,{...cfg,penaltyReduction:2});
  const social=buildPool(c,{...cfg,attribute:'Charisma'}),willpower=buildPool(c,{...cfg,kind:'willpower'});
  const spent=spendWillpower(c),noSpend=canSpendWillpower({...c,damage:{...c.damage,willpower:{superficial:0,aggravated:6}}});
  const legacy={...c,damage:undefined,health:5,willpower:4};
  const legacySpend=spendWillpower(legacy);
  const wolf={...c,gameType:'Werewolf',rage:5};
  return {physical,partial,reduced,ignored,social,willpower,spent:spent.damage,noSpend,legacyRemaining:trackRemaining(legacy,'willpower'),legacySpend:legacySpend.damage,wolf:buildPool(wolf,{...cfg,customPool:2,kind:'custom',modifier:-30}),tracker:buildPool(wolf,{...cfg,kind:'willpower'})};
 });
 expect(result.physical).toMatchObject({penalty:2,total:5,special:5});expect(result.partial.penalty).toBe(0);expect(result.reduced.penalty).toBe(1);expect(result.ignored.penalty).toBe(0);expect(result.social.penalty).toBe(2);
 expect(result.willpower).toMatchObject({base:0,total:1,special:0,penalty:0});expect(result.tracker.special).toBe(0);
 expect(result.spent.willpower).toEqual({superficial:5,aggravated:1});expect(result.noSpend).toBe(false);expect(result.legacyRemaining).toBe(4);expect(result.legacySpend.willpower).toEqual({superficial:3,aggravated:0});expect(result.wolf).toMatchObject({total:1,special:1});
});

test('V5: selecionar um 10 normal desfaz crítico bestial e gasta 1 FV sem alterar Fome',async({page})=>{
 await openSheet(page);await fixedDice(page,[10,3,4,10,6,3,4]);
 await modal(page).getByLabel('Dificuldade',{exact:true}).fill('2');await modal(page).getByRole('button',{name:'Rolar teste',exact:true}).click();
 await expect(last(page).getByLabel('Resultado da rolagem')).toContainText('Crítico bestial');
 await expect(last(page).getByLabel('Rerrolar dado 1 (Fome 10)',{exact:true})).toBeDisabled();
 await last(page).getByLabel('Rerrolar dado 4 (normal 10)',{exact:true}).check();await fixedDice(page,[6]);
 await last(page).getByRole('button',{name:'Gastar 1 Força de Vontade e rerrolar selecionados'}).click();
 await expect(last(page).getByLabel('Resultado da rolagem')).toContainText('3 sucessos');await expect(last(page).getByLabel('Resultado da rolagem')).not.toContainText('Crítico bestial');
 const c=await page.evaluate(()=>JSON.parse(localStorage.getItem('whitewolf_draft_v2')!));expect(c.damage.willpower.superficial).toBe(1);expect(c.willpower).toBe(5);expect(c.hunger).toBe(3);
 await last(page).getByLabel('Dificuldade deste resultado').fill('4');await expect(last(page).getByLabel('Resultado da rolagem')).toContainText('Falha');
});

test('W5: resultado brutal mostra falha ou 7; protege 1/2 e permite rerrolar Fúria 3',async({page})=>{
 await openSheet(page,'Werewolf');await fixedDice(page,[1,2,3,6,7,8,4]);await modal(page).getByRole('button',{name:'Rolar teste',exact:true}).click();
 await expect(last(page).getByLabel('Resultado da rolagem')).toContainText('Falha brutal ou 7 sucessos');
 await expect(last(page).getByLabel('Rerrolar dado 1 (Fúria 1)',{exact:true})).toBeDisabled();await expect(last(page).getByLabel('Rerrolar dado 2 (Fúria 2)',{exact:true})).toBeDisabled();
 await last(page).getByLabel('Rerrolar dado 3 (Fúria 3)',{exact:true}).check();await fixedDice(page,[10]);await last(page).getByRole('button',{name:'Gastar 1 Força de Vontade e rerrolar selecionados'}).click();
 await expect(last(page).getByLabel('Resultado da rolagem')).toContainText('Falha brutal ou 8 sucessos');
 const c=await page.evaluate(()=>JSON.parse(localStorage.getItem('whitewolf_draft_v2')!));expect(c.rage).toBe(3);expect(c.damage.willpower.superficial).toBe(1);
});

test('Força de Vontade não usa dados especiais e não permite rerrolagem',async({page})=>{
 await openSheet(page,'Werewolf',{damage:{health:{superficial:0,aggravated:0},willpower:{superficial:2,aggravated:0}}});
 await modal(page).getByLabel('Tipo de teste',{exact:true}).selectOption('willpower');await expect(modal(page).getByLabel('Parada calculada')).toContainText('4 dados · 4 normais · 0 de Fúria');
 await modal(page).getByRole('button',{name:'Rolar teste',exact:true}).click();await expect(last(page).getByRole('checkbox').first()).toBeDisabled();await expect(last(page).getByRole('button',{name:'Gastar 1 Força de Vontade e rerrolar selecionados'})).toHaveCount(0);
});

test('checagens atualizam recurso, sem críticos ou rerrolagem',async({page})=>{
 await openSheet(page,'Werewolf',{rage:1});await modal(page).getByLabel('Tipo de teste',{exact:true}).selectOption('rageCheck');await modal(page).getByLabel('Número de checagens').selectOption('2');await fixedDice(page,[1,2]);await modal(page).getByRole('button',{name:'Rolar teste',exact:true}).click();
 await expect(last(page)).toContainText('Fúria 1 → 0');await expect(modal(page).getByRole('button',{name:'Rolar teste',exact:true})).toBeDisabled();
 await expect.poll(()=>page.evaluate(()=>JSON.parse(localStorage.getItem('whitewolf_draft_v2')!).rage)).toBe(0);
});

test('mobile: trilha cheia aplica -2, efeito ignora 1, no máximo 3 dados selecionados',async({page},info)=>{
 await page.setViewportSize({width:360,height:800});
 await openSheet(page,'Vampire',{hunger:1,damage:{health:{superficial:6,aggravated:0},willpower:{superficial:0,aggravated:0}}});
 await expect(modal(page).getByLabel('Parada calculada')).toContainText('5 dados');await modal(page).getByText('Opções avançadas',{exact:true}).click();await modal(page).getByLabel('Redução da penalidade',{exact:true}).selectOption('1');await expect(modal(page).getByLabel('Parada calculada')).toContainText('6 dados');
 await fixedDice(page,[4]);await modal(page).getByRole('button',{name:'Rolar teste',exact:true}).click();
 for(const n of [2,3,4])await last(page).getByLabel(`Rerrolar dado ${n} (normal 4)`,{exact:true}).check();
 await expect(last(page).getByLabel('Rerrolar dado 5 (normal 4)',{exact:true})).toBeDisabled();
 await page.screenshot({path:info.outputPath('dice-mobile.png')});
 expect(await modal(page).evaluate(el=>el.scrollWidth<=el.clientWidth+1)).toBe(true);
});

test('V5: ignorar Vitalidade paga uma vez por turno; checagem em Fome 5 pede frenesi',async({page})=>{
 await openSheet(page,'Vampire',{hunger:5,damage:{health:{superficial:6,aggravated:0},willpower:{superficial:0,aggravated:0}}});
 await modal(page).getByText('Opções avançadas',{exact:true}).click();
 await modal(page).getByRole('button',{name:'Gastar 1 Força de Vontade e ignorar penalidade de Vitalidade por um turno',exact:true}).click();
 await expect(modal(page).getByLabel('Parada calculada')).toContainText('7 dados');
 await modal(page).getByRole('button',{name:'Rolar teste',exact:true}).click();await modal(page).getByRole('button',{name:'Rolar teste',exact:true}).click();
 expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('whitewolf_draft_v2')!).damage.willpower.superficial)).toBe(1);
 await modal(page).getByRole('button',{name:'Encerrar efeito de um turno',exact:true}).click();await expect(modal(page).getByLabel('Parada calculada')).toContainText('5 dados');
 await modal(page).getByLabel('Tipo de teste',{exact:true}).selectOption('rouse');await fixedDice(page,[1]);await modal(page).getByRole('button',{name:'Rolar teste',exact:true}).click();await expect(last(page)).toContainText('teste de frenesi de fome necessário');
});
