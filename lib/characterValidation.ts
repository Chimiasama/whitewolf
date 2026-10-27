import {THIN_MERITS,THIN_FLAWS,thinBloodIssues} from '../data/thinBlood';
import { Character, GameType, Clan, Tribe, Auspice, Attribute, Skill } from '../types';
import { oInitialCharacter, oSkillPaths, aMandatorySpecialtySkills, fnGetClanDetails, fnGetDisciplineDetails, fnGetPredatorTypes } from '../constants';
import { W5_GIFTS, W5_TRIBES } from '../data/w5';
export const SCHEMA_VERSION = 2;
const object = (v: unknown): v is Record<string, any> => !!v && typeof v === 'object' && !Array.isArray(v);
const fail = (field: string): never => { throw new Error(`Arquivo de personagem inválido: ${field}.`); };
const integer = (v:unknown,min:number,max:number) => typeof v==='number' && Number.isInteger(v) && v>=min && v<=max;
/** Validate before React state changes. Unknown future schema versions must not be silently downgraded. */
export function parseCharacter(input:unknown):Character {
 if(!object(input)) return fail('documento');
 if(input.schemaVersion!==undefined && ![1,SCHEMA_VERSION].includes(input.schemaVersion)) return fail('versão não suportada');
 for(const [key,catalog] of [['thinMerits',THIN_MERITS],['thinFlaws',THIN_FLAWS]] as const)if(input[key]!==undefined&&(!Array.isArray(input[key])||input[key].length>3||new Set(input[key]).size!==input[key].length||input[key].some(id=>typeof id!=='string'||!(id in catalog))))return fail(key);
 if(input.thinCurse!==undefined&&!Object.values(Clan).includes(input.thinCurse))return fail('Maldição herdada');
 const raw:Record<string,any>=JSON.parse(JSON.stringify(input));
 if(!Object.values(GameType).includes(raw.gameType)) return fail('jogo');
 if(raw.profile!==undefined && !['player','npc'].includes(raw.profile)) return fail('perfil');
 const result={...oInitialCharacter,...raw,schemaVersion:SCHEMA_VERSION} as Character;
 for(const key of ['name','concept','ambition','desire','sire','mentor','touchstones','portraitUrl']) {
  const v=result[key]; if(v!==undefined && (typeof v!=='string'||v.length>2_000_000)) return fail(key);
 }
 if(result.portraitUrl && !/^data:image\/(jpeg|png|webp);base64,[a-z0-9+/=]+$/i.test(result.portraitUrl)) return fail('retrato: utilize upload local');
 for(const [key,allowed] of [['attributes',Object.values(Attribute)],['skills',Object.values(Skill)]] as const){
  if(raw[key]!==undefined&&!object(raw[key])) return fail(key);
  const values={...oInitialCharacter[key],...raw[key]};
  for(const [k,v] of Object.entries(values)) if(!allowed.includes(k as never)||!integer(v,key==='attributes'?1:0,5)) return fail(key+'.'+k);
  result[key]=values;
 }
 for(const [key,max] of [['generation',16],['bloodPotency',10],['hunger',5],['humanity',10],['rage',5],['harano',5],['hauglosk',5]] as const) if(!integer(result[key],0,max)) return fail(key);
 for(const key of ['health','willpower'] as const) if(result[key]!==null&&!integer(result[key],0,20)) return fail(key);
 for(const key of ['clan','tribe','auspice'] as const){const choices=key==='clan'?Clan:key==='tribe'?Tribe:Auspice;if(result[key]!=null&&!Object.values(choices).includes(result[key] as never))return fail(`${key}: opção de edição antiga ou desconhecida; requer revisão, sem conversão automática`);}
 for(const key of ['advantages','flaws','specialties','loresheets','rituals','talismans'] as const){
  const values=raw[key]??[];if(!Array.isArray(values)||values.length>300)return fail(key);
  for(const v of values){if(!object(v))return fail(key);
   if(key==='specialties'){if(!Object.values(Skill).includes(v.skill)||typeof v.name!=='string')return fail(key);}
   else if(typeof v.id!=='string')return fail(key);
   else if(key==='advantages'||key==='flaws'){if(typeof v.name!=='string'||typeof v.description!=='string'||!integer(v.cost,0,5)||v.type!==(key==='advantages'?'advantage':'flaw')||(v.levels!==undefined&&(!Array.isArray(v.levels)||!v.levels.every(n=>integer(n,0,5)))))return fail(key);}
   else if(key==='loresheets'){if(!integer(v.level,1,5))return fail(key);}
   else if(typeof v.name!=='string'||typeof v.description!=='string')return fail(key);
  } result[key]=values as any;
 }
 if(!object(result.disciplines)||!object(result.disciplinePowers))return fail('Disciplinas');
 const catalog=fnGetDisciplineDetails(k=>k);
 for(const [k,v] of Object.entries(result.disciplines))if(!catalog[k]||!integer(v,0,5))return fail('Disciplina '+k);
 for(const [k,v] of Object.entries(result.disciplinePowers))if(!catalog[k]||!Array.isArray(v)||v.some(id=>typeof id!=='string'||!catalog[k].powers.some(p=>p.id===id)))return fail('poderes');
 if(result.gameType===GameType.Werewolf&&Object.values(result.disciplines).some(v=>v>0))return fail('Dons legados precisam de revisão para W5');
 if(!object(result.renown))return fail('Renome');
 for(const key of ['glory','honor','wisdom'])if(!integer(result.renown[key],0,5))return fail('Renome');
 if(result.renown.shame!==undefined&&(!object(result.renown.shame)||Object.values(result.renown.shame).some(v=>typeof v!=='boolean')))return fail('Vexame');
 if(result.predatorType!==null&&typeof result.predatorType!=='string')return fail('predador');
 if(result.gameType===GameType.Vampire&&raw.gifts?.length)return fail('Dons de W5 em personagem V5');
 if(raw.gifts!==undefined&&(!Array.isArray(raw.gifts)||raw.gifts.length>100||raw.gifts.some(g=>!object(g)||!W5_GIFTS.some(x=>x.id===g.id&&x.origin===g.origin))))return fail('Dons');
 if(raw.narrative!==undefined&&(!object(raw.narrative)||['role','motivation','secret','relationship','hook'].some(k=>typeof raw.narrative[k]!=='string')))return fail('narrativa');
 return result;
}
export const validAttributes=(c:Character)=>Object.values(c.attributes).sort().join() === [1,2,2,2,2,3,3,3,4].join();
export function finishingIssues(c:Character):string[]{
 if(c.profile==='npc')return [];
 const issues:string[]=[];
 const predator=c.gameType===GameType.Vampire?fnGetPredatorTypes(k=>k).find(p=>p.id===c.predatorType):undefined;
 const adv=c.advantages.reduce((s,a)=>s+a.cost,0)+c.loresheets.reduce((s,l)=>s+l.level,0)-(predator?.advantages.reduce((s,a)=>s+a.cost,0)||0), flaws=c.flaws.reduce((s,a)=>s+a.cost,0)-(predator?.flaws.reduce((s,a)=>s+a.cost,0)||0);
 if(adv!==7)issues.push('Distribua exatamente 7 pontos de Vantagens (bônus de predador são adicionais).');
 if(flaws!==2)issues.push('Distribua exatamente 2 pontos de Defeitos (bônus de predador são adicionais).');
 for(const skill of aMandatorySpecialtySkills)if(c.skills[skill]>0&&!c.specialties.some(s=>s.skill===skill&&s.name.trim()))issues.push(`Escolha a especialidade gratuita de ${skill}.`);
 if(c.specialties.length < aMandatorySpecialtySkills.filter(k=>c.skills[k]>0).length+1 || !c.specialties.some(s=>c.skills[s.skill]>0&&s.name.trim()))issues.push('Escolha uma especialidade em uma Perícia com pontos.');
 if(c.gameType===GameType.Werewolf){
  const t=W5_TRIBES[c.tribe];if(!t||c.renown[t.renown]!==2||Object.values(c.renown).filter(v=>typeof v==='number').reduce((s:number,v:number)=>s+v,0)!==3)issues.push('Renome: 2 no Renome do patrono e 1 em outro.');
  for(const origin of ['native','auspice','tribe']){const selected=(c.gifts||[]).filter(g=>g.origin===origin);if(selected.length!==1||!W5_GIFTS.some(g=>g.id===selected[0]?.id&&g.origin===origin&&g.totalRenown<=3&&(origin==='native'||g.owner===(origin==='tribe'?c.tribe:c.auspice))))issues.push(`Escolha um Dom ${origin==='native'?'nativo':origin==='tribe'?'da tribo':'do augúrio'} elegível.`);}
  if(c.rituals.length!==1)issues.push('Escolha um Rito inicial (W5, p. 180).');
 } else {
  if(c.clan===Clan.ThinBlood) issues.push(...thinBloodIssues(c));
  else {
   const remaining={...c.disciplines};
   if(predator?.disciplineAdd){const d=predator.disciplineAdd;remaining[d.discipline]=(remaining[d.discipline]||0)-d.dots;}
   const entries=Object.entries(remaining).filter(([,v])=>v>0);
   const clan=fnGetClanDetails(k=>k)[c.clan];
   if(entries.map(([,v])=>v).sort().join()!=='1,2'||(c.clan!==Clan.Caitiff&&entries.some(([key])=>!clan?.disciplines.includes(key))))issues.push('Escolha duas Disciplinas do clã: 2 pontos em uma e 1 em outra (Caitiff escolhe duas).');
   if(c.clan===Clan.Ventrue&&['farmer','bagger'].includes(c.predatorType))issues.push('Ventrue não pode escolher Fazendeiro ou Bagger (V5, pp. 176–177).');
   if(c.predatorType==='farmer'&&c.bloodPotency>=3)issues.push('Fazendeiro exige Potência de Sangue menor que 3.');
   if(!c.predatorType)issues.push('Defina o predador ou revise com o Narrador a exceção de recém-criado.');
  }
  const details=fnGetDisciplineDetails(k=>k);
  for(const [key,dots]of Object.entries(c.disciplines)){const ids=c.disciplinePowers[key]||[];const levels=ids.map(id=>details[key]?.powers.find(p=>p.id===id)?.level||0).sort((a,b)=>b-a);if(levels.some((level,i)=>level>dots-i))issues.push(`Distribuição de poderes inválida: ${key}.`);if(ids.length!==dots)issues.push(`Selecione ${dots} poderes de ${key}.`);for(const id of ids){const p=details[key]?.powers.find(p=>p.id===id);if(!p||p.level>dots||(p.prerequisite&&!ids.includes(p.prerequisite))||p.amalgam?.some(r=>(c.disciplines[r.discipline]||0)<r.level))issues.push(`Reveja os requisitos de ${key}.`);}}
 }
 return issues;
}

export function playerIssues(c:Character):string[]{
 if(c.profile==='npc')return [];
 const issues=finishingIssues(c);
 if(!c.name.trim()||!c.concept.trim())issues.push('Preencha nome e conceito.');
 if(!validAttributes(c))issues.push('Atributos: um 4, três 3, quatro 2 e um 1.');
 const skills=Object.values(c.skills).filter(n=>n>0).sort((a,b)=>a-b).join();
 if(!Object.values(oSkillPaths).some(pool=>[...pool].sort((a,b)=>a-b).join()===skills))issues.push('Distribua as Perícias conforme um dos três pacotes.');
 if(c.gameType===GameType.Vampire&&!c.clan)issues.push('Selecione o clã ou perfil vampírico.');
 if(c.gameType===GameType.Werewolf&&(!c.tribe||!c.auspice))issues.push('Selecione tribo e augúrio.');
 return issues;
}
