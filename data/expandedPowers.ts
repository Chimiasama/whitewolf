import type { DisciplineDetail, DisciplinePower } from '../types';
export const NECROMANTIC_POWERS: DisciplinePower[] = [
  {
    "level": 1,
    "id": "ashesToAshes",
    "name": "Cinzas às Cinzas",
    "description": "Desfaz um cadáver em cinzas. Ashes to Ashes",
    "system": "Cults of the Blood Gods; docs/Vampire5edCultsoftheBloddGods:L17135. Confira custo, teste e consequências na fonte."
  },
  {
    "level": 1,
    "id": "theBindingFetter",
    "name": "O Grilhão Vinculante",
    "description": "Identifica vínculos de aparições. The Binding Fetter",
    "system": "Cults of the Blood Gods; docs/Vampire5edCultsoftheBloddGods:L17170. Confira custo, teste e consequências na fonte."
  },
  {
    "level": 2,
    "id": "fatalPrecognition",
    "name": "Premonição Fatal",
    "description": "Percepção sobrenatural ligada à morte. Fatal Precognition",
    "system": "Cults of the Blood Gods; docs/Vampire5edCultsoftheBloddGods:L17201. Confira custo, teste e consequências na fonte."
  },
  {
    "level": 2,
    "id": "whereTheShroudThins",
    "name": "Onde o Sudário Afina",
    "description": "Localiza áreas de Sudário tênue. Where the Shroud Thins",
    "system": "Cults of the Blood Gods; docs/Vampire5edCultsoftheBloddGods:L17253. Confira custo, teste e consequências na fonte."
  },
  {
    "level": 3,
    "id": "auraOfDecay",
    "name": "Aura de Decomposição",
    "description": "Irradia decadência. Aura of Decay",
    "system": "Cults of the Blood Gods; docs/Vampire5edCultsoftheBloddGods:L17321. Confira custo, teste e consequências na fonte."
  },
  {
    "level": 3,
    "id": "passionFeast",
    "name": "Banquete de Paixões",
    "description": "Alimenta-se da energia de aparições. Passion Feast",
    "system": "Cults of the Blood Gods; docs/Vampire5edCultsoftheBloddGods:L17361. Confira custo, teste e consequências na fonte."
  },
  {
    "level": 4,
    "id": "necroticPlague",
    "name": "Praga Necrótica",
    "description": "Inflige uma doença necromântica. Necrotic Plague",
    "system": "Cults of the Blood Gods; docs/Vampire5edCultsoftheBloddGods:L17400. Confira custo, teste e consequências na fonte."
  },
  {
    "level": 5,
    "id": "skuldFulfilled",
    "name": "Skuld Cumprida",
    "description": "Influencia o fim de uma vida. Skuld Fulfilled",
    "system": "Cults of the Blood Gods; docs/Vampire5edCultsoftheBloddGods:L17466. Confira custo, teste e consequências na fonte."
  },
  {
    "level": 5,
    "id": "witheringSpirit",
    "name": "Espírito Definhante",
    "description": "Ataca o espírito da vítima. Withering Spirit",
    "system": "Cults of the Blood Gods; docs/Vampire5edCultsoftheBloddGods:L17543. Confira custo, teste e consequências na fonte."
  }
];
export const ADDITIONAL_FORMULAE: DisciplinePower[] = [
  {
    "level": 1,
    "id": "mercurianTongue",
    "name": "Língua Mercuriana",
    "description": "Fala o idioma nativo do doador de sangue.",
    "system": "Players Guide, seção Thin-Blood Alchemy; docs/Vampire5edPlayersGuide01:L5635. Consulte ingredientes, custo e duração."
  },
  {
    "level": 1,
    "id": "plugIn",
    "name": "Conectar",
    "description": "Produz corrente elétrica por contato.",
    "system": "Players Guide, seção Thin-Blood Alchemy; docs/Vampire5edPlayersGuide01:L5635. Consulte ingredientes, custo e duração."
  },
  {
    "level": 2,
    "id": "friendsList",
    "name": "Lista de Amigos",
    "description": "Percebe vínculos entre humanos e vampiros.",
    "system": "Players Guide, seção Thin-Blood Alchemy; docs/Vampire5edPlayersGuide01:L5635. Consulte ingredientes, custo e duração."
  },
  {
    "level": 3,
    "id": "mandagloire",
    "name": "Mandagloire",
    "description": "Emite gás paralisante.",
    "system": "Players Guide, seção Thin-Blood Alchemy; docs/Vampire5edPlayersGuide01:L5635. Consulte ingredientes, custo e duração."
  },
  {
    "level": 3,
    "id": "rumor",
    "name": "Rumor",
    "description": "Induz concordância com uma afirmação.",
    "system": "Players Guide, seção Thin-Blood Alchemy; docs/Vampire5edPlayersGuide01:L5635. Consulte ingredientes, custo e duração."
  },
  {
    "level": 3,
    "id": "tank",
    "name": "Tanque",
    "description": "Reduz o primeiro dano da cena em cinco.",
    "system": "Players Guide, seção Thin-Blood Alchemy; docs/Vampire5edPlayersGuide01:L5635. Consulte ingredientes, custo e duração."
  },
  {
    "level": 4,
    "id": "shortCircuit",
    "name": "Curto-Circuito",
    "description": "Provoca um curto-circuito por contato.",
    "system": "Players Guide, seção Thin-Blood Alchemy; docs/Vampire5edPlayersGuide01:L5635. Consulte ingredientes, custo e duração."
  },
  {
    "level": 4,
    "id": "toxicPersonality",
    "name": "Personalidade Tóxica",
    "description": "Produz bile cáustica.",
    "system": "Players Guide, seção Thin-Blood Alchemy; docs/Vampire5edPlayersGuide01:L5635. Consulte ingredientes, custo e duração."
  },
  {
    "level": 5,
    "id": "floweringAmaranth",
    "name": "Amaranto Florescente",
    "description": "Permite a diablerie compartilhada nas condições da fórmula.",
    "system": "Players Guide, seção Thin-Blood Alchemy; docs/Vampire5edPlayersGuide01:L5635. Consulte ingredientes, custo e duração."
  }
];
/** Counterfeits are formulae, not permanent access to the source Discipline. */
export function expandPowers(base: Record<string,DisciplineDetail>):Record<string,DisciplineDetail> {
 const result={...base,oblivion:{...base.oblivion,powers:[...base.oblivion.powers,...NECROMANTIC_POWERS]},thinbloodalchemy:{...base.thinbloodalchemy,powers:[...base.thinbloodalchemy.powers,...ADDITIONAL_FORMULAE]}};
 const counterfeits=Object.entries(result).filter(([key])=>key!=='thinbloodalchemy').flatMap(([key,d])=>d.powers.filter(p=>p.level<=4).map(p=>({
 id:'imitate-'+key+'-'+p.id,level:p.level+1,name:'Imitação: '+p.name,
 description:'Fórmula de Alquimia que imita '+d.name+' '+p.level+'. '+p.description,
 system:'V5, pp. 285–287. Use Alquimia na parada. Nos níveis 4–5, exige vitae apropriada; confira ingredientes, pesquisa, Amálgamas e condições do poder com o Narrador. '+p.system
 })));
 result.thinbloodalchemy.powers.push(...counterfeits);
 return result;
}
