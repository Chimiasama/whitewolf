import {Attribute,Character,GameType,Skill} from '../types';
import {applyDamage,characterDamage,trackCapacity,trackRemaining} from './damage';

export type RollKind='skill'|'attributes'|'custom'|'willpower'|'humanity'|'rouse'|'rageCheck';
export type PoolCategory='physical'|'social'|'mental'|'none';
export interface RollConfig {
 kind:RollKind; attribute:Attribute; skill:Skill; secondAttribute:Attribute;
 customPool:number; category:PoolCategory|'auto'; modifier:number; difficulty:number|null;
 specialty:boolean; specialDice:boolean; allowWillpower:boolean; penaltyReduction:number; ignoreHealthWithWillpower:boolean; checks:number;
}
export interface Die {id:number;value:number;type:'normal'|'hunger'|'rage';}
export interface Pool {base:number;modifier:number;penalty:number;total:number;special:number;category:PoolCategory;}
export interface Evaluation {successes:number;tens:number;critical:boolean;messy:boolean;bestial:boolean;brutal:boolean;brutalSuccesses:number;passed:boolean|null;}
export interface DiceRoll {id:string;config:RollConfig;pool:Pool;dice:Die[];original:Die[];rerolls:{before:Die[];after:Die[];indices:number[]}[];timestamp:string;game:GameType;label:string;resourceBefore:number;resourceAfter:number;}
export const defaultRollConfig:RollConfig={kind:'skill',attribute:Attribute.Strength,skill:Skill.Brawl,secondAttribute:Attribute.Composure,customPool:5,category:'auto',modifier:0,difficulty:null,specialty:false,specialDice:true,allowWillpower:true,penaltyReduction:0,ignoreHealthWithWillpower:false,checks:1};
export function attributeCategory(attr:Attribute):PoolCategory {
 return [Attribute.Strength,Attribute.Dexterity,Attribute.Stamina].includes(attr)?'physical':[Attribute.Charisma,Attribute.Manipulation,Attribute.Composure].includes(attr)?'social':'mental';
}
export function isCheck(kind:RollKind){return kind==='rouse'||kind==='rageCheck';}
export function canSpendWillpower(c:Character){return c.npcTemplate?.kind!=='spirit'&&characterDamage(c,'willpower').aggravated<trackCapacity(c,'willpower');}
export function spendWillpower(c:Character):Character {
 if(!canSpendWillpower(c))throw new Error('Força de Vontade completamente agravada: não é possível gastar.');
 const damage={health:characterDamage(c,'health'),willpower:applyDamage(characterDamage(c,'willpower'),trackCapacity(c,'willpower'),'superficial',1)};
 return {...c,damage,health:trackCapacity(c,'health')-damage.health.superficial-damage.health.aggravated,willpower:trackCapacity(c,'willpower')-damage.willpower.superficial-damage.willpower.aggravated};
}
export function buildPool(c:Character,config:RollConfig):Pool {
 const {kind}=config;
 if(!Number.isInteger(config.modifier)||Math.abs(config.modifier)>30||!Number.isInteger(config.customPool)||config.customPool<0||config.customPool>50||!Number.isInteger(config.penaltyReduction)||config.penaltyReduction<0||config.penaltyReduction>2||config.difficulty!==null&&(!Number.isInteger(config.difficulty)||config.difficulty<1||config.difficulty>50))throw new Error('Confira os valores da parada e da dificuldade.');
 if(c.npcTemplate?.kind==='spirit'&&kind==='willpower')throw new Error('Espíritos não possuem uma trilha separada de Força de Vontade; use a parada definida pelo Narrador.');
 if(kind==='humanity'&&c.gameType!==GameType.Vampire||kind==='rouse'&&c.gameType!==GameType.Vampire||kind==='rageCheck'&&c.gameType!==GameType.Werewolf)throw new Error('Teste indisponível para este jogo.');
 if(isCheck(kind)){
  if(kind==='rageCheck'&&c.rage<1)throw new Error('Fúria 0: o personagem perdeu o lobo e não pode fazer checagens de Fúria.');
  const count=kind==='rageCheck'?config.checks:1;
  if(!Number.isInteger(count)||count<1||count>2)throw new Error('Escolha uma ou duas checagens.');
  return {base:count,modifier:0,penalty:0,total:count,special:0,category:'none'};
 }
 const category:PoolCategory=['custom','skill','attributes'].includes(kind)?config.category==='auto'?attributeCategory(config.attribute):config.category:'none';
 let base=kind==='skill'?c.attributes[config.attribute]+c.skills[config.skill]:kind==='attributes'?c.attributes[config.attribute]+c.attributes[config.secondAttribute]:kind==='willpower'?trackRemaining(c,'willpower'):kind==='humanity'?c.humanity:config.customPool;
 if(kind==='skill'&&config.specialty)base++;
 if(!Number.isFinite(base)||base<0)throw new Error('Parada inválida.');
 const damaged=category==='physical'?trackRemaining(c,'health')===0:category==='social'||category==='mental'?trackRemaining(c,'willpower')===0:false;
 const penalty=damaged&&!(config.ignoreHealthWithWillpower&&c.gameType===GameType.Vampire&&category==='physical')?Math.max(0,2-config.penaltyReduction):0;
 const total=Math.max(1,Math.min(80,base+config.modifier-penalty));
 const eligible=['skill','attributes','custom'].includes(kind)&&config.specialDice;
 const supernatural=!c.npcTemplate;
 const resource=c.gameType===GameType.Vampire?c.hunger:c.rage;
 const special=eligible&&supernatural?Math.min(total,resource):0;
 return {base,modifier:config.modifier,penalty,total,special,category};
}
/** Uses rejection sampling to avoid modulo bias. Inject a function in tests, never in the UI. */
export function randomD10():number {
 const buffer=new Uint32Array(1);
 do {crypto.getRandomValues(buffer);} while(buffer[0]>=4294967290);
 return buffer[0]%10+1;
}
export function rollDice(pool:Pool,game:GameType,random:()=>number=randomD10):Die[]{
 return Array.from({length:pool.total},(_,id)=>{const value=random();if(!Number.isInteger(value)||value<1||value>10)throw new Error('Resultado de dado inválido.');return {id,value,type:id<pool.special?(game===GameType.Vampire?'hunger':'rage'):'normal'};});
}
export function evaluateDice(dice:Die[],difficulty:number|null):Evaluation {
 const tens=dice.filter(d=>d.value===10).length;
 const successes=dice.filter(d=>d.value>=6).length+Math.floor(tens/2)*2;
 const critical=tens>=2;
 const passed=difficulty===null?null:successes>=difficulty;
 const brutal=dice.filter(d=>d.type==='rage'&&d.value<=2).length>=2;
 return {successes,tens,critical,messy:critical&&passed!==false&&dice.some(d=>d.type==='hunger'&&d.value===10),bestial:(passed===false||successes===0)&&dice.some(d=>d.type==='hunger'&&d.value===1),brutal,brutalSuccesses:successes+(brutal?4:0),passed};
}
export function rerollEligible(die:Die){return die.type==='normal'||die.type==='rage'&&die.value>2;}
export function rerollDice(roll:DiceRoll,ids:number[],random:()=>number=randomD10):DiceRoll {
 if(!['skill','attributes','custom'].includes(roll.config.kind)||!roll.config.allowWillpower)throw new Error('Este teste não permite rerrolagem com Força de Vontade.');
 if(ids.length<1||ids.length>3||new Set(ids).size!==ids.length||ids.some(id=>!roll.dice.some(d=>d.id===id&&rerollEligible(d))))throw new Error('Selecione de um a três dados permitidos.');
 const next=roll.dice.map(d=>{if(!ids.includes(d.id))return {...d};const value=random();if(!Number.isInteger(value)||value<1||value>10)throw new Error('Resultado de dado inválido.');return {...d,value};});
 return {...roll,dice:next,rerolls:[...roll.rerolls,{before:roll.dice.map(d=>({...d})),after:next.map(d=>({...d})),indices:[...ids]}]};
}
