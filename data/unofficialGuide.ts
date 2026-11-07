import powerData from './unofficialGuidePowers.json';
import predatorData from './unofficialGuidePredators.json';
import ritualData from './unofficialGuideRituals.json';
import {DisciplineDetail,DisciplinePower,PredatorTypeDetail,Skill} from '../types';
export const GUIDE_BOOK="V5 Player’s Guide — Bully (conteúdo comunitário; PDF atual)";
export const GUIDE_FILE='Vampire5edPlayersGuide02';
export const GUIDE_POWERS=powerData;
export const GUIDE_RITUALS=ritualData.filter(item=>!item.ceremony).map(item=>({...item,reference:`${GUIDE_BOOK}, p. ${item.page}.`,description:`${item.description} ${GUIDE_BOOK}, p. ${item.page}.`}));
export const GUIDE_CEREMONIES=ritualData.filter(item=>item.ceremony).map(item=>({...item,description:`${item.description} ${GUIDE_BOOK}, p. ${item.page}.`}));
export function applyGuidePowers(base:Record<string,DisciplineDetail>):Record<string,DisciplineDetail>{
 const result=Object.fromEntries(Object.entries(base).map(([key,value])=>[key,{...value,powers:[...value.powers]}]));
 // Draft app: replace obsolete categories rather than retaining compatibility entries.
 result.auspex.powers=result.auspex.powers.filter(power=>power.id!=='scanTheRoom');
 result.oblivion.powers=result.oblivion.powers.filter(power=>power.id!=='witnessTheEnd');
 for(const {discipline,page,english,...power} of powerData){
  const entry:DisciplinePower={...power,community:true,amalgam:'amalgam' in power?power.amalgam:undefined,prerequisite:'prerequisite' in power?power.prerequisite:undefined,prerequisiteAny:'prerequisiteAny' in power?power.prerequisiteAny:undefined,system:`${power.system} ${GUIDE_BOOK}, p. ${page}.`};
  const index=result[discipline].powers.findIndex(item=>item.id===power.id);
  if(index>=0)result[discipline].powers[index]=entry;else result[discipline].powers.push(entry);
 }
 return result;
}
export function applyGuidePredator(p:PredatorTypeDetail):PredatorTypeDetail{
 const current=predatorData[p.id] as typeof predatorData[keyof typeof predatorData]|undefined;
 if(!current)return p;
 const {page,pool,...patch}=current;
 return {...p,...patch,name:patch.name,specialtyOptions:patch.specialtyOptions as {skill:Skill;name:string}[],source:`${GUIDE_BOOK}, p. ${page}`,
 disciplineAdd:{discipline:current.disciplineOptions[0],dots:1},
 choices:p.id==='online_predator'?p.choices:undefined,allocations:undefined,
 legacyBonusIds:[...new Set([...(p.legacyBonusIds||[]),...p.advantages.map(x=>x.id),...p.flaws.map(x=>x.id),...current.advantages.map(x=>x.id),...current.flaws.map(x=>x.id)])],
 advantages:current.advantages as PredatorTypeDetail['advantages'],flaws:current.flaws as PredatorTypeDetail['flaws'],
 };
}
