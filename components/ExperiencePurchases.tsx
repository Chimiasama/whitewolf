import React, { useState } from "react";
import { Attribute, Character, Clan, GameType, Skill } from "../types";
import { useI18n } from "../lib/i18n";
import {
  fnGetAdvantagesAndFlaws,
  fnGetDisciplineDetails,
  fnGetLoresheets,
} from "../constants";
import { W5_GIFTS, W5_RITES } from "../data/w5";
import { INITIAL_BLOOD_RITUALS } from "../data/bloodRituals";
import { experienceBalance, experienceDate } from "../lib/experience";
import {
  PurchaseKind,
  PurchaseRequest,
  quotePurchase,
  purchaseWithExperience,
} from "../lib/advancement";
export type CharacterTransaction = (
  transform: (current: Character) => Character,
) => void;
export function ExperiencePurchases({
  character: c,
  onTransaction,
}: {
  character: Character;
  onTransaction: CharacterTransaction;
}) {
  const { t } = useI18n();
  const [kind, setKind] = useState<PurchaseKind>("attribute"),
    [key, setKey] = useState(""),
    [choice, setChoice] = useState(""),
    [note, setNote] = useState(""),
    [message, setMessage] = useState(""),
    [error, setError] = useState("");
  const wolf = c.gameType === GameType.Werewolf;
  if (!c.creationCompletedAt)
    return (
      <section className="rounded border border-gray-600 p-4 space-y-3">
        <h3 className="text-xl">Evoluir com XP</h3>
        <p>
          As compras ficam disponíveis após concluir a criação. Para uma ficha
          que já está em jogo, habilite a evolução abaixo.
        </p>
        <button
          type="button"
          className="rounded border p-3"
          onClick={() =>
            onTransaction((current) => ({
              ...current,
              creationCompletedAt: new Date().toISOString(),
            }))
          }
        >
          Esta ficha já está pronta: habilitar evolução
        </button>
      </section>
    );
  const categories: { id: PurchaseKind; label: string }[] = [
    { id: "attribute", label: "Atributo" },
    { id: "skill", label: "Perícia" },
    { id: "specialty", label: "Especialidade" },
    { id: "advantage", label: "Vantagem" },
    ...((wolf
      ? [
          { id: "renown", label: "Renome" },
          { id: "gift", label: "Dom" },
          { id: "rite", label: "Rito" },
        ]
      : [
          { id: "discipline", label: "Disciplina" },
          { id: "ritual", label: "Ritual de Sangue" },
          { id: "loresheet", label: "Loresheet" },
          { id: "bloodPotency", label: "Potência de Sangue" },
          { id: "humanity", label: "Humanidade" },
          ...(c.clan === Clan.ThinBlood ||
          c.advantages.some((a) => a.id === "alchemyexpert")
            ? [{ id: "formula", label: "Fórmula de Alquimia" }]
            : []),
        ]) as { id: PurchaseKind; label: string }[]),
  ];
  const disciplines = fnGetDisciplineDetails(t);
  let options: { id: string; name: string }[] = [];
  if (kind === "attribute" || kind === "skill" || kind === "specialty") {
    const attr = kind === "attribute",
      field = attr ? "attributes" : "skills";
    options = Object.values(attr ? Attribute : Skill)
      .filter((k) => kind !== "specialty" || c.skills[k] > 0)
      .map((k) => ({
        id: k,
        name: `${t(field + ".list." + k)} (${c[field][k]})`,
      }));
  } else if (kind === "advantage")
    options = fnGetAdvantagesAndFlaws(t, c.gameType)
      .filter((a) => a.type === "advantage")
      .map((a) => ({
        id: a.id,
        name: `${a.name} (${c.advantages.find((x) => x.id === a.id)?.cost || 0})`,
      }));
  else if (kind === "discipline")
    options = Object.entries(disciplines)
      .filter(([id]) =>
        c.clan === Clan.ThinBlood
          ? id === "thinbloodalchemy" ||
            (c.thinMerits?.includes("affinity") && (c.disciplines[id] || 0) > 0)
          : id !== "thinbloodalchemy" ||
            c.advantages.some((a) => a.id === "alchemyexpert"),
      )
      .map(([id, d]) => ({
        id,
        name: `${d.name} (${c.disciplines[id] || 0})`,
      }));
  else if (kind === "formula")
    options = [
      { id: "thinbloodalchemy", name: disciplines.thinbloodalchemy.name },
    ];
  else if (kind === "ritual")
    options = INITIAL_BLOOD_RITUALS.map((r) => ({ id: r.id, name: r.name }));
  else if (kind === "loresheet")
    options = fnGetLoresheets(t).flatMap((s) =>
      s.levels.map((l) => ({
        id: s.id + ":" + l.level,
        name: `${s.name} · ${l.level}: ${l.name}`,
      })),
    );
  else if (kind === "renown")
    options = ["glory", "honor", "wisdom"].map((id) => ({
      id,
      name: `${{ glory: "Glória", honor: "Honra", wisdom: "Sabedoria" }[id]} (${c.renown[id]})`,
    }));
  else if (kind === "gift")
    options = W5_GIFTS.filter(
      (g) =>
        g.origin === "native" ||
        g.owner === (g.origin === "tribe" ? c.tribe : c.auspice),
    ).map((g) => ({
      id: g.id,
      name: `${g.name} · Renome total ${g.totalRenown}`,
    }));
  else if (kind === "rite")
    options = W5_RITES.map((r) => ({ id: r.id, name: r.name }));
  else
    options = [
      { id: kind, name: categories.find((x) => x.id === kind)?.label || kind },
    ];
  const selected = options.some((o) => o.id === key)
    ? key
    : options[0]?.id || "";
  const [sheetId, sheetLevel] = selected.split(":");
  const request: PurchaseRequest = {
    kind,
    key: kind === "loresheet" ? sheetId : selected,
    ...(kind === "loresheet" ? { level: Number(sheetLevel) } : {}),
    ...(["discipline", "formula", "specialty", "loresheet"].includes(kind)
      ? { choice }
      : {}),
  };
  let quote: ReturnType<typeof quotePurchase> | undefined,
    reason = "";
  try {
    quote = quotePurchase(c, request, t);
  } catch (e) {
    reason = e instanceof Error ? e.message : "Compra indisponível.";
  }
  const balance = experienceBalance(c),
    powerOptions = ["discipline", "formula"].includes(kind)
      ? disciplines[selected]?.powers.filter(
          (p) =>
            !c.disciplinePowers[selected]?.includes(p.id) &&
            p.level <=
              (c.disciplines[selected] || 0) + (kind === "discipline" ? 1 : 0),
        ) || []
      : [];
  const change = () => {
    setChoice("");
    setError("");
    setMessage("");
  };
  return (
    <section
      aria-label="Compras com XP"
      className="rounded-lg border border-gray-600 p-4 space-y-4"
    >
      <h3 className="text-xl">Evoluir com XP</h3>
      <strong className="block">Disponível: {balance} XP</strong>
      <p className="text-sm text-gray-300">
        Compre um aumento por vez. O custo, a ficha e o histórico são
        atualizados juntos.
      </p>
      {!wolf &&
        c.advantages.some(
          (a) => a.id === "disciplinecompetence" && a.cost === 6,
        ) && (
          <label className="block">
            Disciplina tratada como do clã por Competência
            <select
              className="mt-2 block w-full rounded border border-gray-600 p-3"
              value={c.disciplineCompetence || ""}
              onChange={(e) => {
                if (e.target.value)
                  onTransaction((current) => ({
                    ...current,
                    disciplineCompetence: e.target.value,
                  }));
              }}
            >
              <option value="">Escolha a Disciplina do Mérito</option>
              {Object.entries(disciplines).map(([id, d]) => (
                <option key={id} value={id}>
                  {d.name}
                </option>
              ))}
            </select>
          </label>
        )}
      {c.loresheets.some((l) => l.id === "v5-helena" && l.level === 2) &&
        !c.loreChoices?.helenaTalent && (
          <label className="block">
            Perícia de Talento Verdadeiro
            <select
              className="mt-2 block w-full rounded border border-gray-600 p-3"
              value=""
              onChange={(e) => {
                if (e.target.value)
                  onTransaction((current) => ({
                    ...current,
                    loreChoices: {
                      ...current.loreChoices,
                      helenaTalent: e.target.value,
                    },
                  }));
              }}
            >
              <option value="">Escolha a Perícia do benefício</option>
              {["Craft", "Etiquette", "Performance"].map((id) => (
                <option key={id} value={id}>
                  {t("skills.list." + id)}
                </option>
              ))}
            </select>
          </label>
        )}
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (!quote) return;
          try {
            const receipt = {
              id: crypto.randomUUID(),
              date: experienceDate(),
              note,
              expectedToken: quote.token,
            };
            onTransaction((current) =>
              purchaseWithExperience(current, request, receipt, t),
            );
            setMessage(
              `Compra realizada: ${quote.label} · ${quote.cost} XP. Saldo: ${balance - quote.cost} XP.`,
            );
            setError("");
            setChoice("");
            setNote("");
          } catch (e) {
            setError(
              e instanceof Error ? e.message : "Não foi possível comprar.",
            );
            setMessage("");
          }
        }}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label>
            Tipo de compra
            <select
              className="mt-2 block w-full rounded border border-gray-600 p-3"
              value={kind}
              onChange={(e) => {
                setKind(e.target.value as PurchaseKind);
                setKey("");
                change();
              }}
            >
              {categories.map((k) => (
                <option key={k.id} value={k.id}>
                  {k.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            Característica ou benefício
            <select
              className="mt-2 block w-full rounded border border-gray-600 p-3"
              value={selected}
              onChange={(e) => {
                setKey(e.target.value);
                change();
              }}
            >
              {options.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        {["discipline", "formula"].includes(kind) && (
          <label className="block">
            {kind === "formula"
              ? "Fórmula adicional"
              : "Poder ou fórmula incluído no novo ponto"}
            <select
              className="mt-2 block w-full rounded border border-gray-600 p-3"
              value={choice}
              onChange={(e) => {
                setChoice(e.target.value);
                setError("");
                setMessage("");
              }}
            >
              <option value="">Escolha</option>
              {powerOptions.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} · nível {p.level}
                </option>
              ))}
            </select>
          </label>
        )}
        {kind === "loresheet" && selected === "v5-helena:2" && (
          <label className="block">
            Perícia de Talento Verdadeiro
            <select
              className="mt-2 block w-full rounded border border-gray-600 p-3"
              value={choice}
              onChange={(e) => setChoice(e.target.value)}
            >
              <option value="">Escolha</option>
              {["Craft", "Etiquette", "Performance"].map((id) => (
                <option key={id} value={id}>
                  {t("skills.list." + id)}
                </option>
              ))}
            </select>
          </label>
        )}
        {kind === "specialty" && (
          <label className="block">
            Nova especialidade
            <input
              className="mt-2 block w-full rounded border border-gray-600 p-3"
              value={choice}
              maxLength={100}
              onChange={(e) => {
                setChoice(e.target.value);
                setError("");
                setMessage("");
              }}
            />
          </label>
        )}
        {quote ? (
          <div
            aria-label="Prévia da compra"
            className="rounded border border-gray-600 p-4 space-y-2"
          >
            <strong className="block">{quote.label}</strong>
            <p>
              {[
                "attribute",
                "skill",
                "advantage",
                "discipline",
                "bloodPotency",
                "humanity",
                "renown",
              ].includes(kind)
                ? `Pontos: ${quote.from} → ${quote.to}`
                : kind === "gift"
                  ? `Dons conhecidos: ${quote.from} → ${quote.to}`
                  : kind === "loresheet"
                    ? `Nível independente: ${quote.to}`
                    : "Nova aquisição"}
            </p>
            <p className="text-lg font-semibold">{quote.formula}</p>
            <p>Saldo após a compra: {balance - quote.cost} XP</p>
            <small>{quote.reference}</small>
            {balance < quote.cost && (
              <p>XP insuficiente: faltam {quote.cost - balance} XP.</p>
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-300">{reason}</p>
        )}
        <details>
          <summary>Adicionar observação ao registro</summary>
          <label className="block mt-3">
            Observação da compra (opcional)
            <input
              className="mt-2 block w-full rounded border border-gray-600 p-3"
              value={note}
              maxLength={500}
              onChange={(e) => setNote(e.target.value)}
            />
          </label>
        </details>
        <button
          type="submit"
          disabled={!quote || balance < (quote?.cost || 0)}
          className="rounded border p-3 disabled:opacity-40"
        >
          {quote ? `Comprar por ${quote.cost} XP` : "Compra indisponível"}
        </button>
      </form>
      {message && <p role="status">{message}</p>}
      {error && <p role="alert">{error}</p>}
      <details className="text-sm text-gray-400">
        <summary>Sobre as regras</summary>
        <p>
          V5: básico, pp. 152, 244. W5: básico, pp. 110, 147. O Narrador confere
          condições de aprendizado, Vexame, acesso a benefícios e exceções da
          crônica. Sessão zero e justificativas não bloqueiam compras. Caern
          coletivo, rituais de suplementos e cerimônias ainda não têm catálogo
          completo aqui.
        </p>
      </details>
    </section>
  );
}
