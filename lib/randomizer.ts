
import { Character, Clan, Attribute, Skill, DisciplineDetail, PredatorTypeDetail, AdvantageFlaw, GameType, Tribe, Auspice } from '../types';
import { oInitialCharacter, fnGetClanDetails, fnGetPredatorTypes, fnGetDisciplineDetails, aAttributeList, aSkillList, fnGetTribeDetails, fnGetAuspiceDetails, fnGetAdvantagesAndFlaws, fnGetLoresheets } from '../constants';
import { fnGenerateIdentity } from './generators';

type XPLevel = 'fledgling' | 'neonate' | 'ancilla';

// Archetypes define priorities for attributes and skills
const ARCHETYPES = {
    PHYSICAL: {
        attributes: [Attribute.Strength, Attribute.Dexterity, Attribute.Stamina],
        skills: [Skill.Brawl, Skill.Athletics, Skill.Melee, Skill.Larceny, Skill.Survival, Skill.Drive, Skill.Stealth, Skill.Firearms]
    },
    SOCIAL: {
        attributes: [Attribute.Charisma, Attribute.Manipulation, Attribute.Composure],
        skills: [Skill.Persuasion, Skill.Subterfuge, Skill.Intimidation, Skill.Leadership, Skill.Etiquette, Skill.Streetwise, Skill.Performance, Skill.Insight]
    },
    MENTAL: {
        attributes: [Attribute.Intelligence, Attribute.Wits, Attribute.Resolve],
        skills: [Skill.Investigation, Skill.Academics, Skill.Science, Skill.Technology, Skill.Finance, Skill.Medicine, Skill.Occult, Skill.Politics, Skill.Awareness]
    }
};

// Map Role Keys to Archetypes and preferred Predator Types
const ROLE_INTEL: Record<string, { archetype: keyof typeof ARCHETYPES, predators: string[] }> = {
    "Detective": { archetype: "MENTAL", predators: ["Sandman", "Bagger"] },
    "Surgeon": { archetype: "MENTAL", predators: ["Consensualist", "Sandman"] },
    "Hacker": { archetype: "MENTAL", predators: ["Sandman", "Bagger"] },
    "Influencer": { archetype: "SOCIAL", predators: ["Siren", "Osiris"] },
    "Drug Dealer": { archetype: "SOCIAL", predators: ["Alleycat", "Siren"] },
    "CEO": { archetype: "SOCIAL", predators: ["Siren", "Osiris"] },
    "Artist": { archetype: "SOCIAL", predators: ["Siren", "Osiris"] },
    "Musician": { archetype: "SOCIAL", predators: ["Siren", "Osiris"] },
    "Bouncer": { archetype: "PHYSICAL", predators: ["Alleycat"] },
    "Professor": { archetype: "MENTAL", predators: ["Osiris", "Consensualist"] },
    "Student": { archetype: "MENTAL", predators: ["Sandman", "Siren"] },
    "Politician": { archetype: "SOCIAL", predators: ["Osiris", "Siren"] },
    "Lawyer": { archetype: "SOCIAL", predators: ["Siren", "Consensualist"] },
    "Criminal": { archetype: "PHYSICAL", predators: ["Alleycat", "Bagger"] },
    "Thief": { archetype: "PHYSICAL", predators: ["Sandman", "Bagger"] },
    "Assassin": { archetype: "PHYSICAL", predators: ["Alleycat", "Sandman"] },
    "Soldier": { archetype: "PHYSICAL", predators: ["Alleycat"] },
    "Mercenary": { archetype: "PHYSICAL", predators: ["Alleycat"] },
    "Priest": { archetype: "SOCIAL", predators: ["Osiris", "Consensualist"] },
    "Occultist": { archetype: "MENTAL", predators: ["Osiris", "Sandman"] },
    "Model": { archetype: "SOCIAL", predators: ["Siren"] },
    "Writer": { archetype: "MENTAL", predators: ["Sandman", "Bagger"] },
    "Journalist": { archetype: "MENTAL", predators: ["Sandman", "Bagger"] },
    "Activist": { archetype: "SOCIAL", predators: ["Osiris", "Alleycat"] },
    "Anarchist": { archetype: "SOCIAL", predators: ["Alleycat", "Bagger"] },
    "Sire": { archetype: "SOCIAL", predators: ["Osiris"] },
    "Fixer": { archetype: "SOCIAL", predators: ["Bagger", "Alleycat"] },
    "Driver": { archetype: "PHYSICAL", predators: ["Alleycat", "Sandman"] },
    "Chef": { archetype: "PHYSICAL", predators: ["Consensualist", "Sandman"] },
    "Socialite": { archetype: "SOCIAL", predators: ["Siren", "Osiris"] },
    "Spy": { archetype: "MENTAL", predators: ["Sandman", "Bagger"] },
    "Escort": { archetype: "SOCIAL", predators: ["Siren", "Consensualist"] },
    "Graverobber": { archetype: "PHYSICAL", predators: ["Bagger", "Farmer"] },
    "Cultist": { archetype: "SOCIAL", predators: ["Osiris", "Sandman"] }
};

