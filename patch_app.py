with open('App.tsx', 'r') as f:
    lines = f.readlines()

# Fix aSteps
asteps_start = -1
asteps_end = -1
for i, line in enumerate(lines):
    if 'const aSteps = useMemo(() => {' in line:
        asteps_start = i
    if asteps_start != -1 and '}, [fnT, oCharacter.gameType]);' in line:
        asteps_end = i
        break

if asteps_start != -1:
    new_asteps = [
        "    const aSteps = useMemo(() => {\n",
        "        const base = [\n",
        "            { id: 'game', label: fnT('steps.gameSelectionStep') },\n",
        "            { id: 'concept', label: fnT('steps.concept') }\n",
        "        ];\n",
        "        if (oCharacter.gameType === GameType.Vampire) {\n",
        "            base.push({ id: 'clan', label: fnT('steps.clan') });\n",
        "        } else {\n",
        "            base.push(\n",
        "                { id: 'tribe', label: fnT('steps.tribe') },\n",
        "                { id: 'auspice', label: fnT('steps.auspice') }\n",
        "            );\n",
        "        }\n",
        "        base.push(\n",
        "            { id: 'attributes', label: fnT('steps.attributes') },\n",
        "            { id: 'skills', label: fnT('steps.skills') },\n",
        "            { id: 'finishing', label: fnT('steps.finishingTouches') },\n",
        "            { id: 'sheet', label: fnT('steps.sheet') }\n",
        "        );\n",
        "        return base;\n",
        "    }, [fnT, oCharacter.gameType]);\n"
    ]
    lines[asteps_start:asteps_end+1] = new_asteps

# Fix renderStepContent
rsc_start = -1
rsc_end = -1
for i, line in enumerate(lines):
    if 'const renderStepContent = () => {' in line:
        rsc_start = i
    if rsc_start != -1 and 'if (view === \'home\') {' in line:
        rsc_end = i # This is actually just after the function
        break

if rsc_start != -1:
    # Find the real end of the function (the last }; before view === 'home')
    real_end = -1
    for i in range(rsc_end - 1, rsc_start, -1):
        if lines[i].strip() == '};':
            real_end = i
            break

    if real_end != -1:
        # We replace the whole function
        # I will load the desired RSC content from a file to avoid mess
        pass

with open('App.tsx', 'w') as f:
    f.writelines(lines)
