import React,{useState} from 'react';
import {Character,GameType,Attribute,Skill} from '../types';
import {fnGetDisciplineDetails,fnGetPredatorTypes,fnGetAdvantagesAndFlaws} from '../constants';
import {BLOOD_RITUALS} from '../data/bloodRituals';
import {OBLIVION_CEREMONIES} from '../data/oblivionCeremonies';
import {W5_GIFTS,W5_RITES,w5GiftIdentity} from '../data/w5';
import {ALTERNATIVE_BANES} from '../data/alternativeBanes';
import {TRAIT_HELP} from '../data/traitHelp';
import {useI18n} from '../lib/i18n';
import {InfoModal} from './InfoModal';
import {HelpLabel} from './HelpLabel';
import {DisciplineReference} from './DisciplineReference';
import {HuntingReference} from './HuntingReference';
import {RitualReference} from './RitualReference';
export function RulesLibrary({character:c}:{character:Character}){
 const {t}=useI18n();const [open,setOpen]=useState(false),[category,setCategory]=useState('attributes'),[query,setQuery]=useState('');
 const wolf=c.gameType===GameType.Werewolf;
 const categories=[['attributes','Atributos'],['skills','Perícias'],...(wolf?[['gifts','Dons'],['rites','Ritos']]:[['disciplines','Disciplinas e fórmulas'],['rituals','Rituais de Sangue'],['ceremonies','Cerimônias'],['predators','Caçada e predadores'],['banes','Maldições de clã']]),['benefits','Méritos e Defeitos']];
 let entries:{id:string;name:string;search?:string;content:React.ReactNode}[]=[];
 if(open){
 if(category==='attributes'||category==='skills')entries=Object.values(category==='attributes'?Attribute:Skill).map(id=>({id,name:t(category+'.list.'+id),content:<p>{TRAIT_HELP[id]}</p>}));
 else if(category==='disciplines')entries=Object.entries(fnGetDisciplineDetails(t)).map(([id,d])=>({id,name:d.name,search:d.description,content:<DisciplineReference discipline={d}/>}));
 else if(category==='rituals')entries=BLOOD_RITUALS.map(r=>({id:r.id,name:r.name+' · nível '+r.level,search:r.english,content:<RitualReference ritual={r}/>}));
 else if(category==='ceremonies')entries=OBLIVION_CEREMONIES.map(r=>({id:r.id,name:r.name+' · nível '+r.level,search:r.english,content:<RitualReference ritual={r} ceremony/>}));
 else if(category==='predators')entries=fnGetPredatorTypes(t).map(p=>({id:p.id,name:p.name.replace('[Comunitário / opcional] ',''),search:p.englishName,content:<><p>{p.description}</p><HuntingReference predator={p}/></>}));
 else if(category==='gifts'){const ids=new Set<string>();entries=W5_GIFTS.filter(g=>{const key=w5GiftIdentity(g.id);if(ids.has(key))return false;ids.add(key);return true;}).map(g=>({id:g.id,name:g.name,search:g.english,content:<><p>{g.summary}</p><p>{g.reference}</p><h3 className="font-bold">Acessos</h3><ul>{W5_GIFTS.filter(x=>w5GiftIdentity(x.id)===w5GiftIdentity(g.id)).map(x=><li key={x.id}>{x.origin==='native'?'Nativo':x.owner} · Renome total {x.totalRenown}</li>)}</ul></>}));}
 else if(category==='rites')entries=W5_RITES.map(r=>({id:r.id,name:r.name,content:<p>{r.description}</p>}));
 else if(category==='banes')entries=ALTERNATIVE_BANES.map(b=>({id:b.clan,name:b.name+' · '+(fnGetClanName(b.clan)),search:b.english,content:<><p>{b.summary}</p><p>{b.reference}</p><p>A variante substitui a padrão quando adotada pela crônica. O Defeito Twice-Cursed (2 pontos, Players Guide p. 121) conserva a padrão e acrescenta a variante do mesmo clã.</p></>}));
 else entries=fnGetAdvantagesAndFlaws(t,c.gameType).map(a=>({id:a.id,name:a.name,content:<><p>{a.description}</p><p>{a.type==='flaw'?'Defeito':'Vantagem'} · {(a.levels||[a.cost]).join(' / ')} pontos.</p></>}));
 }
 function fnGetClanName(id:string){const label=t('clans.'+id+'.name');return label.startsWith('clans.')?id:label;}
 const normalize=(s:string)=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 const visible=entries.filter(x=>normalize(x.name+' '+(x.search||'')).includes(normalize(query)));
 return <><button type="button" className="border border-gray-600 rounded px-3 py-2 text-sm" aria-label="Consultar regras" onClick={()=>setOpen(true)}><span className="sm:hidden">Regras</span><span className="hidden sm:inline">Consultar regras</span></button>{open&&<InfoModal title="Consulta de regras" onClose={()=>setOpen(false)}><div className="space-y-4"><p className="text-sm">Segure o nome para consultar. Nesta lista, você também pode tocar no nome. Consultar não compra nem altera características.</p><label className="block">Categoria<select aria-label="Categoria da consulta" className="block border rounded p-2 w-full" value={category} onChange={e=>{setCategory(e.target.value);setQuery('');}}>{categories.map(([id,name])=><option key={id} value={id}>{name}</option>)}</select></label><label className="block">Buscar na consulta<input type="search" aria-label="Buscar na consulta" className="block border rounded p-2 w-full" value={query} onChange={e=>setQuery(e.target.value)}/></label><ul className="space-y-3">{visible.map(x=><li key={x.id} className="border-b border-gray-700 pb-2"><HelpLabel title={x.name} content={x.content}>{x.name}</HelpLabel></li>)}</ul>{!visible.length&&<p role="status">Nenhum resultado nesta categoria.</p>}</div></InfoModal>}</>;
}
