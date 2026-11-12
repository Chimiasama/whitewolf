import {cleanBookText} from '../lib/bookReferences';
import React from 'react';
import {NECROMANTIC_POWERS} from '../data/expandedPowers';
export function RitualReference({ritual:r,ceremony=false}:{ritual:{name:string;level:number;description:string;prerequisite?:string;fullText?:boolean};ceremony?:boolean}){
 return <div className="space-y-3"><p>{cleanBookText(r.description)}</p><p>Nível {r.level} · Aprendizado: {r.level*3} XP.</p>{r.prerequisite&&<p>Poder obrigatório: {NECROMANTIC_POWERS.find(p=>p.id===r.prerequisite)?.name||r.prerequisite}.</p>}<p>{ceremony?'Regra geral de Cerimônias: teste de Determinação + Oblívio, dificuldade nível + 1; um Checagem de Sangue e cinco minutos por nível, salvo exceções. Cults of the Blood Gods, pp. 208–214.':'Regra geral de Rituais de Sangue: teste de Inteligência + Feitiçaria de Sangue, dificuldade nível + 1; um Checagem de Sangue e cinco minutos por nível, salvo exceções. V5, pp. 275–282.'}</p>{!r.fullText&&<p>Ingredientes, alvos, duração e exceções dependem do ritual. O resumo apresenta o efeito e a referência; a conjuração é resolvida na mesa.</p>}</div>;
}
