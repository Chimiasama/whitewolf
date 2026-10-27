import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { GameType } from "../types";
import { InfoModal } from "../components/InfoModal";
export const THEMES = {
  minimal: "Minimalista · foco e leitura",
  neon: "Neon · luz e vidro",
  horror: "Terror · sombras e ferrugem",
  medieval: "Medieval · pergaminho e brasões",
  auto: "Automático por jogo",
  vampire: "Vampiro · Noite Carmesim",
  werewolf: "Lobisomem · Lua e Raízes",
  paper: "Papel · claro",
  contrast: "Alto contraste",
};
export type ThemePreference = keyof typeof THEMES;
const ThemeContext = createContext<{
  preference: ThemePreference;
  resolved: string;
  game: GameType | null;
  setPreference: (theme: ThemePreference) => void;
  setGame: (game: GameType | null) => void;
} | null>(null);
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [preference, setPreference] = useState<ThemePreference>(() => {
    try {
      const saved = localStorage.getItem("whitewolf_theme");
      if (saved && Object.hasOwn(THEMES, saved))
        return saved as ThemePreference;
    } catch {}
    return "auto";
  });
  const [game, setGame] = useState<GameType | null>(null);
  const resolved =
    preference === "auto"
      ? game === GameType.Werewolf
        ? "werewolf"
        : "vampire"
      : preference;
  useEffect(() => {
    document.documentElement.dataset.theme = resolved;
    document.documentElement.dataset.game = game || "neutral";
    document.documentElement.style.colorScheme = ["paper", "medieval"].includes(
      resolved,
    )
      ? "light"
      : "dark";
    try {
      localStorage.setItem("whitewolf_theme", preference);
    } catch {}
  }, [preference, resolved, game]);
  const value = useMemo(
    () => ({ preference, resolved, game, setPreference, setGame }),
    [preference, resolved, game],
  );
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
export function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) throw new Error("ThemeProvider ausente");
  return value;
}
const PREVIEWS: Record<
  ThemePreference,
  {
    bg: string;
    panel: string;
    accent: string;
    ink: string;
    description: string;
  }
> = {
  minimal: {
    bg: "#10151c",
    panel: "#1a222d",
    accent: "#a8bdd4",
    ink: "#ecf1f6",
    description:
      "Geometria simples, pouco ornamento e leitura em primeiro plano.",
  },
  neon: {
    bg: "#080b20",
    panel: "#141b39",
    accent: "#65f7ed",
    ink: "#eef9ff",
    description:
      "Luzes ciano e magenta, superfícies de vidro e atmosfera urbana.",
  },
  horror: {
    bg: "#15100d",
    panel: "#231a16",
    accent: "#eba783",
    ink: "#f2e2cb",
    description: "Sombras densas, ferrugem, textura discreta e tensão.",
  },
  medieval: {
    bg: "#e2d3b5",
    panel: "#f4e7c8",
    accent: "#6e3040",
    ink: "#302519",
    description: "Pergaminho, molduras heráldicas e títulos serifados.",
  },
  auto: {
    bg: "#101619",
    panel: "#1c2426",
    accent: "#b7d4c4",
    ink: "#ecf1f6",
    description: "Noite Carmesim para Vampiro; Lua e Raízes para Lobisomem.",
  },
  vampire: {
    bg: "#110d14",
    panel: "#1c1621",
    accent: "#f28d9b",
    ink: "#f2e9e9",
    description: "Vinho e ouro suave, inspirado no horror gótico.",
  },
  werewolf: {
    bg: "#0b1514",
    panel: "#142722",
    accent: "#9ed8bc",
    ink: "#ecf3e7",
    description: "Verdes profundos, linhas orgânicas e luz lunar.",
  },
  paper: {
    bg: "#eee9df",
    panel: "#fffcf5",
    accent: "#8a2440",
    ink: "#24211e",
    description: "Clareza de um caderno, sem texturas e com bordas suaves.",
  },
  contrast: {
    bg: "#000",
    panel: "#080808",
    accent: "#ffea65",
    ink: "#fff",
    description: "Preto, branco e amarelo com contornos marcados.",
  },
};
export function ThemeControl() {
  const { preference, setPreference } = useTheme();
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-2">
      <label className="block text-sm">
        Tema visual
        <select
          className="mt-2 block w-full rounded border border-gray-600 bg-gray-900 p-2"
          value={preference}
          onChange={(e) => setPreference(e.target.value as ThemePreference)}
        >
          {Object.entries(THEMES).map(([id, name]) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
      </label>
      <button
        type="button"
        className="text-sm underline"
        onClick={() => setOpen(true)}
      >
        Explorar estilos visuais
      </button>
      {open && (
        <InfoModal
          title="Escolha seu estilo visual"
          onClose={() => setOpen(false)}
        >
          <p className="mb-4 text-sm">
            Todos os estilos funcionam nos dois jogos. A preferência fica salva
            neste navegador.
          </p>
          <fieldset className="grid gap-4 sm:grid-cols-2">
            <legend className="sr-only">Estilo visual</legend>
            {Object.entries(THEMES).map(([id, name]) => {
              const p = PREVIEWS[id];
              return (
                <label
                  key={id}
                  className="theme-swatch block rounded-lg border border-gray-600 p-3 cursor-pointer"
                >
                  <span
                    aria-hidden="true"
                    className="block rounded p-3 mb-3"
                    style={{ background: p.bg, color: p.ink }}
                  >
                    <span
                      className="block text-sm mb-2"
                      style={{
                        color: p.accent,
                        fontFamily: ["medieval", "vampire", "horror"].includes(
                          id,
                        )
                          ? "Cinzel,serif"
                          : "Inter,sans-serif",
                      }}
                    >
                      Whitewolf
                    </span>
                    <span
                      className="block rounded border p-2 text-xs"
                      style={{ background: p.panel, borderColor: p.accent }}
                    >
                      Sua história, seu personagem
                    </span>
                  </span>
                  <input
                    type="radio"
                    name="visual-style"
                    checked={preference === id}
                    onChange={() => setPreference(id as ThemePreference)}
                  />
                  <strong className="ml-2 text-sm">{name}</strong>
                  <span className="block mt-2 text-sm">{p.description}</span>
                </label>
              );
            })}
          </fieldset>
        </InfoModal>
      )}
    </div>
  );
}
export function MoonGlyph({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M23 5a12 12 0 1 0 4 19A11 11 0 0 1 23 5Z" />
      <path d="m10 22 5-13m1 15 4-12m-1 13 5-9" strokeLinecap="round" />
    </svg>
  );
}
