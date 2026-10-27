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
    "english": "Hare’s Leap",
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
    "id": "native-sharpened-senses",
    "name": "Sharpened Senses",
    "english": "Sharpened Senses",
    "origin": "native",
    "owner": "native",
    "totalRenown": 4,
    "reference": "docs/Werewolf5ed:L9711",
    "summary": "Dom de native; requer Renome total 4. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "native-spirit-of-the-fray",
    "name": "Spirit Of The Fray",
    "english": "Spirit Of The Fray",
    "origin": "native",
    "owner": "native",
    "totalRenown": 4,
    "reference": "docs/Werewolf5ed:L9727",
    "summary": "Dom de native; requer Renome total 4. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "native-thwarting-the-arrow",
    "name": "Thwarting The Arrow",
    "english": "Thwarting The Arrow",
    "origin": "native",
    "owner": "native",
    "totalRenown": 4,
    "reference": "docs/Werewolf5ed:L9742",
    "summary": "Dom de native; requer Renome total 4. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "native-body-shift",
    "name": "Body Shift",
    "english": "Body Shift",
    "origin": "native",
    "owner": "native",
    "totalRenown": 7,
    "reference": "docs/Werewolf5ed:L9757",
    "summary": "Dom de native; requer Renome total 7. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "native-jam-technology",
    "name": "Jam Technology",
    "english": "Jam Technology",
    "origin": "native",
    "owner": "native",
    "totalRenown": 7,
    "reference": "docs/Werewolf5ed:L9776",
    "summary": "Dom de native; requer Renome total 7. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "native-tongue-of-the-beasts",
    "name": "Tongue Of The Beasts",
    "english": "Tongue Of The Beasts",
    "origin": "native",
    "owner": "native",
    "totalRenown": 7,
    "reference": "docs/Werewolf5ed:L9810",
    "summary": "Dom de native; requer Renome total 7. Consulte custo, parada, duração e efeito na referência."
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
    "english": "Crow’s Laughter",
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
    "english": "Spider’s Song",
    "origin": "auspice",
    "owner": "ragabash",
    "totalRenown": 2,
    "reference": "docs/Werewolf5ed:L9897",
    "summary": "Pacto ligado ao papel do augúrio na alcateia."
  },
  {
    "id": "ragabash-blur-of-the-milky-eye",
    "name": "Blur Of The Milky Eye",
    "english": "Blur Of The Milky Eye",
    "origin": "auspice",
    "owner": "ragabash",
    "totalRenown": 5,
    "reference": "docs/Werewolf5ed:L9923",
    "summary": "Dom de ragabash; requer Renome total 5. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "ragabash-open-seal",
    "name": "Open Seal",
    "english": "Open Seal",
    "origin": "auspice",
    "owner": "ragabash",
    "totalRenown": 5,
    "reference": "docs/Werewolf5ed:L9940",
    "summary": "Dom de ragabash; requer Renome total 5. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "ragabash-pulse-of-the-prey",
    "name": "Pulse Of The Prey",
    "english": "Pulse Of The Prey",
    "origin": "auspice",
    "owner": "ragabash",
    "totalRenown": 5,
    "reference": "docs/Werewolf5ed:L9958",
    "summary": "Dom de ragabash; requer Renome total 5. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "ragabash-scent-of-running-water",
    "name": "Scent Of Running Water",
    "english": "Scent Of Running Water",
    "origin": "auspice",
    "owner": "ragabash",
    "totalRenown": 5,
    "reference": "docs/Werewolf5ed:L9981",
    "summary": "Dom de ragabash; requer Renome total 5. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "ragabash-lunas-blessing",
    "name": "Luna’s Blessing",
    "english": "Luna’s Blessing",
    "origin": "auspice",
    "owner": "ragabash",
    "totalRenown": 8,
    "reference": "docs/Werewolf5ed:L9999",
    "summary": "Dom de ragabash; requer Renome total 8. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "ragabash-thieving-talons-of-the-magpie",
    "name": "Thieving Talons Of The Magpie",
    "english": "Thieving Talons Of The Magpie",
    "origin": "auspice",
    "owner": "ragabash",
    "totalRenown": 8,
    "reference": "docs/Werewolf5ed:L10015",
    "summary": "Dom de ragabash; requer Renome total 8. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "ragabash-the-thousand-forms",
    "name": "The Thousand Forms",
    "english": "The Thousand Forms",
    "origin": "auspice",
    "owner": "ragabash",
    "totalRenown": 8,
    "reference": "docs/Werewolf5ed:L10043",
    "summary": "Dom de ragabash; requer Renome total 8. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "ragabash-whelp-body",
    "name": "Whelp Body",
    "english": "Whelp Body",
    "origin": "auspice",
    "owner": "ragabash",
    "totalRenown": 8,
    "reference": "docs/Werewolf5ed:L10065",
    "summary": "Dom de ragabash; requer Renome total 8. Consulte custo, parada, duração e efeito na referência."
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
    "english": "Mother’s Touch",
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
    "id": "theurge-banish-spirit",
    "name": "Banish Spirit",
    "english": "Banish Spirit",
    "origin": "auspice",
    "owner": "theurge",
    "totalRenown": 5,
    "reference": "docs/Werewolf5ed:L10172",
    "summary": "Dom de theurge; requer Renome total 5. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "theurge-grasp-from-beyond",
    "name": "Grasp From Beyond",
    "english": "Grasp From Beyond",
    "origin": "auspice",
    "owner": "theurge",
    "totalRenown": 5,
    "reference": "docs/Werewolf5ed:L10194",
    "summary": "Dom de theurge; requer Renome total 5. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "theurge-mindspeak",
    "name": "Mindspeak",
    "english": "Mindspeak",
    "origin": "auspice",
    "owner": "theurge",
    "totalRenown": 5,
    "reference": "docs/Werewolf5ed:L10214",
    "summary": "Dom de theurge; requer Renome total 5. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "theurge-umbral-tether",
    "name": "Umbral Tether",
    "english": "Umbral Tether",
    "origin": "auspice",
    "owner": "theurge",
    "totalRenown": 5,
    "reference": "docs/Werewolf5ed:L10238",
    "summary": "Dom de theurge; requer Renome total 5. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "theurge-command-spirit",
    "name": "Command Spirit",
    "english": "Command Spirit",
    "origin": "auspice",
    "owner": "theurge",
    "totalRenown": 8,
    "reference": "docs/Werewolf5ed:L10261",
    "summary": "Dom de theurge; requer Renome total 8. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "theurge-drain-spirit",
    "name": "Drain Spirit",
    "english": "Drain Spirit",
    "origin": "auspice",
    "owner": "theurge",
    "totalRenown": 8,
    "reference": "docs/Werewolf5ed:L10284",
    "summary": "Dom de theurge; requer Renome total 8. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "theurge-feral-regression",
    "name": "Feral Regression",
    "english": "Feral Regression",
    "origin": "auspice",
    "owner": "theurge",
    "totalRenown": 8,
    "reference": "docs/Werewolf5ed:L10307",
    "summary": "Dom de theurge; requer Renome total 8. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "theurge-living-ward",
    "name": "Living Ward",
    "english": "Living Ward",
    "origin": "auspice",
    "owner": "theurge",
    "totalRenown": 8,
    "reference": "docs/Werewolf5ed:L10328",
    "summary": "Dom de theurge; requer Renome total 8. Consulte custo, parada, duração e efeito na referência."
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
    "english": "Gaia’s Candor",
    "origin": "auspice",
    "owner": "philodox",
    "totalRenown": 2,
    "reference": "docs/Werewolf5ed:L10362",
    "summary": "Pacto ligado ao papel do augúrio na alcateia."
  },
  {
    "id": "philodox-porcupines-reprisal",
    "name": "Retaliação do Porco-Espinho",
    "english": "Porcupine’s Reprisal",
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
    "id": "philodox-beasts-fealty",
    "name": "Beast’s Fealty",
    "english": "Beast’s Fealty",
    "origin": "auspice",
    "owner": "philodox",
    "totalRenown": 5,
    "reference": "docs/Werewolf5ed:L10416",
    "summary": "Dom de philodox; requer Renome total 5. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "philodox-command-the-gathering",
    "name": "Command The Gathering",
    "english": "Command The Gathering",
    "origin": "auspice",
    "owner": "philodox",
    "totalRenown": 5,
    "reference": "docs/Werewolf5ed:L10434",
    "summary": "Dom de philodox; requer Renome total 5. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "philodox-fangs-of-judgment",
    "name": "Fangs Of Judgment",
    "english": "Fangs Of Judgment",
    "origin": "auspice",
    "owner": "philodox",
    "totalRenown": 5,
    "reference": "docs/Werewolf5ed:L10459",
    "summary": "Dom de philodox; requer Renome total 5. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "philodox-scent-of-the-past",
    "name": "Scent Of The Past",
    "english": "Scent Of The Past",
    "origin": "auspice",
    "owner": "philodox",
    "totalRenown": 5,
    "reference": "docs/Werewolf5ed:L10481",
    "summary": "Dom de philodox; requer Renome total 5. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "philodox-geas",
    "name": "Geas",
    "english": "Geas",
    "origin": "auspice",
    "owner": "philodox",
    "totalRenown": 8,
    "reference": "docs/Werewolf5ed:L10504",
    "summary": "Dom de philodox; requer Renome total 8. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "philodox-oathbreakers-bane",
    "name": "Oathbreaker’s Bane",
    "english": "Oathbreaker’s Bane",
    "origin": "auspice",
    "owner": "philodox",
    "totalRenown": 8,
    "reference": "docs/Werewolf5ed:L10530",
    "summary": "Dom de philodox; requer Renome total 8. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "philodox-strength-of-purpose",
    "name": "Strength Of Purpose",
    "english": "Strength Of Purpose",
    "origin": "auspice",
    "owner": "philodox",
    "totalRenown": 8,
    "reference": "docs/Werewolf5ed:L10551",
    "summary": "Dom de philodox; requer Renome total 8. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "philodox-take-the-true-form",
    "name": "Take The True Form",
    "english": "Take The True Form",
    "origin": "auspice",
    "owner": "philodox",
    "totalRenown": 8,
    "reference": "docs/Werewolf5ed:L10567",
    "summary": "Dom de philodox; requer Renome total 8. Consulte custo, parada, duração e efeito na referência."
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
    "id": "galliard-call-the-ridden",
    "name": "Call The Ridden",
    "english": "Call The Ridden",
    "origin": "auspice",
    "owner": "galliard",
    "totalRenown": 5,
    "reference": "docs/Werewolf5ed:L10621",
    "summary": "Dom de galliard; requer Renome total 5. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "galliard-eyes-of-the-cobra",
    "name": "Eyes Of The Cobra",
    "english": "Eyes Of The Cobra",
    "origin": "auspice",
    "owner": "galliard",
    "totalRenown": 5,
    "reference": "docs/Werewolf5ed:L10637",
    "summary": "Dom de galliard; requer Renome total 5. Consulte custo, parada, duração e efeito na referência."
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
    "id": "galliard-song-of-valor",
    "name": "Song Of Valor",
    "english": "Song Of Valor",
    "origin": "auspice",
    "owner": "galliard",
    "totalRenown": 5,
    "reference": "docs/Werewolf5ed:L10703",
    "summary": "Dom de galliard; requer Renome total 5. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "galliard-song-of-inspiration",
    "name": "Song Of Inspiration",
    "english": "Song Of Inspiration",
    "origin": "auspice",
    "owner": "galliard",
    "totalRenown": 5,
    "reference": "docs/Werewolf5ed:L10719",
    "summary": "Dom de galliard; requer Renome total 5. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "galliard-against-the-odds",
    "name": "Against The Odds",
    "english": "Against The Odds",
    "origin": "auspice",
    "owner": "galliard",
    "totalRenown": 8,
    "reference": "docs/Werewolf5ed:L10736",
    "summary": "Dom de galliard; requer Renome total 8. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "galliard-break-the-shackles",
    "name": "Break The Shackles",
    "english": "Break The Shackles",
    "origin": "auspice",
    "owner": "galliard",
    "totalRenown": 8,
    "reference": "docs/Werewolf5ed:L10751",
    "summary": "Dom de galliard; requer Renome total 8. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "galliard-defy-death",
    "name": "Defy Death",
    "english": "Defy Death",
    "origin": "auspice",
    "owner": "galliard",
    "totalRenown": 8,
    "reference": "docs/Werewolf5ed:L10768",
    "summary": "Dom de galliard; requer Renome total 8. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "galliard-dreamwalk",
    "name": "Dreamwalk",
    "english": "Dreamwalk",
    "origin": "auspice",
    "owner": "galliard",
    "totalRenown": 8,
    "reference": "docs/Werewolf5ed:L10785",
    "summary": "Dom de galliard; requer Renome total 8. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "ahroun-halt-the-cowards-flight",
    "name": "Deter a Fuga do Covarde",
    "english": "Halt The Coward’s Flight",
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
    "id": "ahroun-primal-anger",
    "name": "Primal Anger",
    "english": "Primal Anger",
    "origin": "auspice",
    "owner": "ahroun",
    "totalRenown": 5,
    "reference": "docs/Werewolf5ed:L10888",
    "summary": "Dom de ahroun; requer Renome total 5. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "ahroun-snarl-of-challenge",
    "name": "Snarl Of Challenge",
    "english": "Snarl Of Challenge",
    "origin": "auspice",
    "owner": "ahroun",
    "totalRenown": 5,
    "reference": "docs/Werewolf5ed:L10903",
    "summary": "Dom de ahroun; requer Renome total 5. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "ahroun-true-fear",
    "name": "True Fear",
    "english": "True Fear",
    "origin": "auspice",
    "owner": "ahroun",
    "totalRenown": 5,
    "reference": "docs/Werewolf5ed:L10921",
    "summary": "Dom de ahroun; requer Renome total 5. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "ahroun-wind-claws",
    "name": "Wind Claws",
    "english": "Wind Claws",
    "origin": "auspice",
    "owner": "ahroun",
    "totalRenown": 5,
    "reference": "docs/Werewolf5ed:L10942",
    "summary": "Dom de ahroun; requer Renome total 5. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "ahroun-closing-the-gap",
    "name": "Closing The Gap",
    "english": "Closing The Gap",
    "origin": "auspice",
    "owner": "ahroun",
    "totalRenown": 8,
    "reference": "docs/Werewolf5ed:L10960",
    "summary": "Dom de ahroun; requer Renome total 8. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "ahroun-kiss-of-helios",
    "name": "Kiss Of Helios",
    "english": "Kiss Of Helios",
    "origin": "auspice",
    "owner": "ahroun",
    "totalRenown": 8,
    "reference": "docs/Werewolf5ed:L10979",
    "summary": "Dom de ahroun; requer Renome total 8. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "ahroun-lunas-armor",
    "name": "Luna’s Armor",
    "english": "Luna’s Armor",
    "origin": "auspice",
    "owner": "ahroun",
    "totalRenown": 8,
    "reference": "docs/Werewolf5ed:L10996",
    "summary": "Dom de ahroun; requer Renome total 8. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "ahroun-silver-claws",
    "name": "Silver Claws",
    "english": "Silver Claws",
    "origin": "auspice",
    "owner": "ahroun",
    "totalRenown": 8,
    "reference": "docs/Werewolf5ed:L11010",
    "summary": "Dom de ahroun; requer Renome total 8. Consulte custo, parada, duração e efeito na referência."
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
    "id": "blackfuries-halt-the-cowards-flight",
    "name": "Deter a Fuga do Covarde",
    "english": "Halt The Coward’s Flight",
    "origin": "tribe",
    "owner": "blackfuries",
    "totalRenown": 3,
    "reference": "docs/Werewolf5ed:L11047",
    "summary": "Acesso tribal ao mesmo pacto espiritual descrito na seção de augúrio."
  },
  {
    "id": "blackfuries-porcupines-reprisal",
    "name": "Retaliação do Porco-Espinho",
    "english": "Porcupine’s Reprisal",
    "origin": "tribe",
    "owner": "blackfuries",
    "totalRenown": 3,
    "reference": "docs/Werewolf5ed:L11048",
    "summary": "Acesso tribal ao mesmo pacto espiritual descrito na seção de augúrio."
  },
  {
    "id": "blackfuries-kalis-scar",
    "name": "Kali’s Scar",
    "english": "Kali’s Scar",
    "origin": "tribe",
    "owner": "blackfuries",
    "totalRenown": 6,
    "reference": "docs/Werewolf5ed:L11065",
    "summary": "Dom de blackfuries; requer Renome total 6. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "blackfuries-wasp-talons",
    "name": "Wasp Talons",
    "english": "Wasp Talons",
    "origin": "tribe",
    "owner": "blackfuries",
    "totalRenown": 6,
    "reference": "docs/Werewolf5ed:L11086",
    "summary": "Dom de blackfuries; requer Renome total 6. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "blackfuries-break-the-shackles",
    "name": "Break The Shackles",
    "english": "Break The Shackles",
    "origin": "tribe",
    "owner": "blackfuries",
    "totalRenown": 9,
    "reference": "docs/Werewolf5ed:L11108",
    "summary": "Dom de blackfuries; requer Renome total 9. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "blackfuries-drain-spirit",
    "name": "Drain Spirit",
    "english": "Drain Spirit",
    "origin": "tribe",
    "owner": "blackfuries",
    "totalRenown": 9,
    "reference": "docs/Werewolf5ed:L11109",
    "summary": "Dom de blackfuries; requer Renome total 9. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "blackfuries-gorgons-visage",
    "name": "Gorgon’s Visage",
    "english": "Gorgon’s Visage",
    "origin": "tribe",
    "owner": "blackfuries",
    "totalRenown": 9,
    "reference": "docs/Werewolf5ed:L11110",
    "summary": "Dom de blackfuries; requer Renome total 9. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "blackfuries-whelp-body",
    "name": "Whelp Body",
    "english": "Whelp Body",
    "origin": "tribe",
    "owner": "blackfuries",
    "totalRenown": 9,
    "reference": "docs/Werewolf5ed:L11132",
    "summary": "Dom de blackfuries; requer Renome total 9. Consulte custo, parada, duração e efeito na referência."
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
    "id": "bonegnawers-face-in-the-crowd",
    "name": "Face In The Crowd",
    "english": "Face In The Crowd",
    "origin": "tribe",
    "owner": "bonegnawers",
    "totalRenown": 6,
    "reference": "docs/Werewolf5ed:L11155",
    "summary": "Dom de bonegnawers; requer Renome total 6. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "bonegnawers-scent-of-the-past",
    "name": "Scent Of The Past",
    "english": "Scent Of The Past",
    "origin": "tribe",
    "owner": "bonegnawers",
    "totalRenown": 6,
    "reference": "docs/Werewolf5ed:L11171",
    "summary": "Dom de bonegnawers; requer Renome total 6. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "bonegnawers-streets-tell-stories",
    "name": "Streets Tell Stories",
    "english": "Streets Tell Stories",
    "origin": "tribe",
    "owner": "bonegnawers",
    "totalRenown": 6,
    "reference": "docs/Werewolf5ed:L11172",
    "summary": "Dom de bonegnawers; requer Renome total 6. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "bonegnawers-a-thousand-eyes",
    "name": "A Thousand Eyes",
    "english": "A Thousand Eyes",
    "origin": "tribe",
    "owner": "bonegnawers",
    "totalRenown": 9,
    "reference": "docs/Werewolf5ed:L11195",
    "summary": "Dom de bonegnawers; requer Renome total 9. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "bonegnawers-between-the-cracks",
    "name": "Between The Cracks",
    "english": "Between The Cracks",
    "origin": "tribe",
    "owner": "bonegnawers",
    "totalRenown": 9,
    "reference": "docs/Werewolf5ed:L11218",
    "summary": "Dom de bonegnawers; requer Renome total 9. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "bonegnawers-defy-death",
    "name": "Defy Death",
    "english": "Defy Death",
    "origin": "tribe",
    "owner": "bonegnawers",
    "totalRenown": 9,
    "reference": "docs/Werewolf5ed:L11239",
    "summary": "Dom de bonegnawers; requer Renome total 9. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "childrenofgaia-brothers-scent",
    "name": "Cheiro do Irmão",
    "english": "Brother’s Scent",
    "origin": "tribe",
    "owner": "childrenofgaia",
    "totalRenown": 3,
    "reference": "docs/Werewolf5ed:L11242",
    "summary": "Pacto ligado aos valores e ao patrono da tribo."
  },
  {
    "id": "childrenofgaia-mothers-touch",
    "name": "Toque da Mãe",
    "english": "Mother’s Touch",
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
    "id": "childrenofgaia-calm-the-furious-beast",
    "name": "Calm The Furious Beast",
    "english": "Calm The Furious Beast",
    "origin": "tribe",
    "owner": "childrenofgaia",
    "totalRenown": 6,
    "reference": "docs/Werewolf5ed:L11273",
    "summary": "Dom de childrenofgaia; requer Renome total 6. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "childrenofgaia-open-seal",
    "name": "Open Seal",
    "english": "Open Seal",
    "origin": "tribe",
    "owner": "childrenofgaia",
    "totalRenown": 6,
    "reference": "docs/Werewolf5ed:L11290",
    "summary": "Dom de childrenofgaia; requer Renome total 6. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "childrenofgaia-reveal-trauma",
    "name": "Reveal Trauma",
    "english": "Reveal Trauma",
    "origin": "tribe",
    "owner": "childrenofgaia",
    "totalRenown": 6,
    "reference": "docs/Werewolf5ed:L11291",
    "summary": "Dom de childrenofgaia; requer Renome total 6. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "childrenofgaia-lunas-armor",
    "name": "Luna’s Armor",
    "english": "Luna’s Armor",
    "origin": "tribe",
    "owner": "childrenofgaia",
    "totalRenown": 9,
    "reference": "docs/Werewolf5ed:L11313",
    "summary": "Dom de childrenofgaia; requer Renome total 9. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "childrenofgaia-lifes-presence",
    "name": "Life’s Presence",
    "english": "Life’s Presence",
    "origin": "tribe",
    "owner": "childrenofgaia",
    "totalRenown": 9,
    "reference": "docs/Werewolf5ed:L11314",
    "summary": "Dom de childrenofgaia; requer Renome total 9. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "childrenofgaia-share-the-pain",
    "name": "Share The Pain",
    "english": "Share The Pain",
    "origin": "tribe",
    "owner": "childrenofgaia",
    "totalRenown": 9,
    "reference": "docs/Werewolf5ed:L11336",
    "summary": "Dom de childrenofgaia; requer Renome total 9. Consulte custo, parada, duração e efeito na referência."
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
    "id": "galestalkers-chill-cloak",
    "name": "Chill Cloak",
    "english": "Chill Cloak",
    "origin": "tribe",
    "owner": "galestalkers",
    "totalRenown": 6,
    "reference": "docs/Werewolf5ed:L11396",
    "summary": "Dom de galestalkers; requer Renome total 6. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "galestalkers-call-the-ridden",
    "name": "Call The Ridden",
    "english": "Call The Ridden",
    "origin": "tribe",
    "owner": "galestalkers",
    "totalRenown": 6,
    "reference": "docs/Werewolf5ed:L11415",
    "summary": "Dom de galestalkers; requer Renome total 6. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "galestalkers-pulse-of-the-prey",
    "name": "Pulse Of The Prey",
    "english": "Pulse Of The Prey",
    "origin": "tribe",
    "owner": "galestalkers",
    "totalRenown": 6,
    "reference": "docs/Werewolf5ed:L11416",
    "summary": "Dom de galestalkers; requer Renome total 6. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "galestalkers-wind-claws",
    "name": "Wind Claws",
    "english": "Wind Claws",
    "origin": "tribe",
    "owner": "galestalkers",
    "totalRenown": 6,
    "reference": "docs/Werewolf5ed:L11417",
    "summary": "Dom de galestalkers; requer Renome total 6. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "galestalkers-blood-of-the-wastes",
    "name": "Blood Of The Wastes",
    "english": "Blood Of The Wastes",
    "origin": "tribe",
    "owner": "galestalkers",
    "totalRenown": 9,
    "reference": "docs/Werewolf5ed:L11419",
    "summary": "Dom de galestalkers; requer Renome total 9. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "galestalkers-claws-of-frozen-death",
    "name": "Claws Of Frozen Death",
    "english": "Claws Of Frozen Death",
    "origin": "tribe",
    "owner": "galestalkers",
    "totalRenown": 9,
    "reference": "docs/Werewolf5ed:L11436",
    "summary": "Dom de galestalkers; requer Renome total 9. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "galestalkers-oathbreakers-bane",
    "name": "Oathbreaker’s Bane",
    "english": "Oathbreaker’s Bane",
    "origin": "tribe",
    "owner": "galestalkers",
    "totalRenown": 9,
    "reference": "docs/Werewolf5ed:L11454",
    "summary": "Dom de galestalkers; requer Renome total 9. Consulte custo, parada, duração e efeito na referência."
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
    "id": "ghostcouncil-serpents-coil",
    "name": "Serpent’s Coil",
    "english": "Serpent’s Coil",
    "origin": "tribe",
    "owner": "ghostcouncil",
    "totalRenown": 6,
    "reference": "docs/Werewolf5ed:L11496",
    "summary": "Dom de ghostcouncil; requer Renome total 6. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "ghostcouncil-hands-of-the-earth",
    "name": "Hands Of The Earth",
    "english": "Hands Of The Earth",
    "origin": "tribe",
    "owner": "ghostcouncil",
    "totalRenown": 6,
    "reference": "docs/Werewolf5ed:L11517",
    "summary": "Dom de ghostcouncil; requer Renome total 6. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "ghostcouncil-mindspeak",
    "name": "Mindspeak",
    "english": "Mindspeak",
    "origin": "tribe",
    "owner": "ghostcouncil",
    "totalRenown": 6,
    "reference": "docs/Werewolf5ed:L11536",
    "summary": "Dom de ghostcouncil; requer Renome total 6. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "ghostcouncil-dreamwalk",
    "name": "Dreamwalk",
    "english": "Dreamwalk",
    "origin": "tribe",
    "owner": "ghostcouncil",
    "totalRenown": 9,
    "reference": "docs/Werewolf5ed:L11540",
    "summary": "Dom de ghostcouncil; requer Renome total 9. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "ghostcouncil-shrouded-aspect",
    "name": "Shrouded Aspect",
    "english": "Shrouded Aspect",
    "origin": "tribe",
    "owner": "ghostcouncil",
    "totalRenown": 9,
    "reference": "docs/Werewolf5ed:L11541",
    "summary": "Dom de ghostcouncil; requer Renome total 9. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "ghostcouncil-take-the-true-form",
    "name": "Take The True Form",
    "english": "Take The True Form",
    "origin": "tribe",
    "owner": "ghostcouncil",
    "totalRenown": 9,
    "reference": "docs/Werewolf5ed:L11560",
    "summary": "Dom de ghostcouncil; requer Renome total 9. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "ghostcouncil-thieving-talons-of-the-magpie",
    "name": "Thieving Talons Of The Magpie",
    "english": "Thieving Talons Of The Magpie",
    "origin": "tribe",
    "owner": "ghostcouncil",
    "totalRenown": 9,
    "reference": "docs/Werewolf5ed:L11561",
    "summary": "Dom de ghostcouncil; requer Renome total 9. Consulte custo, parada, duração e efeito na referência."
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
    "english": "Gaia’s Candor",
    "origin": "tribe",
    "owner": "andarilhosdoasfalto",
    "totalRenown": 3,
    "reference": "docs/Werewolf5ed:L11566",
    "summary": "Acesso tribal ao mesmo pacto espiritual descrito na seção de augúrio."
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
    "id": "andarilhosdoasfalto-spiders-song",
    "name": "Canção da Aranha",
    "english": "Spider’s Song",
    "origin": "tribe",
    "owner": "andarilhosdoasfalto",
    "totalRenown": 3,
    "reference": "docs/Werewolf5ed:L11589",
    "summary": "Acesso tribal ao mesmo pacto espiritual descrito na seção de augúrio."
  },
  {
    "id": "andarilhosdoasfalto-grasp-from-beyond",
    "name": "Grasp From Beyond",
    "english": "Grasp From Beyond",
    "origin": "tribe",
    "owner": "andarilhosdoasfalto",
    "totalRenown": 6,
    "reference": "docs/Werewolf5ed:L11591",
    "summary": "Dom de andarilhosdoasfalto; requer Renome total 6. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "andarilhosdoasfalto-energize",
    "name": "Energize",
    "english": "Energize",
    "origin": "tribe",
    "owner": "andarilhosdoasfalto",
    "totalRenown": 6,
    "reference": "docs/Werewolf5ed:L11592",
    "summary": "Dom de andarilhosdoasfalto; requer Renome total 6. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "andarilhosdoasfalto-snarl-of-challenge",
    "name": "Snarl Of Challenge",
    "english": "Snarl Of Challenge",
    "origin": "tribe",
    "owner": "andarilhosdoasfalto",
    "totalRenown": 6,
    "reference": "docs/Werewolf5ed:L11612",
    "summary": "Dom de andarilhosdoasfalto; requer Renome total 6. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "andarilhosdoasfalto-control-machine",
    "name": "Control Machine",
    "english": "Control Machine",
    "origin": "tribe",
    "owner": "andarilhosdoasfalto",
    "totalRenown": 9,
    "reference": "docs/Werewolf5ed:L11614",
    "summary": "Dom de andarilhosdoasfalto; requer Renome total 9. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "andarilhosdoasfalto-recover-memory",
    "name": "Recover Memory",
    "english": "Recover Memory",
    "origin": "tribe",
    "owner": "andarilhosdoasfalto",
    "totalRenown": 9,
    "reference": "docs/Werewolf5ed:L11662",
    "summary": "Dom de andarilhosdoasfalto; requer Renome total 9. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "hartwardens-crows-laughter",
    "name": "Riso do Corvo",
    "english": "Crow’s Laughter",
    "origin": "tribe",
    "owner": "hartwardens",
    "totalRenown": 3,
    "reference": "docs/Werewolf5ed:L11691",
    "summary": "Acesso tribal ao mesmo pacto espiritual descrito na seção de augúrio."
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
    "id": "hartwardens-beasts-fealty",
    "name": "Beast’s Fealty",
    "english": "Beast’s Fealty",
    "origin": "tribe",
    "owner": "hartwardens",
    "totalRenown": 6,
    "reference": "docs/Werewolf5ed:L11738",
    "summary": "Dom de hartwardens; requer Renome total 6. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "hartwardens-song-of-inspiration",
    "name": "Song Of Inspiration",
    "english": "Song Of Inspiration",
    "origin": "tribe",
    "owner": "hartwardens",
    "totalRenown": 6,
    "reference": "docs/Werewolf5ed:L11739",
    "summary": "Dom de hartwardens; requer Renome total 6. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "hartwardens-territorial-dominance",
    "name": "Territorial Dominance",
    "english": "Territorial Dominance",
    "origin": "tribe",
    "owner": "hartwardens",
    "totalRenown": 6,
    "reference": "docs/Werewolf5ed:L11740",
    "summary": "Dom de hartwardens; requer Renome total 6. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "hartwardens-balors-gaze",
    "name": "Balor’s Gaze",
    "english": "Balor’s Gaze",
    "origin": "tribe",
    "owner": "hartwardens",
    "totalRenown": 9,
    "reference": "docs/Werewolf5ed:L11770",
    "summary": "Dom de hartwardens; requer Renome total 9. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "hartwardens-the-living-wood",
    "name": "The Living Wood",
    "english": "The Living Wood",
    "origin": "tribe",
    "owner": "hartwardens",
    "totalRenown": 9,
    "reference": "docs/Werewolf5ed:L11785",
    "summary": "Dom de hartwardens; requer Renome total 9. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "hartwardens-kiss-of-helios",
    "name": "Kiss Of Helios",
    "english": "Kiss Of Helios",
    "origin": "tribe",
    "owner": "hartwardens",
    "totalRenown": 9,
    "reference": "docs/Werewolf5ed:L11808",
    "summary": "Dom de hartwardens; requer Renome total 9. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "hartwardens-living-ward",
    "name": "Living Ward",
    "english": "Living Ward",
    "origin": "tribe",
    "owner": "hartwardens",
    "totalRenown": 9,
    "reference": "docs/Werewolf5ed:L11809",
    "summary": "Dom de hartwardens; requer Renome total 9. Consulte custo, parada, duração e efeito na referência."
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
    "id": "redtalons-fangs-of-judgment",
    "name": "Fangs Of Judgment",
    "english": "Fangs Of Judgment",
    "origin": "tribe",
    "owner": "redtalons",
    "totalRenown": 6,
    "reference": "docs/Werewolf5ed:L11863",
    "summary": "Dom de redtalons; requer Renome total 6. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "redtalons-gaias-embrace",
    "name": "Gaia’s Embrace",
    "english": "Gaia’s Embrace",
    "origin": "tribe",
    "owner": "redtalons",
    "totalRenown": 6,
    "reference": "docs/Werewolf5ed:L11864",
    "summary": "Dom de redtalons; requer Renome total 6. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "redtalons-quicksand",
    "name": "Quicksand",
    "english": "Quicksand",
    "origin": "tribe",
    "owner": "redtalons",
    "totalRenown": 6,
    "reference": "docs/Werewolf5ed:L11890",
    "summary": "Dom de redtalons; requer Renome total 6. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "redtalons-feral-regression",
    "name": "Feral Regression",
    "english": "Feral Regression",
    "origin": "tribe",
    "owner": "redtalons",
    "totalRenown": 9,
    "reference": "docs/Werewolf5ed:L11910",
    "summary": "Dom de redtalons; requer Renome total 9. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "redtalons-shield-of-the-wyld",
    "name": "Shield Of The Wyld",
    "english": "Shield Of The Wyld",
    "origin": "tribe",
    "owner": "redtalons",
    "totalRenown": 9,
    "reference": "docs/Werewolf5ed:L11911",
    "summary": "Dom de redtalons; requer Renome total 9. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "redtalons-the-thousand-forms",
    "name": "The Thousand Forms",
    "english": "The Thousand Forms",
    "origin": "tribe",
    "owner": "redtalons",
    "totalRenown": 9,
    "reference": "docs/Werewolf5ed:L11930",
    "summary": "Dom de redtalons; requer Renome total 9. Consulte custo, parada, duração e efeito na referência."
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
    "id": "shadowlords-blur-of-the-milky-eye",
    "name": "Blur Of The Milky Eye",
    "english": "Blur Of The Milky Eye",
    "origin": "tribe",
    "owner": "shadowlords",
    "totalRenown": 6,
    "reference": "docs/Werewolf5ed:L11975",
    "summary": "Dom de shadowlords; requer Renome total 6. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "shadowlords-dire-distraction",
    "name": "Dire Distraction",
    "english": "Dire Distraction",
    "origin": "tribe",
    "owner": "shadowlords",
    "totalRenown": 6,
    "reference": "docs/Werewolf5ed:L11976",
    "summary": "Dom de shadowlords; requer Renome total 6. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "shadowlords-eyes-of-the-cobra",
    "name": "Eyes Of The Cobra",
    "english": "Eyes Of The Cobra",
    "origin": "tribe",
    "owner": "shadowlords",
    "totalRenown": 6,
    "reference": "docs/Werewolf5ed:L11996",
    "summary": "Dom de shadowlords; requer Renome total 6. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "shadowlords-true-fear",
    "name": "True Fear",
    "english": "True Fear",
    "origin": "tribe",
    "owner": "shadowlords",
    "totalRenown": 6,
    "reference": "docs/Werewolf5ed:L11997",
    "summary": "Dom de shadowlords; requer Renome total 6. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "shadowlords-geas",
    "name": "Geas",
    "english": "Geas",
    "origin": "tribe",
    "owner": "shadowlords",
    "totalRenown": 9,
    "reference": "docs/Werewolf5ed:L11999",
    "summary": "Dom de shadowlords; requer Renome total 9. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "shadowlords-thunderclap",
    "name": "Thunderclap",
    "english": "Thunderclap",
    "origin": "tribe",
    "owner": "shadowlords",
    "totalRenown": 9,
    "reference": "docs/Werewolf5ed:L12000",
    "summary": "Dom de shadowlords; requer Renome total 9. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "shadowlords-under-the-gun",
    "name": "Under The Gun",
    "english": "Under The Gun",
    "origin": "tribe",
    "owner": "shadowlords",
    "totalRenown": 9,
    "reference": "docs/Werewolf5ed:L12017",
    "summary": "Dom de shadowlords; requer Renome total 9. Consulte custo, parada, duração e efeito na referência."
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
    "id": "silentstriders-burrow",
    "name": "Burrow",
    "english": "Burrow",
    "origin": "tribe",
    "owner": "silentstriders",
    "totalRenown": 6,
    "reference": "docs/Werewolf5ed:L12107",
    "summary": "Dom de silentstriders; requer Renome total 6. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "silentstriders-scent-of-running-water",
    "name": "Scent Of Running Water",
    "english": "Scent Of Running Water",
    "origin": "tribe",
    "owner": "silentstriders",
    "totalRenown": 6,
    "reference": "docs/Werewolf5ed:L12129",
    "summary": "Dom de silentstriders; requer Renome total 6. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "silentstriders-umbral-tether",
    "name": "Umbral Tether",
    "english": "Umbral Tether",
    "origin": "tribe",
    "owner": "silentstriders",
    "totalRenown": 6,
    "reference": "docs/Werewolf5ed:L12130",
    "summary": "Dom de silentstriders; requer Renome total 6. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "silentstriders-against-the-odds",
    "name": "Against The Odds",
    "english": "Against The Odds",
    "origin": "tribe",
    "owner": "silentstriders",
    "totalRenown": 9,
    "reference": "docs/Werewolf5ed:L12132",
    "summary": "Dom de silentstriders; requer Renome total 9. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "silentstriders-closing-the-gap",
    "name": "Closing The Gap",
    "english": "Closing The Gap",
    "origin": "tribe",
    "owner": "silentstriders",
    "totalRenown": 9,
    "reference": "docs/Werewolf5ed:L12133",
    "summary": "Dom de silentstriders; requer Renome total 9. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "silentstriders-the-golden-path",
    "name": "The Golden Path",
    "english": "The Golden Path",
    "origin": "tribe",
    "owner": "silentstriders",
    "totalRenown": 9,
    "reference": "docs/Werewolf5ed:L12134",
    "summary": "Dom de silentstriders; requer Renome total 9. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "silentstriders-strength-of-purpose",
    "name": "Strength Of Purpose",
    "english": "Strength Of Purpose",
    "origin": "tribe",
    "owner": "silentstriders",
    "totalRenown": 9,
    "reference": "docs/Werewolf5ed:L12155",
    "summary": "Dom de silentstriders; requer Renome total 9. Consulte custo, parada, duração e efeito na referência."
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
    "id": "silverfangs-blood-of-the-pack",
    "name": "Blood Of The Pack",
    "english": "Blood Of The Pack",
    "origin": "tribe",
    "owner": "silverfangs",
    "totalRenown": 6,
    "reference": "docs/Werewolf5ed:L12197",
    "summary": "Dom de silverfangs; requer Renome total 6. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "silverfangs-command-the-gathering",
    "name": "Command The Gathering",
    "english": "Command The Gathering",
    "origin": "tribe",
    "owner": "silverfangs",
    "totalRenown": 6,
    "reference": "docs/Werewolf5ed:L12213",
    "summary": "Dom de silverfangs; requer Renome total 6. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "silverfangs-unity-of-the-pack",
    "name": "Unity Of The Pack",
    "english": "Unity Of The Pack",
    "origin": "tribe",
    "owner": "silverfangs",
    "totalRenown": 6,
    "reference": "docs/Werewolf5ed:L12214",
    "summary": "Dom de silverfangs; requer Renome total 6. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "silverfangs-command-spirit",
    "name": "Command Spirit",
    "english": "Command Spirit",
    "origin": "tribe",
    "owner": "silverfangs",
    "totalRenown": 9,
    "reference": "docs/Werewolf5ed:L12231",
    "summary": "Dom de silverfangs; requer Renome total 9. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "silverfangs-lunas-avenger",
    "name": "Luna’s Avenger",
    "english": "Luna’s Avenger",
    "origin": "tribe",
    "owner": "silverfangs",
    "totalRenown": 9,
    "reference": "docs/Werewolf5ed:L12232",
    "summary": "Dom de silverfangs; requer Renome total 9. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "silverfangs-lunas-blessing",
    "name": "Luna’s Blessing",
    "english": "Luna’s Blessing",
    "origin": "tribe",
    "owner": "silverfangs",
    "totalRenown": 9,
    "reference": "docs/Werewolf5ed:L12249",
    "summary": "Dom de silverfangs; requer Renome total 9. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "silverfangs-silver-claws",
    "name": "Silver Claws",
    "english": "Silver Claws",
    "origin": "tribe",
    "owner": "silverfangs",
    "totalRenown": 9,
    "reference": "docs/Werewolf5ed:L12250",
    "summary": "Dom de silverfangs; requer Renome total 9. Consulte custo, parada, duração e efeito na referência."
  },
  {
    "id": "blackfuries-coup-de-grace",
    "name": "Coup de Grâce",
    "english": "Coup de Grâce",
    "origin": "tribe",
    "owner": "blackfuries",
    "totalRenown": 6,
    "reference": "docs/Werewolf5ed:L11050",
    "summary": "Consulte custo, parada, duração e efeitos na referência."
  },
  {
    "id": "andarilhosdoasfalto-doppelganger",
    "name": "Doppelgänger",
    "english": "Doppelgänger",
    "origin": "tribe",
    "owner": "andarilhosdoasfalto",
    "totalRenown": 9,
    "reference": "docs/Werewolf5ed:L11639",
    "summary": "Consulte custo, parada, duração e efeitos na referência."
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

/** A Gift can have several auspice/tribe access entries without becoming several Gifts. */
export const w5GiftIdentity=(id:string)=>W5_GIFTS.find(g=>g.id===id)?.english.toLowerCase().replace(/[^a-z0-9]/g,'')||id;
