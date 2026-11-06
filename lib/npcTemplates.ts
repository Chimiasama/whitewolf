import {Attribute,Skill,Character,NpcTemplate} from '../types';
export const NPC_TEMPLATE_NAMES={human:'Humano',ghoul:'Carniçal',spirit:'Espírito',fomor:'Fomor'};
export function withNpcTemplate(base:Character,kind:NpcTemplate['kind']):Character{
 if(!NPC_TEMPLATE_NAMES[kind])throw new Error('Modelo de NPC inválido.');
 const pool=(attrs:Attribute[],skills:Skill[])=>Math.max(...attrs.map(a=>base.attributes[a]))+Math.max(...skills.map(s=>base.skills[s]));
 const physical=pool([Attribute.Strength,Attribute.Dexterity,Attribute.Stamina],[Skill.Brawl,Skill.Melee,Skill.Athletics,Skill.Stealth,Skill.Survival,Skill.Firearms]);
 const social=pool([Attribute.Charisma,Attribute.Manipulation,Attribute.Composure],[Skill.Persuasion,Skill.Subterfuge,Skill.Leadership,Skill.Etiquette,Skill.Intimidation,Skill.Performance]);
 const mental=pool([Attribute.Intelligence,Attribute.Wits,Attribute.Resolve],[Skill.Investigation,Skill.Occult,Skill.Science,Skill.Technology,Skill.Medicine,Skill.Academics]);
 const npcTemplate:NpcTemplate={kind,power:3,physical,social,mental,health:6,willpower:5,exceptional:'',abilities:''};
 return {...base,health:kind==='spirit'?npcTemplate.power*2:npcTemplate.health,willpower:kind==='spirit'?npcTemplate.power*2:npcTemplate.willpower,damage:{health:{superficial:0,aggravated:0},willpower:{superficial:0,aggravated:0}},profile:'npc',clan:null,tribe:null,auspice:null,gifts:[],disciplines:{},disciplinePowers:{},rituals:[],talismans:[],predatorType:null,loresheets:[],advantages:[],flaws:[],thinMerits:[],thinFlaws:[],renown:{glory:0,honor:0,wisdom:0},npcTemplate};
}
