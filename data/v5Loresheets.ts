import { Clan, Loresheet } from "../types";
/** Authorial summaries. Legacy WtA entries are deliberately excluded, never remapped. */
function sheet(
  id: string,
  name: string,
  english: string,
  page: number,
  description: string,
  entries: [string, string, string][],
  allowedClans?: Clan[],
): Loresheet {
  return {
    id,
    name,
    description: `${description} ${english} — V5 básico, p. ${page}.`,
    allowedClans,
    levels: entries.map(([name, en, description], i) => ({
      level: i + 1,
      name,
      description,
      system: `${en} — resumo autoral; consulte limites, frequência e sistema completo em V5 básico, p. ${page}.`,
    })),
  };
}
export const V5_LORESHEETS: Loresheet[] = [
  sheet(
    "v5-bahari",
    "Bahari",
    "The Bahari",
    382,
    "Vínculo com os seguidores de Lilith e suas práticas.",
    [
      [
        "Reputação Perigosa",
        "Dangerous Reputation",
        "Uma vez por história, +2 dados de Intimidação contra adoradores de Caim que conheçam sua filiação.",
      ],
      [
        "Escarificação Ritual",
        "Ritual Scarification",
        "Uma vez por sessão, aceitar 1 dano agravado permite recuperar 1 dano de Força de Vontade.",
      ],
      [
        "Sacrificar os Filhos",
        "Sacrifice the Children",
        "Ao diablerizar a própria cria, acrescenta 3 dados à absorção de Disciplinas.",
      ],
      [
        "Sangue do Ventre",
        "The Womb’s Blood",
        "Uma vez por história, a alimentação especificada concede +2 Vigor ou Determinação até o amanhecer.",
      ],
      [
        "Primeira Amaldiçoada",
        "First-Cursed",
        "Modifica a exposição ao início/fim do dia e traz consequências sociais e para quem usa Auspícios; não elimina a Maldição de clã.",
      ],
    ],
  ),
  sheet(
    "v5-theo-bell",
    "Theo Bell",
    "Theo Bell",
    383,
    "Relações com o rebelde que rompeu com a Camarilla.",
    [
      [
        "Célula Rebelde",
        "Rebel Cell",
        "Um grupo equivalente a Aliados 3 executa uma tarefa perigosa por história.",
      ],
      [
        "Anarquista de Verdade",
        "True Anarch",
        "Dois sucessos automáticos em Investigação sobre desertores para os Anarquistas.",
      ],
      [
        "Informação de Contato",
        "Contact Information",
        "Pode enviar uma mensagem a Theo; resposta e ajuda dependem da situação.",
      ],
      [
        "Círculo de Bell",
        "Bell’s Circle",
        "Theo atua como Mawla 5, com os riscos inerentes à associação.",
      ],
      [
        "Neutralidade de Seita",
        "Sect Neutrality",
        "Um pequeno grupo de Brujah concede 5 pontos distribuídos entre Contatos, Refúgio, Mawla e Lacaios; não são seguidores incondicionais.",
      ],
    ],
  ),
  sheet(
    "v5-hardestadt",
    "Descendente de Hardestadt",
    "Descendant of Hardestadt",
    390,
    "Linhagem e legado político de Hardestadt.",
    [
      [
        "Voz de Hardestadt",
        "Voice of Hardestadt",
        "A voz se faz ouvir acima do ruído e atrai atenção.",
      ],
      [
        "Líder Supremo",
        "Supreme Leader",
        "Uma vez por história, evita penalidade na parada por mandar pessoas ao perigo.",
      ],
      [
        "Pilar Ventrue",
        "Ventrue Pillar",
        "Reconhecimento equivalente a Status 3 entre os Ventrue.",
      ],
      [
        "Linha aos Fundadores",
        "Line to the Founders",
        "Uma vez por crônica, permite tentar contato com um fundador da Camarilla.",
      ],
      [
        "Herdeiro de Hardestadt",
        "Hardestadt’s Heir",
        "Um documento de sucessão abre uma disputa de poder e atrai oposição.",
      ],
    ],
    [Clan.Ventrue],
  ),
  sheet(
    "v5-helena",
    "Descendente de Helena",
    "Descendant of Helena",
    391,
    "Prestígio e talento ligados à linhagem de Helena.",
    [
      [
        "Superficial",
        "Skin-Deep",
        "Mencionar Helena pode elevar temporariamente o Status em uma interação, sujeito à frequência do benefício.",
      ],
      [
        "Talento Verdadeiro",
        "Real Talent",
        "Escolha Ofícios, Etiqueta ou Performance. Aumentar essa Perícia custa metade do XP normal, arredondado para baixo.",
      ],
      [
        "Abraçar o Estereótipo",
        "Embrace the Stereotype",
        "Uma festa por história pode conceder temporariamente +2 Status e/ou Influência entre os convidados.",
      ],
      [
        "Pureza Divina",
        "Divine Purity",
        "Acrescenta 2 dados a testes para evitar a culpa por seus atos.",
      ],
      [
        "Franquia do Succubus Club",
        "Succubus Club Franchise",
        "Uma franquia concede benefícios ao Domínio e 4 pontos entre Recursos, Fama e Status; depende da continuidade do clube.",
      ],
    ],
    [Clan.Toreador],
  ),
];

