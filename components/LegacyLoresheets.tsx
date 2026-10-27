import React from "react";
import { Character } from "../types";
import { V5_LORESHEETS } from "../data/v5Loresheets";
export function LegacyLoresheets({ character: c }: { character: Character }) {
  const legacy = c.loresheets.filter(
    (l) => !V5_LORESHEETS.some((s) => s.id === l.id),
  );
  if (!legacy.length) return null;
  return (
    <aside className="rounded border border-gray-600 p-3 text-sm">
      <h3>Fichas de Conhecimento legadas</h3>
      <p>
        Registros preservados do arquivo antigo, fora do catálogo V5 revisado.
        Confira com o Narrador; não foram convertidos em benefícios de outro
        jogo.
      </p>
      <ul>
        {legacy.map((l, i) => (
          <li key={i}>
            {l.id} · {l.level} ponto(s)
          </li>
        ))}
      </ul>
    </aside>
  );
}
