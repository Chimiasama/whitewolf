/** Initial rituals explicitly listed at level 1 in V5 core, pp. 276–277. */
export const INITIAL_BLOOD_RITUALS = [
  {
    id: "v5-blood-walk",
    name: "Caminhada pelo Sangue",
    english: "Blood Walk",
    description:
      "Investiga geração, identidade e linhagem a partir de sangue. Consulte a relação com Um Gosto de Sangue.",
    page: 276,
  },
  {
    id: "v5-clinging-insect",
    name: "Aderência do Inseto",
    english: "Clinging of the Insect",
    description:
      "Permite aderir a paredes e tetos com mãos e pés; duração depende do resultado.",
    page: 276,
  },
  {
    id: "v5-bloodstone",
    name: "Criar Pedra de Sangue",
    english: "Craft Bloodstone",
    description:
      "Cria um rastreador ligado ao conjurador por um processo de três noites.",
    page: 276,
  },
  {
    id: "v5-evening-freshness",
    name: "Despertar com o Frescor do Anoitecer",
    english: "Wake with Evening’s Freshness",
    description:
      "Permite despertar diante de perigo diurno e resistir às penalidades durante o efeito.",
    page: 276,
  },
  {
    id: "v5-ward-ghouls",
    name: "Proteção contra Carniçais",
    english: "Ward Against Ghouls",
    description:
      "Proteção contra carniçais; utiliza as regras gerais de Proteções do básico.",
    page: 277,
  },
].map((r) => ({
  ...r,
  level: 1,
  reference: `V5 básico, p. ${r.page}; docs/Vapire5edenglish, seção Rituals`,
  summary: r.description,
  description: `${r.description} ${r.english} — V5 básico, p. ${r.page}. Nível 1. Conferir ingredientes, processo e sistema no livro.`,
}));

