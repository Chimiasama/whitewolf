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
