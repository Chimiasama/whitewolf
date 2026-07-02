
import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { Character, Clan, Attribute, Skill, DisciplineDetail, PredatorTypeDetail, AdvantageFlaw, Specialty, DisciplinePower, DisciplineCombo, GameType, Tribe, Auspice } from './types';
import { fnGetClanDetails, oInitialCharacter, fnGetPredatorTypes, aSkillList, aAttributeList, fnGetDisciplineDetails, fnGetAdvantagesAndFlaws, aMandatorySpecialtySkills, fnGetDisciplineCombos, fnGetTribeDetails, fnGetAuspiceDetails, fnGetLoresheets, fnGetRituals, fnGetTalismans } from './constants';
import { Card } from './components/ui/Card';
import { Button } from './components/ui/Button';
import { Input, TextArea } from './components/ui/Input';
import { CharacterSheet } from './components/CharacterSheet';
import { useI18n } from './lib/i18n';
import { InfoModal } from './components/InfoModal';
import { InfoIcon } from './components/InfoIcon';
import { GothicFrame, RoseIcon } from './components/ui/GothicFrame';
import { LoreQuote } from './components/ui/LoreQuote';
import { StepIndicator } from './components/StepIndicator';
import { fnGenerateIdentity } from './lib/generators';
import { fnCreateRandomCharacter } from './lib/randomizer';

// --- ICONS --- //
const CheckCircle = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-green-500">
        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
    </svg>
);

const ExclamationCircle = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-500">
        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
    </svg>
);

const ResetIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
    </svg>
);

const FloppyDiskIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 20.25h-2.25a2.25 2.25 0 01-13.5 18v-2.25z" />
  </svg>
);

const FolderOpenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
  </svg>
);

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
);

const BloodIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
    </svg>
);

const ClawIcon = ({ className, filled }: { className?: string, filled?: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12,2C12,2 10,6 10,10C10,14 12,18 12,18C12,18 14,14 14,10C14,6 12,2 12,2M17,4C17,4 15,8 15,12C15,16 17,20 17,20C17,20 19,16 19,12C19,8 17,4 17,4M7,4C7,4 5,8 5,12C5,16 7,20 7,20C7,20 9,16 9,12C9,8 7,4 7,4Z" />
    </svg>
);

const WolfCubIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12,2C10.89,2 10,2.89 10,4C10,5.11 10.89,6 12,6C13.11,6 14,5.11 14,4C14,2.89 13.11,2 12,2M12,8C9.79,8 8,9.79 8,12C8,14.21 9.79,16 12,16C14.21,16 16,14.21 16,12C16,9.79 14.21,8 12,8M12,18C10.34,18 9,19.34 9,21H15C15,19.34 13.66,18 12,18Z" />
    </svg>
);

const DiceIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.663-.658v0c0-.355-.186-.676-.401-.959a1.585 1.585 0 00-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.401.604-.401.959v0c0 .333.137.633.36.851 2.246.133 4.518-.091 6.69-.654.196-.99.317-2.02.317-3.078 0-1.058-.121-2.088-.317-3.078a.645.645 0 01-.663.658v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.369 0 .713.128 1.003.349.283.215.604.401.959.401v0c.328 0 .583-.28.525-.604a47.82 47.82 0 00-2.31-9.336c-.958-.113-1.933-.113-2.89 0a48.044 48.044 0 00-.642 5.056c-.023.31.222.57.532.57v0z" />
    </svg>
);

