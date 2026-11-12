import type {Character,DamageTrack} from '../types';
export const EMPTY_DAMAGE:DamageTrack={superficial:0,aggravated:0};
export function validDamage(value:unknown,capacity:number):value is DamageTrack{if(!value||typeof value!=='object'||Array.isArray(value))return false;const track=value as DamageTrack;return Number.isInteger(track.superficial)&&Number.isInteger(track.aggravated)&&track.superficial>=0&&track.aggravated>=0&&track.superficial+track.aggravated<=capacity;}
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

/** Prefer explicit damage tracks; interpret legacy resource counters only when no track exists. */
export function characterDamage(c:Character,key:'health'|'willpower'):DamageTrack {
 if(c.damage?.[key])return c.damage[key];
 // Simplified NPCs inherited unused legacy counters from their base character.
 if(c.npcTemplate)return {...EMPTY_DAMAGE};
 const cap=trackCapacity(c,key),remaining=c[key]??cap;
 return {superficial:Math.max(0,cap-Math.min(cap,remaining)),aggravated:0};
}
export function trackRemaining(c:Character,key:'health'|'willpower') {
 const d=characterDamage(c,key);return Math.max(0,trackCapacity(c,key)-d.superficial-d.aggravated);
}
export function synchronizeDamage(c:Character,damage:NonNullable<Character['damage']>):Character {
 return {...c,damage,health:trackCapacity(c,'health')-damage.health.superficial-damage.health.aggravated,willpower:trackCapacity(c,'willpower')-damage.willpower.superficial-damage.willpower.aggravated};
}
export function setRemaining(c:Character,key:'health'|'willpower',remaining:number):Character {
 const cap=trackCapacity(c,key);
 if(!Number.isInteger(remaining)||remaining<0||remaining>cap)return c;
 let track={...characterDamage(c,key)};
 const delta=remaining-trackRemaining(c,key);
 if(delta<0)track=applyDamage(track,cap,'superficial',-delta);
 else {const heal=Math.min(delta,track.superficial);track.superficial-=heal;track.aggravated=Math.max(0,track.aggravated-(delta-heal));}
 return synchronizeDamage(c,{health:characterDamage(c,'health'),willpower:characterDamage(c,'willpower'),[key]:track});
}
