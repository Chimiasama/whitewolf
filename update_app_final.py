with open('App.tsx', 'r') as f:
    content = f.read()

# 1. Update aSteps
old_asteps = """    const aSteps = useMemo(() => {
        const base = [fnT('steps.gameSelectionStep'), fnT('steps.concept')];
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
    }, [fnT, oCharacter.gameType]);"""

new_asteps = """    const aSteps = useMemo(() => {
        const base = [
            { id: 'game', label: fnT('steps.gameSelectionStep') },
            { id: 'concept', label: fnT('steps.concept') }
        ];
        if (oCharacter.gameType === GameType.Vampire) {
            base.push({ id: 'clan', label: fnT('steps.clan') });
        } else {
            base.push(
                { id: 'tribe', label: fnT('steps.tribe') },
                { id: 'auspice', label: fnT('steps.auspice') }
            );
        }
        base.push(
            { id: 'attributes', label: fnT('steps.attributes') },
            { id: 'skills', label: fnT('steps.skills') },
            { id: 'finishing', label: fnT('steps.finishingTouches') },
            { id: 'sheet', label: fnT('steps.sheet') }
        );
        return base;
    }, [fnT, oCharacter.gameType]);"""

if old_asteps in content:
    content = content.replace(old_asteps, new_asteps)
else:
    print("Old aSteps block not found exactly as expected.")
    # Fallback to index find
    start_idx = content.find('const aSteps = useMemo(() => {')
    end_idx = content.find('}, [fnT, oCharacter.gameType]);', start_idx) + 31
    if start_idx != -1 and end_idx != -1:
        content = content[:start_idx] + new_asteps + content[end_idx:]

# 2. Update renderStepContent and fix redundancies
# I'll just write the full component state + functions + renderStepContent part
# and replace everything between useEffect and if(view === 'home').

marker_start = "    useEffect(() => {"
marker_end = "    if (view === 'home') {"

start_pos = content.find(marker_start)
end_pos = content.find(marker_end)

