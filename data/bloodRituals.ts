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
