import { Character, PredatorTypeDetail, Clan } from "../types";
export function resolvePredator(
  p: PredatorTypeDetail,
  c: Partial<Character> = {},
): PredatorTypeDetail {
  const advantages = [...(p.fixedAdvantages || p.advantages)],
    flaws = [...(p.fixedFlaws || p.flaws)];
  for (const group of p.choices || []) {
    const selected =
      group.options.find((o) => o.id === c.predatorChoices?.[group.id]) ||
      group.options[0];
    (group.type === "advantage" ? advantages : flaws).push({ ...selected });
  }
  for (const group of p.allocations || [])
    for (let i = 0; i < group.options.length; i++) {
      const option = group.options[i];
      const count =
        c.predatorAllocations?.[option.id] ?? (i === 0 ? group.total : 0);
      if (count > 0)
        (group.type === "flaw" ? flaws : advantages).push({
          ...option,
          cost: count,
        });
    }
  const options = availablePredatorDisciplines(p, c.clan);
  const discipline = options.includes(c.predatorDiscipline)
    ? c.predatorDiscipline
    : options.includes(p.disciplineAdd?.discipline)
      ? p.disciplineAdd.discipline
      : options[0];
  return {
    ...p,
    advantages,
    flaws,
    disciplineAdd: discipline ? { discipline, dots: 1 } : undefined,
  };
}
export function availablePredatorDisciplines(
  p: PredatorTypeDetail,
  clan?: Clan | null,
) {
  return (
    p.disciplineOptions || [p.disciplineAdd?.discipline].filter(Boolean)
  ).filter(
    (id) =>
      !(
        ["bagger", "osiris"].includes(p.id) &&
        id === "bloodsorcery" &&
        ![Clan.Tremere, Clan.BanuHaqim].includes(clan)
      ),
  );
}
export function characterPredator(
  c: Character,
  catalogue: PredatorTypeDetail[],
) {
  const p = catalogue.find((p) => p.id === c.predatorType);
  return p ? resolvePredator(p, c) : undefined;
}
export function changePredator(
  c: Character,
  catalogue: PredatorTypeDetail[],
  id: string,
  changes: Partial<Character> = {},
): Character {
  const old = characterPredator(c, catalogue);
  const same = id === c.predatorType;
  const next = {
    ...c,
    predatorType: id || null,
    predatorDiscipline: same ? c.predatorDiscipline : undefined,
    predatorChoices: same ? c.predatorChoices : {},
    predatorAllocations: same ? c.predatorAllocations : {},
    ...changes,
  };
  const p = characterPredator(next, catalogue);
  const disciplines = { ...c.disciplines };
  if (old?.disciplineAdd) {
    const d = old.disciplineAdd;
    disciplines[d.discipline] = Math.max(
      0,
      (disciplines[d.discipline] || 0) - d.dots,
    );
    if (!disciplines[d.discipline]) delete disciplines[d.discipline];
  }
  if (p?.disciplineAdd) {
    const d = p.disciplineAdd;
    disciplines[d.discipline] = (disciplines[d.discipline] || 0) + d.dots;
    next.predatorDiscipline = d.discipline;
  }
  const oldIds = new Set(
    [...(old?.advantages || []), ...(old?.flaws || [])]
      .map((a) => a.id)
      .concat(old?.legacyBonusIds || []),
  );
  const oldSpecialties = same
    ? []
    : [...(old?.specialties || []), ...(old?.specialtyOptions || [])];
  return {
    ...next,
    disciplines,
    humanity: Math.max(
      0,
      Math.min(
        10,
        c.humanity - (old?.humanityModifier || 0) + (p?.humanityModifier || 0),
      ),
    ),
    bloodPotency: Math.max(
      0,
      Math.min(
        10,
        c.bloodPotency -
          (old?.bloodPotencyModifier || 0) +
          (p?.bloodPotencyModifier || 0),
      ),
    ),
    advantages: [
      ...c.advantages.filter((a) => !oldIds.has(a.id)),
      ...(p?.advantages || []),
    ],
    flaws: [...c.flaws.filter((a) => !oldIds.has(a.id)), ...(p?.flaws || [])],
    specialties: [
      ...c.specialties.filter(
        (s) =>
          !oldSpecialties.some((x) => x.skill === s.skill && x.name === s.name),
      ),
      ...(!same ? p?.specialties || [] : []),
    ],
  };
}

/** Allocate across any number of backgrounds, preserving the exact package total. */
export function distributePredatorPoints(group:NonNullable<PredatorTypeDetail['allocations']>[number],previous:Record<string,number>,id:string,value:number):Record<string,number>{
 const index=group.options.findIndex(option=>option.id===id);
 if(index<0||!Number.isInteger(value)||value<0||value>group.total)return previous;
 const allowed=group.options.map(option=>option.levels?.some(n=>n>0)?[...new Set([0,...option.levels])].filter(n=>n<=group.total):Array.from({length:group.total+1},(_,n)=>n));
 if(!allowed[index].includes(value))return previous;
 const current=group.options.map((option,i)=>previous[option.id]??(i===0?group.total:0));
 let best:number[]|undefined,bestScore=Infinity;
 const visit=(i:number,values:number[],sum:number)=>{
  if(sum>group.total)return;
  if(i===group.options.length){if(sum!==group.total)return;const score=values.reduce((total,n,j)=>total+Math.abs(n-current[j]),0);if(score<bestScore){best=values;bestScore=score;}return;}
  for(const n of i===index?[value]:allowed[i])visit(i+1,[...values,n],sum+n);
 };
 visit(0,[],0);
 return best?{...previous,...Object.fromEntries(group.options.map((option,i)=>[option.id,best![i]]))}:previous;
}