// --- HELPER COMPONENTS --- //
const GameSelection: React.FC<{ onSelect: (game: GameType) => void }> = ({ onSelect }) => {
    const { t: fnT } = useI18n();
    return (
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fadeIn px-4">
            <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-cinzel text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                    {fnT('gameSelection.title')}
                </h1>
                <p className="text-gray-400 text-lg italic max-w-2xl mx-auto">
                    {fnT('gameSelection.subtitle')}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div 
                    onClick={() => onSelect(GameType.Vampire)}
                    className="group relative cursor-pointer overflow-hidden rounded-xl border-2 border-red-900/30 bg-black/40 p-4 sm:p-8 transition-all hover:border-red-600 hover:shadow-[0_0_30px_rgba(220,38,38,0.2)]"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-red-900/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="relative z-10 space-y-6">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-900/20 text-red-500 ring-4 ring-red-900/10 group-hover:scale-110 transition-transform">
                            <BloodIcon />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl md:text-3xl font-cinzel text-red-500">{fnT('app.vampire')}</h2>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {fnT('gameSelection.vampireDesc')}
                            </p>
                        </div>
                        <Button className="w-full bg-red-900/40 hover:bg-red-600 border border-red-500/50">
                            {fnT('buttons.next')}
                        </Button>
                    </div>
                </div>

                <div 
                    onClick={() => onSelect(GameType.Werewolf)}
                    className="group relative cursor-pointer overflow-hidden rounded-xl border-2 border-emerald-900/30 bg-black/40 p-4 sm:p-8 transition-all hover:border-emerald-600 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="relative z-10 space-y-6">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-900/20 text-emerald-500 ring-4 ring-emerald-900/10 group-hover:scale-110 transition-transform">
                            <ClawIcon />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl md:text-3xl font-cinzel text-emerald-500">{fnT('app.werewolf')}</h2>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {fnT('gameSelection.werewolfDesc')}
                            </p>
                        </div>
                        <Button className="w-full bg-emerald-900/40 hover:bg-emerald-600 border border-emerald-500/50">
                            {fnT('buttons.next')}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CharacterSummary: React.FC<{ character: Character }> = ({ character: oCharacter }) => {
    const { t: fnT } = useI18n();
    
    const aChecks = useMemo(() => {
        const aList = [];
        const bConceptValid = !!(oCharacter.name && oCharacter.concept && oCharacter.ambition && oCharacter.desire);
        aList.push({ label: fnT('steps.concept'), isValid: bConceptValid, error: fnT('summary.missing_concept') });
        
        if (oCharacter.gameType === GameType.Vampire) {
            const bClanValid = !!oCharacter.clan;
            aList.push({ label: fnT('steps.clan'), isValid: bClanValid, error: fnT('summary.missing_clan') });
        } else {
            const bTribeValid = !!oCharacter.tribe;
            aList.push({ label: fnT('steps.tribe'), isValid: bTribeValid, error: fnT('summary.missing_tribe') });
            const bAuspiceValid = !!oCharacter.auspice;
            aList.push({ label: fnT('steps.auspice'), isValid: bAuspiceValid, error: fnT('summary.missing_auspice') });
        }

        const nAttrSum = (Object.values(oCharacter.attributes) as number[]).reduce((nAcc: number, nVal: number) => nAcc + nVal, 0);
        const bAttributesValid = nAttrSum >= 22;
        aList.push({ label: fnT('steps.attributes'), isValid: bAttributesValid, error: fnT('summary.error_attributes') });
        const nSkillSum = (Object.values(oCharacter.skills) as number[]).reduce((nAcc: number, nVal: number) => nAcc + nVal, 0);
        const bSkillsValid = nSkillSum >= 22; 
        aList.push({ label: fnT('steps.skills'), isValid: bSkillsValid, error: fnT('summary.error_skills') });
        
        if (oCharacter.gameType === GameType.Vampire) {
            const bPredatorValid = !!oCharacter.predatorType;
            aList.push({ label: fnT('finishingTouches.predatorType.title'), isValid: bPredatorValid, error: fnT('summary.missing_predator') });
        }

        const nDisciplineDots = (Object.values(oCharacter.disciplines) as number[]).reduce((nAcc: number, nVal: number) => nAcc + nVal, 0);
        const bDisciplinesValid = nDisciplineDots >= 3;
        const nAdvSum = oCharacter.advantages.reduce((nAcc: number, oVal) => nAcc + oVal.cost, 0);
        const nFlawSum = oCharacter.flaws.reduce((nAcc: number, oVal) => nAcc + oVal.cost, 0);
        const bAdvantagesValid = nAdvSum >= 7;
        const bFlawsValid = nFlawSum >= 2;
        const bFinishingValid = bDisciplinesValid && bAdvantagesValid && bFlawsValid;
        let sFinishingError = '';
        if (!bDisciplinesValid) sFinishingError = oCharacter.gameType === GameType.Vampire ? fnT('summary.error_disciplines') : fnT('summary.error_gifts');
        else if (!bAdvantagesValid) sFinishingError = fnT('summary.error_advantages');
        else if (!bFlawsValid) sFinishingError = fnT('summary.error_flaws');
        aList.push({ label: fnT('steps.finishingTouches'), isValid: bFinishingValid, error: sFinishingError });
        return aList;
    }, [oCharacter, fnT]);

    const bAllValid = aChecks.every(c => c.isValid);

    return (
        <GothicFrame className="text-left mt-8">
             <div className="p-6 bg-gray-800/50">
                <div className="flex items-center mb-6">
                    {bAllValid ? <CheckCircle /> : <ExclamationCircle />}
                    <div className="ml-3">
                        <h3 className="text-xl font-bold text-gray-200">{fnT('summary.title')}</h3>
                        <p className="text-gray-400 text-sm">{bAllValid ? fnT('summary.readySubtitle') : fnT('summary.incompleteSubtitle')}</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {aChecks.map((oCheck, nIdx) => (
                        <div key={nIdx} className={`flex items-center p-3 rounded-lg border ${oCheck.isValid ? 'bg-green-900 bg-opacity-20 border-green-900' : 'bg-red-900 bg-opacity-20 border-red-900'}`}>
                            <div className="flex-shrink-0 mr-3">
                                {oCheck.isValid ? (
                                    <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                )}
                            </div>
                            <div>
                                <h4 className={`font-bold ${oCheck.isValid ? 'text-green-400' : 'text-red-400'}`}>{oCheck.label}</h4>
                                {!oCheck.isValid && <p className="text-xs text-red-300 mt-1">{oCheck.error}</p>}
                            </div>
                        </div>
                    ))}
                </div>
             </div>
        </GothicFrame>
    );
};

interface StorageModalProps {
    mode: 'save' | 'load';
    onClose: () => void;
    currentName?: string;
    onSave: (name: string) => void;
    onLoad: (name: string) => void;
    onDelete: (name: string) => void;
}

const StorageModal: React.FC<StorageModalProps> = ({ mode: sMode, onClose: fnOnClose, currentName: sCurrentName, onSave: fnOnSave, onLoad: fnOnLoad, onDelete: fnOnDelete }) => {
    const { t: fnT } = useI18n();
    const [sNameInput, fnSetNameInput] = useState(sCurrentName || '');
    const [aSavedFiles, fnSetSavedFiles] = useState<string[]>([]);
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const aKeys = [];
            for (let nI = 0; nI < localStorage.length; nI++) {
                const sKey = localStorage.key(nI);
                if (sKey && sKey.startsWith('vtm_save_')) {
                    aKeys.push(sKey.replace('vtm_save_', ''));
                }
            }
            fnSetSavedFiles(aKeys.sort());
        }
    }, []);

    const fnHandleSave = () => {
        if (!sNameInput.trim()) return;
        if (aSavedFiles.includes(sNameInput) && !window.confirm(fnT('storage.overwriteWarning'))) {
            return;
        }
        fnOnSave(sNameInput);
        fnOnClose();
    };

    const fnHandleDelete = (sName: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.confirm(fnT('storage.deleteConfirm'))) {
            fnOnDelete(sName);
            fnSetSavedFiles(prev => prev.filter(f => f !== sName));
        }
    };

    return (
        <InfoModal title={sMode === 'save' ? fnT('storage.saveMode') : fnT('storage.loadMode')} onClose={fnOnClose}>
            <div className="space-y-6">
                {sMode === 'save' && (
                    <div className="flex gap-2 items-end">
                        <Input 
                            label={fnT('storage.enterName')} 
                            value={sNameInput} 
                            onChange={e => fnSetNameInput(e.target.value)}
                            placeholder="My Character"
                        />
                        <Button onClick={fnHandleSave} disabled={!sNameInput.trim()} className="mb-[2px] h-[42px]">
                            {fnT('buttons.save')}
                        </Button>
                    </div>
                )}
                
                <div className="border-t border-gray-700 pt-4">
                    <h4 className="text-gray-400 font-bold mb-3 uppercase text-xs tracking-wider">{fnT('storage.savedCharacters')}</h4>
                    {aSavedFiles.length === 0 ? (
                        <p className="text-gray-500 italic text-center py-4">{fnT('storage.noSaves')}</p>
                    ) : (
                        <ul className="space-y-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                            {aSavedFiles.map(sName => (
                                <li 
                                    key={sName} 
                                    onClick={() => {
                                        if (sMode === 'load') {
                                            fnOnLoad(sName);
                                            fnOnClose();
                                        } else {
                                            fnSetNameInput(sName);
                                        }
                                    }}
                                    className={`
                                        flex justify-between items-center p-3 rounded border cursor-pointer transition-colors
                                        ${sMode === 'save' && sNameInput === sName 
                                            ? 'bg-red-900/30 border-red-500 text-white' 
                                            : 'bg-gray-800 border-gray-700 hover:bg-gray-700 hover:border-gray-600'}
                                    `}
                                >
                                    <span className="font-bold">{sName}</span>
                                    <button 
                                        onClick={(e) => fnHandleDelete(sName, e)}
                                        className="p-1 hover:bg-red-900 rounded text-gray-500 hover:text-white transition-colors"
                                        title={fnT('buttons.delete')}
                                    >
                                        <TrashIcon />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </InfoModal>
    );
};

interface PointAllocatorProps {
    items: string[];
    values: Record<string, number>;
    onChange: (item: string, value: number) => void;
    pool: number[];
    translationPrefix?: string;
    baseValue?: number;
    customRenderer?: (item: string) => React.ReactNode;
    renderAfterItem?: (item: string, value: number) => React.ReactNode;
    colorClass?: string;
    accentColorClass?: string;
}

const PointAllocator: React.FC<PointAllocatorProps> = ({ 
    items: aItems, 
    values: oValues, 
    onChange: fnOnChange, 
    pool: aPool, 
    translationPrefix: sTranslationPrefix, 
    baseValue: nBaseValue = 0, 
    customRenderer: fnCustomRenderer, 
    renderAfterItem: fnRenderAfterItem,
    colorClass = "bg-red-900/40",
    accentColorClass = "border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.5)] ring-1 ring-red-400"
}) => {
    const { t: fnT } = useI18n();
    const [sActiveItem, fnSetActiveItem] = useState<string | null>(null);
    const [nActivePaintValue, fnSetActivePaintValue] = useState<number | null>(null);

    const aSortedPool = useMemo(() => [...aPool].sort((a: number, b: number) => b - a), [aPool]);
    const aAssignedValues = useMemo(() => aItems.map(sItem => oValues[sItem] || nBaseValue).filter(v => v > nBaseValue), [oValues, aItems, nBaseValue]);

    const oPoolUsage = useMemo(() => {
        const oCounts = aSortedPool.reduce((oAcc, nVal) => {
            oAcc[nVal] = (oAcc[nVal] || 0) + 1;
            return oAcc;
        }, {} as Record<number, number>);
        const oUsed = aAssignedValues.reduce((oAcc, nVal) => {
            oAcc[nVal] = (oAcc[nVal] || 0) + 1;
            return oAcc;
        }, {} as Record<number, number>);
        const oAvailable = { ...oCounts };
        Object.keys(oUsed).forEach(k => {
            const nKey = parseInt(k);
            if (oAvailable[nKey]) {
                 oAvailable[nKey] = Math.max(0, oAvailable[nKey] - oUsed[nKey]);
            }
        });
        return { counts: oCounts, used: oUsed, available: oAvailable };
    }, [aSortedPool, aAssignedValues]);

    const fnGetGroups = () => {
        if (aItems.length <= 3) return { [fnT('finishingTouches.disciplines.title')]: aItems };
        if (aItems.length === 9) {
            return {
                [fnT('characterSheet.attributes.physical')]: aItems.slice(0, 3),
                [fnT('characterSheet.attributes.social')]: aItems.slice(3, 6),
                [fnT('characterSheet.attributes.mental')]: aItems.slice(6, 9)
            };
        } else {
             return {
                [fnT('characterSheet.skills.physical')]: aItems.slice(0, 9),
                [fnT('characterSheet.skills.social')]: aItems.slice(9, 18),
                [fnT('characterSheet.skills.mental')]: aItems.slice(18, 27)
            };
        }
    };

    const oGroups = fnGetGroups();
    const bIsPoolComplete = Object.values(oPoolUsage.available).every(val => val === 0);

    const fnHandleItemInteraction = (sItem: string) => {
        if (nActivePaintValue !== null) {
            const nAssigned = oValues[sItem] || nBaseValue;
            if (nAssigned === nActivePaintValue) {
                fnOnChange(sItem, nBaseValue);
            } else {
                if ((oPoolUsage.available[nActivePaintValue] || 0) > 0) {
                    fnOnChange(sItem, nActivePaintValue);
                }
            }
        } else {
            fnSetActiveItem(sActiveItem === sItem ? null : sItem);
        }
    };

    const fnRenderPoolVisuals = () => {
        const aUniqueValues = [...new Set(aSortedPool)].sort((a: number, b: number) => b - a);
        return (
            <div className="flex flex-wrap justify-center gap-4">
                {aUniqueValues.map(nVal => {
                    const nTotal = oPoolUsage.counts[nVal] || 0;
                    const nAvailable = oPoolUsage.available[nVal] || 0;
                    const bIsActive = nActivePaintValue === nVal;
                    const bIsExhausted = nAvailable === 0;
                    return (
                        <button
                            key={nVal}
                            onClick={() => {
                                if (bIsExhausted && !bIsActive) return; 
                                fnSetActivePaintValue(bIsActive ? null : nVal);
                                fnSetActiveItem(null);
                            }}
                            className={`
                                relative flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all duration-300 min-w-[70px]
                                ${bIsActive 
                                    ? `${colorClass} ${accentColorClass} scale-110` 
                                    : bIsExhausted 
                                        ? 'bg-gray-900 border-gray-800 opacity-50 grayscale' 
                                        : 'bg-gray-800 border-gray-600 hover:border-gray-400 hover:bg-gray-700'}
                            `}
                        >
                            <span className={`text-2xl font-bold font-cinzel ${bIsActive ? 'text-white' : bIsExhausted ? 'text-gray-600' : 'text-gray-300'}`}>{nVal}</span>
                            <span className="text-[10px] uppercase tracking-wider text-gray-500 mt-1">
                                {nAvailable} / {nTotal} {fnT('common.available')}
                            </span>
                            <div className="flex gap-1 mt-1">
                                {[...Array(nTotal)].map((_, i) => (
                                    <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < nAvailable ? (bIsActive ? 'bg-red-500 animate-pulse' : 'bg-red-900') : 'bg-gray-700'}`}></div>
                                ))}
                            </div>
                        </button>
                    )
                })}
            </div>
        );
    };

    return (
        <div className="space-y-6">
            <div className={`sticky top-[72px] z-30 bg-gray-900/95 backdrop-blur-sm p-4 rounded-b-xl border-x border-b border-gray-800 shadow-2xl transition-all duration-500 ${bIsPoolComplete ? 'border-b-green-900/50' : 'border-b-red-900/50'}`}>
                <div className="flex flex-col items-center">
                    <span className={`text-xs font-bold uppercase tracking-[0.2em] mb-2 flex items-center gap-2 ${bIsPoolComplete ? 'text-green-500' : 'text-gray-400'}`}>
                        {nActivePaintValue ? (
                            <span className="text-red-400 animate-pulse flex items-center gap-1">
                                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                {fnT('common.paintMode', { value: nActivePaintValue })}
                            </span>
                        ) : (
                            <>
                                {fnT('common.poolDistribution')}
                                {bIsPoolComplete && <CheckCircle />}
                            </>
                        )}
                    </span>
                    {fnRenderPoolVisuals()}
                    <div className="text-center mt-2 text-[10px] text-gray-500 italic">
                        {nActivePaintValue ? fnT('common.paintInstruction') : fnT('common.poolLegend')}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {Object.entries(oGroups).map(([sGroupName, aGroupItems]) => (
                    <div key={sGroupName} className={Object.keys(oGroups).length === 1 ? "lg:col-span-3" : ""}>
                         {Object.keys(oGroups).length > 1 && (
                            <h3 className="text-red-500 font-bold text-lg mb-3 border-b border-gray-700 pb-1 font-cinzel">{sGroupName}</h3>
                         )}
                        <div className="space-y-2">
                            {aGroupItems.map(sItem => {
                                const nValue = oValues[sItem] || nBaseValue;
                                const bCanPaint = nActivePaintValue !== null && (oPoolUsage.available[nActivePaintValue] > 0 || nValue === nActivePaintValue);
                                return (
                                <div key={sItem} className="relative group">
                                    <button
                                        onClick={() => fnHandleItemInteraction(sItem)}
                                        disabled={nActivePaintValue !== null && !bCanPaint}
                                        className={`
                                            w-full flex justify-between items-center p-3 rounded-md border transition-all duration-200
                                            ${nActivePaintValue !== null 
                                                ? bCanPaint 
                                                    ? 'cursor-crosshair hover:bg-gray-800 border-gray-700 hover:border-red-500 hover:ring-1 hover:ring-red-500' 
                                                    : 'opacity-40 cursor-not-allowed border-gray-800 bg-gray-900'
                                                : sActiveItem === sItem 
                                                    ? 'bg-gray-800 border-red-500 ring-1 ring-red-500 shadow-lg' 
                                                    : 'bg-gray-800/60 border-gray-700 hover:border-gray-500 hover:bg-gray-700'
                                            }
                                        `}
                                    >
                                        <span className="font-bold text-gray-200 text-sm">
                                            {fnCustomRenderer ? fnCustomRenderer(sItem) : (sTranslationPrefix ? fnT(`${sTranslationPrefix}.${sItem}`) : sItem)}
                                        </span>
                                        <div className="flex items-center gap-3">
                                            <span className={`text-xl font-bold w-6 text-right ${nValue > nBaseValue ? 'text-red-400' : 'text-gray-600'}`}>
                                                {nValue}
                                            </span>
                                            <div className="flex space-x-1">
                                                 {[...Array(5)].map((_, nI) => (
                                                    <div 
                                                        key={nI} 
                                                        className={`
                                                            w-2 h-4 rounded-sm transition-colors duration-300
                                                            ${nValue > nI ? 'bg-red-600 shadow-[0_0_5px_rgba(220,38,38,0.6)]' : 'bg-gray-800 border border-gray-700'}
                                                        `}
                                                    ></div>
                                                ))}
                                            </div>
                                        </div>
                                    </button>
                                    {(oValues[sItem] || 0) > 0 && fnRenderAfterItem && (
                                        <div className="mt-2 ml-2">
                                            {fnRenderAfterItem(sItem, oValues[sItem])}
                                        </div>
                                    )}
                                    {sActiveItem === sItem && nActivePaintValue === null && (
                                        <div className="absolute z-20 top-full left-0 right-0 mt-2 p-3 bg-gray-900 border border-red-900 rounded-lg shadow-2xl grid grid-cols-1 gap-2 animate-fadeIn">
                                             <button
                                                onClick={() => { fnOnChange(sItem, nBaseValue); fnSetActiveItem(null); }}
                                                className="w-full py-1 px-2 text-xs text-gray-400 hover:text-white hover:bg-red-900/30 border border-transparent hover:border-red-900 rounded transition-colors uppercase tracking-wider"
                                            >
                                                {fnT('common.clear')}
                                            </button>
                                            <div className="flex justify-center gap-2 flex-wrap">
                                                {[...Array(6)].map((_, i) => {
                                                    const nVal = i;
                                                    const nCount = oPoolUsage.available[nVal] || 0;
                                                    const bIsCurrent = (oValues[sItem] || nBaseValue) === nVal;
                                                    const bIsDisabled = nCount === 0 && !bIsCurrent && nVal > 0;
                                                    if (nVal === 0 && nBaseValue > 0) return null;
                                                    return (
                                                        <button
                                                            key={nVal}
                                                            disabled={bIsDisabled}
                                                            onClick={() => { fnOnChange(sItem, nVal); fnSetActiveItem(null); }}
                                                            className={`
                                                                w-10 h-10 rounded-full border-2 font-bold flex items-center justify-center transition-all duration-200
                                                                ${bIsCurrent
                                                                    ? 'bg-red-600 border-red-400 text-white shadow-[0_0_10px_rgba(220,38,38,0.5)] scale-110'
                                                                    : bIsDisabled
                                                                        ? 'bg-gray-800 border-gray-700 text-gray-700 cursor-not-allowed opacity-50'
                                                                        : 'bg-gray-800 border-gray-500 text-gray-300 hover:border-red-400 hover:text-red-400 hover:bg-gray-700 hover:scale-105'}
                                                            `}
                                                        >
                                                            {nVal}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )})}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- DISCIPLINE POWER SELECTOR --- //
interface DisciplinePowerSelectorProps {
    disciplineKey: string;
    dots: number;
    selectedPowerIds: string[];
    onSelectPowers: (ids: string[]) => void;
    disciplineDetails: DisciplineDetail;
}

const DisciplinePowerSelector: React.FC<DisciplinePowerSelectorProps> = ({ disciplineKey: sDisciplineKey, dots: nDots, selectedPowerIds: aSelectedPowerIds, onSelectPowers: fnOnSelectPowers, disciplineDetails: oDisciplineDetails }) => {
    const { t: fnT } = useI18n();
    const [bIsOpen, fnSetIsOpen] = useState(false);

    const oPowersByLevel = useMemo(() => {
        const oGroups: Record<number, DisciplinePower[]> = {};
        oDisciplineDetails.powers.forEach(p => {
            if (!oGroups[p.level]) oGroups[p.level] = [];
            oGroups[p.level].push(p);
        });
        return oGroups;
    }, [oDisciplineDetails]);

    const fnCheckValidity = useCallback((sTestId: string) => {
        const aTestList = [...aSelectedPowerIds, sTestId];
        const aLevels = aTestList.map(id => {
            return oDisciplineDetails.powers.find(p => p.id === id)?.level || 0;
        });
        aLevels.sort((a: number, b: number) => b - a);
        for (let i = 0; i < aLevels.length; i++) {
            if (aLevels[i] > nDots - i) return false;
        }
        return true;
    }, [aSelectedPowerIds, nDots, oDisciplineDetails]);

    const fnTogglePower = (sPowerId: string) => {
        if (aSelectedPowerIds.includes(sPowerId)) {
            fnOnSelectPowers(aSelectedPowerIds.filter(id => id !== sPowerId));
        } else {
            if (aSelectedPowerIds.length < nDots && fnCheckValidity(sPowerId)) {
                fnOnSelectPowers([...aSelectedPowerIds, sPowerId]);
            }
        }
    };

    const aSelectedPowersList = useMemo(() => {
        return oDisciplineDetails.powers.filter(p => aSelectedPowerIds.includes(p.id));
    }, [oDisciplineDetails, aSelectedPowerIds]);

    const bIsComplete = aSelectedPowerIds.length === nDots;
    const bIsOverLimit = aSelectedPowerIds.length > nDots;

    return (
        <div className="w-full mt-2">
            {aSelectedPowersList.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                    {aSelectedPowersList.map(oPower => (
                        <div key={oPower.id} className="flex items-center text-xs bg-gray-900 border border-red-900/50 text-red-100 px-2 py-1 rounded shadow-sm">
                            <span className="font-bold mr-1 text-red-500">{oPower.level}</span>
                            <span>{oPower.name}</span>
                        </div>
                    ))}
                </div>
            )}
            <Button 
                variant={bIsComplete ? "secondary" : "primary"} 
                className={`
                    w-full text-xs py-2 flex justify-center items-center gap-2 group 
                    ${bIsOverLimit ? "bg-red-900 border-red-500 text-white animate-pulse" : bIsComplete ? "bg-gray-800 text-green-400 border border-green-900 hover:border-green-700" : "animate-pulse"}
                `}
                onClick={() => fnSetIsOpen(true)}
            >
                <span className="uppercase tracking-wider font-bold">{fnT('common.managePowers')}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${bIsOverLimit ? 'bg-red-500 text-white' : bIsComplete ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-white'}`}>
                    {aSelectedPowerIds.length}/{nDots}
                </span>
            </Button>
            {bIsOpen && (
                <InfoModal title={`${oDisciplineDetails.name} - ${fnT('finishingTouches.disciplines.selectPowers')}`} onClose={() => fnSetIsOpen(false)}>
                    <div className="text-left space-y-6">
                        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 flex justify-between items-center sticky top-0 z-10 shadow-lg gap-4 flex-wrap">
                            <div className="flex-grow">
                                <h4 className="font-bold text-gray-200">{fnT('finishingTouches.disciplines.powersSelected', { count: aSelectedPowerIds.length, total: nDots })}</h4>
                                <div className="flex gap-1 mt-1">
                                    {[...Array(nDots)].map((_, i) => (
                                        <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${i < aSelectedPowerIds.length ? 'bg-red-500 shadow-[0_0_5px_rgba(220,38,38,0.5)]' : 'bg-gray-700'}`}></div>
                                    ))}
                                </div>
                            </div>
                            <Button onClick={() => fnSetIsOpen(false)} variant="primary" className="text-xs px-4">{fnT('buttons.confirm')}</Button>
                        </div>
                        {[1, 2, 3, 4, 5].map(nLevel => {
                            const aPowers = oPowersByLevel[nLevel];
                            if (!aPowers) return null;
                            const bIsLevelUnlock = nDots >= nLevel;
                            return (
                                <div key={nLevel} className={`relative pl-4 border-l-2 ${bIsLevelUnlock ? 'border-red-500' : 'border-gray-700'}`}>
                                    <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 ${bIsLevelUnlock ? 'bg-red-500 border-red-500' : 'bg-gray-900 border-gray-700'}`}></div>
                                    <h4 className={`text-lg font-bold mb-3 ${bIsLevelUnlock ? 'text-red-400' : 'text-gray-600'}`}>
                                        {fnT('compendium.level')} {nLevel}
                                    </h4>
                                    <div className="grid grid-cols-1 gap-3">
                                        {aPowers.map(oPower => {
                                            const bIsSelected = aSelectedPowerIds.includes(oPower.id);
                                            const bLimitReached = aSelectedPowerIds.length >= nDots;
                                            const bCanSelect = bIsSelected || (bIsLevelUnlock && !bLimitReached && fnCheckValidity(oPower.id));
                                            return (
                                                <div 
                                                    key={oPower.id} 
                                                    onClick={() => bCanSelect && fnTogglePower(oPower.id)}
                                                    className={`
                                                        p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 relative group overflow-hidden
                                                        ${bIsSelected 
                                                            ? 'bg-red-900/30 border-red-500 shadow-[0_0_15px_rgba(153,27,27,0.3)] ring-1 ring-red-500/50' 
                                                            : bCanSelect 
                                                                ? 'bg-gray-800 border-gray-700 hover:border-gray-500 hover:bg-gray-750' 
                                                                : 'bg-gray-900/50 border-gray-800 opacity-60 grayscale cursor-not-allowed'}
                                                    `}
                                                >
                                                    <div className={`absolute top-0 right-0 px-3 py-1 rounded-bl-lg text-[10px] uppercase font-bold tracking-wider flex items-center gap-1 border-l border-b ${bIsSelected ? 'bg-red-600 text-white border-red-500' : 'bg-gray-900 text-gray-400 border-gray-700'}`}>
                                                        <BloodIcon />
                                                        <span>{oPower.cost || "Passive"}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center mb-3 pr-24">
                                                        <span className={`font-bold text-lg ${bIsSelected ? 'text-white text-shadow-sm' : 'text-gray-300'}`}>
                                                            {oPower.name}
                                                        </span>
                                                        {bIsSelected && <div className="text-red-500 bg-red-900/20 rounded-full p-1"><CheckCircle /></div>}
                                                    </div>
                                                    <p className={`text-sm mb-4 leading-relaxed ${bIsSelected ? 'text-gray-200' : 'text-gray-400'}`}>{oPower.description}</p>
                                                    <div className={`p-2 rounded text-xs font-mono border-l-2 ${bIsSelected ? 'bg-black/40 border-red-500/50 text-gray-300' : 'bg-black/20 border-gray-700 text-gray-500'}`}>
                                                        <strong className={`${bIsSelected ? 'text-red-400' : 'text-gray-500'} block mb-1 uppercase tracking-wider text-[10px]`}>{fnT('compendium.system')}:</strong>
                                                        {oPower.system}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </InfoModal>
            )}
        </div>
    );
};

// --- NOTIFICATION COMPONENT --- //
const Notification: React.FC<{ message: string; type: 'success' | 'error'; onClose: () => void }> = ({ message: sMessage, type: sType, onClose: fnOnClose }) => {
    useEffect(() => {
        const timer = setTimeout(fnOnClose, 3000);
        return () => clearTimeout(timer);
    }, [fnOnClose]);

    return (
        <div className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-2xl border flex items-center gap-3 z-50 animate-fadeInUp ${
            sType === 'success' ? 'bg-gray-900 border-green-500 text-green-400' : 'bg-gray-900 border-red-500 text-red-400'
        }`}>
            {sType === 'success' ? <CheckCircle /> : <ExclamationCircle />}
            <span className="font-bold">{sMessage}</span>
        </div>
    );
};

// --- GOTHIC BACKGROUND STYLE --- //
const gothicBackgroundStyle = {
    backgroundImage: `linear-gradient(rgba(10, 15, 25, 0.88), rgba(10, 15, 25, 0.96)), url('/src/assets/images/gothic_background_1782838973165.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
};

// --- APP COMPONENT --- //
const App: React.FC = () => {
    const { t: fnT, locale: sLocale } = useI18n(); 
    const [view, setView] = useState<'home' | 'creator'>('home');
    const [nStep, fnSetStep] = useState(1);
    const [bShowModeSelection, fnSetShowModeSelection] = useState(false);
    const [oCharacter, fnSetCharacter] = useState<Character>(oInitialCharacter);
    const [sSelectedSkill, setSelectedSkill] = useState<string>('');
    const [sSpecialtyName, setSpecialtyName] = useState<string>('');
    const [bShowStorage, fnSetShowStorage] = useState(false);
    const [sStorageMode, fnSetStorageMode] = useState<'save' | 'load'>('save');
    const [oNotification, fnSetNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);

    useEffect(() => {
        if (!oCharacter.name) {
            const oIdentity = fnGenerateIdentity(sLocale, oCharacter.gameType); 
            fnSetCharacter(prev => ({
                ...prev,
                name: oIdentity.name,
                sire: (oIdentity as any).sire,
                mentor: (oIdentity as any).mentor,
                concept: oIdentity.concept
            }));
        }
    }, [sLocale]);

    const aSteps = useMemo(() => {
        const base = [fnT('steps.gameSelection'), fnT('steps.concept')];
        if (oCharacter.gameType === GameType.Vampire) {
            base.push(fnT('steps.clan'));
        } else {
            base.push(fnT('steps.tribe'));
        }
        base.push(
            fnT('steps.attributes'),
            fnT('steps.skills'),
            fnT('steps.finishingTouches'),
            fnT('steps.sheet')
        );
        return base;
    }, [fnT, oCharacter.gameType]);

    const fnUpdateCharacter = (field: keyof Character, value: any) => {
        fnSetCharacter(prev => ({ ...prev, [field]: value }));
    };

    const fnHandleAttributeChange = (attr: string, val: number) => {
        fnUpdateCharacter('attributes', { ...oCharacter.attributes, [attr]: val });
    };

    const fnHandleSkillChange = (skill: string, val: number) => {
        fnUpdateCharacter('skills', { ...oCharacter.skills, [skill]: val });
    };

    const fnShowNotification = (message: string, type: 'success' | 'error' = 'success') => {
        fnSetNotification({ message, type });
    };

    const fnRandomizeIdentity = () => {
        const oIdentity = fnGenerateIdentity(sLocale, oCharacter.gameType); 
        fnSetCharacter(prev => ({
            ...prev,
            name: oIdentity.name,
            sire: (oIdentity as any).sire,
            mentor: (oIdentity as any).mentor,
            concept: oIdentity.concept
        }));
    };

    const fnCreateRandom = (level: 'fledgling' | 'neonate' | 'ancilla') => {
        const char = fnCreateRandomCharacter(sLocale, level, fnT, oCharacter.gameType || GameType.Vampire);
        fnSetCharacter(char);
        setView('creator');
        fnSetStep(6); 
        fnShowNotification(fnT('common.generateSuccess'));
    };

    const fnSaveCharacter = (sName: string) => {
        if (typeof window !== 'undefined') {
            try {
                localStorage.setItem(`vtm_save_${sName}`, JSON.stringify(oCharacter));
                fnShowNotification(fnT('storage.saveSuccess') || `Character '${sName}' saved successfully.`);
            } catch (e) {
                fnShowNotification("Failed to save character.", "error");
            }
        }
    };

    const fnLoadCharacter = (sName: string) => {
        if (typeof window !== 'undefined') {
            const sData = localStorage.getItem(`vtm_save_${sName}`);
            if (sData) {
                try {
                    const oLoaded = JSON.parse(sData);
                    fnSetCharacter(oLoaded);
                    setView('creator');
                    fnSetStep(6);
                    fnShowNotification(fnT('storage.loadSuccess') || `Character '${sName}' loaded.`);
                } catch (e) {
                    console.error("Failed to parse save", e);
                    fnShowNotification("Failed to load character.", "error");
                }
            }
        }
    };

    const fnDeleteCharacter = (sName: string) => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(`vtm_save_${sName}`);
            fnShowNotification(`Character '${sName}' deleted.`);
        }
    };

    const fnResetCharacter = () => {
        if (window.confirm(fnT('common.resetWarning'))) {
            const oIdentity = fnGenerateIdentity(sLocale, oCharacter.gameType); 
            fnSetCharacter({
                ...oInitialCharacter,
                name: oIdentity.name,
                sire: (oIdentity as any).sire,
                mentor: (oIdentity as any).mentor,
                concept: oIdentity.concept
            });
            fnSetStep(1);
            setView('home'); 
            fnShowNotification(fnT('common.resetSuccess'));
        }
    };

    const fnExportJSON = () => {
        const sData = JSON.stringify(oCharacter, null, 2);
        const blob = new Blob([sData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${oCharacter.name || 'character'}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const fnImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const oLoaded = JSON.parse(event.target?.result as string);
                fnSetCharacter(oLoaded);
                setView('creator');
                fnSetStep(6);
                fnShowNotification("Character imported from JSON.");
            } catch (err) {
                console.error(err);
                fnShowNotification("Invalid JSON file.", "error");
            }
        };
        reader.readAsText(file);
    };

    const aAvailableCombos = useMemo(() => {
        const aAll = fnGetDisciplineCombos(fnT);
        return aAll.filter(c => {
            return c.requirements.every(req => {
                const nLevel = oCharacter.disciplines[req.discipline] || 0;
                return nLevel >= req.level;
            });
        });
    }, [oCharacter.disciplines, fnT]);

    // Prune invalid combos when disciplines change
    useEffect(() => {
        const aAll = fnGetDisciplineCombos(fnT);
        const aValidSelectedIds = oCharacter.disciplineCombos
            .filter(selected => {
                const oDef = aAll.find(c => c.id === selected.id);
                if (!oDef) return false;
                return oDef.requirements.every(req => (oCharacter.disciplines[req.discipline] || 0) >= req.level);
            })
            .map(c => c.id);
        
        if (aValidSelectedIds.length !== oCharacter.disciplineCombos.length) {
            const aNewCombos = aAll.filter(c => aValidSelectedIds.includes(c.id));
            fnUpdateCharacter('disciplineCombos', aNewCombos);
        }
    }, [oCharacter.disciplines, fnT]);

    const fnHandlePredatorTypeChange = (sNewId: string) => {
        const aPredatorTypes = fnGetPredatorTypes(fnT);
        const oOldType = aPredatorTypes.find(pt => pt.id === oCharacter.predatorType);
        const oNewType = aPredatorTypes.find(pt => pt.id === sNewId);

        let aNewAdvantages = [...oCharacter.advantages];
        let aNewFlaws = [...oCharacter.flaws];
        let nNewHumanity = oCharacter.humanity ?? 7;
        let oNewDisciplines = { ...oCharacter.disciplines };

        // Clean up old predator type bonuses
        if (oOldType) {
            nNewHumanity -= oOldType.humanityModifier;
            aNewAdvantages = aNewAdvantages.filter(a => !oOldType.advantages.some(oa => oa.id === a.id));
            aNewFlaws = aNewFlaws.filter(f => !oOldType.flaws.some(of => of.id === f.id));

            if (oOldType.disciplineAdd) {
                const dName = oOldType.disciplineAdd.discipline;
                oNewDisciplines[dName] = Math.max(0, (oNewDisciplines[dName] || 0) - oOldType.disciplineAdd.dots);
                if (oNewDisciplines[dName] === 0) delete oNewDisciplines[dName];
            }
        }

        // Apply new predator type bonuses
        if (oNewType) {
            nNewHumanity += oNewType.humanityModifier;
            aNewAdvantages = [...aNewAdvantages, ...oNewType.advantages];
            aNewFlaws = [...aNewFlaws, ...oNewType.flaws];
            
            // Handle automatic discipline dot if applicable
            if (oNewType.disciplineAdd) {
                const dName = oNewType.disciplineAdd.discipline;
                oNewDisciplines[dName] = (oNewDisciplines[dName] || 0) + oNewType.disciplineAdd.dots;
            }
        }

        fnSetCharacter(prev => ({
            ...prev,
            predatorType: sNewId,
            humanity: Math.max(0, Math.min(10, nNewHumanity)),
            advantages: aNewAdvantages,
            flaws: aNewFlaws,
            disciplines: oNewDisciplines
        }));
    };

    const fnHandleGameSelect = (game: GameType) => {
        // Full reset when switching game types
        const oIdentity = fnGenerateIdentity(sLocale, game);
        fnSetCharacter({
            ...oInitialCharacter,
            gameType: game,
            name: oIdentity.name,
            sire: (oIdentity as any).sire,
            mentor: (oIdentity as any).mentor,
            concept: oIdentity.concept
        });
        
        if (view === 'home') {
            fnSetShowModeSelection(true);
        } else {
            fnSetStep(2);
        }
    };

    const renderStepContent = () => {
        switch (nStep) {
            case 1:
                return <GameSelection onSelect={fnHandleGameSelect} />;
            case 2: // Concept
                return (
                    <GothicFrame>
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-3xl font-cinzel text-red-500">{fnT('concept.title')}</h2>
                            <Button 
                                variant="secondary" 
                                onClick={fnRandomizeIdentity} 
                                className="flex items-center gap-2 text-xs py-1 px-3 bg-gray-700 hover:bg-red-900 border border-gray-600 hover:border-red-500"
                                title={fnT('common.randomIdentity')}
                            >
                                <DiceIcon />
                                <span>{fnT('common.randomIdentity')}</span>
                            </Button>
                        </div>
                        <p className="text-gray-400 mb-6 italic">{fnT('concept.subtitle')}</p>
                        <LoreQuote text={fnT('lore.concept')} />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                            <Input label={fnT('concept.name')} value={oCharacter.name} onChange={e => fnUpdateCharacter('name', e.target.value)} isWerewolf={oCharacter.gameType === GameType.Werewolf} />
                            <Input label={oCharacter.gameType === GameType.Werewolf ? fnT('characterSheet.mentor') : fnT('concept.sire')} value={oCharacter.gameType === GameType.Werewolf ? (oCharacter.mentor || '') : oCharacter.sire} onChange={e => fnUpdateCharacter(oCharacter.gameType === GameType.Werewolf ? 'mentor' : 'sire', e.target.value)} placeholder={oCharacter.gameType === GameType.Werewolf ? fnT('characterSheet.mentor') : fnT('concept.sirePlaceholder')} isWerewolf={oCharacter.gameType === GameType.Werewolf} />
                            <div className="md:col-span-2">
                                <Input label={fnT('concept.concept')} value={oCharacter.concept} onChange={e => fnUpdateCharacter('concept', e.target.value)} placeholder={fnT('concept.conceptPlaceholder')} isWerewolf={oCharacter.gameType === GameType.Werewolf} />
                            </div>
                            <Input label={fnT('concept.ambition')} value={oCharacter.ambition} onChange={e => fnUpdateCharacter('ambition', e.target.value)} placeholder={fnT('concept.ambitionPlaceholder')} isWerewolf={oCharacter.gameType === GameType.Werewolf} />
                            <Input label={fnT('concept.desire')} value={oCharacter.desire} onChange={e => fnUpdateCharacter('desire', e.target.value)} placeholder={fnT('concept.desirePlaceholder')} isWerewolf={oCharacter.gameType === GameType.Werewolf} />
                             <div className="md:col-span-2">
                                <Input label={fnT('concept.portrait')} value={oCharacter.portraitUrl || ''} onChange={e => fnUpdateCharacter('portraitUrl', e.target.value)} placeholder="https://example.com/image.jpg" isWerewolf={oCharacter.gameType === GameType.Werewolf} />
                            </div>
                        </div>
                    </GothicFrame>
                );
            case 3: // Clan / Tribe & Auspice
                if (oCharacter.gameType === GameType.Vampire) {
                    const oClans = fnGetClanDetails(fnT);
                    return (
                        <div className="text-center">
                            <h2 className="text-3xl font-cinzel text-red-500 mb-6">{fnT('clan.title')}</h2>
                            <LoreQuote text={fnT('lore.intro')} />
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {(Object.keys(oClans) as Clan[]).map(sClan => (
                                    <Card 
                                        key={sClan} 
                                        className="text-left relative overflow-hidden group"
                                        onClick={() => fnUpdateCharacter('clan', sClan)}
                                        isSelected={oCharacter.clan === sClan}
                                        variant="vampire"
                                    >
                                        <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-30 transition-opacity">
                                            <RoseIcon className="w-24 h-24 text-red-900" />
                                        </div>
                                        <h3 className="text-xl font-bold text-red-400 mb-1">{oClans[sClan].name}</h3>
                                        <p className="text-sm text-gray-300 mb-2 h-10 overflow-hidden">{oClans[sClan].description}</p>
                                        <div className="text-xs text-gray-500 mt-2 space-y-1">
                                            <p><strong>{fnT('characterSheet.clanBane')}:</strong> {oClans[sClan].bane}</p>
                                            <p><strong>{fnT('characterSheet.clanCompulsion')}:</strong> {oClans[sClan].compulsion}</p>
                                        </div>
                                    </Card>
                                ))}
                            </div>

                            {oCharacter.clan && oClans[oCharacter.clan] && (
                                <GothicFrame className="mt-8 text-left border-red-900/30 bg-red-900/5">
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-cinzel text-red-500 mb-2">{oClans[oCharacter.clan].name}</h3>
                                            <p className="text-gray-300 italic mb-4">{oClans[oCharacter.clan].description}</p>
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {oClans[oCharacter.clan].disciplines.map(d => (
                                                    <span key={d} className="px-2 py-1 bg-red-900/20 border border-red-900/40 rounded text-[10px] uppercase tracking-widest text-red-400 font-bold">
                                                        {d}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex-1 space-y-4 border-t md:border-t-0 md:border-l border-red-900/20 pt-4 md:pt-0 md:pl-6">
                                            <div>
                                                <h4 className="text-red-400 font-bold uppercase text-xs tracking-widest mb-1">{fnT('characterSheet.clanBane')}</h4>
                                                <p className="text-sm text-gray-400">{oClans[oCharacter.clan].bane}</p>
                                            </div>
                                            <div>
                                                <h4 className="text-red-400 font-bold uppercase text-xs tracking-widest mb-1">{fnT('characterSheet.clanCompulsion')}</h4>
                                                <p className="text-sm text-gray-400">{oClans[oCharacter.clan].compulsion}</p>
                                            </div>
                                        </div>
                                    </div>
                                </GothicFrame>
                            )}
                        </div>
                    );
                } else {
                    const oTribes = fnGetTribeDetails(fnT);
                    const oAuspices = fnGetAuspiceDetails(fnT);
                    return (
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xl font-bold text-green-500 mb-4">{fnT('steps.tribe')}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {(Object.keys(oTribes) as Tribe[]).map(sTribe => {
                                        const sKey = sTribe.toLowerCase().replace(/\s/g, '');
                                        return (
                                            <Card 
                                                key={sTribe} 
                                                className="text-left relative overflow-hidden group"
                                                onClick={() => fnUpdateCharacter('tribe', sTribe)}
                                                isSelected={oCharacter.tribe === sTribe}
                                                variant="werewolf"
                                            >
                                                <h4 className="font-bold text-green-500 mb-2">{oTribes[sTribe].name}</h4>
                                                <p className="text-xs text-gray-300 mb-3 line-clamp-3">{oTribes[sTribe].description}</p>
                                                <div className="text-[10px] border-t border-gray-800 pt-2 space-y-1">
                                                    <p><span className="text-green-600 font-bold uppercase">Favor:</span> <span className="text-gray-500">{fnT(`tribes.${sKey}.favor`)}</span></p>
                                                    <p><span className="text-red-600 font-bold uppercase">Bane:</span> <span className="text-gray-500">{fnT(`tribes.${sKey}.bane`)}</span></p>
                                                </div>
                                            </Card>
                                        );
                                    })}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-green-500 mb-4">{fnT('steps.auspice')}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {(Object.keys(oAuspices) as Auspice[]).map(sAuspice => {
                                        const sKey = sAuspice.toLowerCase().replace(/\s/g, '');
                                        return (
                                            <Card 
                                                key={sAuspice} 
                                                className="text-left relative overflow-hidden group"
                                                onClick={() => fnUpdateCharacter('auspice', sAuspice)}
                                                isSelected={oCharacter.auspice === sAuspice}
                                                variant="werewolf"
                                            >
                                                <h4 className="font-bold text-green-500 mb-2">{oAuspices[sAuspice].name}</h4>
                                                <p className="text-xs text-gray-300 line-clamp-4">{oAuspices[sAuspice].description}</p>
                                            </Card>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    );
                }
            case 4: // Attributes
                return (
                    <div className="text-center">
                        <h2 className={`text-3xl font-cinzel mb-2 ${oCharacter.gameType === GameType.Werewolf ? 'text-green-500' : 'text-red-500'}`}>{fnT('attributes.title')}</h2>
                        <p className="text-gray-400 mb-6">{fnT('attributes.subtitle')}</p>
                        <LoreQuote text={fnT('lore.attributes')} />
                        <PointAllocator 
                            items={aAttributeList} 
                            values={oCharacter.attributes} 
                            onChange={fnHandleAttributeChange} 
                            pool={[4, 3, 3, 3, 2, 2, 2, 2]} 
                            translationPrefix="attributes.list"
                            baseValue={1}
                            colorClass={oCharacter.gameType === GameType.Werewolf ? "bg-green-900/40" : "bg-red-900/40"}
                            accentColorClass={oCharacter.gameType === GameType.Werewolf ? "border-green-500 shadow-[0_0_15px_rgba(22,163,74,0.5)] ring-1 ring-green-400" : "border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.5)] ring-1 ring-red-400"}
                        />
                    </div>
                );
            case 5: // Skills
                return (
                    <div className="text-center">
                        <h2 className={`text-3xl font-cinzel mb-2 ${oCharacter.gameType === GameType.Werewolf ? 'text-green-500' : 'text-red-500'}`}>{fnT('skills.title')}</h2>
                        <p className="text-gray-400 mb-6">{fnT('skills.subtitle')}</p>
                        <LoreQuote text={fnT('lore.skills')} />
                        <PointAllocator 
                            items={aSkillList} 
                            values={oCharacter.skills} 
                            onChange={fnHandleSkillChange} 
                            pool={[3, 3, 3, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1]} 
                            translationPrefix="skills.list"
                            colorClass={oCharacter.gameType === GameType.Werewolf ? "bg-green-900/40" : "bg-red-900/40"}
                            accentColorClass={oCharacter.gameType === GameType.Werewolf ? "border-green-500 shadow-[0_0_15px_rgba(22,163,74,0.5)] ring-1 ring-green-400" : "border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.5)] ring-1 ring-red-400"}
                        />
                    </div>
                );
            case 6: // Finishing Touches
                const oDisciplineDetails = fnGetDisciplineDetails(fnT);
                const aAdvantagesAndFlaws = fnGetAdvantagesAndFlaws(fnT, oCharacter.gameType);
                const bIsWerewolf = oCharacter.gameType === GameType.Werewolf;
                const sThemeColor = bIsWerewolf ? 'text-green-500' : 'text-red-500';
                const sThemeAccent = bIsWerewolf ? 'text-green-400' : 'text-red-400';
                const sThemeBorder = bIsWerewolf ? 'border-green-900/40' : 'border-red-900/40';
                const sThemeBg = bIsWerewolf ? 'bg-green-900/20' : 'bg-red-900/20';

                return (
                    <div className="text-center space-y-8">
                        <h2 className={`text-3xl font-cinzel ${sThemeColor} mb-2`}>{fnT('finishingTouches.title')}</h2>
                        <LoreQuote text={fnT('lore.finishing')} />
                        
                        {/* Disciplines / Gifts Section */}
                        <GothicFrame className="text-left">
                            <h3 className={`text-xl font-bold ${sThemeAccent} mb-4 border-b border-gray-700 pb-2`}>
                                {bIsWerewolf ? fnT('characterSheet.gifts') : fnT('finishingTouches.disciplines.title')}
                            </h3>
                            <p className="text-gray-400 mb-4">
                                {bIsWerewolf 
                                    ? fnT('finishingTouches.gifts.subtitle')
                                    : fnT('finishingTouches.disciplines.subtitle')}
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {(bIsWerewolf 
                                    ? Array.from(new Set([
                                        ...(oCharacter.tribe ? fnGetTribeDetails(fnT)[oCharacter.tribe].gifts : []),
                                        ...(oCharacter.auspice ? fnGetAuspiceDetails(fnT)[oCharacter.auspice].gifts : [])
                                      ]))
                                    : (oCharacter.clan ? fnGetClanDetails(fnT)[oCharacter.clan].disciplines : [])
                                ).map(sDisc => {
                                    const nDots = oCharacter.disciplines[sDisc] || 0;
                                    return (
                                        <div key={sDisc} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                            <div className="flex justify-between items-center mb-2">
                                                <h4 className="font-bold text-gray-200">{oDisciplineDetails[sDisc]?.name || sDisc}</h4>
                                                <div className="flex space-x-1">
                                                    {[1, 2, 3, 4, 5].map(n => (
                                                        <button
                                                            key={n}
                                                            onClick={() => {
                                                                const nNewVal = nDots === n ? 0 : n;
                                                                fnUpdateCharacter('disciplines', { ...oCharacter.disciplines, [sDisc]: nNewVal });
                                                            }}
                                                            className={`w-4 h-4 rounded-full border border-gray-500 ${nDots >= n ? (bIsWerewolf ? 'bg-green-500' : 'bg-red-500') : 'bg-gray-900'}`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            {nDots > 0 && oDisciplineDetails[sDisc] && (
                                                <DisciplinePowerSelector 
                                                    disciplineKey={sDisc}
                                                    dots={nDots}
                                                    selectedPowerIds={oCharacter.disciplinePowers[sDisc] || []}
                                                    onSelectPowers={(ids) => fnUpdateCharacter('disciplinePowers', { ...oCharacter.disciplinePowers, [sDisc]: ids })}
                                                    disciplineDetails={oDisciplineDetails[sDisc]}
                                                />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </GothicFrame>

                        {/* Werewolf Specific Vitals (Renown, Harano, Hauglosk) */}
                        {bIsWerewolf && (
                            <GothicFrame className="text-left">
                                <h3 className={`text-xl font-bold ${sThemeAccent} mb-4 border-b border-gray-700 pb-2`}>
                                    {fnT('characterSheet.vitals')}
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest">{fnT('characterSheet.renown')}</h4>
                                        <div className="grid grid-cols-3 gap-4">
                                            {(['glory', 'honor', 'wisdom'] as const).map(sRenown => (
                                                <div key={sRenown} className="bg-gray-800 p-3 rounded-lg border border-gray-700 text-center">
                                                    <div className="text-[10px] uppercase text-gray-500 mb-1">{fnT(`characterSheet.${sRenown}`)}</div>
                                                    <div className="flex justify-center space-x-1">
                                                        {[1, 2, 3, 4, 5].map(n => (
                                                            <button
                                                                key={n}
                                                                onClick={() => {
                                                                    const nVal = oCharacter.renown[sRenown] === n ? 0 : n;
                                                                    fnUpdateCharacter('renown', { ...oCharacter.renown, [sRenown]: nVal });
                                                                }}
                                                                className={`w-3 h-3 rounded-full border border-gray-600 ${oCharacter.renown[sRenown] >= n ? 'bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]' : 'bg-gray-900'}`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest">{fnT('characterSheet.harano')}</h4>
                                            <div className="flex space-x-1 bg-gray-800 p-3 rounded-lg border border-gray-700 justify-center">
                                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                                                    <button
                                                        key={n}
                                                        onClick={() => fnUpdateCharacter('harano', oCharacter.harano === n ? 0 : n)}
                                                        className={`w-2.5 h-2.5 rounded-sm border border-gray-600 ${oCharacter.harano >= n ? 'bg-blue-500' : 'bg-gray-900'}`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest">{fnT('characterSheet.hauglosk')}</h4>
                                            <div className="flex space-x-1 bg-gray-800 p-3 rounded-lg border border-gray-700 justify-center">
                                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                                                    <button
                                                        key={n}
                                                        onClick={() => fnUpdateCharacter('hauglosk', oCharacter.hauglosk === n ? 0 : n)}
                                                        className={`w-2.5 h-2.5 rounded-sm border border-gray-600 ${oCharacter.hauglosk >= n ? 'bg-orange-500' : 'bg-gray-900'}`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </GothicFrame>
                        )}

                        {/* Vampire Combos Section */}
                        {!bIsWerewolf && (
                            <GothicFrame className="text-left">
                                <h3 className={`text-xl font-bold ${sThemeAccent} mb-4 border-b border-gray-700 pb-2`}>{fnT('combos.title')}</h3>
                                <p className="text-gray-400 mb-4">{fnT('combos.subtitle')}</p>
                                {aAvailableCombos.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {aAvailableCombos.map(combo => {
                                            const bSelected = oCharacter.disciplineCombos.some(c => c.id === combo.id);
                                            return (
                                                <div 
                                                   key={combo.id}
                                                   onClick={() => {
                                                       const aNew = bSelected ? oCharacter.disciplineCombos.filter(c => c.id !== combo.id) : [...oCharacter.disciplineCombos, combo];
                                                       fnUpdateCharacter('disciplineCombos', aNew);
                                                   }}
                                                   className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 relative group overflow-hidden ${bSelected ? 'bg-red-900/30 border-red-500 shadow-[0_0_10px_rgba(220,38,38,0.2)]' : 'bg-gray-800 border-gray-700 hover:border-gray-500'}`}
                                                >
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div>
                                                           <h4 className="font-bold text-gray-100 text-lg">{combo.name}</h4>
                                                           <div className="flex flex-wrap gap-1 mt-1">
                                                               {combo.requirements.map(req => (
                                                                   <span key={req.discipline} className="text-[9px] px-1.5 py-0.5 bg-black/40 rounded text-red-400 border border-red-900/30 font-mono uppercase">
                                                                       {req.discipline} {req.level}
                                                                   </span>
                                                               ))}
                                                           </div>
                                                        </div>
                                                        {bSelected && <div className="animate-pulse"><CheckCircle /></div>}
                                                    </div>
                                                    <p className="text-xs text-gray-400 mb-2 leading-relaxed">{combo.description}</p>
                                                    <div className={`mt-2 p-2 rounded text-[10px] font-mono border-l-2 ${bSelected ? 'bg-black/30 border-red-500 text-gray-300' : 'bg-black/10 border-gray-600 text-gray-500'}`}>
                                                        <strong className="uppercase text-red-500/80 mr-1">{fnT('compendium.system')}:</strong>
                                                        {combo.system}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-8 px-4 bg-black/20 rounded border border-dashed border-gray-700">
                                        <svg className="w-12 h-12 text-gray-600 mb-3 opacity-20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z"/></svg>
                                        <p className="italic text-gray-500 text-center">{fnT('combos.noAvailable')}</p>
                                    </div>
                                )}
                            </GothicFrame>
                        )}

                        {/* Vampire Predator Type Section */}
                        {!bIsWerewolf && (
                            <GothicFrame className="text-left">
                                <h3 className={`text-xl font-bold ${sThemeAccent} mb-4 border-b border-gray-700 pb-2`}>{fnT('finishingTouches.predatorType.title')}</h3>
                                <select 
                                   className="w-full bg-gray-800 border border-gray-600 rounded p-2 text-white mb-4 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                                   value={oCharacter.predatorType || ''}
                                   onChange={(e) => fnHandlePredatorTypeChange(e.target.value)}
                                >
                                    <option value="">{fnT('common.selectPlaceholder')}</option>
                                    {fnGetPredatorTypes(fnT).map(pt => (
                                        <option key={pt.id} value={pt.id}>{pt.name}</option>
                                    ))}
                                </select>
                                {oCharacter.predatorType && (
                                    <div className="mt-4 animate-fadeIn">
                                        {(() => {
                                            const oSelectedPredator = fnGetPredatorTypes(fnT).find(pt => pt.name === oCharacter.predatorType);
                                            if (!oSelectedPredator) return null;
                                            return (
                                                <div className="p-6 bg-gray-900/80 rounded-lg border border-red-900/40 shadow-2xl">
                                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-red-900/20 pb-4">
                                                        <h4 className="text-2xl font-bold text-white flex items-center gap-3">
                                                            <span className="p-2 bg-red-900/20 rounded-full text-red-500 shadow-[0_0_10px_rgba(153,27,27,0.4)]">
                                                                <BloodIcon />
                                                            </span>
                                                            {oSelectedPredator.name}
                                                        </h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            {oSelectedPredator.humanityModifier !== 0 && (
                                                                <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tighter ${oSelectedPredator.humanityModifier > 0 ? 'bg-green-900/30 text-green-400 border border-green-900/50' : 'bg-red-900/30 text-red-400 border border-red-900/50'}`}>
                                                                    {oSelectedPredator.humanityModifier > 0 ? '+' : ''}{oSelectedPredator.humanityModifier} Humanity
                                                                </div>
                                                            )}
                                                            {oSelectedPredator.disciplineAdd && (
                                                                <div className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tighter bg-purple-900/30 text-purple-400 border border-purple-900/50">
                                                                    +{oSelectedPredator.disciplineAdd.dots} {oSelectedPredator.disciplineAdd.discipline}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    
                                                    <p className="text-gray-400 italic mb-8 text-sm leading-relaxed border-l-4 border-red-900/30 pl-4 py-1">
                                                       {oSelectedPredator.description}
                                                    </p>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                        <div className="space-y-4">
                                                            <h5 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold flex items-center gap-2">
                                                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                                                Granted Benefits
                                                            </h5>
                                                            <div className="space-y-3">
                                                                {oSelectedPredator.advantages.map((adv, idx) => (
                                                                    <div key={`${adv.name}-${idx}`} className="flex items-start gap-3 bg-green-900/5 p-4 rounded-md border border-green-900/20 hover:bg-green-900/10 transition-colors">
                                                                        <div className="mt-1 text-green-500"><CheckCircle /></div>
                                                                        <div>
                                                                            <div className="text-[9px] uppercase tracking-widest text-green-600 font-bold mb-0.5">Advantage</div>
                                                                            <div className="text-sm font-bold text-green-400">{adv.name}</div>
                                                                            <div className="text-[10px] text-gray-500">{adv.cost} dots included</div>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                                {oSelectedPredator.advantages.length === 0 && (
                                                                    <div className="text-xs text-gray-600 italic">No static advantages granted.</div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className="space-y-4">
                                                             <h5 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold flex items-center gap-2">
                                                                <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                                                                Potential Costs
                                                             </h5>
                                                             <div className="space-y-3">
                                                                 {oSelectedPredator.flaws.map((flaw, idx) => (
                                                                     <div key={`${flaw.name}-${idx}`} className="flex items-start gap-3 bg-red-900/5 p-4 rounded-md border border-red-900/20 hover:bg-red-900/10 transition-colors">
                                                                         <div className="mt-1 text-red-500"><ExclamationCircle /></div>
                                                                         <div>
                                                                             <div className="text-[9px] uppercase tracking-widest text-red-600 font-bold mb-0.5">Flaw</div>
                                                                             <div className="text-sm font-bold text-red-400">{flaw.name}</div>
                                                                             <div className="text-[10px] text-gray-500">{flaw.cost} dots penalty</div>
                                                                         </div>
                                                                     </div>
                                                                 ))}
                                                                 {oSelectedPredator.flaws.length === 0 && (
                                                                     <div className="text-xs text-gray-600 italic">No static flaws required.</div>
                                                                 )}
                                                             </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })()}
                                    </div>
                                )}
                            </GothicFrame>
                        )}

                        {/* Common Advantages & Flaws Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <GothicFrame className="text-left">
                                <h3 className={`text-xl font-bold ${sThemeAccent} mb-2`}>{fnT('finishingTouches.advantages.title')}</h3>
                                <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                    {aAdvantagesAndFlaws.filter(a => a.type === 'advantage').map((adv, idx) => (
                                        <div key={`${adv.name}-${idx}`} className="flex justify-between items-center p-2 bg-gray-800 rounded border border-gray-700 hover:border-gray-500 group transition-colors">
                                            <span className="text-sm">{adv.name} ({adv.cost})</span>
                                            <Button variant="secondary" className="px-3 py-1 text-xs font-bold" onClick={() => fnUpdateCharacter('advantages', [...oCharacter.advantages, adv])}>{fnT('buttons.add')}</Button>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 border-t border-gray-700 pt-2 space-y-1">
                                    {oCharacter.advantages.map((adv, i) => (
                                        <div key={`${adv.name}-${i}`} className="flex justify-between text-xs text-gray-300 bg-green-900/10 px-2 py-1.5 rounded border border-green-900/20">
                                            <span><span className="text-green-400 font-bold mr-2">{adv.cost}</span> {adv.name}</span>
                                            <button onClick={() => fnUpdateCharacter('advantages', oCharacter.advantages.filter((_, idx) => idx !== i))} className="text-red-500 hover:text-red-300 font-bold px-1">✕</button>
                                        </div>
                                    ))}
                                </div>
                            </GothicFrame>
                            <GothicFrame className="text-left">
                                <h3 className={`text-xl font-bold ${sThemeAccent} mb-2`}>{fnT('finishingTouches.flaws.title')}</h3>
                                <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                    {aAdvantagesAndFlaws.filter(a => a.type === 'flaw').map((flaw, idx) => (
                                        <div key={`${flaw.name}-${idx}`} className="flex justify-between items-center p-2 bg-gray-800 rounded border border-gray-700 hover:border-gray-500 group transition-colors">
                                            <span className="text-sm">{flaw.name} ({flaw.cost})</span>
                                            <Button variant="secondary" className="px-3 py-1 text-xs font-bold" onClick={() => fnUpdateCharacter('flaws', [...oCharacter.flaws, flaw])}>{fnT('buttons.add')}</Button>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 border-t border-gray-700 pt-2 space-y-1">
                                    {oCharacter.flaws.map((flaw, i) => (
                                        <div key={`${flaw.name}-${i}`} className="flex justify-between text-xs text-gray-300 bg-red-900/10 px-2 py-1.5 rounded border border-red-900/20">
                                            <span><span className="text-red-400 font-bold mr-2">{flaw.cost}</span> {flaw.name}</span>
                                            <button onClick={() => fnUpdateCharacter('flaws', oCharacter.flaws.filter((_, idx) => idx !== i))} className="text-red-500 hover:text-red-300 font-bold px-1">✕</button>
                                        </div>
                                    ))}
                                </div>
                            </GothicFrame>
                        </div>

                        {/* Loresheets Section */}
                        {bIsWerewolf && (
                            <GothicFrame className="text-left">
                                <h3 className={`text-xl font-bold ${sThemeAccent} mb-4 border-b border-gray-700 pb-2`}>{fnT('loresheets.title')}</h3>
                                <p className="text-gray-400 mb-4">{fnT('loresheets.subtitle')}</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {fnGetLoresheets(fnT).map(ls => {
                                        const oSelected = oCharacter.loresheets.find(l => l.id === ls.id);
                                        const nLevel = oSelected ? oSelected.level : 0;
                                        return (
                                            <div key={ls.id} className={`p-4 rounded-lg border-2 transition-all duration-300 ${nLevel > 0 ? 'bg-green-900/30 border-green-500' : 'bg-gray-800 border-gray-700'}`}>
                                                <div className="flex justify-between items-start mb-2">
                                                    <h4 className="font-bold text-gray-100">{ls.name}</h4>
                                                    <div className="flex space-x-1">
                                                        {[1, 2, 3, 4, 5].map(n => (
                                                            <button
                                                                key={n}
                                                                onClick={() => {
                                                                    const nNewLevel = nLevel === n ? 0 : n;
                                                                    let aNewLoresheets = [...oCharacter.loresheets];
                                                                    if (nNewLevel === 0) {
                                                                        aNewLoresheets = aNewLoresheets.filter(l => l.id !== ls.id);
                                                                    } else {
                                                                        const idx = aNewLoresheets.findIndex(l => l.id === ls.id);
                                                                        if (idx >= 0) {
                                                                            aNewLoresheets[idx] = { ...aNewLoresheets[idx], level: nNewLevel };
                                                                        } else {
                                                                            aNewLoresheets.push({ id: ls.id, level: nNewLevel });
                                                                        }
                                                                    }
                                                                    fnUpdateCharacter('loresheets', aNewLoresheets);
                                                                }}
                                                                className={`w-3.5 h-3.5 rounded-full border border-gray-600 ${nLevel >= n ? 'bg-green-500' : 'bg-gray-900'}`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-xs text-gray-400 mb-2">{ls.description}</p>
                                                {nLevel > 0 && (
                                                    <div className="mt-2 space-y-2">
                                                        {ls.levels.filter(lvl => lvl.level <= nLevel).map(lvl => (
                                                            <div key={lvl.level} className="text-[10px] bg-black/40 p-2 rounded border-l border-green-500">
                                                                <div className="font-bold text-green-400 mb-0.5">{lvl.name}</div>
                                                                <div className="text-gray-500 italic">{lvl.system}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </GothicFrame>
                        )}

                        {/* Rituals & Talismans Section */}
                        {bIsWerewolf && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <GothicFrame className="text-left">
                                    <h3 className={`text-xl font-bold ${sThemeAccent} mb-4 border-b border-gray-700 pb-2`}>{fnT('characterSheet.rituals')}</h3>
                                    <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                        {fnGetRituals(fnT).map(rit => (
                                            <div key={rit.id} className="flex justify-between items-center p-2 bg-gray-800 rounded border border-gray-700 hover:border-gray-500 group transition-colors">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold">{rit.name}</span>
                                                    <span className="text-[10px] text-gray-400 line-clamp-1">{rit.description}</span>
                                                </div>
                                                <Button 
                                                    variant="secondary" 
                                                    className="px-3 py-1 text-xs font-bold" 
                                                    onClick={() => {
                                                        if (!oCharacter.rituals.some(r => r.id === rit.id)) {
                                                            fnUpdateCharacter('rituals', [...oCharacter.rituals, rit]);
                                                        }
                                                    }}
                                                >
                                                    {fnT('buttons.add')}
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 border-t border-gray-700 pt-2 space-y-1">
                                        {oCharacter.rituals.map((rit, i) => (
                                            <div key={`${rit.id}-${i}`} className="flex justify-between text-xs text-gray-300 bg-green-900/10 px-2 py-1.5 rounded border border-green-900/20">
                                                <span>{rit.name}</span>
                                                <button onClick={() => fnUpdateCharacter('rituals', oCharacter.rituals.filter((_, idx) => idx !== i))} className="text-red-500 hover:text-red-300 font-bold px-1">✕</button>
                                            </div>
                                        ))}
                                    </div>
                                </GothicFrame>
                                <GothicFrame className="text-left">
                                    <h3 className={`text-xl font-bold ${sThemeAccent} mb-4 border-b border-gray-700 pb-2`}>{fnT('characterSheet.talismans')}</h3>
                                    <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                        {fnGetTalismans(fnT).map(tal => (
                                            <div key={tal.id} className="flex justify-between items-center p-2 bg-gray-800 rounded border border-gray-700 hover:border-gray-500 group transition-colors">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold">{tal.name}</span>
                                                    <span className="text-[10px] text-gray-400 line-clamp-1">{tal.description}</span>
                                                </div>
                                                <Button 
                                                    variant="secondary" 
                                                    className="px-3 py-1 text-xs font-bold" 
                                                    onClick={() => {
                                                        if (!oCharacter.talismans.some(t => t.id === tal.id)) {
                                                            fnUpdateCharacter('talismans', [...oCharacter.talismans, tal]);
                                                        }
                                                    }}
                                                >
                                                    {fnT('buttons.add')}
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 border-t border-gray-700 pt-2 space-y-1">
                                        {oCharacter.talismans.map((tal, i) => (
                                            <div key={`${tal.id}-${i}`} className="flex justify-between text-xs text-gray-300 bg-green-900/10 px-2 py-1.5 rounded border border-green-900/20">
                                                <span>{tal.name}</span>
                                                <button onClick={() => fnUpdateCharacter('talismans', oCharacter.talismans.filter((_, idx) => idx !== i))} className="text-red-500 hover:text-red-300 font-bold px-1">✕</button>
                                            </div>
                                        ))}
                                    </div>
                                </GothicFrame>
                            </div>
                        )}

                        {/* Vampire Specific Stats */}
                        {!bIsWerewolf && (
                            <GothicFrame className="text-left">
                                <h3 className={`text-xl font-bold ${sThemeAccent} mb-4 border-b border-gray-700 pb-2`}>{fnT('steps.finishingTouches')}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input
                                        label={fnT('characterSheet.generation')}
                                        type="number"
                                        value={oCharacter.generation}
                                        onChange={e => fnUpdateCharacter('generation', parseInt(e.target.value))}
                                        min={4}
                                        max={16}
                                    />
                                    <Input
                                        label={fnT('characterSheet.bloodPotency')}
                                        type="number"
                                        value={oCharacter.bloodPotency}
                                        onChange={e => fnUpdateCharacter('bloodPotency', parseInt(e.target.value))}
                                        min={0}
                                        max={10}
                                    />
                                </div>
                            </GothicFrame>
                        )}

                        {/* Specialties Section */}
                        <GothicFrame className="text-left">
                            <h3 className={`text-xl font-bold ${sThemeAccent} mb-4 border-b border-gray-700 pb-2`}>{fnT('characterSheet.specialties')}</h3>
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                                    <div className="md:col-span-1">
                                        <label className="block text-xs uppercase tracking-wider font-bold text-gray-400 mb-1.5">{fnT('common.skill')}</label>
                                        <select
                                            className="w-full bg-gray-800 border border-gray-600 rounded p-2 text-white outline-none focus:ring-2 focus:ring-red-500"
                                            onChange={(e) => setSelectedSkill(e.target.value)}
                                            value={sSelectedSkill}
                                        >
                                            <option value="">{fnT('common.selectPlaceholder')}</option>
                                            {aSkillList.map(s => (
                                                <option key={s} value={s}>{fnT(`skills.list.${s}`)}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="md:col-span-1">
                                        <Input
                                            label={fnT('common.specialty')}
                                            placeholder="ex: Parkour"
                                            value={sSpecialtyName}
                                            onChange={(e) => setSpecialtyName(e.target.value)}
                                        />
                                    </div>
                                    <Button
                                        variant="secondary"
                                        onClick={() => {
                                            if (sSelectedSkill && sSpecialtyName) {
                                                fnUpdateCharacter('specialties', [...oCharacter.specialties, { skill: sSelectedSkill as Skill, name: sSpecialtyName }]);
                                                setSpecialtyName('');
                                            }
                                        }}
                                    >
                                        {fnT('buttons.add')}
                                    </Button>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {oCharacter.specialties.map((s, i) => (
                                        <div key={i} className="flex items-center gap-2 bg-gray-800 border border-gray-700 px-3 py-1 rounded-full text-sm">
                                            <span className="text-red-400 font-bold">{fnT(`skills.list.${s.skill}`)}:</span>
                                            <span>{s.name}</span>
                                            <button
                                                onClick={() => fnUpdateCharacter('specialties', oCharacter.specialties.filter((_, idx) => idx !== i))}
                                                className="text-gray-500 hover:text-red-500 font-bold ml-1"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </GothicFrame>

                        {/* Touchstones Section */}
                        <GothicFrame className="text-left">
                            <h3 className={`text-xl font-bold ${sThemeAccent} mb-4 border-b border-gray-700 pb-2`}>{fnT('finishingTouches.touchstones')}</h3>
                            <textarea 
                                className={`w-full bg-gray-800 border border-gray-600 rounded p-3 text-white h-32 focus:ring-2 outline-none resize-none ${bIsWerewolf ? 'focus:ring-green-500 focus:border-green-500' : 'focus:ring-red-500 focus:border-red-500'}`}
                                placeholder={fnT('finishingTouches.touchstonesPlaceholder')}
                                value={oCharacter.touchstones}
                                onChange={(e) => fnUpdateCharacter('touchstones', e.target.value)}
                            />
                        </GothicFrame>

                        <CharacterSummary character={oCharacter} />
                    </div>
                );
            case 7: // Sheet
                return (
                    <CharacterSheet 
                        character={oCharacter} 
                        onUpdateHunger={(h) => fnUpdateCharacter('hunger', h)} 
                        onUpdateHumanity={(h) => fnUpdateCharacter('humanity', h)}
                        onUpdateWillpower={(w) => fnUpdateCharacter('willpower', w)}
                        onUpdateHealth={(h) => fnUpdateCharacter('health', h)}
                        onUpdateRage={(r) => fnUpdateCharacter('rage', r)}
                        onUpdateHarano={(h) => fnUpdateCharacter('harano', h)}
                        onUpdateHauglosk={(h) => fnUpdateCharacter('hauglosk', h)}
                        onBack={() => { setView('home'); fnSetStep(1); }}
                        onSave={() => { fnSetStorageMode('save'); fnSetShowStorage(true); }}
                    />
                );
            default:
                return null;
        }
    };

    if (view === 'home') {
        const bIsWerewolf = oCharacter.gameType === GameType.Werewolf;
        const sThemeColor = bIsWerewolf ? 'text-emerald-500' : 'text-red-600';
        const sThemeAccent = bIsWerewolf ? 'text-emerald-400' : 'text-red-400';
        const sThemeBorder = bIsWerewolf ? 'border-emerald-900' : 'border-red-900';
        const sThemeButton = bIsWerewolf ? 'border-emerald-500 hover:bg-emerald-800' : 'border-red-500 hover:bg-red-800';

        if (!bShowModeSelection) {
            return (
                <div className="min-h-screen text-white font-sans flex flex-col items-center justify-center p-4 relative overflow-hidden" style={gothicBackgroundStyle}>
                    <div className="absolute inset-0 pointer-events-none opacity-10">
                        <RoseIcon className="w-[800px] h-[800px] text-red-900 absolute -top-40 -right-40 animate-pulse" />
                    </div>
                    <div className="z-20 text-center mb-12 px-4">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-cinzel font-bold text-red-600 tracking-widest mb-2 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">{fnT('app.title')}</h1>
                        <p className="text-lg sm:text-xl text-gray-400 italic max-w-2xl mx-auto">{fnT('app.subtitle')}</p>
                    </div>
                    <GameSelection onSelect={fnHandleGameSelect} />
                    <div className="mt-12 flex justify-center gap-4 z-20">
                         <Button variant="secondary" onClick={() => { fnSetStorageMode('load'); fnSetShowStorage(true); }} title={fnT('buttons.load')}>
                            <FolderOpenIcon /> {fnT('buttons.load')}
                        </Button>
                         <label className="cursor-pointer bg-gray-600 hover:bg-gray-500 px-6 py-2 rounded-md text-white font-bold transition-all duration-200 shadow-md flex items-center gap-2">
                            <span>{fnT('buttons.import')}</span>
                            <input type="file" className="hidden" accept=".json" onChange={fnImportJSON} />
                        </label>
                    </div>
                    {bShowStorage && (
                        <StorageModal mode={sStorageMode} onClose={() => fnSetShowStorage(false)} currentName={oCharacter.name} onSave={fnSaveCharacter} onLoad={fnLoadCharacter} onDelete={fnDeleteCharacter}/>
                    )}
                </div>
            );
        }

        return (
            <div className="min-h-screen text-white font-sans flex flex-col items-center justify-center p-4 relative overflow-hidden" style={gothicBackgroundStyle}>
                <div className="absolute inset-0 pointer-events-none opacity-20">
                    <RoseIcon className={`w-[800px] h-[800px] ${bIsWerewolf ? 'text-emerald-900' : 'text-red-900'} absolute -top-40 -right-40 animate-pulse`} />
                </div>
                <GothicFrame className={`max-w-2xl w-full text-center p-6 sm:p-12 bg-black/80 shadow-2xl z-10 border ${sThemeBorder}`}>
                    <h1 className={`text-3xl sm:text-5xl md:text-6xl font-cinzel font-bold ${sThemeColor} tracking-widest mb-2 text-shadow-lg`}>
                        {bIsWerewolf ? fnT('app.werewolf') : fnT('app.vampire')}
                    </h1>
                    <p className={`text-xl text-gray-400 mb-12 italic border-b ${sThemeBorder}/50 pb-6 mx-auto w-3/4`}>
                        {fnT('creationMethod.subtitle')}
                    </p>
                    
                    <div className="space-y-4">
                        <Button 
                            variant="primary" 
                            className={`w-full py-4 text-xl font-bold tracking-widest border ${sThemeButton} transition-all transform hover:scale-105`} 
                            onClick={() => { setView('creator'); fnSetStep(2); }}
                        >
                            {fnT('creationMethod.manual')}
                        </Button>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-800">
                            <Button variant="secondary" className="py-3 text-sm flex flex-col items-center gap-1 hover:border-gray-400 border border-gray-700 bg-gray-800" onClick={() => fnCreateRandom('fledgling')}>
                                <span className="font-bold text-white">{fnT('creationMethod.randomLevel', { level: fnT(`xpLevels.fledgling.${oCharacter.gameType.toLowerCase()}`) })}</span>
                                <span className="text-xs text-gray-500">{fnT(`creationMethod.randomFledglingDesc.${oCharacter.gameType.toLowerCase()}`)}</span>
                            </Button>
                            <Button variant="secondary" className="py-3 text-sm flex flex-col items-center gap-1 hover:border-gray-400 border border-gray-700 bg-gray-800" onClick={() => fnCreateRandom('neonate')}>
                                <span className="font-bold text-white">{fnT('creationMethod.randomLevel', { level: fnT(`xpLevels.neonate.${oCharacter.gameType.toLowerCase()}`) })}</span>
                                <span className="text-xs text-gray-500">{fnT(`creationMethod.randomNeonateDesc.${oCharacter.gameType.toLowerCase()}`)}</span>
                            </Button>
                            <Button variant="secondary" className="py-3 text-sm flex flex-col items-center gap-1 hover:border-gray-400 border border-gray-700 bg-gray-800" onClick={() => fnCreateRandom('ancilla')}>
                                <span className="font-bold text-white">{fnT('creationMethod.randomLevel', { level: fnT(`xpLevels.ancilla.${oCharacter.gameType.toLowerCase()}`) })}</span>
                                <span className="text-xs text-gray-500">{fnT(`creationMethod.randomAncillaDesc.${oCharacter.gameType.toLowerCase()}`)}</span>
                            </Button>
                        </div>
                    </div>

                    <div className="mt-12 flex flex-col items-center gap-4">
                        <Button variant="secondary" className="text-xs uppercase tracking-widest opacity-60 hover:opacity-100" onClick={() => fnSetShowModeSelection(false)}>
                            {fnT('buttons.backToGameSelection')}
                        </Button>
                    </div>
                </GothicFrame>
                {oNotification && (
                    <Notification message={oNotification.message} type={oNotification.type} onClose={() => fnSetNotification(null)} />
                )}
            </div>
        );
    }

    return (
        <div className="min-h-screen text-white font-sans selection:bg-red-900 selection:text-white flex flex-col" style={gothicBackgroundStyle}>
            <header className="bg-black border-b-2 border-red-900 p-4 sticky top-0 z-50 shadow-2xl">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('home')}>
                         <div className="text-red-600"><RoseIcon className="w-10 h-10" /></div>
                        <div>
                            <h1 className="text-2xl font-cinzel font-bold text-red-600 tracking-widest">{fnT('app.title')}</h1>
                            <p className="text-xs text-gray-500 hidden md:block">{fnT('app.subtitle')}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="secondary" onClick={() => { fnSetStorageMode('save'); fnSetShowStorage(true); }} title={fnT('buttons.save')}><FloppyDiskIcon /></Button>
                        <Button variant="secondary" onClick={() => { fnSetStorageMode('load'); fnSetShowStorage(true); }} title={fnT('buttons.load')}><FolderOpenIcon /></Button>
                        <Button variant="secondary" onClick={fnResetCharacter} title={fnT('buttons.reset')}><ResetIcon /></Button>
                         <div className="ml-2 border-l border-gray-700 pl-2 flex gap-2">
                            <Button variant="secondary" onClick={fnExportJSON} className="text-xs hidden md:block">{fnT('buttons.export')}</Button>
                            <label className="cursor-pointer bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-xs font-bold flex items-center hidden md:flex">
                                {fnT('buttons.import')}
                                <input type="file" className="hidden" accept=".json" onChange={fnImportJSON} />
                            </label>
                        </div>
                    </div>
                </div>
            </header>
            <main className="flex-grow p-4 md:p-8 max-w-6xl mx-auto w-full">
                <StepIndicator currentStep={nStep} totalSteps={7} steps={aSteps} isWerewolf={oCharacter.gameType === GameType.Werewolf} />
                <div className="mt-8 animate-fadeIn">
                    {renderStepContent()}
                </div>
                {nStep < 7 && <CharacterSummary character={oCharacter} />}
            </main>
            <footer className="bg-black border-t border-gray-800 p-6 sticky bottom-0 z-40">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <Button onClick={() => fnSetStep(prev => Math.max(1, prev - 1))} disabled={nStep === 1} variant="secondary">{fnT('buttons.back')}</Button>
                    {nStep < 7 ? (
                        <div className="flex gap-4">
                            <Button variant="secondary" onClick={() => fnSetStep(7)}>{fnT('buttons.jumpToSheet')}</Button>
                            <Button onClick={() => fnSetStep(prev => Math.min(7, prev + 1))}>{fnT('buttons.next')}</Button>
                        </div>
                    ) : (
                        <Button variant="secondary" onClick={() => window.print()}>{fnT('buttons.print') || 'Print'}</Button>
                    )}
                </div>
            </footer>
            {bShowStorage && (
                <StorageModal mode={sStorageMode} onClose={() => fnSetShowStorage(false)} currentName={oCharacter.name} onSave={fnSaveCharacter} onLoad={fnLoadCharacter} onDelete={fnDeleteCharacter}/>
            )}
            {oNotification && (
                <Notification message={oNotification.message} type={oNotification.type} onClose={() => fnSetNotification(null)} />
            )}
        </div>
    );
};

export default App;