V5_LORESHEETS.push(...([
  {
    "id": "v5-cainite-heresy",
    "name": "Heresia Cainita",
    "description": "Cainite Heresy — V5 básico, p. 384. Tradução de trabalho; níveis comprados separadamente.",
    "levels": [
      {
        "level": 1,
        "name": "Let He Who Hath Understanding",
        "description": "Benefício 1 de Cainite Heresy. Consulte o efeito em V5 básico, p. 384.",
        "system": "Let He Who Hath Understanding — V5 básico, p. 384. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 2,
        "name": "Hand of the Heresy",
        "description": "Benefício 2 de Cainite Heresy. Consulte o efeito em V5 básico, p. 384.",
        "system": "Hand of the Heresy — V5 básico, p. 384. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 3,
        "name": "Counter-Inquisition",
        "description": "Benefício 3 de Cainite Heresy. Consulte o efeito em V5 básico, p. 384.",
        "system": "Counter-Inquisition — V5 básico, p. 384. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 4,
        "name": "Red Celebrant",
        "description": "Benefício 4 de Cainite Heresy. Consulte o efeito em V5 básico, p. 384.",
        "system": "Red Celebrant — V5 básico, p. 384. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 5,
        "name": "Prophecy",
        "description": "Benefício 5 de Cainite Heresy. Consulte o efeito em V5 básico, p. 384.",
        "system": "Prophecy — V5 básico, p. 384. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      }
    ]
  },
  {
    "id": "v5-carna",
    "name": "Carna",
    "description": "Carna — V5 básico, p. 385. Tradução de trabalho; níveis comprados separadamente.",
    "levels": [
      {
        "level": 1,
        "name": "Embrace the Vision",
        "description": "Benefício 1 de Carna. Consulte o efeito em V5 básico, p. 385.",
        "system": "Embrace the Vision — V5 básico, p. 385. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 2,
        "name": "The Rebel Trail",
        "description": "Benefício 2 de Carna. Consulte o efeito em V5 básico, p. 385.",
        "system": "The Rebel Trail — V5 básico, p. 385. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 3,
        "name": "Unorthodox Rituals",
        "description": "Benefício 3 de Carna. Consulte o efeito em V5 básico, p. 385.",
        "system": "Unorthodox Rituals — V5 básico, p. 385. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 4,
        "name": "Reimagined Bond",
        "description": "Benefício 4 de Carna. Consulte o efeito em V5 básico, p. 385.",
        "system": "Reimagined Bond — V5 básico, p. 385. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 5,
        "name": "Book of the Grave-War",
        "description": "Benefício 5 de Carna. Consulte o efeito em V5 básico, p. 385.",
        "system": "Book of the Grave-War — V5 básico, p. 385. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      }
    ]
  },
  {
    "id": "v5-circulatory-system",
    "name": "Sistema Circulatório",
    "description": "The Circulatory System — V5 básico, p. 386. Tradução de trabalho; níveis comprados separadamente.",
    "levels": [
      {
        "level": 1,
        "name": "Tap into the System",
        "description": "Benefício 1 de The Circulatory System. Consulte o efeito em V5 básico, p. 386.",
        "system": "Tap into the System — V5 básico, p. 386. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 2,
        "name": "Little Black Book",
        "description": "Benefício 2 de The Circulatory System. Consulte o efeito em V5 básico, p. 386.",
        "system": "Little Black Book — V5 básico, p. 386. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 3,
        "name": "Farm Upstate",
        "description": "Benefício 3 de The Circulatory System. Consulte o efeito em V5 básico, p. 386.",
        "system": "Farm Upstate — V5 básico, p. 386. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 4,
        "name": "Secure Transit",
        "description": "Benefício 4 de The Circulatory System. Consulte o efeito em V5 básico, p. 386.",
        "system": "Secure Transit — V5 básico, p. 386. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 5,
        "name": "Blood Sommelier",
        "description": "Benefício 5 de The Circulatory System. Consulte o efeito em V5 básico, p. 386.",
        "system": "Blood Sommelier — V5 básico, p. 386. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      }
    ]
  },
  {
    "id": "v5-convention-of-thorns",
    "name": "Convenção dos Espinhos",
    "description": "Convention of Thorns — V5 básico, p. 387. Tradução de trabalho; níveis comprados separadamente.",
    "levels": [
      {
        "level": 1,
        "name": "Thorns Historian",
        "description": "Benefício 1 de Convention of Thorns. Consulte o efeito em V5 básico, p. 387.",
        "system": "Thorns Historian — V5 básico, p. 387. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 2,
        "name": "Tradition Master",
        "description": "Benefício 2 de Convention of Thorns. Consulte o efeito em V5 básico, p. 387.",
        "system": "Tradition Master — V5 básico, p. 387. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 3,
        "name": "Convention Secrets",
        "description": "Benefício 3 de Convention of Thorns. Consulte o efeito em V5 básico, p. 387.",
        "system": "Convention Secrets — V5 básico, p. 387. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 4,
        "name": "Prospective Justicar",
        "description": "Benefício 4 de Convention of Thorns. Consulte o efeito em V5 básico, p. 387.",
        "system": "Prospective Justicar — V5 básico, p. 387. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 5,
        "name": "New Traditions",
        "description": "Benefício 5 de Convention of Thorns. Consulte o efeito em V5 básico, p. 387.",
        "system": "New Traditions — V5 básico, p. 387. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      }
    ]
  },
  {
    "id": "v5-first-inquisition",
    "name": "Primeira Inquisição",
    "description": "The First Inquisition — V5 básico, p. 388. Tradução de trabalho; níveis comprados separadamente.",
    "levels": [
      {
        "level": 1,
        "name": "Mistakes of the Past",
        "description": "Benefício 1 de The First Inquisition. Consulte o efeito em V5 básico, p. 388.",
        "system": "Mistakes of the Past — V5 básico, p. 388. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 2,
        "name": "Names of the Guilty",
        "description": "Benefício 2 de The First Inquisition. Consulte o efeito em V5 básico, p. 388.",
        "system": "Names of the Guilty — V5 básico, p. 388. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 3,
        "name": "The Sect of St. James",
        "description": "Benefício 3 de The First Inquisition. Consulte o efeito em V5 básico, p. 388.",
        "system": "The Sect of St. James — V5 básico, p. 388. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 4,
        "name": "The Second Act",
        "description": "Benefício 4 de The First Inquisition. Consulte o efeito em V5 básico, p. 388.",
        "system": "The Second Act — V5 básico, p. 388. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 5,
        "name": "Black Spot",
        "description": "Benefício 5 de The First Inquisition. Consulte o efeito em V5 básico, p. 388.",
        "system": "Black Spot — V5 básico, p. 388. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      }
    ]
  },
  {
    "id": "v5-golconda",
    "name": "Golconda",
    "description": "Golconda — V5 básico, p. 389. Tradução de trabalho; níveis comprados separadamente.",
    "levels": [
      {
        "level": 1,
        "name": "Seeds of Golconda",
        "description": "Benefício 1 de Golconda. Consulte o efeito em V5 básico, p. 389.",
        "system": "Seeds of Golconda — V5 básico, p. 389. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 2,
        "name": "The One True Way",
        "description": "Benefício 2 de Golconda. Consulte o efeito em V5 básico, p. 389.",
        "system": "The One True Way — V5 básico, p. 389. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 3,
        "name": "Saulot’s Disciple",
        "description": "Benefício 3 de Golconda. Consulte o efeito em V5 básico, p. 389.",
        "system": "Saulot’s Disciple — V5 básico, p. 389. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 4,
        "name": "Satisfy the Hunger",
        "description": "Benefício 4 de Golconda. Consulte o efeito em V5 básico, p. 389.",
        "system": "Satisfy the Hunger — V5 básico, p. 389. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 5,
        "name": "Greet the Sun",
        "description": "Benefício 5 de Golconda. Consulte o efeito em V5 básico, p. 389.",
        "system": "Greet the Sun — V5 básico, p. 389. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      }
    ]
  },
  {
    "id": "v5-sect-war-veteran",
    "name": "Veterano da Guerra de Seitas",
    "description": "Sect War Veteran — V5 básico, p. 392. Tradução de trabalho; níveis comprados separadamente.",
    "levels": [
      {
        "level": 1,
        "name": "Survivor",
        "description": "Benefício 1 de Sect War Veteran. Consulte o efeito em V5 básico, p. 392.",
        "system": "Survivor — V5 básico, p. 392. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 2,
        "name": "Active Participant",
        "description": "Benefício 2 de Sect War Veteran. Consulte o efeito em V5 básico, p. 392.",
        "system": "Active Participant — V5 básico, p. 392. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 3,
        "name": "Trophy Kill",
        "description": "Benefício 3 de Sect War Veteran. Consulte o efeito em V5 básico, p. 392.",
        "system": "Trophy Kill — V5 básico, p. 392. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 4,
        "name": "No Vampire’s Land",
        "description": "Benefício 4 de Sect War Veteran. Consulte o efeito em V5 básico, p. 392.",
        "system": "No Vampire’s Land — V5 básico, p. 392. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 5,
        "name": "Sect Agitator",
        "description": "Benefício 5 de Sect War Veteran. Consulte o efeito em V5 básico, p. 392.",
        "system": "Sect Agitator — V5 básico, p. 392. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      }
    ]
  },
  {
    "id": "v5-trinity",
    "name": "A Trindade",
    "description": "The Trinity — V5 básico, p. 393. Tradução de trabalho; níveis comprados separadamente.",
    "levels": [
      {
        "level": 1,
        "name": "Constantinople",
        "description": "Benefício 1 de The Trinity. Consulte o efeito em V5 básico, p. 393.",
        "system": "Constantinople — V5 básico, p. 393. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 2,
        "name": "Antonius’ Architecture",
        "description": "Benefício 2 de The Trinity. Consulte o efeito em V5 básico, p. 393.",
        "system": "Antonius’ Architecture — V5 básico, p. 393. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 3,
        "name": "The Dream",
        "description": "Benefício 3 de The Trinity. Consulte o efeito em V5 básico, p. 393.",
        "system": "The Dream — V5 básico, p. 393. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 4,
        "name": "The Dracon",
        "description": "Benefício 4 de The Trinity. Consulte o efeito em V5 básico, p. 393.",
        "system": "The Dracon — V5 básico, p. 393. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 5,
        "name": "The New Trinity",
        "description": "Benefício 5 de The Trinity. Consulte o efeito em V5 básico, p. 393.",
        "system": "The New Trinity — V5 básico, p. 393. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      }
    ]
  },
  {
    "id": "v5-voerman",
    "name": "Jeanette/Therese Voerman",
    "description": "Jeanette/Therese Voerman — V5 básico, p. 394. Tradução de trabalho; níveis comprados separadamente.",
    "levels": [
      {
        "level": 1,
        "name": "Asylum Membership",
        "description": "Benefício 1 de Jeanette/Therese Voerman. Consulte o efeito em V5 básico, p. 394.",
        "system": "Asylum Membership — V5 básico, p. 394. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 2,
        "name": "Performing Monkey",
        "description": "Benefício 2 de Jeanette/Therese Voerman. Consulte o efeito em V5 básico, p. 394.",
        "system": "Performing Monkey — V5 básico, p. 394. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 3,
        "name": "Jeanette’s Favorite",
        "description": "Benefício 3 de Jeanette/Therese Voerman. Consulte o efeito em V5 básico, p. 394.",
        "system": "Jeanette’s Favorite — V5 básico, p. 394. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 4,
        "name": "Therese’s Favorite",
        "description": "Benefício 4 de Jeanette/Therese Voerman. Consulte o efeito em V5 básico, p. 394.",
        "system": "Therese’s Favorite — V5 básico, p. 394. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 5,
        "name": "Asylum Operator",
        "description": "Benefício 5 de Jeanette/Therese Voerman. Consulte o efeito em V5 básico, p. 394.",
        "system": "Asylum Operator — V5 básico, p. 394. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      }
    ]
  },
  {
    "id": "v5-week-of-nightmares",
    "name": "Semana dos Pesadelos",
    "description": "The Week of Nightmares — V5 básico, p. 395. Tradução de trabalho; níveis comprados separadamente.",
    "levels": [
      {
        "level": 1,
        "name": "Oral History",
        "description": "Benefício 1 de The Week of Nightmares. Consulte o efeito em V5 básico, p. 395.",
        "system": "Oral History — V5 básico, p. 395. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 2,
        "name": "Ravnos Remains",
        "description": "Benefício 2 de The Week of Nightmares. Consulte o efeito em V5 básico, p. 395.",
        "system": "Ravnos Remains — V5 básico, p. 395. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 3,
        "name": "I Was There",
        "description": "Benefício 3 de The Week of Nightmares. Consulte o efeito em V5 básico, p. 395.",
        "system": "I Was There — V5 básico, p. 395. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 4,
        "name": "The Red Star",
        "description": "Benefício 4 de The Week of Nightmares. Consulte o efeito em V5 básico, p. 395.",
        "system": "The Red Star — V5 básico, p. 395. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 5,
        "name": "Blood of Zapathasura",
        "description": "Benefício 5 de The Week of Nightmares. Consulte o efeito em V5 básico, p. 395.",
        "system": "Blood of Zapathasura — V5 básico, p. 395. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      }
    ]
  },
  {
    "id": "v5-rudi",
    "name": "Rudi",
    "description": "Rudi — V5 básico, p. 396. Tradução de trabalho; níveis comprados separadamente.",
    "levels": [
      {
        "level": 1,
        "name": "Newfound Rights",
        "description": "Benefício 1 de Rudi. Consulte o efeito em V5 básico, p. 396.",
        "system": "Newfound Rights — V5 básico, p. 396. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 2,
        "name": "Them and Theirs",
        "description": "Benefício 2 de Rudi. Consulte o efeito em V5 básico, p. 396.",
        "system": "Them and Theirs — V5 básico, p. 396. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 3,
        "name": "Gangrel Advocate",
        "description": "Benefício 3 de Rudi. Consulte o efeito em V5 básico, p. 396.",
        "system": "Gangrel Advocate — V5 básico, p. 396. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 4,
        "name": "The Bear Pack",
        "description": "Benefício 4 de Rudi. Consulte o efeito em V5 básico, p. 396.",
        "system": "The Bear Pack — V5 básico, p. 396. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 5,
        "name": "Rudi’s Army",
        "description": "Benefício 5 de Rudi. Consulte o efeito em V5 básico, p. 396.",
        "system": "Rudi’s Army — V5 básico, p. 396. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      }
    ]
  },
  {
    "id": "v5-tyler",
    "name": "Descendente de Tyler",
    "description": "Descendant of Tyler — V5 básico, p. 397. Tradução de trabalho; níveis comprados separadamente.",
    "allowedClans": [
      "brujah"
    ],
    "levels": [
      {
        "level": 1,
        "name": "Instigator",
        "description": "Benefício 1 de Descendant of Tyler. Consulte o efeito em V5 básico, p. 397.",
        "system": "Instigator — V5 básico, p. 397. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 2,
        "name": "Champion of the Cause",
        "description": "Benefício 2 de Descendant of Tyler. Consulte o efeito em V5 básico, p. 397.",
        "system": "Champion of the Cause — V5 básico, p. 397. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 3,
        "name": "Tyler’s Mercy",
        "description": "Benefício 3 de Descendant of Tyler. Consulte o efeito em V5 básico, p. 397.",
        "system": "Tyler’s Mercy — V5 básico, p. 397. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 4,
        "name": "The Furores",
        "description": "Benefício 4 de Descendant of Tyler. Consulte o efeito em V5 básico, p. 397.",
        "system": "The Furores — V5 básico, p. 397. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 5,
        "name": "Revolution",
        "description": "Benefício 5 de Descendant of Tyler. Consulte o efeito em V5 básico, p. 397.",
        "system": "Revolution — V5 básico, p. 397. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      }
    ]
  },
  {
    "id": "v5-zelios",
    "name": "Descendente de Zelios",
    "description": "Descendant of Zelios — V5 básico, p. 398. Tradução de trabalho; níveis comprados separadamente.",
    "allowedClans": [
      "nosferatu"
    ],
    "levels": [
      {
        "level": 1,
        "name": "Sanctuary",
        "description": "Benefício 1 de Descendant of Zelios. Consulte o efeito em V5 básico, p. 398.",
        "system": "Sanctuary — V5 básico, p. 398. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 2,
        "name": "Saboteur",
        "description": "Benefício 2 de Descendant of Zelios. Consulte o efeito em V5 básico, p. 398.",
        "system": "Saboteur — V5 básico, p. 398. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 3,
        "name": "On Commission",
        "description": "Benefício 3 de Descendant of Zelios. Consulte o efeito em V5 básico, p. 398.",
        "system": "On Commission — V5 básico, p. 398. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 4,
        "name": "The Labyrinth",
        "description": "Benefício 4 de Descendant of Zelios. Consulte o efeito em V5 básico, p. 398.",
        "system": "The Labyrinth — V5 básico, p. 398. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 5,
        "name": "Sense the Ley Lines",
        "description": "Benefício 5 de Descendant of Zelios. Consulte o efeito em V5 básico, p. 398.",
        "system": "Sense the Ley Lines — V5 básico, p. 398. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      }
    ]
  },
  {
    "id": "v5-vasantasena",
    "name": "Descendente de Vasantasena",
    "description": "Descendant of Vasantasena — V5 básico, p. 399. Tradução de trabalho; níveis comprados separadamente.",
    "allowedClans": [
      "malkavian"
    ],
    "levels": [
      {
        "level": 1,
        "name": "Agent of Chaos",
        "description": "Benefício 1 de Descendant of Vasantasena. Consulte o efeito em V5 básico, p. 399.",
        "system": "Agent of Chaos — V5 básico, p. 399. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 2,
        "name": "Hear My Words",
        "description": "Benefício 2 de Descendant of Vasantasena. Consulte o efeito em V5 básico, p. 399.",
        "system": "Hear My Words — V5 básico, p. 399. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 3,
        "name": "Scent the Bond",
        "description": "Benefício 3 de Descendant of Vasantasena. Consulte o efeito em V5 básico, p. 399.",
        "system": "Scent the Bond — V5 básico, p. 399. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 4,
        "name": "Destroy the Bond",
        "description": "Benefício 4 de Descendant of Vasantasena. Consulte o efeito em V5 básico, p. 399.",
        "system": "Destroy the Bond — V5 básico, p. 399. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 5,
        "name": "Camarilla",
        "description": "Benefício 5 de Descendant of Vasantasena. Consulte o efeito em V5 básico, p. 399.",
        "system": "Camarilla — V5 básico, p. 399. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      }
    ]
  },
  {
    "id": "v5-high-clan",
    "name": "Alto Clã",
    "description": "High Clan — V5 básico, p. 400. Tradução de trabalho; níveis comprados separadamente.",
    "levels": [
      {
        "level": 1,
        "name": "Peacock",
        "description": "Benefício 1 de High Clan. Consulte o efeito em V5 básico, p. 400.",
        "system": "Peacock — V5 básico, p. 400. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 2,
        "name": "Sway the Low",
        "description": "Benefício 2 de High Clan. Consulte o efeito em V5 básico, p. 400.",
        "system": "Sway the Low — V5 básico, p. 400. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 3,
        "name": "Elevate the Low",
        "description": "Benefício 3 de High Clan. Consulte o efeito em V5 básico, p. 400.",
        "system": "Elevate the Low — V5 básico, p. 400. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 4,
        "name": "Embraced to Rule",
        "description": "Benefício 4 de High Clan. Consulte o efeito em V5 básico, p. 400.",
        "system": "Embraced to Rule — V5 básico, p. 400. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 5,
        "name": "Blessed, not Cursed",
        "description": "Benefício 5 de High Clan. Consulte o efeito em V5 básico, p. 400.",
        "system": "Blessed, not Cursed — V5 básico, p. 400. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      }
    ]
  },
  {
    "id": "v5-low-clan",
    "name": "Baixo Clã",
    "description": "Low Clan — V5 básico, p. 401. Tradução de trabalho; níveis comprados separadamente.",
    "levels": [
      {
        "level": 1,
        "name": "Thick Hide",
        "description": "Benefício 1 de Low Clan. Consulte o efeito em V5 básico, p. 401.",
        "system": "Thick Hide — V5 básico, p. 401. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 2,
        "name": "Cursed with Pride",
        "description": "Benefício 2 de Low Clan. Consulte o efeito em V5 básico, p. 401.",
        "system": "Cursed with Pride — V5 básico, p. 401. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 3,
        "name": "Uncanny Kinship",
        "description": "Benefício 3 de Low Clan. Consulte o efeito em V5 básico, p. 401.",
        "system": "Uncanny Kinship — V5 básico, p. 401. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 4,
        "name": "Trade Among Equals",
        "description": "Benefício 4 de Low Clan. Consulte o efeito em V5 básico, p. 401.",
        "system": "Trade Among Equals — V5 básico, p. 401. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 5,
        "name": "Criticality Incident",
        "description": "Benefício 5 de Low Clan. Consulte o efeito em V5 básico, p. 401.",
        "system": "Criticality Incident — V5 básico, p. 401. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      }
    ]
  },
  {
    "id": "v5-ambrus-maropis",
    "name": "Ambrus Maropis",
    "description": "Ambrus Maropis — V5 básico, p. 402. Tradução de trabalho; níveis comprados separadamente.",
    "levels": [
      {
        "level": 1,
        "name": "True Believer",
        "description": "Benefício 1 de Ambrus Maropis. Consulte o efeito em V5 básico, p. 402.",
        "system": "True Believer — V5 básico, p. 402. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 2,
        "name": "Clandestine Information",
        "description": "Benefício 2 de Ambrus Maropis. Consulte o efeito em V5 básico, p. 402.",
        "system": "Clandestine Information — V5 básico, p. 402. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 3,
        "name": "Taught by the Best",
        "description": "Benefício 3 de Ambrus Maropis. Consulte o efeito em V5 básico, p. 402.",
        "system": "Taught by the Best — V5 básico, p. 402. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 4,
        "name": "Back Door Panopticon",
        "description": "Benefício 4 de Ambrus Maropis. Consulte o efeito em V5 básico, p. 402.",
        "system": "Back Door Panopticon — V5 básico, p. 402. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 5,
        "name": "Entirely",
        "description": "Benefício 5 de Ambrus Maropis. Consulte o efeito em V5 básico, p. 402.",
        "system": "Entirely — V5 básico, p. 402. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      }
    ]
  },
  {
    "id": "v5-carmelita-neillson",
    "name": "Carmelita Neillson",
    "description": "Carmelita Neillson — V5 básico, p. 403. Tradução de trabalho; níveis comprados separadamente.",
    "levels": [
      {
        "level": 1,
        "name": "The Art of Story",
        "description": "Benefício 1 de Carmelita Neillson. Consulte o efeito em V5 básico, p. 403.",
        "system": "The Art of Story — V5 básico, p. 403. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 2,
        "name": "The Art of Will",
        "description": "Benefício 2 de Carmelita Neillson. Consulte o efeito em V5 básico, p. 403.",
        "system": "The Art of Will — V5 básico, p. 403. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 3,
        "name": "Neillson Library",
        "description": "Benefício 3 de Carmelita Neillson. Consulte o efeito em V5 básico, p. 403.",
        "system": "Neillson Library — V5 básico, p. 403. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 4,
        "name": "Interview With the Methuselah",
        "description": "Benefício 4 de Carmelita Neillson. Consulte o efeito em V5 básico, p. 403.",
        "system": "Interview With the Methuselah — V5 básico, p. 403. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 5,
        "name": "Ancestor’s Tomb",
        "description": "Benefício 5 de Carmelita Neillson. Consulte o efeito em V5 básico, p. 403.",
        "system": "Ancestor’s Tomb — V5 básico, p. 403. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      }
    ]
  },
  {
    "id": "v5-fiorenza-savona",
    "name": "Fiorenza Savona",
    "description": "Fiorenza Savona — V5 básico, p. 404. Tradução de trabalho; níveis comprados separadamente.",
    "levels": [
      {
        "level": 1,
        "name": "On Fiorenza’s List",
        "description": "Benefício 1 de Fiorenza Savona. Consulte o efeito em V5 básico, p. 404.",
        "system": "On Fiorenza’s List — V5 básico, p. 404. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 2,
        "name": "Breakfast with Fiorenza",
        "description": "Benefício 2 de Fiorenza Savona. Consulte o efeito em V5 básico, p. 404.",
        "system": "Breakfast with Fiorenza — V5 básico, p. 404. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 3,
        "name": "Friendly Benefits",
        "description": "Benefício 3 de Fiorenza Savona. Consulte o efeito em V5 básico, p. 404.",
        "system": "Friendly Benefits — V5 básico, p. 404. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 4,
        "name": "The Directorate",
        "description": "Benefício 4 de Fiorenza Savona. Consulte o efeito em V5 básico, p. 404.",
        "system": "The Directorate — V5 básico, p. 404. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 5,
        "name": "Government Motion",
        "description": "Benefício 5 de Fiorenza Savona. Consulte o efeito em V5 básico, p. 404.",
        "system": "Government Motion — V5 básico, p. 404. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      }
    ]
  },
  {
    "id": "v5-karl-schrekt",
    "name": "Descendente de Karl Schrekt",
    "description": "Descendant of Karl Schrekt — V5 básico, p. 405. Tradução de trabalho; níveis comprados separadamente.",
    "allowedClans": [
      "tremere"
    ],
    "levels": [
      {
        "level": 1,
        "name": "Remember the House",
        "description": "Benefício 1 de Descendant of Karl Schrekt. Consulte o efeito em V5 básico, p. 405.",
        "system": "Remember the House — V5 básico, p. 405. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 2,
        "name": "Hardliner",
        "description": "Benefício 2 de Descendant of Karl Schrekt. Consulte o efeito em V5 básico, p. 405.",
        "system": "Hardliner — V5 básico, p. 405. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 3,
        "name": "Ritual Preparedness",
        "description": "Benefício 3 de Descendant of Karl Schrekt. Consulte o efeito em V5 básico, p. 405.",
        "system": "Ritual Preparedness — V5 básico, p. 405. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 4,
        "name": "Archon’s Bane",
        "description": "Benefício 4 de Descendant of Karl Schrekt. Consulte o efeito em V5 básico, p. 405.",
        "system": "Archon’s Bane — V5 básico, p. 405. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 5,
        "name": "Know the World",
        "description": "Benefício 5 de Descendant of Karl Schrekt. Consulte o efeito em V5 básico, p. 405.",
        "system": "Know the World — V5 básico, p. 405. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      }
    ]
  },
  {
    "id": "v5-xaviar",
    "name": "Descendente de Xaviar",
    "description": "Descendant of Xaviar — V5 básico, p. 406. Tradução de trabalho; níveis comprados separadamente.",
    "allowedClans": [
      "gangrel"
    ],
    "levels": [
      {
        "level": 1,
        "name": "Martyred Ancestor",
        "description": "Benefício 1 de Descendant of Xaviar. Consulte o efeito em V5 básico, p. 406.",
        "system": "Martyred Ancestor — V5 básico, p. 406. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 2,
        "name": "Where the Bodies Are Buried",
        "description": "Benefício 2 de Descendant of Xaviar. Consulte o efeito em V5 básico, p. 406.",
        "system": "Where the Bodies Are Buried — V5 básico, p. 406. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 3,
        "name": "Loyal Hound",
        "description": "Benefício 3 de Descendant of Xaviar. Consulte o efeito em V5 básico, p. 406.",
        "system": "Loyal Hound — V5 básico, p. 406. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 4,
        "name": "Monstrous Bat",
        "description": "Benefício 4 de Descendant of Xaviar. Consulte o efeito em V5 básico, p. 406.",
        "system": "Monstrous Bat — V5 básico, p. 406. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 5,
        "name": "Experienced the Antediluvian",
        "description": "Benefício 5 de Descendant of Xaviar. Consulte o efeito em V5 básico, p. 406.",
        "system": "Experienced the Antediluvian — V5 básico, p. 406. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      }
    ]
  }
] as Loresheet[]));
