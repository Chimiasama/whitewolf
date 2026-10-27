import {test,expect} from '@playwright/test';
test.beforeEach(async({page})=>{await page.goto('/');});
test('catálogos: identidades, acessos, níveis e referências',async({page})=>{
 const result=await page.evaluate(async()=>{
  const {W5_GIFTS,w5GiftIdentity}=await import('/data/w5.ts');
  const {BLOOD_RITUALS}=await import('/data/bloodRituals.ts');
  const {OBLIVION_CEREMONIES}=await import('/data/oblivionCeremonies.ts');
  const {V5_LORESHEETS}=await import('/data/v5Loresheets.ts');
  const {ALTERNATIVE_BANES}=await import('/data/alternativeBanes.ts');
  return {gifts:new Set(W5_GIFTS.map(g=>w5GiftIdentity(g.id))).size,accesses:W5_GIFTS.length,ids:new Set(W5_GIFTS.map(g=>g.id)).size,rituals:BLOOD_RITUALS.length,ceremonies:OBLIVION_CEREMONIES.length,lore:V5_LORESHEETS.length,banes:ALTERNATIVE_BANES.length,levels:[...new Set(BLOOD_RITUALS.map(r=>r.level))].sort()};
 });expect(result).toEqual({gifts:127,accesses:182,ids:182,rituals:47,ceremonies:10,lore:25,banes:14,levels:[1,2,3,4,5]});
});
test('cerimônias: poder obrigatório, custo e duplicação',async({page})=>{
 const result=await page.evaluate(async()=>{
  const {oInitialCharacter}=await import('/constants.ts');const {quotePurchase}=await import('/lib/advancement.ts');
  const c={...structuredClone(oInitialCharacter),gameType:'Vampire',clan:'hecata',creationCompletedAt:'2026-10-27T12:00:00Z',disciplines:{oblivion:1},disciplinePowers:{oblivion:[]}};
  let missing=false,duplicate=false;try{quotePurchase(c,{kind:'ceremony',key:'v5-ceremony-gift-of-false-life'});}catch{missing=true;}
  c.disciplinePowers.oblivion=['ashesToAshes'];const q=quotePurchase(c,{kind:'ceremony',key:'v5-ceremony-gift-of-false-life'});
  try{quotePurchase({...c,...q.patch},{kind:'ceremony',key:'v5-ceremony-gift-of-false-life'});}catch{duplicate=true;}
  return {missing,duplicate,cost:q.cost,rituals:q.patch.rituals.length};
 });expect(result).toEqual({missing:true,duplicate:true,cost:3,rituals:1});
});
for(const [age,xp,gen,potency] of [['neonate',15,13,1],['ancilla',35,11,2]] as const)test('idade inicial '+age,async({page})=>{
 const result=await page.evaluate(async(age)=>{
  const {oInitialCharacter}=await import('/constants.ts');const {applyCreationAge}=await import('/lib/advancedCreation.ts');const {parseCharacter}=await import('/lib/characterValidation.ts');const {experienceBalance}=await import('/lib/experience.ts');
  const c=applyCreationAge({...structuredClone(oInitialCharacter),gameType:'Vampire',clan:'brujah'},age);
  let duplicate=false;try{applyCreationAge(c,age);}catch{duplicate=true;}
  const restored=parseCharacter(JSON.parse(JSON.stringify(c)));
  return {balance:experienceBalance(restored),gen:restored.generation,potency:restored.bloodPotency,duplicate};
 },age);expect(result).toEqual({balance:xp,gen,potency,duplicate:true});
});
test('dano cheio converte superficial sem exceder capacidade',async({page})=>{
 const result=await page.evaluate(async()=>{
  const {applyDamage}=await import('/lib/damage.ts');
  const full={superficial:5,aggravated:0};return {superficial:applyDamage(full,5,'superficial',2),aggravated:applyDamage(full,5,'aggravated',2),capped:applyDamage(full,5,'aggravated',100)};
 });expect(result).toEqual({superficial:{superficial:3,aggravated:2},aggravated:{superficial:3,aggravated:2},capped:{superficial:0,aggravated:5}});
});
test('NPC espírito independente e persistente',async({page})=>{
 const result=await page.evaluate(async()=>{
  const {oInitialCharacter}=await import('/constants.ts');const {withNpcTemplate}=await import('/lib/npcTemplates.ts');const {trackCapacity}=await import('/lib/damage.ts');const {parseCharacter}=await import('/lib/characterValidation.ts');
  const c=parseCharacter(JSON.parse(JSON.stringify(withNpcTemplate({...structuredClone(oInitialCharacter),gameType:'Werewolf',tribe:'blackfuries',auspice:'ahroun'},'spirit'))));
  return {kind:c.npcTemplate.kind,health:trackCapacity(c,'health'),tribe:c.tribe,auspice:c.auspice,gifts:c.gifts};
 });expect(result).toEqual({kind:'spirit',health:6,tribe:null,auspice:null,gifts:[]});
});
test('imitações são fórmulas de um nível superior e sobrevivem ao parser',async({page})=>{
 const result=await page.evaluate(async()=>{
  const {oInitialCharacter,fnGetDisciplineDetails}=await import('/constants.ts');const {parseCharacter}=await import('/lib/characterValidation.ts');
  const d=fnGetDisciplineDetails(k=>k),p=d.thinbloodalchemy.powers.find(p=>p.id.startsWith('imitate-')&&p.level===2);
  const c=parseCharacter({...structuredClone(oInitialCharacter),gameType:'Vampire',clan:'thinblood',disciplines:{thinbloodalchemy:2},disciplinePowers:{thinbloodalchemy:[p.id]}});
  return {level:p.level,preserved:c.disciplinePowers.thinbloodalchemy[0]===p.id,ids:new Set(d.thinbloodalchemy.powers.map(p=>p.id)).size===d.thinbloodalchemy.powers.length};
 });expect(result).toEqual({level:2,preserved:true,ids:true});
});
test('Dom avançado confere Renome e impede segundo acesso',async({page})=>{
 const result=await page.evaluate(async()=>{
  const {oInitialCharacter}=await import('/constants.ts');const {quotePurchase}=await import('/lib/advancement.ts');
  const c={...structuredClone(oInitialCharacter),gameType:'Werewolf',tribe:'blackfuries',auspice:'galliard',creationCompletedAt:'2026-10-27T12:00:00Z',renown:{glory:3,honor:3,wisdom:2},gifts:[]};
  const q=quotePurchase(c,{kind:'gift',key:'galliard-break-the-shackles'});let duplicate=false,rank=false;
  try{quotePurchase({...c,...q.patch},{kind:'gift',key:'blackfuries-break-the-shackles'});}catch{duplicate=true;}
  try{quotePurchase({...c,renown:{glory:1,honor:1,wisdom:1}},{kind:'gift',key:'galliard-break-the-shackles'});}catch{rank=true;}
  return {duplicate,rank,cost:q.cost};
 });expect(result).toEqual({duplicate:true,rank:true,cost:2});
});
test('importação rejeita dano excedente e modelos malformados',async({page})=>{
 const result=await page.evaluate(async()=>{
  const {oInitialCharacter}=await import('/constants.ts');const {parseCharacter}=await import('/lib/characterValidation.ts');
  const c={...structuredClone(oInitialCharacter),gameType:'Vampire'};let damage=false,npc=false;
  try{parseCharacter({...c,damage:{health:{superficial:100,aggravated:0},willpower:{superficial:0,aggravated:0}}});}catch{damage=true;}
  try{parseCharacter({...c,npcTemplate:{kind:'spirit'}});}catch{npc=true;}return {damage,npc};
 });expect(result).toEqual({damage:true,npc:true});
});
test('Hecata alternativo aplica sobretaxa na compra de Refúgio',async({page})=>{
 const result=await page.evaluate(async()=>{
  const {oInitialCharacter}=await import('/constants.ts');const {quotePurchase}=await import('/lib/advancement.ts');
  const c={...structuredClone(oInitialCharacter),gameType:'Vampire',clan:'hecata',bloodPotency:2,creationCompletedAt:'2026-10-27T12:00:00Z'};
  return {standard:quotePurchase(c,{kind:'advantage',key:'haven'}).cost,alternative:quotePurchase({...c,baneVariant:'alternative'},{kind:'advantage',key:'haven'}).cost};
 });expect(result).toEqual({standard:3,alternative:5});
});

