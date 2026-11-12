import {Attribute, Skill, GameType} from '../types';
export interface NpcRole {role:string;attributes:Attribute[];skills:Skill[];predators:string[];disciplines:string[];motivations:string[];secrets:string[];relationships:string[];hooks:string[];}
/** Original story seeds, independent of clan/tribe stereotypes. */
export const NPC_ROLE_PROFILES = {
  "Vampire": [
    {
      "role": "Intermediário da corte",
      "attributes": [
        "Manipulation",
        "Charisma",
        "Composure"
      ],
      "skills": [
        "Etiquette",
        "Persuasion",
        "Politics",
        "Subterfuge",
        "Insight",
        "Finance",
        "Leadership",
        "Streetwise"
      ],
      "predators": [
        "siren",
        "osiris",
        "consensualist"
      ],
      "motivations": [
        "Tornar-se indispensável nas negociações do Elísio.",
        "Garantir um acordo que mantenha sua posição na corte.",
        "Livrar seu patrono de uma dívida politicamente perigosa."
      ],
      "secrets": [
        "Seu protetor também negocia com a facção rival.",
        "Prometeu a mesma informação a duas pessoas.",
        "Sua posição depende de uma testemunha desacreditada."
      ],
      "relationships": [
        "Precisa da coterie para negociar uma dívida.",
        "Oferece uma apresentação em troca de um favor discreto.",
        "Enxerga na coterie uma saída para um impasse diplomático."
      ],
      "hooks": [
        "Um credor exige pagamento durante uma recepção.",
        "Uma mensagem adulterada ameaça romper uma trégua.",
        "Um convidado desaparece antes de confirmar um acordo."
      ],
      "disciplines": [
        "dominate",
        "presence",
        "auspex",
        "obfuscate"
      ]
    },
    {
      "role": "Guardião de um culto",
      "attributes": [
        "Charisma",
        "Resolve",
        "Manipulation"
      ],
      "skills": [
        "Leadership",
        "Occult",
        "Persuasion",
        "Insight",
        "Subterfuge",
        "Etiquette",
        "Academics",
        "Awareness"
      ],
      "predators": [
        "osiris",
        "consensualist",
        "siren"
      ],
      "motivations": [
        "Preservar a comunidade que dá sentido à sua não vida.",
        "Reformar uma doutrina que coloca seus fiéis em risco.",
        "Impedir que outro Membro se aproprie de seu culto."
      ],
      "secrets": [
        "A doutrina protege um interesse pessoal inconfessável.",
        "Um antigo fiel conhece a origem mortal de seus milagres.",
        "Uma promessa religiosa esconde uma dívida de sangue."
      ],
      "relationships": [
        "Oferece abrigo em troca de silêncio.",
        "Precisa de ajuda para proteger um fiel perseguido.",
        "Vê a coterie como possível contrapeso a seu patrono."
      ],
      "hooks": [
        "Um fiel desaparece e deixa provas de alimentação indevida.",
        "Uma cerimônia é interrompida por uma acusação convincente.",
        "Uma relíquia do culto aparece nas mãos de um rival."
      ],
      "disciplines": [
        "presence",
        "dominate",
        "bloodsorcery",
        "oblivion"
      ]
    },
    {
      "role": "Organizador Anarquista",
      "attributes": [
        "Charisma",
        "Manipulation",
        "Resolve"
      ],
      "skills": [
        "Leadership",
        "Streetwise",
        "Persuasion",
        "Politics",
        "Insight",
        "Subterfuge",
        "Awareness",
        "Intimidation"
      ],
      "predators": [
        "consensualist",
        "osiris",
        "siren"
      ],
      "motivations": [
        "Manter o território e seus mortais longe da exploração.",
        "Construir uma aliança entre grupos Anarquistas rivais.",
        "Garantir que sua comunidade sobreviva à disputa pelo domínio."
      ],
      "secrets": [
        "Um antigo financiou sua ascensão.",
        "Uma vitória recente dependeu de um acordo com a Camarilla.",
        "Um aliado mortal conhece mais sobre a Máscara do que deveria."
      ],
      "relationships": [
        "É aliado útil, mas exige reciprocidade.",
        "Precisa que a coterie proteja uma reunião comunitária.",
        "Oferece acesso ao bairro em troca de uma negociação honesta."
      ],
      "hooks": [
        "Uma disputa territorial ameaça revelar a Máscara.",
        "Uma liderança desaparece na véspera de uma assembleia.",
        "Uma provocação ameaça transformar um protesto em confronto."
      ],
      "disciplines": [
        "presence",
        "dominate",
        "celerity",
        "potence"
      ]
    },
    {
      "role": "Manipulador da corte",
      "attributes": [
        "Manipulation",
        "Composure",
        "Charisma"
      ],
      "skills": [
        "Subterfuge",
        "Politics",
        "Persuasion",
        "Etiquette",
        "Insight",
        "Leadership",
        "Finance",
        "Awareness"
      ],
      "predators": [
        "siren",
        "osiris",
        "consensualist"
      ],
      "motivations": [
        "Controlar a sucessão de um cargo sem assumir o risco publicamente.",
        "Fazer adversários acreditarem que seu plano foi ideia deles.",
        "Construir uma rede de favores capaz de limitar o poder do Príncipe."
      ],
      "secrets": [
        "Uma chantagem sua se baseia em provas fabricadas.",
        "O principal adversário é também seu aliado secreto.",
        "Uma pessoa aparentemente irrelevante conhece toda a sua rede."
      ],
      "relationships": [
        "Tenta usar a coterie como intermediária descartável.",
        "Oferece uma informação verdadeira para comprar confiança.",
        "Precisa dos personagens para alcançar alguém fora da corte."
      ],
      "hooks": [
        "Uma gravação pode revelar quem plantou um boato.",
        "Dois rivais recebem convites para a mesma armadilha política.",
        "Uma peça de sua rede decide negociar diretamente com a coterie."
      ],
      "disciplines": [
        "dominate",
        "presence",
        "obfuscate",
        "auspex"
      ]
    },
    {
      "role": "Chefe de gangue",
      "attributes": [
        "Strength",
        "Stamina",
        "Charisma"
      ],
      "skills": [
        "Brawl",
        "Intimidation",
        "Leadership",
        "Melee",
        "Athletics",
        "Streetwise",
        "Firearms",
        "Awareness"
      ],
      "predators": [
        "alleycat",
        "bagger"
      ],
      "motivations": [
        "Manter o controle das ruas sem perder seus seguidores.",
        "Impedir que uma gangue rival tome suas rotas de alimentação.",
        "Transformar uma vitória violenta em poder duradouro."
      ],
      "secrets": [
        "Seu braço direito negocia uma saída com o inimigo.",
        "Uma dívida o obriga a proteger alguém que odeia.",
        "Sua fama esconde uma derrota que nunca foi explicada."
      ],
      "relationships": [
        "Oferece proteção em troca de lealdade concreta.",
        "Respeita a coterie por um favor que ninguém conhece.",
        "Desconfia dos personagens, mas precisa de mediadores."
      ],
      "hooks": [
        "Um confronto marca território na porta do refúgio.",
        "Uma entrega desaparece e todos exigem um culpado.",
        "Um subordinado provoca um inimigo muito mais poderoso."
      ],
      "disciplines": [
        "potence",
        "fortitude",
        "celerity",
        "protean"
      ]
    },
    {
      "role": "Espião das sombras",
      "attributes": [
        "Wits",
        "Dexterity",
        "Manipulation"
      ],
      "skills": [
        "Stealth",
        "Subterfuge",
        "Awareness",
        "Investigation",
        "Larceny",
        "Technology",
        "Insight",
        "Streetwise"
      ],
      "predators": [
        "sandman",
        "bagger"
      ],
      "motivations": [
        "Descobrir quem vende informações aos caçadores.",
        "Infiltrar uma rede rival antes que ela identifique seu patrono.",
        "Comprar liberdade reunindo segredos suficientes."
      ],
      "secrets": [
        "Também investiga quem o contratou.",
        "Sua identidade de cobertura tem laços afetivos reais.",
        "Uma fonte sua desapareceu depois de receber proteção."
      ],
      "relationships": [
        "Precisa da coterie para confirmar uma pista.",
        "Oferece vigilância em troca de acesso a um lugar restrito.",
        "Conhece um segredo dos personagens, mas prefere negociar."
      ],
      "hooks": [
        "Uma fonte deixa instruções para depois da própria morte.",
        "Um dossiê aparece com informações que ninguém deveria conhecer.",
        "Uma operação exige escolher entre a cobertura e uma vida."
      ],
      "disciplines": [
        "obfuscate",
        "auspex",
        "celerity",
        "dominate"
      ]
    },
    {
      "role": "Investigador da Máscara",
      "attributes": [
        "Wits",
        "Intelligence",
        "Resolve"
      ],
      "skills": [
        "Investigation",
        "Awareness",
        "Insight",
        "Technology",
        "Streetwise",
        "Academics",
        "Subterfuge",
        "Politics"
      ],
      "predators": [
        "sandman",
        "bagger"
      ],
      "motivations": [
        "Identificar a origem de vazamentos sobre os Membros.",
        "Resolver um desaparecimento que a corte quer esquecer.",
        "Desmontar uma investigação mortal sem criar novas vítimas."
      ],
      "secrets": [
        "Já apagou provas para proteger um culpado.",
        "O caso atual se conecta à própria família mortal.",
        "Seu informante mais confiável trabalha para dois lados."
      ],
      "relationships": [
        "Trata a coterie como testemunhas antes de vê-la como aliada.",
        "Oferece acesso às provas em troca de ajuda no campo.",
        "Precisa dos personagens para contestar uma conclusão oficial."
      ],
      "hooks": [
        "Uma câmera registra algo impossível e o vídeo desaparece.",
        "Uma testemunha descreve um Membro oficialmente morto.",
        "Um corpo compromete um acordo entre domínios."
      ],
      "disciplines": [
        "auspex",
        "obfuscate",
        "dominate",
        "celerity"
      ]
    },
    {
      "role": "Erudito do sangue",
      "attributes": [
        "Intelligence",
        "Resolve",
        "Wits"
      ],
      "skills": [
        "Occult",
        "Academics",
        "Investigation",
        "Medicine",
        "Awareness",
        "Insight",
        "Science",
        "Subterfuge"
      ],
      "predators": [
        "bagger",
        "consensualist",
        "sandman"
      ],
      "motivations": [
        "Decifrar um documento que contradiz a história de sua linhagem.",
        "Preservar conhecimentos ameaçados por uma guerra entre Membros.",
        "Compreender um fenômeno do sangue sem se tornar sua vítima."
      ],
      "secrets": [
        "Seu maior estudo usa uma fonte que deveria ter destruído.",
        "Um resultado importante foi falsificado para satisfazer um patrono.",
        "A pesquisa depende de um rival que todos julgam morto."
      ],
      "relationships": [
        "Oferece conhecimento em troca de trabalho de campo.",
        "Precisa da coterie para recuperar um documento.",
        "Reconhece nos personagens uma peça de um mistério antigo."
      ],
      "hooks": [
        "Um manuscrito muda de mãos durante um leilão clandestino.",
        "Uma amostra desaparece e deixa uma mensagem impossível.",
        "Um patrono exige a conclusão da pesquisa antes da hora."
      ],
      "disciplines": [
        "bloodsorcery",
        "auspex",
        "oblivion",
        "dominate"
      ]
    },
    {
      "role": "Artista do submundo",
      "attributes": [
        "Charisma",
        "Dexterity",
        "Manipulation"
      ],
      "skills": [
        "Performance",
        "Insight",
        "Persuasion",
        "Etiquette",
        "Craft",
        "Subterfuge",
        "Streetwise",
        "Awareness"
      ],
      "predators": [
        "siren",
        "osiris",
        "consensualist"
      ],
      "motivations": [
        "Criar uma obra que devolva significado à eternidade.",
        "Transformar seu espaço cultural em território neutro.",
        "Proteger uma comunidade artística usada como rebanho por um rival."
      ],
      "secrets": [
        "Uma obra famosa foi criada por alguém que desapareceu.",
        "Seu mecenas controla o destino de uma pessoa importante.",
        "Uma apresentação contém pistas de uma quebra da Máscara."
      ],
      "relationships": [
        "Oferece acesso ao circuito noturno em troca de proteção.",
        "Quer os personagens presentes numa estreia perigosa.",
        "Vê na coterie inspiração e possíveis patrocinadores."
      ],
      "hooks": [
        "Uma estreia reúne inimigos que prometeram não lutar.",
        "Um artista mortal reconhece um rosto que não envelhece.",
        "Uma obra roubada reaparece com uma alteração perturbadora."
      ],
      "disciplines": [
        "presence",
        "auspex",
        "celerity",
        "obfuscate"
      ]
    }
  ],
  "Werewolf": [
    {
      "role": "Defensor do território",
      "attributes": [
        "Stamina",
        "Strength",
        "Wits"
      ],
      "skills": [
        "Survival",
        "Awareness",
        "Brawl",
        "Athletics",
        "Intimidation",
        "Leadership",
        "Melee",
        "Investigation"
      ],
      "predators": [],
      "motivations": [
        "Proteger um lugar vivo e a comunidade ligada a ele.",
        "Impedir que o território seja fragmentado por uma obra.",
        "Manter uma passagem segura entre áreas ameaçadas."
      ],
      "secrets": [
        "Aceitou um pacto espiritual que não consegue cumprir sozinho.",
        "Ocultou um sinal de contaminação para evitar uma retirada.",
        "Uma antiga vitória deslocou o perigo para outro bairro."
      ],
      "relationships": [
        "Precisa da alcateia para enfrentar uma ameaça maior.",
        "Oferece abrigo se os personagens respeitarem os acordos locais.",
        "Desconfia dos recém-chegados, mas reconhece seu esforço."
      ],
      "hooks": [
        "Uma obra revela contaminação que também se manifesta na Umbra.",
        "Marcas estranhas aparecem nos limites do território.",
        "Uma comunidade pede proteção contra algo que não consegue descrever."
      ],
      "disciplines": []
    },
    {
      "role": "Mediador espiritual",
      "attributes": [
        "Resolve",
        "Charisma",
        "Intelligence"
      ],
      "skills": [
        "Occult",
        "Insight",
        "Persuasion",
        "Etiquette",
        "Awareness",
        "Academics",
        "Survival",
        "Leadership"
      ],
      "predators": [],
      "motivations": [
        "Reparar uma relação rompida entre pessoas, espíritos e território.",
        "Renovar um pacto espiritual sem repetir seus abusos.",
        "Evitar que a dor de um espírito se espalhe pela comunidade."
      ],
      "secrets": [
        "A solução anterior transferiu o sofrimento para outra comunidade.",
        "Não cumpriu a parte mais difícil de um pacto.",
        "Uma entidade que condena em público já lhe prestou ajuda."
      ],
      "relationships": [
        "Reconhece na alcateia uma chance de reparação.",
        "Precisa dos personagens como testemunhas de um novo acordo.",
        "Oferece orientação espiritual em troca de restituição concreta."
      ],
      "hooks": [
        "O espírito exige restituição, não um inimigo para matar.",
        "Uma oferenda desaparece e o pacto começa a falhar.",
        "Dois espíritos exigem compromissos que parecem incompatíveis."
      ],
      "disciplines": []
    },
    {
      "role": "Veterano em crise",
      "attributes": [
        "Resolve",
        "Stamina",
        "Composure"
      ],
      "skills": [
        "Insight",
        "Survival",
        "Awareness",
        "Leadership",
        "Brawl",
        "Occult",
        "Melee",
        "Persuasion"
      ],
      "predators": [],
      "motivations": [
        "Impedir que a nova geração repita uma vitória desastrosa.",
        "Encontrar um motivo para continuar lutando sem negar suas perdas.",
        "Transmitir o que aprendeu antes de abandonar suas responsabilidades."
      ],
      "secrets": [
        "Seu feito mais celebrado causou a perda de um Pilar.",
        "Nunca revelou quem salvou sua vida na última batalha.",
        "Teme reconhecer sinais de Harano em si mesmo."
      ],
      "relationships": [
        "Pode orientar a alcateia, mas precisa recuperar confiança.",
        "Pede aos personagens que verifiquem uma suspeita antiga.",
        "Vê nos recém-chegados uma chance de fazer diferente."
      ],
      "hooks": [
        "O patrono cobra uma resposta que ameaça seus limites.",
        "Um sobrevivente contradiz a versão oficial de uma batalha.",
        "Um antigo companheiro retorna com um pedido impossível."
      ],
      "disciplines": []
    },
    {
      "role": "Líder de guerra",
      "attributes": [
        "Strength",
        "Stamina",
        "Resolve"
      ],
      "skills": [
        "Brawl",
        "Leadership",
        "Melee",
        "Athletics",
        "Intimidation",
        "Survival",
        "Awareness",
        "Firearms"
      ],
      "predators": [],
      "motivations": [
        "Preparar uma ofensiva que não sacrifique a comunidade.",
        "Derrotar uma ameaça antes que ela isole as alcateias.",
        "Transformar grupos rivais numa frente capaz de sobreviver."
      ],
      "secrets": [
        "Uma ordem antiga custou mais vidas do que admitiu.",
        "Seu plano depende de um aliado que não confia nele.",
        "Está escondendo uma limitação que compromete o combate."
      ],
      "relationships": [
        "Precisa da alcateia para uma missão de reconhecimento.",
        "Respeita os personagens, mas espera disciplina sob pressão.",
        "Oferece apoio se houver um plano de retirada viável."
      ],
      "hooks": [
        "Uma oportunidade de ataque surge junto com um pedido de resgate.",
        "Uma rota de evacuação é comprometida.",
        "Um subordinado quer resolver uma disputa por conta própria."
      ],
      "disciplines": []
    },
    {
      "role": "Infiltrador urbano",
      "attributes": [
        "Dexterity",
        "Wits",
        "Manipulation"
      ],
      "skills": [
        "Stealth",
        "Technology",
        "Larceny",
        "Subterfuge",
        "Investigation",
        "Awareness",
        "Streetwise",
        "Drive"
      ],
      "predators": [],
      "motivations": [
        "Expor uma empresa que destrói o território por dentro.",
        "Encontrar a ligação entre um laboratório e a contaminação local.",
        "Sabotar uma operação sem prejudicar os trabalhadores."
      ],
      "secrets": [
        "Sua identidade de cobertura depende de um inocente.",
        "Uma sabotagem anterior feriu quem tentava proteger.",
        "Alguém na empresa reconheceu sua ligação com a alcateia."
      ],
      "relationships": [
        "Precisa de apoio quando uma infiltração foge ao plano.",
        "Oferece documentos se os personagens protegerem sua fonte.",
        "Pede ajuda para retirar alguém de uma área monitorada."
      ],
      "hooks": [
        "Um arquivo será apagado durante uma troca de turno.",
        "Uma credencial roubada abre uma oportunidade curta.",
        "Uma fonte aceita falar, mas exige a retirada de sua família."
      ],
      "disciplines": []
    },
    {
      "role": "Investigador da Wyrm",
      "attributes": [
        "Intelligence",
        "Wits",
        "Resolve"
      ],
      "skills": [
        "Investigation",
        "Science",
        "Awareness",
        "Occult",
        "Technology",
        "Medicine",
        "Insight",
        "Survival"
      ],
      "predators": [],
      "motivations": [
        "Rastrear a origem de uma contaminação que muda de lugar.",
        "Relacionar desaparecimentos a um empreendimento respeitável.",
        "Reunir provas que permitam agir sem atingir inocentes."
      ],
      "secrets": [
        "Descartou uma pista por ela comprometer um aliado.",
        "Sua fonte principal omite uma parte essencial da história.",
        "Um resultado anterior foi manipulado por terceiros."
      ],
      "relationships": [
        "Precisa da alcateia para investigar um local perigoso.",
        "Oferece uma hipótese, mas pede que os personagens a contestem.",
        "Vê nos personagens acesso a testemunhas que não o recebem."
      ],
      "hooks": [
        "A água de um bairro começa a afetar também seus espíritos.",
        "Três testemunhas descrevem a mesma figura em lugares diferentes.",
        "Uma amostra desaparece antes da análise final."
      ],
      "disciplines": []
    },
    {
      "role": "Guardião da memória",
      "attributes": [
        "Charisma",
        "Intelligence",
        "Resolve"
      ],
      "skills": [
        "Performance",
        "Academics",
        "Occult",
        "Insight",
        "Leadership",
        "Persuasion",
        "Awareness",
        "Survival"
      ],
      "predators": [],
      "motivations": [
        "Preservar uma história que os vencedores tentam apagar.",
        "Reunir versões de um pacto antes que seus últimos guardiões morram.",
        "Devolver voz a uma comunidade esquecida pelas alcateias."
      ],
      "secrets": [
        "Uma canção sua suaviza a culpa de alguém poderoso.",
        "Escondeu um testemunho para preservar uma aliança.",
        "Uma história de sua família contradiz sua reputação."
      ],
      "relationships": [
        "Pede à alcateia que escute antes de decidir.",
        "Oferece uma história capaz de esclarecer um conflito atual.",
        "Precisa de escolta para ouvir uma testemunha distante."
      ],
      "hooks": [
        "Uma gravação antiga contém o nome de um traidor.",
        "Um rito exige uma história cuja versão foi alterada.",
        "Uma pessoa pede que seu relato seja ouvido antes da próxima lua."
      ],
      "disciplines": []
    },
    {
      "role": "Cuidador da comunidade",
      "attributes": [
        "Composure",
        "Intelligence",
        "Charisma"
      ],
      "skills": [
        "Medicine",
        "Insight",
        "Persuasion",
        "Survival",
        "Awareness",
        "Science",
        "Leadership",
        "Craft"
      ],
      "predators": [],
      "motivations": [
        "Manter uma rede de cuidado num território sob pressão.",
        "Ajudar os sobreviventes de um desastre sem esconder suas causas.",
        "Reconstruir a confiança entre a alcateia e seus Pilares."
      ],
      "secrets": [
        "Ocultou o estado de um aliado para poupá-lo de julgamento.",
        "Aceitou recursos de uma origem que agora exige retorno.",
        "Uma pessoa sob seus cuidados conhece um segredo perigoso."
      ],
      "relationships": [
        "Oferece cuidado em troca de ajuda concreta à comunidade.",
        "Precisa dos personagens para buscar alguém isolado.",
        "Confia na alcateia, mas rejeita soluções que tratem pessoas como custo."
      ],
      "hooks": [
        "Um abrigo perde recursos na véspera de uma emergência.",
        "Uma família pede notícias de alguém que teme os Garou.",
        "Um paciente revela um padrão por trás de vários acidentes."
      ],
      "disciplines": []
    },
    {
      "role": "Emissário entre alcateias",
      "attributes": [
        "Charisma",
        "Composure",
        "Manipulation"
      ],
      "skills": [
        "Persuasion",
        "Etiquette",
        "Insight",
        "Politics",
        "Leadership",
        "Subterfuge",
        "Streetwise",
        "Awareness"
      ],
      "predators": [],
      "motivations": [
        "Construir um acordo duradouro entre territórios rivais.",
        "Garantir passagem para refugiados sem provocar outra disputa.",
        "Unir alcateias que só conhecem a pior versão umas das outras."
      ],
      "secrets": [
        "Uma negociação anterior foi sustentada por uma meia verdade.",
        "Uma dívida pessoal interfere em sua aparente neutralidade.",
        "Oculta uma proposta que poderia dividir seus aliados."
      ],
      "relationships": [
        "Pede à alcateia que seja garantia de um encontro.",
        "Oferece contatos se os personagens evitarem uma provocação.",
        "Precisa de uma voz de fora para destravar a negociação."
      ],
      "hooks": [
        "Uma mensagem truncada parece anunciar uma agressão.",
        "Os representantes chegam com versões opostas do acordo.",
        "Um pedido de passagem coincide com um desaparecimento."
      ],
      "disciplines": []
    }
  ]
} as Record<GameType,NpcRole[]>;
