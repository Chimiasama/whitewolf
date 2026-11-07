import {BookSources} from '../lib/bookReferences';
import React from 'react';
import {AdvantageFlaw,GameType} from '../types';
import {advantageReference} from '../data/advantageReferences';
export function AdvantageReference({item,game,withSources=false}:{item:AdvantageFlaw;game:GameType|null;withSources?:boolean}){
 const data=advantageReference(item,game);
 return <div className="space-y-4">
 {!data?.fullText&&<p>{item.description}</p>}
 {data?.community&&<p className="text-sm text-amber-200">Conteúdo comunitário — tradução para revisão.</p>}
 {data?.adaptation&&<p className="text-sm text-amber-200">Adaptação / regra da casa.</p>}
 {data?.costs&&<p className="font-semibold">{item.type==='flaw'?'Defeito':'Vantagem'} · {data.costs.join(' / ')} pontos</p>}
 {data?<><h3 className="font-semibold">Funcionamento e limites</h3>{data.rules.map((text,index)=><p key={index}>{text}</p>)}
 {!!data.levels?.length&&<section aria-label="Níveis e efeitos"><h3 className="font-semibold">Níveis e efeitos</h3><dl className="space-y-3 mt-2">{data.levels.map(([dots,text])=><div key={dots}><dt className="font-semibold">{dots} {/^\d+$/.test(dots)?Number(dots)===1?'ponto':'pontos':''}</dt><dd>{text}</dd></div>)}</dl></section>}
 {data.notes?.map((text,index)=><p className="text-gray-300" key={index}>{text}</p>)}
 </>:<p className="rounded border border-gray-600 p-3 text-sm text-gray-300">Este item ainda tem apenas um resumo no aplicativo. A descrição completa e as exceções devem ser consultadas na referência do livro abaixo, quando disponível.</p>}
 {withSources&&<BookSources title={item.name} sourceKey={`${game===GameType.Werewolf?"wolfadvantage":"advantage"}:${item.id}`}/>}
 </div>;
}
