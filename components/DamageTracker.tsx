import React from 'react';
import {Character} from '../types';
import {applyDamage,characterDamage,trackCapacity} from '../lib/damage';
export function DamageTracker({character:c,onChange}:{character:Character;onChange?:(damage:Character['damage'])=>void}){
 return <section aria-label="Dano superficial e agravado" className="rounded border border-gray-600 p-4 space-y-3">
 <h3 className="text-lg">Dano superficial e agravado</h3>
 <p className="text-sm">Registre o dano final após resistência e redução. Ao encher a trilha, dano adicional converte superficial em agravado. As rolagens usam estas trilhas para calcular penalidades e gastos.</p>
 {(['health','willpower'] as const).filter(key=>c.npcTemplate?.kind!=='spirit'||key==='health').map(key=>{const cap=trackCapacity(c,key),track=characterDamage(c,key);return <fieldset key={key} className="border rounded p-3"><legend>{key==='health'?'Vitalidade':'Força de Vontade'} · {cap}</legend>
 <p>{track.superficial} superficial · {track.aggravated} agravado · {Math.max(0,cap-track.superficial-track.aggravated)} livres</p>
 {track.superficial+track.aggravated>=cap&&<strong>{track.aggravated>=cap?'Trilha agravada cheia — resolva as consequências com o Narrador.':'Debilitado'}</strong>}
 {onChange&&<div className="flex flex-wrap gap-2 mt-2">{(['superficial','aggravated'] as const).map(kind=><button type="button" className="border rounded p-2" key={kind} onClick={()=>onChange({health:characterDamage(c,'health'),willpower:characterDamage(c,'willpower'),[key]:applyDamage(track,cap,kind,1)})}>+1 {kind==='superficial'?'superficial':'agravado'}</button>)}{(['superficial','aggravated'] as const).map(kind=><button type="button" className="border rounded p-2" key={'heal-'+kind} disabled={!track[kind]} onClick={()=>onChange({health:characterDamage(c,'health'),willpower:characterDamage(c,'willpower'),[key]:{...track,[kind]:Math.max(0,track[kind]-1)}})}>Remover 1 {kind==='superficial'?'superficial':'agravado'}</button>)}</div>}
 </fieldset>})}
 </section>;
}
