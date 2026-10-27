import React from "react";
import { Character } from "../types";
import { oSkillPaths } from "../constants";
export const SKILL_PACKAGES = [
  {
    id: "jackOfAllTrades",
    name: "Generalista",
    summary: "Uma Perícia em 3, oito em 2 e dez em 1.",
  },
  {
    id: "balanced",
    name: "Equilibrado",
    summary: "Três Perícias em 3, cinco em 2 e sete em 1.",
  },
  {
    id: "specialist",
    name: "Especialista",
    summary: "Uma Perícia em 4, três em 3, três em 2 e três em 1.",
  },
] as const;
export function skillsFitPath(c: Character, path: keyof typeof oSkillPaths) {
  const pool = [...oSkillPaths[path]];
  return Object.values(c.skills)
    .filter((n) => n > 0)
    .every((n) => {
      const i = pool.indexOf(n);
      if (i < 0) return false;
      pool.splice(i, 1);
      return true;
    });
}
export function SkillDistribution({
  character: c,
  onChange,
  children,
}: {
  character: Character;
  onChange: (patch: Partial<Character>) => void;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-5">
      <h2 className="text-xl">Como você quer distribuir suas Perícias?</h2>
      <p className="text-sm text-gray-300">
        Escolha um pacote antes de distribuir os valores. Os três pacotes são
        válidos para Vampiro e Lobisomem.
      </p>
      <fieldset className="grid gap-3 sm:grid-cols-3">
        <legend className="sr-only">Pacote de Perícias</legend>
        {SKILL_PACKAGES.map((p) => (
          <label
            key={p.id}
            className={`rounded-lg border p-4 ${c.skillPath === p.id ? "border-amber-400 bg-gray-800" : "border-gray-600"}`}
          >
            <input
              type="radio"
              name="skillPath"
              checked={c.skillPath === p.id}
              onChange={() => {
                if (!skillsFitPath(c, p.id)) {
                  if (
                    !window.confirm(
                      "A distribuição atual não cabe neste pacote. Limpar os pontos de Perícias para redistribuir? As especialidades serão preservadas para revisão.",
                    )
                  )
                    return;
                  onChange({
                    skillPath: p.id,
                    skills: Object.fromEntries(
                      Object.keys(c.skills).map((k) => [k, 0]),
                    ) as Character["skills"],
                  });
                } else onChange({ skillPath: p.id });
              }}
            />
            <strong className="ml-2">{p.name}</strong>
            <span className="block mt-2 text-sm text-gray-300">
              {p.summary}
            </span>
          </label>
        ))}
      </fieldset>
      {c.skillPath ? (
        children
      ) : (
        <p className="rounded bg-gray-900 p-4">
          Selecione Generalista, Equilibrado ou Especialista para abrir a
          distribuição. Seus pontos existentes serão preservados se forem
          compatíveis.
        </p>
      )}
    </section>
  );
}
