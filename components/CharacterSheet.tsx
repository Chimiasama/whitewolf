
import React, { useState } from 'react';
import type { Character, DisciplineDetail, AdvantageFlaw, Specialty, DisciplineCombo } from '../types';
import { Attribute, Skill, GameType } from '../types';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { fnGenerateBackstory, fnGeneratePlotHook, fnGeneratePortraitDescription } from '../services/geminiService';
import { fnGetClanDetails, fnGetDisciplineDetails, fnGetTribeDetails, fnGetAuspiceDetails, fnGetLoresheets } from '../constants';
import { useI18n } from '../lib/i18n';
import { InfoIcon } from './InfoIcon';
import { InfoModal } from './InfoModal';


interface CharacterSheetProps {
  character: Character;
  onUpdateHunger?: (hunger: number) => void;
  onUpdateHumanity?: (humanity: number) => void;
  onUpdateWillpower?: (willpower: number) => void;
  onUpdateHealth?: (health: number) => void;
  onUpdateRage?: (rage: number) => void;
  onUpdateHarano?: (harano: number) => void;
  onUpdateHauglosk?: (hauglosk: number) => void;
  onBack?: () => void;
  onSave?: () => void;
}

const ChevronLeft: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
);

const SaveIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
    </svg>
);

type GenerationType = 'backstory' | 'plotHook' | 'portrait';

// Fix: Adding React.FC type to BloodIcon to avoid key prop error in maps
const BloodIcon: React.FC<{ className?: string, filled?: boolean }> = ({ className = "w-3 h-3 text-red-500 mr-1", filled = true }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill={filled ? "currentColor" : "none"} 
        stroke="currentColor" 
        strokeWidth={filled ? "0" : "2"}
        className={className}
    >
        <path d="M12 21.35s-7-4.35-7-9.35c0-3.87 3.13-7 7-7s7 3.13 7 7c0 5-7 9.35-7 9.35z" />
        {filled && <path d="M12 21.35c.07.04.028.016.76.76s.723 0 .723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" opacity="0.3" />}
    </svg>
);

const ClawIcon: React.FC<{ className?: string, filled?: boolean }> = ({ className = "w-3 h-3 text-green-500 mr-1", filled = true }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={filled ? "0" : "2"} className={className}>
        <path d="M12,2C12,2 10,6 10,10C10,14 12,18 12,18C12,18 14,14 14,10C14,6 12,2 12,2M17,4C17,4 15,8 15,12C15,16 17,20 17,20C17,20 19,16 19,12C19,8 17,4 17,4M7,4C7,4 5,8 5,12C5,16 7,20 7,20C7,20 9,16 9,12C9,8 7,4 7,4Z" />
    </svg>
);

