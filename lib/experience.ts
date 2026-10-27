import { Character } from "../types";
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
  if (
    !Number.isInteger(entry.amount) ||
    entry.amount <= 0 ||
    entry.amount > 100000 ||
    !entry.note.trim() ||
    entry.note.length > 1000 ||
    !/^\d{4}-\d{2}-\d{2}$/.test(entry.date)
  )
    throw new Error("Informe data, descrição e quantidade inteira positiva.");
  if (entry.kind === "spent" && entry.amount > experienceBalance(c))
    throw new Error("XP insuficiente para este gasto.");
  return { ...c, experience: [...(c.experience || []), entry] };
}
