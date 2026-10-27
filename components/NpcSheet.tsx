import React from 'react';
import {Character} from '../types';
import {NPC_TEMPLATE_NAMES} from '../lib/npcTemplates';
import {trackCapacity} from '../lib/damage';
import {DamageTracker} from './DamageTracker';
import {StorySummary} from './CharacterStory';
export function NpcSheet({character:c,onChange,onSave,onBack}:{character:Character;onChange?:(key:keyof Character,value:any)=>void;onSave?:()=>void;onBack?:()=>void}){
 const n=c.npcTemplate!;
 return <section className="space-y-5"><h1 className="text-2xl">{c.name} · {NPC_TEMPLATE_NAMES[n.kind]}</h1><p>{c.concept}</p><p>Paradas e capacidades definidas pelo Narrador; modelo de antagonista, sem orçamento de jogador.</p>
 <div className="npc-actions flex gap-3"><button className="border rounded p-2" onClick={onBack}>Editar história e recursos</button><button className="border rounded p-2" onClick={onSave}>Salvar personagem</button><button className="border rounded p-2" onClick={()=>window.print()}>Imprimir / PDF</button></div>
 <div className="grid gap-3 sm:grid-cols-3">{(['physical','social','mental','power','health','willpower'] as const).filter(key=>n.kind!=='spirit'||!['health','willpower'].includes(key)).map(key=><label key={key}>{{physical:'Parada física',social:'Parada social',mental:'Parada mental',power:'Poder',health:'Vitalidade',willpower:'Força de Vontade'}[key]}<input className="block rounded border p-2 w-full" type="number" min={key==='power'?1:0} max={key==='power'?10:20} value={n[key]} disabled={!onChange} onChange={e=>{const value=Number(e.target.value);if(Number.isInteger(value)&&value>=(key==='power'?1:0)&&value<=(key==='power'?10:20)){const next={...n,[key]:value};const valid=(['health','willpower'] as const).every(k=>{const d=c.damage?.[k];return !d||d.superficial+d.aggravated<=trackCapacity({...c,npcTemplate:next},k);});if(valid)onChange?.('npcTemplate',next);}}}/></label>)}</div>
 {n.kind==='spirit'&&<p>Vitalidade: {n.power*2} (Poder ×2). Dano de Força de Vontade também vai para Vitalidade — W5, seção Spirits. Registre esse dano na trilha de Vitalidade.</p>}
 {(['exceptional','abilities'] as const).map(key=><label className="block" key={key}>{key==='exceptional'?'Paradas excepcionais':'Poderes e capacidades'}<textarea className="block rounded border p-3 w-full" value={n[key]} disabled={!onChange} onChange={e=>onChange?.('npcTemplate',{...n,[key]:e.target.value})}/></label>)}
 <DamageTracker character={c} onChange={onChange?value=>onChange('damage',value):undefined}/><StorySummary character={c}/>
 </section>;
}
