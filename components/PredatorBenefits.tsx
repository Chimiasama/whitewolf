import React from 'react';
import {AdvantageFlaw, GameType, PredatorTypeDetail} from '../types';
import {fnGetDisciplineDetails} from '../constants';
import {useI18n} from '../lib/i18n';
import {HelpLabel} from './HelpLabel';
import {AdvantageReference} from './AdvantageReference';
import {DisciplineReference} from './DisciplineReference';

export function PredatorBenefitItem({item}:{item:AdvantageFlaw}) {
  return <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
    <span className="text-gray-400">{item.type === 'flaw' ? 'Defeito' : 'Vantagem'}:</span>
    <HelpLabel title={item.name} sourceKey={`advantage:${item.id}`} content={<AdvantageReference item={item} game={GameType.Vampire}/>}/>
    <span>· {item.cost} {item.cost === 1 ? 'ponto' : 'pontos'}</span>
  </div>;
}

/** The catalog shows all choices; the selected package shows only actual grants. */
export function PredatorBenefits({predator:p, preview=false}:{predator:PredatorTypeDetail;preview?:boolean}) {
  const {t}=useI18n();
  const disciplines=fnGetDisciplineDetails(t);
  const ids=preview ? p.disciplineOptions || (p.disciplineAdd ? [p.disciplineAdd.discipline] : []) : p.disciplineAdd ? [p.disciplineAdd.discipline] : [];
  const advantages=preview ? p.fixedAdvantages || p.advantages : p.advantages;
  const flaws=preview ? p.fixedFlaws || p.flaws : p.flaws;
  const specialties=p.specialtyOptions?.length ? p.specialtyOptions : p.specialties;
  return <section aria-label="Benefícios do predador" className="space-y-3">
    <h4 className="font-semibold">{preview ? 'O que este predador concede' : 'Você recebe deste predador'}</h4>
    {ids.length>1 && <p className="text-sm text-gray-400">Disciplina: escolha uma das opções abaixo.</p>}
    {ids.map(id=><div key={id} className="flex flex-wrap items-baseline gap-x-2 gap-y-1"><span className="text-gray-400">Disciplina:</span><HelpLabel title={disciplines[id]?.name||id} content={disciplines[id] ? <DisciplineReference discipline={disciplines[id]}/> : undefined}/><span>+{p.disciplineAdd?.dots || 1} ponto</span></div>)}
    {advantages.map(item=><div key={item.id}><PredatorBenefitItem item={{...item,type:'advantage'}}/></div>)}
    {flaws.map(item=><div key={item.id}><PredatorBenefitItem item={{...item,type:'flaw'}}/></div>)}
    {preview && p.choices?.map(group=><div key={group.id} className="space-y-2 rounded border border-gray-700 p-3"><p>{group.type==='flaw'?'Defeito':'Vantagem'} · {group.label} — escolha uma opção:</p>{group.options.map(item=><div key={item.id}><PredatorBenefitItem item={{...item,type:group.type}}/></div>)}</div>)}
    {preview && p.allocations?.map(group=><div key={group.id} className="space-y-2 rounded border border-gray-700 p-3"><p>{group.type==='flaw'?'Defeitos':'Vantagens'} · {group.label} — distribua {group.total} pontos:</p>{group.options.map(item=><div key={item.id}><HelpLabel title={item.name} sourceKey={`advantage:${item.id}`} content={<AdvantageReference item={{...item,type:group.type==='flaw'?'flaw':'advantage'}} game={GameType.Vampire}/>}/></div>)}</div>)}
    {!!specialties.length && <div><HelpLabel title="Especialização do predador" content={<p>Escolha uma das Especializações indicadas. Quando ela se aplica a um teste da Habilidade correspondente, acrescente um dado à parada.</p>}>Especialização: {specialties.map(s=>`${t('skills.list.'+s.skill)} (${s.name})`).join(' ou ')}</HelpLabel></div>}
    {!!p.humanityModifier && <div><HelpLabel title="Humanidade do predador" content={<p>Este modificador é aplicado à Humanidade do personagem ao escolher este tipo de predador.</p>}>Humanidade: {p.humanityModifier>0?'+':''}{p.humanityModifier}</HelpLabel></div>}
    {!!p.bloodPotencyModifier && <div><HelpLabel title="Potência de Sangue do predador" content={<p>Este modificador é aplicado à Potência de Sangue ao escolher este tipo de predador.</p>}>Potência de Sangue: +{p.bloodPotencyModifier}</HelpLabel></div>}
  </section>;
}
