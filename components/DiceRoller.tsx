import {QuickRollContext,RollRequest} from '../lib/rollContext';
import React,{useEffect,useRef,useState} from 'react';
import {Attribute,Character,GameType,Skill} from '../types';
import {aAttributeList,aSkillList} from '../constants';
import {useI18n} from '../lib/i18n';
import {InfoModal} from './InfoModal';
import {DamageTracker} from './DamageTracker';
import {synchronizeDamage,trackCapacity,trackRemaining} from '../lib/damage';
import {buildPool,canSpendWillpower,defaultRollConfig,DiceRoll,evaluateDice,isCheck,rerollDice,rerollEligible,RollConfig,rollDice,spendWillpower} from '../lib/dice';

const fieldClass='mt-1 w-full min-w-0 rounded border border-gray-600 bg-gray-950 p-3';
const buttonClass='min-h-11 rounded border border-gray-600 px-4 py-2 hover:bg-gray-800 disabled:opacity-40';
const kinds={skill:'Atributo + habilidade',attributes:'Atributo + atributo',custom:'Parada personalizada',willpower:'Força de Vontade',humanity:'Humanidade',rouse:'Checagem de Sangue',rageCheck:'Checagem de Fúria'};
const categoryNames={auto:'Automática pelo primeiro atributo',physical:'Física',social:'Social',mental:'Mental',none:'Sem penalidade automática'};
function Sources({wolf}:{wolf:boolean}){
 return <aside className="mt-5 border-t border-gray-600 pt-4 text-xs text-gray-400"><strong>Onde consultar nos livros</strong><p>{wolf?'Werewolf: The Apocalypse, livro básico (inglês), páginas 118–123, 127–128, 133 e 139–140.':'Vampiro: A Máscara, 5ª edição, livro básico (português brasileiro), páginas 118–123, 126–127, 157–158, 205–207 e 260.'}</p><p>Numeração impressa. Modificadores de poderes, formas, equipamentos e exceções específicas devem ser confirmados com o Narrador.</p></aside>;
}
function Result({roll}:{roll:DiceRoll}){
 const check=isCheck(roll.config.kind),result=evaluateDice(roll.dice,roll.config.difficulty);
 if(check){const failed=roll.dice.filter(d=>d.value<6).length;return <div role="status" className="rounded border border-gray-600 p-3">
 {roll.config.kind==='rageCheck'?<><strong>{failed?`${failed} checagem${failed>1?'s falharam':' falhou'}`:'Fúria mantida'} · Fúria {roll.resourceBefore} → {roll.resourceAfter}</strong><p>Cada dado com 1–5 reduz Fúria em 1; 6–10 mantém. A redução já foi aplicada, até o mínimo de zero.</p></>:<><strong>{failed?roll.resourceBefore===5?'Fome 5: teste de frenesi de fome necessário':'Fome aumenta em 1':'Fome mantida'} · Fome {roll.resourceBefore} → {roll.resourceAfter}</strong><p>A consequência já foi aplicada. Se a Fome já estava em 5, resolva o teste de frenesi de fome com o Narrador.</p></>}
 </div>;}
 return <div role="status" className="space-y-2 rounded border border-gray-600 p-4" aria-label="Resultado da rolagem">
 <strong className="text-lg">{result.brutal?`Falha brutal ou ${result.brutalSuccesses} sucessos ao ferir ou causar dano`:`${result.successes} ${result.successes===1?'sucesso':'sucessos'}${result.bestial?' · Falha bestial':result.messy?roll.config.difficulty===null?' · Potencial crítico bestial':' · Crítico bestial':result.passed===false?' · Falha':result.critical?roll.config.difficulty===null?' · Crítico nos dados':' · Vitória crítica':result.passed===true?' · Sucesso':result.successes===0?' · Falha total':''}`}</strong>
 <details className="text-sm"><summary>Detalhes do resultado</summary><div className="mt-2 space-y-2">
 {result.brutal&&<><p>{result.successes} sucessos nos dados + 4 pelo resultado brutal. Sem benefício da brutalidade: o teste falha. Com benefício: compare {result.brutalSuccesses} com a dificuldade{roll.config.difficulty?` ${roll.config.difficulty} (${result.brutalSuccesses>=roll.config.difficulty?'atingida':'não atingida'})`:''}.</p><p>O Narrador decide se a ação se beneficia da Fúria; a habilidade escolhida não decide isso automaticamente.</p></>}
 {result.bestial&&<p>Um dado de Fome mostrou 1 e o teste falhou. Resolva a manifestação da Besta com o Narrador.</p>}
 {result.messy&&<p>{roll.config.difficulty===null?'Se o teste vencer, será um crítico bestial.':'A vitória crítica envolve a Besta.'} As consequências são resolvidas pelo Narrador.</p>}
 <p>6–9: 1 sucesso. Cada par de 10: 4 sucessos; um 10 sem par vale 1. {result.tens} dados com 10.</p>
 {roll.config.difficulty===null&&<p>Dificuldade não informada: compare com a dificuldade ou a rolagem adversária. Falha bestial ainda pode ocorrer se os sucessos forem insuficientes e houver 1 na Fome.</p>}
 </div></details>
 </div>;
}
export function DiceRoller({character:c,onUpdate,children}:{character:Character;onUpdate:(transform:(current:Character)=>Character)=>void;children?:React.ReactNode}){
 const [more,setMore]=useState(false);
 const {t}=useI18n();const wolf=c.gameType===GameType.Werewolf;
 const [open,setOpen]=useState(false),[config,setConfig]=useState<RollConfig>(()=>({...defaultRollConfig,...(c.npcTemplate?{kind:'custom' as const,customPool:c.npcTemplate.physical}:{} )}));
 const [active,setActive]=useState<DiceRoll|null>(null),[history,setHistory]=useState<DiceRoll[]>([]),[selected,setSelected]=useState<number[]>([]),[error,setError]=useState('');
 const resultRef=useRef<HTMLElement>(null);
 const waiverRef=useRef(false);
 const lock=useRef(false),selectedRef=useRef(selected);selectedRef.current=selected;
 useEffect(()=>{lock.current=false;},[active]);
 useEffect(()=>{if(active)resultRef.current?.scrollIntoView({block:'start',behavior:'smooth'});},[active?.id,active?.rerolls.length]);
 const update=(patch:Partial<RollConfig>)=>{setConfig(prev=>({...prev,...patch}));setError('');};
 const ordinary=['skill','attributes','custom'].includes(config.kind),check=isCheck(config.kind);
 let preview:ReturnType<typeof buildPool>|null=null,previewError='';try{preview=buildPool(c,config);}catch(e){previewError=(e as Error).message;}
 const specialName=wolf?'Fúria':'Fome';
 const makeLabel=(cfg:RollConfig)=>cfg.kind==='skill'?`${t('attributes.list.'+cfg.attribute)} + ${t('skills.list.'+cfg.skill)}`:cfg.kind==='attributes'?`${t('attributes.list.'+cfg.attribute)} + ${t('attributes.list.'+cfg.secondAttribute)}`:kinds[cfg.kind];
 const commitRoll=(roll:DiceRoll)=>{setActive(roll);setHistory(prev=>[roll,...prev.filter(item=>item.id!==roll.id)].slice(0,20));selectedRef.current=[];setSelected([]);setError('');};
 const startRoll=()=>{
  if(lock.current)return;lock.current=true;
  try{
   let roll:DiceRoll;
   onUpdate(current=>{
    const cfg={...config},pool=buildPool(current,cfg),dice=rollDice(pool,current.gameType);
    let next=current;
    if(cfg.kind==='rageCheck')next={...next,rage:Math.max(0,next.rage-dice.filter(d=>d.value<6).length)};
    if(cfg.kind==='rouse'&&dice[0].value<6)next={...next,hunger:Math.min(5,next.hunger+1)};
    roll={id:crypto.randomUUID(),config:cfg,pool,dice,original:dice.map(d=>({...d})),rerolls:[],timestamp:new Date().toISOString(),game:current.gameType,label:makeLabel(cfg),resourceBefore:current.gameType===GameType.Vampire?current.hunger:current.rage,resourceAfter:current.gameType===GameType.Vampire?next.hunger:next.rage};
    return next;
   });
   commitRoll(roll!);
  }catch(e){setError((e as Error).message);lock.current=false;}
 };
 const reroll=()=>{
  if(lock.current||!active)return;lock.current=true;
  try{
   const ids=[...selectedRef.current];let nextRoll:DiceRoll;
   onUpdate(current=>{const next=spendWillpower(current);nextRoll=rerollDice(active,ids);return next;});
   commitRoll(nextRoll!);
  }catch(e){setError((e as Error).message);lock.current=false;}
 };
 const preset=(value:string)=>{
  const presets:Record<string,Partial<RollConfig>>={brawl:{kind:'skill',attribute:Attribute.Strength,skill:Skill.Brawl},perception:{kind:'skill',attribute:Attribute.Wits,skill:Skill.Awareness},intimidation:{kind:'skill',attribute:Attribute.Manipulation,skill:Skill.Intimidation},resistance:{kind:'attributes',attribute:Attribute.Resolve,secondAttribute:Attribute.Composure},willpower:{kind:'willpower'}};
  if(presets[value])update({...presets[value],category:'auto',specialty:false});
 };
 const openTest=(request:RollRequest)=>{
  setConfig(previous=>({...defaultRollConfig,attribute:previous.attribute,skill:previous.skill,ignoreHealthWithWillpower:previous.ignoreHealthWithWillpower,...request}));
  setMore(Boolean(request.kind&&!['skill','willpower'].includes(request.kind)));setActive(null);setSelected([]);selectedRef.current=[];setError('');setOpen(true);
 };
 const eligible=active&&active.config.allowWillpower&&['skill','attributes','custom'].includes(active.config.kind)&&c.npcTemplate?.kind!=='spirit';
 return <QuickRollContext.Provider value={openTest}><section className="dice-tools mb-5 rounded-xl border border-gray-600 bg-gray-950 p-4">
 <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-xl">Testes e dados</h2><p className="text-sm text-gray-300">Use os valores da ficha, {specialName} e as trilhas de dano.</p></div><button type="button" className={buttonClass} onClick={()=>openTest(c.npcTemplate?{kind:'custom',customPool:c.npcTemplate.physical}:{kind:'skill'})}>Rolar dados</button></div>
 {open&&<InfoModal title="Rolagem de testes" onClose={()=>setOpen(false)}>
 <div className="space-y-5 min-w-0">
 {c.npcTemplate?.kind==='spirit'?<p>Espírito · Vitalidade {trackRemaining(c,'health')} de {trackCapacity(c,'health')}. Sem trilha separada de Força de Vontade.</p>:<p>{c.npcTemplate?'Modelo simplificado':`${specialName} ${wolf?c.rage:c.hunger}`} · Força de Vontade: {trackRemaining(c,'willpower')} livres de {trackCapacity(c,'willpower')}.</p>}
 {trackRemaining(c,'willpower')===0&&canSpendWillpower(c)&&<p className="text-amber-200">A trilha de Força de Vontade está cheia. Um novo gasto converterá 1 dano superficial em agravado.</p>}
 <button type="button" className={buttonClass} aria-expanded={more} onClick={()=>setMore(value=>!value)}>Mais opções</button>
 {config.kind==='skill'&&<h3 className="text-lg">Teste de {t('skills.list.'+config.skill)}</h3>}
 {config.kind==='willpower'&&<h3 className="text-lg">Teste de Força de Vontade</h3>}
 {more&&<> <label className="block">Teste sugerido<select aria-label="Teste sugerido" className={fieldClass} value="" onChange={e=>preset(e.target.value)}><option value="">Escolher uma sugestão</option><option value="brawl">Lutar · Força + Briga</option><option value="perception">Perceber · Raciocínio + Percepção</option><option value="intimidation">Intimidar · Manipulação + Intimidação</option><option value="resistance">Resistir · Determinação + Autocontrole</option>{c.npcTemplate?.kind!=='spirit'&&<option value="willpower">Força de Vontade</option>}</select></label>
 <p className="text-sm text-gray-400">Sugestões de paradas; a combinação e a dificuldade são definidas pelo Narrador.</p>
 <label className="block">Tipo de teste<select aria-label="Tipo de teste" className={fieldClass} value={config.kind} onChange={e=>update({kind:e.target.value as RollConfig['kind'],specialty:false})}>{Object.entries(kinds).filter(([key])=>wolf?!['humanity','rouse'].includes(key):key!=='rageCheck').filter(([key])=>c.npcTemplate?!['humanity','rouse','rageCheck'].includes(key)&&!(c.npcTemplate.kind==='spirit'&&key==='willpower'):true).map(([key,label])=><option key={key} value={key}>{label}</option>)}</select></label>
 </>}
 {['skill','attributes'].includes(config.kind)&&<div className="grid gap-3 sm:grid-cols-2">
 <label>Atributo<select aria-label="Atributo do teste" className={fieldClass} value={config.attribute} onChange={e=>update({attribute:e.target.value as Attribute})}>{aAttributeList.map(a=><option value={a} key={a}>{t('attributes.list.'+a)} · {c.attributes[a]}</option>)}</select></label>
 {config.kind==='skill'?<label>Habilidade<select aria-label="Habilidade do teste" className={fieldClass} value={config.skill} onChange={e=>update({skill:e.target.value as Skill,specialty:false})}>{aSkillList.map(s=><option value={s} key={s}>{t('skills.list.'+s)} · {c.skills[s]}</option>)}</select></label>:<label>Segundo atributo<select aria-label="Segundo atributo" className={fieldClass} value={config.secondAttribute} onChange={e=>update({secondAttribute:e.target.value as Attribute})}>{aAttributeList.map(a=><option value={a} key={a}>{t('attributes.list.'+a)} · {c.attributes[a]}</option>)}</select></label>}
 </div>}
 {config.kind==='custom'&&<label className="block">Quantidade base de dados<input aria-label="Quantidade base de dados" type="number" min="0" max="50" className={fieldClass} value={config.customPool} onChange={e=>update({customPool:Number(e.target.value)})}/></label>}
 {more&&config.kind==='skill'&&<label className="flex gap-2"><input type="checkbox" checked={config.specialty} onChange={e=>update({specialty:e.target.checked})}/>Especialização aplicável (+1 dado){c.specialties.filter(s=>s.skill===config.skill).length>0&&`: ${c.specialties.filter(s=>s.skill===config.skill).map(s=>s.name).join(', ')}`}</label>}
 {more&&ordinary&&<div className="rounded border border-gray-600 p-3"><h3>Opções avançadas</h3><div className="mt-3 space-y-4">
 <label className="block">Categoria da ação<select aria-label="Categoria da ação" className={fieldClass} value={config.category} onChange={e=>{const category=e.target.value as RollConfig['category'];update({category,...(c.npcTemplate&&['physical','social','mental'].includes(category)?{customPool:c.npcTemplate[category as 'physical'|'social'|'mental']}:{})});}}>{Object.entries(categoryNames).map(([key,label])=><option key={key} value={key}>{label}</option>)}</select></label>

 {!c.npcTemplate&&<label className="flex gap-2"><input type="checkbox" checked={config.specialDice} onChange={e=>update({specialDice:e.target.checked})}/>Incluir dados de {specialName} (desmarque somente para uma exceção aplicável)</label>}
 <label className="flex gap-2"><input type="checkbox" checked={config.allowWillpower} onChange={e=>update({allowWillpower:e.target.checked})}/>Permitir rerrolagem com Força de Vontade (desmarque se a regra deste teste proibir)</label>
 <label className="block">Redução da penalidade por efeito ativo<select aria-label="Redução da penalidade" className={fieldClass} value={config.penaltyReduction} onChange={e=>update({penaltyReduction:Number(e.target.value)})}><option value="0">Nenhuma</option><option value="1">Ignorar 1 dado de penalidade</option><option value="2">Ignorar os 2 dados de penalidade</option></select></label>
 <p className="text-sm text-gray-400">Use a redução apenas quando um poder, Vantagem ou regra ativa permitir. Não há uma Vantagem universal aplicada automaticamente. {wolf?'Em frenesi, ignore a penalidade física e desative a rerrolagem por Força de Vontade. Bônus de forma ou de resistência entram no modificador.':'Poder Vindo da Dor (Fortitude 5) ignora a penalidade física quando ativado; seus bônus de Atributos entram no modificador. Não é um efeito passivo.'}</p>
 {!wolf&&preview?.category==='physical'&&!c.npcTemplate&&<div className="space-y-2">
 {!config.ignoreHealthWithWillpower&&<button type="button" className={buttonClass} disabled={!canSpendWillpower(c)} onClick={()=>{if(waiverRef.current)return;waiverRef.current=true;try{onUpdate(current=>spendWillpower(current));update({ignoreHealthWithWillpower:true});}catch(e){waiverRef.current=false;setError((e as Error).message);}}}>Gastar 1 Força de Vontade e ignorar penalidade de Vitalidade por um turno</button>}
 <p className="text-xs text-gray-400">Encerre o efeito ao terminar o turno. Ele vale para as rolagens físicas deste turno, sem novo gasto em cada teste.</p>
 </div>}
 </div></div>}
 {config.ignoreHealthWithWillpower&&<div className="rounded border border-emerald-700 p-3"><p>Penalidade de Vitalidade ignorada neste turno; o custo de 1 Força de Vontade já foi pago.</p><button type="button" className={buttonClass} onClick={()=>{waiverRef.current=false;update({ignoreHealthWithWillpower:false});}}>Encerrar efeito de um turno</button></div>}
 {!check&&<div className="grid gap-3 sm:grid-cols-2">{more&&<label>Modificador de dados<input aria-label="Modificador de dados" className={fieldClass} type="number" min="-30" max="30" value={config.modifier} onChange={e=>update({modifier:Number(e.target.value)})}/></label>}<label>Dificuldade (opcional)<input aria-label="Dificuldade" className={fieldClass} type="number" min="1" max="50" placeholder="Sem dificuldade definida" value={config.difficulty??''} onChange={e=>update({difficulty:e.target.value===''?null:Number(e.target.value)})}/></label></div>}
 {config.kind==='rageCheck'&&<label className="block">Número de checagens<select aria-label="Número de checagens" className={fieldClass} value={config.checks} onChange={e=>update({checks:Number(e.target.value)})}><option value="1">Uma checagem</option><option value="2">Duas checagens</option></select></label>}
 {preview?<div className="rounded border border-gray-600 p-3" aria-label="Parada calculada"><strong>{preview.total} dados · {preview.total-preview.special} normais · {preview.special} de {specialName}</strong>{more&&<p>Base {preview.base} · modificador {preview.modifier>=0?'+':''}{preview.modifier} · penalidade −{preview.penalty}{!check?' · mínimo de 1 dado':''}.</p>}{preview.penalty>0&&<p>Trilha cheia: −2 para ações físicas com Vitalidade debilitada, ou sociais/mentais com Força de Vontade debilitada, ajustado por efeitos ativos.</p>}{!ordinary&&!check&&<p>Este teste usa a trilha atual, sem dados de Fome/Fúria e sem rerrolagem por Força de Vontade.</p>}{check&&<p>Checagens usam 6 ou mais, sem críticos, dados especiais ou rerrolagem por Força de Vontade.</p>}</div>:<p role="alert">{previewError}</p>}
 {error&&<p role="alert" className="text-red-300">{error}</p>}
 <button type="button" className={buttonClass+' w-full bg-red-950'} disabled={!preview} onClick={startRoll}>Rolar teste</button>
 {active&&<section ref={resultRef} className="space-y-3 border-t border-gray-600 pt-4" aria-label="Última rolagem"><h3 className="text-lg">{active.label}</h3><p className="text-sm">Parada usada: {active.pool.total} dados · penalidade −{active.pool.penalty}. {active.rerolls.length} gasto(s) de Força de Vontade em rerrolagens.</p>
 <Result roll={active}/>
 {more&&!isCheck(active.config.kind)&&<label className="block text-sm">Dificuldade deste resultado (pode ser informada depois)
 <input aria-label="Dificuldade deste resultado" className={fieldClass} type="number" min="1" max="50" value={active.config.difficulty??''} onChange={e=>{const difficulty=e.target.value===''?null:Number(e.target.value);if(difficulty!==null&&(!Number.isInteger(difficulty)||difficulty<1||difficulty>50))return;const revised={...active,config:{...active.config,difficulty}};setActive(revised);setHistory(prev=>prev.map(item=>item.id===revised.id?revised:item));}}/>
 </label>}
 <div className="grid grid-cols-3 gap-2 sm:grid-cols-5" aria-label="Dados rolados">{active.dice.map(d=>{const allowed=Boolean(eligible)&&rerollEligible(d),chosen=selected.includes(d.id);return <label key={d.id} className={`min-w-0 rounded-lg border p-2 text-center ${d.type==='hunger'?'border-red-400 bg-red-950':d.type==='rage'?'border-amber-400 bg-amber-950':'border-gray-500 bg-gray-900'}`}><span className="block text-xs">Dado {d.id+1} · {d.type==='normal'?'normal':d.type==='hunger'?'Fome':'Fúria'}</span><strong className="block text-2xl">{d.value}</strong><input type="checkbox" aria-label={`Rerrolar dado ${d.id+1} (${d.type==='normal'?'normal':d.type==='hunger'?'Fome':'Fúria'} ${d.value})`} checked={chosen} disabled={!allowed||!chosen&&selected.length>=3} onChange={e=>{const next=e.target.checked?[...selectedRef.current,d.id]:selectedRef.current.filter(id=>id!==d.id);selectedRef.current=next;setSelected(next);}}/><span className="block text-xs">{allowed?'Rerrolar':d.type==='hunger'?'Fome: bloqueado':d.type==='rage'&&d.value<=2?'Brutal: bloqueado':'Sem rerrolagem'}</span></label>;})}</div>
 {eligible&&<><p className="text-sm">Selecione de 1 a 3 dados, inclusive sucessos ou 10 normais. {wolf?'Dados de Fúria podem ser rerrolados, exceto resultados 1 e 2.':'Dados de Fome nunca podem ser rerrolados com Força de Vontade.'} O custo é 1 dano superficial em Força de Vontade, sem redução. O tamanho desta parada não muda após o gasto.</p><button type="button" className={buttonClass+' w-full'} disabled={!selected.length||!canSpendWillpower(c)} onClick={reroll}>Gastar 1 Força de Vontade e rerrolar selecionados</button></>}
 {active.rerolls.length>0&&<details><summary>Dados originais e alterações</summary><p>Originais: {active.original.map(d=>`${d.type==='normal'?'normal':d.type==='hunger'?'Fome':'Fúria'} ${d.value}`).join(' · ')}</p>{active.rerolls.map((r,i)=><p key={i}>Rerrolagem {i+1}: {r.indices.map(id=>`dado ${id+1}: ${r.before[id].value} → ${r.after[id].value}`).join('; ')}.</p>)}</details>}
 </section>}
 <details><summary>Ferimentos e Força de Vontade</summary><DamageTracker character={c} onChange={damage=>onUpdate(current=>synchronizeDamage(current,damage!))}/><p className="text-sm">A penalidade surge ao preencher toda a trilha, inclusive com dano superficial. Não é −1 por ferimento. Registre o dano final após as reduções apropriadas.</p></details>
 <details><summary>Histórico desta sessão ({history.length}/20)</summary><p className="text-xs text-gray-400">Últimas 20 rolagens enquanto esta ficha permanece aberta. Não acompanha a exportação da ficha.</p><ol className="space-y-3 mt-3">{history.map(item=><li className="rounded border border-gray-700 p-3" key={item.id}><strong>{item.label}</strong><p className="text-xs">{new Date(item.timestamp).toLocaleTimeString('pt-BR')} · {item.dice.map(d=>`${d.value}${d.type==='hunger'?'F':d.type==='rage'?'R':''}`).join(', ')}</p><Result roll={item}/></li>)}</ol></details>
 <details><summary>Regras e referências</summary><Sources wolf={wolf}/></details>
 </div></InfoModal>}
 </section>{children}</QuickRollContext.Provider>;
}