const WolfCubIcon: React.FC<{ className?: string }> = ({ className = "w-3 h-3 text-green-500 mr-1" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12,2C10.89,2 10,2.89 10,4C10,5.11 10.89,6 12,6C13.11,6 14,5.11 14,4C14,2.89 13.11,2 12,2M12,8C9.79,8 8,9.79 8,12C8,14.21 9.79,16 12,16C14.21,16 16,14.21 16,12C16,9.79 14.21,8 12,8M12,18C10.34,18 9,19.34 9,21H15C15,19.34 13.66,18 12,18Z" />
    </svg>
);

const AttributeGroup: React.FC<{title: string, attributes: Attribute[], values: Record<Attribute, number>, colorClass?: string, isWerewolf?: boolean}> = ({title: sTitle, attributes: aAttributes, values: oValues, colorClass = "bg-red-500", isWerewolf = false}) => {
    const { t: fnT } = useI18n();
    return (
        <div>
            <h3 className={`font-bold text-lg mb-2 border-b border-gray-700 pb-1 ${colorClass.replace('bg-', 'text-')}`}>{sTitle}</h3>
            <ul>
                {aAttributes.map(sAttr => (
                    <li key={sAttr} className="flex justify-between items-center mb-1">
                        <span>{fnT(`attributes.list.${sAttr}`)}</span>
                        <div className="flex items-center">
                            {[...Array(5)].map((_, nI) => (
                                isWerewolf ? (
                                    <ClawIcon key={nI} className={`w-3 h-3 ml-1 ${oValues[sAttr] > nI ? 'text-green-500' : 'text-gray-800'}`} filled={oValues[sAttr] > nI} />
                                ) : (
                                    <div key={nI} className={`w-3 h-3 rounded-full border border-gray-500 ml-1 ${oValues[sAttr] > nI ? colorClass : 'bg-gray-700'}`}></div>
                                )
                            ))}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const WerewolfTracks: React.FC<{ 
    harano: number; 
    hauglosk: number; 
    fnT: any;
    onUpdateHarano?: (val: number) => void;
    onUpdateHauglosk?: (val: number) => void;
}> = ({ harano, hauglosk, fnT, onUpdateHarano, onUpdateHauglosk }) => {
    return (
        <div className="grid grid-cols-2 gap-4 mt-4 p-4 bg-black/30 rounded border border-gray-700">
            <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 mb-2">
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">{fnT('characterSheet.harano')}</span>
                </div>
                <div className="flex">
                    {[...Array(5)].map((_, i) => (
                        <div 
                            key={i} 
                            onClick={() => onUpdateHarano?.(harano === i + 1 ? i : i + 1)}
                            className={`w-5 h-5 border-2 border-blue-900 mx-1 flex items-center justify-center cursor-pointer transition-colors hover:border-blue-500 ${harano > i ? 'bg-blue-600' : 'bg-transparent'}`}
                        >
                            {harano > i && <div className="w-2 h-2 bg-white rounded-full"></div>}
                        </div>
                    ))}
                </div>
                <p className="text-[10px] text-gray-500 mt-1 italic">{fnT('characterSheet.haranoDesc')}</p>
            </div>
            <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 mb-2">
                    <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">{fnT('characterSheet.hauglosk')}</span>
                </div>
                <div className="flex">
                    {[...Array(5)].map((_, i) => (
                        <div 
                            key={i} 
                            onClick={() => onUpdateHauglosk?.(hauglosk === i + 1 ? i : i + 1)}
                            className={`w-5 h-5 border-2 border-orange-900 mx-1 flex items-center justify-center cursor-pointer transition-colors hover:border-orange-500 ${hauglosk > i ? 'bg-orange-600' : 'bg-transparent'}`}
                        >
                            {hauglosk > i && <div className="w-2 h-2 bg-white rounded-full"></div>}
                        </div>
                    ))}
                </div>
                <p className="text-[10px] text-gray-500 mt-1 italic">{fnT('characterSheet.haugloskDesc')}</p>
            </div>
        </div>
    );
};

const SkillGroup: React.FC<{title: string, skills: Skill[], values: Record<Skill, number>, specialties: Specialty[], colorClass?: string, isWerewolf?: boolean}> = ({title: sTitle, skills: aSkills, values: oValues, specialties: aSpecialties, colorClass = "bg-red-500", isWerewolf = false}) => {
    const { t: fnT } = useI18n();
    return (
        <div>
            <h3 className={`font-bold text-lg mb-2 border-b border-gray-700 pb-1 ${colorClass.replace('bg-', 'text-')}`}>{sTitle}</h3>
            <ul>
                {aSkills.map(sSkill => {
                    const sSkillSpecialties = aSpecialties.filter(s => s.skill === sSkill).map(s => s.name).join(', ');
                    if (oValues[sSkill] > 0) {
                        return (
                            <li key={sSkill} className="flex justify-between items-center mb-1">
                                <span>{fnT(`skills.list.${sSkill}`)} {sSkillSpecialties && <span className="text-xs text-gray-400">({sSkillSpecialties})</span>}</span>
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, nI) => (
                                        isWerewolf ? (
                                            <ClawIcon key={nI} className={`w-3 h-3 ml-1 ${oValues[sSkill] > nI ? 'text-green-500' : 'text-gray-800'}`} filled={oValues[sSkill] > nI} />
                                        ) : (
                                            <div key={nI} className={`w-3 h-3 rounded-full border border-gray-500 ml-1 ${oValues[sSkill] > nI ? colorClass : 'bg-gray-700'}`}></div>
                                        )
                                    ))}
                                </div>
                            </li>
                        );
                    }
                    return null;
                })}
            </ul>
        </div>
    );
};

const AdvantageFlawList: React.FC<{ title: string, items: AdvantageFlaw[], colorClass?: string, isWerewolf?: boolean }> = ({ title: sTitle, items: aItems, colorClass = "text-red-500", isWerewolf = false }) => {
    const { t: fnT } = useI18n();
    return (
        <Card className="text-left" variant={isWerewolf ? 'werewolf' : 'vampire'}>
            <h3 className={`${colorClass} font-bold text-lg mb-2 border-b border-gray-700 pb-1`}>{sTitle}</h3>
            {aItems.length > 0 ? (
                <ul>
                    {aItems.map((oItem, nIdx) => (
                        <li key={`${oItem.name}-${nIdx}`} className="mb-2">
                            <div className="flex justify-between items-center">
                                <p className="font-bold text-gray-200">{oItem.name}</p>
                                <div className="flex items-center">
                                     {[...Array(5)].map((_, nI) => (
                                        isWerewolf ? (
                                            <ClawIcon key={nI} className={`w-2.5 h-2.5 ml-1 ${oItem.cost > nI ? 'text-green-500' : 'text-gray-800'}`} filled={oItem.cost > nI} />
                                        ) : (
                                            <div 
                                                key={nI} 
                                                className={`w-2 h-2 rounded-full border border-gray-600 ml-1 ${oItem.cost > nI ? colorClass.replace('text-', 'bg-') : 'bg-transparent opacity-20'}`}
                                            ></div>
                                        )
                                    ))}
                                </div>
                            </div>
                            <p className="text-sm text-gray-400">{oItem.description}</p>
                        </li>
                    ))}
                </ul>
            ) : <p className="text-gray-400 italic">{fnT('common.noneListed')}</p>}
        </Card>
    );
}

const GeminiResult: React.FC<{title: string, content: string, colorClass?: string, isWerewolf?: boolean}> = ({title: sTitle, content: sContent, colorClass = "text-red-400", isWerewolf = false}) => (
    <Card className="mt-6 text-left" variant={isWerewolf ? 'werewolf' : 'vampire'}>
        <h3 className={`text-xl font-bold mb-3 ${colorClass}`}>{sTitle}</h3>
        <p className="text-gray-300 whitespace-pre-wrap">{sContent}</p>
    </Card>
);

const VitalsPool: React.FC<{ 
    label: string, 
    value: number, 
    max: number, 
    colorClass: string, 
    onUpdate?: (val: number) => void,
    icon?: React.ReactNode,
    labelColorClass?: string
}> = ({ label, value, max, colorClass, onUpdate, icon, labelColorClass = "text-red-400" }) => {
    return (
        <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
                <strong className={`${labelColorClass} uppercase tracking-wider text-sm`}>{label}</strong>
                <span className="text-gray-400 text-xs font-mono">{value} / {max}</span>
            </div>
            <div className={`flex items-center justify-between bg-black/40 p-3 rounded-lg border border-gray-800/50 ${onUpdate ? 'hover:border-gray-700 transition-colors' : ''}`}>
                {onUpdate && (
                    <button 
                        onClick={() => onUpdate(Math.max(0, value - 1))}
                        className="w-8 h-8 flex items-center justify-center rounded bg-gray-800 hover:bg-gray-700 text-gray-400 transition-colors"
                        disabled={value <= 0}
                    >
                        -
                    </button>
                )}
                <div className="flex flex-wrap gap-1.5 mx-3 justify-center">
                    {[...Array(max)].map((_, nI) => (
                        <button
                            key={nI}
                            disabled={!onUpdate}
                            onClick={() => onUpdate && onUpdate(nI + 1)}
                            className={`
                                w-3 h-6 rounded-sm border transition-all duration-200
                                ${value > nI ? `${colorClass} border-transparent shadow-[0_0_8px_rgba(0,0,0,0.5)]` : 'bg-gray-900 border-gray-700 opacity-30'}
                                ${onUpdate ? 'hover:scale-110 cursor-pointer' : 'cursor-default'}
                            `}
                        />
                    ))}
                </div>
                {onUpdate && (
                    <button 
                        onClick={() => onUpdate(Math.min(max, value + 1))}
                        className="w-8 h-8 flex items-center justify-center rounded bg-gray-800 hover:bg-gray-700 text-gray-400 transition-colors"
                        disabled={value >= max}
                    >
                        +
                    </button>
                )}
            </div>
        </div>
    );
};

export const CharacterSheet: React.FC<CharacterSheetProps> = ({ 
    character: oCharacter, 
    onUpdateHunger: fnOnUpdateHunger, 
    onUpdateHumanity: fnOnUpdateHumanity,
    onUpdateWillpower: fnOnUpdateWillpower,
    onUpdateHealth: fnOnUpdateHealth,
    onUpdateRage: fnOnUpdateRage,
    onUpdateHarano: fnOnUpdateHarano,
    onUpdateHauglosk: fnOnUpdateHauglosk,
    onBack,
    onSave
}) => {
    const { t: fnT, locale: sLocale } = useI18n();
    const [sGeneratedContent, fnSetGeneratedContent] = useState<string | null>(null);
    const [sGenerationTitle, fnSetGenerationTitle] = useState<string>('');
    const [bIsLoading, fnSetIsLoading] = useState(false);
    const [oSelectedDiscipline, fnSetSelectedDiscipline] = useState<DisciplineDetail | null>(null);

    const bIsWerewolf = oCharacter.gameType === GameType.Werewolf;
    const sThemeColorClass = bIsWerewolf ? 'text-green-500' : 'text-red-500';
    const sThemeBgClass = bIsWerewolf ? 'bg-green-600' : 'bg-red-500';
    const sThemeAccentClass = bIsWerewolf ? 'text-green-400' : 'text-red-400';

    const oClanDetails = fnGetClanDetails(fnT);
    const oDisciplineDetails = fnGetDisciplineDetails(fnT);
    const oTribeDetails = fnGetTribeDetails(fnT);
    const oAuspiceDetails = fnGetAuspiceDetails(fnT);
    
    const fnHandleGenerate = async (sType: GenerationType) => {
        fnSetIsLoading(true);
        fnSetGeneratedContent(null);
        let sContent = '';
        let sTitle = '';
        try {
            switch (sType) {
                case 'backstory':
                    sTitle = fnT('characterSheet.gemini.backstoryTitle');
                    sContent = await fnGenerateBackstory(oCharacter, fnT, sLocale);
                    break;
                case 'plotHook':
                    sTitle = fnT('characterSheet.gemini.plotHookTitle');
                    sContent = await fnGeneratePlotHook(oCharacter, fnT, sLocale);
                    break;
                case 'portrait':
                    sTitle = fnT('characterSheet.gemini.portraitTitle');
                    sContent = await fnGeneratePortraitDescription(oCharacter, fnT, sLocale);
                    break;
            }
        } catch (e) {
            sContent = fnT('gemini.errorGeneric');
        } finally {
            fnSetGeneratedContent(sContent);
            fnSetGenerationTitle(sTitle);
            fnSetIsLoading(false);
        }
    };
    
    const aPhysicalAttrs = [Attribute.Strength, Attribute.Dexterity, Attribute.Stamina];
    const aSocialAttrs = [Attribute.Charisma, Attribute.Manipulation, Attribute.Composure];
    const aMentalAttrs = [Attribute.Intelligence, Attribute.Wits, Attribute.Resolve];
    const aPhysicalSkills = [Skill.Athletics, Skill.Brawl, Skill.Craft, Skill.Drive, Skill.Firearms, Skill.Larceny, Skill.Melee, Skill.Stealth, Skill.Survival];
    const aSocialSkills = [Skill.AnimalKen, Skill.Etiquette, Skill.Insight, Skill.Intimidation, Skill.Leadership, Skill.Performance, Skill.Persuasion, Skill.Streetwise, Skill.Subterfuge];
    const aMentalSkills = [Skill.Academics, Skill.Awareness, Skill.Finance, Skill.Investigation, Skill.Medicine, Skill.Occult, Skill.Politics, Skill.Science, Skill.Technology];
    
    const oClanDetail = oCharacter.clan ? oClanDetails[oCharacter.clan] : null;
    const oTribeDetail = oCharacter.tribe ? oTribeDetails[oCharacter.tribe] : null;
    const oAuspiceDetail = oCharacter.auspice ? oAuspiceDetails[oCharacter.auspice] : null;

    const aLoresheets = fnGetLoresheets(fnT);
    const aResolvedLoresheets = (oCharacter.loresheets || []).map(ls => {
        const oDef = aLoresheets.find(d => d.id === ls.id);
        if (!oDef) return null;
        return {
            ...oDef,
            levels: oDef.levels.filter(lvl => lvl.level <= ls.level)
        };
    }).filter(ls => ls !== null);

    const nComposure = oCharacter.attributes[Attribute.Composure] || 0;
    const nResolve = oCharacter.attributes[Attribute.Resolve] || 0;
    const nStamina = oCharacter.attributes[Attribute.Stamina] || 0;
    const nWillpower = nComposure + nResolve;
    const nHealth = nStamina + 3;

    return (
    <div className="space-y-8">
      <div className="flex justify-between items-center bg-black/40 p-4 rounded-xl border border-gray-800 shadow-lg backdrop-blur-sm">
          <Button onClick={onBack} variant="secondary" className="flex items-center gap-2">
              <ChevronLeft className="w-4 h-4" /> {fnT('buttons.back')}
          </Button>
          <div className="flex items-center gap-4">
              <h2 className={`text-2xl font-cinzel font-bold ${sThemeColorClass} tracking-widest hidden md:block`}>
                  {bIsWerewolf ? fnT('app.werewolf') : fnT('app.vampire')}
              </h2>
              <Button onClick={onSave} className={`flex items-center gap-2 ${bIsWerewolf ? 'bg-emerald-900/40 hover:bg-emerald-600 border-emerald-500/50' : 'bg-red-900/40 hover:bg-red-600 border-red-500/50'}`}>
                  <SaveIcon className="w-4 h-4" /> {fnT('buttons.save')}
              </Button>
          </div>
      </div>

      <Card variant={bIsWerewolf ? 'werewolf' : 'vampire'}>
        <div className="flex flex-col md:flex-row gap-6">
            {oCharacter.portraitUrl && (
                 <div className="flex-shrink-0 mx-auto md:mx-0 w-48 h-48 md:w-56 md:h-56">
                    <img src={oCharacter.portraitUrl} alt={oCharacter.name} className={`w-full h-full object-cover rounded-lg border-2 shadow-lg ${bIsWerewolf ? 'border-green-900' : 'border-gray-700'}`} />
                </div>
            )}
            <div className="flex-grow">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                  <div><strong className={sThemeAccentClass}>{fnT('characterSheet.name')}:</strong> {oCharacter.name}</div>
                  {!bIsWerewolf ? (
                      <>
                        <div><strong className={sThemeAccentClass}>{fnT('characterSheet.clan')}:</strong> {oClanDetail?.name || fnT('common.unknown')}</div>
                        <div><strong className={sThemeAccentClass}>{fnT('characterSheet.sire')}:</strong> {oCharacter.sire}</div>
                      </>
                  ) : (
                      <>
                        <div><strong className={sThemeAccentClass}>{fnT('steps.tribe')}:</strong> {oTribeDetail?.name || fnT('common.unknown')}</div>
                        <div><strong className={sThemeAccentClass}>{fnT('steps.auspice')}:</strong> {oAuspiceDetail?.name || fnT('common.unknown')}</div>
                      </>
                  )}
                  <div className="md:col-span-3"><strong className={sThemeAccentClass}>{fnT('characterSheet.concept')}:</strong> {oCharacter.concept}</div>
                  <div className="md:col-span-3"><strong className={sThemeAccentClass}>{fnT('characterSheet.ambition')}:</strong> {oCharacter.ambition}</div>
                  <div className="md:col-span-3"><strong className={sThemeAccentClass}>{fnT('characterSheet.desire')}:</strong> {oCharacter.desire}</div>
                  {!bIsWerewolf ? (
                      <>
                        <div className="md:col-span-3"><strong className={sThemeAccentClass}>{fnT('characterSheet.clanBane')}:</strong> {oClanDetail?.bane || fnT('common.noClanSelected')}</div>
                        <div className="md:col-span-3"><strong className={sThemeAccentClass}>{fnT('characterSheet.clanCompulsion')}:</strong> {oClanDetail?.compulsion || fnT('common.noClanSelected')}</div>
                        <div><strong className={sThemeAccentClass}>{fnT('characterSheet.predatorType')}:</strong> {oCharacter.predatorType ? (fnT(`predatorTypes.${oCharacter.predatorType}.name`) || oCharacter.predatorType) : fnT('common.none')}</div>
                        <div><strong className={sThemeAccentClass}>{fnT('characterSheet.generation')}:</strong> {oCharacter.generation}</div>
                        <div><strong className={sThemeAccentClass}>{fnT('characterSheet.bloodPotency')}:</strong> {oCharacter.bloodPotency}</div>
                      </>
                  ) : (
                      <>
                        <div className="md:col-span-3"><strong className={sThemeAccentClass}>{fnT('characterSheet.tribeBane')}:</strong> {oTribeDetail?.bane || fnT('common.unknown')}</div>
                        <div className="md:col-span-3">
                            <strong className={sThemeAccentClass}>{fnT('characterSheet.renown')}:</strong> 
                            <span className="ml-2 text-gray-300 flex flex-wrap gap-x-2">
                                <span>{fnT('characterSheet.glory')}: {oCharacter.renown?.glory || 0}{oCharacter.renown?.shame?.glory && <span className="text-red-500 text-[10px] ml-0.5 font-bold uppercase">({fnT('characterSheet.vexame')})</span>}</span>
                                <span>•</span>
                                <span>{fnT('characterSheet.honor')}: {oCharacter.renown?.honor || 0}{oCharacter.renown?.shame?.honor && <span className="text-red-500 text-[10px] ml-0.5 font-bold uppercase">({fnT('characterSheet.vexame')})</span>}</span>
                                <span>•</span>
                                <span>{fnT('characterSheet.wisdom')}: {oCharacter.renown?.wisdom || 0}{oCharacter.renown?.shame?.wisdom && <span className="text-red-500 text-[10px] ml-0.5 font-bold uppercase">({fnT('characterSheet.vexame')})</span>}</span>
                            </span>
                        </div>
                        <div><strong className={sThemeAccentClass}>{fnT('characterSheet.harano')}:</strong> {oCharacter.harano || 0}</div>
                        <div><strong className={sThemeAccentClass}>{fnT('characterSheet.hauglosk')}:</strong> {oCharacter.hauglosk || 0}</div>
                        <div className="md:col-span-3">
                            <WerewolfTracks 
                                harano={oCharacter.harano || 0} 
                                hauglosk={oCharacter.hauglosk || 0} 
                                fnT={fnT} 
                                onUpdateHarano={fnOnUpdateHarano}
                                onUpdateHauglosk={fnOnUpdateHauglosk}
                            />
                        </div>
                      </>
                  )}
                </div>
            </div>
        </div>
      </Card>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="text-left" variant={bIsWerewolf ? 'werewolf' : 'vampire'}><AttributeGroup title={fnT('characterSheet.attributes.physical')} attributes={aPhysicalAttrs} values={oCharacter.attributes} colorClass={sThemeBgClass} isWerewolf={bIsWerewolf} /></Card>
          <Card className="text-left" variant={bIsWerewolf ? 'werewolf' : 'vampire'}><AttributeGroup title={fnT('characterSheet.attributes.social')} attributes={aSocialAttrs} values={oCharacter.attributes} colorClass={sThemeBgClass} isWerewolf={bIsWerewolf} /></Card>
          <Card className="text-left" variant={bIsWerewolf ? 'werewolf' : 'vampire'}><AttributeGroup title={fnT('characterSheet.attributes.mental')} attributes={aMentalAttrs} values={oCharacter.attributes} colorClass={sThemeBgClass} isWerewolf={bIsWerewolf} /></Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="text-left" variant={bIsWerewolf ? 'werewolf' : 'vampire'}><SkillGroup title={fnT('characterSheet.skills.physical')} skills={aPhysicalSkills} values={oCharacter.skills} specialties={oCharacter.specialties} colorClass={sThemeBgClass} isWerewolf={bIsWerewolf} /></Card>
          <Card className="text-left" variant={bIsWerewolf ? 'werewolf' : 'vampire'}><SkillGroup title={fnT('characterSheet.skills.social')} skills={aSocialSkills} values={oCharacter.skills} specialties={oCharacter.specialties} colorClass={sThemeBgClass} isWerewolf={bIsWerewolf} /></Card>
          <Card className="text-left" variant={bIsWerewolf ? 'werewolf' : 'vampire'}><SkillGroup title={fnT('characterSheet.skills.mental')} skills={aMentalSkills} values={oCharacter.skills} specialties={oCharacter.specialties} colorClass={sThemeBgClass} isWerewolf={bIsWerewolf} /></Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="text-left" variant={bIsWerewolf ? 'werewolf' : 'vampire'}>
            <h3 className={`${sThemeColorClass} font-bold text-lg mb-2 border-b border-gray-700 pb-1`}>{bIsWerewolf ? fnT('characterSheet.gifts') : fnT('characterSheet.disciplines')}</h3>
            {Object.keys(oCharacter.disciplines).length > 0 ? (
                <ul className="mb-6">
                {Object.entries(oCharacter.disciplines).sort((a,b) => (b[1] as number) - (a[1] as number)).map(([sKey, value]) => {
                    const oDisciplineDetail = oDisciplineDetails[sKey.toLowerCase()];
                    const sDisplayName = oDisciplineDetail ? oDisciplineDetail.name : sKey;
                    const aSelectedPowerIds = oCharacter.disciplinePowers[sKey] || [];
                    return (
                        <li key={sKey} className="mb-3 hover:bg-gray-800/50 rounded px-2 -mx-2 transition-colors py-2">
                            <div className="flex justify-between items-center cursor-pointer" onClick={() => oDisciplineDetail && fnSetSelectedDiscipline(oDisciplineDetail)}>
                                <div className="flex items-center">
                                    <span className={`font-bold text-gray-300 transition-colors ${bIsWerewolf ? 'hover:text-green-400' : 'hover:text-red-400'}`}>{sDisplayName}</span>
                                    {oDisciplineDetail && <InfoIcon onClick={() => fnSetSelectedDiscipline(oDisciplineDetail)} />}
                                </div>
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, nI) => (
                                        bIsWerewolf ? (
                                            <ClawIcon key={nI} className={`w-3.5 h-3.5 ml-1 ${(value as number) > nI ? 'text-green-500' : 'text-gray-800'}`} filled={(value as number) > nI} />
                                        ) : (
                                            <div key={nI} className={`w-3 h-3 rounded-full border border-gray-500 ml-1 ${(value as number) > nI ? sThemeBgClass : 'bg-gray-700'}`}></div>
                                        )
                                    ))}
                                </div>
                            </div>
                            {oDisciplineDetail && aSelectedPowerIds.length > 0 && (
                                <ul className="mt-1 ml-4 list-disc list-inside">
                                    {aSelectedPowerIds.map(sPid => {
                                        const oPower = oDisciplineDetail.powers.find(p => p.id === sPid);
                                        return oPower ? (
                                            <li key={sPid} className="text-xs text-gray-400">
                                                <span className={`${sThemeAccentClass} font-bold`}>{fnT('compendium.lvl')} {oPower.level}:</span> {oPower.name}
                                            </li>
                                        ) : null;
                                    })}
                                </ul>
                            )}
                        </li>
                    );
                })}
                </ul>
            ) : <p className="text-gray-400 italic mb-6">{fnT('common.noneListed')}</p>}

            {!bIsWerewolf && (
                <>
                    <h3 className="text-red-500 font-bold text-lg mb-2 border-b border-gray-700 pb-1">{fnT('characterSheet.combos')}</h3>
                    {oCharacter.disciplineCombos.length > 0 ? (
                        <ul>
                            {oCharacter.disciplineCombos.map(combo => (
                                <li key={combo.id} className="mb-4 p-2 bg-black/20 rounded border-l-2 border-red-900">
                                    <div className="flex justify-between items-start">
                                        <h4 className="font-bold text-gray-200">{combo.name}</h4>
                                        <div className="text-[10px] text-red-400 font-bold">{combo.cost === "Passive" ? fnT('compendium.passive') : (combo.cost === "One Rouse Check" ? fnT('compendium.oneRouseCheck') : combo.cost)}</div>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1">{combo.description}</p>
                                    <div className="mt-2 text-[10px] font-mono text-gray-500 uppercase tracking-tighter">
                                        {combo.requirements.map(r => `${oDisciplineDetails[r.discipline.toLowerCase()]?.name || r.discipline} ${r.level}`).join(' • ')}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : <p className="text-gray-400 italic">{fnT('common.noneListed')}</p>}
                </>
            )}
        </Card>
        <Card className="text-left" variant={bIsWerewolf ? 'werewolf' : 'vampire'}>
            <h3 className={`${sThemeColorClass} font-bold text-lg mb-4 border-b border-gray-700 pb-1`}>{fnT('characterSheet.vitals')}</h3>
            
            <div className="mb-6">
                 <div className="flex justify-between items-center mb-2">
                    <strong className={`${sThemeAccentClass} text-lg uppercase tracking-widest`}>{bIsWerewolf ? fnT('characterSheet.rage') : fnT('characterSheet.hunger')}</strong>
                    <span className="text-gray-400 text-xs font-mono">{bIsWerewolf ? (oCharacter.rage || 0) : oCharacter.hunger} / 5</span>
                 </div>
                 <div className={`flex items-center justify-between bg-black/40 p-2 sm:p-4 rounded-lg border ${bIsWerewolf ? 'border-green-900/30' : 'border-red-900/30'}`}>
                    {(!bIsWerewolf ? fnOnUpdateHunger : fnOnUpdateRage) && (
                        <Button variant="secondary" className={`px-2 sm:px-3 py-1 text-lg font-bold leading-none h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center transition-colors ${bIsWerewolf ? 'hover:bg-green-900/20' : 'hover:bg-red-900/20'}`} onClick={() => bIsWerewolf ? fnOnUpdateRage?.(Math.max(0, (oCharacter.rage || 0) - 1)) : fnOnUpdateHunger?.(Math.max(0, oCharacter.hunger - 1))} disabled={bIsWerewolf ? (oCharacter.rage || 0) <= 0 : oCharacter.hunger <= 0}>-</Button>
                    )}
                    <div className="flex space-x-1 sm:space-x-2 mx-1 sm:mx-4">
                         {[...Array(5)].map((_, nI) => (
                            <button 
                                key={nI} 
                                onClick={() => bIsWerewolf ? fnOnUpdateRage?.(nI + 1) : fnOnUpdateHunger?.(nI + 1)}
                                disabled={bIsWerewolf ? !fnOnUpdateRage : !fnOnUpdateHunger}
                                className={`focus:outline-none transition-transform ${(bIsWerewolf ? fnOnUpdateRage : fnOnUpdateHunger) ? 'active:scale-95 hover:scale-110' : 'cursor-default'}`}
                            >
                                {bIsWerewolf ? (
                                    <ClawIcon 
                                        className={`w-6 h-6 sm:w-8 sm:h-8 transition-colors duration-300 drop-shadow-[0_0_5px_rgba(22,163,74,0.3)] ${(oCharacter.rage || 0) > nI ? 'text-green-600' : 'text-gray-800'}`}
                                        filled={(oCharacter.rage || 0) > nI} 
                                    />
                                ) : (
                                    <BloodIcon 
                                        className={`w-6 h-6 sm:w-8 sm:h-8 transition-colors duration-300 drop-shadow-[0_0_5px_rgba(220,38,38,0.3)] ${oCharacter.hunger > nI ? 'text-red-600' : 'text-gray-800'}`}
                                        filled={oCharacter.hunger > nI} 
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                    {(!bIsWerewolf ? fnOnUpdateHunger : fnOnUpdateRage) && (
                        <Button variant="secondary" className={`px-2 sm:px-3 py-1 text-lg font-bold leading-none h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center transition-colors ${bIsWerewolf ? 'hover:bg-green-900/20' : 'hover:bg-red-900/20'}`} onClick={() => bIsWerewolf ? fnOnUpdateRage?.(Math.min(5, (oCharacter.rage || 0) + 1)) : fnOnUpdateHunger?.(Math.min(5, oCharacter.hunger + 1))} disabled={bIsWerewolf ? (oCharacter.rage || 0) >= 5 : oCharacter.hunger >= 5}>+</Button>
                    )}
                 </div>
            </div>

            <div className="space-y-4">
                {!bIsWerewolf && (
                    <VitalsPool 
                        label={fnT('characterSheet.humanity')}
                        value={oCharacter.humanity}
                        max={10}
                        colorClass="bg-green-600"
                        onUpdate={fnOnUpdateHumanity}
                        labelColorClass="text-green-400"
                    />
                )}
                <VitalsPool 
                    label={fnT('characterSheet.willpower')}
                    value={oCharacter.willpower ?? nWillpower}
                    max={nWillpower}
                    colorClass="bg-blue-600"
                    onUpdate={fnOnUpdateWillpower}
                    labelColorClass="text-blue-400"
                />
                <VitalsPool 
                    label={fnT('characterSheet.health')}
                    value={oCharacter.health ?? nHealth}
                    max={nHealth}
                    colorClass="bg-red-800"
                    onUpdate={fnOnUpdateHealth}
                    labelColorClass="text-red-400"
                />
            </div>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AdvantageFlawList title={fnT('characterSheet.advantages')} items={oCharacter.advantages} colorClass={sThemeColorClass} isWerewolf={bIsWerewolf} />
        <AdvantageFlawList title={fnT('characterSheet.flaws')} items={oCharacter.flaws} colorClass={sThemeColorClass} isWerewolf={bIsWerewolf} />
      </div>
      {bIsWerewolf && (
        <Card className="text-left" variant={bIsWerewolf ? 'werewolf' : 'vampire'}>
            <h3 className={`${sThemeColorClass} font-bold text-lg mb-4 border-b border-gray-700 pb-1`}>{fnT('characterSheet.renown')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="p-3 bg-black/20 rounded border-l-2 border-green-900">
                    <h4 className="font-bold text-green-400 mb-1">{fnT('characterSheet.glory')}</h4>
                    <p className="text-xs text-gray-400 italic">{fnT('characterSheet.gloryCredo')}</p>
                </div>
                <div className="p-3 bg-black/20 rounded border-l-2 border-green-900">
                    <h4 className="font-bold text-green-400 mb-1">{fnT('characterSheet.honor')}</h4>
                    <p className="text-xs text-gray-400 italic">{fnT('characterSheet.honorCredo')}</p>
                </div>
                <div className="p-3 bg-black/20 rounded border-l-2 border-green-900">
                    <h4 className="font-bold text-green-400 mb-1">{fnT('characterSheet.wisdom')}</h4>
                    <p className="text-xs text-gray-400 italic">{fnT('characterSheet.wisdomCredo')}</p>
                </div>
            </div>

            <h3 className={`${sThemeColorClass} font-bold text-lg mb-4 border-b border-gray-700 pb-1`}>{fnT('characterSheet.specialAbilities')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-900/10 rounded border border-blue-900/30 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-bold text-blue-400">{fnT('characterSheet.desperateRage')}</h4>
                        </div>
                        <p className="text-xs text-gray-400 mb-4">{fnT('characterSheet.desperateRageDesc')}</p>
                    </div>
                    <Button 
                        variant="secondary" 
                        size="sm" 
                        className="w-full border-blue-800 hover:bg-blue-900/20"
                        onClick={() => {
                            if (oCharacter.harano < 5) {
                                fnOnUpdateHarano?.(oCharacter.harano + 1);
                                fnOnUpdateRage?.(5);
                            }
                        }}
                        disabled={oCharacter.harano >= 5}
                    >
                        {fnT('buttons.activate')} {fnT('characterSheet.desperateRage')}
                    </Button>
                </div>
                <div className="p-4 bg-orange-900/10 rounded border border-orange-900/30 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-bold text-orange-400">{fnT('characterSheet.unrelentingWillpower')}</h4>
                        </div>
                        <p className="text-xs text-gray-400 mb-4">{fnT('characterSheet.unrelentingWillpowerDesc')}</p>
                    </div>
                    <Button 
                        variant="secondary" 
                        size="sm" 
                        className="w-full border-orange-800 hover:bg-orange-900/20"
                        onClick={() => {
                            if (oCharacter.hauglosk < 5) {
                                fnOnUpdateHauglosk?.(oCharacter.hauglosk + 1);
                                fnOnUpdateWillpower?.(nWillpower);
                            }
                        }}
                        disabled={oCharacter.hauglosk >= 5}
                    >
                        {fnT('buttons.activate')} {fnT('characterSheet.unrelentingWillpower')}
                    </Button>
                </div>
            </div>
        </Card>
      )}
      {bIsWerewolf && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="text-left" variant="werewolf">
                <h3 className={`${sThemeColorClass} font-bold text-lg mb-2 border-b border-gray-700 pb-1`}>{fnT('characterSheet.rituals')}</h3>
                {oCharacter.rituals.length > 0 ? (
                    <div className="space-y-2">
                        {oCharacter.rituals.map((r, i) => (
                            <div key={`${r.name}-${i}`}>
                                <div className="text-gray-200 font-bold text-sm">{r.name}</div>
                                <div className="text-xs text-gray-400">{r.description}</div>
                            </div>
                        ))}
                    </div>
                ) : <p className="text-gray-500 italic text-sm">{fnT('common.none')}</p>}
            </Card>
            <Card className="text-left" variant="werewolf">
                <h3 className={`${sThemeColorClass} font-bold text-lg mb-2 border-b border-gray-700 pb-1`}>{fnT('characterSheet.talismans')}</h3>
                {oCharacter.talismans.length > 0 ? (
                    <div className="space-y-2">
                        {oCharacter.talismans.map((t, i) => (
                            <div key={`${t.name}-${i}`}>
                                <div className="text-gray-200 font-bold text-sm">{t.name}</div>
                                <div className="text-xs text-gray-400">{t.description}</div>
                            </div>
                        ))}
                    </div>
                ) : <p className="text-gray-500 italic text-sm">{fnT('common.none')}</p>}
            </Card>
        </div>
      )}
      {aResolvedLoresheets.length > 0 && (
        <Card className="text-left" variant={bIsWerewolf ? 'werewolf' : 'vampire'}>
            <h3 className={`${sThemeColorClass} font-bold text-lg mb-4 border-b border-gray-700 pb-1`}>{fnT('loresheets.title')}</h3>
            <div className="grid grid-cols-1 gap-6">
                {aResolvedLoresheets.map((ls, idx) => (
                    <div key={`${ls?.id}-${idx}`} className="bg-black/20 p-4 rounded border border-gray-800">
                        <h4 className={`font-bold ${sThemeAccentClass} text-lg mb-1`}>{ls?.name}</h4>
                        <p className="text-sm text-gray-400 mb-4 italic">{ls?.description}</p>
                        <div className="space-y-4">
                            {ls?.levels.map((lvl) => (
                                <div key={lvl.level} className={`pl-4 border-l-2 ${bIsWerewolf ? 'border-green-900' : 'border-red-900'}`}>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`${bIsWerewolf ? 'bg-green-900 text-green-100' : 'bg-red-900 text-red-100'} text-[10px] px-1.5 py-0.5 rounded font-bold uppercase`}>{fnT('compendium.lvl')} {lvl.level}</span>
                                        <span className="font-bold text-gray-200">{lvl.name}</span>
                                    </div>
                                    <p className="text-xs text-gray-400 mb-1">{lvl.description}</p>
                                    <p className={`text-xs ${sThemeAccentClass} opacity-80 font-mono`}>{lvl.system}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </Card>
      )}
      <Card className="text-left" variant={bIsWerewolf ? 'werewolf' : 'vampire'}>
        <h3 className={`${sThemeColorClass} font-bold text-lg mb-2 border-b border-gray-700 pb-1`}>{fnT('characterSheet.touchstones')}</h3>
        <p className="text-gray-300 whitespace-pre-wrap">{oCharacter.touchstones || fnT('common.noneListed')}</p>
      </Card>
       <Card className="text-left" variant={bIsWerewolf ? 'werewolf' : 'vampire'}>
        <h2 className={`text-2xl font-bold text-center mb-4 ${sThemeAccentClass}`}>{fnT('characterSheet.gemini.title')}</h2>
        <p className="text-center text-gray-400 mb-6">{fnT('characterSheet.gemini.subtitle')}</p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Button onClick={() => fnHandleGenerate('backstory')} disabled={bIsLoading}>{fnT('characterSheet.gemini.generateBackstory')}</Button>
          <Button onClick={() => fnHandleGenerate('plotHook')} variant="secondary" disabled={bIsLoading}>{fnT('characterSheet.gemini.suggestPlotHooks')}</Button>
          <Button onClick={() => fnHandleGenerate('portrait')} variant="secondary" disabled={bIsLoading}>{fnT('characterSheet.gemini.describePortrait')}</Button>
        </div>
        {bIsLoading && <div className="text-center mt-4">{fnT('gemini.loading')}</div>}
        {sGeneratedContent && <GeminiResult title={sGenerationTitle} content={sGeneratedContent} colorClass={sThemeAccentClass} isWerewolf={bIsWerewolf} />}
      </Card>
        {oSelectedDiscipline && (
            <InfoModal title={oSelectedDiscipline.name} onClose={() => fnSetSelectedDiscipline(null)}>
                <div className="space-y-4 text-left">
                    <p className="text-gray-400 italic text-sm">{oSelectedDiscipline.description}</p>
                    {[...oSelectedDiscipline.powers].sort((a,b) => a.level - b.level).map(oPower => (
                        <div key={oPower.id} className="border-t border-gray-700 pt-3">
                            <div className="flex justify-between items-start mb-1">
                                <h4 className={`font-bold ${sThemeAccentClass}`}>{fnT('compendium.level')} {oPower.level}: {oPower.name}</h4>
                                <div className="flex items-center text-xs text-gray-400 bg-gray-900 px-2 py-1 rounded border border-gray-700">
                                    {bIsWerewolf ? <ClawIcon className="w-3 h-3 text-green-500 mr-1" /> : <BloodIcon className="w-3 h-3 text-red-500 mr-1" />}
                                    <span>{oPower.cost === "Passive" ? fnT('compendium.passive') : (oPower.cost === "No cost" ? fnT('compendium.noCost') : oPower.cost)}</span>
                                </div>
                            </div>
                            <p className="text-sm text-gray-300">{oPower.description}</p>
                            <div className={`mt-2 p-2 bg-black/30 rounded border-l-2 text-xs font-mono text-gray-400 ${bIsWerewolf ? 'border-green-900/50' : 'border-red-900/50'}`}><strong className={`${sThemeColorClass} uppercase tracking-wider mr-1`}>{fnT('compendium.system')}:</strong>{oPower.system}</div>
                        </div>
                    ))}
                </div>
            </InfoModal>
        )}
    </div>
  );
};
