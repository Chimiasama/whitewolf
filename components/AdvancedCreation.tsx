import {HelpLabel} from './HelpLabel';
import React,{useState} from 'react';
import {Character,Clan,GameType} from '../types';
import {AGE_PROFILES,applyCreationAge} from '../lib/advancedCreation';
import {ALTERNATIVE_BANES,alternativeBane} from '../data/alternativeBanes';
import {DamageTracker} from './DamageTracker';
import type {CharacterTransaction} from './ExperiencePurchases';
export function AdvancedCreation({character:c,onTransaction,onChange}:{character:Character;onTransaction:CharacterTransaction;onChange:(key:keyof Character,value:any)=>void}){
 const [age,setAge]=useState<keyof typeof AGE_PROFILES>('childer'),[error,setError]=useState('');
 const bane=alternativeBane(c);
 const twice=c.flaws.some(f=>f.id==='twicecursed'||f.id==='twice-cursed');
 return <div className="space-y-4">
 {c.gameType===GameType.Vampire&&c.profile!=='npc'&&<section className="border rounded p-4 space-y-3"><h3>Idade e criação avançada</h3>
 {c.initialExperienceGranted?<p>{AGE_PROFILES[c.creationAge||'childer'].name} · XP inicial registrado. Gaste pela seção Evoluir com XP após concluir a base.</p>:!c.creationCompletedAt&&<><label>Perfil inicial<select className="block p-2 border rounded" value={age} onChange={e=>setAge(e.target.value as typeof age)}>{Object.entries(AGE_PROFILES).map(([id,a])=><option key={id} value={id} disabled={c.clan===Clan.ThinBlood&&id!=='childer'}>{a.name} · {a.xp} XP · {a.advantages}/{a.flaws} pontos</option>)}</select></label><p>Ancilla: geração 10–11, Potência 2, −1 Humanidade e 35 XP. Neófito: geração 12–13, Potência 1 e 15 XP. Aplique uma vez antes de concluir a criação.</p><button className="border rounded p-2" onClick={()=>{try{onTransaction(current=>applyCreationAge(current,age));setError('');}catch(e){setError(e instanceof Error?e.message:'Falha ao aplicar idade.');}}}>Aplicar perfil inicial</button>{error&&<p role="alert">{error}</p>}</>}
 </section>}
 {c.gameType===GameType.Vampire&&bane&&<section className="border rounded p-4 space-y-2"><HelpLabel title="Maldições do clã" content={<><p>{bane.name} — {bane.english}: {bane.summary} {bane.reference}.</p><p>A variante substitui a Maldição padrão quando a crônica adota essa regra para o clã (Players Guide, pp. 56–59).</p><p>Duas Vezes Amaldiçoado (Twice-Cursed) é um Defeito de 2 pontos: mantém a padrão e acrescenta a variante do mesmo clã (p. 121). Escolha esse Defeito na seção Defeitos; os pontos entram no orçamento normal, sem uma segunda cobrança.</p><p>Não concede livre escolha de Maldições de outros clãs.</p></>}>Maldições do clã</HelpLabel><label>Maldição aplicada<select aria-label="Maldição aplicada" disabled={twice} className="block border rounded p-2" value={twice?'both':c.baneVariant||'standard'} onChange={e=>onChange('baneVariant',e.target.value)}>{twice&&<option value="both">Padrão + alternativa · Twice-Cursed</option>}<option value="standard">Padrão</option><option value="alternative">{bane.name} — alternativa</option></select></label>
 <p className="text-sm">{twice?"Duas Vezes Amaldiçoado: o Defeito de 2 pontos conserva a Maldição padrão e acrescenta esta variante.":"Para manter ambas, selecione o Defeito Duas Vezes Amaldiçoado em Defeitos."} Efeitos de cena ficam com o Narrador.</p></section>}
 <DamageTracker character={c} onChange={value=>onChange('damage',value)}/>
 </div>;
}
