import React, { useState } from "react";
import { Character } from "../types";
import { W5_GIFTS, W5_TRIBES, W5_RITES, w5GiftIdentity } from "../data/w5";
import { CreationTabs } from "./CreationTabs";
import { CatalogPicker } from "./CatalogPicker";
export function WerewolfCreation({
  character: c,
  onChange,
}: {
  character: Character;
  onChange: (key: keyof Character, value: any) => void;
}) {
  const [active, setActive] = useState("native");
  const tribe = W5_TRIBES[c.tribe];
  const names = { glory: "Glória", honor: "Honra", wisdom: "Sabedoria" };
  return (
    <section className="space-y-5">
      <p className="text-sm text-gray-300">
        Escolha um Dom de cada origem e um Rito. Você pode resolver as escolhas
        depois.
      </p>
      <CreationTabs
        active={active}
        onChange={setActive}
        items={[
          { id: "native", label: "Dom nativo" },
          { id: "auspice", label: "Dom do augúrio" },
          { id: "tribe", label: "Dom da tribo" },
          { id: "rite", label: "Rito" },
          { id: "renown", label: "Renome" },
        ]}
      >
        {(key) =>
          key === "renown" ? (
            <div className="space-y-4">
              {tribe ? (
                <>
                  <p>
                    Patrono: {tribe.patron}. Concede 2 pontos em{" "}
                    {names[tribe.renown]}.
                  </p>
                  <label className="block">
                    Onde colocar o ponto adicional?
                    <select
                      className="block w-full bg-gray-900 p-3 rounded mt-2"
                      value={
                        Object.entries(c.renown).find(
                          ([k, v]) => k !== tribe.renown && v === 1,
                        )?.[0] || ""
                      }
                      onChange={(e) =>
                        onChange("renown", {
                          glory: 0,
                          honor: 0,
                          wisdom: 0,
                          [tribe.renown]: 2,
                          ...(e.target.value ? { [e.target.value]: 1 } : {}),
                        })
                      }
                    >
                      <option value="">Decidir depois</option>
                      {Object.entries(names)
                        .filter(([id]) => id !== tribe.renown)
                        .map(([id, name]) => (
                          <option key={id} value={id}>
                            {name}
                          </option>
                        ))}
                    </select>
                  </label>
                </>
              ) : (
                <p>
                  Escolha uma tribo na etapa Natureza para conhecer o patrono e
                  seu Renome.
                </p>
              )}
            </div>
          ) : key === "rite" ? (
            <CatalogPicker
              label="Rito inicial"
              selected={c.rituals.map((r) => r.id)}
              options={W5_RITES.map((r) => ({
                id: r.id,
                name: r.name,
                summary: "Rito de W5",
                details: r.description,
              }))}
              onToggle={(id) =>
                onChange(
                  "rituals",
                  c.rituals.some((r) => r.id === id)
                    ? []
                    : W5_RITES.filter((r) => r.id === id),
                )
              }
            />
          ) : (key === "tribe" && !c.tribe) ||
            (key === "auspice" && !c.auspice) ? (
            <p>
              Escolha {key === "tribe" ? "a tribo" : "o augúrio"} na etapa
              Natureza para ver os Dons disponíveis.
            </p>
          ) : (
            <CatalogPicker
              key={key}
              label={`Dom ${key === "native" ? "nativo" : key === "tribe" ? "da tribo" : "do augúrio"}`}
              selected={(c.gifts || [])
                .filter((g) => g.origin === key)
                .map((g) => g.id)}
              options={W5_GIFTS.filter(
                (g) =>
                  g.origin === key &&
                  (key === "native" ||
                    g.owner === (key === "tribe" ? c.tribe : c.auspice)),
              ).map((g) => ({
                id: g.id,
                name: g.name,
                summary: g.summary,
                unavailable:
                  (c.gifts||[]).some(x=>x.origin!==key&&w5GiftIdentity(x.id)===w5GiftIdentity(g.id))?'Este Dom já foi escolhido por outra origem.':g.totalRenown > 3
                    ? `Exige Renome total ${g.totalRenown}.`
                    : undefined,
                details: (
                  <>
                    <p>{g.english}</p>
                    <p>Renome total mínimo: {g.totalRenown}</p>
                    <p>Referência: {g.reference}</p>
                  </>
                ),
              }))}
              onToggle={(id) =>
                onChange("gifts", [
                  ...(c.gifts || []).filter((g) => g.origin !== key),
                  ...((c.gifts || []).some((g) => g.id === id)
                    ? []
                    : [{ id, origin: key }]),
                ])
              }
            />
          )
        }
      </CreationTabs>
      <details className="text-sm text-gray-400">
        <summary>Sobre este catálogo</summary>
        <p>
          Catálogo inicial parcial de W5. Traduções de trabalho e nomes
          originais nas referências. Confira as condições completas no livro.
        </p>
      </details>
    </section>
  );
}
