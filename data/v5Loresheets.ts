import { Clan, Loresheet } from "../types";
import references from "./v5LoresheetReferences.json";

/**
 * PT-BR corebook, pp. 382–406. Text restored from the supplied OCR and
 * cross-checked against the English corebook; editorial decisions are recorded
 * in docs/LORESHEET_REFERENCE.md. IDs remain stable for existing characters.
 */
export const V5_LORESHEETS: Loresheet[] = references.map((sheet) => ({
  id: sheet.id,
  name: sheet.name,
  description: sheet.description,
  allowedClans: sheet.allowedClans as Clan[] | undefined,
  levels: sheet.levels,
}));

export const LORESHEET_PURCHASE_RULE =
  "Cada benefício é independente: você pode comprar o de 2 pontos sem comprar o de 1. Comprar os dois custa 3 pontos. Na criação, o custo sai do mesmo orçamento de Vantagens e Antecedentes; não há uma reserva extra para Fichas de Conhecimento. A compra não concede os demais benefícios da ficha. Algumas fichas exigem um clã específico. Fonte: Vampiro: A Máscara — Livro Básico, 5ª edição, p. 190. Após a criação, cada benefício custa seu valor em pontos × 3 XP (p. 152).";

/** Includes regional Low Clans Brujah/Tremere; classification remains a chronicle decision. */
export const LOW_CLAN_DISCIPLINES = ['animalism','auspex','celerity','dominate','fortitude','obfuscate','potence','presence','protean','bloodsorcery'];
