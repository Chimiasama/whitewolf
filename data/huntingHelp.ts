/** Conferido nas transcrições V5 em docs/. Nomes pt-BR seguem o básico brasileiro.
 * As condições são resumos; os testes não alteram a ficha nem executam dados. */
export interface HuntingTest {
  pool: string;
  use: string;
  source: string;
}
export interface HuntingReferenceEntry {
  tests: HuntingTest[];
  source: string;
  community: boolean;
  note?: string;
  additionalTests?: HuntingTest[];
}
export const HUNTING_REFERENCES: Record<string, HuntingReferenceEntry> = {
  "alleycat": {
    "tests": [
      {
        "pool": "Força + Briga",
        "use": "Perseguir, subjugar e tomar sangue pela força ou ameaça.",
        "source": "V5 básico pt-BR, Paradas de Predador, pp. 307–308 (docs/Vampiro5edptbr)"
      },
      {
        "pool": "Raciocínio + Manha",
        "use": "Encontrar criminosos como vítimas, quando essa for sua forma de caçar.",
        "source": "V5 básico pt-BR, Paradas de Predador, pp. 307–308 (docs/Vampiro5edptbr)"
      }
    ],
    "source": "V5 básico pt-BR, Paradas de Predador, pp. 307–308 (docs/Vampiro5edptbr)",
    "community": false
  },
  "bagger": {
    "tests": [
      {
        "pool": "Inteligência + Manha",
        "use": "Localizar sangue armazenado ou obter acesso a sangue de mortos e moribundos, negociando com quem o possui.",
        "source": "V5 básico pt-BR, Paradas de Predador, pp. 307–308 (docs/Vampiro5edptbr)"
      }
    ],
    "source": "V5 básico pt-BR, Paradas de Predador, pp. 307–308 (docs/Vampiro5edptbr)",
    "community": false
  },
  "cleaver": {
    "tests": [
      {
        "pool": "Manipulação + Subterfúgio",
        "use": "Alimentar-se de familiares ou amigos e encobrir o ocorrido para manter o acesso a eles.",
        "source": "V5 básico pt-BR, Paradas de Predador, pp. 307–308 (docs/Vampiro5edptbr)"
      }
    ],
    "source": "V5 básico pt-BR, Paradas de Predador, pp. 307–308 (docs/Vampiro5edptbr)",
    "community": false
  },
  "consensualist": {
    "tests": [
      {
        "pool": "Manipulação + Persuasão",
        "use": "Conquistar o consentimento da vítima e manter uma relação que permita a alimentação.",
        "source": "V5 básico pt-BR, Paradas de Predador, pp. 307–308 (docs/Vampiro5edptbr)"
      }
    ],
    "source": "V5 básico pt-BR, Paradas de Predador, pp. 307–308 (docs/Vampiro5edptbr)",
    "community": false
  },
  "farmer": {
    "tests": [
      {
        "pool": "Autocontrole + Empatia com Animais",
        "use": "Encontrar e capturar um animal do qual se alimentar.",
        "source": "V5 básico pt-BR, Paradas de Predador, pp. 307–308 (docs/Vampiro5edptbr)"
      }
    ],
    "source": "V5 básico pt-BR, Paradas de Predador, pp. 307–308 (docs/Vampiro5edptbr)",
    "community": false
  },
  "bloodleech": {
    "tests": [
      {
        "pool": "Manipulação + Subterfúgio",
        "use": "Parada indicada para Sanguessuga no básico brasileiro, p. 307.",
        "source": "V5 básico pt-BR, Paradas de Predador, pp. 307–308 (docs/Vampiro5edptbr)"
      }
    ],
    "source": "V5 básico pt-BR, Paradas de Predador, pp. 307–308 (docs/Vampiro5edptbr)",
    "community": false,
    "note": "A alimentação de outros vampiros deve ser desenvolvida em cena: o próprio básico recomenda não reduzi-la a uma sequência de rolagens. A transcrição inglesa disponível usa Headhunter nesta seção e não apresenta uma parada; a combinação aqui segue explicitamente a edição brasileira."
  },
  "osiris": {
    "tests": [
      {
        "pool": "Manipulação + Subterfúgio",
        "use": "Obter sangue de fãs, fiéis ou de outro grupo que o admire.",
        "source": "V5 básico pt-BR, Paradas de Predador, pp. 307–308 (docs/Vampiro5edptbr)"
      },
      {
        "pool": "Intimidação + Fama",
        "use": "Coagir o grupo de admiradores. Esta combinação excepcional usa uma Habilidade e o Antecedente Fama, conforme o texto do básico.",
        "source": "V5 básico pt-BR, Paradas de Predador, pp. 307–308 (docs/Vampiro5edptbr)"
      }
    ],
    "source": "V5 básico pt-BR, Paradas de Predador, pp. 307–308 (docs/Vampiro5edptbr)",
    "community": false,
    "note": "A área que sustenta sua Fama pode ser Performance, Ciência, Ofícios, Erudição, Política ou outra apropriada. Isso contextualiza a Fama; não acrescenta automaticamente uma terceira Característica à parada."
  },
  "sandman": {
    "tests": [
      {
        "pool": "Destreza + Furtividade",
        "use": "Entrar onde a vítima dorme, alimentar-se sem acordá-la e sair discretamente.",
        "source": "V5 básico pt-BR, Paradas de Predador, pp. 307–308 (docs/Vampiro5edptbr)"
      }
    ],
    "source": "V5 básico pt-BR, Paradas de Predador, pp. 307–308 (docs/Vampiro5edptbr)",
    "community": false
  },
  "scenequeen": {
    "tests": [
      {
        "pool": "Manipulação + Persuasão",
        "use": "Usar seu status em uma subcultura para isolar a vítima e preservar a discrição após a alimentação.",
        "source": "V5 básico pt-BR, Paradas de Predador, pp. 307–308 (docs/Vampiro5edptbr)"
      }
    ],
    "source": "V5 básico pt-BR, Paradas de Predador, pp. 307–308 (docs/Vampiro5edptbr)",
    "community": false
  },
  "siren": {
    "tests": [
      {
        "pool": "Carisma + Subterfúgio",
        "use": "Seduzir a vítima e levá-la a um lugar reservado para se alimentar.",
        "source": "V5 básico pt-BR, Paradas de Predador, pp. 307–308 (docs/Vampiro5edptbr)"
      }
    ],
    "source": "V5 básico pt-BR, Paradas de Predador, pp. 307–308 (docs/Vampiro5edptbr)",
    "community": false
  },
  "extortionist": {
    "tests": [
      {
        "pool": "Força + Intimidação",
        "use": "Coagir pela ameaça física.",
        "source": "Vampire: The Masquerade Players Guide, p. 107 (docs/Vampire5edPlayersGuide01)"
      },
      {
        "pool": "Manipulação + Intimidação",
        "use": "Coagir por pressão e intimidação indiretas.",
        "source": "Vampire: The Masquerade Players Guide, p. 107 (docs/Vampire5edPlayersGuide01)"
      }
    ],
    "source": "Vampire: The Masquerade Players Guide, p. 107 (docs/Vampire5edPlayersGuide01)",
    "community": false,
    "note": "As mesmas alternativas constam de Cults of the Blood Gods, p. 150 (docs/Vampire5edCultsoftheBloddGods). Escolha a abordagem; não some Força e Manipulação juntas."
  },
  "graverobber": {
    "tests": [
      {
        "pool": "Determinação + Medicina",
        "use": "Procurar sangue em cadáveres.",
        "source": "Vampire: The Masquerade Players Guide, p. 108 (docs/Vampire5edPlayersGuide01)"
      },
      {
        "pool": "Manipulação + Sagacidade",
        "use": "Encontrar uma oportunidade de alimentação entre mortais vulneráveis, como pessoas enlutadas.",
        "source": "Vampire: The Masquerade Players Guide, p. 108 (docs/Vampire5edPlayersGuide01)"
      }
    ],
    "source": "Vampire: The Masquerade Players Guide, p. 108 (docs/Vampire5edPlayersGuide01)",
    "community": false,
    "note": "As mesmas paradas aparecem em Cults of the Blood Gods, pp. 150–151. Um cadáver frio pode saciar até 3 de Fome, sujeito às restrições de sangue armazenado; drenagem anterior ou partes ausentes reduzem a quantidade disponível."
  },
  "grimreaper": {
    "tests": [
      {
        "pool": "Inteligência + Percepção",
        "use": "Identificar pessoas próximas da morte.",
        "source": "Vampire: The Masquerade Players Guide, p. 108 (docs/Vampire5edPlayersGuide01)"
      },
      {
        "pool": "Inteligência + Medicina",
        "use": "Avaliar a condição médica de possíveis vítimas terminais.",
        "source": "Vampire: The Masquerade Players Guide, p. 108 (docs/Vampire5edPlayersGuide01)"
      }
    ],
    "source": "Vampire: The Masquerade Players Guide, p. 108 (docs/Vampire5edPlayersGuide01)",
    "community": false
  },
  "montero": {
    "tests": [
      {
        "pool": "Inteligência + Furtividade",
        "use": "Planejar a caçada com uma equipe experiente de servidores.",
        "source": "Vampire: The Masquerade Players Guide, p. 108 (docs/Vampire5edPlayersGuide01)"
      },
      {
        "pool": "Determinação + Furtividade",
        "use": "Esperar a vítima chegar quando já existe um plano bem ensaiado.",
        "source": "Vampire: The Masquerade Players Guide, p. 108 (docs/Vampire5edPlayersGuide01)"
      }
    ],
    "source": "Vampire: The Masquerade Players Guide, p. 108 (docs/Vampire5edPlayersGuide01)",
    "community": false
  },
  "pursuer": {
    "tests": [
      {
        "pool": "Inteligência + Investigação",
        "use": "Encontrar uma vítima cujo desaparecimento passe despercebido.",
        "source": "Vampire: The Masquerade Players Guide, pp. 108–109 (docs/Vampire5edPlayersGuide01)"
      },
      {
        "pool": "Vigor + Furtividade",
        "use": "Seguir a vítima por longos períodos sem ser percebido.",
        "source": "Vampire: The Masquerade Players Guide, pp. 108–109 (docs/Vampire5edPlayersGuide01)"
      }
    ],
    "source": "Vampire: The Masquerade Players Guide, pp. 108–109 (docs/Vampire5edPlayersGuide01)",
    "community": false
  },
  "trapdoor": {
    "tests": [
      {
        "pool": "Carisma + Furtividade",
        "use": "Atrair convidados que entram esperando uma experiência divertida.",
        "source": "Vampire: The Masquerade Players Guide, p. 109 (docs/Vampire5edPlayersGuide01)"
      },
      {
        "pool": "Destreza + Furtividade",
        "use": "Caçar invasores, exploradores urbanos ou pessoas de passagem.",
        "source": "Vampire: The Masquerade Players Guide, p. 109 (docs/Vampire5edPlayersGuide01)"
      }
    ],
    "source": "Vampire: The Masquerade Players Guide, p. 109 (docs/Vampire5edPlayersGuide01)",
    "community": false,
    "additionalTests": [
      {
        "pool": "Raciocínio + Percepção",
        "use": "Navegar pelo labirinto dentro do refúgio. Pode acrescentar os pontos de Refúgio como dados por conhecer o lugar. É um teste de navegação, não uma terceira parada de alimentação obrigatória.",
        "source": "Vampire: The Masquerade Players Guide, p. 109 (docs/Vampire5edPlayersGuide01)"
      }
    ]
  },
  "business_owner": {
    "tests": [
      {
        "pool": "Carisma + Persuasão",
        "use": "Conseguir acesso discreto a funcionários ou clientes do negócio.",
        "source": "Player’s Guide — Bully (material comunitário), p. 4 (docs/Vampire5edPlayersGuide02)"
      }
    ],
    "source": "Player’s Guide — Bully (material comunitário), p. 4 (docs/Vampire5edPlayersGuide02)",
    "community": true
  },
  "confidant": {
    "tests": [
      {
        "pool": "Autocontrole + Sagacidade",
        "use": "Aproveitar a confiança de quem procura conselhos ou apoio.",
        "source": "Player’s Guide — Bully (material comunitário), p. 4 (docs/Vampire5edPlayersGuide02)"
      }
    ],
    "source": "Player’s Guide — Bully (material comunitário), p. 4 (docs/Vampire5edPlayersGuide02)",
    "community": true
  },
  "corporate_leech": {
    "tests": [
      {
        "pool": "Manipulação + Etiqueta",
        "use": "Misturar-se ao ambiente corporativo para ter acesso aos trabalhadores.",
        "source": "Player’s Guide — Bully (material comunitário), p. 4 (docs/Vampire5edPlayersGuide02)"
      }
    ],
    "source": "Player’s Guide — Bully (material comunitário), p. 4 (docs/Vampire5edPlayersGuide02)",
    "community": true
  },
  "eat_the_rich": {
    "tests": [
      {
        "pool": "Força + Intimidação",
        "use": "Pressionar alvos da elite e transformar a ameaça em acesso ao sangue.",
        "source": "Player’s Guide — Bully (material comunitário), p. 4 (docs/Vampire5edPlayersGuide02)"
      }
    ],
    "source": "Player’s Guide — Bully (material comunitário), p. 4 (docs/Vampire5edPlayersGuide02)",
    "community": true
  },
  "hide_and_eat": {
    "tests": [
      {
        "pool": "Raciocínio + Furtividade",
        "use": "Esperar escondido pela oportunidade e desaparecer após a alimentação.",
        "source": "Player’s Guide — Bully (material comunitário), p. 5 (docs/Vampire5edPlayersGuide02)"
      }
    ],
    "source": "Player’s Guide — Bully (material comunitário), p. 5 (docs/Vampire5edPlayersGuide02)",
    "community": true
  },
  "kidnapper": {
    "tests": [
      {
        "pool": "Determinação + Investigação",
        "use": "Selecionar e acompanhar uma vítima para capturá-la e mantê-la acessível.",
        "source": "Player’s Guide — Bully (material comunitário), p. 5 (docs/Vampire5edPlayersGuide02)"
      }
    ],
    "source": "Player’s Guide — Bully (material comunitário), p. 5 (docs/Vampire5edPlayersGuide02)",
    "community": true
  },
  "lab_rat": {
    "tests": [
      {
        "pool": "Inteligência + Ciência",
        "use": "Obter sangue por meio de clínica, pesquisa ou experimentos.",
        "source": "Player’s Guide — Bully (material comunitário), p. 5 (docs/Vampire5edPlayersGuide02)"
      }
    ],
    "source": "Player’s Guide — Bully (material comunitário), p. 5 (docs/Vampire5edPlayersGuide02)",
    "community": true
  },
  "hospital_hunter": {
    "tests": [
      {
        "pool": "Inteligência + Medicina",
        "use": "Escolher pacientes e oportunidades de alimentação em ambiente hospitalar.",
        "source": "Player’s Guide — Bully (material comunitário), p. 5 (docs/Vampire5edPlayersGuide02)"
      }
    ],
    "source": "Player’s Guide — Bully (material comunitário), p. 5 (docs/Vampire5edPlayersGuide02)",
    "community": true
  },
  "local_haunt": {
    "tests": [
      {
        "pool": "Vigor + Atletismo",
        "use": "Caçar pessoas atraídas à área associada à sua lenda ou assombração.",
        "source": "Player’s Guide — Bully (material comunitário), p. 6 (docs/Vampire5edPlayersGuide02)"
      }
    ],
    "source": "Player’s Guide — Bully (material comunitário), p. 6 (docs/Vampire5edPlayersGuide02)",
    "community": true
  },
  "lurker_in_crowd": {
    "tests": [
      {
        "pool": "Raciocínio + Furtividade",
        "use": "Aproximar-se e alimentar-se sem se destacar na multidão.",
        "source": "Player’s Guide — Bully (material comunitário), p. 6 (docs/Vampire5edPlayersGuide02)"
      }
    ],
    "source": "Player’s Guide — Bully (material comunitário), p. 6 (docs/Vampire5edPlayersGuide02)",
    "community": true
  },
  "manic_pixie": {
    "tests": [
      {
        "pool": "Manipulação + Sagacidade",
        "use": "Explorar relações breves e intensas para manter uma fonte de sangue.",
        "source": "Player’s Guide — Bully (material comunitário), p. 6 (docs/Vampire5edPlayersGuide02)"
      }
    ],
    "source": "Player’s Guide — Bully (material comunitário), p. 6 (docs/Vampire5edPlayersGuide02)",
    "community": true
  },
  "online_predator": {
    "tests": [
      {
        "pool": "Determinação + Tecnologia",
        "use": "Localizar ou cultivar vítimas pela internet.",
        "source": "Player’s Guide — Bully (material comunitário), p. 6 (docs/Vampire5edPlayersGuide02)"
      }
    ],
    "source": "Player’s Guide — Bully (material comunitário), p. 6 (docs/Vampire5edPlayersGuide02)",
    "community": true
  },
  "opportunist": {
    "tests": [
      {
        "pool": "Carisma + Sagacidade",
        "use": "Atrair vítimas com promessas de oportunidades, produtos ou serviços.",
        "source": "Player’s Guide — Bully (material comunitário), p. 7 (docs/Vampire5edPlayersGuide02)"
      }
    ],
    "source": "Player’s Guide — Bully (material comunitário), p. 7 (docs/Vampire5edPlayersGuide02)",
    "community": true
  },
  "pack_hunter": {
    "tests": [
      {
        "pool": "Destreza + Briga",
        "use": "Caçar junto a animais predadores que o aceitam no grupo.",
        "source": "Player’s Guide — Bully (material comunitário), p. 7 (docs/Vampire5edPlayersGuide02)"
      }
    ],
    "source": "Player’s Guide — Bully (material comunitário), p. 7 (docs/Vampire5edPlayersGuide02)",
    "community": true
  },
  "pay_for_blood": {
    "tests": [
      {
        "pool": "Carisma + Finanças",
        "use": "Usar recursos e contatos financeiros para obter sangue.",
        "source": "Player’s Guide — Bully (material comunitário), p. 7 (docs/Vampire5edPlayersGuide02)"
      }
    ],
    "source": "Player’s Guide — Bully (material comunitário), p. 7 (docs/Vampire5edPlayersGuide02)",
    "community": true
  },
  "street_feeder": {
    "tests": [
      {
        "pool": "Vigor + Briga",
        "use": "Criar e aproveitar situações vulneráveis nas ruas.",
        "source": "Player’s Guide — Bully (material comunitário), p. 7 (docs/Vampire5edPlayersGuide02)"
      }
    ],
    "source": "Player’s Guide — Bully (material comunitário), p. 7 (docs/Vampire5edPlayersGuide02)",
    "community": true
  },
  "watcher_from_water": {
    "tests": [
      {
        "pool": "Destreza + Sobrevivência",
        "use": "Aguardar e capturar presas em ambientes aquáticos.",
        "source": "Player’s Guide — Bully (material comunitário), p. 8 (docs/Vampire5edPlayersGuide02)"
      }
    ],
    "source": "Player’s Guide — Bully (material comunitário), p. 8 (docs/Vampire5edPlayersGuide02)",
    "community": true
  },
  "wolfinsheepsclothing": {
    "tests": [
      {
        "pool": "Fortitude + Armas Brancas",
        "use": "Fingir vulnerabilidade e voltar-se contra quem tenta predá-lo.",
        "source": "Player’s Guide — Bully (material comunitário), p. 8 (docs/Vampire5edPlayersGuide02)"
      }
    ],
    "source": "Player’s Guide — Bully (material comunitário), p. 8 (docs/Vampire5edPlayersGuide02)",
    "community": true,
    "note": "A fonte comunitária indica Fortitude + Armas Brancas literalmente: Fortitude é uma Disciplina, não um Atributo. Não foi substituída por Força nem tratada como combinação padrão do básico."
  }
};