test('Comércio entre Iguais usa taxa de clã na Disciplina escolhida',async({page})=>{
 const result=await page.evaluate(async()=>{
  const {oInitialCharacter,fnGetDisciplineDetails}=await import('/constants.ts');const {quotePurchase}=await import('/lib/advancement.ts');
  const c={...structuredClone(oInitialCharacter),gameType:'Vampire',clan:'ventrue',creationCompletedAt:'2026-10-27T12:00:00Z',loresheets:[{id:'v5-low-clan',level:4}],resourceChoices:{lowClanDiscipline:'protean'}};
  const choice=fnGetDisciplineDetails(k=>k).protean.powers.find(p=>p.level===1).id;
  return {normal:quotePurchase({...c,resourceChoices:{}},{kind:'discipline',key:'protean',choice}).cost,traded:quotePurchase(c,{kind:'discipline',key:'protean',choice}).cost};
 });expect(result).toEqual({normal:7,traded:5});
});

test('interface gera espírito, edita Poder e dano e retoma o rascunho',async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.getByRole('button',{name:'Criar NPC',exact:true}).click();
 await page.getByRole('radio',{name:'Lobisomem: O Apocalipse',exact:true}).check();
 await page.getByLabel('Tipo de NPC',{exact:true}).selectOption('spirit');
 await page.getByRole('button',{name:'Gerar NPC',exact:true}).click();
 await expect(page.getByRole('heading',{name:/Espírito/})).toBeVisible();
 await page.getByLabel('Poder',{exact:true}).fill('4');
 await expect(page.getByText('Vitalidade: 8 (Poder ×2).',{exact:false})).toBeVisible();
 await page.getByRole('button',{name:'+1 superficial',exact:true}).click();
 await expect.poll(async()=>page.evaluate(()=>{const c=JSON.parse(localStorage.getItem('whitewolf_draft_v2')||'null');return c?.damage?.health?.superficial;})).toBe(1);
 await page.reload();await page.getByRole('button',{name:/Continuar personagem/}).click();
 await expect(page.getByRole('heading',{name:/Espírito/})).toBeVisible();
 await expect(page.getByLabel('Poder',{exact:true})).toHaveValue('4');
 expect(errors).toEqual([]);
});
test('modelos humano, carniçal e fomor sobrevivem ao JSON sem Dons de jogador',async({page})=>{
 const result=await page.evaluate(async()=>{
  const {oInitialCharacter}=await import('/constants.ts');const {withNpcTemplate}=await import('/lib/npcTemplates.ts');const {parseCharacter}=await import('/lib/characterValidation.ts');
  return ['human','ghoul','fomor'].map(kind=>{const c=parseCharacter(JSON.parse(JSON.stringify(withNpcTemplate({...structuredClone(oInitialCharacter),gameType:'Vampire'},kind))));return {kind:c.npcTemplate.kind,clan:c.clan,gifts:c.gifts.length};});
 });expect(result).toEqual([{kind:'human',clan:null,gifts:0},{kind:'ghoul',clan:null,gifts:0},{kind:'fomor',clan:null,gifts:0}]);
});
