import React from "react";
import { Character, PredatorTypeDetail } from "../types";
import { availablePredatorDisciplines } from "../lib/predatorRules";
export function PredatorCustomization({
  character: c,
  predator: p,
  onChange,
  disciplineName,
}: {
  character: Character;
  predator: PredatorTypeDetail;
  onChange: (patch: Partial<Character>) => void;
  disciplineName: (key: string) => string;
}) {
  return (
    <section
      aria-label="Escolhas do predador"
      className="space-y-4 rounded-lg border border-gray-700 p-4"
    >
      <p className="text-sm text-gray-300">
        Fonte: {p.source}. Os benefícios abaixo são adicionais ao orçamento
        comum.
      </p>
      <label className="block">
        Disciplina concedida
        <select
          className="block w-full mt-2 rounded bg-gray-900 p-3"
          value={p.disciplineAdd?.discipline || ""}
          onChange={(e) => onChange({ predatorDiscipline: e.target.value })}
        >
          {availablePredatorDisciplines(p, c.clan).map((id) => (
            <option key={id} value={id}>
              {disciplineName(id)} +1
            </option>
          ))}
        </select>
      </label>
      {p.choices?.map((group) => (
        <label key={group.id} className="block">
          {group.label}
          <select
            className="block w-full mt-2 rounded bg-gray-900 p-3"
            value={c.predatorChoices?.[group.id] || group.options[0].id}
            onChange={(e) =>
              onChange({
                predatorChoices: {
                  ...c.predatorChoices,
                  [group.id]: e.target.value,
                },
              })
            }
          >
            {group.options.map((o) => (
              <option key={o.id} value={o.id}>
                {o.name} · {o.cost} pontos
              </option>
            ))}
          </select>
        </label>
      ))}
      {p.allocations?.map((group) => (
        <label key={group.id} className="block">
          {group.label} · distribua {group.total} pontos
          <select
            className="block w-full mt-2 rounded bg-gray-900 p-3"
            value={c.predatorAllocations?.[group.options[0].id] ?? group.total}
            onChange={(e) =>
              onChange({
                predatorAllocations: {
                  ...c.predatorAllocations,
                  [group.options[0].id]: Number(e.target.value),
                  [group.options[1].id]: group.total - Number(e.target.value),
                },
              })
            }
          >
            {Array.from({ length: group.total + 1 }, (_, n) => (
              <option key={n} value={n}>
                {group.options[0].name} {n} / {group.options[1].name}{" "}
                {group.total - n}
              </option>
            ))}
          </select>
        </label>
      ))}
    </section>
  );
}
