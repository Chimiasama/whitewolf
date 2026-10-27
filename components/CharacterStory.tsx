import React from "react";
import { Character, GameType } from "../types";
import { CreationTabs } from "./CreationTabs";
export const VAMPIRE_STORY = {
  faction: "Seita ou facção",
  group: "Coterie",
  territory: "Domínio",
  haven: "Refúgio",
  publicMask: "Máscara pública",
  sireRelationship: "Relação com o Senhor",
  debts: "Dívidas e favores",
  resonance: "Ressonância",
};
export const WEREWOLF_STORY = {
  group: "Alcateia",
  territory: "Território",
  caern: "Caern",
  patron: "Espírito patrono e vínculo",
  spiritRelations: "Relações com espíritos",
  personalTaboo: "Tabu pessoal",
  haranoTriggers: "Gatilhos de Harano",
  haugloskTriggers: "Gatilhos de Hauglosk",
};
export const NPC_FIELDS = {
  role: "Papel",
  motivation: "Motivação",
  secret: "Segredo",
  relationship: "Vínculo",
  hook: "Gancho",
};
export const ZERO_FIELDS = {
  tone: "Tom da crônica",
  lines: "Linhas — temas fora de jogo",
  veils: "Véus — temas tratados sem descrição",
  tools: "Ferramentas e acordos de segurança",
};
export function CharacterStory({
  character: c,
  onChange,
}: {
  character: Character;
  onChange: (key: keyof Character, value: any) => void;
}) {
  const [tab, setTab] = React.useState("links");
  const wolf = c.gameType === GameType.Werewolf;
  const fields = wolf ? WEREWOLF_STORY : VAMPIRE_STORY;
  return (
    <section className="space-y-4">
      <CreationTabs
        active={tab}
        onChange={setTab}
        items={[
          { id: "links", label: wolf ? "Pilares" : "Convicções e Pilares" },
          { id: "chronicle", label: "Crônica" },
          ...(c.narrative || c.profile === "npc"
            ? [{ id: "npc", label: "Narrativa do NPC" }]
            : []),
          { id: "zero", label: "Sessão zero" },
        ]}
      >
        {(id) =>
          id === "chronicle" ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {Object.entries(fields).map(([key, label]) => (
                <label key={key}>
                  {label}
                  <textarea
                    aria-label={label}
                    className="block mt-2 w-full rounded border border-gray-600 p-3"
                    rows={3}
                    value={c.chronicle?.[key] || ""}
                    onChange={(e) =>
                      onChange("chronicle", {
                        ...c.chronicle,
                        [key]: e.target.value,
                      })
                    }
                  />
                </label>
              ))}
            </div>
          ) : id === "npc" ? (
            <div className="space-y-4">
              {Object.entries(NPC_FIELDS).map(([key, label]) => (
                <label key={key} className="block">
                  {label}
                  <textarea
                    aria-label={label}
                    className="block mt-2 w-full rounded border border-gray-600 p-3"
                    rows={3}
                    value={c.narrative?.[key] || ""}
                    onChange={(e) =>
                      onChange("narrative", {
                        role: "",
                        motivation: "",
                        secret: "",
                        relationship: "",
                        hook: "",
                        ...c.narrative,
                        [key]: e.target.value,
                      })
                    }
                  />
                </label>
              ))}
            </div>
          ) : id === "zero" ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-300">
                Campos opcionais para os acordos da mesa. Estes registros
                acompanham o JSON exportado.
              </p>
              {Object.entries(ZERO_FIELDS).map(([key, label]) => (
                <label key={key} className="block">
                  {label}
                  <textarea
                    aria-label={label}
                    className="block mt-2 w-full rounded border border-gray-600 p-3"
                    rows={3}
                    value={c.sessionZero?.[key] || ""}
                    onChange={(e) =>
                      onChange("sessionZero", {
                        ...c.sessionZero,
                        [key]: e.target.value,
                      })
                    }
                  />
                </label>
              ))}
            </div>
          ) : (
            <div className="space-y-5">
              {wolf ? (
                <>
                  <p className="text-sm text-gray-300">
                    Pessoas ou vínculos que mantêm sua conexão com o mundo. Em
                    W5, não são pares automáticos de Convicções.
                  </p>
                  {(c.touchstoneLinks || []).map((link, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-gray-600 p-4 space-y-3"
                    >
                      <label className="block">
                        Pilar {i + 1}
                        <input
                          className="block mt-2 w-full rounded p-3"
                          value={link.name}
                          onChange={(e) =>
                            onChange(
                              "touchstoneLinks",
                              c.touchstoneLinks.map((l, j) =>
                                i === j ? { ...l, name: e.target.value } : l,
                              ),
                            )
                          }
                        />
                      </label>
                      <label className="block">
                        Relação
                        <input
                          className="block mt-2 w-full rounded p-3"
                          value={link.relationship}
                          onChange={(e) =>
                            onChange(
                              "touchstoneLinks",
                              c.touchstoneLinks.map((l, j) =>
                                i === j
                                  ? { ...l, relationship: e.target.value }
                                  : l,
                              ),
                            )
                          }
                        />
                      </label>
                      <button
                        type="button"
                        className="underline"
                        onClick={() =>
                          onChange(
                            "touchstoneLinks",
                            c.touchstoneLinks.filter((_, j) => j !== i),
                          )
                        }
                      >
                        Remover Pilar {i + 1}
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="border rounded p-3"
                    disabled={(c.touchstoneLinks || []).length >= 20}
                    onClick={() =>
                      onChange("touchstoneLinks", [
                        ...(c.touchstoneLinks || []),
                        { name: "", relationship: "" },
                      ])
                    }
                  >
                    Adicionar Pilar
                  </button>
                </>
              ) : (
                <>
                  <p className="text-sm text-gray-300">
                    Até três Convicções, cada uma ligada a um Pilar mortal. Zero
                    Convicções é uma opção prevista no Players Guide, com
                    consequências para a Humanidade.
                  </p>
                  {(c.convictions || []).map((entry, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-gray-600 p-4 space-y-3"
                    >
                      <label className="block">
                        Convicção {i + 1}
                        <textarea
                          className="block mt-2 w-full rounded p-3"
                          rows={2}
                          value={entry.belief}
                          onChange={(e) =>
                            onChange(
                              "convictions",
                              c.convictions.map((v, j) =>
                                i === j ? { ...v, belief: e.target.value } : v,
                              ),
                            )
                          }
                        />
                      </label>
                      <label className="block">
                        Pilar ligado à Convicção {i + 1}
                        <input
                          className="block mt-2 w-full rounded p-3"
                          value={entry.touchstone}
                          onChange={(e) =>
                            onChange(
                              "convictions",
                              c.convictions.map((v, j) =>
                                i === j
                                  ? { ...v, touchstone: e.target.value }
                                  : v,
                              ),
                            )
                          }
                        />
                      </label>
                      <button
                        type="button"
                        className="underline"
                        onClick={() =>
                          onChange(
                            "convictions",
                            c.convictions.filter((_, j) => j !== i),
                          )
                        }
                      >
                        Remover Convicção {i + 1}
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="border rounded p-3 disabled:opacity-50"
                    disabled={(c.convictions || []).length >= 3}
                    onClick={() =>
                      onChange("convictions", [
                        ...(c.convictions || []),
                        { belief: "", touchstone: "" },
                      ])
                    }
                  >
                    Adicionar Convicção e Pilar
                  </button>
                </>
              )}
              <details>
                <summary>Anotações de vínculos existentes</summary>
                <label className="block mt-3">
                  Notas livres de Pilares e vínculos
                  <textarea
                    aria-label="Notas livres de Pilares e vínculos"
                    className="block mt-2 w-full rounded p-3"
                    rows={4}
                    value={c.touchstones}
                    onChange={(e) => onChange("touchstones", e.target.value)}
                  />
                </label>
              </details>
            </div>
          )
        }
      </CreationTabs>
      {!wolf && (
        <details>
          <summary>Idade e características avançadas</summary>
          <div className="grid grid-cols-2 gap-4 mt-3">
            {(["generation", "bloodPotency"] as const).map((k) => (
              <label key={k}>
                {k === "generation" ? "Geração" : "Potência de Sangue"}
                <input
                  type="number"
                  min={k === "generation" ? 4 : 0}
                  max={k === "generation" ? 16 : 10}
                  value={c[k]}
                  onChange={(e) => {
                    const n = Number(e.target.value);
                    if (
                      Number.isInteger(n) &&
                      n >= (k === "generation" ? 4 : 0) &&
                      n <= (k === "generation" ? 16 : 10)
                    )
                      onChange(k, n);
                  }}
                  className="block w-full rounded p-3"
                />
              </label>
            ))}
          </div>
        </details>
      )}
    </section>
  );
}
export function StorySummary({ character: c }: { character: Character }) {
  const fields =
    c.gameType === GameType.Werewolf ? WEREWOLF_STORY : VAMPIRE_STORY;
  return (
    <section aria-label="Vínculos estruturados" className="space-y-4 text-left">
      {c.convictions?.length > 0 && (
        <div>
          <h3>Convicções e Pilares</h3>
          <ul>
            {c.convictions.map((v, i) => (
              <li key={i}>
                {v.belief} — Pilar: {v.touchstone || "não definido"}
              </li>
            ))}
          </ul>
        </div>
      )}
      {c.touchstoneLinks?.length > 0 && (
        <div>
          <h3>Pilares</h3>
          <ul>
            {c.touchstoneLinks.map((v, i) => (
              <li key={i}>
                {v.name} — {v.relationship}
              </li>
            ))}
          </ul>
        </div>
      )}
      {Object.keys(c.chronicle || {}).some((k) => c.chronicle[k]) && (
        <dl>
          {Object.entries(fields)
            .filter(([k]) => c.chronicle?.[k])
            .map(([k, label]) => (
              <div key={k}>
                <dt className="font-semibold">{label}</dt>
                <dd className="whitespace-pre-wrap">{c.chronicle[k]}</dd>
              </div>
            ))}
        </dl>
      )}
      {Object.values(c.sessionZero || {}).some(Boolean) && (
        <details>
          <summary>Acordos de sessão zero</summary>
          <dl>
            {Object.entries(ZERO_FIELDS)
              .filter(([k]) => c.sessionZero?.[k])
              .map(([k, label]) => (
                <div key={k}>
                  <dt className="font-semibold">{label}</dt>
                  <dd className="whitespace-pre-wrap">{c.sessionZero[k]}</dd>
                </div>
              ))}
          </dl>
        </details>
      )}
    </section>
  );
}
