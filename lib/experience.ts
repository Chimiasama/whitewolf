import { Character } from "../types";
export const experienceDate = () =>
  new Intl.DateTimeFormat("sv-SE", { timeZone: "America/Sao_Paulo" }).format(
    new Date(),
  );
export function validExperienceDate(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value))
    return false;
  const date = new Date(value + "T00:00:00Z");
  return (
    !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
  );
}
export function experienceBalance(c: Character) {
  return (c.experience || []).reduce(
    (sum, e) => sum + (e.kind === "earned" ? e.amount : -e.amount),
    0,
  );
}
export function appendExperience(
  c: Character,
  entry: NonNullable<Character["experience"]>[number],
): Character {
  if ((c.experience || []).length >= 2000)
    throw new Error("Limite de registros atingido.");
  if (!entry.id || (c.experience || []).some((e) => e.id === entry.id))
    throw new Error("Registro de XP duplicado ou sem identificação.");
  if (!["earned", "spent"].includes(entry.kind))
    throw new Error("Tipo de movimentação inválido.");
  if (
    !Number.isInteger(entry.amount) ||
    entry.amount <= 0 ||
    entry.amount > 100000 ||
    !entry.note.trim() ||
    entry.note.length > 1000 ||
    !validExperienceDate(entry.date)
  )
    throw new Error("Informe data, descrição e quantidade inteira positiva.");
  if (entry.kind === "spent" && entry.amount > experienceBalance(c))
    throw new Error("XP insuficiente para este gasto.");
  return { ...c, experience: [...(c.experience || []), entry] };
}
