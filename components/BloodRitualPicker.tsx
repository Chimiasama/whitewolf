import {RitualReference} from './RitualReference';
import React from 'react';
import {Character} from '../types';
import {BLOOD_RITUALS} from '../data/bloodRituals';
import {OBLIVION_CEREMONIES} from '../data/oblivionCeremonies';
import {CatalogPicker} from './CatalogPicker';
export function BloodRitualPicker({character:c,onChange}:{character:Character;onChange:(key:keyof Character,value:any)=>void}){
 const rituals=BLOOD_RITUALS.filter(r=>r.level===1),ceremonies=OBLIVION_CEREMONIES.filter(r=>r.level===1);
 return <section className="space-y-4"><p>Na criação, escolha um Ritual de nível 1 com Feitiçaria de Sangue e uma Cerimônia de nível 1 com o poder obrigatório de Oblívio. Aprendizados posteriores usam XP.</p>
 {([{label:'Ritual inicial de Feitiçaria de Sangue',items:rituals,discipline:'bloodsorcery'},{label:'Cerimônia inicial de Oblívio',items:ceremonies,discipline:'oblivion'}] as const).map(group=><CatalogPicker key={group.label} label={group.label} selected={c.rituals.filter(r=>group.items.some(x=>x.id===r.id)).map(r=>r.id)} options={group.items.map(r=>({id:r.id,name:r.name,summary:r.summary,details:<RitualReference ritual={r} ceremony={group.discipline==='oblivion'}/>,unavailable:(c.disciplines[group.discipline]||0)<1?'Exige '+group.discipline+' 1.':('prerequisite' in r&&!c.disciplinePowers.oblivion?.includes(r.prerequisite))?'Falta o poder obrigatório de Oblívio.':undefined}))} onToggle={id=>{
 const r=group.items.find(r=>r.id===id);if(!r||(c.disciplines[group.discipline]||0)<1||('prerequisite' in r&&!c.disciplinePowers.oblivion?.includes(r.prerequisite)))return;
 const keep=c.rituals.filter(x=>!group.items.some(r=>r.id===x.id));
 onChange('rituals',c.rituals.some(x=>x.id===id)?keep:[...keep,{id:r.id,name:r.name,description:r.description}]);
 }}/>)}
 </section>;
}
