import { AdvantageFlaw, PredatorTypeDetail, Skill } from "../types";
import { resolvePredator } from "../lib/predatorRules";
const a = (
  id: string,
  name: string,
  cost: number,
  type: "advantage" | "flaw" = "advantage",
): AdvantageFlaw => ({
  id,
  name,
  cost,
  type,
  levels: [cost],
  description: name,
});
const f = (id: string, name: string, cost: number) => a(id, name, cost, "flaw");
const disciplines: Record<string, string[]> = {
  alleycat: ["celerity", "potence"],
  bagger: ["obfuscate", "bloodsorcery"],
  consensualist: ["auspex", "fortitude"],
  farmer: ["animalism", "protean"],
  osiris: ["presence", "bloodsorcery"],
  sandman: ["auspex", "obfuscate"],
  siren: ["fortitude", "presence"],
  business_owner: ["dominate", "presence"],
  confidant: ["oblivion", "presence"],
  corporate_leech: ["dominate", "obfuscate"],
  eat_the_rich: ["fortitude", "potence"],
  hide_and_eat: ["celerity", "obfuscate"],
  kidnapper: ["dominate", "potence"],
  lab_rat: ["bloodsorcery", "fortitude"],
  hospital_hunter: ["fortitude", "oblivion"],
  local_haunt: ["auspex", "protean"],
  lurker_in_crowd: ["auspex", "obfuscate"],
  manic_pixie: ["celerity", "presence"],
  online_predator: ["obfuscate", "presence"],
  opportunist: ["dominate", "presence"],
  pack_hunter: ["animalism", "protean"],
  pay_for_blood: ["dominate", "bloodsorcery"],
  street_feeder: ["obfuscate", "potence"],
  watcher_from_water: ["oblivion", "protean"],
  wolfinsheepsclothing: ["auspex", "fortitude"],
  bloodleech: ["celerity", "protean"],
  cleaver: ["dominate", "animalism"],
  scenequeen: ["dominate", "potence"],
  extortionist: ["dominate", "potence"],
  graverobber: ["fortitude", "oblivion"],
  grimreaper: ["auspex", "oblivion"],
  montero: ["dominate", "obfuscate"],
  pursuer: ["animalism", "auspex"],
  trapdoor: ["protean", "obfuscate"],
};
const spec = (skill: Skill, name: string) => ({ skill, name });
function entry(
  id: string,
  name: string,
  englishName: string,
  description: string,
  source: string,
  advantages: AdvantageFlaw[],
  flaws: AdvantageFlaw[],
  specialtyOptions: ReturnType<typeof spec>[],
  humanityModifier = 0,
): PredatorTypeDetail {
  return {
    id,
    name,
    englishName,
    description,
    source,
    advantages,
    flaws,
    specialtyOptions,
    specialties: [],
    humanityModifier,
    disciplineOptions: disciplines[id],
    disciplineAdd: { discipline: disciplines[id][0], dots: 1 },
  };
}
const core = "V5 básico, pp. 176–178 (docs/Vapire5edenglish)";
const guide = "Players Guide 01, pp. 107–109 (docs/Vampire5edPlayersGuide01)";
export function completePredators(
  existing: PredatorTypeDetail[],
): PredatorTypeDetail[] {
  const additions = [
    entry(
      "bloodleech",
      "Sanguessuga de Vampiros",
      "Blood Leech",
      "Alimenta-se de outros vampiros; aumenta a Potência de Sangue em 1.",
      core,
      [],
      [f("bloodleech_mortals", "Exclusão de Presa: mortais", 2)],
      [spec(Skill.Brawl, "Membros"), spec(Skill.Stealth, "Contra Membros")],
      -1,
    ),
    entry(
      "cleaver",
      "Domesticado",
      "Cleaver",
      "Alimenta-se de familiares ou amigos mantendo sua condição em segredo.",
      core,
      [a("cleaver_herd", "Rebanho", 2)],
      [f("cleaver_secret", "Segredo Sombrio: Domesticado", 1)],
      [
        spec(Skill.Persuasion, "Manipulação psicológica"),
        spec(Skill.Subterfuge, "Encobrimentos"),
      ],
    ),
    entry(
      "scenequeen",
      "Rainha da Cena",
      "Scene Queen",
      "Caça dentro de uma subcultura da qual participa.",
      core,
      [
        a("scenequeen_fame", "Fama", 1),
        a("scenequeen_contacts", "Contatos", 1),
      ],
      [],
      [
        spec(Skill.Etiquette, "Cena específica"),
        spec(Skill.Leadership, "Cena específica"),
        spec(Skill.Streetwise, "Cena específica"),
      ],
    ),
    entry(
      "extortionist",
      "Extorsionário",
      "Extortionist",
      "Obtém sangue por coerção ou em troca de proteção.",
      guide,
      [],
      [f("extortionist_enemy", "Inimigo: polícia ou vítima", 2)],
      [spec(Skill.Intimidation, "Coerção"), spec(Skill.Larceny, "Segurança")],
    ),
    entry(
      "graverobber",
      "Saqueador de Túmulos",
      "Graverobber",
      "Caça entre cadáveres recentes, enlutados e ambientes funerários.",
      guide,
      [
        a("graverobber_gullet", "Garganta de Ferro", 3),
        a("graverobber_haven", "Refúgio", 1),
      ],
      [f("graverobber_obvious", "Predador Óbvio", 2)],
      [
        spec(Skill.Occult, "Ritos funerários"),
        spec(Skill.Medicine, "Cadáveres"),
      ],
    ),
    entry(
      "grimreaper",
      "Ceifador",
      "Grim Reaper",
      "Alimenta-se apenas de pessoas próximas da morte.",
      guide,
      [],
      [f("grimreaper_exclusion", "Exclusão de Presa: mortais saudáveis", 1)],
      [spec(Skill.Awareness, "Morte"), spec(Skill.Larceny, "Falsificação")],
      1,
    ),
    entry(
      "montero",
      "Monteiro",
      "Montero",
      "Usa servidores para conduzir as presas à sua emboscada.",
      guide,
      [a("montero_retainers", "Servidores", 2)],
      [],
      [spec(Skill.Leadership, "Grupo de caça"), spec(Skill.Stealth, "Tocaia")],
      -1,
    ),
    entry(
      "pursuer",
      "Perseguidor",
      "Pursuer",
      "Estuda a rotina das vítimas antes de persegui-las.",
      guide,
      [
        a("pursuer_bloodhound", "Sabueso de Sangue", 1),
        a("pursuer_contacts", "Contatos", 1),
      ],
      [],
      [
        spec(Skill.Investigation, "Perfilamento"),
        spec(Skill.Stealth, "Seguir sem ser visto"),
      ],
      -1,
    ),
    entry(
      "trapdoor",
      "Armadilheiro",
      "Trapdoor",
      "Atrai as vítimas para um refúgio preparado como território de caça.",
      guide,
      [a("trapdoor_haven", "Refúgio", 1)],
      [],
      [
        spec(Skill.Persuasion, "Marketing"),
        spec(Skill.Stealth, "Emboscadas"),
        spec(Skill.Stealth, "Armadilhas"),
      ],
    ),
  ];
  return [...existing, ...additions].map((base) => {
    const english: Record<string, string> = {
      business_owner: "Business Owner",
      confidant: "Confidant",
      corporate_leech: "Corporate Leech",
      eat_the_rich: "Eat the Rich",
      hide_and_eat: "Hide and Eat",
      kidnapper: "Kidnapper",
      lab_rat: "Lab Rat",
      hospital_hunter: "Hospital Hunter",
      local_haunt: "Local Haunt",
      lurker_in_crowd: "Lurker in the Crowd",
      manic_pixie: "Manic Pixie Predator",
      online_predator: "Online Predator",
      opportunist: "Opportunist",
      pack_hunter: "Pack Hunter",
      pay_for_blood: "Pay for Blood",
      street_feeder: "Street Feeder",
      watcher_from_water: "Watcher from the Water",
      wolfinsheepsclothing: "Wolf in Sheep’s Clothing",
      alleycat: "Alleycat",
      bagger: "Bagger",
      consensualist: "Consensualist",
      farmer: "Farmer",
      osiris: "Osiris",
      sandman: "Sandman",
      siren: "Siren",
    };
    const p: PredatorTypeDetail = {
      ...base,
      englishName: base.englishName || english[base.id],
      disciplineOptions: disciplines[base.id],
      source:
        base.source ||
        ([
          "alleycat",
          "bagger",
          "consensualist",
          "farmer",
          "osiris",
          "sandman",
          "siren",
        ].includes(base.id)
          ? core
          : "Player's Guide 02 — Bully, pp. 4–8 (docs/Vampire5edPlayersGuide02)"),
      legacyBonusIds: [...base.advantages, ...base.flaws].map((a) => a.id),
    };
    if (!p.disciplineAdd)
      p.disciplineAdd = { discipline: p.disciplineOptions[0], dots: 1 };
    if (p.id === "bloodleech") {
      p.bloodPotencyModifier = 1;
      p.choices = [
        {
          id: "bloodleech_consequence",
          label: "Consequência da caça",
          type: "flaw",
          options: [
            f("bloodleech_diablerist", "Segredo Sombrio: Diablerista", 2),
            f("bloodleech_shunned", "Rejeitado", 2),
          ],
        },
      ];
    }
    if (p.id === "scenequeen")
      p.choices = [
        {
          id: "scenequeen_flaw",
          label: "Consequência social",
          type: "flaw",
          options: [
            f("scenequeen_disliked", "Malvisto fora da subcultura", 1),
            f("scenequeen_exclusion", "Exclusão de Presa: outra subcultura", 1),
          ],
        },
      ];
    if (p.id === "grimreaper")
      p.choices = [
        {
          id: "grimreaper_network",
          label: "Rede na comunidade médica",
          type: "advantage",
          options: [
            a("grimreaper_allies", "Aliados: comunidade médica", 1),
            a("grimreaper_influence", "Influência: comunidade médica", 1),
          ],
        },
      ];
    if (p.id === "trapdoor")
      p.choices = [
        {
          id: "trapdoor_background",
          label: "Apoio para a caça",
          type: "advantage",
          options: [
            a("trapdoor_retainers", "Servidores", 1),
            a("trapdoor_herd", "Rebanho", 1),
            a("trapdoor_second_haven", "Segundo ponto de Refúgio", 1),
          ],
        },
        {
          id: "trapdoor_flaw",
          label: "Defeito do Refúgio",
          type: "flaw",
          options: [
            f("trapdoor_creepy", "Refúgio: Assustador", 1),
            f("trapdoor_haunted", "Refúgio: Assombrado", 1),
          ],
        },
      ];
    if (p.id === "online_predator") {
      p.advantages = [a("online_mask", "Máscara", 2)];
      p.choices = [
        {
          id: "online_identity",
          label: "Proteção de identidade",
          type: "advantage",
          options: [
            a("online_zeroed", "Apagado", 1),
            a("online_cobbler", "Falsificador", 1),
          ],
        },
      ];
    }
    if (p.id === "osiris") {
      p.specialtyOptions = [
        spec(Skill.Occult, "Tradição específica"),
        spec(Skill.Performance, "Tipo de entretenimento"),
      ];
      p.advantages = [];
      p.flaws = [];
      p.allocations = [
        {
          id: "osiris_backgrounds",
          label: "Fama e Rebanho",
          total: 3,
          options: [
            a("fame_osiris", "Fama", 0),
            a("herd_osiris", "Rebanho", 0),
          ],
        },
        {
          id: "osiris_flaws",
          label: "Inimigos e Defeito Mítico",
          type: "flaw",
          total: 2,
          options: [
            f("enemy_osiris", "Inimigos", 0),
            f("osiris_mythic", "Defeito Mítico", 0),
          ],
        },
      ];
    }
    if (p.id === "extortionist" || p.id === "pay_for_blood") {
      p.advantages = [];
      p.allocations = [
        {
          id: p.id + "_backgrounds",
          label:
            p.id === "extortionist"
              ? "Contatos e Recursos"
              : "Recursos e Influência",
          total: 3,
          options:
            p.id === "extortionist"
              ? [
                  a("extortionist_contacts", "Contatos", 0),
                  a("extortionist_resources", "Recursos", 0),
                ]
              : [
                  a("pay_resources", "Recursos", 0),
                  a("pay_influence", "Influência", 0),
                ],
        },
      ];
    }
    p.fixedAdvantages = p.advantages;
    p.fixedFlaws = p.flaws;
    return resolvePredator(p);
  });
}