const shuffle = <T>(array: T[]): T[] => {
    return array.map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
};

export const fnCreateRandomCharacter = (sLocale: string, sLevel: XPLevel, fnT: (k: string) => string, gameType: GameType): Character => {
    const identity = fnGenerateIdentity(sLocale, gameType);
    const sRoleKey = identity.roleKey;
    const intel = ROLE_INTEL[sRoleKey] || { 
        archetype: (Object.keys(ARCHETYPES)[Math.floor(Math.random() * 3)] as keyof typeof ARCHETYPES), 
        predators: ["Alleycat", "Siren", "Sandman", "Bagger", "Farmer", "Osiris", "Consensualist"]
    };
    const archetype = ARCHETYPES[intel.archetype];

    // 1. Attributes
    const attributes = { ...oInitialCharacter.attributes };
    const attrPool = [4, 3, 3, 3, 2, 2, 2, 2, 1];
    const priorityAttrs = shuffle(archetype.attributes);
    const otherAttrs = shuffle(aAttributeList.filter(a => !archetype.attributes.includes(a)));
    const allAttrsOrdered = [...priorityAttrs, ...otherAttrs];
    allAttrsOrdered.forEach((attr, idx) => { attributes[attr] = attrPool[idx]; });

    // 2. Skills
    const skills = { ...oInitialCharacter.skills };
    const skillPool = [4, 3, 3, 3, 2, 2, 2, 1, 1, 1, 1]; 
    const prioritySkills = shuffle(archetype.skills);
    const otherSkills = shuffle(aSkillList.filter(s => !archetype.skills.includes(s)));
    const allSkillsOrdered = [...prioritySkills, ...otherSkills];
    for (let i = 0; i < skillPool.length; i++) { skills[allSkillsOrdered[i]] = skillPool[i]; }

    if (gameType === GameType.Werewolf) {
        // 3. Tribe & Auspice
        const tribeList = Object.values(Tribe);
        const selectedTribe = tribeList[Math.floor(Math.random() * tribeList.length)];
        const auspiceList = Object.values(Auspice);
        const selectedAuspice = auspiceList[Math.floor(Math.random() * auspiceList.length)];
        
        const tribeDetails = fnGetTribeDetails(fnT)[selectedTribe];
        const auspiceDetails = fnGetAuspiceDetails(fnT)[selectedAuspice];

        // 4. Gifts (Disciplines in our model)
        const disciplines: Record<string, number> = {};
        const disciplinePowers: Record<string, string[]> = {};
        const giftNames = shuffle([...tribeDetails.gifts, ...auspiceDetails.gifts]);
        
        if (giftNames.length > 0) {
            disciplines[giftNames[0]] = 2;
            if (giftNames.length > 1) {
                disciplines[giftNames[1]] = 1;
            }
        }

        const allDiscDetails = fnGetDisciplineDetails(fnT);
        Object.keys(disciplines).forEach(dKey => {
            const dots = disciplines[dKey];
            const details = allDiscDetails[dKey];
            if (details) {
                const selected: string[] = [];
                const l1s = details.powers.filter(p => p.level === 1);
                if (l1s.length > 0) selected.push(l1s[Math.floor(Math.random() * l1s.length)].id);
                if (dots >= 2) {
                    const l2s = details.powers.filter(p => p.level <= 2 && !selected.includes(p.id));
                    if (l2s.length > 0) selected.push(l2s[Math.floor(Math.random() * l2s.length)].id);
                }
                disciplinePowers[dKey] = selected;
            }
        });

        // 5. Renown (2 in tribe primary, 1 in another)
        const renown = { glory: 0, honor: 0, wisdom: 0 };
        const renownTypes: (keyof typeof renown)[] = ['glory', 'honor', 'wisdom'];
        const primaryRenown = renownTypes[Math.floor(Math.random() * 3)];
        const secondaryRenown = renownTypes.filter(r => r !== primaryRenown)[Math.floor(Math.random() * 2)];
        renown[primaryRenown] = 2;
        renown[secondaryRenown] = 1;

        // 6. Advantages & Flaws
        const allAdvFlaws: AdvantageFlaw[] = fnGetAdvantagesAndFlaws(fnT, GameType.Werewolf);
        const advantages = shuffle(allAdvFlaws.filter(af => af.type === 'advantage')).slice(0, 2).map(af => ({ ...af, cost: af.levels ? af.levels[0] : af.cost }));
        const flaws = shuffle(allAdvFlaws.filter(af => af.type === 'flaw')).slice(0, 1).map(af => ({ ...af, cost: af.levels ? af.levels[0] : af.cost }));

        // 7. Specialties (Werewolf)
        const specialties: { skill: Skill, name: string }[] = [];
        const highSkills = Object.entries(skills).filter(([_, v]) => v >= 3).map(([k]) => k as Skill);
        if (highSkills.length > 0) {
            specialties.push({ skill: highSkills[0], name: fnT('common.unknown') });
        }

        // 8. Loresheets (Werewolf)
        const loresheets: { id: string, level: number }[] = [];
        if (sLevel !== 'fledgling') {
            const allLoresheets = fnGetLoresheets(fnT);
            const selectedLS = allLoresheets[Math.floor(Math.random() * allLoresheets.length)];
            loresheets.push({ id: selectedLS.id, level: sLevel === 'ancilla' ? 2 : 1 });
        }

        // 9. XP Level Adjustments (Werewolf)
        if (sLevel === 'neonate') {
            const bestAttr = priorityAttrs[0];
            attributes[bestAttr] = Math.min(5, attributes[bestAttr] + 1);
        } else if (sLevel === 'ancilla') {
            const bestAttr = priorityAttrs[0];
            attributes[bestAttr] = Math.min(5, attributes[bestAttr] + 1);
            const bestSkill = prioritySkills[0];
            skills[bestSkill] = Math.min(5, skills[bestSkill] + 1);
            if (giftNames.length > 0) {
                const d1 = giftNames[0];
                disciplines[d1] = Math.min(5, (disciplines[d1] || 0) + 1);
            }
            advantages.push({ id: 'resources_bonus', name: fnT('advantages.resources.name'), description: fnT('common.unknown'), cost: 2, type: 'advantage', levels: [2] });
            flaws.push({ id: 'enemy_bonus', name: fnT('flaws.enemy.name'), description: fnT('common.unknown'), cost: 1, type: 'flaw', levels: [1] });
        }

        return {
            ...oInitialCharacter,
            gameType,
            name: identity.name,
            concept: identity.concept,
            mentor: (identity as any).mentor,
            tribe: selectedTribe,
            auspice: selectedAuspice,
            attributes,
            skills,
            specialties,
            disciplines,
            disciplinePowers,
            health: attributes[Attribute.Stamina] + 3,
            willpower: attributes[Attribute.Composure] + attributes[Attribute.Resolve],
            rage: 1,
            renown,
            advantages,
            flaws,
            loresheets
        };
    }

    // 3. Clan (Vampire)
    const clanList = Object.values(Clan);
    const selectedClan = clanList[Math.floor(Math.random() * clanList.length)];
    const clanDetails = fnGetClanDetails(fnT)[selectedClan];

    // 4. Disciplines
    const disciplines: Record<string, number> = {};
    const disciplinePowers: Record<string, string[]> = {};
    const clanDiscNames = shuffle([...clanDetails.disciplines]);
    
    if (clanDiscNames.length > 0) {
        disciplines[clanDiscNames[0]] = 2;
        if (clanDiscNames.length > 1) {
            disciplines[clanDiscNames[1]] = 1;
        }
    } else if (selectedClan === Clan.Caitiff) {
        const allDiscs = Object.keys(fnGetDisciplineDetails(fnT));
        const shuffled = shuffle(allDiscs);
        disciplines[shuffled[0]] = 2;
        disciplines[shuffled[1]] = 1;
    }

    const allDiscDetails = fnGetDisciplineDetails(fnT);
    Object.keys(disciplines).forEach(dKey => {
        const dots = disciplines[dKey];
        const details = allDiscDetails[dKey];
        if (details) {
            const selected: string[] = [];
            const l1s = details.powers.filter(p => p.level === 1);
            if (l1s.length > 0) selected.push(l1s[Math.floor(Math.random() * l1s.length)].id);
            if (dots >= 2) {
                const l2s = details.powers.filter(p => p.level <= 2 && !selected.includes(p.id));
                if (l2s.length > 0) selected.push(l2s[Math.floor(Math.random() * l2s.length)].id);
            }
            disciplinePowers[dKey] = selected;
        }
    });

    // 5. Predator Type (localized and intelligent)
    const allPredatorTypes = fnGetPredatorTypes(fnT);
    const possiblePredators = allPredatorTypes.filter(p => intel.predators.includes(p.name) || intel.predators.includes(fnT(`predatorTypes.${p.name.toLowerCase()}.name`)));
    const selectedPredator = possiblePredators.length > 0 
        ? possiblePredators[Math.floor(Math.random() * possiblePredators.length)] 
        : allPredatorTypes[Math.floor(Math.random() * allPredatorTypes.length)];

    if (selectedPredator.disciplineAdd) {
        const dName = selectedPredator.disciplineAdd.discipline;
        disciplines[dName] = (disciplines[dName] || 0) + selectedPredator.disciplineAdd.dots;
        const details = allDiscDetails[dName];
        if (details) {
            const existing = disciplinePowers[dName] || [];
            const available = details.powers.filter(p => p.level <= disciplines[dName] && !existing.includes(p.id));
            if (available.length > 0) {
                existing.push(available[Math.floor(Math.random() * available.length)].id);
                disciplinePowers[dName] = existing;
            }
        }
    }
    
    const specialties = [...selectedPredator.specialties];
    if (selectedPredator.specialtyOptions && selectedPredator.specialtyOptions.length > 0) {
        specialties.push(selectedPredator.specialtyOptions[Math.floor(Math.random() * selectedPredator.specialtyOptions.length)]);
    }

    let advantages = [...selectedPredator.advantages];
    let flaws = [...selectedPredator.flaws];

    // 6. XP Level Adjustments
    let generation: number | undefined = 12;
    let bloodPotency: number | undefined = 1;
    let humanity: number | undefined = (7 + selectedPredator.humanityModifier);
    let rage: number | undefined = undefined;
    let harano: number | undefined = undefined;
    let hauglosk: number | undefined = undefined;
    let renown: Character['renown'] = undefined;

    const loresheets: { id: string, level: number }[] = [];
    if (sLevel !== 'fledgling') {
        const allLoresheets = fnGetLoresheets(fnT);
        const selectedLS = allLoresheets[Math.floor(Math.random() * allLoresheets.length)];
        loresheets.push({ id: selectedLS.id, level: sLevel === 'ancilla' ? 2 : 1 });
    }

    if (sLevel === 'neonate') {
        generation = 12;
        const bestAttr = priorityAttrs[0];
        attributes[bestAttr] = Math.min(5, attributes[bestAttr] + 1); 
    } else if (sLevel === 'ancilla') {
        generation = 11;
        bloodPotency = 2;
        const bestAttr = priorityAttrs[0];
        attributes[bestAttr] = Math.min(5, attributes[bestAttr] + 1); 
        const bestSkill = prioritySkills[0];
        skills[bestSkill] = Math.min(5, skills[bestSkill] + 1);
        if (clanDiscNames.length > 0) {
            const d1 = clanDiscNames[0];
            disciplines[d1] = Math.min(5, (disciplines[d1] || 0) + 1);
        }
        advantages.push({ id: 'resources_bonus', name: fnT('advantages.resources.name'), description: fnT('common.unknown'), cost: 2, type: 'advantage', levels: [2] });
        flaws.push({ id: 'enemy_bonus', name: fnT('flaws.enemy.name'), description: fnT('common.unknown'), cost: 1, type: 'flaw', levels: [1] });
    }

    return {
        ...oInitialCharacter,
        gameType: GameType.Vampire,
        name: identity.name,
        concept: identity.concept,
        sire: (identity as any).sire,
        clan: selectedClan,
        generation,
        bloodPotency,
        humanity,
        rage,
        harano,
        hauglosk,
        renown,
        attributes,
        skills,
        disciplines,
        disciplinePowers,
        predatorType: selectedPredator.id,
        specialties,
        advantages,
        flaws,
        health: attributes[Attribute.Stamina] + 3,
        willpower: attributes[Attribute.Composure] + attributes[Attribute.Resolve],
        hunger: 1,
        loresheets
    };
};
