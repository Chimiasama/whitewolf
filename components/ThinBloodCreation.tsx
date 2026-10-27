import React from "react";
import { Character, Clan } from "../types";
import { THIN_MERITS, THIN_FLAWS } from "../data/thinBlood";
import { CatalogPicker } from "./CatalogPicker";
export function ThinBloodCreation({
  character: c,
  onChange,
}: {
  character: Character;
  onChange: (key: keyof Character, value: any) => void;
}) {
  const conflict = {
    lifelike: "dead",
    resilience: "frailty",
    anarch: "shunned",
  };
  return (
    <section className="space-y-6">
      <p className="text-sm text-gray-300">
        Escolha 1–3 Méritos e o mesmo número de Defeitos. Essas escolhas não
        gastam os pontos comuns.
      </p>
      <p className="rounded bg-gray-900 p-3">
        {c.thinMerits?.length || 0} Méritos / {c.thinFlaws?.length || 0}{" "}
        Defeitos
      </p>
      {(
        [
          ["thinMerits", THIN_MERITS, "Méritos de Sangue-Fraco"],
          ["thinFlaws", THIN_FLAWS, "Defeitos de Sangue-Fraco"],
        ] as const
      ).map(([key, catalog, label]) => (
        <CatalogPicker
          key={key}
          label={label}
          multiple
          selected={c[key] || []}
          options={Object.entries(catalog).map(([id, name]) => ({
            id,
            name,
            summary:
              "Escolha específica de Sangue-Fraco; não custa pontos comuns.",
            details: (
              <p>
                V5, pp. 182–184. Nome em português de trabalho; consulte o
                efeito completo no livro.
              </p>
            ),
            unavailable:
              (c[key] || []).length >= 3 && !(c[key] || []).includes(id)
                ? "Você já escolheu o máximo de 3."
                : Object.entries(conflict).some(([m, f]) =>
                      key === "thinMerits"
                        ? m === id && c.thinFlaws?.includes(f)
                        : f === id && c.thinMerits?.includes(m),
                    )
                  ? "Incompatível com uma escolha atual."
                  : undefined,
          }))}
          onToggle={(id) =>
            onChange(
              key,
              (c[key] || []).includes(id)
                ? (c[key] || []).filter((x) => x !== id)
                : [...(c[key] || []), id],
            )
          }
        />
      ))}
      {c.thinFlaws?.includes("curse") && (
        <label className="block">
          Maldição herdada
          <select
            className="block w-full bg-gray-900 rounded p-3 mt-2"
            value={c.thinCurse || ""}
            onChange={(e) => onChange("thinCurse", e.target.value)}
          >
            <option value="">Decidir depois</option>
            {Object.values(Clan)
              .filter((x) => ![Clan.ThinBlood, Clan.Caitiff].includes(x))
              .map((x) => (
                <option key={x}>{x}</option>
              ))}
          </select>
        </label>
      )}
      {(c.thinMerits?.includes("affinity") ||
        c.thinMerits?.includes("alchemist")) && (
        <p className="text-sm text-gray-300">
          Na seção Disciplinas e fórmulas, escolha{" "}
          {c.thinMerits?.includes("affinity")
            ? "a Disciplina de Afinidade"
            : ""}
          {c.thinMerits?.includes("affinity") &&
          c.thinMerits?.includes("alchemist")
            ? " e "
            : ""}
          {c.thinMerits?.includes("alchemist") ? "a fórmula de Alquimia" : ""}.
        </p>
      )}
    </section>
  );
}
