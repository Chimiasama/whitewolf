import React from 'react';
import {DisciplineDetail} from '../types';
export function DisciplineReference({discipline:d}:{discipline:DisciplineDetail}){
 return <div className="space-y-4"><p>{d.description}</p>{[1,2,3,4,5].map(level=><section key={level}><h3 className="font-bold border-b pb-1">Nível {level}</h3>{d.powers.filter(p=>p.level===level).map(p=><article key={p.id} className="mt-3 space-y-1"><h4 className="font-semibold">{p.name}</h4><p>{p.description}</p>{p.cost&&<p>Custo: {p.cost}</p>}<p className="whitespace-pre-wrap">{p.system}</p>{p.amalgam?.map(a=><p key={a.discipline}>Amálgama: {a.discipline} {a.level}</p>)}{p.prerequisite&&<p>Pré-requisito: {d.powers.find(x=>x.id===p.prerequisite)?.name||p.prerequisite}</p>}</article>)}</section>)}</div>;
}
