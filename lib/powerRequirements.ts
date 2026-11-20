import type { DisciplineDetail, DisciplinePower, Disciplines } from '../types';
export function powerPrerequisitesMet(power:DisciplinePower,selected:string[]):boolean {
 return (!power.prerequisite||selected.includes(power.prerequisite))&&(!power.prerequisiteAny?.length||power.prerequisiteAny.some(id=>selected.includes(id)));
}

/** Keep earlier choices where possible and fit older selections into legal purchase order. */
export function fitDisciplinePowers(
 discipline: DisciplineDetail, ids: string[], disciplines: Disciplines, key: string, preserveExtraFormulae = false,
): string[] {
 const remaining = [...new Set(ids)].flatMap(id => {
  const power = discipline.powers.find(item => item.id === id);
  return power && !power.amalgam?.some(req => (disciplines[req.discipline] || 0) < req.level)
   ? [power] : [];
 });
 const ordered: string[] = [];
 const dots = disciplines[key] || 0;
 while (ordered.length < dots) {
  const index = remaining.findIndex(power =>
   power.level <= ordered.length + 1 && powerPrerequisitesMet(power, ordered));
  if (index < 0) break;
  ordered.push(remaining.splice(index, 1)[0].id);
 }
 if (preserveExtraFormulae) {
  for (const formula of remaining) {
   if (formula.level <= dots && powerPrerequisitesMet(formula, ordered)) ordered.push(formula.id);
  }
 }
 return ordered;
}
