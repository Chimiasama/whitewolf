import {test,expect} from '@playwright/test';
import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';

test('PDF enviado é a fonte vigente: preços e Aprendizado Rápido corrigidos',async({page})=>{
 const manifest=JSON.parse(readFileSync('data/unofficialGuideSource.json','utf8'));
 expect(createHash('sha256').update(readFileSync('docs/sources/V5_Vampire_Players_Guide_Unofficial.pdf')).digest('hex')).toBe(manifest.sha256);
 await page.goto('/');const result=await page.evaluate(async()=>{
  const {fnGetAdvantagesAndFlaws,oInitialCharacter}=await import('/constants.ts');const {quotePurchase}=await import('/lib/advancement.ts');const {fullAdvantageText}=await import('/data/advantageFullTexts.ts');
  const c={...structuredClone(oInitialCharacter),gameType:'Vampire',clan:'ventrue',creationCompletedAt:'2026-11-07',advantages:[{id:'fastlearner',cost:5}],skills:{...oInitialCharacter.skills,Athletics:1}};
  return {costs:Object.fromEntries(fnGetAdvantagesAndFlaws(k=>k,'Vampire').filter(a=>['calmheart','amnesia','highhumanity','unstakeable','disciplinecompetence','truefaith','curseditem'].includes(a.id)).map(a=>[a.id,a.cost])),attr:quotePurchase(c,{kind:'attribute',key:'Strength'}),skill:quotePurchase(c,{kind:'skill',key:'Athletics'}),specialty:quotePurchase(c,{kind:'specialty',key:'Athletics',choice:'Natação'}),faith:fullAdvantageText('truefaith','Vampire'),slippery:fullAdvantageText('slippery_merit_v','Vampire')};
 });expect(result.costs).toEqual({calmheart:3,amnesia:3,highhumanity:4,unstakeable:5,disciplinecompetence:5,truefaith:5,curseditem:5});expect(result.attr.cost).toBe(10);expect(result.attr.formula).not.toContain('Aprendizado');expect(result.skill.cost).toBe(4);expect(result.specialty.cost).toBe(2);expect(result.faith!.text).toContain('Humanidade 8');expect(result.slippery!.text).not.toContain('esquivar');
});

test('pacotes de Bully, poderes e Cerimônia seguem as categorias do PDF atual',async({page})=>{
 await page.goto('/');const result=await page.evaluate(async()=>{
  const {fnGetPredatorTypes,fnGetDisciplineDetails,oInitialCharacter}=await import('/constants.ts');const {HUNTING_REFERENCES}=await import('/data/huntingHelp.ts');const {OBLIVION_CEREMONIES}=await import('/data/oblivionCeremonies.ts');const {quotePurchase}=await import('/lib/advancement.ts');
  const ps=fnGetPredatorTypes(k=>k);const d=fnGetDisciplineDetails(k=>k);const ceremony=OBLIVION_CEREMONIES.find(c=>c.id==='bully-witness-the-end');
  const c={...structuredClone(oInitialCharacter),gameType:'Vampire',clan:'ventrue',creationCompletedAt:'2026-11-07',disciplines:{dominate:2,auspex:2,oblivion:3},disciplinePowers:{dominate:['cloudMemory','mesmerize'],auspex:[],oblivion:[]}};
  return {confidant:ps.find(p=>p.id==='confidant'),kidnapper:ps.find(p=>p.id==='kidnapper'),wolf:ps.find(p=>p.id==='wolfinsheepsclothing'),watcher:HUNTING_REFERENCES.watcher_from_water,online:HUNTING_REFERENCES.online_predator,scan:d.celerity.powers.find(p=>p.id==='scanTheRoom'),oldScan:d.auspex.powers.some(p=>p.id==='scanTheRoom'),oldWitness:d.oblivion.powers.some(p=>p.id==='witnessTheEnd'),aura:d.obfuscate.powers.find(p=>p.id==='shapeAura'),energy:d.dominate.powers.find(p=>p.id==='energyVampire'),ceremony,ceremonyCost:quotePurchase(c,{kind:'ceremony',key:ceremony!.id}).cost,object:quotePurchase(c,{kind:'discipline',key:'dominate',choice:'objectCommand'}).cost};
 });expect(result.confidant!.disciplineOptions).toEqual(['auspex','presence']);expect(result.confidant!.advantages.map(a=>[a.id,a.cost])).toEqual([['beasttamer_confidant',3]]);expect(result.kidnapper!.advantages[0].cost).toBe(5);expect(result.kidnapper!.humanityModifier).toBe(-1);expect(result.wolf!.advantages.map(a=>a.cost)).toEqual([2,1]);expect(result.watcher.tests[0].pool).toBe('Raciocínio + Furtividade');expect(result.online.note).toContain('não apresenta teste');expect(result.scan!.level).toBe(2);expect(result.oldScan).toBe(false);expect(result.oldWitness).toBe(false);expect(result.aura!.level).toBe(3);expect(result.energy!.amalgam).toEqual([{discipline:'oblivion',level:2}]);expect(result.ceremonyCost).toBe(9);expect(result.object).toBe(15);
});

