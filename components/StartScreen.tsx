import {ThemeControl} from '../lib/theme';
import React, { useState } from "react";
import { GameType } from "../types";
export function StartScreen({
  onStart,
  onContinue,
  onLibrary,
  onImport,
  draft,
}: {
  onStart: (
    mode: "player" | "npc",
    game: GameType,
    role: string,
    scale: string,
    template?: string,
  ) => void;
  onContinue: () => void;
  onLibrary: () => void;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
  draft: { name: string; gameType: GameType } | null;
}) {
  const [template,setTemplate]=useState("");
  const [mode, setMode] = useState<"player" | "npc" | null>(null),
    [game, setGame] = useState(GameType.Vampire),
    [role, setRole] = useState(""),
    [scale, setScale] = useState("fledgling");
  return (
    <main className="start-screen max-w-3xl mx-auto w-full px-5 py-12 sm:py-20">
      <div className="mb-6 max-w-xs"><ThemeControl/></div>
      <h1 className="text-3xl sm:text-4xl font-cinzel text-gray-100">
        Personagens do Mundo das Trevas
      </h1>
      <p className="mt-4 mb-8 text-gray-300">
        Crie uma história. Escolha as regras no seu ritmo.
      </p>
      {!mode ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <button
            className="rounded-xl border border-red-700 bg-gray-900 p-6 text-left"
            onClick={() => setMode("player")}
          >
            <strong className="block text-xl">Criar personagem</strong>
            <span className="block mt-2 text-gray-300">
              Criação guiada, com escolhas e pendências.
            </span>
          </button>
          <button
            className="rounded-xl border border-emerald-700 bg-gray-900 p-6 text-left"
            onClick={() => setMode("npc")}
          >
            <strong className="block text-xl">Criar NPC</strong>
            <span className="block mt-2 text-gray-300">
              Defina o papel e a influência na história.
            </span>
          </button>
          {draft && (
            <button
              className="sm:col-span-2 rounded-xl border border-gray-600 p-5 text-left"
              onClick={onContinue}
            >
              <strong>Continuar personagem</strong>
              <span className="block text-gray-300">
                {draft.name || "Sem nome"} ·{" "}
                {draft.gameType === GameType.Vampire ? "Vampiro" : "Lobisomem"}
              </span>
            </button>
          )}
        </div>
      ) : (
        <section
          aria-label="Nova criação"
          className="space-y-5 rounded-xl bg-gray-900 p-5"
        >
          <button className="text-sm underline" onClick={() => setMode(null)}>
            Voltar ao início
          </button>
          <h2 className="text-xl">
            {mode === "player" ? "Criar personagem" : "Criar NPC"}
          </h2>
          <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <legend className="mb-2">Escolha o jogo</legend>
            {[
              { id: GameType.Vampire, name: "Vampiro: A Máscara" },
              { id: GameType.Werewolf, name: "Lobisomem: O Apocalipse" },
            ].map((g) => (
              <label key={g.id} className="rounded border border-gray-600 p-4">
                <input
                  type="radio"
                  name="game"
                  checked={game === g.id}
                  onChange={() => {
                    setGame(g.id);
                    setRole("");
                    setTemplate("");
                  }}
                />{" "}
                {g.name}
              </label>
            ))}
          </fieldset>
          {mode === "npc" && (
            <>
              <label className="block">Tipo de NPC<select aria-label="Tipo de NPC" className="block mt-2 w-full bg-gray-950 p-3 rounded" value={template} onChange={e=>setTemplate(e.target.value)}><option value="">{game===GameType.Vampire?'Vampiro':'Garou'}</option><option value="human">Humano</option><option value="ghoul">Carniçal</option>{game===GameType.Werewolf&&<><option value="spirit">Espírito</option><option value="fomor">Fomor</option></>}</select></label>
              <label className="block">
                Papel narrativo
                <select
                  className="block mt-2 w-full bg-gray-950 p-3 rounded"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">Surpreenda-me</option>
                  {(game === GameType.Vampire
                    ? [
                        "Intermediário da corte",
                        "Guardião de um culto",
                        "Organizador Anarquista",
                      ]
                    : [
                        "Defensor do território",
                        "Mediador espiritual",
                        "Veterano em crise",
                      ]
                  ).map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                Influência na história
                <select
                  className="block mt-2 w-full bg-gray-950 p-3 rounded"
                  value={scale}
                  onChange={(e) => setScale(e.target.value)}
                >
                  <option value="fledgling">Em ascensão</option>
                  <option value="neonate">Estabelecido</option>
                  <option value="ancilla">Influente</option>
                </select>
              </label>
              <p className="text-sm text-gray-300">
                Geração temática para o Narrador, sem orçamento de XP.
              </p>
            </>
          )}
          <button
            className="rounded-lg bg-red-800 hover:bg-red-700 px-5 py-3"
            onClick={() => onStart(mode, game, role, scale, template)}
          >
            {mode === "player" ? "Começar criação" : "Gerar NPC"}
          </button>
        </section>
      )}
      <section className="mt-10 border-t border-gray-700 pt-5">
        <h2 className="text-lg mb-3">Meus personagens</h2>
        <div className="flex flex-wrap gap-4">
          <button className="border rounded px-4 py-2" onClick={onLibrary}>
            Abrir personagens salvos
          </button>
          <label className="border rounded px-4 py-2 cursor-pointer">
            Importar JSON
            <input
              type="file"
              accept=".json"
              className="sr-only"
              onChange={onImport}
            />
          </label>
        </div>
        <p className="mt-3 text-sm text-gray-400">
          Os rascunhos ficam neste navegador. Exporte JSON para guardar uma
          cópia.
        </p>
      </section>
    </main>
  );
}
