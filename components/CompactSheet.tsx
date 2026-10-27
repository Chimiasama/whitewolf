import React from "react";
import { Character, GameType, Attribute } from "../types";
import { useI18n } from "../lib/i18n";
import { W5_GIFTS } from "../data/w5";
import { fnGetDisciplineDetails } from "../constants";
import { StorySummary } from "./CharacterStory";
export function CompactSheet({
  character: c,
  onChange,
  onSave,
  onBack,
}: {
  character: Character;
  onChange: (key: keyof Character, value: number) => void;
  onSave?: () => void;
  onBack?: () => void;
}) {
  const { t } = useI18n();
  const wolf = c.gameType === GameType.Werewolf;
  const disciplines = fnGetDisciplineDetails(t);
  const health = c.attributes[Attribute.Stamina] + 3,
    willpower =
      c.attributes[Attribute.Composure] + c.attributes[Attribute.Resolve];
  const tracks: [string, keyof Character, number, number][] = [
    ["Vitalidade", "health", c.health ?? health, health],
    ["Força de Vontade", "willpower", c.willpower ?? willpower, willpower],
    ...(wolf
      ? [
          ["Fúria", "rage", c.rage, 5],
          ["Harano", "harano", c.harano, 5],
          ["Hauglosk", "hauglosk", c.hauglosk, 5],
        ]
      : [
          ["Fome", "hunger", c.hunger, 5],
          ["Humanidade", "humanity", c.humanity, 10],
        ]),
  ] as any;
  return (
    <article aria-label="Ficha compacta" className="space-y-5">
      <div className="flex flex-wrap gap-3 justify-between">
        <div>
          <h2 className="text-2xl">{c.name || "Sem nome"}</h2>
          <p>{c.concept}</p>
        </div>
        <div className="flex gap-3">
          <button type="button" className="border rounded p-2" onClick={onBack}>
            Início
          </button>
          <button type="button" className="border rounded p-2" onClick={onSave}>
            Salvar ficha
          </button>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tracks.map(([label, key, value, max]) => (
          <section key={key} className="rounded border border-gray-600 p-3">
            <h3>{label}</h3>
            <div className="mt-2 flex items-center justify-between gap-2">
              <button
                type="button"
                aria-label={`Diminuir ${label}`}
                className="rounded border px-3 py-1 disabled:opacity-40"
                disabled={value <= 0}
                onClick={() => onChange(key, Math.max(0, value - 1))}
              >
                −
              </button>
              <output aria-label={`${label} atual`}>
                {value} / {max}
              </output>
              <button
                type="button"
                aria-label={`Aumentar ${label}`}
                className="rounded border px-3 py-1 disabled:opacity-40"
                disabled={value >= max}
                onClick={() => onChange(key, Math.min(max, value + 1))}
              >
                +
              </button>
            </div>
          </section>
        ))}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <section>
          <h3>Atributos</h3>
          <dl>
            {Object.entries(c.attributes).map(([k, v]) => (
              <div
                key={k}
                className="flex justify-between py-1 border-b border-gray-700"
              >
                <dt>{t("attributes.list." + k)}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </section>
        <section>
          <h3>Perícias com pontos</h3>
          <dl>
            {Object.entries(c.skills)
              .filter(([, v]) => v > 0)
              .map(([k, v]) => (
                <div
                  key={k}
                  className="flex justify-between py-1 border-b border-gray-700"
                >
                  <dt>{t("skills.list." + k)}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
          </dl>
        </section>
      </div>
      <section>
        <h3>{wolf ? "Dons" : "Disciplinas e poderes"}</h3>
        <ul>
          {wolf
            ? (c.gifts || []).map((g) => (
                <li key={g.id}>
                  {W5_GIFTS.find((d) => d.id === g.id)?.name || g.id}
                </li>
              ))
            : Object.entries(c.disciplines)
                .filter(([, n]) => n > 0)
                .map(([k, n]) => (
                  <li key={k}>
                    {disciplines[k]?.name || k} {n} ·{" "}
                    {(c.disciplinePowers[k] || [])
                      .map(
                        (id) =>
                          disciplines[k]?.powers.find((p) => p.id === id)
                            ?.name || id,
                      )
                      .join(", ")}
                  </li>
                ))}
        </ul>
      </section>
      {c.rituals.length > 0 && (
        <section>
          <h3>{wolf ? "Ritos" : "Rituais"}</h3>
          <ul>
            {c.rituals.map((r) => (
              <li key={r.id}>{r.name}</li>
            ))}
          </ul>
        </section>
      )}
      <StorySummary character={c} />
      {c.narrative && (
        <details>
          <summary>Narrativa do NPC</summary>
          <p>{c.narrative.role}</p>
          <p>{c.narrative.motivation}</p>
          <p>{c.narrative.secret}</p>
          <p>{c.narrative.relationship}</p>
          <p>{c.narrative.hook}</p>
        </details>
      )}
      <details>
        <summary>Recursos e especialidades</summary>
        <ul>
          {[...c.advantages, ...c.flaws].map((v, i) => (
            <li key={i}>
              {v.name} {v.cost}
            </li>
          ))}
          {c.specialties.map((v, i) => (
            <li key={i}>
              {t("skills.list." + v.skill)}: {v.name}
            </li>
          ))}
        </ul>
      </details>
    </article>
  );
}