test('24 predadores de Vesper têm fontes PDF, paradas, benefícios completos e identidade distinta',async({page})=>{
 await page.goto('/');const result=await page.evaluate(async()=>{
  const {fnGetPredatorTypes}=await import('/constants.ts');const {getBookReferences}=await import('/lib/bookReferences.tsx');const {HUNTING_REFERENCES}=await import('/data/huntingHelp.ts');const {fullAdvantageText}=await import('/data/advantageFullTexts.ts');
  const all=fnGetPredatorTypes(k=>k);const data=all.filter(p=>p.id.startsWith('vesper-'));
  const missing=data.flatMap(p=>[...p.advantages,...p.flaws,...(p.allocations||[]).flatMap(g=>g.options),...(p.choices||[]).flatMap(g=>g.options)].filter(a=>!fullAdvantageText(a.id,'Vampire')).map(a=>a.id));
  return {count:data.length,unique:new Set(all.map(p=>p.id)).size===all.length,missing,refs:data.map(p=>getBookReferences('',`predator:${p.id}`)),tests:data.map(p=>HUNTING_REFERENCES[p.id]),opportunists:all.filter(p=>p.englishName==='Opportunist').map(p=>p.id)};
 });expect(result.count).toBe(24);expect(result.unique).toBe(true);expect(result.missing).toEqual([]);for(const refs of result.refs)expect(refs).toEqual([expect.objectContaining({file:'V5NewPredatorTypes',pagination:'pdf',language:'en'})]);for(const ref of result.tests)expect(ref.tests.length).toBeGreaterThan(0);expect(result.opportunists.sort()).toEqual(['opportunist','vesper-opportunist']);
});

test('criação consulta fonte sem paginação e distribui três Antecedentes sem ultrapassar o pacote',async({page})=>{
 await page.addInitScript(()=>localStorage.setItem('whitewolf_locale','pt'));await page.goto('/');await page.getByRole('button',{name:'Criar personagem',exact:false}).click();await page.getByRole('button',{name:'Começar criação',exact:true}).click();await page.getByRole('button',{name:'Poderes',exact:false}).click();
 const picker=page.getByRole('region',{name:'Tipo de predador',exact:true});await picker.getByRole('button',{name:'Escolher',exact:true}).click();await picker.getByRole('searchbox').fill('Caçador de Ambulâncias');await picker.getByRole('button',{name:'Informações: Caçador de Ambulâncias',exact:true}).click();
 const dialog=page.getByRole('dialog');await expect(dialog).toContainText('Vesper Burjoski');await expect(dialog).toContainText('do PDF (sem numeração impressa)');await expect(dialog).toContainText('Manipulação + Medicina');await dialog.getByRole('button',{name:'Fechar',exact:true}).click();await picker.getByRole('button',{name:'Escolher',exact:true}).click();
 const custom=page.getByRole('region',{name:'Escolhas do predador',exact:true});await custom.getByLabel('Influência, Contatos e Aliados — Contatos',{exact:true}).selectOption('2');await custom.getByLabel('Influência, Contatos e Aliados — Aliados',{exact:true}).selectOption('1');
 const values=await page.evaluate(()=>Object.values(JSON.parse(localStorage.getItem('whitewolf_draft_v2')!).predatorAllocations) as number[]);expect(values.reduce((sum,n)=>sum+n,0)).toBe(3);expect(values).toContain(2);expect(values).toContain(1);
});

test('benefícios do predador identificam categorias e permitem consultar cada item sem mudar a escolha',async({page})=>{
 await page.addInitScript(()=>localStorage.setItem('whitewolf_locale','pt'));await page.goto('/');await page.getByRole('button',{name:'Criar personagem',exact:false}).click();await page.getByRole('button',{name:'Começar criação',exact:true}).click();await page.getByRole('button',{name:'Poderes',exact:false}).click();
 const picker=page.getByRole('region',{name:'Tipo de predador',exact:true});await picker.getByRole('button',{name:'Escolher',exact:true}).click();await picker.getByRole('searchbox').fill('Caçador de Ambulâncias');await picker.getByRole('button',{name:'Informações: Caçador de Ambulâncias',exact:true}).click();
 const preview=page.getByRole('dialog',{name:'Caçador de Ambulâncias',exact:true});const benefits=preview.getByRole('region',{name:'Benefícios do predador'});
 await expect(benefits).toContainText('Disciplina:');await expect(benefits).toContainText('Vantagens');await expect(benefits).toContainText('Defeito:');
 const info=benefits.getByRole('button',{name:/Informações:/});const title=(await info.first().getAttribute('aria-label'))!.replace('Informações: ','');await info.first().click();const nested=page.getByRole('dialog',{name:title,exact:true});await expect(nested).toContainText('Nível 1');await page.keyboard.press('Escape');await expect(preview).toBeVisible();
 const advantage=benefits.getByRole('button',{name:'Informações: Contatos',exact:true});await advantage.click();await expect(page.getByRole('dialog',{name:'Contatos',exact:true})).toContainText('Funcionamento e limites');await page.keyboard.press('Escape');await page.keyboard.press('Escape');await picker.getByRole('button',{name:'Escolher',exact:true}).click();
 await page.getByRole('region',{name:'Escolhas do predador'}).getByLabel('Influência, Contatos e Aliados — Contatos',{exact:true}).selectOption('2');
 const selected=page.getByRole('region',{name:'Escolhas do predador'}).getByRole('region',{name:'Benefícios do predador'});await expect(selected).toContainText('Você recebe deste predador');await expect(selected).toContainText('Vantagem:');const before=await page.evaluate(()=>localStorage.getItem('whitewolf_draft_v2'));await selected.getByRole('button',{name:'Informações: Contatos',exact:true}).click();await page.keyboard.press('Escape');expect(await page.evaluate(()=>localStorage.getItem('whitewolf_draft_v2'))).toBe(before);
});
