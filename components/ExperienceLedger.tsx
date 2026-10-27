import React, { useState } from "react";
import { Character } from "../types";
import { appendExperience, experienceBalance } from "../lib/experience";
export function ExperienceLedger({
  character: c,
  onChange,
}: {
  character: Character;
  onChange: (key: keyof Character, value: any) => void;
}) {
  const [kind, setKind] = useState<"earned" | "spent">("earned"),
    [amount, setAmount] = useState(""),
    [note, setNote] = useState(""),
    [date, setDate] = useState(() =>
      new Intl.DateTimeFormat("sv-SE", {
        timeZone: "America/Sao_Paulo",
      }).format(new Date()),
    ),
    [error, setError] = useState("");
  return (
    <section aria-label="Histórico de XP" className="space-y-4">
      <h3 className="text-xl">Histórico de experiência</h3>
      <p className="text-sm text-gray-300">
        Registro de ganhos e gastos. Este controle não altera características
        automaticamente; confira o custo no livro antes de editar a ficha.
      </p>
      <strong className="block text-2xl">
        Saldo: {experienceBalance(c)} XP
      </strong>
      <form
        className="grid gap-4 sm:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault();
          try {
            const entry = {
              id: crypto.randomUUID(),
              kind,
              amount: Number(amount),
              date,
              note: note.trim(),
            };
            const next = appendExperience(c, entry);
            onChange("experience", next.experience);
            setAmount("");
            setNote("");
            setError("");
          } catch (err) {
            setError(
              err instanceof Error
                ? err.message
                : "Não foi possível registrar.",
            );
          }
        }}
      >
        <label>
          Movimentação
          <select
            className="mt-2 block w-full rounded p-3"
            value={kind}
            onChange={(e) => setKind(e.target.value as typeof kind)}
          >
            <option value="earned">XP recebido</option>
            <option value="spent">XP gasto</option>
          </select>
        </label>
        <label>
          Quantidade de XP
          <input
            className="mt-2 block w-full rounded p-3"
            type="number"
            min={1}
            max={100000}
            step={1}
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <label>
          Data
          <input
            className="mt-2 block w-full rounded p-3"
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label>
          Descrição do registro
          <input
            className="mt-2 block w-full rounded p-3"
            required
            value={note}
            maxLength={1000}
            onChange={(e) => setNote(e.target.value)}
          />
        </label>
        <button className="rounded border p-3 sm:col-span-2" type="submit">
          Registrar XP
        </button>
      </form>
      {error && <p role="alert">{error}</p>}
      <ol className="space-y-3">
        {[...(c.experience || [])].reverse().map((e) => (
          <li key={e.id} className="rounded border border-gray-600 p-3">
            <strong>
              {e.kind === "earned" ? "+" : "−"}
              {e.amount} XP
            </strong>{" "}
            · {e.date}
            <p>{e.note}</p>
          </li>
        ))}
      </ol>
      <p className="text-sm text-gray-400">
        O histórico acompanha a exportação JSON.
      </p>
    </section>
  );
}
