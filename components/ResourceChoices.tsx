import { LegacyLoresheets } from "./LegacyLoresheets";
import { CharacterStory } from "./CharacterStory";
import {
  ExperiencePurchases,
  CharacterTransaction,
} from "./ExperiencePurchases";
import { ExperienceLedger } from "./ExperienceLedger";
import { characterPredator } from "../lib/predatorRules";
import React, { useState } from "react";
import { Character, GameType, Skill } from "../types";
import {
  fnGetAdvantagesAndFlaws,
  fnGetLoresheets,
  fnGetPredatorTypes,
  aSkillList,
} from "../constants";
import { useI18n } from "../lib/i18n";
import { CatalogPicker } from "./CatalogPicker";
import { CreationTabs } from "./CreationTabs";
export function SpecialtyEditor({
  character: c,
  onChange,
}: {
  character: Character;
  onChange: (key: keyof Character, value: any) => void;
}) {
  const { t } = useI18n();
  const [skill, setSkill] = useState(""),
    [name, setName] = useState("");
  return (
    <section className="space-y-4">
      <h3>Especialidades</h3>
      <p className="text-sm text-gray-300">
        Escolha a especialidade gratuita e as exigidas pelas suas Perícias.
        Benefícios de predador são adicionais.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <label>
          Perícia
          <select
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            className="block w-full bg-gray-900 p-3 rounded"
          >
            <option value="">Selecione</option>
            {aSkillList
              .filter((s) => c.skills[s] > 0)
              .map((s) => (
                <option key={s} value={s}>
                  {t("skills.list." + s)}
                </option>
              ))}
          </select>
        </label>
        <label>
          Especialidade
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full bg-gray-900 p-3 rounded"
            placeholder="Ex.: Parkour"
          />
        </label>
      </div>
      <button
        type="button"
        disabled={!skill || !name.trim()}
        className="rounded border p-2 disabled:opacity-40"
        onClick={() => {
          onChange("specialties", [
            ...c.specialties,
            { skill: skill as Skill, name: name.trim() },
          ]);
          setName("");
        }}
      >
        Adicionar especialidade
      </button>
      <ul>
        {c.specialties.map((s, i) => (
          <li key={i} className="flex justify-between gap-3 py-2">
            {t("skills.list." + s.skill)}: {s.name}
            <button
              type="button"
              className="underline"
              aria-label={`Remover especialidade ${s.name}`}
              onClick={() =>
                onChange(
                  "specialties",
                  c.specialties.filter((_, j) => j !== i),
                )
              }
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
export function ResourceChoices({
  character: c,
  onChange,
  panel,
  onPanel,
  onTransaction,
}: {
  character: Character;
  onChange: (key: keyof Character, value: any) => void;
  panel: string;
  onPanel: (key: string) => void;
  onTransaction: CharacterTransaction;
}) {
  const { t } = useI18n();
  const catalogue = fnGetAdvantagesAndFlaws(t, c.gameType),
    loresheets = fnGetLoresheets(t),
    predator =
      c.gameType === GameType.Vampire
        ? characterPredator(c, fnGetPredatorTypes(t))
        : undefined;
  const advantagePoints =
    c.advantages.reduce((s, a) => s + a.cost, 0) +
    c.loresheets.reduce((s, l) => s + l.level, 0) -
    (predator?.advantages.reduce((s, a) => s + a.cost, 0) || 0);
  const flawPoints =
    c.flaws.reduce((s, a) => s + a.cost, 0) -
    (predator?.flaws.reduce((s, a) => s + a.cost, 0) || 0);
  return (
    <div className="space-y-5">
      <LegacyLoresheets character={c} />
      {!c.creationCompletedAt && (
        <div className="grid grid-cols-2 gap-3 rounded-lg bg-gray-900 p-4 text-sm">
          <div>
            Vantagens e Loresheets
            <strong className="block text-xl">
              {advantagePoints} / 7 pontos
            </strong>
          </div>
          <div>
            Defeitos
            <strong className="block text-xl">{flawPoints} / 2 pontos</strong>
          </div>
        </div>
      )}
      {panel === "loresheets" &&
        c.loresheets.some((l) => l.id === "v5-helena" && l.level === 2) && (
          <label className="block">
            Perícia de Talento Verdadeiro
            <select
              className="mt-2 block rounded p-3"
              value={c.loreChoices?.helenaTalent || ""}
              onChange={(e) =>
                onChange("loreChoices", {
                  ...c.loreChoices,
                  helenaTalent: e.target.value,
                })
              }
            >
              <option value="">Escolha</option>
              {["Craft", "Etiquette", "Performance"].map((k) => (
                <option key={k} value={k}>
                  {t("skills.list." + k)}
                </option>
              ))}
            </select>
          </label>
        )}
      <CreationTabs
        active={panel}
        onChange={onPanel}
        items={[
          ...(!c.creationCompletedAt
            ? [
                { id: "advantages", label: "Vantagens" },
                { id: "flaws", label: "Defeitos" },
                ...(c.gameType === GameType.Vampire
                  ? [{ id: "loresheets", label: "Loresheets" }]
                  : []),
              ]
            : []),
          { id: "ties", label: "Vínculos" },
          { id: "experience", label: "Experiência" },
        ]}
      >
        {(key) =>
          key === "experience" ? (
            <div className="space-y-6">
              <ExperiencePurchases
                character={c}
                onTransaction={onTransaction}
              />
              <ExperienceLedger
                character={c}
                onChange={onChange}
                onTransaction={onTransaction}
              />
            </div>
          ) : key === "ties" ? (
            <CharacterStory character={c} onChange={onChange} />
          ) : key === "loresheets" ? (
            <CatalogPicker
              label="Loresheets"
              multiple
              selected={c.loresheets.map((l) => l.id + ":" + l.level)}
              options={loresheets.flatMap((l) =>
                l.levels.map((level) => ({
                  id: l.id + ":" + level.level,
                  name: `${l.name} · ${level.level} pontos`,
                  summary: level.name,
                  unavailable:
                    l.allowedClans && !l.allowedClans.includes(c.clan)
                      ? "Exige o clã indicado na referência."
                      : undefined,
                  details: (
                    <>
                      <p>{l.description}</p>
                      <p>{level.description}</p>
                      <p>{level.system}</p>
                    </>
                  ),
                })),
              )}
              onToggle={(id) => {
                const [key, n] = id.split(":");
                onChange(
                  "loresheets",
                  c.loresheets.some(
                    (l) => l.id === key && l.level === Number(n),
                  )
                    ? c.loresheets.filter(
                        (l) => !(l.id === key && l.level === Number(n)),
                      )
                    : [...c.loresheets, { id: key, level: Number(n) }],
                );
              }}
            />
          ) : (
            (() => {
              const field = key === "flaws" ? "flaws" : "advantages";
              const granted = predator?.[field] || [];
              const selected = c[field];
              return (
                <>
                  <CatalogPicker
                    label={field === "advantages" ? "Vantagens" : "Defeitos"}
                    multiple
                    selected={selected
                      .filter((a) => !granted.some((g) => g.id === a.id))
                      .map((a) => a.id)}
                    options={catalogue
                      .filter(
                        (a) =>
                          a.type ===
                          (field === "advantages" ? "advantage" : "flaw"),
                      )
                      .map((a) => ({
                        id: a.id,
                        name: a.name,
                        summary: `${a.levels?.join(", ") || a.cost} pontos`,
                        details: a.description,
                        control: selected.some((s) => s.id === a.id) ? (
                          <label className="block mt-2 text-sm">
                            Pontos
                            <select
                              aria-label={`Pontos de ${a.name}`}
                              className="ml-2 bg-gray-800 p-2"
                              value={selected.find((s) => s.id === a.id)?.cost}
                              onChange={(e) =>
                                onChange(
                                  field,
                                  selected.map((s) =>
                                    s.id === a.id
                                      ? { ...s, cost: Number(e.target.value) }
                                      : s,
                                  ),
                                )
                              }
                            >
                              {(a.levels || [a.cost]).map((n) => (
                                <option key={n}>{n}</option>
                              ))}
                            </select>
                          </label>
                        ) : undefined,
                      }))}
                    onToggle={(id) => {
                      const item = catalogue.find((a) => a.id === id);
                      if (selected.some((a) => a.id === id))
                        onChange(
                          field,
                          selected.filter((a) => a.id !== id),
                        );
                      else if (item)
                        onChange(field, [
                          ...selected,
                          { ...item, cost: item.levels?.[0] || item.cost },
                        ]);
                    }}
                  />
                  {granted.length > 0 && (
                    <aside className="mt-4 text-sm text-purple-200">
                      <h4>Concedido pelo predador · adicional ao orçamento</h4>
                      {granted.map((g) => (
                        <p key={g.id}>
                          {g.name} · {g.cost} pontos
                        </p>
                      ))}
                    </aside>
                  )}
                </>
              );
            })()
          )
        }
      </CreationTabs>
    </div>
  );
}
