import {Character,Clan,GameType} from '../types';
import {appendExperience,experienceDate} from './experience';
export const AGE_PROFILES={childer:{name:'Recém-criado',xp:0,advantages:7,flaws:2},neonate:{name:'Neófito',xp:15,advantages:7,flaws:2},ancilla:{name:'Ancilla',xp:35,advantages:9,flaws:4}};
export function applyCreationAge(c:Character,age:keyof typeof AGE_PROFILES):Character{
 if(c.profile==='npc'||c.gameType!==GameType.Vampire||c.creationCompletedAt||c.initialExperienceGranted)throw new Error('A idade inicial já foi aplicada ou não se aplica a esta ficha.');
 if(c.clan===Clan.ThinBlood&&age!=='childer')throw new Error('O perfil inicial de Sangue-Fraco usa recém-criado.');
 if(!AGE_PROFILES[age])throw new Error('Idade inválida.');
 const ancilla=age==='ancilla';
 const next:Character={...c,creationAge:age,initialExperienceGranted:true,generation:c.clan===Clan.ThinBlood?14:ancilla?11:13,bloodPotency:c.clan===Clan.ThinBlood?0:ancilla?2:1,humanity:c.humanity-(ancilla?1:0)};
 const amount=AGE_PROFILES[age].xp;
 return amount?appendExperience(next,{id:'initial-age-'+age,date:experienceDate(),kind:'earned',amount,note:'XP inicial: '+AGE_PROFILES[age].name+' — V5 p. 151; Players Guide, resumo de criação.'}):next;
}
