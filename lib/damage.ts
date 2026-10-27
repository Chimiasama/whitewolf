import type {Character,DamageTrack} from '../types';
export const EMPTY_DAMAGE:DamageTrack={superficial:0,aggravated:0};
export function validDamage(track:DamageTrack,capacity:number):boolean{return !!track&&Number.isInteger(track.superficial)&&Number.isInteger(track.aggravated)&&track.superficial>=0&&track.aggravated>=0&&track.superficial+track.aggravated<=capacity;}
/** Amount is final damage after resistance and any halving determined at the table. */
export function applyDamage(track:DamageTrack,capacity:number,kind:'superficial'|'aggravated',amount:number):DamageTrack{
 if(!Number.isInteger(capacity)||capacity<0||!validDamage(track,capacity)||!Number.isInteger(amount)||amount<0||amount>100)throw new Error('Dano ou capacidade inválidos.');
 let {superficial,aggravated}=track;
 for(let i=0;i<amount;i++){
  if(aggravated===capacity)break;
  if(kind==='aggravated'){if(superficial+aggravated===capacity)superficial--;aggravated++;}
  else if(superficial+aggravated<capacity)superficial++;
  else if(superficial>0){superficial--;aggravated++;}
 }
 return {superficial,aggravated};
}
export function trackCapacity(c:Character,key:'health'|'willpower'){
 if(c.npcTemplate){const n=c.npcTemplate;return n.kind==='spirit'?n.power*2:n[key];}
 return key==='health'?c.attributes.Stamina+3:c.attributes.Composure+c.attributes.Resolve;
}
