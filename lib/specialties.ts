import { aMandatorySpecialtySkills, fnGetPredatorTypes } from '../constants';
import { translate } from './i18n';
import { Character, GameType, Skill, Specialty } from '../types';

function isSameSpecialty(a: Specialty, b: Specialty) {
  return a.skill === b.skill && a.name.trim().toLocaleLowerCase('pt-BR') === b.name.trim().toLocaleLowerCase('pt-BR');
}

function predatorSpecialties(c: Character): Specialty[] {
  if (c.gameType !== GameType.Vampire || !c.predatorType) return [];
  return (['pt', 'en'] as const).flatMap(locale => {
    const predator = fnGetPredatorTypes(key => translate(locale, key)).find(p => p.id === c.predatorType);
    return [...(predator?.specialties || []), ...(predator?.specialtyOptions || [])];
  });
}

export function creationSpecialties(c: Character): Specialty[] {
  const grants = predatorSpecialties(c);
  return c.specialties.filter((specialty, index, all) =>
    c.skills[specialty.skill] > 0 &&
    specialty.name.trim() &&
    all.findIndex(item => isSameSpecialty(item, specialty)) === index &&
    !grants.some(grant => isSameSpecialty(grant, specialty))
  );
}

export function missingAutomaticSpecialties(c: Character, specialties = creationSpecialties(c)): Skill[] {
  return aMandatorySpecialtySkills.filter(skill =>
    c.skills[skill] > 0 && !specialties.some(specialty => specialty.skill === skill)
  );
}

export function updateSkills(c: Character, skills: Character['skills']): Character {
  const grants = predatorSpecialties(c);
  return {
    ...c,
    skills,
    specialties: c.specialties.filter(specialty =>
      skills[specialty.skill] > 0 || grants.some(grant => isSameSpecialty(grant, specialty))
    ),
  };
}

export function grantsAutomaticSpecialty(c: Character, skill: Skill): boolean {
  return c.gameType === GameType.Vampire && c.skills[skill] === 0 && aMandatorySpecialtySkills.includes(skill);
}
