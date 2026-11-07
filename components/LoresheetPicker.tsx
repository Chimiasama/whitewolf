import React, {useState} from 'react';
import {Character, Loresheet} from '../types';
import {HelpLabel} from './HelpLabel';
import {CharacterTransaction} from './ExperiencePurchases';
import {LORESHEET_PURCHASE_RULE} from '../data/v5Loresheets';

const normalize = (value:string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
export function LoresheetPicker({sheets,character:c,onTransaction}:{sheets:Loresheet[];character:Character;onTransaction:CharacterTransaction}) {
  const [query,setQuery]=useState(''),[showUnavailable,setShowUnavailable]=useState(false);
  const selected=(id:string,level:number)=>c.loresheets.some(item=>item.id===id&&item.level===level);
  const change=(id:string,level:number,remove=false)=>onTransaction(current=>({
    ...current,
    loresheets:remove?current.loresheets.filter(item=>!(item.id===id&&item.level===level)):
      current.loresheets.some(item=>item.id===id&&item.level===level)?current.loresheets:[...current.loresheets,{id,level}],
  }));
  const visible=sheets.filter(sheet=>(showUnavailable||!sheet.allowedClans||sheet.allowedClans.includes(c.clan)||c.loresheets.some(item=>item.id===sheet.id))&&normalize(sheet.name+' '+sheet.levels.map(level=>level.name).join(' ')).includes(normalize(query)));
  return <section aria-label="Fichas de Conhecimento" className="space-y-4 text-left">
    <h3 className="text-lg font-semibold">Fichas de Conhecimento</h3>
    <p className="text-sm text-gray-300 leading-relaxed">{LORESHEET_PURCHASE_RULE}</p>
    <label className="block text-sm">Buscar em Fichas de Conhecimento<input type="search" className="mt-2 block w-full rounded border border-gray-600 p-3" value={query} onChange={event=>setQuery(event.target.value)}/></label>
    <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={showUnavailable} onChange={event=>setShowUnavailable(event.target.checked)}/>Mostrar indisponíveis</label>
    <p className="text-sm text-gray-400">Abra uma ficha para consultar e escolher seus benefícios.</p>
    {visible.map(sheet=>{
      const unavailable=!!sheet.allowedClans&&!sheet.allowedClans.includes(c.clan);
      const chosen=c.loresheets.filter(item=>item.id===sheet.id);
      return <details key={sheet.id} className="rounded-lg border border-gray-600 bg-black/20 p-3" open={query.trim()?true:undefined}>
        <summary className="cursor-pointer py-2 font-semibold">{sheet.name}{chosen.length>0&&<span className="ml-2 text-sm font-normal text-gray-300">{chosen.reduce((sum,item)=>sum+item.level,0)} pontos selecionados</span>}</summary>
        <div className="mt-4 space-y-4">
          {unavailable&&<p className="text-sm text-amber-200">Exige o clã indicado na referência.</p>}
          <ul className="space-y-3">{sheet.levels.map(level=>{
            const title=`${sheet.name} · ${level.level} ${level.level===1?'ponto':'pontos'}`;
            const active=selected(sheet.id,level.level);
            return <li key={level.level} aria-label={title} className="rounded-lg border border-gray-700 p-3 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <HelpLabel title={title} sourceKey={`loresheet:${sheet.id}:${level.level}`} content={<><h4 className="font-semibold">{level.name} — {level.level} {level.level===1?'ponto':'pontos'}</h4><p>{sheet.description}</p><p>{level.description}</p><p>{level.system}</p></>}><span><strong>{level.name}</strong><span className="block text-sm text-gray-300">{level.level} {level.level===1?'ponto':'pontos'} de Vantagens</span></span></HelpLabel>
                <button type="button" disabled={active||unavailable} onClick={()=>change(sheet.id,level.level)} className="rounded border border-gray-600 px-3 py-2 text-sm disabled:opacity-50">{active?'Selecionado':'Escolher'}</button>
              </div>
              {active&&<button type="button" aria-label={`Remover ${title}`} onClick={()=>change(sheet.id,level.level,true)} className="text-sm underline text-gray-300">Remover</button>}
            </li>;
          })}</ul>
        </div>
      </details>;
    })}
    {!visible.length&&<p>Nenhuma ficha encontrada.</p>}
  </section>;
}
