import { fnGetDisciplineDetails } from '../constants';
import { W5_TRIBES } from '../data/w5';
import { Character, GameType } from '../types';
import {NPC_ROLE_PROFILES, NpcRole} from '../data/npcRoles';
import {nextChoice} from './randomChoice';
import {fnCreateRandomCharacter, RandomCharacterOptions} from './randomizer';

// Keep the role list available to existing consumers, from one shared catalogue.
export const NPC_ROLES=NPC_ROLE_PROFILES;
export function pickNpcRole(game:GameType,role?:string):NpcRole {
 const entries=NPC_ROLE_PROFILES[game];
 const chosen=role||nextChoice(`npc-role:${game}`,roleNames[game]);
 return entries.find(entry=>entry.role===chosen)||entries[0];
}
const roleNames={
 [GameType.Vampire]:NPC_ROLE_PROFILES.Vampire.map(r=>r.role),
 [GameType.Werewolf]:NPC_ROLE_PROFILES.Werewolf.map(r=>r.role)
};
const narrativeContexts={
 motivation:['A conquista depende de um aliado improvável.','O tempo para agir está se esgotando.','Uma dívida antiga limita suas escolhas.','Recusa uma solução que sacrifique inocentes.','Aceita perder prestígio para alcançar isso.','Precisa primeiro recuperar a confiança de alguém.','Teme repetir o erro de seu antigo mentor.','Um rival compartilha parte desse objetivo.','Sua comunidade desconhece o tamanho do risco.','Uma promessa pessoal impede o caminho mais fácil.','Quer deixar uma alternativa para a próxima geração.','Não consegue agir sem pedir ajuda.'],
 secret:['Uma testemunha pode confirmar isso.','Uma carta comprometedora ainda existe.','Um aliado começou a desconfiar.','Alguém exige um favor para continuar em silêncio.','As consequências alcançam alguém que tenta proteger.','Uma versão falsa já circula entre seus adversários.','O segredo pode mudar uma negociação em andamento.','Pretende confessar, mas espera a ocasião certa.','Outra pessoa assumiu parte da culpa.','Uma investigação recente se aproxima da verdade.','Um objeto guardado comprova o que aconteceu.','Ainda acredita que pode reparar o dano discretamente.'],
 relationship:['Prefere conversar em território neutro.','Não quer envolver seu protetor nessa relação.','Oferece algo concreto antes de fazer exigências.','Ainda testa até onde pode confiar.','Tem uma informação que pode facilitar o acordo.','Evita promessas que não consiga cumprir.','Um conhecido em comum pode servir de ponte.','Teme que um rival interprete o contato como aliança.','Pretende manter o contato em segredo por enquanto.','Reconhece uma dívida, mas discorda de seu preço.','Sua comunidade observará como os personagens respondem.','Aceita negociar os detalhes antes de agir.'],
 hook:['Uma testemunha só aceita conversar em segredo.','Uma pessoa inocente corre o risco de levar a culpa.','O primeiro suspeito apresenta uma versão plausível.','Uma pista contradiz o relato mais conhecido.','O grupo tem pouco tempo antes de uma reunião decisiva.','Um aliado recomenda cautela por motivos que não explica.','Um rival também precisa resolver a situação.','Uma promessa antiga complica a resposta mais simples.','Alguém oferece ajuda em troca de uma garantia.','Um lugar aparentemente seguro deixa de ser confiável.','Uma mensagem chega incompleta e precisa ser confirmada.','O desfecho pode alterar uma aliança local.']
};
const narrativePools=Object.fromEntries(Object.entries(NPC_ROLE_PROFILES).map(([game,roles])=>[game,Object.fromEntries(roles.map(profile=>[profile.role,Object.fromEntries((['motivation','secret','relationship','hook'] as const).map(field=>{
 const base={motivation:profile.motivations,secret:profile.secrets,relationship:profile.relationships,hook:profile.hooks}[field];
 return [field,base.flatMap(text=>narrativeContexts[field].map(context=>`${text} ${context}`))];
}))]))])) as Record<GameType,Record<string,Record<keyof typeof narrativeContexts,string[]>>>;
export function generateNpcNarrative(game:GameType,role:string,field:keyof typeof narrativeContexts,current=''){
 const profile=NPC_ROLE_PROFILES[game].find(r=>r.role===role)||NPC_ROLE_PROFILES[game][0];
 return nextChoice(`npc:${game}:${profile.role}:${field}`,narrativePools[game][profile.role][field],current);
}
export function createNarrativeNpc(locale:string,scale:'fledgling'|'neonate'|'ancilla',t:(key:string)=>string,game:GameType,role?:string,options:RandomCharacterOptions={}):Character {
 const profile=pickNpcRole(game,role);
 const c=fnCreateRandomCharacter(locale,scale,t,game,{...options,attributes:profile.attributes,skills:profile.skills,predators:profile.predators,disciplines:profile.disciplines});
 return asNarrativeNpc(c,scale,profile.role);
}
export function asNarrativeNpc(c:Character,scale:string,role?:string):Character {
 const powers=fnGetDisciplineDetails(k=>k);
 const disciplinePowers:Record<string,string[]>={};
 for(const [key,dots] of Object.entries(c.disciplines)){
  const chosen:string[]=[]; for(let slot=1;slot<=dots;slot++){const eligible=powers[key]?.powers.filter(p=>p.level<=slot&&!chosen.includes(p.id)&&(!p.prerequisite||chosen.includes(p.prerequisite))&&(!p.amalgam||p.amalgam.every(r=>(c.disciplines[r.discipline]||0)>=r.level)))||[];if(eligible.length)chosen.push(eligible[Math.floor(Math.random()*eligible.length)].id);}
  disciplinePowers[key]=chosen;
 }
 const profile=pickNpcRole(c.gameType,role);
 const narrative={role:`${profile.role} · ${scale==='ancilla'?'influente':scale==='neonate'?'estabelecido':'em ascensão'}`,motivation:generateNpcNarrative(c.gameType,profile.role,'motivation'),secret:generateNpcNarrative(c.gameType,profile.role,'secret'),relationship:generateNpcNarrative(c.gameType,profile.role,'relationship'),hook:generateNpcNarrative(c.gameType,profile.role,'hook')};
 if(c.gameType===GameType.Werewolf&&c.tribe)narrative.motivation = `${W5_TRIBES[c.tribe].theme} ${narrative.motivation}`;
 return {...c,concept:profile.role,disciplinePowers,profile:'npc',schemaVersion:2,narrative,ambition:narrative.motivation,desire:narrative.hook};
}
