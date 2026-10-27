import React from 'react';
import {Character,CharacterRelation,Clan,Tribe} from '../types';
import {fnGetClanDetails,fnGetTribeDetails} from '../constants';
import {useI18n} from '../lib/i18n';
export const RELATION_FIELDS={name:'Nome',kind:'Natureza ou espécie',clan:'Clã',tribe:'Tribo',faction:'Seita ou facção',role:'Vínculo com o personagem',feeling:'O que sinto por essa pessoa',theirFeeling:'O que ela sente por mim',notes:'História, dívidas e notas'};
const feelings=['Afeto','Confiança','Admiração','Amor','Respeito','Desconfiança','Medo','Rancor','Rivalidade','Indiferença','Ambivalência'];
export function RelationshipRecord({character:c,onChange}:{character:Character;onChange:(key:keyof Character,value:any)=>void}){
 const {t}=useI18n(),clans=fnGetClanDetails(t),tribes=fnGetTribeDetails(t),rows=c.relationships||[];
 const update=(id:string,key:keyof CharacterRelation,value:string)=>onChange('relationships',rows.map(r=>r.id===id?{...r,[key]:value}:r));
 return <section aria-label="Registro de relacionamentos" className="space-y-4"><p className="text-sm text-gray-400">Pessoas importantes, aliadas ou rivais. Todos os detalhes são opcionais; sentimentos podem ser mistos.</p>
 {rows.map((r,i)=><details key={r.id} className="border border-gray-600 rounded p-4" open><summary>{r.name||'Nova pessoa'}{r.role?' · '+r.role:''}</summary><div className="grid sm:grid-cols-2 gap-3 mt-4">
 {Object.entries(RELATION_FIELDS).map(([key,label])=><label className={key==='notes'?'sm:col-span-2':''} key={key}>{label}
 {key==='clan'||key==='tribe'?<select aria-label={label+' da relação '+(i+1)} className="block border rounded p-2 w-full" value={r[key]} onChange={e=>update(r.id,key,e.target.value)}><option value="">Não informado / desconhecido</option>{Object.entries(key==='clan'?clans:tribes).map(([id,info])=><option key={id} value={id}>{info.name}</option>)}</select>:key==='notes'?<textarea aria-label={label+' da relação '+(i+1)} rows={3} maxLength={10000} className="block border rounded p-2 w-full" value={r.notes} onChange={e=>update(r.id,'notes',e.target.value)}/>:<input aria-label={label+' da relação '+(i+1)} maxLength={1000} list={key==='feeling'||key==='theirFeeling'?'relation-feelings':undefined} className="block border rounded p-2 w-full" value={r[key]} onChange={e=>update(r.id,key as keyof CharacterRelation,e.target.value)}/>}</label>)}
 </div><button className="mt-3 underline" type="button" onClick={()=>onChange('relationships',rows.filter(x=>x.id!==r.id))}>Remover relação com {r.name||'esta pessoa'}</button></details>)}
 <datalist id="relation-feelings">{feelings.map(f=><option key={f} value={f}/>)}</datalist>
 <button type="button" className="border rounded p-3" disabled={rows.length>=100} onClick={()=>onChange('relationships',[...rows,{id:crypto.randomUUID(),...Object.fromEntries(Object.keys(RELATION_FIELDS).map(k=>[k,'']))}])}>Adicionar relacionamento</button>
 </section>;
}
export function RelationshipsSummary({character:c}:{character:Character}){
 const {t}=useI18n(),clans=fnGetClanDetails(t),tribes=fnGetTribeDetails(t);
 if(!c.relationships?.length)return null;
 return <details className="border rounded p-4"><summary>Relacionamentos ({c.relationships.length})</summary>{c.relationships.map(r=><article key={r.id} className="mt-3 border-t pt-3"><h4 className="font-bold">{r.name||'Pessoa sem nome'}</h4><dl>{Object.entries(RELATION_FIELDS).filter(([key])=>key!=='name'&&r[key]).map(([key,label])=><div key={key}><dt className="font-semibold">{label}</dt><dd className="whitespace-pre-wrap">{key==='clan'?clans[r.clan]?.name||r.clan:key==='tribe'?tribes[r.tribe]?.name||r.tribe:r[key]}</dd></div>)}</dl></article>)}</details>;
}
