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
        "description": "Uma pista por história sobre ações da Heresia.",
        "system": "Let He Who Hath Understanding — V5 básico, p. 384. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 2,
        "name": "Hand of the Heresy",
        "description": "Três pontos entre Aliados, Rebanho, Mawla e Lacaios, com as consequências do culto.",
        "system": "Hand of the Heresy — V5 básico, p. 384. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 3,
        "name": "Counter-Inquisition",
        "description": "Percebe Fé Verdadeira; o teste usa Determinação e o maior nível desta ficha.",
        "system": "Counter-Inquisition — V5 básico, p. 384. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 4,
        "name": "Red Celebrant",
        "description": "Conhece práticas para induzir êxtase religioso perigoso em uma congregação.",
        "system": "Red Celebrant — V5 básico, p. 384. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 5,
        "name": "The One Named in Prophecy",
        "description": "Ocupa uma posição essencial nas profecias da Heresia.",
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
        "description": "Recebe +1 dado em testes de Força de Vontade junto à Casa Carna.",
        "system": "Embrace the Vision — V5 básico, p. 385. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 2,
        "name": "The Rebel Trail",
        "description": "Pode testar Força de Vontade para evitar um Laço de Sangue nas condições indicadas.",
        "system": "The Rebel Trail — V5 básico, p. 385. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 3,
        "name": "Unorthodox Rituals",
        "description": "Conjura um ritual conhecido por história pagando o preço alternativo de Carna.",
        "system": "Unorthodox Rituals — V5 básico, p. 385. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 4,
        "name": "Reimagined Bond",
        "description": "Estende o vínculo ritual de Carna a parceiros, pelo prazo descrito.",
        "system": "Reimagined Bond — V5 básico, p. 385. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 5,
        "name": "Book of the Grave-War",
        "description": "A cópia do Livro concede um sucesso automático em pesquisas de Gehenna e ruptura de vínculos.",
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
        "description": "Solicita uma fonte de sangue específica uma vez por história.",
        "system": "Tap into the System — V5 básico, p. 386. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 2,
        "name": "Little Black Book",
        "description": "Registros de experiências reduzem o tempo de pesquisa alquímica, conforme a fórmula.",
        "system": "Little Black Book — V5 básico, p. 386. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 3,
        "name": "Farm Upstate",
        "description": "Conhece uma instalação com fontes valiosas de sangue.",
        "system": "Farm Upstate — V5 básico, p. 386. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 4,
        "name": "Secure Transit",
        "description": "Acesso a transporte protegido do Sistema Circulatório.",
        "system": "Secure Transit — V5 básico, p. 386. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 5,
        "name": "Blood Sommelier",
        "description": "Domina técnicas especiais de análise e preparação de sangue.",
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
        "description": "Uma informação histórica sobre a Convenção por história.",
        "system": "Thorns Historian — V5 básico, p. 387. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 2,
        "name": "Tradition Master",
        "description": "Conhece versões alternativas das Tradições e pode invocá-las nos limites do benefício.",
        "system": "Tradition Master — V5 básico, p. 387. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 3,
        "name": "Convention Secrets",
        "description": "Descobre propostas e pactos secretos da Convenção.",
        "system": "Convention Secrets — V5 básico, p. 387. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 4,
        "name": "Prospective Justicar",
        "description": "Apoio político para uma futura nomeação como Justicar.",
        "system": "Prospective Justicar — V5 básico, p. 387. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 5,
        "name": "New Traditions",
        "description": "Influencia a interpretação ou renovação de Tradições nas condições do benefício.",
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
        "description": "Uma informação sobre a Inquisição original por história.",
        "system": "Mistakes of the Past — V5 básico, p. 388. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 2,
        "name": "Names of the Guilty",
        "description": "Identifica um descendente de antigos colaboradores por história, se existir.",
        "system": "Names of the Guilty — V5 básico, p. 388. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 3,
        "name": "The Sect of St. James",
        "description": "Contato de quatro pontos no antigo círculo inquisitorial.",
        "system": "The Sect of St. James — V5 básico, p. 388. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 4,
        "name": "The Second Act",
        "description": "Contato informativo na Segunda Inquisição ou na arquidiocese.",
        "system": "The Second Act — V5 básico, p. 388. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 5,
        "name": "Black Spot",
        "description": "Um esconderijo faz perseguidores da Segunda Inquisição desistirem da busca uma vez por história.",
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
        "description": "Recebe orientação sobre ações que ameaçam o caminho para Golconda.",
        "system": "Seeds of Golconda — V5 básico, p. 389. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 2,
        "name": "The One True Way",
        "description": "O tratado oferece +3 dados em debates sociais sobre Golconda.",
        "system": "The One True Way — V5 básico, p. 389. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 3,
        "name": "Saulot’s Disciple",
        "description": "As práticas de Saulot permitem superar um teste de frenesi conforme a fonte.",
        "system": "Saulot’s Disciple — V5 básico, p. 389. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 4,
        "name": "Satisfy the Hunger",
        "description": "Reduz Fome em um, até o mínimo de um, uma vez por sessão.",
        "system": "Satisfy the Hunger — V5 básico, p. 389. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 5,
        "name": "Greet the Sun",
        "description": "Pode enfrentar o sol uma vez por história, seguido de frenesi de Fome ao despertar.",
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
        "description": "Uma informação por história sobre a guerra no domínio.",
        "system": "Survivor — V5 básico, p. 392. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 2,
        "name": "Active Participant",
        "description": "Reconhecimento e relações resultantes da participação na guerra.",
        "system": "Active Participant — V5 básico, p. 392. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 3,
        "name": "Trophy Kill",
        "description": "Reputação por destruir um vampiro notável, com inimigos associados.",
        "system": "Trophy Kill — V5 básico, p. 392. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 4,
        "name": "No Vampire’s Land",
        "description": "Conhecimento operacional de territórios devastados pela guerra.",
        "system": "No Vampire’s Land — V5 básico, p. 392. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 5,
        "name": "Sect Agitator",
        "description": "Recebe +2 dados em testes sociais para provocar tensão entre seitas.",
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
        "description": "Uma resposta histórica sobre Constantinopla por história.",
        "system": "Constantinople — V5 básico, p. 393. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 2,
        "name": "Antonius’ Architecture",
        "description": "Bônus político na administração do domínio e capacidade de mediar um debate por história.",
        "system": "Antonius’ Architecture — V5 básico, p. 393. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 3,
        "name": "The Dream",
        "description": "Percebe a Besta e pode ajudar outro vampiro a resistir ao frenesi.",
        "system": "The Dream — V5 básico, p. 393. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 4,
        "name": "The Dracon",
        "description": "O Dracon funciona como Mawla cinco para assuntos espirituais e Disciplinas.",
        "system": "The Dracon — V5 básico, p. 393. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 5,
        "name": "The New Trinity",
        "description": "Pode remover até cinco Máculas por história adquiridas na busca da Nova Trindade.",
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
        "description": "Entrada privilegiada e caça no Asylum nas condições do benefício.",
        "system": "Asylum Membership — V5 básico, p. 394. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 2,
        "name": "Performing Monkey",
        "description": "As irmãs oferecem tarefas perigosas e pagam os favores gerados.",
        "system": "Performing Monkey — V5 básico, p. 394. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 3,
        "name": "Jeanette’s Favorite",
        "description": "Proteção e hospitalidade de Jeanette nos clubes Asylum.",
        "system": "Jeanette’s Favorite — V5 básico, p. 394. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 4,
        "name": "Therese’s Favorite",
        "description": "Therese oferece influência e orientação financeira como Mawla três.",
        "system": "Therese’s Favorite — V5 básico, p. 394. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 5,
        "name": "Asylum Operator",
        "description": "A franquia concede quatro pontos entre os recursos autorizados enquanto funcionar.",
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
        "description": "Bônus de três dados para narrar a Semana dos Pesadelos.",
        "system": "Oral History — V5 básico, p. 395. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 2,
        "name": "Ravnos Remains",
        "description": "Relações com sobreviventes Ravnos, perigosas se descobertas.",
        "system": "Ravnos Remains — V5 básico, p. 395. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 3,
        "name": "I Was There",
        "description": "Reconhecimento por ter presenciado a catástrofe.",
        "system": "I Was There — V5 básico, p. 395. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 4,
        "name": "The Red Star",
        "description": "Contemplar a estrela oferece um dos efeitos temporários descritos.",
        "system": "The Red Star — V5 básico, p. 395. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 5,
        "name": "Blood of Zapathasura",
        "description": "Ligação excepcional ao sangue do Antediluviano Ravnos; aplicar as condições da fonte.",
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
        "description": "Pode repetir um teste de Perícia contra o establishment por história.",
        "system": "Newfound Rights — V5 básico, p. 396. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 2,
        "name": "Them and Theirs",
        "description": "Instinto de proteção aos grupos marginalizados nas condições da fonte.",
        "system": "Them and Theirs — V5 básico, p. 396. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 3,
        "name": "Gangrel Advocate",
        "description": "Bônus social com Gangrel e papel de porta-voz.",
        "system": "Gangrel Advocate — V5 básico, p. 396. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 4,
        "name": "The Bear Pack",
        "description": "Acesso a um grupo de Mawla combatentes e à reputação da alcateia.",
        "system": "The Bear Pack — V5 básico, p. 396. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 5,
        "name": "Rudi’s Army",
        "description": "Mobiliza uma rede de ativistas e aliados, sem controle absoluto.",
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
        "description": "Bônus ao incitar uma multidão mortal à violência por história.",
        "system": "Instigator — V5 básico, p. 397. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 2,
        "name": "Champion of the Cause",
        "description": "Prestígio e liderança em movimentos de rebelião.",
        "system": "Champion of the Cause — V5 básico, p. 397. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 3,
        "name": "Tyler’s Mercy",
        "description": "Pode encerrar um frenesi aceitando a Compulsão Brujah, uma vez por história.",
        "system": "Tyler’s Mercy — V5 básico, p. 397. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 4,
        "name": "The Furores",
        "description": "Integra a rede clandestina dos Furores.",
        "system": "The Furores — V5 básico, p. 397. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 5,
        "name": "Revolution",
        "description": "Pode desencadear uma revolução nas condições e com as consequências do benefício.",
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
        "description": "Dois pontos em melhorias autorizadas de segurança ou passagem do Refúgio.",
        "system": "Sanctuary — V5 básico, p. 398. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 2,
        "name": "Saboteur",
        "description": "Reconhece vulnerabilidades para derrubar construções com ferramentas e tempo.",
        "system": "Saboteur — V5 básico, p. 398. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 3,
        "name": "On Commission",
        "description": "Recebe serviços e favores por aconselhar a construção de Refúgios.",
        "system": "On Commission — V5 básico, p. 398. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 4,
        "name": "The Labyrinth",
        "description": "Conhece um labirinto subterrâneo onde perseguidores não conseguem acompanhá-lo.",
        "system": "The Labyrinth — V5 básico, p. 398. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 5,
        "name": "Sense the Ley Lines",
        "description": "Percebe linhas de poder e locais que alteram a progressão da Fome.",
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
        "description": "Repete um dado por sessão em uma situação caótica, sem gastar Força de Vontade.",
        "system": "Agent of Chaos — V5 básico, p. 399. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 2,
        "name": "Hear My Words",
        "description": "Conselhos em meio ao caos permitem uma repetição posterior de parada por história.",
        "system": "Hear My Words — V5 básico, p. 399. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 3,
        "name": "Scent the Bond",
        "description": "Detecta Laços com Determinação + Prontidão, dificuldade quatro, uma vez por história.",
        "system": "Scent the Bond — V5 básico, p. 399. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 4,
        "name": "Destroy the Bond",
        "description": "Pode romper um Laço ao beber vitae do servo e suportar um frenesi.",
        "system": "Destroy the Bond — V5 básico, p. 399. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 5,
        "name": "Sabbat Becomes Camarilla",
        "description": "Pode tentar libertar um vampiro da ideologia de uma seita com isolamento e testes prolongados.",
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
        "description": "Pode repetir um dado ao exigir deferência uma vez por sessão.",
        "system": "Peacock — V5 básico, p. 400. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 2,
        "name": "Sway the Low",
        "description": "Retinue de Mawla e bônus para comandá-la, com consequências em falhas totais.",
        "system": "Sway the Low — V5 básico, p. 400. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 3,
        "name": "Elevate the Low",
        "description": "Pode promover um Baixo Clã no domínio uma vez por crônica.",
        "system": "Elevate the Low — V5 básico, p. 400. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 4,
        "name": "Embraced to Rule",
        "description": "Bônus de Liderança e apoio político de membros dos Altos Clãs.",
        "system": "Embraced to Rule — V5 básico, p. 400. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 5,
        "name": "Blessed, not Cursed",
        "description": "Gasta uma Força de Vontade para ignorar a Maldição durante o uso permitido por sessão.",
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
        "description": "Ignora provocações verbais por uma cena uma vez por história.",
        "system": "Thick Hide — V5 básico, p. 401. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 2,
        "name": "Cursed with Pride",
        "description": "Um sucesso automático por história ao usar a Maldição em uma ação.",
        "system": "Cursed with Pride — V5 básico, p. 401. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 3,
        "name": "Uncanny Kinship",
        "description": "Três pontos entre Mawla e Status de outros Baixos Clãs.",
        "system": "Uncanny Kinship — V5 básico, p. 401. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 4,
        "name": "Trade Among Equals",
        "description": "Escolhe uma Disciplina de Baixo Clã e paga a taxa de clã para evoluí-la.",
        "system": "Trade Among Equals — V5 básico, p. 401. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 5,
        "name": "Criticality Incident",
        "description": "Bônus em projetos contra Altos Clãs e possibilidade de um golpe de alto custo.",
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
        "description": "Bônus para localizar esconderijos compartilhados compatíveis com suas alianças.",
        "system": "True Believer — V5 básico, p. 402. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 2,
        "name": "Clandestine Information",
        "description": "Uma informação online sobre mortais por história, recebida após a pesquisa.",
        "system": "Clandestine Information — V5 básico, p. 402. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 3,
        "name": "Taught by the Best",
        "description": "Ambrus funciona como Mawla três para informação e apoio tecnológico.",
        "system": "Taught by the Best — V5 básico, p. 402. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 4,
        "name": "Back Door Panopticon",
        "description": "Dois sucessos automáticos em uma investigação digital por história.",
        "system": "Back Door Panopticon — V5 básico, p. 402. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 5,
        "name": "On Another Grid Entirely",
        "description": "Duas Máscaras e proteção adicional contra pesquisa de sua identidade.",
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
        "description": "Histórias e lendas atraem a atenção dos Toreador.",
        "system": "The Art of Story — V5 básico, p. 403. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 2,
        "name": "The Art of Will",
        "description": "Meditar sobre a relíquia pode conceder Força de Vontade adicional ao despertar.",
        "system": "The Art of Will — V5 básico, p. 403. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 3,
        "name": "Neillson Library",
        "description": "Responsabilidade por uma biblioteca que também serve de Refúgio.",
        "system": "Neillson Library — V5 básico, p. 403. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 4,
        "name": "Interview With the Methuselah",
        "description": "Uma gravação permite obter um segredo sobre um clã por história.",
        "system": "Interview With the Methuselah — V5 básico, p. 403. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 5,
        "name": "Ancestor’s Tomb",
        "description": "Proteger uma tumba permite solicitar um grande favor por história.",
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
        "description": "Um lacaio talentoso auxilia você e informa Fiorenza.",
        "system": "On Fiorenza’s List — V5 básico, p. 404. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 2,
        "name": "Breakfast with Fiorenza",
        "description": "Uma reunião com Fiorenza por história.",
        "system": "Breakfast with Fiorenza — V5 básico, p. 404. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 3,
        "name": "Friendly Benefits",
        "description": "A amizade oferece apoio com as obrigações e limites descritos.",
        "system": "Friendly Benefits — V5 básico, p. 404. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 4,
        "name": "The Directorate",
        "description": "O Diretório propõe uma missão de subversão, com Laço e manipulação de memórias.",
        "system": "The Directorate — V5 básico, p. 404. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 5,
        "name": "Government Motion",
        "description": "Uma intervenção política por crônica concede dados às ações governamentais relevantes.",
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
        "description": "Uma informação sobre a Casa ou a história Tremere por história.",
        "system": "Remember the House — V5 básico, p. 405. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 2,
        "name": "Hardliner",
        "description": "Bônus para resistir a desviar-se dos objetivos de Schrekt, segundo a situação.",
        "system": "Hardliner — V5 básico, p. 405. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 3,
        "name": "Ritual Preparedness",
        "description": "Um ritual por história pode ser executado em cinco minutos graças à preparação anterior.",
        "system": "Ritual Preparedness — V5 básico, p. 405. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 4,
        "name": "Archon’s Bane",
        "description": "Um aliado sobrenatural de quatro pontos oferece apoio.",
        "system": "Archon’s Bane — V5 básico, p. 405. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 5,
        "name": "Know the World",
        "description": "Arquivos sobre outros seres sobrenaturais auxiliam a pesquisa.",
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
        "description": "Hospitalidade Gangrel e Status dois entre eles.",
        "system": "Martyred Ancestor — V5 básico, p. 406. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 2,
        "name": "Where the Bodies Are Buried",
        "description": "Detecta vampiros fundidos à terra com Determinação + Prontidão.",
        "system": "Where the Bodies Are Buried — V5 básico, p. 406. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 3,
        "name": "Loyal Hound",
        "description": "Quatro pontos entre Domínio, Rebanho e Status, vinculados à lealdade à Camarilla.",
        "system": "Loyal Hound — V5 básico, p. 406. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 4,
        "name": "Monstrous Bat",
        "description": "Assume uma forma de morcego monstruoso por história nas condições da fonte.",
        "system": "Monstrous Bat — V5 básico, p. 406. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      },
      {
        "level": 5,
        "name": "Experienced the Antediluvian",
        "description": "Uma conexão ao Antediluviano permite localizar Gangrel e alterar a Fome nas condições descritas.",
        "system": "Experienced the Antediluvian — V5 básico, p. 406. Benefícios situacionais, pontos concedidos e escolhas são resolvidos com o Narrador; não alteram outras características automaticamente."
      }
    ]
  }
] as Loresheet[]));

/** Includes regional Low Clans Brujah/Tremere; classification remains a chronicle decision. */
export const LOW_CLAN_DISCIPLINES=['animalism','auspex','celerity','dominate','fortitude','obfuscate','potence','presence','protean','bloodsorcery'];
