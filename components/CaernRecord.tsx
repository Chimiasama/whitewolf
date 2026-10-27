import React from 'react';
import {Character} from '../types';
export const CAERN_FIELDS={name:'Nome do caern',location:'Localização e acesso',description:'Aparência e história',guardian:'Espírito guardião',spirits:'Outros espíritos e relações',caretakers:'Seita, alcateias e responsáveis',rites:'Ritos e tradições locais',threats:'Ameaças e problemas',agreements:'Tabus, deveres e acordos',notes:'Notas do caern'};
export function CaernRecord({character:c,onChange}:{character:Character;onChange:(key:keyof Character,value:any)=>void}){
 return <section aria-label="Registro narrativo do caern" className="space-y-4"><p className="text-sm text-gray-400">Um registro do lugar e das pessoas ligadas a ele. Preencha apenas o que sua crônica usa.</p><div className="grid sm:grid-cols-2 gap-4">{Object.entries(CAERN_FIELDS).map(([key,label])=><label key={key}>{label}<textarea aria-label={label} rows={3} maxLength={10000} className="block border rounded p-3 w-full mt-1" value={c.caernRecord?.[key]||''} onChange={e=>onChange('caernRecord',{...c.caernRecord,[key]:e.target.value})}/></label>)}</div></section>;
}
export function CaernSummary({character:c}:{character:Character}){
 if(!Object.values(c.caernRecord||{}).some(Boolean))return null;
 return <details className="border rounded p-4"><summary>Caern · {c.caernRecord?.name||'Registro do lugar'}</summary><dl>{Object.entries(CAERN_FIELDS).filter(([key])=>c.caernRecord?.[key]).map(([key,label])=><div key={key} className="mt-2"><dt className="font-semibold">{label}</dt><dd className="whitespace-pre-wrap">{c.caernRecord[key]}</dd></div>)}</dl></details>;
}