// Mantém a API usada pelas consultas existentes, com alternativas separadas.
export const HUNTING_POOLS: Record<string, string[]> = Object.fromEntries(
  Object.entries(HUNTING_REFERENCES).map(([id, entry]) => [id, entry.tests.map(test => test.pool)]),
);

export const HUNTING_RULES = 'Na resolução rápida, uma única rolagem pode cobrir encontrar a presa, obter acesso, alimentar-se e encobrir a saída. Compare os sucessos com a Dificuldade do território definida pelo Narrador. Se a caçada for encenada em detalhe, ele pede os testes adequados a cada ação. As paradas são indicações de abordagem, não uma obrigação de usar sempre o mesmo método. V5 básico pt-BR, pp. 306–308.';
export const HUNTING_STEPS = [
  'Escolha uma das abordagens abaixo. Some os pontos das duas Características indicadas: o total é a quantidade de d10, não um bônus somado ao resultado. Alternativas não são somadas entre si. Há exceções explicitadas, como Intimidação + Fama para Osíris.',
  'Aplique modificadores pertinentes e +1 dado se uma Especialização de Habilidade realmente se aplicar. Substitua dados comuns por Dados de Fome iguais à Fome atual, até o limite da parada; eles não são dados adicionais.',
  'Role os d10: resultados de 6 a 10 contam como sucessos; cada par de resultados 10 vale quatro sucessos ao todo. Compare o total com a Dificuldade, que é o número de sucessos exigidos. Dados de Fome podem causar Crítico Bestial ou Falha Bestial pelas regras normais.',
  'Uma vitória na caçada rápida significa que houve alimentação. Reduza a Fome conforme a fonte, a quantidade bebida e as restrições da Potência de Sangue, usando a Tabela de Alimentação (básico, p. 212). Três sucessos não significam automaticamente três pontos de Fome saciados.',
  'Se houver falha, a alimentação não está garantida. Um sucesso a um custo pode saciar a Fome e criar uma complicação, como testemunhas ou invasão de território. Não há um segundo teste de alimentação obrigatório nem uma Checagem de Sangue automática apenas por caçar; o uso de poderes pode ter seus próprios custos.',
];
export const HUNTING_APPROACHES: HuntingTest[] = [
  {pool:'Vigor + Atletismo',use:'Exemplo geral de perseguição pelo parque. Pode ser proposto quando combina com a cena, mesmo que não seja a parada habitual do tipo.',source:'V5 básico pt-BR, p. 306'},
  {pool:'Determinação + Furtividade',use:'Exemplo geral de espera em uma emboscada num beco. Depende da abordagem aceita pelo Narrador.',source:'V5 básico pt-BR, p. 306'},
];
export const OTHER_HUNTING_EXAMPLES: HuntingTest[] = [
  {pool:'Raciocínio + Investigação',use:'Caçada urbana em Gary, Dificuldade 4, no cenário Rusted Jungle. É uma regra contextual desse cenário, não uma substituição universal da parada de predador.',source:'Let the Streets Run Red, pp. 136–137 (docs/Vampire5edLettheStreetsRunRed)'},
  {pool:'Raciocínio + Empatia com Animais',use:'Outra parada indicada na seção de alimentação em Gary, Dificuldade 4. Aplicação dependente do cenário e da abordagem.',source:'Let the Streets Run Red, pp. 136–137 (docs/Vampire5edLettheStreetsRunRed)'},
  {pool:'Destreza + Condução ou Carisma + Condução',use:'Paradas próprias de Roadside Killer, tipo adicional de Let the Streets Run Red: recolher viajantes e pessoas sem destino. Referência complementar; esse tipo não integra o catálogo de criação atual.',source:'Let the Streets Run Red, pp. 75–76 (docs/Vampire5edLettheStreetsRunRed)'},
];

