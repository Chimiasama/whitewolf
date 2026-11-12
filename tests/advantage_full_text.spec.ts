import {test,expect} from '@playwright/test';
test('todas as Vantagens e Defeitos selecionáveis têm texto e origem auditados',async({page})=>{
 await page.goto('/');
 const result=await page.evaluate(async()=>{
  const {fnGetAdvantagesAndFlaws,fnGetPredatorTypes}=await import('/constants.ts');
  const {fullAdvantageText}=await import('/data/advantageFullTexts.ts');
  const {advantageReference}=await import('/data/advantageReferences.ts');
  const {getBookReferences}=await import('/lib/bookReferences.tsx');
  const missing=[];const sources=[];let total=0;
  for(const game of ['Vampire','Werewolf'])for(const item of fnGetAdvantagesAndFlaws(k=>k,game)){
   total++;const full=fullAdvantageText(item.id,game);if(!full?.text||!advantageReference(item,game)?.fullText)missing.push(game+':'+item.id);
   if(full?.file&&!getBookReferences('',`${game==='Werewolf'?'wolfadvantage':'advantage'}:${item.id}`,game).some(ref=>ref.file===full.file&&ref.pages===full.pages))sources.push(game+':'+item.id);
  }
  const grants=fnGetPredatorTypes(k=>k).flatMap(p=>[...p.advantages,...p.flaws,...(p.choices||[]).flatMap(choice=>choice.options||[])]);
  const missingGrants=[...new Set(grants.filter(item=>!fullAdvantageText(item.id,'Vampire')).map(item=>item.id))];
  return {missing,sources,total,missingGrants,focused:fullAdvantageText('focused','Vampire'),haunted:fullAdvantageText('haunted','Vampire'),moon:fullAdvantageText('moonSlave','Werewolf')};
 });
 expect(result.missing).toEqual([]);expect(result.sources).toEqual([]);expect(result.missingGrants).toEqual([]);expect(result.total).toBeGreaterThanOrEqual(168);
 expect(result.focused!.file).toBe('Vampire5edPlayersGuide02');expect(result.focused!.text).toContain('Não sofre penalidades');
 expect(result.haunted!.costs).toEqual([5]);expect(result.haunted!.text).toContain('imune');expect(result.moon!.text).toContain('glabro ou hispo');
});

test('Sangue-Ralo consulta efeito, incompatibilidade e fonte sem gastar pontos comuns',async({page})=>{
 await page.addInitScript(()=>localStorage.setItem('whitewolf_locale','pt'));
 await page.goto('/');await page.getByRole('button',{name:'Criar personagem',exact:false}).click();await page.getByRole('button',{name:'Começar criação',exact:true}).click();
 await page.getByRole('button',{name:'Natureza',exact:false}).click();await page.getByRole('button',{name:/Sangue.Ralo/,exact:true}).click();await page.getByRole('button',{name:'Poderes',exact:false}).click();
 const merits=page.getByRole('region',{name:'Qualidades de Sangue-Ralo',exact:true});await merits.getByRole('button',{name:'Escolher',exact:true}).click();
 await merits.getByRole('searchbox').fill('Resiliência');await merits.getByRole('button',{name:'Informações: Resiliência Vampírica',exact:true}).click();
 const dialog=page.getByRole('dialog');await expect(dialog).toContainText('perfuração e corte');await expect(dialog).toContainText('Fragilidade Mortal');await expect(dialog).toContainText('Sem custo em pontos comuns');await expect(dialog.getByRole('complementary',{name:'Referências bibliográficas'})).toContainText('182–184');
 expect(await page.evaluate(()=>(JSON.parse(localStorage.getItem('whitewolf_draft_v2')!).thinMerits||[]))).toEqual([]);
 const sourceCount=await page.evaluate(async()=>{const texts=await import('/data/thinBloodReferences.json');return Object.values(texts.default).reduce((sum,group)=>sum+Object.values(group).filter(text=>typeof text==='string'&&text.length>40).length,0);});expect(sourceCount).toBe(16);
});
