import React from "react";
import { Character } from "../types";
import { INITIAL_BLOOD_RITUALS } from "../data/bloodRituals";
import { CatalogPicker } from "./CatalogPicker";
export function BloodRitualPicker({
  character: c,
  onChange,
}: {
  character: Character;
  onChange: (key: keyof Character, value: any) => void;
}) {
  const allowed = (c.disciplines.bloodsorcery || 0) >= 1;
  return (
    <section className="space-y-4">
      <p className="text-sm text-gray-300">
        Com ao menos um ponto em Feitiçaria de Sangue, a criação permite
        escolher um Ritual de nível 1. O Ritual é separado do poder da
        Disciplina (V5, p. 272).
      </p>
      {!allowed && (
        <p>
          Escolha Feitiçaria de Sangue na seção Disciplinas e poderes para
          habilitar os Rituais.
        </p>
      )}
      <CatalogPicker
        label="Ritual inicial de Feitiçaria de Sangue"
        selected={c.rituals
          .filter((r) => INITIAL_BLOOD_RITUALS.some((x) => x.id === r.id))
          .map((r) => r.id)}
        options={INITIAL_BLOOD_RITUALS.map((r) => ({
          id: r.id,
          name: r.name,
          summary: r.summary,
          details: r.description,
          unavailable: allowed ? undefined : "Exige Feitiçaria de Sangue 1.",
        }))}
        onToggle={(id) => {
          const keep = c.rituals.filter(
            (r) => !INITIAL_BLOOD_RITUALS.some((x) => x.id === r.id),
          );
          const ritual = INITIAL_BLOOD_RITUALS.find((r) => r.id === id);
          onChange(
            "rituals",
            c.rituals.some((r) => r.id === id)
              ? keep
              : [
                  ...keep,
                  {
                    id: ritual.id,
                    name: ritual.name,
                    description: ritual.description,
                  },
                ],
          );
        }}
      />
      <details className="text-sm text-gray-400">
        <summary>Escopo do catálogo</summary>
        <p>
          Rituais iniciais do básico. Traduções de trabalho; rituais de
          suplementos e cerimônias de Oblívio ainda exigem expansão editorial.
        </p>
      </details>
    </section>
  );
}
