import React from 'react';
import {PredatorTypeDetail} from '../types';
import {HUNTING_POOLS,HUNTING_RULES} from '../data/huntingHelp';
export function HuntingReference({predator:p}:{predator:PredatorTypeDetail}){
 const pools=HUNTING_POOLS[p.id];const community=p.source?.includes('02')||p.name.includes('Comunitário');
 return <div className="space-y-3"><h3 className="font-bold">Como caçar</h3>{p.id==='bloodleech'?<p>Caçar outros vampiros deve ser tratado em cena com o Narrador; o básico não reduz essa caçada a uma parada fixa. V5, p. 307 (Headhunter).</p>:pools?.length?<><p>Paradas previstas para este tipo:</p><ul>{pools.map(pool=><li key={pool}>{pool}</li>)}</ul></>:<p>Combine a parada com o Narrador conforme a abordagem.</p>}{community&&<p>Material comunitário de Bully — não é regra do guia oficial.</p>}<p>{HUNTING_RULES}</p><p>Fonte do tipo: {p.source||'V5 básico'}.</p>{p.id==='osiris'&&<p>O talento que sustenta a Fama pode envolver Performance, Ciência, Ofícios, Acadêmicos, Política ou outra área adequada.</p>}{p.id==='graverobber'&&<p>Cadáver frio pode saciar até 3 Fome, com as penalidades de sangue armazenado; drenagem anterior e mutilações reduzem isso. Players Guide, p. 108.</p>}</div>;
}
