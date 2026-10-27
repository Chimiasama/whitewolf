import {Character,NpcTemplate} from '../types';
export const NPC_TEMPLATE_NAMES={human:'Humano',ghoul:'Carniçal',spirit:'Espírito',fomor:'Fomor'};
export function withNpcTemplate(base:Character,kind:NpcTemplate['kind']):Character{
 if(!NPC_TEMPLATE_NAMES[kind])throw new Error('Modelo de NPC inválido.');
 const npcTemplate:NpcTemplate={kind,power:3,physical:4,social:3,mental:3,health:6,willpower:5,exceptional:'',abilities:''};
 return {...base,profile:'npc',clan:null,tribe:null,auspice:null,gifts:[],disciplines:{},disciplinePowers:{},rituals:[],talismans:[],predatorType:null,loresheets:[],advantages:[],flaws:[],thinMerits:[],thinFlaws:[],renown:{glory:0,honor:0,wisdom:0},npcTemplate};
}
