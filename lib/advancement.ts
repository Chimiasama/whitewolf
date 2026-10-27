import {LOW_CLAN_DISCIPLINES} from '../data/v5Loresheets';
import {OBLIVION_CEREMONIES} from '../data/oblivionCeremonies';
import {baneSeverity,hasAlternativeBane} from '../data/alternativeBanes';
import { Attribute, Character, Clan, GameType, Skill } from "../types";
import {
  fnGetAdvantagesAndFlaws,
  fnGetClanDetails,
  fnGetDisciplineDetails,
  fnGetLoresheets,
} from "../constants";
import { W5_GIFTS, W5_RITES, w5GiftIdentity } from "../data/w5";
import { BLOOD_RITUALS } from "../data/bloodRituals";
import { appendExperience, experienceBalance } from "./experience";

export type PurchaseKind =
  | "attribute"
  | "skill"
  | "specialty"
  | "advantage"
  | "loresheet"
  | "discipline"
  | "formula"
  | "ritual"
  | "ceremony"
  | "bloodPotency"
  | "humanity"
  | "renown"
  | "gift"
  | "rite";
export type PurchaseRequest = {
  kind: PurchaseKind;
  key: string;
  choice?: string;
  level?: number;
};
export type PurchaseQuote = {
  label: string;
  from: number;
  to: number;
  cost: number;
  formula: string;
  reference: string;
  token: string;
  patch: Partial<Character>;
};
type Translate = (key: string) => string;
const reject = (message: string): never => {
  throw new Error(message);
};
const rank = (current: number, max = 5) => {
  if (!Number.isInteger(current) || current < 0 || current >= max)
    reject(`Limite de ${max} atingido ou valor atual inválido.`);
  return current + 1;
};
export const giftIdentity = w5GiftIdentity;
export function bloodPotencyCap(generation: number) {
  return (
    (
      {
        4: 10,
        5: 9,
        6: 8,
        7: 7,
        8: 6,
        9: 5,
        10: 4,
        11: 4,
        12: 3,
        13: 3,
        14: 0,
        15: 0,
        16: 0,
      } as Record<number, number>
    )[generation] ?? 0
  );
}
export function quotePurchase(
  c: Character,
  r: PurchaseRequest,
  t: Translate = (k) => k,
): PurchaseQuote {
  if (!c.creationCompletedAt)
    reject("Conclua a criação ou habilite a evolução da ficha existente.");
  if (!Object.values(GameType).includes(c.gameType))
    reject("Escolha um jogo válido.");
  const wolf = c.gameType === GameType.Werewolf;
  const vOnly = [
    "discipline",
    "formula",
    "ritual",
    "ceremony",
    "bloodPotency",
    "humanity",
    "loresheet",
  ];
  const wOnly = ["renown", "gift", "rite"];
  if ((wolf && vOnly.includes(r.kind)) || (!wolf && wOnly.includes(r.kind)))
    reject("Esta compra pertence a outro jogo.");
  let label = "",
    from = 0,
    to = 1,
    cost = 0,
    formula = "",
    patch: Partial<Character> = {};
  let reference = wolf ? "W5, p. 110" : "V5, p. 152";
  const fast =
    !wolf && c.advantages.some((a) => a.id === "fastlearner" && a.cost === 5);
  const dotCost = (multiplier: number) => {
    cost = to * multiplier;
    formula = `${to} × ${multiplier} = ${cost} XP`;
  };
  if (r.kind === "attribute" || r.kind === "skill") {
    const attr = r.kind === "attribute",
      catalog = attr ? Attribute : Skill,
      field = attr ? "attributes" : "skills";
    if (!Object.values(catalog).includes(r.key as never))
      reject("Característica desconhecida.");
    from = c[field][r.key];
    to = rank(from);
    label = t(`${field}.list.${r.key}`);
    dotCost(attr ? (fast ? 4 : 5) : fast ? 2 : 3);
    patch = { [field]: { ...c[field], [r.key]: to } };
    if (fast) {
      reference = "Player’s Guide 02 (Bully), p. 11 — Fast Learner";
      formula += " · Aprendizado Rápido";
    }
    if (
      !attr &&
      c.loresheets.some((l) => l.id === "v5-helena" && l.level === 2) &&
      c.loreChoices?.helenaTalent === r.key
    ) {
      const normal = cost;
      cost = Math.floor(cost / 2);
      formula = `${normal} ÷ 2, arredondado para baixo = ${cost} XP · Talento Verdadeiro`;
      reference += "; V5, p. 391";
    }
  } else if (r.kind === "specialty") {
    if (
      !Object.values(Skill).includes(r.key as Skill) ||
      (c.skills[r.key] || 0) < 1
    )
      reject("Especialidade exige uma Perícia com pontos.");
    const name = r.choice?.trim();
    if (!name || name.length > 100)
      reject("Informe uma especialidade de até 100 caracteres.");
    if (
      c.specialties.some(
        (s) =>
          s.skill === r.key &&
          s.name.trim().toLocaleLowerCase("pt-BR") ===
            name.toLocaleLowerCase("pt-BR"),
      )
    )
      reject("Esta especialidade já foi adquirida.");
    label = `${t("skills.list." + r.key)}: ${name}`;
    cost = fast ? 2 : 3;
    formula = `Custo fixo: ${cost} XP`;
    patch = {
      specialties: [...c.specialties, { skill: r.key as Skill, name }],
    };
    if (fast) {
      reference = "Player’s Guide 02 (Bully), p. 11 — Fast Learner";
      formula += " · Aprendizado Rápido";
    }
  } else if (r.kind === "advantage") {
    const a = fnGetAdvantagesAndFlaws(t, c.gameType).find(
      (a) => a.id === r.key && a.type === "advantage",
    );
    if (!a) reject("Vantagem não encontrada no catálogo do jogo.");
    const owned = c.advantages.filter((x) => x.id === r.key);
    if (owned.length > 1)
      reject(
        "Consolide as entradas duplicadas desta Vantagem antes de evoluir.",
      );
    from = owned[0]?.cost || 0;
    const levels = a.levels || [a.cost];
    to =
      [...levels].sort((a, b) => a - b).find((n) => n > from) ??
      reject("Vantagem no nível máximo.");
    cost = (to - from) * 3;
    formula = `${to - from} ponto(s) × 3 = ${cost} XP`;
    if(c.clan===Clan.Hecata&&hasAlternativeBane(c)&&/^(retainers?|haven|resources)$/.test(r.key)){const surcharge=baneSeverity(c.bloodPotency);cost+=surcharge;formula+=` + ${surcharge} XP · Decomposição`;reference="Players Guide, p. 57";}
    label = a.name;
    patch = {
      advantages: [
        ...c.advantages.filter((x) => x.id !== r.key),
        { ...a, cost: to },
      ],
    };
  } else if (r.kind === "loresheet") {
    const sheet = fnGetLoresheets(t).find((x) => x.id === r.key),
      level = sheet?.levels.find((x) => x.level === r.level);
    if (!level) reject("Escolha um nível válido de Loresheet.");
    if (sheet.allowedClans && !sheet.allowedClans.includes(c.clan))
      reject("Esta Loresheet exige o clã indicado no livro.");
    if (
      r.key === "v5-helena" &&
      r.level === 2 &&
      !["Craft", "Etiquette", "Performance"].includes(r.choice)
    )
      reject(
        "Escolha Ofícios, Etiqueta ou Performance para Talento Verdadeiro.",
      );
    if (c.loresheets.some((x) => x.id === r.key && x.level === r.level))
      reject("Este nível de Loresheet já foi adquirido.");
    to = level.level;
    cost = to * 3;
    formula = `${to} pontos × 3 = ${cost} XP (nível independente)`;
    label = `${sheet.name}: ${level.name}`;
    reference =
      "V5, pp. 152, 190 — níveis de Loresheet são comprados separadamente";
    patch = {
      loresheets: [...c.loresheets, { id: r.key, level: to }],
      ...(r.key === "v5-helena" && r.level === 2
        ? { loreChoices: { ...c.loreChoices, helenaTalent: r.choice } }
        : {}),
    };
  } else if (r.kind === "discipline" || r.kind === "formula") {
    const details = fnGetDisciplineDetails(t),
      discipline = details[r.key];
    if (!discipline) reject("Disciplina desconhecida.");
    const alchemy = r.key === "thinbloodalchemy",
      thin = c.clan === Clan.ThinBlood;
    if (!c.clan) reject("Defina o clã antes de comprar Disciplinas.");
    if (
      alchemy &&
      !thin &&
      !c.advantages.some((a) => a.id === "alchemyexpert" && a.cost === 5)
    )
      reject(
        "Alquimia exige Sangue-Fraco ou o Mérito comunitário Alchemy Expert.",
      );
    if (
      thin &&
      !alchemy &&
      (!c.thinMerits?.includes("affinity") || !(c.disciplines[r.key] > 0))
    )
      reject(
        "Afinidade permite evoluir apenas a Disciplina permanente já escolhida.",
      );
    if (r.kind === "formula" && !alchemy)
      reject("Fórmulas pertencem à Alquimia de Sangue-Fraco.");
    from = c.disciplines[r.key] || 0;
    to = r.kind === "formula" ? from : rank(from);
    const ids = c.disciplinePowers[r.key] || [];
    if (!alchemy && ids.length !== from)
      reject(
        "Complete os poderes atuais da Disciplina antes de comprar outro ponto.",
      );
    const p = discipline.powers.find((p) => p.id === r.choice);
    if (!p || ids.includes(p.id) || p.level > to)
      reject(
        "Escolha um poder ou fórmula novo, do nível adquirido ou inferior.",
      );
    if (p.prerequisite && !ids.includes(p.prerequisite))
      reject("Falta o poder pré-requisito.");
    const newDisc = { ...c.disciplines, [r.key]: to };
    if (p.amalgam?.some((a) => (newDisc[a.discipline] || 0) < a.level))
      reject("Faltam pontos para o Amálgama deste poder.");
    const traded = c.loresheets.some(l=>l.id==="v5-low-clan"&&l.level===4)&&c.resourceChoices?.lowClanDiscipline===r.key&&LOW_CLAN_DISCIPLINES.includes(r.key);
    const favored = traded ||
      c.advantages.some(
        (a) => a.id === "disciplinecompetence" && a.cost === 6,
      ) && c.disciplineCompetence === r.key;
    const clan =
      fnGetClanDetails(t)[c.clan]?.disciplines.includes(r.key) || favored;
    if (r.kind === "formula") {
      cost = p.level * 3;
      formula = `Fórmula nível ${p.level} × 3 = ${cost} XP`;
      reference = "V5, pp. 152, 283";
    } else {
      dotCost(
        alchemy
          ? thin || favored
            ? 5
            : 7
          : favored
            ? 5
            : c.clan === Clan.Caitiff
              ? 6
              : clan
                ? 5
                : 7,
      );
      formula += alchemy
        ? thin || favored
          ? " · Alquimia (taxa de clã)"
          : " · Alchemy Expert (fora do clã)"
        : c.clan === Clan.Caitiff && !favored
          ? " · Caitiff"
          : clan
            ? " · do clã"
            : " · fora do clã";
    }
    if (favored && r.kind === "discipline") {
      formula += traded ? " · Comércio entre Iguais" : " · Competência em Disciplina";
      reference = traded ? "V5, p. 401 — Trade Among Equals" : "Player’s Guide 02 (Bully), seção Discipline Competence";
    }
    label = `${discipline.name}${r.kind === "discipline" ? ` ${from} → ${to}` : ""} · ${p.name}`;
    patch = {
      disciplines: newDisc,
      disciplinePowers: { ...c.disciplinePowers, [r.key]: [...ids, p.id] },
    };

    if (alchemy && !thin)
      reference =
        "Player’s Guide 02 (Bully), seção Supernatural — Alchemy Expert";
    if (alchemy && thin)
      reference =
        "V5, pp. 152, 283; Players Guide 01, seção Thin-Blood Alchemy (taxa de clã mesmo sem o Mérito)";
  } else if (r.kind === "ceremony") {
    const ceremony=OBLIVION_CEREMONIES.find(x=>x.id===r.key);
    if(!ceremony)reject("Cerimônia fora do catálogo.");
    if((c.disciplines.oblivion||0)<ceremony.level)reject("Cerimônia exige Oblívio do mesmo nível ou superior.");
    if(!c.disciplinePowers.oblivion?.includes(ceremony.prerequisite))reject("Falta o poder obrigatório desta Cerimônia.");
    if(c.rituals.some(x=>x.id===ceremony.id))reject("Cerimônia já adquirida.");
    to=ceremony.level;cost=to*3;formula=`Cerimônia nível ${to} × 3 = ${cost} XP`;
    label=ceremony.name;reference=ceremony.description;
    patch={rituals:[...c.rituals,{id:ceremony.id,name:ceremony.name,description:ceremony.description}]};
  } else if (r.kind === "ritual") {
    const ritual = BLOOD_RITUALS.find((x) => x.id === r.key);
    if (!ritual) reject("Ritual fora do catálogo revisado.");
    if ((c.disciplines.bloodsorcery || 0) < ritual.level)
      reject("Ritual exige Feitiçaria de Sangue do mesmo nível ou superior.");
    if (c.rituals.some((x) => x.id === r.key)) reject("Ritual já adquirido.");
    to = ritual.level;
    cost = to * 3;
    formula = `Ritual nível ${to} × 3 = ${cost} XP`;
    label = ritual.name;
    reference = ritual.reference;
    patch = {
      rituals: [
        ...c.rituals,
        { id: ritual.id, name: ritual.name, description: ritual.description },
      ],
    };
  } else if (r.kind === "bloodPotency" || r.kind === "humanity") {
    from = c[r.kind];
    to = rank(
      from,
      r.kind === "bloodPotency" ? bloodPotencyCap(c.generation) : 10,
    );
    dotCost(10);
    label = r.kind === "bloodPotency" ? "Potência de Sangue" : "Humanidade";
    patch = { [r.kind]: to };
    reference =
      r.kind === "bloodPotency" ? "V5, pp. 152, 214–216" : "V5, p. 242";
    if (c.clan === Clan.ThinBlood && r.kind === "bloodPotency")
      reject("Sangue-Fraco não aumenta Potência de Sangue por XP.");
  } else if (r.kind === "renown") {
    if (!["glory", "honor", "wisdom"].includes(r.key))
      reject("Tipo de Renome desconhecido.");
    from = c.renown[r.key];
    to = rank(from);
    dotCost(5);
    label = t("characterSheet." + r.key);
    patch = { renown: { ...c.renown, [r.key]: to } };
    reference = "W5, pp. 110, 143";
  } else if (r.kind === "gift") {
    const g = W5_GIFTS.find((g) => g.id === r.key);
    if (!g) reject("Dom fora do catálogo.");
    if (
      g.origin !== "native" &&
      g.owner !== (g.origin === "tribe" ? c.tribe : c.auspice)
    )
      reject("Dom exige a tribo ou o augúrio correspondente.");
    const total = c.renown.glory + c.renown.honor + c.renown.wisdom;
    const required=Math.min(...W5_GIFTS.filter(x=>giftIdentity(x.id)===giftIdentity(g.id)&&(x.origin==='native'||x.owner===(x.origin==='tribe'?c.tribe:c.auspice))).map(x=>x.totalRenown));
    if(total<required)reject(`Dom exige Renome total ${required}.`);
    if ((c.gifts || []).some((x) => giftIdentity(x.id) === giftIdentity(g.id)))
      reject("Este Dom já foi aprendido, inclusive por outro acesso.");
    from = new Set((c.gifts || []).map((g) => giftIdentity(g.id))).size;
    to = from + 1;
    dotCost(2);
    formula += ` · ${to}º Dom conhecido`;
    label = g.name;
    reference = "W5, pp. 110, 147";
    patch = { gifts: [...(c.gifts || []), { id: g.id, origin: g.origin }] };
  } else if (r.kind === "rite") {
    const rite = W5_RITES.find((x) => x.id === r.key);
    if (!rite) reject("Rito fora do catálogo.");
    if (c.rituals.some((x) => x.id === r.key)) reject("Rito já aprendido.");
    label = rite.name;
    cost = 5;
    formula = "Novo Rito: 5 XP";
    patch = { rituals: [...c.rituals, rite] };
  } else reject("Tipo de compra desconhecido.");
  if (!Number.isInteger(cost) || cost < 1) reject("Custo inválido.");
  if (
    (patch.advantages?.length || 0) > 300 ||
    (patch.loresheets?.length || 0) > 300 ||
    (patch.specialties?.length || 0) > 300 ||
    (patch.rituals?.length || 0) > 300 ||
    (patch.gifts?.length || 0) > 100
  )
    reject("Limite de registros desta característica atingido.");
  const token = JSON.stringify({ r, from, to, cost, patch });
  return { label, from, to, cost, formula, reference, token, patch };
}
export function purchaseWithExperience(
  c: Character,
  r: PurchaseRequest,
  receipt: { id: string; date: string; note: string; expectedToken: string },
  t?: Translate,
): Character {
  const q = quotePurchase(c, r, t);
  if (receipt.expectedToken !== q.token)
    reject("A ficha mudou. Confira novamente o custo antes de comprar.");
  if (experienceBalance(c) < q.cost)
    reject("XP insuficiente para esta compra.");
  // The new characteristic and debit form one immutable transaction; failure changes neither.
  return appendExperience(
    { ...c, ...q.patch },
    {
      id: receipt.id,
      date: receipt.date,
      kind: "spent",
      amount: q.cost,
      note: `${q.label}: ${q.formula}.${receipt.note.trim() ? " " + receipt.note.trim() : ""}`,
      purchase: {
        kind: r.kind,
        key: r.key,
        choice: r.choice,
        from: q.from,
        to: q.to,
        formula: q.formula,
        reference: q.reference,
      },
    },
  );
}