/** Full learning catalogue; creation remains restricted to level 1. */
export const BLOOD_RITUALS = [...INITIAL_BLOOD_RITUALS, ...[{"level":2,"id":"v5-fr-shroud-of-silence","name":"Sudário de Silêncio","english":"The Shroud of Silence","summary":"Impede que som escape de um recinto.","reference":"docs/Vampire5edForbiddenReligions:L1839","description":"Impede que som escape de um recinto. The Shroud of Silence; Forbidden Religions; docs/Vampire5edForbiddenReligions:L1839."},{"level":3,"id":"v5-fr-bloodless-feast","name":"Banquete sem Sangue","english":"Bloodless Feast","summary":"Produz um banquete segundo as condições do ritual.","reference":"docs/Vampire5edForbiddenReligions:L5103","description":"Produz um banquete segundo as condições do ritual. Bloodless Feast; Forbidden Religions; docs/Vampire5edForbiddenReligions:L5103."},{"level":1,"id":"v5-fr-enrich-the-blood","name":"Enriquecer o Sangue","english":"Enrich the Blood","summary":"Aumenta o sustento obtido de sangue humano.","reference":"docs/Vampire5edForbiddenReligions:L6020","description":"Aumenta o sustento obtido de sangue humano. Enrich the Blood; Forbidden Religions; docs/Vampire5edForbiddenReligions:L6020."},{"level":2,"id":"v5-fr-enhance-dyscrasia","name":"Aprimorar Discrasia","english":"Enhance Dyscrasia","summary":"Permite compartilhar os efeitos de uma Discrasia.","reference":"docs/Vampire5edForbiddenReligions:L6047","description":"Permite compartilhar os efeitos de uma Discrasia. Enhance Dyscrasia; Forbidden Religions; docs/Vampire5edForbiddenReligions:L6047."}], ...[
  {
    "id": "v5-communicate-with-kindred-sire",
    "level": 2,
    "english": "Communicate with Kindred Sire",
    "name": "Comunicar-se com o Senhor",
    "summary": "Contato mental com o Senhor.",
    "reference": "docs/Vapire5edenglish:L18581",
    "description": "Contato mental com o Senhor. Communicate with Kindred Sire — nível 2; docs/Vapire5edenglish:L18581."
  },
  {
    "id": "v5-eyes-of-babel",
    "level": 2,
    "english": "Eyes of Babel",
    "name": "Olhos de Babel",
    "summary": "Acesso a idiomas conhecidos pela vítima.",
    "reference": "docs/Vapire5edenglish:L18611",
    "description": "Acesso a idiomas conhecidos pela vítima. Eyes of Babel — nível 2; docs/Vapire5edenglish:L18611."
  },
  {
    "id": "v5-illuminate-the-trail-of-prey",
    "level": 2,
    "english": "Illuminate the Trail of Prey",
    "name": "Iluminar o Rastro da Presa",
    "summary": "Revela o percurso de uma pessoa.",
    "reference": "docs/Vapire5edenglish:L18635",
    "description": "Revela o percurso de uma pessoa. Illuminate the Trail of Prey — nível 2; docs/Vapire5edenglish:L18635."
  },
  {
    "id": "v5-truth-of-blood",
    "level": 2,
    "english": "Truth of Blood",
    "name": "Verdade do Sangue",
    "summary": "Investiga a veracidade de declarações.",
    "reference": "docs/Vapire5edenglish:L18666",
    "description": "Investiga a veracidade de declarações. Truth of Blood — nível 2; docs/Vapire5edenglish:L18666."
  },
  {
    "id": "v5-ward-against-spirits",
    "level": 2,
    "english": "Ward Against Spirits",
    "name": "Proteção contra Espíritos",
    "summary": "Protege um objeto contra espíritos.",
    "reference": "docs/Vapire5edenglish:L18714",
    "description": "Protege um objeto contra espíritos. Ward Against Spirits — nível 2; docs/Vapire5edenglish:L18714."
  },
  {
    "id": "v5-warding-circle-against-ghouls",
    "level": 2,
    "english": "Warding Circle Against Ghouls",
    "name": "Círculo de Proteção contra Carniçais",
    "summary": "Delimita uma barreira contra carniçais.",
    "reference": "docs/Vapire5edenglish:L18727",
    "description": "Delimita uma barreira contra carniçais. Warding Circle Against Ghouls — nível 2; docs/Vapire5edenglish:L18727."
  },
  {
    "id": "v5-dagons-call",
    "level": 3,
    "english": "Dagon’s Call",
    "name": "Chamado de Dagon",
    "summary": "Ataca os vasos sanguíneos de um alvo previamente marcado.",
    "reference": "docs/Vapire5edenglish:L18738",
    "description": "Ataca os vasos sanguíneos de um alvo previamente marcado. Dagon’s Call — nível 3; docs/Vapire5edenglish:L18738."
  },
  {
    "id": "v5-deflection-of-wooden-doom",
    "level": 3,
    "english": "Deflection of Wooden Doom",
    "name": "Desvio da Perdição de Madeira",
    "summary": "Proteção contra estacas.",
    "reference": "docs/Vapire5edenglish:L18823",
    "description": "Proteção contra estacas. Deflection of Wooden Doom — nível 3; docs/Vapire5edenglish:L18823."
  },
  {
    "id": "v5-essence-of-air",
    "level": 3,
    "english": "Essence of Air",
    "name": "Essência do Ar",
    "summary": "Permite voar temporariamente.",
    "reference": "docs/Vapire5edenglish:L18767",
    "description": "Permite voar temporariamente. Essence of Air — nível 3; docs/Vapire5edenglish:L18767."
  },
  {
    "id": "v5-firewalker",
    "level": 3,
    "english": "Firewalker",
    "name": "Caminhante do Fogo",
    "summary": "Reduz dano por fogo nas condições do ritual.",
    "reference": "docs/Vapire5edenglish:L18851",
    "description": "Reduz dano por fogo nas condições do ritual. Firewalker — nível 3; docs/Vapire5edenglish:L18851."
  },
  {
    "id": "v5-ward-against-lupines",
    "level": 3,
    "english": "Ward Against Lupines",
    "name": "Proteção contra Lupinos",
    "summary": "Protege um objeto contra lobisomens.",
    "reference": "docs/Vapire5edenglish:L18877",
    "description": "Protege um objeto contra lobisomens. Ward Against Lupines — nível 3; docs/Vapire5edenglish:L18877."
  },
  {
    "id": "v5-warding-circle-against-spirits",
    "level": 3,
    "english": "Warding Circle Against Spirits",
    "name": "Círculo de Proteção contra Espíritos",
    "summary": "Delimita uma barreira contra espíritos.",
    "reference": "docs/Vapire5edenglish:L18886",
    "description": "Delimita uma barreira contra espíritos. Warding Circle Against Spirits — nível 3; docs/Vapire5edenglish:L18886."
  },
  {
    "id": "v5-defense-of-the-sacred-haven",
    "level": 4,
    "english": "Defense of the Sacred Haven",
    "name": "Defesa do Refúgio Sagrado",
    "summary": "Veda a luz solar em um refúgio.",
    "reference": "docs/Vapire5edenglish:L18908",
    "description": "Veda a luz solar em um refúgio. Defense of the Sacred Haven — nível 4; docs/Vapire5edenglish:L18908."
  },
  {
    "id": "v5-eyes-of-the-nighthawk",
    "level": 4,
    "english": "Eyes of the Nighthawk",
    "name": "Olhos do Falcão Noturno",
    "summary": "Percepção e controle por uma ave.",
    "reference": "docs/Vapire5edenglish:L18948",
    "description": "Percepção e controle por uma ave. Eyes of the Nighthawk — nível 4; docs/Vapire5edenglish:L18948."
  },
  {
    "id": "v5-incorporeal-passage",
    "level": 4,
    "english": "Incorporeal Passage",
    "name": "Passagem Incorpórea",
    "summary": "Permite atravessar obstáculos sólidos.",
    "reference": "docs/Vapire5edenglish:L18988",
    "description": "Permite atravessar obstáculos sólidos. Incorporeal Passage — nível 4; docs/Vapire5edenglish:L18988."
  },
  {
    "id": "v5-ward-against-cainites",
    "level": 4,
    "english": "Ward Against Cainites",
    "name": "Proteção contra Cainitas",
    "summary": "Protege um objeto contra vampiros.",
    "reference": "docs/Vapire5edenglish:L19033",
    "description": "Protege um objeto contra vampiros. Ward Against Cainites — nível 4; docs/Vapire5edenglish:L19033."
  },
  {
    "id": "v5-warding-circle-against-lupines",
    "level": 4,
    "english": "Warding Circle Against Lupines",
    "name": "Círculo de Proteção contra Lupinos",
    "summary": "Delimita uma barreira contra lobisomens.",
    "reference": "docs/Vapire5edenglish:L19051",
    "description": "Delimita uma barreira contra lobisomens. Warding Circle Against Lupines — nível 4; docs/Vapire5edenglish:L19051."
  },
  {
    "id": "v5-escape-to-true-sanctuary",
    "level": 5,
    "english": "Escape to True Sanctuary",
    "name": "Fuga para o Santuário Verdadeiro",
    "summary": "Viagem entre dois círculos preparados.",
    "reference": "docs/Vapire5edenglish:L19060",
    "description": "Viagem entre dois círculos preparados. Escape to True Sanctuary — nível 5; docs/Vapire5edenglish:L19060."
  },
  {
    "id": "v5-heart-of-stone",
    "level": 5,
    "english": "Heart of Stone",
    "name": "Coração de Pedra",
    "summary": "Transforma o coração e altera a resposta emocional.",
    "reference": "docs/Vapire5edenglish:L19110",
    "description": "Transforma o coração e altera a resposta emocional. Heart of Stone — nível 5; docs/Vapire5edenglish:L19110."
  },
  {
    "id": "v5-shaft-of-belated-dissolution",
    "level": 5,
    "english": "Shaft of Belated Dissolution",
    "name": "Estaca da Dissolução Tardia",
    "summary": "Cria uma estaca de efeito retardado.",
    "reference": "docs/Vapire5edenglish:L19159",
    "description": "Cria uma estaca de efeito retardado. Shaft of Belated Dissolution — nível 5; docs/Vapire5edenglish:L19159."
  },
  {
    "id": "v5-warding-circle-against-cainites",
    "level": 5,
    "english": "Warding Circle Against Cainites",
    "name": "Círculo de Proteção contra Cainitas",
    "summary": "Delimita uma barreira contra vampiros.",
    "reference": "docs/Vapire5edenglish:L19306",
    "description": "Delimita uma barreira contra vampiros. Warding Circle Against Cainites — nível 5; docs/Vapire5edenglish:L19306."
  },
  {
    "id": "v5-pg-douse-the-fear",
    "level": 1,
    "english": "Douse The Fear",
    "name": "Douse The Fear",
    "summary": "Ritual do Players Guide; confira ingredientes, processo, duração e sistema na referência.",
    "reference": "docs/Vampire5edPlayersGuide01:L5310",
    "description": "Ritual do Players Guide; confira ingredientes, processo, duração e sistema na referência. Douse The Fear — nível 1; docs/Vampire5edPlayersGuide01:L5310."
  },
  {
    "id": "v5-pg-seal-the-brand",
    "level": 1,
    "english": "Seal The Brand",
    "name": "Seal The Brand",
    "summary": "Ritual do Players Guide; confira ingredientes, processo, duração e sistema na referência.",
    "reference": "docs/Vampire5edPlayersGuide01:L5324",
    "description": "Ritual do Players Guide; confira ingredientes, processo, duração e sistema na referência. Seal The Brand — nível 1; docs/Vampire5edPlayersGuide01:L5324."
  },
  {
    "id": "v5-pg-as-fog-on-water",
    "level": 2,
    "english": "As Fog On Water",
    "name": "As Fog On Water",
    "summary": "Ritual do Players Guide; confira ingredientes, processo, duração e sistema na referência.",
    "reference": "docs/Vampire5edPlayersGuide01:L5346",
    "description": "Ritual do Players Guide; confira ingredientes, processo, duração e sistema na referência. As Fog On Water — nível 2; docs/Vampire5edPlayersGuide01:L5346."
  },
  {
    "id": "v5-pg-calix-secretus",
    "level": 2,
    "english": "Calix Secretus",
    "name": "Calix Secretus",
    "summary": "Ritual do Players Guide; confira ingredientes, processo, duração e sistema na referência.",
    "reference": "docs/Vampire5edPlayersGuide01:L5360",
    "description": "Ritual do Players Guide; confira ingredientes, processo, duração e sistema na referência. Calix Secretus — nível 2; docs/Vampire5edPlayersGuide01:L5360."
  },
  {
    "id": "v5-pg-soporific-touch",
    "level": 2,
    "english": "Soporific Touch",
    "name": "Soporific Touch",
    "summary": "Ritual do Players Guide; confira ingredientes, processo, duração e sistema na referência.",
    "reference": "docs/Vampire5edPlayersGuide01:L5380",
    "description": "Ritual do Players Guide; confira ingredientes, processo, duração e sistema na referência. Soporific Touch — nível 2; docs/Vampire5edPlayersGuide01:L5380."
  },
  {
    "id": "v5-pg-fire-in-the-blood",
    "level": 3,
    "english": "Fire In The Blood",
    "name": "Fire In The Blood",
    "summary": "Ritual do Players Guide; confira ingredientes, processo, duração e sistema na referência.",
    "reference": "docs/Vampire5edPlayersGuide01:L5402",
    "description": "Ritual do Players Guide; confira ingredientes, processo, duração e sistema na referência. Fire In The Blood — nível 3; docs/Vampire5edPlayersGuide01:L5402."
  },
  {
    "id": "v5-pg-one-with-the-blade",
    "level": 3,
    "english": "One With The Blade",
    "name": "One With The Blade",
    "summary": "Ritual do Players Guide; confira ingredientes, processo, duração e sistema na referência.",
    "reference": "docs/Vampire5edPlayersGuide01:L5435",
    "description": "Ritual do Players Guide; confira ingredientes, processo, duração e sistema na referência. One With The Blade — nível 3; docs/Vampire5edPlayersGuide01:L5435."
  },
  {
    "id": "v5-pg-feast-of-ashes",
    "level": 4,
    "english": "Feast Of Ashes",
    "name": "Feast Of Ashes",
    "summary": "Ritual do Players Guide; confira ingredientes, processo, duração e sistema na referência.",
    "reference": "docs/Vampire5edPlayersGuide01:L5469",
    "description": "Ritual do Players Guide; confira ingredientes, processo, duração e sistema na referência. Feast Of Ashes — nível 4; docs/Vampire5edPlayersGuide01:L5469."
  },
  {
    "id": "v5-pg-guided-memory",
    "level": 4,
    "english": "Guided Memory",
    "name": "Guided Memory",
    "summary": "Ritual do Players Guide; confira ingredientes, processo, duração e sistema na referência.",
    "reference": "docs/Vampire5edPlayersGuide01:L5488",
    "description": "Ritual do Players Guide; confira ingredientes, processo, duração e sistema na referência. Guided Memory — nível 4; docs/Vampire5edPlayersGuide01:L5488."
  },
  {
    "id": "v5-pg-invisible-chains-of-binding",
    "level": 4,
    "english": "Invisible Chains Of Binding",
    "name": "Invisible Chains Of Binding",
    "summary": "Ritual do Players Guide; confira ingredientes, processo, duração e sistema na referência.",
    "reference": "docs/Vampire5edPlayersGuide01:L5561",
    "description": "Ritual do Players Guide; confira ingredientes, processo, duração e sistema na referência. Invisible Chains Of Binding — nível 4; docs/Vampire5edPlayersGuide01:L5561."
  },
  {
    "id": "v5-pg-antebrachia-ignium",
    "level": 5,
    "english": "Antebrachia Ignium",
    "name": "Antebrachia Ignium",
    "summary": "Ritual do Players Guide; confira ingredientes, processo, duração e sistema na referência.",
    "reference": "docs/Vampire5edPlayersGuide01:L5582",
    "description": "Ritual do Players Guide; confira ingredientes, processo, duração e sistema na referência. Antebrachia Ignium — nível 5; docs/Vampire5edPlayersGuide01:L5582."
  },
  {
    "id": "v5-pg-dominion",
    "level": 5,
    "english": "Dominion",
    "name": "Dominion",
    "summary": "Ritual do Players Guide; confira ingredientes, processo, duração e sistema na referência.",
    "reference": "docs/Vampire5edPlayersGuide01:L5615",
    "description": "Ritual do Players Guide; confira ingredientes, processo, duração e sistema na referência. Dominion — nível 5; docs/Vampire5edPlayersGuide01:L5615."
  },
  {
    "id": "v5-cults-coax-the-garden",
    "level": 1,
    "english": "Coax the Garden",
    "name": "Instigar o Jardim",
    "summary": "Anima plantas para defesa.",
    "reference": "docs/Vampire5edCultsoftheBloddGods:L3949",
    "description": "Anima plantas para defesa. Coax the Garden — nível 1; docs/Vampire5edCultsoftheBloddGods:L3949."
  },
  {
    "id": "v5-cults-edens-bounty",
    "level": 5,
    "english": "Eden’s Bounty",
    "name": "Dádiva do Éden",
    "summary": "Drena sangue da área para saciar a Fome.",
    "reference": "docs/Vampire5edCultsoftheBloddGods:L3980",
    "description": "Drena sangue da área para saciar a Fome. Eden’s Bounty — nível 5; docs/Vampire5edCultsoftheBloddGods:L3980."
  },
  {
    "id": "v5-cults-dampen-the-fear",
    "level": 1,
    "english": "Dampen the Fear",
    "name": "Abrandar o Medo",
    "summary": "Reduz o medo do fogo por uma cena; versão de Cults.",
    "reference": "docs/Vampire5edCultsoftheBloddGods:L5002",
    "description": "Reduz o medo do fogo por uma cena; versão de Cults. Dampen the Fear — nível 1; docs/Vampire5edCultsoftheBloddGods:L5002."
  },
  {
    "id": "v5-cults-fire-in-the-blood",
    "level": 3,
    "english": "Fire in the Blood",
    "name": "Fogo no Sangue (Cults)",
    "summary": "Provoca dor e dano no sangue; versão de Cults.",
    "reference": "docs/Vampire5edCultsoftheBloddGods:L5020",
    "description": "Provoca dor e dano no sangue; versão de Cults. Fire in the Blood — nível 3; docs/Vampire5edCultsoftheBloddGods:L5020."
  },
  {
    "id": "v5-cults-creatio-ignis",
    "level": 5,
    "english": "Creatio Ignis",
    "name": "Creatio Ignis",
    "summary": "Reveste os braços para manejar chamas; versão de Cults.",
    "reference": "docs/Vampire5edCultsoftheBloddGods:L5052",
    "description": "Reveste os braços para manejar chamas; versão de Cults. Creatio Ignis — nível 5; docs/Vampire5edCultsoftheBloddGods:L5052."
  }
]];
