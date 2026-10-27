import { Tribe, Auspice } from '../types';
export const W5_TRIBES: Record<Tribe, {name: string; english: string; patron: string; renown: 'glory'|'honor'|'wisdom'; theme: string; page: number}> = {
 blackfuries: {name:'Fúrias Negras',english:'Black Furies',patron:'Górgona',renown:'glory',theme:'Combater injustiças e estruturas de opressão.',page:60},
 bonegnawers: {name:'Roedores de Ossos',english:'Bone Gnawers',patron:'Rato',renown:'honor',theme:'Solidariedade, sobrevivência e redes dos marginalizados.',page:62},
 childrenofgaia: {name:'Filhos de Gaia',english:'Children of Gaia',patron:'Unicórnio',renown:'wisdom',theme:'Investigar os mistérios de Gaia e curar suas feridas.',page:64},
 galestalkers: {name:'Espreitadores da Ventania',english:'Galestalkers',patron:'Vento Norte',renown:'honor',theme:'Caça paciente, rastreamento e persistência.',page:66},
 ghostcouncil: {name:'Conselho Fantasma',english:'Ghost Council',patron:'Serpente Chifruda',renown:'wisdom',theme:'Conhecimento proibido e acordos espirituais com consequências.',page:68},
 andarilhosdoasfalto: {name:'Andarilhos do Asfalto',english:'Glass Walkers',patron:'Aranha',renown:'wisdom',theme:'Construção, tecnologia e redes urbanas.',page:70},
 hartwardens: {name:'Guardiões do Cervo',english:'Hart Wardens',patron:'Cervo',renown:'glory',theme:'Hospitalidade, território e comunidades vivas.',page:72},
 redtalons: {name:'Garras Vermelhas',english:'Red Talons',patron:'Grifo',renown:'honor',theme:'Defender a vida selvagem sem colocar os humanos no centro.',page:74},
 shadowlords: {name:'Senhores das Sombras',english:'Shadow Lords',patron:'Trovão',renown:'glory',theme:'Estratégia, poder e exploração das fraquezas do inimigo.',page:76},
 silentstriders: {name:'Peregrinos Silenciosos',english:'Silent Striders',patron:'Coruja',renown:'wisdom',theme:'Viagens, informação e observação antes de agir.',page:78},
 silverfangs: {name:'Presas de Prata',english:'Silver Fangs',patron:'Falcão',renown:'honor',theme:'Liderança, inspiração e responsabilidade.',page:80},
};
export const W5_AUSPICES: Record<Auspice,string> = {ragabash:'Ragabash',theurge:'Theurge',philodox:'Philodox',galliard:'Galliard',ahroun:'Ahroun'};
export interface W5Gift {id:string;name:string;english:string;origin:'native'|'auspice'|'tribe';owner:string;totalRenown:number;reference:string;summary:string}
export const W5_GIFTS: W5Gift[] = [
  {
    "id": "native-catfeet",
    "name": "Pés de Gato",
    "english": "Catfeet",
    "origin": "native",
    "owner": "native",
    "totalRenown": 1,
    "reference": "docs/Werewolf5ed:L9614",
    "summary": "Equilíbrio e resistência a quedas. Consulte custo, teste e duração na referência."
  },
  {
    "id": "native-eyes-of-the-owl",
    "name": "Olhos da Coruja",
    "english": "Eyes Of The Owl",
    "origin": "native",
    "owner": "native",
    "totalRenown": 1,
    "reference": "docs/Werewolf5ed:L9632",
    "summary": "Visão em escuridão. Consulte custo, teste e duração na referência."
  },
  {
    "id": "native-hares-leap",
    "name": "Salto da Lebre",
    "english": "Hare’S Leap",
    "origin": "native",
    "owner": "native",
    "totalRenown": 1,
    "reference": "docs/Werewolf5ed:L9647",
    "summary": "Salto sobrenatural. Consulte custo, teste e duração na referência."
  },
  {
    "id": "native-penumbral-senses",
    "name": "Sentidos Penumbrais",
    "english": "Penumbral Senses",
    "origin": "native",
    "owner": "native",
    "totalRenown": 1,
    "reference": "docs/Werewolf5ed:L9659",
    "summary": "Percepção da Penumbra. Consulte custo, teste e duração na referência."
  },
  {
    "id": "native-raging-strike",
    "name": "Golpe Furioso",
    "english": "Raging Strike",
    "origin": "native",
    "owner": "native",
    "totalRenown": 1,
    "reference": "docs/Werewolf5ed:L9677",
    "summary": "Canalizar Fúria em um ataque. Consulte custo, teste e duração na referência."
  },
  {
    "id": "native-staredown",
    "name": "Encarada",
    "english": "Staredown",
    "origin": "native",
    "owner": "native",
    "totalRenown": 1,
    "reference": "docs/Werewolf5ed:L9687",
    "summary": "Intimidar com o olhar. Consulte custo, teste e duração na referência."
  },
  {
    "id": "ragabash-blissful-ignorance",
    "name": "Ignorância Abençoada",
    "english": "Blissful Ignorance",
    "origin": "auspice",
    "owner": "ragabash",
    "totalRenown": 2,
    "reference": "docs/Werewolf5ed:L9834",
    "summary": "Pacto ligado ao papel do augúrio na alcateia."
  },
  {
    "id": "ragabash-crows-laughter",
    "name": "Riso do Corvo",
    "english": "Crow’S Laughter",
    "origin": "auspice",
    "owner": "ragabash",
    "totalRenown": 2,
    "reference": "docs/Werewolf5ed:L9852",
    "summary": "Pacto ligado ao papel do augúrio na alcateia."
  },
  {
    "id": "ragabash-gremlins",
    "name": "Gremlins",
    "english": "Gremlins",
    "origin": "auspice",
    "owner": "ragabash",
    "totalRenown": 2,
    "reference": "docs/Werewolf5ed:L9873",
    "summary": "Pacto ligado ao papel do augúrio na alcateia."
  },
  {
    "id": "ragabash-spiders-song",
    "name": "Canção da Aranha",
    "english": "Spider’S Song",
    "origin": "auspice",
    "owner": "ragabash",
    "totalRenown": 2,
    "reference": "docs/Werewolf5ed:L9897",
    "summary": "Pacto ligado ao papel do augúrio na alcateia."
  },
  {
    "id": "theurge-ensnare-spirit",
    "name": "Aprisionar Espírito",
    "english": "Ensnare Spirit",
    "origin": "auspice",
    "owner": "theurge",
    "totalRenown": 2,
    "reference": "docs/Werewolf5ed:L10092",
    "summary": "Pacto ligado ao papel do augúrio na alcateia."
  },
  {
    "id": "theurge-mothers-touch",
    "name": "Toque da Mãe",
    "english": "Mother’S Touch",
    "origin": "auspice",
    "owner": "theurge",
    "totalRenown": 2,
    "reference": "docs/Werewolf5ed:L10114",
    "summary": "Pacto ligado ao papel do augúrio na alcateia."
  },
  {
    "id": "theurge-shadow-sense",
    "name": "Sentido das Sombras",
    "english": "Shadow Sense",
    "origin": "auspice",
    "owner": "theurge",
    "totalRenown": 2,
    "reference": "docs/Werewolf5ed:L10129",
    "summary": "Pacto ligado ao papel do augúrio na alcateia."
  },
  {
    "id": "theurge-sight-from-beyond",
    "name": "Visão do Além",
    "english": "Sight From Beyond",
    "origin": "auspice",
    "owner": "theurge",
    "totalRenown": 2,
    "reference": "docs/Werewolf5ed:L10148",
    "summary": "Pacto ligado ao papel do augúrio na alcateia."
  },
  {
    "id": "philodox-ancestral-conviction",
    "name": "Convicção Ancestral",
    "english": "Ancestral Conviction",
    "origin": "auspice",
    "owner": "philodox",
    "totalRenown": 2,
    "reference": "docs/Werewolf5ed:L10349",
    "summary": "Pacto ligado ao papel do augúrio na alcateia."
  },
  {
    "id": "philodox-gaias-candor",
    "name": "Franqueza de Gaia",
    "english": "Gaia’S Candor",
    "origin": "auspice",
    "owner": "philodox",
    "totalRenown": 2,
    "reference": "docs/Werewolf5ed:L10362",
    "summary": "Pacto ligado ao papel do augúrio na alcateia."
  },
  {
    "id": "philodox-porcupines-reprisal",
    "name": "Retaliação do Porco-Espinho",
    "english": "Porcupine’S Reprisal",
    "origin": "auspice",
    "owner": "philodox",
    "totalRenown": 2,
    "reference": "docs/Werewolf5ed:L10380",
    "summary": "Pacto ligado ao papel do augúrio na alcateia."
  },
  {
    "id": "philodox-sense-the-true-form",
    "name": "Sentir a Forma Verdadeira",
    "english": "Sense The True Form",
    "origin": "auspice",
    "owner": "philodox",
    "totalRenown": 2,
    "reference": "docs/Werewolf5ed:L10394",
    "summary": "Pacto ligado ao papel do augúrio na alcateia."
  },
  {
    "id": "galliard-animal-magnetism",
    "name": "Magnetismo Animal",
    "english": "Animal Magnetism",
    "origin": "auspice",
    "owner": "galliard",
    "totalRenown": 2,
    "reference": "docs/Werewolf5ed:L10599",
    "summary": "Pacto ligado ao papel do augúrio na alcateia."
  },
  {
    "id": "ahroun-halt-the-cowards-flight",
    "name": "Deter a Fuga do Covarde",
    "english": "Halt The Coward’S Flight",
    "origin": "auspice",
    "owner": "ahroun",
    "totalRenown": 2,
    "reference": "docs/Werewolf5ed:L10819",
    "summary": "Pacto ligado ao papel do augúrio na alcateia."
  },
  {
    "id": "ahroun-rapid-shift",
    "name": "Transformação Rápida",
    "english": "Rapid Shift",
    "origin": "auspice",
    "owner": "ahroun",
    "totalRenown": 2,
    "reference": "docs/Werewolf5ed:L10839",
    "summary": "Pacto ligado ao papel do augúrio na alcateia."
  },
  {
    "id": "ahroun-razor-claws",
    "name": "Garras Afiadas",
    "english": "Razor Claws",
    "origin": "auspice",
    "owner": "ahroun",
    "totalRenown": 2,
    "reference": "docs/Werewolf5ed:L10857",
    "summary": "Pacto ligado ao papel do augúrio na alcateia."
  },
  {
    "id": "ahroun-sense-danger",
    "name": "Sentir o Perigo",
    "english": "Sense Danger",
    "origin": "auspice",
    "owner": "ahroun",
    "totalRenown": 2,
    "reference": "docs/Werewolf5ed:L10872",
    "summary": "Pacto ligado ao papel do augúrio na alcateia."
  },
  {
    "id": "blackfuries-curse-of-aeolus",
    "name": "Maldição de Éolo",
    "english": "Curse Of Aeolus",
    "origin": "tribe",
    "owner": "blackfuries",
    "totalRenown": 3,
    "reference": "docs/Werewolf5ed:L11032",
    "summary": "Pacto ligado aos valores e ao patrono da tribo."
  },
  {
    "id": "bonegnawers-odious-aroma",
    "name": "Odor Repulsivo",
    "english": "Odious Aroma",
    "origin": "tribe",
    "owner": "bonegnawers",
    "totalRenown": 3,
    "reference": "docs/Werewolf5ed:L11138",
    "summary": "Pacto ligado aos valores e ao patrono da tribo."
  },
  {
    "id": "childrenofgaia-brothers-scent",
    "name": "Cheiro do Irmão",
    "english": "Brother’S Scent",
    "origin": "tribe",
    "owner": "childrenofgaia",
    "totalRenown": 3,
    "reference": "docs/Werewolf5ed:L11242",
    "summary": "Pacto ligado aos valores e ao patrono da tribo."
  },
  {
    "id": "galestalkers-camouflage",
    "name": "Camuflagem",
    "english": "Camouflage",
    "origin": "tribe",
    "owner": "galestalkers",
    "totalRenown": 3,
    "reference": "docs/Werewolf5ed:L11354",
    "summary": "Pacto ligado aos valores e ao patrono da tribo."
  },
  {
    "id": "galestalkers-lacerating-wind",
    "name": "Vento Lacerante",
    "english": "Lacerating Wind",
    "origin": "tribe",
    "owner": "galestalkers",
    "totalRenown": 3,
    "reference": "docs/Werewolf5ed:L11373",
    "summary": "Pacto ligado aos valores e ao patrono da tribo."
  },
  {
    "id": "ghostcouncil-augur",
    "name": "Augúrio",
    "english": "Augur",
    "origin": "tribe",
    "owner": "ghostcouncil",
    "totalRenown": 3,
    "reference": "docs/Werewolf5ed:L11458",
    "summary": "Pacto ligado aos valores e ao patrono da tribo."
  },
  {
    "id": "ghostcouncil-blackout",
    "name": "Apagão",
    "english": "Blackout",
    "origin": "tribe",
    "owner": "ghostcouncil",
    "totalRenown": 3,
    "reference": "docs/Werewolf5ed:L11480",
    "summary": "Pacto ligado aos valores e ao patrono da tribo."
  },
  {
    "id": "andarilhosdoasfalto-skinbind",
    "name": "Vínculo da Pele",
    "english": "Skinbind",
    "origin": "tribe",
    "owner": "andarilhosdoasfalto",
    "totalRenown": 3,
    "reference": "docs/Werewolf5ed:L11567",
    "summary": "Pacto ligado aos valores e ao patrono da tribo."
  },
  {
    "id": "hartwardens-sacred-boundary",
    "name": "Fronteira Sagrada",
    "english": "Sacred Boundary",
    "origin": "tribe",
    "owner": "hartwardens",
    "totalRenown": 3,
    "reference": "docs/Werewolf5ed:L11692",
    "summary": "Pacto ligado aos valores e ao patrono da tribo."
  },
  {
    "id": "hartwardens-blessed-brew",
    "name": "Bebida Abençoada",
    "english": "Blessed Brew",
    "origin": "tribe",
    "owner": "hartwardens",
    "totalRenown": 3,
    "reference": "docs/Werewolf5ed:L11718",
    "summary": "Pacto ligado aos valores e ao patrono da tribo."
  },
  {
    "id": "redtalons-hidden-killer",
    "name": "Assassino Oculto",
    "english": "Hidden Killer",
    "origin": "tribe",
    "owner": "redtalons",
    "totalRenown": 3,
    "reference": "docs/Werewolf5ed:L11812",
    "summary": "Pacto ligado aos valores e ao patrono da tribo."
  },
  {
    "id": "redtalons-render-down",
    "name": "Decompor",
    "english": "Render Down",
    "origin": "tribe",
    "owner": "redtalons",
    "totalRenown": 3,
    "reference": "docs/Werewolf5ed:L11835",
    "summary": "Pacto ligado aos valores e ao patrono da tribo."
  },
  {
    "id": "shadowlords-fatal-flaw",
    "name": "Falha Fatal",
    "english": "Fatal Flaw",
    "origin": "tribe",
    "owner": "shadowlords",
    "totalRenown": 3,
    "reference": "docs/Werewolf5ed:L11933",
    "summary": "Pacto ligado aos valores e ao patrono da tribo."
  },
  {
    "id": "shadowlords-icy-chill-of-despair",
    "name": "Frio Gélido do Desespero",
    "english": "Icy Chill Of Despair",
    "origin": "tribe",
    "owner": "shadowlords",
    "totalRenown": 3,
    "reference": "docs/Werewolf5ed:L11957",
    "summary": "Pacto ligado aos valores e ao patrono da tribo."
  },
  {
    "id": "silentstriders-fetch-bounty",
    "name": "Buscar a Presa",
    "english": "Fetch Bounty",
    "origin": "tribe",
    "owner": "silentstriders",
    "totalRenown": 3,
    "reference": "docs/Werewolf5ed:L12039",
    "summary": "Pacto ligado aos valores e ao patrono da tribo."
  },
  {
    "id": "silentstriders-speech-of-the-world",
    "name": "Fala do Mundo",
    "english": "Speech Of The World",
    "origin": "tribe",
    "owner": "silentstriders",
    "totalRenown": 3,
    "reference": "docs/Werewolf5ed:L12067",
    "summary": "Pacto ligado aos valores e ao patrono da tribo."
  },
  {
    "id": "silentstriders-whispered-passage",
    "name": "Passagem Sussurrada",
    "english": "Whispered Passage",
    "origin": "tribe",
    "owner": "silentstriders",
    "totalRenown": 3,
    "reference": "docs/Werewolf5ed:L12089",
    "summary": "Pacto ligado aos valores e ao patrono da tribo."
  },
  {
    "id": "silverfangs-pack-instinct",
    "name": "Instinto de Alcateia",
    "english": "Pack Instinct",
    "origin": "tribe",
    "owner": "silverfangs",
    "totalRenown": 3,
    "reference": "docs/Werewolf5ed:L12159",
    "summary": "Pacto ligado aos valores e ao patrono da tribo."
  },
  {
    "id": "silverfangs-the-silver-compact",
    "name": "O Pacto de Prata",
    "english": "The Silver Compact",
    "origin": "tribe",
    "owner": "silverfangs",
    "totalRenown": 3,
    "reference": "docs/Werewolf5ed:L12179",
    "summary": "Pacto ligado aos valores e ao patrono da tribo."
  },
  {
    "id": "galliard-howl-of-assembly",
    "name": "Uivo de Reunião",
    "english": "Howl Of Assembly",
    "origin": "auspice",
    "owner": "galliard",
    "totalRenown": 2,
    "reference": "docs/Werewolf5ed:L10657",
    "summary": "Dom com acesso pelo augúrio."
  },
  {
    "id": "galliard-song-of-rage",
    "name": "Canção da Fúria",
    "english": "Song Of Rage",
    "origin": "auspice",
    "owner": "galliard",
    "totalRenown": 2,
    "reference": "docs/Werewolf5ed:L10675",
    "summary": "Dom com acesso pelo augúrio."
  },
  {
    "id": "galliard-song-of-serenity",
    "name": "Canção da Serenidade",
    "english": "Song Of Serenity",
    "origin": "auspice",
    "owner": "galliard",
    "totalRenown": 2,
    "reference": "docs/Werewolf5ed:L10688",
    "summary": "Dom com acesso pelo augúrio."
  },
  {
    "id": "blackfuries-halt-the-cowards-flight",
    "name": "Deter a Fuga do Covarde",
    "english": "Halt The Coward’S Flight",
    "origin": "tribe",
    "owner": "blackfuries",
    "totalRenown": 3,
    "reference": "docs/Werewolf5ed:L11047",
    "summary": "Acesso tribal ao mesmo pacto espiritual descrito na seção de augúrio."
  },
  {
    "id": "blackfuries-porcupines-reprisal",
    "name": "Retaliação do Porco-Espinho",
    "english": "Porcupine’S Reprisal",
    "origin": "tribe",
    "owner": "blackfuries",
    "totalRenown": 3,
    "reference": "docs/Werewolf5ed:L11048",
    "summary": "Acesso tribal ao mesmo pacto espiritual descrito na seção de augúrio."
  },
  {
    "id": "bonegnawers-blissful-ignorance",
    "name": "Ignorância Abençoada",
    "english": "Blissful Ignorance",
    "origin": "tribe",
    "owner": "bonegnawers",
    "totalRenown": 3,
    "reference": "docs/Werewolf5ed:L11135",
    "summary": "Acesso tribal ao mesmo pacto espiritual descrito na seção de augúrio."
  },
  {
    "id": "bonegnawers-rapid-shift",
    "name": "Transformação Rápida",
    "english": "Rapid Shift",
    "origin": "tribe",
    "owner": "bonegnawers",
    "totalRenown": 3,
    "reference": "docs/Werewolf5ed:L11136",
    "summary": "Acesso tribal ao mesmo pacto espiritual descrito na seção de augúrio."
  },
  {
    "id": "bonegnawers-sight-from-beyond",
    "name": "Visão do Além",
    "english": "Sight From Beyond",
    "origin": "tribe",
    "owner": "bonegnawers",
    "totalRenown": 3,
    "reference": "docs/Werewolf5ed:L11137",
    "summary": "Acesso tribal ao mesmo pacto espiritual descrito na seção de augúrio."
  },
  {
    "id": "childrenofgaia-mothers-touch",
    "name": "Toque da Mãe",
    "english": "Mother’S Touch",
    "origin": "tribe",
    "owner": "childrenofgaia",
    "totalRenown": 3,
    "reference": "docs/Werewolf5ed:L11269",
    "summary": "Acesso tribal ao mesmo pacto espiritual descrito na seção de augúrio."
  },
  {
    "id": "childrenofgaia-sense-the-true-form",
    "name": "Sentir a Forma Verdadeira",
    "english": "Sense The True Form",
    "origin": "tribe",
    "owner": "childrenofgaia",
    "totalRenown": 3,
    "reference": "docs/Werewolf5ed:L11270",
    "summary": "Acesso tribal ao mesmo pacto espiritual descrito na seção de augúrio."
  },
  {
    "id": "childrenofgaia-song-of-serenity",
    "name": "Canção da Serenidade",
    "english": "Song Of Serenity",
    "origin": "tribe",
    "owner": "childrenofgaia",
    "totalRenown": 3,
    "reference": "docs/Werewolf5ed:L11271",
    "summary": "Acesso tribal ao mesmo pacto espiritual descrito na seção de augúrio."
  },
  {
    "id": "galestalkers-ensnare-spirit",
    "name": "Aprisionar Espírito",
    "english": "Ensnare Spirit",
    "origin": "tribe",
    "owner": "galestalkers",
    "totalRenown": 3,
    "reference": "docs/Werewolf5ed:L11370",
    "summary": "Acesso tribal ao mesmo pacto espiritual descrito na seção de augúrio."
  },
  {
    "id": "ghostcouncil-sense-danger",
    "name": "Sentir o Perigo",
    "english": "Sense Danger",
    "origin": "tribe",
    "owner": "ghostcouncil",
    "totalRenown": 3,
    "reference": "docs/Werewolf5ed:L11479",
    "summary": "Acesso tribal ao mesmo pacto espiritual descrito na seção de augúrio."
  },
  {
    "id": "andarilhosdoasfalto-animal-magnetism",
    "name": "Magnetismo Animal",
    "english": "Animal Magnetism",
    "origin": "tribe",
    "owner": "andarilhosdoasfalto",
    "totalRenown": 3,
    "reference": "docs/Werewolf5ed:L11565",
    "summary": "Acesso tribal ao mesmo pacto espiritual descrito na seção de augúrio."
  },
  {
    "id": "andarilhosdoasfalto-gaias-candor",
    "name": "Franqueza de Gaia",
    "english": "Gaia’S Candor",
    "origin": "tribe",
    "owner": "andarilhosdoasfalto",
    "totalRenown": 3,
    "reference": "docs/Werewolf5ed:L11566",
    "summary": "Acesso tribal ao mesmo pacto espiritual descrito na seção de augúrio."
  },
  {
    "id": "andarilhosdoasfalto-spiders-song",
    "name": "Canção da Aranha",
    "english": "Spider’S Song",
    "origin": "tribe",
    "owner": "andarilhosdoasfalto",
    "totalRenown": 3,
    "reference": "docs/Werewolf5ed:L11589",
    "summary": "Acesso tribal ao mesmo pacto espiritual descrito na seção de augúrio."
  },
  {
    "id": "hartwardens-crows-laughter",
    "name": "Riso do Corvo",
    "english": "Crow’S Laughter",
    "origin": "tribe",
    "owner": "hartwardens",
    "totalRenown": 3,
    "reference": "docs/Werewolf5ed:L11691",
    "summary": "Acesso tribal ao mesmo pacto espiritual descrito na seção de augúrio."
  },
  {
    "id": "redtalons-razor-claws",
    "name": "Garras Afiadas",
    "english": "Razor Claws",
    "origin": "tribe",
    "owner": "redtalons",
    "totalRenown": 3,
    "reference": "docs/Werewolf5ed:L11834",
    "summary": "Acesso tribal ao mesmo pacto espiritual descrito na seção de augúrio."
  },
  {
    "id": "redtalons-song-of-rage",
    "name": "Canção da Fúria",
    "english": "Song Of Rage",
    "origin": "tribe",
    "owner": "redtalons",
    "totalRenown": 3,
    "reference": "docs/Werewolf5ed:L11861",
    "summary": "Acesso tribal ao mesmo pacto espiritual descrito na seção de augúrio."
  },
  {
    "id": "shadowlords-shadow-sense",
    "name": "Sentido das Sombras",
    "english": "Shadow Sense",
    "origin": "tribe",
    "owner": "shadowlords",
    "totalRenown": 3,
    "reference": "docs/Werewolf5ed:L11973",
    "summary": "Acesso tribal ao mesmo pacto espiritual descrito na seção de augúrio."
  },
  {
    "id": "silverfangs-howl-of-assembly",
    "name": "Uivo de Reunião",
    "english": "Howl Of Assembly",
    "origin": "tribe",
    "owner": "silverfangs",
    "totalRenown": 3,
    "reference": "docs/Werewolf5ed:L12158",
    "summary": "Acesso tribal ao mesmo pacto espiritual descrito na seção de augúrio."
  }
];
export const W5_RITES = [
  {
    "id": "w5-rite-abjuration",
    "name": "Rito de Abjuração",
    "description": "Rite of Abjuration — W5, docs/Werewolf5ed:L12322. Conferir condições, parada e efeitos no livro."
  },
  {
    "id": "w5-rite-rage",
    "name": "Rito de Fúria",
    "description": "Rite of Rage — W5, docs/Werewolf5ed:L12347. Conferir condições, parada e efeitos no livro."
  },
  {
    "id": "w5-rite-tranquility",
    "name": "Rito de Tranquilidade",
    "description": "Rite of Tranquility — W5, docs/Werewolf5ed:L12367. Conferir condições, parada e efeitos no livro."
  },
  {
    "id": "w5-rite-contrition",
    "name": "Rito de Contrição",
    "description": "Rite of Contrition — W5, docs/Werewolf5ed:L12383. Conferir condições, parada e efeitos no livro."
  },
  {
    "id": "w5-rite-the-forgetful-record",
    "name": "Rito de Registro Esquecido",
    "description": "Rite of the Forgetful Record — W5, docs/Werewolf5ed:L12406. Conferir condições, parada e efeitos no livro."
  },
  {
    "id": "w5-rite-the-living-caern",
    "name": "Rito de Caern Vivo",
    "description": "Rite of the Living Caern — W5, docs/Werewolf5ed:L12431. Conferir condições, parada e efeitos no livro."
  },
  {
    "id": "w5-rite-shadow-passage",
    "name": "Rito de Passagem das Sombras",
    "description": "Rite of Shadow Passage — W5, docs/Werewolf5ed:L12454. Conferir condições, parada e efeitos no livro."
  },
  {
    "id": "w5-rite-dedication",
    "name": "Rito de Dedicação",
    "description": "Rite of Dedication — W5, docs/Werewolf5ed:L12478. Conferir condições, parada e efeitos no livro."
  },
  {
    "id": "w5-rite-kinseeking",
    "name": "Rito de Busca de Parentes",
    "description": "Rite of Kinseeking — W5, docs/Werewolf5ed:L12508. Conferir condições, parada e efeitos no livro."
  },
  {
    "id": "w5-rite-spirit-summoning",
    "name": "Rito de Invocação de Espíritos",
    "description": "Rite of Spirit Summoning — W5, docs/Werewolf5ed:L12529. Conferir condições, parada e efeitos no livro."
  },
  {
    "id": "w5-rite-binding",
    "name": "Rito de Aprisionamento",
    "description": "Rite of Binding — W5, docs/Werewolf5ed:L12556. Conferir condições, parada e efeitos no livro."
  },
  {
    "id": "w5-rite-shame",
    "name": "Rito de Vergonha",
    "description": "Rite of Shame — W5, docs/Werewolf5ed:L12582. Conferir condições, parada e efeitos no livro."
  },
  {
    "id": "w5-rite-patronage",
    "name": "Rito de Patronato",
    "description": "Rite of Patronage — W5, docs/Werewolf5ed:L12606. Conferir condições, parada e efeitos no livro."
  },
  {
    "id": "w5-rite-celebration",
    "name": "Rito de Celebração",
    "description": "Rite of Celebration — W5, docs/Werewolf5ed:L12643. Conferir condições, parada e efeitos no livro."
  },
  {
    "id": "w5-rite-caern-building",
    "name": "Rito de Construção de Caern",
    "description": "Rite of Caern Building — W5, docs/Werewolf5ed:L12666. Conferir condições, parada e efeitos no livro."
  },
  {
    "id": "w5-rite-the-wolf-reborn",
    "name": "Rito de Lobo Renascido",
    "description": "Rite of the Wolf Reborn — W5, docs/Werewolf5ed:L12701. Conferir condições, parada e efeitos no livro."
  },
  {
    "id": "w5-rite-the-whispering-field",
    "name": "Rito de Campo Sussurrante",
    "description": "Rite of the Whispering Field — W5, docs/Werewolf5ed:L12718. Conferir condições, parada e efeitos no livro."
  },
  {
    "id": "w5-rite-the-shrouded-glen",
    "name": "Rito de Clareira Oculta",
    "description": "Rite of the Shrouded Glen — W5, docs/Werewolf5ed:L12740. Conferir condições, parada e efeitos no livro."
  },
  {
    "id": "w5-rite-passage",
    "name": "Rito de Passagem",
    "description": "Rite of Passage — W5, docs/Werewolf5ed:L12768. Conferir condições, parada e efeitos no livro."
  },
  {
    "id": "w5-rite-accomplishment",
    "name": "Rito de Realização",
    "description": "Rite of Accomplishment — W5, docs/Werewolf5ed:L12792. Conferir condições, parada e efeitos no livro."
  },
  {
    "id": "w5-rite-the-winter-wolf",
    "name": "Rito de Lobo do Inverno",
    "description": "Rite of the Winter Wolf — W5, docs/Werewolf5ed:L12818. Conferir condições, parada e efeitos no livro."
  }
];
