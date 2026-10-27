import React from 'react';
import { Character } from '../types';
import { W5_GIFTS, W5_TRIBES, W5_RITES } from '../data/w5';
export function WerewolfCreation({character:c,onChange}:{character:Character;onChange:(key:keyof Character,value:any)=>void}){
 const tribe=W5_TRIBES[c.tribe];
 return <section className="space-y-4 text-left" aria-label="Dons e Rito de W5">
 <p className="text-emerald-200">W5 · Um Dom nativo, um de augúrio e um de tribo. Renome total inicial: 3. As traduções de trabalho mantêm o nome inglês para conferência.</p>
 {(['native','auspice','tribe'] as const).map(origin=><label key={origin} className="block">Dom {origin==='native'?'nativo':origin==='tribe'?'da tribo':'do augúrio'}
 <select className="block w-full bg-gray-900 p-3 rounded border border-emerald-700" value={c.gifts?.find(g=>g.origin===origin)?.id||''} onChange={e=>onChange('gifts',[...(c.gifts||[]).filter(g=>g.origin!==origin),...(e.target.value?[{id:e.target.value,origin}]:[])])}>
 <option value="">Selecione</option>{W5_GIFTS.filter(g=>g.origin===origin&&g.totalRenown<=3&&(origin==='native'||g.owner===(origin==='tribe'?c.tribe:c.auspice))).map(g=><option key={g.id} value={g.id}>{g.name} — {g.english}</option>)}</select>
 {c.gifts?.filter(g=>g.origin===origin).map(g=>{const d=W5_GIFTS.find(x=>x.id===g.id);return d&&<small key={g.id} className="text-gray-300">{d.summary} Referência: {d.reference}.</small>})}
 </label>)}
 <p>Patrono: {tribe?.patron||'selecione a tribo'}. Renome favorecido: {tribe?{glory:'Glória',honor:'Honra',wisdom:'Sabedoria'}[tribe.renown]:'—'}.</p>
 <label className="block">Rito inicial (W5, pp. 180–187)
 <select className="w-full block bg-gray-900 border border-gray-600 rounded p-3" value={c.rituals[0]?.id||''} onChange={e=>onChange('rituals',W5_RITES.filter(r=>r.id===e.target.value))}>
 <option value="">Selecione um Rito</option>{W5_RITES.map(r=><option key={r.id} value={r.id}>{r.name}</option>)}
 </select></label>
 {c.rituals[0]&&<p className="text-sm text-gray-300">{c.rituals[0].description}</p>}
 <p className="text-sm text-gray-300">Catálogo inicial parcial e referenciado. Condições dos Ritos e mecânicas avançadas exigem conferência do Narrador; não são substituídos por Disciplinas vampíricas.</p>
 </section>
}
