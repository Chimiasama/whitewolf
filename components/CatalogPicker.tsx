import {HelpLabel} from './HelpLabel';
import React, { useState, useId } from "react";
export interface CatalogOption {
  id: string;
  name: string;
  summary?: string;
  details?: React.ReactNode;
  unavailable?: string;
  community?: boolean;
  control?: React.ReactNode;
}
export function CatalogPicker({
  label,
  options,
  selected,
  onToggle,
  multiple = false,
}: {
  key?: string;
  label: string;
  options: CatalogOption[];
  selected: string[];
  onToggle: (id: string) => void;
  multiple?: boolean;
}) {
  const [open, setOpen] = useState(false),
    [query, setQuery] = useState(""),
    [locked, setLocked] = useState(false),
    [community, setCommunity] = useState(false);
  const id = useId();
  const normalize = (s: string) =>
    s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  const visible = options.filter(
    (o) =>
      (community || !o.community || selected.includes(o.id)) &&
      (locked || !o.unavailable || selected.includes(o.id)) &&
      normalize(o.name + " " + (o.summary || "")).includes(normalize(query)),
  );
  return (
    <section aria-label={label} className="catalog-picker space-y-3 text-left">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-semibold">{label}</h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          className="rounded border border-gray-600 px-3 py-2 text-sm"
          onClick={() => setOpen(!open)}
        >
          {open
            ? "Fechar opções"
            : selected.length
              ? "Trocar / adicionar"
              : "Escolher"}
        </button>
      </div>
      {selected.length > 0 ? (
        <ul className="space-y-2">
          {selected.map((key) => {
            const item = options.find((o) => o.id === key);
            return (
              <li key={key} className="rounded-lg bg-gray-900 p-3">
                <div className="flex justify-between items-center gap-3">
                  <strong><HelpLabel title={item?.name||key} content={item?.details||item?.summary}>{item?.name||key}</HelpLabel></strong>
                  <button
                    type="button"
                    className="text-sm text-gray-300 underline"
                    aria-label={`Remover ${item?.name || key}`}
                    onClick={() => onToggle(key)}
                  >
                    Remover
                  </button>
                </div>
                {item?.control}
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-sm text-gray-400">
          Nenhuma escolha. Você pode decidir depois.
        </p>
      )}
      {open && (
        <div
          id={id}
          className="space-y-3 rounded-lg border border-gray-700 p-3"
        >
          <label className="block text-sm">
            Buscar em {label}
            <input
              type="search"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="mt-1 block w-full rounded bg-gray-950 border border-gray-600 p-3"
            />
          </label>
          <div className="flex flex-wrap gap-4 text-sm">
            <label>
              <input
                type="checkbox"
                checked={locked}
                onChange={(e) => setLocked(e.target.checked)}
              />{" "}
              Mostrar indisponíveis
            </label>
            {options.some((o) => o.community) && (
              <label>
                <input
                  type="checkbox"
                  checked={community}
                  onChange={(e) => setCommunity(e.target.checked)}
                />{" "}
                Incluir material comunitário
              </label>
            )}
          </div>
          <ul className="max-h-[28rem] overflow-y-auto space-y-2">
            {visible.map((o) => (
              <li key={o.id} className="border border-gray-700 rounded-lg p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <strong><HelpLabel title={o.name} content={o.details||o.summary}>{o.name}</HelpLabel></strong>
                    {o.community && (
                      <span className="block text-xs text-amber-200">
                        Comunitário · opcional
                      </span>
                    )}

                  </div>
                  <button
                    type="button"
                    className="shrink-0 rounded border border-gray-500 px-3 py-2 text-sm disabled:opacity-50"
                    disabled={!!o.unavailable && !selected.includes(o.id)}
                    onClick={() => {
                      onToggle(o.id);
                      if (!multiple) setOpen(false);
                    }}
                  >
                    {selected.includes(o.id) ? "Remover" : "Escolher"}
                  </button>
                </div>
                {o.unavailable && (
                  <p className="mt-2 text-sm text-amber-200">{o.unavailable}</p>
                )}
              </li>
            ))}
          </ul>
          {!visible.length && (
            <p role="status">
              Nenhuma opção encontrada. Ajuste a busca ou os filtros.
            </p>
          )}
        </div>
      )}
    </section>
  );
}
