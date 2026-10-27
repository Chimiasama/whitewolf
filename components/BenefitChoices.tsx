import {LOW_CLAN_DISCIPLINES} from '../data/v5Loresheets';
import {fnGetDisciplineDetails} from '../constants';
import {useI18n} from '../lib/i18n';
import React from 'react';
import {Character} from '../types';
const CHOICES:Record<string,string>={linguistics:'Idiomas adicionais',folkloric_bane:'Material ou condição que causa dano',folkloric_taboo:'Barreira ou tabu folclórico',folkloric_sign:'Sinal revelador',addiction:'Substância e hábitos',disciplineinept:'Disciplina afetada',allies:'Aliados e vínculos',contacts:'Contatos e área de atuação',enemy:'Inimigo e motivação',haven:'Refúgio e características'};
export function BenefitChoices({character:c,onChange}:{character:Character;onChange:(key:keyof Character,value:any)=>void}){
 const {t}=useI18n();const disciplines=fnGetDisciplineDetails(t);const traded=c.loresheets.some(l=>l.id==='v5-low-clan'&&l.level===4);
 const entries=[...c.advantages,...c.flaws].filter(a=>CHOICES[a.id]);if(!entries.length&&!traded)return null;
 return <details className="border rounded p-4"><summary>Escolhas dos Méritos, Defeitos e Loresheets</summary><p className="text-sm my-2">Detalhes ficam associados ao benefício e salvos na ficha. Condições narrativas não bloqueiam compras.</p>{traded&&<label className="block mt-3">Comércio entre Iguais · Disciplina de Baixo Clã<select className="block border rounded p-2" value={c.resourceChoices?.lowClanDiscipline||''} onChange={e=>onChange('resourceChoices',{...c.resourceChoices,lowClanDiscipline:e.target.value})}><option value="">Escolha com o Narrador</option>{LOW_CLAN_DISCIPLINES.map(id=><option key={id} value={id}>{disciplines[id].name}</option>)}</select></label>}{entries.map(a=><label className="block mt-3" key={a.id}>{a.name} · {CHOICES[a.id]}<input className="block border rounded p-2 w-full" maxLength={10000} value={c.resourceChoices?.[a.id]||''} onChange={e=>onChange('resourceChoices',{...c.resourceChoices,[a.id]:e.target.value})}/></label>)}</details>;
}
