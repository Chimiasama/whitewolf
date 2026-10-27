import { Character, GameType } from "../types";
import { playerIssues } from "./characterValidation";
export const CREATION_STEPS = [
  { id: "concept", label: "Identidade" },
  { id: "nature", label: "Natureza" },
  { id: "capacities", label: "Capacidades" },
  { id: "powers", label: "Poderes" },
  { id: "resources", label: "Vínculos e recursos" },
  { id: "sheet", label: "Revisão" },
];
export const REVIEW_STEP = CREATION_STEPS.length;
export function issueDestination(
  issue: string,
  c: Character,
): { step: number; panel?: string } {
  if (/nome|conceito|Ambição|Desejo/i.test(issue)) return { step: 1 };
  if (/Selecione.*(clã|tribo|augúrio)/i.test(issue)) return { step: 2 };
  if (/Atributos|Perícias|especialidade/i.test(issue))
    return {
      step: 3,
      panel: /especialidade/i.test(issue)
        ? "specialties"
        : /Atributos/.test(issue)
          ? "attributes"
          : "skills",
    };
  if (/Loresheet|Talento Verdadeiro/i.test(issue))return {step:5,panel:'loresheets'};
  if (/Convicção|Pilar/i.test(issue)) return {step:5,panel:'ties'};
  if (/Ritual de Sangue/i.test(issue)) return {step:4,panel:(c.disciplines.bloodsorcery||0)>0?'bloodrituals':'disciplines'};
  if (/Vantagens|Defeitos.*(pontos|adicionais)/i.test(issue))
    return { step: 5, panel: "advantages" };
  if (
    /Renome|Dom |Rito|poder|Disciplina|Sangue-Fraco|Maldição|Afinidade|Alquimista|predador|Fazendeiro|Ventrue|Potência/i.test(
      issue,
    )
  )
    return {
      step: 4,
      panel:
        c.gameType === GameType.Werewolf
          ? "wolf"
          : /Sangue-Fraco|Maldição|Afinidade|Alquimista/.test(issue)
            ? "thinblood"
            : /predador|Fazendeiro|Ventrue/.test(issue)
              ? "predator"
              : "disciplines",
    };
  return { step: 5 };
}
export const creationIssues = (c: Character) =>
  Array.from(new Set(playerIssues(c)));
