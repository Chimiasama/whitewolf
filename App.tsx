import {characterPredator,changePredator} from './lib/predatorRules';
import {PredatorCustomization} from './components/PredatorCustomization';
import {SkillDistribution} from './components/SkillDistribution';
import {StartScreen} from './components/StartScreen';
import {CreationTabs} from './components/CreationTabs';
import {CatalogPicker} from './components/CatalogPicker';
import {ResourceChoices,SpecialtyEditor} from './components/ResourceChoices';
import {CREATION_STEPS,REVIEW_STEP,creationIssues,issueDestination} from './lib/creationFlow';
import { ThinBloodCreation } from './components/ThinBloodCreation';
import { WerewolfCreation } from './components/WerewolfCreation';
import { parseCharacter, finishingIssues, validAttributes, playerIssues, SCHEMA_VERSION } from './lib/characterValidation';
import { W5_TRIBES } from './data/w5';
import { asNarrativeNpc } from './lib/npc';

import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { Character, Clan, Attribute, Skill, DisciplineDetail, PredatorTypeDetail, AdvantageFlaw, Specialty, DisciplinePower, GameType, Tribe, Auspice, Disciplines } from './types';
import { fnGetClanDetails, oInitialCharacter, fnGetPredatorTypes, aSkillList, aAttributeList, fnGetDisciplineDetails, fnGetAdvantagesAndFlaws, aMandatorySpecialtySkills, fnGetTribeDetails, fnGetAuspiceDetails, fnGetLoresheets, fnGetRituals, fnGetTalismans, oSkillPaths, oDisciplineCreationPools, VAMPIRE_DISCIPLINES, WEREWOLF_GIFTS, fnTranslateAdvantageFlaw } from './constants';
import { Card } from './components/ui/Card';
import { Button } from './components/ui/Button';
import { Input, TextArea } from './components/ui/Input';
import { CharacterSheet } from './components/CharacterSheet';
import { useI18n } from './lib/i18n';
import { InfoModal } from './components/InfoModal';
import { InfoIcon } from './components/InfoIcon';
import { GothicFrame, RoseIcon } from './components/ui/GothicFrame';
import { StepIndicator } from './components/StepIndicator';
import { fnGenerateIdentity } from './lib/generators';
import { fnCreateRandomCharacter } from './lib/randomizer';
import { fnProcessImage } from './lib/imageUtils';
import sGothicBackgroundUrl from './src/assets/images/gothic_background_1782838973165.jpg';

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
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
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

// --- STATIC CONSTANTS TO AVOID RE-ALLOCATION --- //
const DOTS_ARRAY_5 = [0, 1, 2, 3, 4];
const DOTS_ARRAY_6 = [0, 1, 2, 3, 4, 5];
const ATTRIBUTE_POOL_DISTR = [4, 3, 3, 3, 2, 2, 2, 2];
const SAVE_PREFIX = 'whitewolf_save_';
const LEGACY_SAVE_PREFIX = 'vtm_save_';

