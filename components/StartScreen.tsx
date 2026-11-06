import {ThemeControl} from '../lib/theme';
import React, { useState } from "react";
import {NPC_ROLE_PROFILES} from '../data/npcRoles';
import {RandomCharacterOptions} from '../lib/randomizer';
import {fnGetClanDetails,fnGetTribeDetails,fnGetAuspiceDetails} from '../constants';
import {useI18n} from '../lib/i18n';
import { Clan, Tribe, Auspice, GameType } from "../types";
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
    options?: RandomCharacterOptions,
  ) => void;
  onContinue: () => void;
  onLibrary: () => void;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
  draft: { name: string; gameType: GameType } | null;
}) {
  const {t}=useI18n();
  const [options,setOptions]=useState<RandomCharacterOptions>({});
  const clans=fnGetClanDetails(t),tribes=fnGetTribeDetails(t),auspices=fnGetAuspiceDetails(t);
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
                    setOptions({});
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
                  aria-label="Papel narrativo"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">Surpreenda-me</option>
                  {NPC_ROLE_PROFILES[game].map(r=><option key={r.role}>{r.role}</option>)}
                </select>
              </label>
              {role&&<p className="rounded-lg border border-gray-700 bg-gray-950 p-3 text-sm text-gray-300" aria-live="polite">Prioriza {NPC_ROLE_PROFILES[game].find(r=>r.role===role)?.attributes.map(a=>t(`attributes.list.${a}`)).join(', ')} e {NPC_ROLE_PROFILES[game].find(r=>r.role===role)?.skills.slice(0,3).map(skill=>t(`skills.list.${skill}`)).join(', ')}. O clã ou a tribo não altera essas prioridades.</p>}
              {!template && <div className="grid gap-4 sm:grid-cols-2">
                {game===GameType.Vampire ? <label className="block">Clã do NPC
                  <select aria-label="Clã do NPC" className="block mt-2 w-full min-w-0 bg-gray-950 p-3 rounded" value={options.clan||''} onChange={e=>setOptions({clan:e.target.value as Clan||undefined})}>
                    <option value="">Aleatório</option>{Object.values(Clan).filter(clan=>clan!==Clan.ThinBlood).map(clan=><option key={clan} value={clan}>{clans[clan].name}</option>)}
                  </select></label> : <>
                  <label className="block">Tribo do NPC<select aria-label="Tribo do NPC" className="block mt-2 w-full min-w-0 bg-gray-950 p-3 rounded" value={options.tribe||''} onChange={e=>setOptions(prev=>({...prev,tribe:e.target.value as Tribe||undefined}))}><option value="">Aleatória</option>{Object.values(Tribe).map(tribe=><option key={tribe} value={tribe}>{tribes[tribe].name}</option>)}</select></label>
                  <label className="block">Augúrio do NPC<select aria-label="Augúrio do NPC" className="block mt-2 w-full min-w-0 bg-gray-950 p-3 rounded" value={options.auspice||''} onChange={e=>setOptions(prev=>({...prev,auspice:e.target.value as Auspice||undefined}))}><option value="">Aleatório</option>{Object.values(Auspice).map(auspice=><option key={auspice} value={auspice}>{auspices[auspice].name}</option>)}</select></label>
                </>}
              </div>}
              <label className="block">
                Influência na história
                <select
                  className="block mt-2 w-full bg-gray-950 p-3 rounded"
                  aria-label="Influência na história"
                  value={scale}
                  onChange={(e) => setScale(e.target.value)}
                >
                  <option value="fledgling">Em ascensão</option>
                  <option value="neonate">Estabelecido</option>
                  <option value="ancilla">Influente</option>
                </select>
              </label>
              <p className="text-sm text-gray-300">
                O papel orienta atributos, habilidades e história. Deixe as outras escolhas no aleatório ou defina a origem. Geração para o Narrador, sem orçamento de XP.
              </p>
            </>
          )}
          <button
            className="rounded-lg bg-red-800 hover:bg-red-700 px-5 py-3"
            onClick={() => onStart(mode, game, role, scale, template, template ? {} : options)}
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