export const DOMAIN_HUNTING_NOTES: Record<string, string[]> = {
  extortionist:['Torres residenciais (Apartment Towers): +1 dado.'],
  alleycat:['Becos (Back Alleys): +1 dado.','Abrigo (Shelter): +1 dado; qualquer resultado 1 na parada indica sangue contaminado por drogas ou álcool.'],
  montero:['Becos (Back Alleys): +1 dado.','Vida noturna (Nightlife): +1 dado; qualquer resultado 1 na parada indica sangue contaminado por drogas ou álcool.'],
  bagger:['Instalação funerária (Funerary): +1 dado.','Hospital: +1 dado.'],
  graverobber:['Instalação funerária (Funerary): +1 dado.'],
  sandman:['Condomínio fechado (Gated Community): +1 dado depois de conseguir entrar.','Abrigo (Shelter): +1 dado; qualquer resultado 1 na parada indica sangue contaminado por drogas ou álcool.'],
  consensualist:['Hospital: +1 dado.'],
  grimreaper:['Hospital: +1 dado.'],
  trapdoor:['Hospital: +1 dado.','Vida noturna (Nightlife): +1 dado; qualquer resultado 1 na parada indica sangue contaminado por drogas ou álcool.'],
  pursuer:['Vida noturna (Nightlife): +1 dado; qualquer resultado 1 na parada indica sangue contaminado por drogas ou álcool.'],
  scenequeen:['Vida noturna (Nightlife): +1 dado; qualquer resultado 1 na parada indica sangue contaminado por drogas ou álcool.'],
  siren:['Vida noturna (Nightlife): +1 dado; qualquer resultado 1 na parada indica sangue contaminado por drogas ou álcool.'],
  farmer:['Marco cultural (Cultural Landmark): +1 dado se houver animais no local.'],
};
export const DOMAIN_HUNTING_SOURCE = 'Players Guide, Qualidades de Domínio, pp. 176–177 (docs/Vampire5edPlayersGuide01). Exigem a Qualidade correspondente no domínio: a mera existência de um hospital, beco ou abrigo não concede esses bônus. Não são novas paradas nem bônus automáticos por escolher um tipo de predador.';
