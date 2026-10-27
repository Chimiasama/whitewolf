import React from 'react';
import {Character} from '../types';
const CHOICES:Record<string,string>={linguistics:'Idiomas adicionais',folkloric_bane:'Material ou condição que causa dano',folkloric_taboo:'Barreira ou tabu folclórico',folkloric_sign:'Sinal revelador',addiction:'Substância e hábitos',disciplineinept:'Disciplina afetada',allies:'Aliados e vínculos',contacts:'Contatos e área de atuação',enemy:'Inimigo e motivação',haven:'Refúgio e características'};
export function BenefitChoices({character:c,onChange}:{character:Character;onChange:(key:keyof Character,value:any)=>void}){
 const entries=[...c.advantages,...c.flaws].filter(a=>CHOICES[a.id]);if(!entries.length)return null;
 return <details className="border rounded p-4"><summary>Escolhas dos Méritos e Defeitos</summary><p className="text-sm my-2">Detalhes ficam associados ao benefício e salvos na ficha. Condições narrativas não bloqueiam compras.</p>{entries.map(a=><label className="block mt-3" key={a.id}>{a.name} · {CHOICES[a.id]}<input className="block border rounded p-2 w-full" maxLength={10000} value={c.resourceChoices?.[a.id]||''} onChange={e=>onChange('resourceChoices',{...c.resourceChoices,[a.id]:e.target.value})}/></label>)}</details>;
}