if start_pos != -1 and end_pos != -1:
    middle = """    useEffect(() => {
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
        const base = [
            { id: 'game', label: fnT('steps.gameSelectionStep') },
            { id: 'concept', label: fnT('steps.concept') }
        ];
        if (oCharacter.gameType === GameType.Vampire) {
            base.push({ id: 'clan', label: fnT('steps.clan') });
        } else {
            base.push(
                { id: 'tribe', label: fnT('steps.tribe') },
                { id: 'auspice', label: fnT('steps.auspice') }
            );
        }
        base.push(
            { id: 'attributes', label: fnT('steps.attributes') },
            { id: 'skills', label: fnT('steps.skills') },
            { id: 'finishing', label: fnT('steps.finishingTouches') },
            { id: 'sheet', label: fnT('steps.sheet') }
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
        const finishingIndex = aSteps.findIndex(s => s.id === 'finishing');
        fnSetStep(finishingIndex !== -1 ? finishingIndex + 1 : 6);
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
                    const finishingIndex = aSteps.findIndex(s => s.id === 'finishing');
                    fnSetStep(finishingIndex !== -1 ? finishingIndex + 1 : 6);
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
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const oLoaded = JSON.parse(event.target?.result as string);
                    fnSetCharacter(oLoaded);
                    setView('creator');
                    const finishingIndex = aSteps.findIndex(s => s.id === 'finishing');
                    fnSetStep(finishingIndex !== -1 ? finishingIndex + 1 : 6);
                    fnShowNotification(fnT('common.generateSuccess'));
                } catch (e) {
                    fnShowNotification("Failed to import character.", "error");
                }
            };
            reader.readAsText(file);
        }
    };

    const fnHandlePredatorTypeChange = (sNewId: string) => {
        const oOldType = fnGetPredatorTypes(fnT).find(pt => pt.id === oCharacter.predatorType);
        const oNewType = fnGetPredatorTypes(fnT).find(pt => pt.id === sNewId);

        let oNewDisciplines = { ...oCharacter.disciplines };

        if (oOldType?.disciplineAdd) {
            const dName = oOldType.disciplineAdd.discipline;
            oNewDisciplines[dName] = Math.max(0, (oNewDisciplines[dName] || 0) - oOldType.disciplineAdd.dots);
            if (oNewDisciplines[dName] === 0) delete oNewDisciplines[dName];
        }

        if (oNewType?.disciplineAdd) {
            const dName = oNewType.disciplineAdd.discipline;
            oNewDisciplines[dName] = (oNewDisciplines[dName] || 0) + oNewType.disciplineAdd.dots;
        }

        fnSetCharacter(prev => ({
            ...prev,
            predatorType: sNewId,
            humanity: prev.humanity + (oNewType ? oNewType.humanityModifier : 0) - (oOldType ? oOldType.humanityModifier : 0),
            disciplines: oNewDisciplines
        }));
    };

    const fnHandleGameSelect = (game: GameType) => {
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
        const sStepId = aSteps[nStep - 1]?.id;
        switch (sStepId) {
            case 'game':
                return <GameSelection onSelect={fnHandleGameSelect} />;
            case 'concept':
                return (
                    <GothicFrame>
                        <div className="flex flex-wrap justify-between items-center gap-3 mb-2">
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
            case 'clan': {
                const oClans = fnGetClanDetails(fnT);
                return (
                    <div className="text-center">
                        <h2 className="text-3xl font-cinzel text-red-500 mb-6">{fnT('clan.title')}</h2>
                        <LoreQuote text={fnT('lore.intro')} />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {(Object.keys(oClans) as Clan[]).map(sClan => (
                                <div key={sClan} className="relative group">
                                    <Card
                                        className="text-left relative overflow-hidden h-full flex flex-col"
                                        onClick={() => fnUpdateCharacter('clan', sClan)}
                                        isSelected={oCharacter.clan === sClan}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-bold text-red-500">{oClans[sClan].name}</h4>
                                            <InfoIcon onClick={(e) => {
                                                e.stopPropagation();
                                                fnSetActiveDetail({
                                                    title: oClans[sClan].name,
                                                    content: (
                                                        <div className="space-y-6 text-left">
                                                            <p className="text-gray-300 leading-relaxed">{oClans[sClan].description}</p>
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                <div className="bg-black/40 p-4 rounded-lg border border-red-900/30">
                                                                    <h4 className="text-red-500 font-bold uppercase text-xs tracking-widest mb-2">{fnT('characterSheet.clanBane')}</h4>
                                                                    <p className="text-sm text-gray-400">{oClans[sClan].bane}</p>
                                                                </div>
                                                                <div className="bg-black/40 p-4 rounded-lg border border-red-900/30">
                                                                    <h4 className="text-red-500 font-bold uppercase text-xs tracking-widest mb-2">{fnT('characterSheet.clanCompulsion')}</h4>
                                                                    <p className="text-sm text-gray-400">{oClans[sClan].compulsion}</p>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <h4 className="text-red-500 font-bold uppercase text-xs tracking-widest mb-2">Disciplines</h4>
                                                                <div className="flex flex-wrap gap-2">
                                                                    {oClans[sClan].disciplines.map(d => (
                                                                        <span key={d} className="px-3 py-1 bg-red-900/20 border border-red-900/40 rounded text-xs text-red-400 font-bold uppercase tracking-widest">{d}</span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                });
                                            }} />
                                        </div>
                                        <p className="text-xs text-gray-300 mb-4 flex-grow line-clamp-3">{oClans[sClan].description}</p>
                                        <div className="text-[10px] text-gray-500 space-y-1 mt-auto pt-2 border-t border-gray-800">
                                            <p className="line-clamp-1"><strong>{fnT('characterSheet.clanBane')}:</strong> {oClans[sClan].bane}</p>
                                        </div>
                                    </Card>
                                </div>
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
            }
            case 'tribe': {
                const oTribes = fnGetTribeDetails(fnT);
                return (
                    <div className="space-y-8 text-center">
                        <h2 className="text-3xl font-cinzel text-green-500 mb-6">{fnT('steps.tribe')}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {(Object.keys(oTribes) as Tribe[]).map(sTribe => {
                                const sKey = sTribe.toLowerCase().replace(/\s/g, '');
                                return (
                                    <Card
                                        key={sTribe}
                                        className="text-left relative overflow-hidden h-full flex flex-col group"
                                        onClick={() => fnUpdateCharacter('tribe', sTribe)}
                                        isSelected={oCharacter.tribe === sTribe}
                                        variant="werewolf"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-bold text-green-500">{oTribes[sTribe].name}</h4>
                                            <InfoIcon onClick={(e) => {
                                                e.stopPropagation();
                                                fnSetActiveDetail({
                                                    title: oTribes[sTribe].name,
                                                    content: (
                                                        <div className="space-y-6 text-left">
                                                            <p className="text-gray-300 leading-relaxed">{oTribes[sTribe].description}</p>
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                <div className="bg-black/40 p-4 rounded-lg border border-emerald-900/30">
                                                                    <h4 className="text-emerald-500 font-bold uppercase text-xs tracking-widest mb-2">Favor</h4>
                                                                    <p className="text-sm text-gray-400">{fnT('tribes.' + sKey + '.favor')}</p>
                                                                </div>
                                                                <div className="bg-black/40 p-4 rounded-lg border border-red-900/30">
                                                                    <h4 className="text-red-500 font-bold uppercase text-xs tracking-widest mb-2">Bane</h4>
                                                                    <p className="text-sm text-gray-400">{fnT('tribes.' + sKey + '.bane')}</p>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <h4 className="text-emerald-500 font-bold uppercase text-xs tracking-widest mb-2">{fnT('characterSheet.gifts')}</h4>
                                                                <div className="flex flex-wrap gap-2">
                                                                    {oTribes[sTribe].gifts.map(g => (
                                                                        <span key={g} className="px-3 py-1 bg-emerald-900/20 border border-emerald-900/40 rounded text-xs text-emerald-300 font-bold uppercase tracking-widest">{g}</span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                });
                                            }} />
                                        </div>
                                        <p className="text-xs text-gray-300 mb-3 line-clamp-3 flex-grow">{oTribes[sTribe].description}</p>
                                        <div className="text-[10px] border-t border-gray-800 pt-2 space-y-1 mt-auto">
                                            <p className="line-clamp-1"><span className="text-green-600 font-bold uppercase">Favor:</span> <span className="text-gray-500">{fnT('tribes.' + sKey + '.favor')}</span></p>
                                            <p className="line-clamp-1"><span className="text-red-600 font-bold uppercase">Bane:</span> <span className="text-gray-500">{fnT('tribes.' + sKey + '.bane')}</span></p>
                                        </div>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>
                );
            }
            case 'auspice': {
                const oAuspices = fnGetAuspiceDetails(fnT);
                return (
                    <div className="space-y-8 text-center">
                        <h2 className="text-3xl font-cinzel text-green-500 mb-6">{fnT('steps.auspice')}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {(Object.keys(oAuspices) as Auspice[]).map(sAuspice => {
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
                );
            }
            case 'attributes':
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
            case 'skills':
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
            case 'finishing': {
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

                            {/* Point Pool Indicator */}
                            <div className="mb-6 flex flex-col items-center p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                                {(() => {
                                    const nTotalDots = (Object.values(oCharacter.disciplines) as number[]).reduce((acc: number, val: number) => acc + (val || 0), 0);
                                    const oPredatorType = fnGetPredatorTypes(fnT).find(pt => pt.id === oCharacter.predatorType);
                                    const nExpectedDots = 3 + (oPredatorType?.disciplineAdd ? oPredatorType.disciplineAdd.dots : 0);
                                    const bIsComplete = nTotalDots >= nExpectedDots;

                                    return (
                                        <>
                                            <span className={`text-xs font-bold uppercase tracking-widest mb-2 ${bIsComplete ? 'text-green-500' : 'text-red-400'}`}>
                                                {fnT('common.poolDistribution')}: {nTotalDots} / {nExpectedDots} {fnT('common.value')}
                                            </span>
                                            <div className="flex gap-2">
                                                {[...Array(nExpectedDots)].map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className={`w-3 h-3 rounded-full border ${i < (nTotalDots as number) ? (bIsWerewolf ? 'bg-green-600 border-green-400 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : 'bg-red-600 border-red-400 shadow-[0_0_8px_rgba(220,38,38,0.4)]') : 'bg-gray-800 border-gray-600'}`}
                                                    ></div>
                                                ))}
                                                {(nTotalDots as number) > nExpectedDots && (
                                                     <div className="ml-2 text-xs text-yellow-500 font-bold">+{(nTotalDots as number) - nExpectedDots}</div>
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
                                            ...(oCharacter.tribe ? fnGetTribeDetails(fnT)[oCharacter.tribe].gifts : []),
                                            ...(oCharacter.auspice ? fnGetAuspiceDetails(fnT)[oCharacter.auspice].gifts : [])
                                          ]))
                                        : (oCharacter.clan ? fnGetClanDetails(fnT)[oCharacter.clan].disciplines : []);
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
                                        return (
                                            <div key={sDisc} className="bg-gray-800 p-4 rounded-lg border border-gray-700 min-w-0">
                                                <div className="flex flex-wrap justify-between items-center gap-3 mb-2">
                                                    <div className="flex flex-col">
                                                        <h4 className="font-bold text-gray-200 break-words">{fnGetDisciplineDetails(fnT)[sDisc]?.name || sDisc}</h4>
                                                        {!aBaseDiscs.includes(sDisc) && (
                                                            <span className="text-[9px] uppercase text-gray-500 font-bold">{fnT('common.unknown')}</span>
                                                        )}
                                                    </div>
                                                    <div className="flex flex-shrink-0 space-x-1">
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
                                                {nDots > 0 && fnGetDisciplineDetails(fnT)[sDisc] && (
                                                    <DisciplinePowerSelector
                                                        disciplineKey={sDisc}
                                                        dots={nDots}
                                                        selectedPowerIds={oCharacter.disciplinePowers[sDisc] || []}
                                                        onSelectPowers={(ids) => fnUpdateCharacter('disciplinePowers', { ...oCharacter.disciplinePowers, [sDisc]: ids })}
                                                        disciplineDetails={fnGetDisciplineDetails(fnT)[sDisc]}
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

                            <div className="mt-6 flex justify-center">
                                <Button
                                    variant="secondary"
                                    onClick={() => {
                                        fnSetActiveDetail({
                                            title: bIsWerewolf ? fnT('characterSheet.gifts') : fnT('finishingTouches.disciplines.title'),
                                            content: (
                                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                                    {Object.keys(fnGetDisciplineDetails(fnT)).filter(d => !oCharacter.disciplines[d]).map(d => (
                                                        <Button
                                                            key={d}
                                                            variant="secondary"
                                                            className="text-[10px] py-2"
                                                            onClick={() => {
                                                                fnUpdateCharacter('disciplines', { ...oCharacter.disciplines, [d]: 0 });
                                                                fnSetActiveDetail(null);
                                                            }}
                                                        >
                                                            {fnGetDisciplineDetails(fnT)[d].name}
                                                        </Button>
                                                    ))}
                                                </div>
                                            )
                                        });
                                    }}
                                >
                                    + {bIsWerewolf ? fnT('buttons.add') : fnT('buttons.add')}
                                </Button>
                            </div>
                        </GothicFrame>

                        {/* Discipline Combos (Amalgams) Section */}
                        {!bIsWerewolf && (
                            <GothicFrame className="text-left">
                                <div className="flex items-center gap-3 mb-4 border-b border-gray-700 pb-2">
                                    <h3 className={`text-xl font-bold ${sThemeAccent}`}>{fnT('combos.title')}</h3>
                                    <InfoIcon onClick={() => {
                                        fnSetActiveDetail({
                                            title: fnT('combos.title'),
                                            content: (
                                                <div className="space-y-4">
                                                    <p className="text-gray-300">{fnT('combos.subtitle')}</p>
                                                </div>
                                            )
                                        });
                                    }} />
                                </div>
                                {(() => {
                                    const availableCombos = fnGetDisciplineCombos(fnT).filter(combo =>
                                        combo.requirements.every(req => (oCharacter.disciplines[req.discipline] || 0) >= req.level)
                                    );
                                    return availableCombos.length > 0 ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {availableCombos.map(combo => {
                                                const isSelected = oCharacter.disciplineCombos.some(c => c.id === combo.id);
                                                return (
                                                    <div
                                                        key={combo.id}
                                                        className={`p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer flex justify-between items-center ${isSelected ? 'bg-red-900/20 border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.2)]' : 'bg-gray-800 border-gray-700 hover:border-gray-500'}`}
                                                        onClick={() => {
                                                            if (isSelected) {
                                                                fnUpdateCharacter('disciplineCombos', oCharacter.disciplineCombos.filter(c => c.id !== combo.id));
                                                            } else {
                                                                fnUpdateCharacter('disciplineCombos', [...oCharacter.disciplineCombos, combo]);
                                                            }
                                                        }}
                                                    >
                                                        <div>
                                                            <h4 className="font-bold text-gray-200">{combo.name}</h4>
                                                            <div className="flex gap-1 mt-1">
                                                                {combo.requirements.map(req => (
                                                                    <span key={req.discipline} className="text-[9px] uppercase bg-black/40 px-1.5 py-0.5 rounded text-gray-400">{req.discipline} {req.level}</span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                             <InfoIcon onClick={(e) => {
                                                                e.stopPropagation();
                                                                fnSetActiveDetail({
                                                                    title: combo.name,
                                                                    content: (
                                                                        <div className="space-y-4 text-left">
                                                                            <p className="text-gray-300">{combo.description}</p>
                                                                            <div className="p-4 bg-red-900/10 border-l-4 border-red-500 rounded">
                                                                                <h5 className="text-red-500 font-bold uppercase text-[10px] tracking-widest mb-2">{fnT('compendium.system')}</h5>
                                                                                <p className="text-sm text-gray-300 leading-relaxed italic">{combo.system}</p>
                                                                            </div>
                                                                            <div className="pt-4 border-t border-gray-700">
                                                                                <h5 className="text-gray-500 font-bold uppercase text-[10px] tracking-widest mb-2">Requirements</h5>
                                                                                <div className="flex flex-wrap gap-2">
                                                                                    {combo.requirements.map(req => (
                                                                                        <span key={req.discipline} className="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-xs text-gray-400">
                                                                                            {req.discipline} {req.level}
                                                                                        </span>
                                                                                    ))}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                });
                                                            }} />
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
                                    );
                                })()}
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
                                            const oSelectedPredator = fnGetPredatorTypes(fnT).find(pt => pt.id === oCharacter.predatorType);
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
                                                                Associated Flaws
                                                            </h5>
                                                            <div className="space-y-3">
                                                                {oSelectedPredator.flaws.map((flaw, idx) => (
                                                                    <div key={`${flaw.name}-${idx}`} className="flex items-start gap-3 bg-red-900/5 p-4 rounded-md border border-red-900/20 hover:bg-red-900/10 transition-colors">
                                                                        <div className="mt-1 text-red-500"><ExclamationCircle /></div>
                                                                        <div>
                                                                            <div className="text-[9px] uppercase tracking-widest text-red-600 font-bold mb-0.5">Flaw</div>
                                                                            <div className="text-sm font-bold text-red-400">{flaw.name}</div>
                                                                            <div className="text-[10px] text-gray-500">{flaw.cost} dots included</div>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                                {oSelectedPredator.flaws.length === 0 && (
                                                                    <div className="text-xs text-gray-600 italic">No static flaws applied.</div>
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

                        {/* Advantages & Flaws Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Advantages */}
                            <GothicFrame className="text-left">
                                <h3 className={`text-xl font-bold ${sThemeAccent} mb-4 border-b border-gray-700 pb-2 uppercase tracking-tight`}>{fnT('finishingTouches.advantages.title')}</h3>
                                <div className="mb-6 flex items-center justify-between bg-black/40 p-3 rounded-lg border border-gray-800">
                                    {(() => {
                                        const spent = oCharacter.advantages.reduce((sum, a) => sum + a.cost, 0);
                                        return (
                                            <>
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] uppercase text-gray-500 font-bold">Points Spent</span>
                                                    <span className={`text-xl font-cinzel font-bold ${spent === 7 ? 'text-green-500' : 'text-red-500'}`}>{spent} / 7</span>
                                                </div>
                                                <div className="flex gap-1">
                                                    {[...Array(7)].map((_, i) => (
                                                        <div key={i} className={`w-3 h-3 rounded-full border ${i < spent ? 'bg-green-600 border-green-400 shadow-[0_0_8px_rgba(34,197,94,0.3)]' : 'bg-gray-800 border-gray-700'}`}></div>
                                                    ))}
                                                </div>
                                            </>
                                        );
                                    })()}
                                </div>
                                <div className="space-y-2 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700">
                                    {aAdvantagesAndFlaws.filter(a => a.type === 'advantage').map(adv => (
                                        <div key={adv.id} className="flex flex-col p-3 bg-gray-800/40 rounded border border-gray-700/50 hover:border-gray-500 group transition-all">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-bold text-gray-200">{adv.name}</span>
                                                <div className="flex gap-1">
                                                    {(adv.levels || [1,2,3,4,5]).map(lvl => (
                                                        <button
                                                            key={lvl}
                                                            onClick={() => {
                                                                const spent = oCharacter.advantages.reduce((sum, a) => sum + a.cost, 0);
                                                                if (spent + lvl <= 7) {
                                                                    fnUpdateCharacter('advantages', [...oCharacter.advantages, { ...adv, cost: lvl }]);
                                                                }
                                                            }}
                                                            className="w-5 h-5 rounded bg-gray-900 border border-gray-600 text-[10px] flex items-center justify-center hover:bg-green-900 hover:border-green-500 transition-colors"
                                                        >
                                                            {lvl}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-[10px] text-gray-500 mt-1 leading-tight">{adv.description}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 border-t border-gray-700 pt-3 space-y-2">
                                    {oCharacter.advantages.map((adv, i) => (
                                        <div key={i} className="flex justify-between items-center text-xs text-gray-300 bg-green-900/10 px-3 py-2 rounded border border-green-900/20">
                                            <div className="flex items-center gap-2">
                                                <span className="w-5 h-5 rounded-full bg-green-900 text-green-400 flex items-center justify-center font-bold text-[10px]">{adv.cost}</span>
                                                <span>{adv.name}</span>
                                            </div>
                                            <button onClick={() => fnUpdateCharacter('advantages', oCharacter.advantages.filter((_, idx) => idx !== i))} className="text-red-500 hover:text-red-300 font-bold p-1">✕</button>
                                        </div>
                                    ))}
                                </div>
                            </GothicFrame>

                            {/* Flaws */}
                            <GothicFrame className="text-left">
                                <h3 className={`text-xl font-bold ${sThemeAccent} mb-4 border-b border-gray-700 pb-2 uppercase tracking-tight`}>{fnT('finishingTouches.flaws.title')}</h3>
                                <div className="mb-6 flex items-center justify-between bg-black/40 p-3 rounded-lg border border-gray-800">
                                    {(() => {
                                        const spent = oCharacter.flaws.reduce((sum, a) => sum + a.cost, 0);
                                        return (
                                            <>
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] uppercase text-gray-500 font-bold">Required Flaws</span>
                                                    <span className={`text-xl font-cinzel font-bold ${spent >= 2 ? 'text-green-500' : 'text-red-500'}`}>{spent} / 2</span>
                                                </div>
                                                <div className="flex gap-1">
                                                    {[...Array(2)].map((_, i) => (
                                                        <div key={i} className={`w-3 h-3 rounded-full border ${i < spent ? 'bg-red-600 border-red-400 shadow-[0_0_8px_rgba(220,38,38,0.3)]' : 'bg-gray-800 border-gray-700'}`}></div>
                                                    ))}
                                                </div>
                                            </>
                                        );
                                    })()}
                                </div>
                                <div className="space-y-2 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700">
                                    {aAdvantagesAndFlaws.filter(a => a.type === 'flaw').map(flaw => (
                                        <div key={flaw.id} className="flex flex-col p-3 bg-gray-800/40 rounded border border-gray-700/50 hover:border-gray-500 group transition-all">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-bold text-gray-200">{flaw.name}</span>
                                                <div className="flex gap-1">
                                                    {(flaw.levels || [1,2,3]).map(lvl => (
                                                        <button
                                                            key={lvl}
                                                            onClick={() => fnUpdateCharacter('flaws', [...oCharacter.flaws, { ...flaw, cost: lvl }])}
                                                            className="w-5 h-5 rounded bg-gray-900 border border-gray-600 text-[10px] flex items-center justify-center hover:bg-red-900 hover:border-red-500 transition-colors"
                                                        >
                                                            {lvl}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-[10px] text-gray-500 mt-1 leading-tight">{flaw.description}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 border-t border-gray-700 pt-3 space-y-2">
                                    {oCharacter.flaws.map((flaw, i) => (
                                        <div key={i} className="flex justify-between items-center text-xs text-gray-300 bg-red-900/10 px-3 py-2 rounded border border-red-900/20">
                                            <div className="flex items-center gap-2">
                                                <span className="w-5 h-5 rounded-full bg-red-900 text-red-400 flex items-center justify-center font-bold text-[10px]">{flaw.cost}</span>
                                                <span>{flaw.name}</span>
                                            </div>
                                            <button onClick={() => fnUpdateCharacter('flaws', oCharacter.flaws.filter((_, idx) => idx !== i))} className="text-red-500 hover:text-red-300 font-bold p-1">✕</button>
                                        </div>
                                    ))}
                                </div>
                            </GothicFrame>
                        </div>

                        {/* Specialties Section */}
                        <GothicFrame className="text-left">
                            <h3 className={`text-xl font-bold ${sThemeAccent} mb-4 border-b border-gray-700 pb-2`}>{fnT('characterSheet.specialties')}</h3>
                            <div className="bg-black/20 p-4 rounded-lg border border-gray-800">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                                    <div className="md:col-span-1">
                                        <label className="block text-[10px] uppercase text-gray-500 font-bold mb-1">{fnT('common.skill')}</label>
                                        <select
                                            className="w-full bg-gray-800 border border-gray-600 rounded p-2 text-white focus:ring-2 focus:ring-red-500 outline-none transition-all"
                                            value={sSelectedSkill}
                                            onChange={(e) => setSelectedSkill(e.target.value)}
                                        >
                                            <option value="">{fnT('common.selectPlaceholder')}</option>
                                            {aSkillList.map(s => (
                                                <option key={s} value={s}>{fnT('skills.list.' + s)}</option>
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
                                            <span className="text-red-400 font-bold">{fnT('skills.list.' + s.skill)}:</span>
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
            }
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
"""

content = content[:start_pos] + middle + content[end_pos:]

with open('App.tsx', 'w') as f:
    f.write(content)
