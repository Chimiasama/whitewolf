
import { GoogleGenAI } from "@google/genai";
import type { Character } from '../types';
import { GameType } from '../types';
import { fnGetClanDetails, fnGetTribeDetails, fnGetAuspiceDetails } from '../constants';

// Always initialize GoogleGenAI with the apiKey from process.env.API_KEY
const oAi = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

type TFunction = (key: string, replacements?: Record<string, string | number>) => string;

function fnBuildBasePrompt(oCharacter: Character, fnT: TFunction, sLocale: string): string {
    const sPromptLanguage = sLocale === 'pt' ? 'Brazilian Portuguese' : 'English';
    const bIsWerewolf = oCharacter.gameType === GameType.Werewolf;
    
    const sAdvantagesString = oCharacter.advantages.map(a => `${a.name} (${a.cost})`).join(', ') || fnT('common.noneListed');
    const sFlawsString = oCharacter.flaws.map(f => `${f.name} (${f.cost})`).join(', ') || fnT('common.noneListed');
    const sSpecialtiesString = oCharacter.specialties.map(s => `${fnT(`skills.list.${s.skill}`)} (${s.name})`).join(', ') || fnT('common.noneListed');

    let sGameSpecific = '';
    if (bIsWerewolf) {
        const oTribeDetails = fnGetTribeDetails(fnT);
        const oAuspiceDetails = fnGetAuspiceDetails(fnT);
        sGameSpecific = `
        - ${fnT('characterSheet.tribe')}: ${oCharacter.tribe || fnT('common.unknown')}
        - ${fnT('characterSheet.auspice')}: ${oCharacter.auspice || fnT('common.unknown')}
        - ${fnT('characterSheet.tribeBane')}: ${oCharacter.tribe ? oTribeDetails[oCharacter.tribe].bane : fnT('common.unknown')}
        - ${fnT('characterSheet.mentor')}: ${oCharacter.mentor || fnT('common.unknown')}
        - ${fnT('characterSheet.renown')}: Glory ${oCharacter.renown?.glory}, Honor ${oCharacter.renown?.honor}, Wisdom ${oCharacter.renown?.wisdom}
        `;
    } else {
        const oClanDetails = fnGetClanDetails(fnT);
        sGameSpecific = `
        - ${fnT('characterSheet.clan')}: ${oCharacter.clan || fnT('common.unknown')}
        - ${fnT('characterSheet.clanCompulsion')}: ${oCharacter.clan ? oClanDetails[oCharacter.clan].compulsion : fnT('common.unknown')}
        - ${fnT('characterSheet.sire')}: ${oCharacter.sire || fnT('common.unknown')}
        - ${fnT('characterSheet.predatorType')}: ${oCharacter.predatorType || fnT('common.notDefined')}
        - ${fnT('characterSheet.generation')}: ${oCharacter.generation}
        `;
    }

    return `
    You are a creative writer for the tabletop role-playing game ${bIsWerewolf ? 'Werewolf: The Apocalypse 5th Edition' : 'Vampire: The Masquerade 5th Edition'}.
    Based on the following character details, generate a compelling response in ${sPromptLanguage}.

    Character Details:
    - ${fnT('characterSheet.name')}: ${oCharacter.name || fnT('common.unnamed')}
    - ${fnT('characterSheet.concept')}: ${oCharacter.concept || fnT('common.notDefined')}
    - ${fnT('characterSheet.ambition')}: ${oCharacter.ambition || fnT('common.notDefined')}
    - ${fnT('characterSheet.desire')}: ${oCharacter.desire || fnT('common.notDefined')}
    ${sGameSpecific}
    - ${fnT('characterSheet.advantages')}: ${sAdvantagesString}
    - ${fnT('characterSheet.flaws')}: ${sFlawsString}
    - ${fnT('characterSheet.specialties')}: ${sSpecialtiesString}
    - ${fnT('common.keyAttributes')}: ${Object.entries(oCharacter.attributes).sort((a, b) => b[1] - a[1]).slice(0, 3).map(e => fnT(`attributes.list.${e[0]}`)).join(', ')}
    - ${fnT('common.keySkills')}: ${Object.entries(oCharacter.skills).filter(s => s[1] > 0).sort((a, b) => b[1] - a[1]).slice(0, 3).map(e => fnT(`skills.list.${e[0]}`)).join(', ')}

    ---
    `;
}

// Fix: Updating models to gemini-3-flash-preview as it is the current standard for basic text tasks
export const fnGenerateBackstory = async (oCharacter: Character, fnT: TFunction, sLocale: string): Promise<string> => {
    if (!process.env.API_KEY) return "API key not configured.";
    try {
        const sPrompt = `
        ${fnBuildBasePrompt(oCharacter, fnT, sLocale)}
        ${fnT('gemini.backstoryPrompt')}
        `;
        const oResponse = await oAi.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: sPrompt,
        });
        return oResponse.text;
    } catch (error) {
        console.error("Error generating backstory:", error);
        return fnT('gemini.errorBackstory');
    }
};

export const fnGeneratePlotHook = async (oCharacter: Character, fnT: TFunction, sLocale: string): Promise<string> => {
    if (!process.env.API_KEY) return "API key not configured.";
    try {
        const sPrompt = `
        ${fnBuildBasePrompt(oCharacter, fnT, sLocale)}
        ${fnT('gemini.plotHookPrompt')}
        `;
        const oResponse = await oAi.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: sPrompt,
        });
        return oResponse.text;
    } catch (error) {
        console.error("Error generating plot hook:", error);
        return fnT('gemini.errorPlotHook');
    }
};

export const fnGeneratePortraitDescription = async (oCharacter: Character, fnT: TFunction, sLocale: string): Promise<string> => {
    if (!process.env.API_KEY) return "API key not configured.";
    try {
        const sPrompt = `
        ${fnBuildBasePrompt(oCharacter, fnT, sLocale)}
        ${fnT('gemini.portraitPrompt')}
        `;
        const oResponse = await oAi.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: sPrompt,
        });
        return oResponse.text;
    } catch (error) {
        console.error("Error generating portrait description:", error);
        return fnT('gemini.errorPortrait');
    }
};