// --- HELPER COMPONENTS --- //
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
                if (sKey && sKey.startsWith(SAVE_PREFIX)) {
                    aKeys.push(sKey.replace(SAVE_PREFIX, ''));
                } else if (sKey && sKey.startsWith(LEGACY_SAVE_PREFIX)) {
                    aKeys.push(sKey.replace(LEGACY_SAVE_PREFIX, ''));
                }
            }
            fnSetSavedFiles(Array.from(new Set(aKeys)).sort());
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
                            placeholder={fnT('storage.namePlaceholder')}
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
                                    className={`
                                        flex justify-between items-center rounded border transition-colors overflow-hidden
                                        ${sMode === 'save' && sNameInput === sName 
                                            ? 'bg-red-900/30 border-red-500 text-white' 
                                            : 'bg-gray-800 border-gray-700 hover:border-gray-600'}
                                    `}
                                >
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (sMode === 'load') {
                                                fnOnLoad(sName);
                                                fnOnClose();
                                            } else {
                                                fnSetNameInput(sName);
                                            }
                                        }}
                                        className="flex-grow text-left font-bold p-3 focus:outline-none focus-visible:bg-gray-750 focus-visible:text-red-400 h-full w-full"
                                        aria-label={sMode === 'load' ? `${fnT('buttons.load')}: ${sName}` : `${fnT('buttons.activate')}: ${sName}`}
                                    >
                                        {sName}
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={(e) => fnHandleDelete(sName, e)}
                                        className="p-3 mr-1 hover:bg-red-900 rounded text-gray-500 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                                        title={fnT('buttons.delete')}
                                        aria-label={`${fnT('buttons.delete')}: ${sName}`}
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

    const oGroups = useMemo((): Record<string, string[]> => {
        if (aItems.length <= 3) return { [fnT('finishingTouches.disciplines.title')]: aItems };
        if (aItems.length === 9) {
            return {
                [fnT('characterSheet.attributes.physical')]: aItems.slice(0, 3),
                [fnT('characterSheet.attributes.social')]: aItems.slice(3, 6),
                [fnT('characterSheet.attributes.mental')]: aItems.slice(6, 9)
            };
        }
        return {
            [fnT('characterSheet.skills.physical')]: aItems.slice(0, 9),
            [fnT('characterSheet.skills.social')]: aItems.slice(9, 18),
            [fnT('characterSheet.skills.mental')]: aItems.slice(18, 27)
        };
    }, [aItems, fnT]);

    const oItemNames = useMemo(() => {
        const oNames: Record<string, string> = {};
        aItems.forEach(sItem => {
            oNames[sItem] = sTranslationPrefix ? fnT(`${sTranslationPrefix}.${sItem}`) : sItem;
        });
        return oNames;
    }, [aItems, sTranslationPrefix, fnT]);

    const bIsPoolComplete = Object.values(oPoolUsage.available).every(val => val === 0);

    const remainingSummary=Object.entries(oPoolUsage.available).filter(([,n])=>Number(n)>0).sort(([a],[b])=>Number(b)-Number(a)).map(([dots,count])=>`${count} de ${dots}`).join(' · ');

    const fnHandleItemInteraction = (sItem: string) => {
        fnSetActiveItem(sActiveItem === sItem ? null : sItem);
    };

    return (
        <div className="space-y-2">
            <p className="mb-4 text-sm text-gray-300" role="status">{remainingSummary?`Falta distribuir: ${remainingSummary}`:'Distribuição preenchida'}</p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {Object.entries(oGroups).map(([sGroupName, aGroupItems]) => (
                    <div key={sGroupName} className={Object.keys(oGroups).length === 1 ? "lg:col-span-3" : ""}>
                         {Object.keys(oGroups).length > 1 && (
                            <h3 className="text-red-500 font-bold text-lg mb-1 border-b border-gray-700 pb-1 font-cinzel">{sGroupName}</h3>
                         )}
                        <div className="space-y-2">
                            {(aGroupItems as string[]).map(sItem => {
                                const nValue = oValues[sItem] || nBaseValue;
                                return (
                                <div key={sItem} className="relative group">
                                    <button
                                        onClick={() => fnHandleItemInteraction(sItem)}
                                        className={`
                                            w-full flex justify-between items-center p-2 rounded-md border transition-all duration-200
                                            ${sActiveItem === sItem
                                                ? 'bg-gray-800 border-red-500 ring-1 ring-red-500 shadow-lg'
                                                : 'bg-gray-800/60 border-gray-700 hover:border-gray-500 hover:bg-gray-700'
                                            }
                                        `}
                                    >
                                        <span className="font-bold text-gray-200 text-sm">
                                            {fnCustomRenderer ? fnCustomRenderer(sItem) : oItemNames[sItem]}
                                        </span>
                                        <div className="flex items-center gap-3">
                                            <span className={`text-xl font-bold w-6 text-right ${nValue > nBaseValue ? 'text-red-400' : 'text-gray-600'}`}>
                                                {nValue}
                                            </span>
                                            <div className="flex flex-shrink-0 space-x-1">
                                                 {DOTS_ARRAY_5.map((nI) => (
                                                    <div 
                                                        key={nI} 
                                                        className={`
                                                            w-2.5 h-2.5 rounded-full border transition-all duration-300
                                                            ${nValue > nI ? 'bg-red-600 border-red-400 shadow-[0_0_6px_rgba(220,38,38,0.7)]' : 'bg-transparent border-gray-600'}
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
                                    {sActiveItem === sItem && (
                                        <InfoModal title={sTranslationPrefix ? oItemNames[sItem] : sItem} onClose={() => fnSetActiveItem(null)}>
                                            <div className="space-y-6">
                                                <div className="flex justify-center gap-3 flex-wrap">
                                                    {DOTS_ARRAY_6.map((nVal) => {
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
                                                                    w-14 h-14 rounded-full border-2 font-bold flex flex-col items-center justify-center transition-all duration-200
                                                                    ${bIsCurrent
                                                                        ? 'bg-red-600 border-red-400 text-white shadow-[0_0_20px_rgba(220,38,38,0.5)] scale-110'
                                                                        : bIsDisabled
                                                                            ? 'bg-gray-800 border-gray-700 text-gray-700 cursor-not-allowed opacity-30'
                                                                            : 'bg-gray-700 border-gray-500 text-gray-300 hover:border-red-500 hover:text-white hover:bg-gray-600'}
                                                                `}
                                                            >
                                                                <span className="text-xl">{nVal}</span>
                                                                <span className="text-[10px] font-bold">{nCount}</span>
                                                            </button>
                                                        );
                                                    })}
                                                </div>

                                            </div>
                                        </InfoModal>
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
    allDisciplines: Disciplines;
}

const DisciplinePowerSelector: React.FC<DisciplinePowerSelectorProps> = ({ disciplineKey: sDisciplineKey, dots: nDots, selectedPowerIds: aSelectedPowerIds, onSelectPowers: fnOnSelectPowers, disciplineDetails: oDisciplineDetails, allDisciplines: oAllDisciplines }) => {
    const { t: fnT } = useI18n();
    const fnCheckValidity = useCallback((sTestId: string) => {
        const oPower = oDisciplineDetails.powers.find(p => p.id === sTestId);
        if (!oPower) return false;

        // Check prerequisites
        if (oPower.prerequisite && !aSelectedPowerIds.includes(oPower.prerequisite)) return false;

        // Check amalgams
        if (oPower.amalgam) {
            for (const oReq of oPower.amalgam) {
                if ((oAllDisciplines[oReq.discipline] || 0) < oReq.level) return false;
            }
        }

        const aTestList = [...aSelectedPowerIds, sTestId];
        const aLevels = aTestList.map(id => {
            return oDisciplineDetails.powers.find(p => p.id === id)?.level || 0;
        });
        aLevels.sort((a: number, b: number) => b - a);
        for (let i = 0; i < aLevels.length; i++) {
            if (aLevels[i] > nDots - i) return false;
        }
        return true;
    }, [aSelectedPowerIds, nDots, oDisciplineDetails, oAllDisciplines]);

    const fnTogglePower = (sPowerId: string) => {
        if (aSelectedPowerIds.includes(sPowerId)) {
            fnOnSelectPowers(aSelectedPowerIds.filter(id => id !== sPowerId));
        } else {
            if (aSelectedPowerIds.length < nDots && fnCheckValidity(sPowerId)) {
                fnOnSelectPowers([...aSelectedPowerIds, sPowerId]);
            }
        }
    };

    return <div className="mt-4"><p className="mb-2 text-sm text-gray-300">{aSelectedPowerIds.length} / {nDots} {sDisciplineKey==='thinbloodalchemy'?'fórmulas escolhidas':'poderes escolhidos'}</p><CatalogPicker label={`${oDisciplineDetails.name} — ${sDisciplineKey==='thinbloodalchemy'?'fórmulas':'poderes'}`} multiple selected={aSelectedPowerIds} onToggle={fnTogglePower} options={oDisciplineDetails.powers.map(p=>({id:p.id,name:p.name,summary:`Nível ${p.level} · ${p.cost||'Consulte o sistema'}`,unavailable:aSelectedPowerIds.includes(p.id)?undefined:p.level>nDots?`Exige ${p.level} pontos nesta Disciplina.`:aSelectedPowerIds.length>=nDots?'Todos os espaços de poder foram preenchidos.':!fnCheckValidity(p.id)?'Exige pré-requisito, amálgama ou espaço de nível compatível.':undefined,details:<><p>{p.description}</p><p className="mt-2">{p.system}</p>{p.amalgam?.map((r,i)=><p key={i}>Amálgama: {r.discipline} {r.level}</p>)}{p.prerequisite&&<p>Pré-requisito: {oDisciplineDetails.powers.find(x=>x.id===p.prerequisite)?.name||p.prerequisite}</p>}</>}))}/></div>;
};

// --- NOTIFICATION COMPONENT --- //
const Notification: React.FC<{ message: string; type: 'success' | 'error'; onClose: () => void }> = ({ message: sMessage, type: sType, onClose: fnOnClose }) => {
    const fnOnCloseRef = useRef(fnOnClose);
    useEffect(() => { fnOnCloseRef.current = fnOnClose; }, [fnOnClose]);

    useEffect(() => {
        const timer = setTimeout(() => fnOnCloseRef.current(), 3000);
        return () => clearTimeout(timer);
        // Only restart the auto-dismiss countdown when the toast's content actually changes,
        // not on every parent re-render (which would otherwise recreate fnOnClose and reset the timer).
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sMessage, sType]);

    return (
        <div role="status" aria-live="polite" className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-2xl border flex items-center gap-3 z-50 animate-fadeInUp ${
            sType === 'success' ? 'bg-gray-900 border-green-500 text-green-400' : 'bg-gray-900 border-red-500 text-red-400'
        }`}>
            {sType === 'success' ? <CheckCircle /> : <ExclamationCircle />}
            <span className="font-bold">{sMessage}</span>
        </div>
    );
};

// --- GOTHIC BACKGROUND STYLE --- //
const gothicBackgroundStyle = {
    backgroundImage: `linear-gradient(rgba(10, 15, 25, 0.88), rgba(10, 15, 25, 0.96)), url('${sGothicBackgroundUrl}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
};

// --- APP COMPONENT --- //
const App: React.FC = () => {
    const { t: fnT, locale: sLocale, setLocale: fnSetLocale } = useI18n();

    // Performance Optimization: Memoize core data objects to avoid redundant translation lookups and object reconstructions on every render.
    // These objects are relatively large and expensive to build, so memoizing them provides a measurable speed boost during state updates.
    const oClanDetails = useMemo(() => fnGetClanDetails(fnT), [fnT]);
    const oDisciplineDetails = useMemo(() => fnGetDisciplineDetails(fnT), [fnT]);
    const aPredatorTypes = useMemo(() => fnGetPredatorTypes(fnT), [fnT]);
    const oTribeDetails = useMemo(() => fnGetTribeDetails(fnT), [fnT]);
    const oAuspiceDetails = useMemo(() => fnGetAuspiceDetails(fnT), [fnT]);

    const [view, setView] = useState<'home' | 'creator'>('home');
    const [nStep, fnSetStep] = useState(1);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [nStep]);
    const [oCharacter, fnSetCharacter] = useState<Character>(oInitialCharacter);
    useEffect(()=>setCompleted(false),[oCharacter]);

    useEffect(()=>{
        if(view==='creator'&&oCharacter.gameType){
            try {localStorage.setItem('whitewolf_draft_v2',JSON.stringify({...oCharacter,schemaVersion:SCHEMA_VERSION}));setDraftSummary({name:oCharacter.name,gameType:oCharacter.gameType});setSaveStatus('Rascunho salvo neste navegador');} catch {setSaveStatus('Não foi possível salvar o rascunho. Exporte JSON para preservar suas escolhas.');}
        }
    },[oCharacter,view]);
    const fnNormalizeCharacter = useCallback(parseCharacter, []);
    const aAdvantagesAndFlaws = useMemo(() => fnGetAdvantagesAndFlaws(fnT, oCharacter.gameType), [fnT, oCharacter.gameType]);
    const [bShowStorage, fnSetShowStorage] = useState(false);
    const [sStorageMode, fnSetStorageMode] = useState<'save' | 'load'>('save');
    const [oNotification, fnSetNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);
    const [oActiveDetail, fnSetActiveDetail] = useState<{title: string, content: React.ReactNode} | null>(null);

    const aSteps = CREATION_STEPS;
    const [panels,setPanels]=useState({nature:'tribe',capacities:'attributes',powers:'predator',resources:'advantages'});
    const [draftSummary,setDraftSummary]=useState<{name:string;gameType:GameType}|null>(()=>{
        try{const raw=localStorage.getItem('whitewolf_draft_v2');if(raw){const c=parseCharacter(JSON.parse(raw));return {name:c.name,gameType:c.gameType};}}catch{}return null;
    });
    const [completed,setCompleted]=useState(false);
    const [completionRequested,setCompletionRequested]=useState(false);
    const [saveStatus,setSaveStatus]=useState('');
    const allIssues=creationIssues(oCharacter);
    useEffect(()=>{
        if(view==='creator')try{localStorage.setItem('whitewolf_flow_v1',JSON.stringify({step:nStep,panels}));}catch{}
    },[view,nStep,panels]);
    const goToIssue=(issue:string)=>{const destination=issueDestination(issue,oCharacter);fnSetStep(destination.step);if(destination.panel)setPanels(prev=>({...prev,[destination.step===3?'capacities':destination.step===4?'powers':'resources']:destination.panel}));};
    const displayIssue=(issue:string)=>aSkillList.reduce((text,skill)=>text.replace(skill,fnT('skills.list.'+skill)),issue);
    const aValidationIssues=allIssues.filter(issue=>issueDestination(issue,oCharacter).step===nStep);
    const setPanel=(key:keyof typeof panels,value:string)=>setPanels(prev=>({...prev,[key]:value}));

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

    const fnSaveCharacter = (sName: string) => {
        if (typeof window !== 'undefined') {
            try {
                localStorage.setItem(`${SAVE_PREFIX}${sName}`, JSON.stringify({...oCharacter,schemaVersion:SCHEMA_VERSION}));
                fnShowNotification(fnT('storage.saveSuccess'));
                if(completionRequested&&allIssues.length===0)setCompleted(true);
                setCompletionRequested(false);
            } catch (e) {
                fnShowNotification(fnT('storage.saveError'), "error");
            }
        }
    };

    const fnLoadCharacter = (sName: string) => {
        if (typeof window !== 'undefined') {
            const sData = localStorage.getItem(`${SAVE_PREFIX}${sName}`) || localStorage.getItem(`${LEGACY_SAVE_PREFIX}${sName}`);
            if (sData) {
                try {
                    const oLoaded = JSON.parse(sData) as Partial<Character>;
                    const normalized=fnNormalizeCharacter(oLoaded);
                    fnSetCharacter(normalized);
                    setView('creator');
                    fnSetStep(REVIEW_STEP);
                    fnShowNotification(fnT('storage.loadSuccess'));
                } catch (e) {
                    console.error("Failed to parse save", e);
                    fnShowNotification(fnT('storage.loadError'), "error");
                }
            }
        }
    };

    const fnDeleteCharacter = (sName: string) => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(`${SAVE_PREFIX}${sName}`);
            localStorage.removeItem(`${LEGACY_SAVE_PREFIX}${sName}`);
            fnShowNotification(fnT('storage.deleteSuccess', { name: sName }));
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
        const sData = JSON.stringify({...oCharacter,schemaVersion:SCHEMA_VERSION}, null, 2);
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
        if (file.size > 8 * 1024 * 1024) { fnShowNotification('JSON excede 8 MB.', 'error'); e.target.value=''; return; }
        const reader = new FileReader();
        reader.onerror = () => fnShowNotification('Não foi possível ler o arquivo.', 'error');
        reader.onload = (event) => {
            try {
                const oLoaded = JSON.parse(event.target?.result as string) as Partial<Character>;
                const normalized=fnNormalizeCharacter(oLoaded);
                fnSetCharacter(normalized);
                setView('creator');
                fnSetStep(REVIEW_STEP);
                fnShowNotification(fnT('storage.importSuccess'));
            } catch (err) {
                console.error(err);
                fnShowNotification(err instanceof Error ? err.message : fnT('storage.importError'), "error");
            }
        };
        reader.readAsText(file);
        e.target.value = "";
    };

    // Prune invalid powers (amalgams/prerequisites) when disciplines change
    useEffect(() => {
        const oNewDisciplinePowers = { ...oCharacter.disciplinePowers };
        let bChanged = false;

        const oDetails = oDisciplineDetails;

        Object.keys(oNewDisciplinePowers).forEach(sDisc => {
            const aSelectedIds = oNewDisciplinePowers[sDisc];
            const oDiscDetails = oDetails[sDisc];
            if (!oDiscDetails) return;

            const aValidIds: string[] = [];
            // We need to check in order because prerequisites might depend on each other
            // but for simplicity we can just filter multiple times or use a more robust logic.
            // Standard discipline powers are linear enough.

            let aToFilter = [...aSelectedIds];
            let bFilterChanged = true;
            while (bFilterChanged) {
                bFilterChanged = false;
                const aNext = aToFilter.filter(sId => {
                    const oPower = oDiscDetails.powers.find(p => p.id === sId);
                    if (!oPower) return false;

                    // Level check
                    if (oPower.level > (oCharacter.disciplines[sDisc] || 0)) return false;

                    // Prerequisite check
                    if (oPower.prerequisite && !aToFilter.includes(oPower.prerequisite)) return false;

                    // Amalgam check
                    if (oPower.amalgam) {
                        for (const oReq of oPower.amalgam) {
                            if ((oCharacter.disciplines[oReq.discipline] || 0) < oReq.level) return false;
                        }
                    }
                    return true;
                });

                if (aNext.length !== aToFilter.length) {
                    aToFilter = aNext;
                    bFilterChanged = true;
                    bChanged = true;
                }
            }
            oNewDisciplinePowers[sDisc] = aToFilter;
        });

        if (bChanged) {
            fnUpdateCharacter('disciplinePowers', oNewDisciplinePowers);
        }
    }, [oCharacter.disciplines, fnT]);

    const fnHandlePredatorTypeChange = (id:string,patch:Partial<Character>={}) => fnSetCharacter(prev=>changePredator(prev,aPredatorTypes,id,patch));
    const fnHandlePortraitChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const sBase64 = await fnProcessImage(file);
            fnUpdateCharacter('portraitUrl', sBase64);
        } catch (err: any) {
            const sCode = err?.message as string | undefined;
            const sKey = sCode && ['invalidFileType', 'fileTooLarge', 'canvasError', 'loadError', 'readError'].includes(sCode)
                ? `errors.image.${sCode}`
                : 'errors.image.generic';
            fnShowNotification(fnT(sKey), 'error');
        }
    };

    const renderStepContent = (override?:string):React.ReactNode => {
        const sStepId = override || aSteps[nStep - 1]?.id;
        const bIsWerewolf=oCharacter.gameType===GameType.Werewolf;
        const sThemeColor=bIsWerewolf?'text-emerald-300':'text-red-300';
        const sThemeAccent=sThemeColor;
        const sThemeBorder=bIsWerewolf?'border-emerald-800':'border-red-800';
        const sThemeBg='bg-gray-900';
        switch (sStepId) {
            case 'concept':
                return (
                    <GothicFrame>
                        <div className="flex flex-wrap justify-between items-center gap-3 mb-2">
                            <h2 className="text-2xl font-cinzel text-red-500">{fnT('concept.title')}</h2>
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                            <Input id="char-name" label={fnT('concept.name')} value={oCharacter.name} onChange={e => fnUpdateCharacter('name', e.target.value)} isWerewolf={oCharacter.gameType === GameType.Werewolf} />
                            <Input id="char-mentor" label={oCharacter.gameType === GameType.Werewolf ? fnT('characterSheet.mentor') : fnT('concept.sire')} value={oCharacter.gameType === GameType.Werewolf ? (oCharacter.mentor || '') : oCharacter.sire} onChange={e => fnUpdateCharacter(oCharacter.gameType === GameType.Werewolf ? 'mentor' : 'sire', e.target.value)} placeholder={oCharacter.gameType === GameType.Werewolf ? fnT('concept.mentorPlaceholder') : fnT('concept.sirePlaceholder')} isWerewolf={oCharacter.gameType === GameType.Werewolf} />
                            <div className="md:col-span-2">
                                <Input id="char-concept" label={fnT('concept.concept')} value={oCharacter.concept} onChange={e => fnUpdateCharacter('concept', e.target.value)} placeholder={fnT('concept.conceptPlaceholder')} isWerewolf={oCharacter.gameType === GameType.Werewolf} />
                            </div>
                            <Input id="char-ambition" label={fnT('concept.ambition')} value={oCharacter.ambition} onChange={e => fnUpdateCharacter('ambition', e.target.value)} placeholder={fnT('concept.ambitionPlaceholder')} isWerewolf={oCharacter.gameType === GameType.Werewolf} />
                            <Input id="char-desire" label={fnT('concept.desire')} value={oCharacter.desire} onChange={e => fnUpdateCharacter('desire', e.target.value)} placeholder={fnT('concept.desirePlaceholder')} isWerewolf={oCharacter.gameType === GameType.Werewolf} />
                             <div className="md:col-span-2">
                                <label className="block text-xs uppercase tracking-wider font-bold text-gray-400 mb-1.5">
                                    {fnT('concept.portrait')}
                                </label>
                                <div className="flex items-center gap-4">
                                    {oCharacter.portraitUrl && (
                                        <div className="w-16 h-16 rounded overflow-hidden border border-gray-700 flex-shrink-0">
                                            <img src={oCharacter.portraitUrl} alt="Portrait preview" className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                    <label className={`flex-grow cursor-pointer bg-gray-950/60 backdrop-blur-sm border border-gray-800/80 rounded-lg px-4 py-2.5 text-gray-400 text-sm transition-all duration-200 hover:border-gray-600 flex items-center justify-center gap-2 ${oCharacter.gameType === GameType.Werewolf ? 'hover:border-emerald-500/50' : 'hover:border-red-500/50'}`}>
                                        <span className="truncate">{oCharacter.portraitUrl ? fnT('concept.changePortrait') : fnT('concept.portraitPlaceholder')}</span>
                                        <input type="file" className="hidden" accept="image/*" onChange={fnHandlePortraitChange} />
                                    </label>
                                    {oCharacter.portraitUrl && (
                                        <button
                                            onClick={() => fnUpdateCharacter('portraitUrl', '')}
                                            className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                                            title={fnT('buttons.delete')}
                                        >
                                            <TrashIcon />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </GothicFrame>
                );
            case 'clan':
                {
                    const aClanKeys = Object.keys(oClanDetails) as Clan[];
                    return (
                        <div className="text-center space-y-4">
                            <div className="space-y-2">
                                <h2 className="text-2xl font-cinzel text-red-500">{fnT('clan.title')}</h2>
                            </div>

                            <div className="bg-black/40 p-4 rounded-xl border border-red-900/30 sticky top-[72px] z-30 backdrop-blur-md shadow-2xl">
                                <div className="flex flex-wrap justify-center gap-2">
                                    {aClanKeys.map(sClan => (
                                        <button
                                            key={sClan}
                                            onClick={() => {if(sClan===oCharacter.clan)return;fnHandlePredatorTypeChange('');fnSetCharacter(prev=>({...prev,clan:sClan,disciplines:{},disciplinePowers:{},...(sClan===Clan.ThinBlood?{generation:14,bloodPotency:0}:{generation:13,bloodPotency:1})}));}}
                                            className={`
                                                px-4 py-2 rounded-lg border font-cinzel text-sm transition-all duration-300
                                                ${oCharacter.clan === sClan
                                                    ? 'bg-red-900 border-red-500 text-white shadow-[0_0_15px_rgba(220,38,38,0.4)] scale-105'
                                                    : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-red-800 hover:text-red-400'}
                                            `}
                                        >
                                            {oClanDetails[sClan].name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {oCharacter.clan && oClanDetails[oCharacter.clan as Clan] ? (
                                <GothicFrame className="text-left animate-fadeIn">
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                        <div className="lg:col-span-2 space-y-4">
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b border-red-900/30 pb-4">
                                                <h3 className="text-3xl sm:text-4xl font-cinzel text-red-500">{oClanDetails[oCharacter.clan as Clan].name}</h3>
                                                <div className="flex flex-col sm:flex-row flex-wrap gap-2 items-center sm:items-end justify-center sm:justify-end w-full sm:w-auto">
                                                    {oClanDetails[oCharacter.clan as Clan].disciplines.map(d => (
                                                    <span key={d} className="px-3 py-1 bg-red-900/20 border border-red-900/40 rounded text-xs text-red-400 font-bold uppercase tracking-widest w-full sm:w-auto text-center">
                                                        {oDisciplineDetails[d.toLowerCase()]?.name || d}
                                                    </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-gray-300 leading-relaxed italic text-lg">{oClanDetails[oCharacter.clan as Clan].description}</p>
                                        </div>

                                        <div className="space-y-6 bg-black/40 p-6 rounded-xl border border-red-900/20">
                                            <div className="space-y-2">
                                                <h4 className="text-red-500 font-bold uppercase text-xs tracking-[0.2em]">{fnT('characterSheet.clanBane')}</h4>
                                                <p className="text-sm text-gray-400 leading-relaxed">{oClanDetails[oCharacter.clan as Clan].bane}</p>
                                            </div>
                                            <div className="space-y-2">
                                                <h4 className="text-red-500 font-bold uppercase text-xs tracking-[0.2em]">{fnT('characterSheet.clanCompulsion')}</h4>
                                                <p className="text-sm text-gray-400 leading-relaxed">{oClanDetails[oCharacter.clan as Clan].compulsion}</p>
                                            </div>
                                        </div>
                                    </div>
                                </GothicFrame>
                            ) : (
                                <div className="py-20 flex flex-col items-center justify-center opacity-30">
                                    <RoseIcon className="w-32 h-32 text-red-900 animate-pulse" />
                                    <p className="text-red-800 font-cinzel mt-4 tracking-widest">{fnT('common.selectClanToSeeDetails')}</p>
                                </div>
                            )}
                        </div>
                    );
                }
            case 'tribe':
                {
                    const aTribeKeys = Object.keys(oTribeDetails) as Tribe[];
                    return (
                        <div className="text-center space-y-4">
                            <div className="space-y-2">
                                <h2 className="text-2xl font-cinzel text-emerald-500">{fnT('steps.tribe')}</h2>
                            </div>

                            <div className="bg-black/40 p-4 rounded-xl border border-emerald-900/30 sticky top-[72px] z-30 backdrop-blur-md shadow-2xl">
                                <div className="flex flex-wrap justify-center gap-2">
                                    {aTribeKeys.map(sTribe => (
                                        <button
                                            key={sTribe}
                                            onClick={() => fnSetCharacter(prev=>({...prev,tribe:sTribe,gifts:[],renown:{glory:0,honor:0,wisdom:0,[W5_TRIBES[sTribe].renown]:2}}))}
                                            className={`
                                                px-4 py-2 rounded-lg border font-cinzel text-sm transition-all duration-300
                                                ${oCharacter.tribe === sTribe
                                                    ? 'bg-emerald-900 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)] scale-105'
                                                    : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-emerald-800 hover:text-emerald-400'}
                                            `}
                                        >
                                            {oTribeDetails[sTribe].name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {oCharacter.tribe && oTribeDetails[oCharacter.tribe as Tribe] ? (
                                <GothicFrame className="text-left animate-fadeIn border-emerald-900/30">
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                        <div className="lg:col-span-2 space-y-4">
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b border-emerald-900/30 pb-4">
                                                <h3 className="text-3xl sm:text-4xl font-cinzel text-emerald-500">{oTribeDetails[oCharacter.tribe as Tribe].name}</h3>
                                                <div className="flex flex-col sm:flex-row flex-wrap gap-2 items-center sm:items-end justify-center sm:justify-end w-full sm:w-auto">
                                                    {oTribeDetails[oCharacter.tribe as Tribe].gifts.map(g => (
                                                    <span key={g} className="px-3 py-1 bg-emerald-900/20 border border-emerald-900/40 rounded text-xs text-emerald-400 font-bold uppercase tracking-widest w-full sm:w-auto text-center">
                                                        {oDisciplineDetails[g]?.name || g}
                                                    </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-gray-300 leading-relaxed italic text-lg">{oTribeDetails[oCharacter.tribe as Tribe].description}</p>
                                        </div>

                                        <div className="space-y-6 bg-black/40 p-6 rounded-xl border border-emerald-900/20">
                                            <div className="space-y-2">
                                                <h4 className="text-emerald-500 font-bold uppercase text-xs tracking-[0.2em]">{fnT('compendium.favor')}</h4>
                                                <p className="text-sm text-gray-400 leading-relaxed">{oTribeDetails[oCharacter.tribe as Tribe].favor}</p>
                                            </div>
                                            <div className="space-y-2">
                                                <h4 className="text-red-500 font-bold uppercase text-xs tracking-[0.2em]">{fnT('compendium.bane')}</h4>
                                                <p className="text-sm text-gray-400 leading-relaxed">{oTribeDetails[oCharacter.tribe as Tribe].bane}</p>
                                            </div>
                                        </div>
                                    </div>
                                </GothicFrame>
                            ) : (
                                <div className="py-20 flex flex-col items-center justify-center opacity-30">
                                    <ClawIcon className="w-32 h-32 text-emerald-900 animate-pulse" />
                                    <p className="text-emerald-800 font-cinzel mt-4 tracking-widest">{fnT('common.selectTribeToSeeDetails')}</p>
                                </div>
                            )}
                        </div>
                    );
                }
            case 'auspice':
                {
                    const aAuspiceKeys = Object.keys(oAuspiceDetails) as Auspice[];
                    return (
                        <div className="text-center space-y-4">
                            <div className="space-y-2">
                                <h2 className="text-2xl font-cinzel text-emerald-500">{fnT('steps.auspice')}</h2>
                            </div>

                            <div className="bg-black/40 p-4 rounded-xl border border-emerald-900/30 sticky top-[72px] z-30 backdrop-blur-md shadow-2xl">
                                <div className="flex flex-wrap justify-center gap-2">
                                    {aAuspiceKeys.map(sAuspice => (
                                        <button
                                            key={sAuspice}
                                            onClick={() => fnUpdateCharacter('auspice', sAuspice)}
                                            className={`
                                                px-4 py-2 rounded-lg border font-cinzel text-sm transition-all duration-300
                                                ${oCharacter.auspice === sAuspice
                                                    ? 'bg-emerald-900 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)] scale-105'
                                                    : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-emerald-800 hover:text-emerald-400'}
                                            `}
                                        >
                                            {oAuspiceDetails[sAuspice].name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {oCharacter.auspice && oAuspiceDetails[oCharacter.auspice as Auspice] ? (
                                <GothicFrame className="text-left animate-fadeIn border-emerald-900/30">
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center border-b border-emerald-900/30 pb-4">
                                            <h3 className="text-4xl font-cinzel text-emerald-500">{oAuspiceDetails[oCharacter.auspice as Auspice].name}</h3>
                                        </div>
                                        <p className="text-gray-300 leading-relaxed italic text-lg">{oAuspiceDetails[oCharacter.auspice as Auspice].description}</p>
                                    </div>
                                </GothicFrame>
                            ) : (
                                <div className="py-20 flex flex-col items-center justify-center opacity-30">
                                    <WolfCubIcon className="w-32 h-32 text-emerald-900 animate-pulse" />
                                    <p className="text-emerald-800 font-cinzel mt-4 tracking-widest">{fnT('common.selectAuspiceToSeeDetails')}</p>
                                </div>
                            )}
                        </div>
                    );
                }
            case 'attributes':
                return (
                    <div className="text-center">
                        <PointAllocator 
                            items={aAttributeList} 
                            values={oCharacter.attributes} 
                            onChange={fnHandleAttributeChange} 
                            pool={ATTRIBUTE_POOL_DISTR}
                            translationPrefix="attributes.list"
                            baseValue={1}
                            colorClass={oCharacter.gameType === GameType.Werewolf ? "bg-green-900/40" : "bg-red-900/40"}
                            accentColorClass={oCharacter.gameType === GameType.Werewolf ? "border-green-500 shadow-[0_0_15px_rgba(22,163,74,0.5)] ring-1 ring-green-400" : "border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.5)] ring-1 ring-red-400"}
                        />
                    </div>
                );
            case 'skills':
                return (
                    <SkillDistribution character={oCharacter} onChange={patch=>fnSetCharacter(prev=>({...prev,...patch}))}>
                        <PointAllocator 
                            items={aSkillList} 
                            values={oCharacter.skills} 
                            onChange={fnHandleSkillChange} 
                            pool={oCharacter.skillPath?oSkillPaths[oCharacter.skillPath]:[]}
                            translationPrefix="skills.list"
                            colorClass={oCharacter.gameType === GameType.Werewolf ? "bg-green-900/40" : "bg-red-900/40"}
                            accentColorClass={oCharacter.gameType === GameType.Werewolf ? "border-green-500 shadow-[0_0_15px_rgba(22,163,74,0.5)] ring-1 ring-green-400" : "border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.5)] ring-1 ring-red-400"}
                        />
                    </SkillDistribution>
                );
            case 'nature':
                return bIsWerewolf?<CreationTabs items={[{id:'tribe',label:'Tribo'},{id:'auspice',label:'Augúrio'}]} active={panels.nature} onChange={id=>setPanel('nature',id)}>{id=>renderStepContent(id)}</CreationTabs>:renderStepContent('clan');
            case 'capacities':
                return <CreationTabs items={[{id:'attributes',label:'Atributos'},{id:'skills',label:'Perícias'},{id:'specialties',label:'Especialidades'}]} active={panels.capacities} onChange={id=>setPanel('capacities',id)}>{id=>id==='specialties'?<SpecialtyEditor character={oCharacter} onChange={fnUpdateCharacter}/>:renderStepContent(id)}</CreationTabs>;
            case 'powers':
                return bIsWerewolf?renderStepContent('wolf'):<CreationTabs items={oCharacter.clan===Clan.ThinBlood?[{id:'thinblood',label:'Méritos e Defeitos'},{id:'disciplines',label:'Disciplinas e fórmulas'}]:[{id:'predator',label:'Alimentação'},{id:'disciplines',label:'Disciplinas e poderes'}]} active={panels.powers} onChange={id=>setPanel('powers',id)}>{id=>renderStepContent(id)}</CreationTabs>;
            case 'resources':
                return <ResourceChoices character={oCharacter} onChange={fnUpdateCharacter} panel={panels.resources} onPanel={id=>setPanel('resources',id)}/>;
            case 'predator':
            case 'disciplines':
            case 'thinblood':
            case 'wolf':
                return (
                    <div className="text-center space-y-4">

                        
                        {sStepId==='wolf' ? <WerewolfCreation character={oCharacter} onChange={fnUpdateCharacter}/> : sStepId==='thinblood'?<ThinBloodCreation character={oCharacter} onChange={fnUpdateCharacter}/>:sStepId==='disciplines'?(<>
                                                {/* Disciplines / Gifts Section */}
                        <GothicFrame className="text-left">
                            <h3 className={`text-xl font-bold ${sThemeAccent} mb-2 border-b border-gray-700 pb-2`}>
                                {bIsWerewolf ? fnT('characterSheet.gifts') : fnT('finishingTouches.disciplines.title')}
                            </h3>
                            <p className="text-gray-400 mb-2">
                                {bIsWerewolf 
                                    ? fnT('finishingTouches.gifts.subtitle')
                                    : fnT('finishingTouches.disciplines.subtitle')}
                            </p>

                            {/* Point Pool Indicator */}
                            <div className="mb-4 flex flex-col items-center p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                                {(() => {
                                    const oPredatorType = characterPredator(oCharacter,aPredatorTypes);
                                    const aCreationPool = oCharacter.clan===Clan.ThinBlood?[...(oCharacter.thinMerits?.includes('alchemist')?[1]:[]),...(oCharacter.thinMerits?.includes('affinity')?[1]:[])]:oDisciplineCreationPools[oCharacter.gameType as GameType] || [];

                                    const oDiscs = { ...oCharacter.disciplines };
                                    if (oPredatorType?.disciplineAdd) {
                                        const d = oPredatorType.disciplineAdd.discipline;
                                        if (oDiscs[d]) oDiscs[d] -= oPredatorType.disciplineAdd.dots;
                                        if (oDiscs[d] === 0) delete oDiscs[d];
                                    }

                                    const aAssigned = Object.values(oDiscs).filter(v => (v as number) > 0);
                                    const aSortedPool = [...aCreationPool].sort((a, b) => b - a);

                                    const oUsage = aSortedPool.reduce((acc, val) => {
                                        acc[val] = (acc[val] || 0) + 1;
                                        return acc;
                                    }, {} as Record<number, number>);

                                    const oUsed = aAssigned.reduce((acc, val) => {
                                        const nVal = val as number;
                                        acc[nVal] = (acc[nVal] || 0) + 1;
                                        return acc;
                                    }, {} as Record<number, number>);

                                    const bIsComplete = aSortedPool.every(val => (oUsed[val] || 0) >= (oUsage[val] || 0));

                                    return (
                                        <>
                                            <span className={`text-xs font-bold uppercase tracking-widest mb-2 ${bIsComplete ? 'text-green-500' : 'text-red-400'}`}>
                                                {fnT('common.poolDistribution')}
                                                {bIsComplete && <CheckCircle />}
                                            </span>
                                            <div className="flex gap-4">
                                                {Object.keys(oUsage).sort((a, b) => parseInt(b) - parseInt(a)).map(k => {
                                                    const val = parseInt(k);
                                                    const total = oUsage[val];
                                                    const used = Math.min(total, oUsed[val] || 0);
                                                    return (
                                                        <div key={val} className="flex flex-col items-center">
                                                            <span className="text-[10px] text-gray-500 mb-1 uppercase">{val} {fnT('compendium.dots')}</span>
                                                            <div className="flex gap-1">
                                                                {[...Array(total)].map((_, i) => (
                                                                    <div key={i} className={`w-3 h-3 rounded-full border ${i < used ? (bIsWerewolf ? 'bg-green-600 border-green-400 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : 'bg-red-600 border-red-400 shadow-[0_0_8px_rgba(220,38,38,0.4)]') : 'bg-gray-800 border-gray-600'}`}></div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                                {oPredatorType?.disciplineAdd && (
                                                    <div className="flex flex-col items-center opacity-60">
                                                        <span className="text-[10px] text-gray-500 mb-1 uppercase">{fnT('compendium.predator')}</span>
                                                        <div className="w-3 h-3 rounded-full border bg-purple-600 border-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.4)]"></div>
                                                    </div>
                                                )}
                                            </div>
                                        </>
                                    );
                                })()}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 min-w-0">
                                {(() => {
                                    const aBaseDiscs = bIsWerewolf
                                        ? Array.from(new Set([
                                            ...(oCharacter.tribe ? oTribeDetails[oCharacter.tribe].gifts : []),
                                            ...(oCharacter.auspice ? oAuspiceDetails[oCharacter.auspice].gifts : [])
                                          ]))
                                        : (oCharacter.clan===Clan.ThinBlood?(oCharacter.thinMerits?.includes('alchemist')?['thinbloodalchemy']:[]):oCharacter.clan ? oClanDetails[oCharacter.clan].disciplines : []);
                                    const aActiveDiscs = Object.keys(oCharacter.disciplines);
                                    const aAllDiscs = Array.from(new Set([...aBaseDiscs, ...aActiveDiscs]));

                                    if (aAllDiscs.length === 0) {
                                        return (
                                            <div className="sm:col-span-2 lg:col-span-3 rounded-lg border border-dashed border-gray-700 bg-gray-900/60 p-4 text-center text-sm text-gray-400">
                                                {bIsWerewolf ? fnT('finishingTouches.gifts.subtitle') : fnT('finishingTouches.disciplines.subtitle')}
                                            </div>
                                        );
                                    }

                                    return aAllDiscs.map(sDisc => {
                                        const nDots = oCharacter.disciplines[sDisc] || 0;
                                        const oDetails = oDisciplineDetails[sDisc.toLowerCase()];
                                        const oPredatorType = characterPredator(oCharacter,aPredatorTypes);
                                        const bIsPredatorDisc = oPredatorType?.disciplineAdd?.discipline === sDisc;
                                        const nPredatorDots = bIsPredatorDisc ? oPredatorType?.disciplineAdd?.dots || 0 : 0;

                                        return (
                                            <div key={sDisc} className="bg-gray-800 p-3 rounded-lg border border-gray-700 min-w-0">
                                                <div className="flex flex-wrap justify-between items-center gap-3 mb-2">
                                                    <div className="flex flex-col">
                                                        <h4 className="font-bold text-gray-200 break-words">{oDetails?.name || sDisc}</h4>
                                                        <div className="flex gap-1">
                                                            {!aBaseDiscs.includes(sDisc) && (
                                                                <span className="text-[9px] uppercase text-gray-500 font-bold">{fnT('common.unknown')}</span>
                                                            )}
                                                            {bIsPredatorDisc && (
                                                                <span className="text-[9px] uppercase text-purple-500 font-bold">{fnT('characterSheet.predatorType')}</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-shrink-0 space-x-1">
                                                        {[1, 2, 3, 4, 5].map(n => {
                                                            const bIsPredatorFilled = n <= nPredatorDots;
                                                            return (
                                                            <button
                                                                key={n}
                                                                disabled={bIsPredatorFilled}
                                                                onClick={() => {
                                                                    const nNewVal = nDots === n ? nPredatorDots : n;

                                                                    // Validation: Can only assign values from the pool
                                                                    const aCreationPool = oCharacter.clan===Clan.ThinBlood?[...(oCharacter.thinMerits?.includes('alchemist')?[1]:[]),...(oCharacter.thinMerits?.includes('affinity')?[1]:[])]:oDisciplineCreationPools[oCharacter.gameType as GameType] || [];
                                                                    const oCurrentDiscs = { ...oCharacter.disciplines, [sDisc]: nNewVal };
                                                                    const oPredatorType = characterPredator(oCharacter,aPredatorTypes);
                                                                    if (oPredatorType?.disciplineAdd) {
                                                                        const d = oPredatorType.disciplineAdd.discipline;
                                                                        if (oCurrentDiscs[d]) oCurrentDiscs[d] -= oPredatorType.disciplineAdd.dots;
                                                                        if (oCurrentDiscs[d] === 0) delete oCurrentDiscs[d];
                                                                    }

                                                                    const aAssigned = Object.values(oCurrentDiscs).filter(v => (v as number) > 0);
                                                                    const aSortedPool = [...aCreationPool].sort((a, b) => b - a);

                                                                    const oUsage = aSortedPool.reduce((acc, val) => {
                                                                        acc[val] = (acc[val] || 0) + 1;
                                                                        return acc;
                                                                    }, {} as Record<number, number>);

                                                                    const oUsed = aAssigned.reduce((acc, val) => {
                                                                        const nVal = val as number;
                                                                        acc[nVal] = (acc[nVal] || 0) + 1;
                                                                        return acc;
                                                                    }, {} as Record<number, number>);

                                                                    // Total creation dots available
                                                                    const nTotalCreationDots = aCreationPool.reduce((acc, v) => acc + v, 0);

                                                                    // Check total creation dots spent including this change
                                                                    const oNewDiscs = { ...oCharacter.disciplines, [sDisc]: nNewVal };
                                                                    if (oPredatorType?.disciplineAdd) {
                                                                        const d = oPredatorType.disciplineAdd.discipline;
                                                                        if (oNewDiscs[d]) oNewDiscs[d] -= oPredatorType.disciplineAdd.dots;
                                                                        if (oNewDiscs[d] === 0) delete oNewDiscs[d];
                                                                    }

                                                                    const nNewCreationSpent = Object.values(oNewDiscs).reduce((acc, v) => (acc as number) + (v as number || 0), 0);

                                                                    if ((nNewCreationSpent as number) <= (nTotalCreationDots as number) || nNewVal <= nPredatorDots) {
                                                                        fnUpdateCharacter('disciplines', { ...oCharacter.disciplines, [sDisc]: nNewVal });
                                                                    }
                                                                }}
                                                                className={`w-4 h-4 rounded-full border border-gray-500 transition-all duration-200 ${nDots >= n ? (bIsPredatorFilled ? 'bg-purple-600 border-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.4)]' : bIsWerewolf ? 'bg-green-600 border-green-400 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : 'bg-red-600 border-red-400 shadow-[0_0_8px_rgba(220,38,38,0.4)]') : 'bg-gray-900 hover:border-gray-300'}`}
                                                            />
                                                        )})}
                                                    </div>
                                                </div>
                                                {nDots > 0 && oDetails && (
                                                    <DisciplinePowerSelector
                                                        disciplineKey={sDisc}
                                                        dots={nDots}
                                                        selectedPowerIds={oCharacter.disciplinePowers[sDisc] || []}
                                                        onSelectPowers={(ids) => fnUpdateCharacter('disciplinePowers', { ...oCharacter.disciplinePowers, [sDisc]: ids })}
                                                        disciplineDetails={oDetails}
                                                        allDisciplines={oCharacter.disciplines}
                                                    />
                                                )}
                                                {!aBaseDiscs.includes(sDisc) && nDots === 0 && (
                                                    <button
                                                        className="text-[10px] text-red-900 hover:text-red-500 uppercase font-bold mt-2 transition-colors"
                                                        onClick={() => {
                                                            const oNewDiscs = { ...oCharacter.disciplines };
                                                            delete oNewDiscs[sDisc];
                                                            fnUpdateCharacter('disciplines', oNewDiscs);
                                                        }}
                                                    >
                                                        {fnT('buttons.delete')}
                                                    </button>
                                                )}
                                            </div>
                                        );
                                    });
                                })()}
                            </div>

                            <div className="mt-6"><CatalogPicker label="Disciplinas disponíveis" selected={[]} onToggle={id=>fnUpdateCharacter('disciplines',{...oCharacter.disciplines,[id]:0})} options={VAMPIRE_DISCIPLINES.filter(id=>!(id in oCharacter.disciplines)).map(id=>({id,name:oDisciplineDetails[id]?.name||id,summary:oDisciplineDetails[id]?.description,unavailable:id==='thinbloodalchemy'?(oCharacter.clan!==Clan.ThinBlood||!oCharacter.thinMerits?.includes('alchemist')?'Exige Alquimista de Sangue-Fraco.':undefined):oCharacter.clan===Clan.ThinBlood&&!oCharacter.thinMerits?.includes('affinity')?'Exige Afinidade com Disciplina.':undefined}))}/></div>
                        </GothicFrame>

                        </>):null}
                        {sStepId==='predator'&&<div className="space-y-5">
                        <p className="text-sm text-gray-300">Como você se alimenta? O predador concede benefícios adicionais e pode alterar suas Disciplinas.</p>
                        <CatalogPicker label="Tipo de predador" selected={oCharacter.predatorType?[oCharacter.predatorType]:[]} onToggle={id=>fnHandlePredatorTypeChange(id===oCharacter.predatorType?'':id)} options={aPredatorTypes.map(pt=>({id:pt.id,name:pt.name.replace('[Comunitário / opcional] ',''),summary:pt.description.split('. ')[0],unavailable:oCharacter.clan===Clan.Ventrue&&['farmer','bagger'].includes(pt.id)?'Incompatível com Ventrue.':pt.id==='farmer'&&oCharacter.bloodPotency>=3?'Exige Potência de Sangue menor que 3.':undefined,details:<><p>{pt.description}</p><p>{pt.source}</p><h4 className="mt-3">Concedido pelo predador</h4>{pt.disciplineAdd&&<p>{oDisciplineDetails[pt.disciplineAdd.discipline]?.name} +{pt.disciplineAdd.dots}</p>}<p>Humanidade: {pt.humanityModifier>0?'+':''}{pt.humanityModifier}</p>{[...pt.advantages,...pt.flaws].map(a=><p key={a.id}>{a.name} · {a.cost} pontos</p>)}</>}))}/>
                        {characterPredator(oCharacter,aPredatorTypes)&&<PredatorCustomization character={oCharacter} predator={characterPredator(oCharacter,aPredatorTypes)!} onChange={patch=>fnHandlePredatorTypeChange(oCharacter.predatorType,patch)} disciplineName={key=>oDisciplineDetails[key]?.name||key}/>}
                        {(()=>{const p=characterPredator(oCharacter,aPredatorTypes);const choices=p?.specialtyOptions||[];return choices.length>0&&<CatalogPicker label="Especialidade do predador" selected={choices.filter(o=>oCharacter.specialties.some(s=>s.skill===o.skill&&s.name===o.name)).map(o=>o.skill+':'+o.name)} options={choices.map(o=>({id:o.skill+':'+o.name,name:`${fnT('skills.list.'+o.skill)}: ${o.name}`,summary:'Benefício adicional do predador.'}))} onToggle={id=>{const choice=choices.find(o=>o.skill+':'+o.name===id);const other=oCharacter.specialties.filter(s=>!choices.some(o=>o.name===s.name&&o.skill===s.skill));if(choice)fnUpdateCharacter('specialties',oCharacter.specialties.some(s=>s.skill===choice.skill&&s.name===choice.name)?other:[...other,choice]);}}/>;})()}
                        </div>}
                    </div>
                );
            case 'sheet':
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

    if(view==='home')return <div className="min-h-screen clean-creation" style={gothicBackgroundStyle}>
        <StartScreen draft={draftSummary} onStart={(mode,game,role,scale)=>{
            const identity=fnGenerateIdentity(sLocale,game);
            if(mode==='npc'){
                const c=asNarrativeNpc(fnCreateRandomCharacter(sLocale,scale as any,fnT,game),scale,role);
                fnSetCharacter(c);fnSetStep(REVIEW_STEP);
            }else{fnSetCharacter({...oInitialCharacter,gameType:game,profile:'player',name:identity.name,concept:identity.concept});fnSetStep(1);setPanels({nature:'tribe',capacities:'attributes',powers:'predator',resources:'advantages'});}
            setView('creator');
        }} onContinue={()=>{try{const raw=localStorage.getItem('whitewolf_draft_v2');if(!raw)return;const c=parseCharacter(JSON.parse(raw));fnSetCharacter(c);let step=1;try{const meta=JSON.parse(localStorage.getItem('whitewolf_flow_v1')||'{}');if(Number.isInteger(meta.step)&&meta.step>=1&&meta.step<=REVIEW_STEP)step=meta.step;if(meta.panels&&typeof meta.panels==='object')setPanels(prev=>Object.fromEntries(Object.entries(prev).map(([key,value])=>[key,typeof meta.panels[key]==='string'?meta.panels[key]:value])) as typeof prev);}catch{}fnSetStep(step);setView('creator');}catch(err){fnShowNotification(err instanceof Error?err.message:'Não foi possível abrir o rascunho.','error');}}} onLibrary={()=>{fnSetStorageMode('load');fnSetShowStorage(true);}} onImport={fnImportJSON}/>
        {bShowStorage&&<StorageModal mode={sStorageMode} onClose={()=>fnSetShowStorage(false)} currentName={oCharacter.name} onSave={fnSaveCharacter} onLoad={fnLoadCharacter} onDelete={fnDeleteCharacter}/>}
        {oNotification&&<Notification message={oNotification.message} type={oNotification.type} onClose={()=>fnSetNotification(null)}/>}
    </div>;

    return (
        <div className="min-h-screen clean-creation w-full overflow-x-hidden text-white font-sans selection:bg-red-900 selection:text-white flex flex-col" style={gothicBackgroundStyle}>
            <header className="bg-black border-b-2 border-red-900 p-3 sm:p-4 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-3 min-w-0">
                    <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3 cursor-pointer" onClick={() => setView('home')}>
                         <div className="text-red-600"><RoseIcon className="w-10 h-10" /></div>
                        <div>
                            <h1 className="text-lg sm:text-2xl font-cinzel font-bold text-red-600 tracking-widest [text-wrap:balance] break-words whitespace-normal leading-tight"><span className="hidden sm:inline">{fnT('app.title')}</span><span className="sm:hidden">Whitewolf</span></h1>
                            <p className="text-xs text-gray-500 hidden md:block break-words whitespace-normal">{fnT('app.subtitle')}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                        <button type="button" aria-label="Salvar rascunho" className="border border-gray-600 rounded px-3 py-2" onClick={()=>{fnSetStorageMode('save');fnSetShowStorage(true);}}><span className="hidden sm:inline">Salvar rascunho</span><span className="sm:hidden">Salvar</span></button>
                        <details className="relative"><summary className="cursor-pointer border border-gray-600 rounded px-3 py-2">Mais ações</summary><div className="absolute right-0 top-full mt-2 z-50 w-56 p-3 rounded border border-gray-600 bg-gray-950 grid gap-3">
                            <button type="button" onClick={fnExportJSON}>Exportar JSON</button>
                            <label className="cursor-pointer">Importar JSON<input type="file" accept=".json" className="sr-only" onChange={fnImportJSON}/></label>
                            <button type="button" onClick={()=>{fnSetStorageMode('load');fnSetShowStorage(true);}}>Meus personagens</button>
                            <button type="button" onClick={fnResetCharacter}>Reiniciar personagem</button>
                            <button type="button" onClick={()=>fnSetLocale(sLocale==='en'?'pt':'en')}>{sLocale==='en'?'EN':'PT'}</button>
                        </div></details>
                    </div>
                </div>
            </header>
            <main className="flex-grow p-3 sm:p-4 md:p-8 pb-36 sm:pb-36 md:pb-36 max-w-6xl mx-auto w-full min-w-0 overflow-x-hidden">
                <StepIndicator
                    completedSteps={aSteps.map((_,i)=>i+1).filter(step=>step<REVIEW_STEP&&allIssues.every(issue=>issueDestination(issue,oCharacter).step!==step))}
                    currentStep={nStep}
                    totalSteps={aSteps.length}
                    steps={aSteps}
                    isWerewolf={oCharacter.gameType === GameType.Werewolf}
                    onStepClick={fnSetStep}
                />
                <div className="mb-5 mt-4 flex flex-wrap justify-between gap-2 text-sm text-gray-400"><p>Etapa {nStep} de {aSteps.length} · {aSteps[nStep-1]?.label}</p><p role="status">{saveStatus}</p></div>
                {nStep===REVIEW_STEP&&<section aria-label="Revisão da criação" className="mb-6 rounded-xl border border-gray-600 p-5 bg-gray-900">
                    <h2 className="text-xl">{allIssues.length?`Faltam ${allIssues.length} escolhas`:oCharacter.profile==='npc'?'NPC pronto para revisão do Narrador':'Escolhas de criação preenchidas'}</h2>
                    <p className="mt-2 text-sm text-gray-300">{oCharacter.profile==='npc'?'Confira a coerência da ficha com a sua história.':'Confira os detalhes e as regras antes de concluir. Você pode salvar um rascunho a qualquer momento.'}</p>
                    <ul className="mt-4 space-y-3">{allIssues.map(issue=><li key={issue} className="flex justify-between gap-3 text-sm"><span>{displayIssue(issue)}</span><button type="button" className="underline shrink-0" onClick={()=>goToIssue(issue)}>Resolver</button></li>)}</ul>
                    <button type="button" disabled={allIssues.length>0} className="mt-4 rounded bg-emerald-800 px-4 py-3 disabled:opacity-40" onClick={()=>{setCompletionRequested(true);fnSetStorageMode('save');fnSetShowStorage(true);}}>{completed?'Criação concluída':'Concluir criação'}</button>
                    {completed&&<p role="status" className="mt-2 text-emerald-200">Personagem salvo neste navegador. Exporte JSON para guardar uma cópia.</p>}
                </section>}
                <div className="mt-1 min-w-0">{renderStepContent()}</div>
                {aValidationIssues.length>0&&nStep<REVIEW_STEP&&<details className="mt-6 border border-gray-700 rounded-lg p-4 text-sm"><summary>{aValidationIssues.length} pendências nesta etapa · você pode continuar</summary><ul className="mt-3 space-y-2">{aValidationIssues.map(issue=><li key={issue}>{displayIssue(issue)}</li>)}</ul></details>}
            </main>
            <footer className="bg-black border-t border-gray-800 p-3 sm:p-6 fixed bottom-0 inset-x-0 z-40">
                <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-3">
                    <Button onClick={() => fnSetStep(prev => Math.max(1, prev - 1))} disabled={nStep === 1} variant="secondary">{fnT('buttons.back')}</Button>
                    {nStep < aSteps.length ? (
                        <div className="flex flex-wrap justify-end gap-2 sm:gap-4">
                            <Button variant="secondary" disabled={!oCharacter.gameType} onClick={() => fnSetStep(aSteps.length)}>Revisar pendências</Button>
                            <Button
                                onClick={() => fnSetStep(prev => Math.min(aSteps.length, prev + 1))}

                            >
                                Continuar
                            </Button>
                        </div>
                    ) : (
                        <Button variant="secondary" onClick={() => window.print()}>{fnT('buttons.print')}</Button>
                    )}
                </div>
            </footer>
            {bShowStorage && (
                <StorageModal mode={sStorageMode} onClose={() => {fnSetShowStorage(false);setCompletionRequested(false);}} currentName={oCharacter.name} onSave={fnSaveCharacter} onLoad={fnLoadCharacter} onDelete={fnDeleteCharacter}/>
            )}
            {oNotification && (
                <Notification message={oNotification.message} type={oNotification.type} onClose={() => fnSetNotification(null)} />
            )}
            {oActiveDetail && (
                <InfoModal title={oActiveDetail.title} onClose={() => fnSetActiveDetail(null)}>
                    {oActiveDetail.content}
                </InfoModal>
            )}
        </div>
    );
};

export default App;
