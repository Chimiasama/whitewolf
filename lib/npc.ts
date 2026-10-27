import { fnGetDisciplineDetails } from '../constants';
import { W5_TRIBES } from '../data/w5';
import { Character, GameType } from '../types';
/** Original narrative templates inspired by source functions, not copies of named NPCs. */
export const NPC_ROLES = {
 Vampire: [
  {role:'Intermediário da corte',motivation:'Conquistar uma posição segura sem expor quem o protege.',secret:'Deve um favor a uma facção rival.',relationship:'Precisa da coterie para negociar uma dívida.',hook:'Uma promessa incompatível com a lealdade ao senhor vence nesta noite.'},
  {role:'Guardião de um culto',motivation:'Preservar a comunidade que dá sentido à sua não vida.',secret:'A doutrina protege um interesse pessoal inconfessável.',relationship:'Oferece abrigo em troca de silêncio.',hook:'Um fiel desapareceu e deixou provas de alimentação indevida.'},
  {role:'Organizador Anarquista',motivation:'Manter um território e seus mortais longe da exploração.',secret:'Um antigo financiou sua ascensão.',relationship:'É aliado útil, mas exige reciprocidade.',hook:'Uma disputa pelo território ameaça revelar a Máscara.'}],
 Werewolf: [
  {role:'Defensor do território',motivation:'Proteger um lugar vivo e a comunidade ligada a ele.',secret:'Aceitou um pacto espiritual que não consegue cumprir sozinho.',relationship:'Precisa da alcateia para enfrentar uma ameaça maior.',hook:'Uma obra revela contaminação que também se manifesta na Umbra.'},
  {role:'Mediador espiritual',motivation:'Reparar uma relação rompida entre pessoas, espíritos e território.',secret:'A solução anterior transferiu o sofrimento para outra comunidade.',relationship:'Reconhece na alcateia uma chance de reparação.',hook:'O espírito exige restituição, não um inimigo para matar.'},
  {role:'Veterano em crise',motivation:'Impedir que a nova geração repita uma vitória desastrosa.',secret:'Seu feito mais celebrado causou a perda de um Pilar.',relationship:'Pode orientar a alcateia, mas precisa recuperar confiança.',hook:'O patrono cobra uma resposta que ameaça levá-lo a Harano ou Hauglosk.'}]
};
export function asNarrativeNpc(c:Character,scale:string,role?:string):Character {
 const powers=fnGetDisciplineDetails(k=>k);
 const disciplinePowers:Record<string,string[]>={};
 for(const [key,dots] of Object.entries(c.disciplines)){
  const chosen:string[]=[]; for(let slot=1;slot<=dots;slot++){const eligible=powers[key]?.powers.filter(p=>p.level<=slot&&!chosen.includes(p.id)&&(!p.prerequisite||chosen.includes(p.prerequisite))&&(!p.amalgam||p.amalgam.every(r=>(c.disciplines[r.discipline]||0)>=r.level)))||[];if(eligible.length)chosen.push(eligible[Math.floor(Math.random()*eligible.length)].id);}
  disciplinePowers[key]=chosen;
 }
 const entries=NPC_ROLES[c.gameType];const narrative={...(entries.find(e=>e.role===role)||entries[Math.floor(Math.random()*entries.length)])};
 if(c.gameType===GameType.Werewolf&&c.tribe)narrative.motivation = `${W5_TRIBES[c.tribe].theme} ${narrative.motivation}`;
 return {...c,disciplinePowers,profile:'npc',schemaVersion:2,narrative:{...narrative,role:`${narrative.role} · ${scale==='ancilla'?'influente':scale==='neonate'?'estabelecido':'em ascensão'}`},ambition:narrative.motivation,desire:narrative.hook};
}
