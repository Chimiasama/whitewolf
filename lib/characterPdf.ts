import thinTexts from "../data/thinBloodReferences.json";
import {advantageReferenceText} from '../data/advantageReferences';
import {THIN_MERITS,THIN_FLAWS} from '../data/thinBlood';
import {alternativeBane,hasAlternativeBane} from '../data/alternativeBanes';
import {jsPDF} from 'jspdf';
import {Capacitor} from '@capacitor/core';
import {Directory,Filesystem} from '@capacitor/filesystem';
import {Share} from '@capacitor/share';
import {Character,GameType} from '../types';
import {aAttributeList,aSkillList,fnGetClanDetails,fnGetTribeDetails,fnGetAuspiceDetails,fnGetDisciplineDetails,fnGetPredatorTypes,fnGetLoresheets} from '../constants';
import {W5_GIFTS} from '../data/w5';
import {getBookReferences} from './bookReferences';
import {characterDamage,trackCapacity,trackRemaining} from './damage';

type Translate=(key:string)=>string;
let fontPromise:Promise<string>|undefined;
async function font(){
 if(!fontPromise)fontPromise=(async()=>{
  const response=await fetch(`${import.meta.env.BASE_URL}fonts/DejaVuSans.ttf`);
  if(!response.ok)throw new Error('Não foi possível carregar a fonte do PDF. Tente novamente.');
  const bytes=new Uint8Array(await response.arrayBuffer());let binary='';
  for(let i=0;i<bytes.length;i+=32768)binary+=String.fromCharCode(...bytes.subarray(i,i+32768));
  return btoa(binary);
 })().catch(e=>{fontPromise=undefined;throw e;});
 return fontPromise;
}
const labels:Record<string,string>={faction:'Seita ou facção',group:'Grupo',territory:'Território',haven:'Refúgio',caern:'Caern',patron:'Espírito patrono',publicMask:'Máscara pública',sireRelationship:'Relação com o Senhor',debts:'Dívidas e favores',resonance:'Ressonância',spiritRelations:'Relações com espíritos',personalTaboo:'Tabu pessoal',haranoTriggers:'Gatilhos de Harano',haugloskTriggers:'Gatilhos de Hauglosk',name:'Nome',kind:'Tipo',clan:'Clã',tribe:'Tribo',role:'Papel',feeling:'O que sinto',theirFeeling:'O que sente por mim',notes:'Notas',location:'Localização',description:'Descrição',guardian:'Guardião',spirits:'Espíritos',caretakers:'Responsáveis',rites:'Ritos',threats:'Ameaças',agreements:'Acordos',tone:'Tom',lines:'Linhas',veils:'Véus',tools:'Ferramentas',motivation:'Motivação',secret:'Segredo',relationship:'Vínculo',hook:'Gancho'};
export async function buildCharacterPdf(c:Character,t:Translate){
 const doc=new jsPDF({unit:'mm',format:'a4',compress:true});
 doc.addFileToVFS('DejaVuSans.ttf',await font());doc.addFont('DejaVuSans.ttf','Reference','normal');doc.setFont('Reference');
 doc.setProperties({title:`Ficha - ${c.name||'Personagem'}`,subject:'Ficha de personagem e referências',creator:'Whitewolf'});
 const wolf=c.gameType===GameType.Werewolf,clans=fnGetClanDetails(t),tribes=fnGetTribeDetails(t),auspices=fnGetAuspiceDetails(t),disciplines=fnGetDisciplineDetails(t);
 const warnings:string[]=[];let y=20;
 const newPage=()=>{doc.addPage();y=20;};
 const room=(height:number)=>{if(y+height>276)newPage();};
 const line=(text:string,size=10)=>{doc.setFontSize(size);doc.setTextColor(25,25,25);const rows=doc.splitTextToSize(String(text).replace(/\t/g,'  '),174) as string[];for(const row of rows){room(size*.45+1);doc.text(row,18,y);y+=size*.45+1;}y+=1;};
 const heading=(text:string)=>{room(18);y+=3;line(text,14);doc.setDrawColor(165,165,165);doc.line(18,y-1,192,y-1);y+=3;};
 const field=(name:string,value:unknown)=>{if(value!==undefined&&value!==null&&String(value).trim())line(`${name}: ${value}`);};
 const fields=(values:object|undefined)=>{for(const [key,value] of Object.entries(values||{}))if(key!=='id')field(labels[key]||key,value);};
 const sources=(title:string,sourceKey?:string)=>{for(const ref of getBookReferences(title,sourceKey,c.gameType||GameType.Vampire))if(ref.pages)line(`${ref.book} - p. ${ref.pages}${ref.language==='pt-BR'?' (pt-BR)':' (inglês)'}`,8);};
 const grid=(items:{name:string;value:number}[],columns=3)=>{const rows=Math.ceil(items.length/columns),width=174/columns;room(rows*6+3);doc.setFontSize(9);doc.setTextColor(25,25,25);for(let col=0;col<columns;col++)for(let row=0;row<rows;row++){const item=items[col*rows+row];if(item)doc.text(`${item.name}: ${item.value}`,18+col*width,y+row*6);}y+=rows*6+3;};
 line(c.name||'Personagem sem nome',20);
 line(wolf?'Lobisomem: O Apocalipse - 5ª edição':'Vampiro: A Máscara - 5ª edição',10);
 field(wolf?'Tribo':'Clã',wolf?c.tribe?tribes[c.tribe]?.name:'Não definida':c.clan?clans[c.clan]?.name:'Não definido');
 field(wolf?'Mentor':'Senhor',wolf?c.mentor:c.sire);if(wolf)field('Augúrio',c.auspice?auspices[c.auspice]?.name:'Não definido');
 field('Conceito',c.concept);
 if(c.npcTemplate){heading('Paradas do NPC');grid((['physical','social','mental','power'] as const).map((key,i)=>({name:['Física','Social','Mental','Poder'][i],value:c.npcTemplate![key]})),2);}
 else{heading('Atributos');grid(aAttributeList.map(key=>({name:t('attributes.list.'+key),value:c.attributes[key]})));heading('Habilidades');grid(aSkillList.map(key=>({name:t('skills.list.'+key),value:c.skills[key]})));}
 if(c.specialties.length)field('Especializações',c.specialties.map(s=>`${t('skills.list.'+s.skill)} (${s.name})`).join('; '));
 heading('Vantagens e Defeitos');field('Vantagens',c.advantages.map(a=>`${a.name} ${a.cost}`).join('; ')||'Nenhuma');field('Defeitos / complicações',c.flaws.map(a=>`${a.name} ${a.cost}`).join('; ')||'Nenhum');
 if(c.loresheets.length)field('Fichas de Conhecimento',c.loresheets.map(selected=>`${fnGetLoresheets(t).find(sheet=>sheet.id===selected.id)?.name||selected.id} (${selected.level})`).join('; '));
 if(c.clan==='thinblood'){field('Qualidades de Sangue-Ralo',c.thinMerits?.map(key=>THIN_MERITS[key]||key).join('; '));field('Defeitos de Sangue-Ralo',c.thinFlaws?.map(key=>THIN_FLAWS[key]||key).join('; '));field('Maldição herdada',c.thinCurse?clans[c.thinCurse]?.name||c.thinCurse:undefined);}
 heading(wolf?'Renome e Dons':'Disciplinas');
 if(wolf){field('Renome',`Glória ${c.renown.glory}, Honra ${c.renown.honor}, Sabedoria ${c.renown.wisdom}`);field('Dons',(c.gifts||[]).map(g=>W5_GIFTS.find(x=>x.id===g.id)?.name||g.id).join('; ')||'Nenhum');}
 else{for(const [key,dots] of Object.entries(c.disciplines).filter(([,n])=>n>0))field(disciplines[key]?.name||key,dots);field('Geração',c.generation);field('Potência de Sangue',c.bloodPotency);field('Humanidade',c.humanity);}
 heading('Condição atual');field(wolf?'Fúria':'Fome',wolf?c.rage:c.hunger);
 for(const key of ['health','willpower'] as const){if(c.npcTemplate?.kind==='spirit'&&key==='willpower')continue;const damage=characterDamage(c,key);field(key==='health'?'Vitalidade':'Força de Vontade',`${trackRemaining(c,key)}/${trackCapacity(c,key)} livres; ${damage.superficial} superficial, ${damage.aggravated} agravado`);}
 if(wolf){field('Harano',c.harano);field('Hauglosk',c.hauglosk);}
 newPage();heading('História, Convicções e Pilares');
 if(c.portraitUrl){try{room(64);const image=doc.getImageProperties(c.portraitUrl);const scale=Math.min(65/image.width,55/image.height);doc.addImage(c.portraitUrl,18,y,image.width*scale,image.height*scale);y+=image.height*scale+7;}catch{warnings.push('O retrato não pôde ser incorporado.');line('Retrato indisponível neste PDF.');}}
 field('Ambição',c.ambition);field('Desejo',c.desire);
 if(c.convictions?.length){heading('Convicções');for(const conviction of c.convictions){field('Convicção',conviction.belief);field('Pilar associado',conviction.touchstone);}}
 if(c.touchstoneLinks?.length){heading('Pilares');for(const link of c.touchstoneLinks){field('Nome',link.name);field('Vínculo',link.relationship);}}
 field('Pilares e anotações',c.touchstones);
 if(c.backstory){heading('História do personagem');line(c.backstory);}
 if(c.chronicle&&Object.values(c.chronicle).some(Boolean)){heading('Crônica e território');fields(c.chronicle);}
 if(c.narrative){heading('Narrativa do NPC');fields(c.narrative);}
 if(c.relationships?.length){heading('Relacionamentos');for(const relationship of c.relationships){const display={...relationship,clan:relationship.clan?clans[relationship.clan]?.name:undefined,tribe:relationship.tribe?tribes[relationship.tribe]?.name:undefined};fields(display);y+=3;}}
 if(c.caernRecord){heading('Registro do caern');fields(c.caernRecord);}
 if(c.sessionZero&&Object.values(c.sessionZero).some(Boolean)){heading('Acordos da mesa');fields(c.sessionZero);}
 newPage();heading(wolf?'Dons, Ritos e referências':'Disciplinas, poderes e referências');
 if(wolf){for(const gift of c.gifts||[]){const detail=W5_GIFTS.find(g=>g.id===gift.id);heading(detail?.name||gift.id);if(detail){line(detail.summary);line(detail.reference,8);sources(detail.name);}}}
 else for(const [key,dots] of Object.entries(c.disciplines).filter(([,n])=>n>0)){
  const detail=disciplines[key];heading(`${detail?.name||key} - nível ${dots}`);if(detail?.description)line(detail.description);
  const ids=c.disciplinePowers[key]||[];
  if(!ids.length)line('Nenhum poder selecionado nesta Disciplina.');
  for(const id of ids){const power=detail?.powers.find(p=>p.id===id);heading(power?`${power.name} - nível ${power.level}`:id);if(power){line(power.description);field('Sistema',power.system);field('Custo',power.cost);sources(power.name,`power:${key}:${id}`);}}
 }
 for(const [title,items] of [['Ritos / rituais',c.rituals],['Talismãs',c.talismans]] as const)if(items.length){heading(title);for(const item of items){heading(item.name);line(item.description);sources(item.name);}}
 if(c.predatorType){const predator=fnGetPredatorTypes(t).find(p=>p.id===c.predatorType);if(predator){heading(`Tipo de predador - ${predator.name}`);line(predator.description);sources(predator.name,`predator:${predator.id}`);}}
 for(const title of ['Vantagens','Defeitos'] as const){const items=title==='Vantagens'?c.advantages:c.flaws;if(items.length){heading(`${title} - descrição`);for(const item of items){heading(`${item.name} - ${item.cost} pontos`);line(advantageReferenceText(item,c.gameType));sources(item.name,`${wolf?"wolfadvantage":"advantage"}:${item.id}`);}}}
 if(c.clan==='thinblood')for(const [key,names,prefix] of [['thinMerits',THIN_MERITS,'thinmerit'],['thinFlaws',THIN_FLAWS,'thinflaw']] as const)for(const id of c[key]||[]){heading(names[id]||id);line(thinTexts[key][id]||'');line('Sem custo no orçamento comum; cada Defeito compensa uma Qualidade.');sources(names[id]||id,`${prefix}:${id}`);}
 const loresheets=fnGetLoresheets(t);
 for(const selected of c.loresheets){const sheet=loresheets.find(s=>s.id===selected.id);const level=sheet?.levels.find(l=>l.level===selected.level);heading(`${sheet?.name||selected.id} - ${selected.level} ${selected.level===1?"ponto":"pontos"}`);if(level){line(level.name);if(sheet)line(sheet.description);line(level.description);field('Sistema',level.system);}if(sheet)sources(sheet.name,`loresheet:${sheet.id}`);}
 if(c.npcTemplate){heading('Capacidades do NPC');field('Paradas excepcionais',c.npcTemplate.exceptional);field('Poderes e capacidades',c.npcTemplate.abilities);}
 if(c.clan){heading(`Clã - ${clans[c.clan]?.name||c.clan}`);const alternate=hasAlternativeBane(c)?alternativeBane(c):null;field('Maldição',c.baneVariant==='alternative'&&alternate?`${alternate.name}: ${alternate.summary}`:clans[c.clan]?.bane);if(alternate&&c.flaws.some(f=>['twicecursed','twice-cursed'].includes(f.id)))field('Maldição adicional',`${alternate.name}: ${alternate.summary}`);field('Compulsão',clans[c.clan]?.compulsion);}
 if(c.resourceChoices&&Object.keys(c.resourceChoices).length){heading('Detalhes dos recursos');for(const [key,value] of Object.entries(c.resourceChoices))field([...c.advantages,...c.flaws].find(a=>a.id===key)?.name||key,value);}
 if(c.experience?.length){heading('Experiência');for(const entry of c.experience)line(`${entry.date} - ${entry.kind==='earned'?'Ganho':'Gasto'}: ${entry.amount} XP - ${entry.note}`);}
 const pages=doc.getNumberOfPages();
 for(let page=1;page<=pages;page++){doc.setPage(page);doc.setFontSize(8);doc.setTextColor(90,90,90);doc.text(doc.splitTextToSize(c.name||'Whitewolf',125)[0],18,288);doc.text(`${page} / ${pages}`,192,288,{align:'right'});}
 return {blob:doc.output('blob'),pages,warnings};
}
export async function exportCharacterPdf(c:Character,t:Translate){
 const pdf=await buildCharacterPdf(c,t);
 const fileName=`${(c.name||'personagem').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9_-]+/gi,'-').slice(0,80)||'personagem'}-ficha.pdf`;
 if(Capacitor.isNativePlatform()){
  const base64=await new Promise<string>((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(String(reader.result).split(',')[1]);reader.onerror=()=>reject(new Error('Não foi possível preparar o PDF.'));reader.readAsDataURL(pdf.blob);});
  const saved=await Filesystem.writeFile({path:`pdf/${fileName}`,data:base64,directory:Directory.Cache,recursive:true});
  await Share.share({title:`Ficha - ${c.name}`,files:[saved.uri],dialogTitle:'Salvar ou compartilhar PDF'});
 }else{
  const url=URL.createObjectURL(pdf.blob),anchor=document.createElement('a');anchor.href=url;anchor.download=fileName;document.body.appendChild(anchor);anchor.click();anchor.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);
 }
 return {...pdf,fileName};
}
