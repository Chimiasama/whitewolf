/** Session-local shuffle decks: exhaust the pool before repeating an entry. */
const decks = new Map<string, { source: readonly string[]; remaining: string[]; last?: string }>();
export function shuffled<T>(values: readonly T[]): T[] {
  const result = [...values];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
export function nextChoice(key: string, values: readonly string[], current = ''): string {
  if (!values.length) return current;
  let deck = decks.get(key);
  if (!deck || deck.source !== values) {
    deck = { source: values, remaining: [] };
    decks.set(key, deck);
  }
  if (!deck.remaining.length) deck.remaining = shuffled([...new Set(values)]);
  const index = deck.remaining.findIndex(value => value !== current && value !== deck!.last);
  const value = deck.remaining.splice(index < 0 ? 0 : index, 1)[0];
  deck.last = value;
  return value;
}
const recent = new Map<string, string[]>();
export function freshGenerated(key: string, generate: () => string, current = ''): string {
  const history = recent.get(key) || [];
  let value = generate();
  for (let i = 0; i < 100 && (value === current || history.includes(value)); i++) value = generate();
  recent.set(key, [...history, value].slice(-512));
  return value;
}
