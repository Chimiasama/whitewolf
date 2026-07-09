
import { Character, Clan, Attribute, Skill, DisciplineDetail, PredatorTypeDetail, AdvantageFlaw, GameType, Tribe, Auspice, Loresheet } from './types';

type TFunction = (key: string) => string;

export const fnGetTribeDetails = (fnT: TFunction): Record<Tribe, { name: string; description: string; gifts: string[]; bane: string; favor: string; }> => ({
    [Tribe.BlackFuries]: { name: fnT('tribes.blackfuries.name'), description: fnT('tribes.blackfuries.description'), gifts: ["blackfuriesgifts", "innategifts"], bane: fnT('tribes.blackfuries.bane'), favor: fnT('tribes.blackfuries.favor') },
    [Tribe.BoneGnawers]: { name: fnT('tribes.bonegnawers.name'), description: fnT('tribes.bonegnawers.description'), gifts: ["bonegnawersgifts", "innategifts"], bane: fnT('tribes.bonegnawers.bane'), favor: fnT('tribes.bonegnawers.favor') },
    [Tribe.ChildrenOfGaia]: { name: fnT('tribes.childrenofgaia.name'), description: fnT('tribes.childrenofgaia.description'), gifts: ["childrenofgaiagifts", "innategifts"], bane: fnT('tribes.childrenofgaia.bane'), favor: fnT('tribes.childrenofgaia.favor') },
    [Tribe.FiandeirosDeVidro]: { name: fnT('tribes.fiandeirosdevidro.name'), description: fnT('tribes.fiandeirosdevidro.description'), gifts: ["fiandeirosdevidrogifts", "innategifts"], bane: fnT('tribes.fiandeirosdevidro.bane'), favor: fnT('tribes.fiandeirosdevidro.favor') },
    [Tribe.AndarilhosDoAsfalto]: { name: fnT('tribes.andarilhosdoasfalto.name'), description: fnT('tribes.andarilhosdoasfalto.description'), gifts: ["andarilhosdoasfaltogifts", "innategifts"], bane: fnT('tribes.andarilhosdoasfalto.bane'), favor: fnT('tribes.andarilhosdoasfalto.favor') },
    [Tribe.CriaDeFenris]: { name: fnT('tribes.criadefenris.name'), description: fnT('tribes.criadefenris.description'), gifts: ["criadefenrisgifts", "innategifts"], bane: fnT('tribes.criadefenris.bane'), favor: fnT('tribes.criadefenris.favor') },
    [Tribe.RedTalons]: { name: fnT('tribes.redtalons.name'), description: fnT('tribes.redtalons.description'), gifts: ["redtalonsgifts", "innategifts"], bane: fnT('tribes.redtalons.bane'), favor: fnT('tribes.redtalons.favor') },
    [Tribe.ShadowLords]: { name: fnT('tribes.shadowlords.name'), description: fnT('tribes.shadowlords.description'), gifts: ["shadowlordsgifts", "innategifts"], bane: fnT('tribes.shadowlords.bane'), favor: fnT('tribes.shadowlords.favor') },
    [Tribe.SilentStriders]: { name: fnT('tribes.silentstriders.name'), description: fnT('tribes.silentstriders.description'), gifts: ["silentstridersgifts", "innategifts"], bane: fnT('tribes.silentstriders.bane'), favor: fnT('tribes.silentstriders.favor') },
    [Tribe.SilverFangs]: { name: fnT('tribes.silverfangs.name'), description: fnT('tribes.silverfangs.description'), gifts: ["silverfangsgifts", "innategifts"], bane: fnT('tribes.silverfangs.bane'), favor: fnT('tribes.silverfangs.favor') },
    [Tribe.Wendigo]: { name: fnT('tribes.wendigo.name'), description: fnT('tribes.wendigo.description'), gifts: ["wendigogifts", "innategifts"], bane: fnT('tribes.wendigo.bane'), favor: fnT('tribes.wendigo.favor') }
});

export const fnGetAuspiceDetails = (fnT: TFunction): Record<Auspice, { name: string; description: string; gifts: string[]; }> => ({
    [Auspice.Ragabash]: { name: fnT('auspices.ragabash.name'), description: fnT('auspices.ragabash.description'), gifts: ["ragabashgifts"] },
    [Auspice.Theurge]: { name: fnT('auspices.theurge.name'), description: fnT('auspices.theurge.description'), gifts: ["theurgegifts"] },
    [Auspice.Philodox]: { name: fnT('auspices.philodox.name'), description: fnT('auspices.philodox.description'), gifts: ["philodoxgifts"] },
    [Auspice.Galliard]: { name: fnT('auspices.galliard.name'), description: fnT('auspices.galliard.description'), gifts: ["galliardgifts"] },
    [Auspice.Ahroun]: { name: fnT('auspices.ahroun.name'), description: fnT('auspices.ahroun.description'), gifts: ["ahroungifts"] }
});

export const fnGetClanDetails = (fnT: TFunction): Record<Clan, { name: string; description: string; disciplines: string[]; bane: string; compulsion: string; }> => ({
    [Clan.Brujah]: { name: fnT('clans.brujah.name'), description: fnT('clans.brujah.description'), disciplines: ["celerity", "potence", "presence"], bane: fnT('clans.brujah.bane'), compulsion: fnT('clans.brujah.compulsion') },
    [Clan.Gangrel]: { name: fnT('clans.gangrel.name'), description: fnT('clans.gangrel.description'), disciplines: ["animalism", "fortitude", "protean"], bane: fnT('clans.gangrel.bane'), compulsion: fnT('clans.gangrel.compulsion') },
    [Clan.Malkavian]: { name: fnT('clans.malkavian.name'), description: fnT('clans.malkavian.description'), disciplines: ["auspex", "dominate", "obfuscate"], bane: fnT('clans.malkavian.bane'), compulsion: fnT('clans.malkavian.compulsion') },
    [Clan.Nosferatu]: { name: fnT('clans.nosferatu.name'), description: fnT('clans.nosferatu.description'), disciplines: ["animalism", "obfuscate", "potence"], bane: fnT('clans.nosferatu.bane'), compulsion: fnT('clans.nosferatu.compulsion') },
    [Clan.Toreador]: { name: fnT('clans.toreador.name'), description: fnT('clans.toreador.description'), disciplines: ["auspex", "celerity", "presence"], bane: fnT('clans.toreador.bane'), compulsion: fnT('clans.toreador.compulsion') },
    [Clan.Tremere]: { name: fnT('clans.tremere.name'), description: fnT('clans.tremere.description'), disciplines: ["auspex", "bloodsorcery", "dominate"], bane: fnT('clans.tremere.bane'), compulsion: fnT('clans.tremere.compulsion') },
    [Clan.Ventrue]: { name: fnT('clans.ventrue.name'), description: fnT('clans.ventrue.description'), disciplines: ["dominate", "fortitude", "presence"], bane: fnT('clans.ventrue.bane'), compulsion: fnT('clans.ventrue.compulsion') },
    [Clan.BanuHaqim]: { name: fnT('clans.banuhaqim.name'), description: fnT('clans.banuhaqim.description'), disciplines: ["bloodsorcery", "celerity", "obfuscate"], bane: fnT('clans.banuhaqim.bane'), compulsion: fnT('clans.banuhaqim.compulsion') },
    [Clan.TheMinistry]: { name: fnT('clans.theministry.name'), description: fnT('clans.theministry.description'), disciplines: ["obfuscate", "presence", "protean"], bane: fnT('clans.theministry.bane'), compulsion: fnT('clans.theministry.compulsion') },
    [Clan.Lasombra]: { name: fnT('clans.lasombra.name'), description: fnT('clans.lasombra.description'), disciplines: ["dominate", "oblivion", "potence"], bane: fnT('clans.lasombra.bane'), compulsion: fnT('clans.lasombra.compulsion') },
    [Clan.Ravnos]: { name: fnT('clans.ravnos.name'), description: fnT('clans.ravnos.description'), disciplines: ["animalism", "obfuscate", "presence"], bane: fnT('clans.ravnos.bane'), compulsion: fnT('clans.ravnos.compulsion') },
    [Clan.Salubri]: { name: fnT('clans.salubri.name'), description: fnT('clans.salubri.description'), disciplines: ["auspex", "dominate", "fortitude"], bane: fnT('clans.salubri.bane'), compulsion: fnT('clans.salubri.compulsion') },
    [Clan.Tzimisce]: { name: fnT('clans.tzimisce.name'), description: fnT('clans.tzimisce.description'), disciplines: ["animalism", "dominate", "protean"], bane: fnT('clans.tzimisce.bane'), compulsion: fnT('clans.tzimisce.compulsion') },
    [Clan.Caitiff]: { name: fnT('clans.caitiff.name'), description: fnT('clans.caitiff.description'), disciplines: [], bane: fnT('clans.caitiff.bane'), compulsion: fnT('clans.caitiff.compulsion') },
    [Clan.ThinBlood]: { name: fnT('clans.thinblood.name'), description: fnT('clans.thinblood.description'), disciplines: ["thinbloodalchemy"], bane: fnT('clans.thinblood.bane'), compulsion: fnT('clans.thinblood.compulsion') }
});

export const fnGetPredatorTypes = (fnT: TFunction): PredatorTypeDetail[] => [
    { 
        id: 'alleycat',
        name: fnT('predatorTypes.alleycat.name'), 
        description: fnT('predatorTypes.alleycat.description'),
        disciplineAdd: { discipline: "potence", dots: 1 },
        humanityModifier: -1,
        advantages: [{ id: 'contacts_criminal', name: fnT('advantages.contacts.name'), description: fnT('advantages.contacts.description'), cost: 3, type: 'advantage', levels: [3] }],
        flaws: [],
        specialties: [],
        specialtyOptions: [
            { skill: Skill.Intimidation, name: fnT('predatorTypes.specialties.stickups') },
            { skill: Skill.Brawl, name: fnT('predatorTypes.specialties.grappling') }
        ]
    },
    { 
        id: 'bagger',
        name: fnT('predatorTypes.bagger.name'), 
        description: fnT('predatorTypes.bagger.description'),
        humanityModifier: 0,
        advantages: [],
        flaws: [{ id: 'enemy_bagger', name: fnT('flaws.enemy.name'), description: fnT('flaws.enemy.description'), cost: 2, type: 'flaw', levels: [2]}],
        specialties: [],
        specialtyOptions: [
            { skill: Skill.Streetwise, name: fnT('predatorTypes.specialties.blackMarket') },
            { skill: Skill.Larceny, name: fnT('predatorTypes.specialties.lockpicking') }
        ]
    },
    { 
        id: 'consensualist',
        name: fnT('predatorTypes.consensualist.name'), 
        description: fnT('predatorTypes.consensualist.description'),
        humanityModifier: 1,
        advantages: [],
        flaws: [
            { id: 'darksecret_consensualist', name: fnT('flaws.darksecret.name'), description: fnT('flaws.darksecret.description'), cost: 1, type: 'flaw', levels: [1]},
            { id: 'feeding_consensualist', name: fnT('flaws.feeding.name'), description: fnT('flaws.feeding.description'), cost: 1, type: 'flaw', levels: [1]}
        ],
        specialties: [],
        specialtyOptions: [
            { skill: Skill.Medicine, name: fnT('predatorTypes.specialties.phlebotomy') },
            { skill: Skill.Persuasion, name: fnT('predatorTypes.specialties.vessels') }
        ]
    },
    { 
        id: 'farmer',
        name: fnT('predatorTypes.farmer.name'), 
        description: fnT('predatorTypes.farmer.description'),
        humanityModifier: 0,
        advantages: [],
        flaws: [{ id: 'feeding_farmer', name: fnT('flaws.feeding.name'), description: fnT('flaws.feeding.description'), cost: 2, type: 'flaw', levels: [2]}],
        specialties: [],
        specialtyOptions: [
            { skill: Skill.AnimalKen, name: fnT('predatorTypes.specialties.animal') },
            { skill: Skill.Survival, name: fnT('predatorTypes.specialties.hunting') }
        ]
    },
    { 
        id: 'osiris',
        name: fnT('predatorTypes.osiris.name'), 
        description: fnT('predatorTypes.osiris.description'),
        humanityModifier: -1,
        advantages: [
            { id: 'fame_osiris', name: fnT('advantages.fame.name'), description: fnT('advantages.fame.description'), cost: 2, type: 'advantage', levels: [2]},
            { id: 'herd_osiris', name: fnT('advantages.herd.name'), description: fnT('advantages.herd.description'), cost: 3, type: 'advantage', levels: [3]},
        ],
        flaws: [
            { id: 'enemy_osiris', name: fnT('flaws.enemy.name'), description: fnT('flaws.enemy.description'), cost: 2, type: 'flaw', levels: [2]},
            { id: 'shunned_osiris', name: fnT('flaws.shunned.name'), description: fnT('flaws.shunned.description'), cost: 2, type: 'flaw', levels: [2]}
        ],
        specialties: [],
        specialtyOptions: [
            { skill: Skill.Occult, name: fnT('predatorTypes.specialties.specificTradition') },
            { skill: Skill.Subterfuge, name: fnT('predatorTypes.specialties.seduction') }
        ]
    },
    { 
        id: 'sandman',
        name: fnT('predatorTypes.sandman.name'), 
        description: fnT('predatorTypes.sandman.description'),
        disciplineAdd: { discipline: "auspex", dots: 1 },
        humanityModifier: 0,
        advantages: [{ id: 'resources_sandman', name: fnT('advantages.resources.name'), description: fnT('advantages.resources.description'), cost: 1, type: 'advantage', levels: [1]}],
        flaws: [],
        specialties: [],
        specialtyOptions: [
            { skill: Skill.Medicine, name: fnT('predatorTypes.specialties.anesthetics') },
            { skill: Skill.Stealth, name: fnT('predatorTypes.specialties.breakIn') }
        ]
    },
    { 
        id: 'siren',
        name: fnT('predatorTypes.siren.name'), 
        description: fnT('predatorTypes.siren.description'),
        disciplineAdd: { discipline: "presence", dots: 1 },
        humanityModifier: 0,
        advantages: [{ id: 'beautiful_siren', name: fnT('advantages.beautiful.name'), description: fnT('advantages.beautiful.description'), cost: 2, type: 'advantage', levels: [2]}],
        flaws: [{ id: 'enemy_siren', name: fnT('flaws.enemy.name'), description: fnT('flaws.enemy.description'), cost: 1, type: 'flaw', levels: [1]}],
        specialties: [],
        specialtyOptions: [
            { skill: Skill.Persuasion, name: fnT('predatorTypes.specialties.seduction') },
            { skill: Skill.Subterfuge, name: fnT('predatorTypes.specialties.seduction') }
        ]
    },
    {
        id: 'business_owner',
        name: fnT('predatorTypes.businessowner.name'),
        description: fnT('predatorTypes.businessowner.description'),
        humanityModifier: 0,
        disciplineAdd: { discipline: "presence", dots: 1 }, // Selection between Dominate or Presence - defaulting or allowing both for logic
        advantages: [{ id: 'business_owner_background', name: fnT('advantages.businessowner_background.name'), description: fnT('advantages.businessowner_background.desc'), cost: 3, type: 'advantage', levels: [3] }],
        flaws: [{ id: 'routine_flaw', name: fnT('flaws.routine_flaw.name'), description: fnT('flaws.routine_flaw.desc'), cost: 2, type: 'flaw', levels: [2] }],
        specialties: [],
        specialtyOptions: [
            { skill: Skill.Persuasion, name: fnT('predatorTypes.specialties.deals') },
            { skill: Skill.Finance, name: fnT('predatorTypes.specialties.moneyLaundering') }
        ]
    },
    {
        id: 'confidant',
        name: fnT('predatorTypes.confidant.name'),
        description: fnT('predatorTypes.confidant.description'),
        humanityModifier: 0,
        disciplineAdd: { discipline: "presence", dots: 1 },
        advantages: [
            { id: 'supportive_presence', name: fnT('advantages.supportive_presence.name'), description: fnT('advantages.supportive_presence.desc'), cost: 1, type: 'advantage', levels: [1] },
            { id: 'remorseful_confidant', name: fnT('advantages.remorseful.name'), description: fnT('advantages.remorseful.name'), cost: 1, type: 'advantage', levels: [1] },
            { id: 'memoriam_dweller_confidant', name: fnT('advantages.memoriamdweller.name'), description: fnT('advantages.memoriamdweller.name'), cost: 1, type: 'advantage', levels: [1] }
        ],
        flaws: [{ id: 'conflicting_loyalties', name: fnT('flaws.conflicting_loyalties.name'), description: fnT('flaws.conflicting_loyalties.desc'), cost: 2, type: 'flaw', levels: [2] }],
        specialties: [],
        specialtyOptions: [
            { skill: Skill.Insight, name: fnT('predatorTypes.specialties.empathy') },
            { skill: Skill.Academics, name: fnT('predatorTypes.specialties.psychology') }
        ]
    },
    {
        id: 'corporate_leech',
        name: fnT('predatorTypes.corporateleech.name'),
        description: fnT('predatorTypes.corporateleech.description'),
        humanityModifier: 0,
        disciplineAdd: { discipline: "dominate", dots: 1 },
        advantages: [{ id: 'power_behind_throne', name: fnT('advantages.power_behind_throne.name'), description: fnT('advantages.power_behind_throne.desc'), cost: 3, type: 'advantage', levels: [3] }],
        flaws: [
            { id: 'dull_flaw', name: fnT('flaws.dull_flaw.name'), description: fnT('flaws.dull_flaw.desc'), cost: 1, type: 'flaw', levels: [1] },
            { id: 'dark_secret_corporate', name: fnT('flaws.dark_secret_corporate.name'), description: fnT('flaws.dark_secret_corporate.desc'), cost: 1, type: 'flaw', levels: [1] }
        ],
        specialties: [],
        specialtyOptions: [
            { skill: Skill.Finance, name: fnT('predatorTypes.specialties.corporate') },
            { skill: Skill.Etiquette, name: fnT('predatorTypes.specialties.corporate') }
        ]
    },
    {
        id: 'eat_the_rich',
        name: fnT('predatorTypes.eattherich.name'),
        description: fnT('predatorTypes.eattherich.description'),
        humanityModifier: 0,
        disciplineAdd: { discipline: "fortitude", dots: 1 },
        advantages: [{ id: 'clan_infiltrator_eattherich', name: fnT('advantages.claninfiltrator.name'), description: fnT('advantages.claninfiltrator.name'), cost: 3, type: 'advantage', levels: [3] }],
        flaws: [{ id: 'angry_beast_eattherich', name: fnT('flaws.angry_beast_flaw.name'), description: fnT('flaws.angry_beast_flaw.desc'), cost: 2, type: 'flaw', levels: [2] }],
        specialties: [],
        specialtyOptions: [
            { skill: Skill.Intimidation, name: fnT('predatorTypes.specialties.extortion') },
            { skill: Skill.Politics, name: fnT('predatorTypes.specialties.media') }
        ]
    },
    {
        id: 'hide_and_eat',
        name: fnT('predatorTypes.hideandeat.name'),
        description: fnT('predatorTypes.hideandeat.description'),
        humanityModifier: 0,
        disciplineAdd: { discipline: "obfuscate", dots: 1 },
        advantages: [
            { id: 'efficient_eater_hideandeat', name: fnT('advantages.efficienteater.name'), description: fnT('advantages.efficienteater.name'), cost: 2, type: 'advantage', levels: [2] },
            { id: 'slippery_hideandeat', name: fnT('advantages.slippery.name'), description: fnT('advantages.slippery.name'), cost: 1, type: 'advantage', levels: [1] }
        ],
        flaws: [{ id: 'obvious_predator_hideandeat', name: fnT('flaws.obvious_predator_flaw.name'), description: fnT('flaws.obvious_predator_flaw.desc'), cost: 2, type: 'flaw', levels: [2] }],
        specialties: [],
        specialtyOptions: [
            { skill: Skill.Stealth, name: fnT('predatorTypes.specialties.stalking') },
            { skill: Skill.Awareness, name: fnT('predatorTypes.specialties.ambushes') }
        ]
    },
    {
        id: 'kidnapper',
        name: fnT('predatorTypes.kidnapper.name'),
        description: fnT('predatorTypes.kidnapper.description'),
        humanityModifier: -1,
        disciplineAdd: { discipline: "dominate", dots: 1 },
        advantages: [{ id: 'base_haven_cell', name: fnT('advantages.base_haven_cell.name'), description: fnT('advantages.base_haven_cell.desc'), cost: 3, type: 'advantage', levels: [3] }],
        flaws: [{ id: 'sadistic_flaw', name: fnT('flaws.sadistic_flaw.name'), description: fnT('flaws.sadistic_flaw.desc'), cost: 2, type: 'flaw', levels: [2] }],
        specialties: [],
        specialtyOptions: [
            { skill: Skill.Craft, name: fnT('predatorTypes.specialties.security') },
            { skill: Skill.Investigation, name: fnT('predatorTypes.specialties.stalking') }
        ]
    },
    {
        id: 'lab_rat',
        name: fnT('predatorTypes.labrat.name'),
        description: fnT('predatorTypes.labrat.description'),
        humanityModifier: 0,
        disciplineAdd: { discipline: "bloodsorcery", dots: 1 },
        advantages: [{ id: 'improved_ghouls_labrat', name: fnT('advantages.improvedghouls.name'), description: fnT('advantages.improvedghouls.name'), cost: 3, type: 'advantage', levels: [3] }],
        flaws: [
            { id: 'blunted_fangs_labrat', name: fnT('flaws.bluntedfangs.name'), description: fnT('flaws.bluntedfangs.name'), cost: 1, type: 'flaw', levels: [1] },
            { id: 'addiction_labrat', name: fnT('flaws.addiction_labrat.name'), description: fnT('flaws.addiction_labrat.desc'), cost: 1, type: 'flaw', levels: [1] }
        ],
        specialties: [],
        specialtyOptions: [
            { skill: Skill.Medicine, name: fnT('predatorTypes.specialties.experiments') },
            { skill: Skill.Science, name: fnT('predatorTypes.specialties.experiments') }
        ]
    },
    {
        id: 'hospital_hunter',
        name: fnT('predatorTypes.hospitalhunter.name'),
        description: fnT('predatorTypes.hospitalhunter.description'),
        humanityModifier: 0,
        disciplineAdd: { discipline: "fortitude", dots: 1 },
        advantages: [{ id: 'blood_healer_hospitalhunter', name: fnT('advantages.bloodhealer.name'), description: fnT('advantages.bloodhealer.name'), cost: 3, type: 'advantage', levels: [3] }],
        flaws: [{ id: 'frigid_aura_hospitalhunter', name: fnT('flaws.frigid_aura_flaw.name'), description: fnT('flaws.frigid_aura_flaw.desc'), cost: 2, type: 'flaw', levels: [2] }],
        specialties: [],
        specialtyOptions: [
            { skill: Skill.Medicine, name: fnT('predatorTypes.specialties.diagnosis') },
            { skill: Skill.Persuasion, name: fnT('predatorTypes.specialties.condolence') }
        ]
    },
    {
        id: 'local_haunt',
        name: fnT('predatorTypes.localhaunt.name'),
        description: fnT('predatorTypes.localhaunt.description'),
        humanityModifier: 0,
        disciplineAdd: { discipline: "protean", dots: 1 },
        advantages: [{ id: 'loremaster_localhaunt', name: fnT('advantages.loremaster.name'), description: fnT('advantages.loremaster.name'), cost: 3, type: 'advantage', levels: [3] }],
        flaws: [{ id: 'eerie_presence_localhaunt', name: fnT('flaws.eerie_presence_flaw.name'), description: fnT('flaws.eerie_presence_flaw.desc'), cost: 2, type: 'flaw', levels: [2] }],
        specialties: [],
        specialtyOptions: [
            { skill: Skill.Intimidation, name: fnT('predatorTypes.specialties.frighten') },
            { skill: Skill.Athletics, name: fnT('predatorTypes.specialties.chasing') }
        ]
    },
    {
        id: 'lurker_in_crowd',
        name: fnT('predatorTypes.lurkerinthecrowd.name'),
        description: fnT('predatorTypes.lurkerinthecrowd.description'),
        humanityModifier: 0,
        disciplineAdd: { discipline: "obfuscate", dots: 1 },
        advantages: [{ id: 'obscure_lurkerincrowd', name: fnT('advantages.obscure.name'), description: fnT('advantages.obscure.name'), cost: 3, type: 'advantage', levels: [3] }],
        flaws: [{ id: 'outsider_lurkerincrowd', name: fnT('flaws.outsider_flaw_p.name'), description: fnT('flaws.outsider_flaw_p.desc'), cost: 2, type: 'flaw', levels: [2] }],
        specialties: [],
        specialtyOptions: [
            { skill: Skill.Stealth, name: fnT('predatorTypes.specialties.blendingIn') },
            { skill: Skill.Athletics, name: fnT('predatorTypes.specialties.escaping') }
        ]
    },
    {
        id: 'manic_pixie',
        name: fnT('predatorTypes.manicpixiepredator.name'),
        description: fnT('predatorTypes.manicpixiepredator.description'),
        humanityModifier: 0,
        disciplineAdd: { discipline: "presence", dots: 1 },
        advantages: [{ id: 'social_engineer_manicpixie', name: fnT('advantages.socialengineer.name'), description: fnT('advantages.socialengineer.name'), cost: 3, type: 'advantage', levels: [3] }],
        flaws: [{ id: 'cannot_embrace_manicpixie', name: fnT('flaws.cannot_embrace_flaw.name'), description: fnT('flaws.cannot_embrace_flaw.desc'), cost: 2, type: 'flaw', levels: [2] }],
        specialties: [],
        specialtyOptions: [
            { skill: Skill.Persuasion, name: fnT('predatorTypes.specialties.riskTaking') },
            { skill: Skill.Insight, name: fnT('predatorTypes.specialties.insecurities') }
        ]
    },
    {
        id: 'online_predator',
        name: fnT('predatorTypes.onlinepredator.name'),
        description: fnT('predatorTypes.onlinepredator.description'),
        humanityModifier: 0,
        disciplineAdd: { discipline: "obfuscate", dots: 1 },
        advantages: [{ id: 'mask_cobbler_online', name: fnT('advantages.mask_cobbler_online.name'), description: fnT('advantages.mask_cobbler_online.desc'), cost: 3, type: 'advantage', levels: [3] }],
        flaws: [{ id: 'paranoia_onlinepredator', name: fnT('flaws.paranoia_flaw_p.name'), description: fnT('flaws.paranoia_flaw_p.desc'), cost: 2, type: 'flaw', levels: [2] }],
        specialties: [],
        specialtyOptions: [
            { skill: Skill.Technology, name: fnT('predatorTypes.specialties.doxing') },
            { skill: Skill.Etiquette, name: fnT('predatorTypes.specialties.internetSubculture') }
        ]
    },
    {
        id: 'opportunist',
        name: fnT('predatorTypes.opportunist.name'),
        description: fnT('predatorTypes.opportunist.description'),
        humanityModifier: 0,
        disciplineAdd: { discipline: "presence", dots: 1 },
        advantages: [{ id: 'delay_destruction_opportunist', name: fnT('advantages.delaydestruction.name'), description: fnT('advantages.delaydestruction.name'), cost: 3, type: 'advantage', levels: [3] }],
        flaws: [{ id: 'overconfident_opportunist', name: fnT('flaws.overconfident_flaw_p.name'), description: fnT('flaws.overconfident_flaw_p.desc'), cost: 2, type: 'flaw', levels: [2] }],
        specialties: [],
        specialtyOptions: [
            { skill: Skill.Persuasion, name: fnT('predatorTypes.specialties.selling') },
            { skill: Skill.Insight, name: fnT('predatorTypes.specialties.desire') }
        ]
    },
    {
        id: 'pack_hunter',
        name: fnT('predatorTypes.packhunter.name'),
        description: fnT('predatorTypes.packhunter.description'),
        humanityModifier: 0,
        disciplineAdd: { discipline: "protean", dots: 1 },
        advantages: [{ id: 'apex_predator_packhunter', name: fnT('advantages.apexpredator.name'), description: fnT('advantages.apexpredator.name'), cost: 3, type: 'advantage', levels: [3] }],
        flaws: [
            { id: 'brash_packhunter', name: fnT('flaws.brash_flaw_p.name'), description: fnT('flaws.brash_flaw_p.desc'), cost: 1, type: 'flaw', levels: [1] },
            { id: 'deep_sleeper_packhunter', name: fnT('flaws.deep_sleeper_flaw.name'), description: fnT('flaws.deep_sleeper_flaw.desc'), cost: 1, type: 'flaw', levels: [1] }
        ],
        specialties: [],
        specialtyOptions: [
            { skill: Skill.AnimalKen, name: fnT('predatorTypes.specialties.carnivores') },
            { skill: Skill.Brawl, name: fnT('predatorTypes.specialties.packTactics') }
        ]
    },
    {
        id: 'pay_for_blood',
        name: fnT('predatorTypes.payforblood.name'),
        description: fnT('predatorTypes.payforblood.description'),
        humanityModifier: 0,
        disciplineAdd: { discipline: "dominate", dots: 1 },
        advantages: [{ id: 'resources_influence', name: fnT('advantages.resources_influence.name'), description: fnT('advantages.resources_influence.desc'), cost: 3, type: 'advantage', levels: [3] }],
        flaws: [{ id: 'despised_payforblood', name: fnT('flaws.despised_flaw_p.name'), description: fnT('flaws.despised_flaw_p.desc'), cost: 2, type: 'flaw', levels: [2] }],
        specialties: [],
        specialtyOptions: [
            { skill: Skill.Politics, name: fnT('predatorTypes.specialties.feedingHabits') },
            { skill: Skill.Finance, name: fnT('predatorTypes.specialties.followTheMoney') }
        ]
    },
    {
        id: 'street_feeder',
        name: fnT('predatorTypes.streetfeeder.name'),
        description: fnT('predatorTypes.streetfeeder.description'),
        humanityModifier: 0,
        disciplineAdd: { discipline: "potence", dots: 1 },
        advantages: [{ id: 'danger_sense_streetfeeder', name: fnT('advantages.dangersense.name'), description: fnT('advantages.dangersense.name'), cost: 3, type: 'advantage', levels: [3] }],
        flaws: [{ id: 'destitute_streetfeeder', name: fnT('flaws.destitute_flaw_p.name'), description: fnT('flaws.destitute_flaw_p.desc'), cost: 1, type: 'flaw', levels: [1] }],
        specialties: [],
        specialtyOptions: [
            { skill: Skill.Streetwise, name: fnT('predatorTypes.specialties.highCrimeAreas') },
            { skill: Skill.Brawl, name: fnT('predatorTypes.specialties.ambushes') }
        ]
    },
    {
        id: 'watcher_from_water',
        name: fnT('predatorTypes.watcherfromthewater.name'),
        description: fnT('predatorTypes.watcherfromthewater.description'),
        humanityModifier: 0,
        disciplineAdd: { discipline: "protean", dots: 1 },
        advantages: [
            { id: 'sharp_senses_watcher', name: fnT('advantages.sharpsenses.name'), description: fnT('advantages.sharpsenses.name'), cost: 2, type: 'advantage', levels: [2] },
            { id: 'slippery_watcher', name: fnT('advantages.slippery.name'), description: fnT('advantages.slippery.name'), cost: 1, type: 'advantage', levels: [1] }
        ],
        flaws: [{ id: 'no_haven_watcher', name: fnT('flaws.no_haven_flaw.name'), description: fnT('flaws.no_haven_flaw.desc'), cost: 1, type: 'flaw', levels: [1] }],
        specialties: [],
        specialtyOptions: [
            { skill: Skill.Athletics, name: fnT('predatorTypes.specialties.swimming') },
            { skill: Skill.Survival, name: fnT('predatorTypes.specialties.water') }
        ]
    },
    {
        id: 'wolf_sheep_clothing',
        name: fnT('predatorTypes.wolfinsheepsclothing.name'),
        description: fnT('predatorTypes.wolfinsheepsclothing.description'),
        humanityModifier: 0,
        disciplineAdd: { discipline: "fortitude", dots: 1 },
        advantages: [
            { id: 'daredevil_wolf', name: fnT('advantages.daredevil.name'), description: fnT('advantages.daredevil.name'), cost: 3, type: 'advantage', levels: [3] },
            { id: 'underestimated_wolf', name: fnT('advantages.underestimated.name'), description: fnT('advantages.underestimated.name'), cost: 1, type: 'advantage', levels: [1] }
        ],
        flaws: [{ id: 'deaths_kiss_wolf', name: fnT('flaws.deaths_kiss_flaw.name'), description: fnT('flaws.deaths_kiss_flaw.desc'), cost: 2, type: 'flaw', levels: [2] }],
        specialties: [],
        specialtyOptions: [
            { skill: Skill.Subterfuge, name: fnT('predatorTypes.specialties.feigningWeakness') },
            { skill: Skill.Melee, name: fnT('predatorTypes.specialties.hiddenWeapon') }
        ]
    }
];

export const fnGetAdvantagesAndFlaws = (fnT: TFunction, gameType: GameType | null): AdvantageFlaw[] => {
    const common: AdvantageFlaw[] = [
        { id: 'allies', name: fnT('advantages.allies.name'), description: fnT('advantages.allies.description'), cost: 1, type: 'advantage', levels: [1, 2, 3, 4, 5]},
        { id: 'contacts', name: fnT('advantages.contacts.name'), description: fnT('advantages.contacts.description'), cost: 1, type: 'advantage', levels: [1, 2, 3, 4, 5]},
        { id: 'fame', name: fnT('advantages.fame.name'), description: fnT('advantages.fame.description'), cost: 1, type: 'advantage', levels: [1, 2, 3, 4, 5]},
        { id: 'influence', name: fnT('advantages.influence.name'), description: fnT('advantages.influence.description'), cost: 1, type: 'advantage', levels: [1, 2, 3, 4, 5]},
        { id: 'resources', name: fnT('advantages.resources.name'), description: fnT('advantages.resources.description'), cost: 1, type: 'advantage', levels: [1, 2, 3, 4, 5]},
        { id: 'beautiful', name: fnT('advantages.beautiful.name'), description: fnT('advantages.beautiful.description'), cost: 2, type: 'advantage', levels: [2, 4]},
        { id: 'darksecret', name: fnT('flaws.darksecret.name'), description: fnT('flaws.darksecret.description'), cost: 1, type: 'flaw', levels: [1, 2]},
        { id: 'enemy', name: fnT('flaws.enemy.name'), description: fnT('flaws.enemy.description'), cost: 1, type: 'flaw', levels: [1, 2, 3, 4, 5]},
    ];

    if (gameType === GameType.Werewolf) {
        return [
            ...common,
            { id: 'safehouse_hidden', name: fnT('advantages.safehouse.name'), description: fnT('advantages.safehouse.hidden'), cost: 2, type: 'advantage', levels: [2]},
            { id: 'safehouse_secure', name: fnT('advantages.safehouse.name'), description: fnT('advantages.safehouse.secure'), cost: 2, type: 'advantage', levels: [2]},
            { id: 'caern_access', name: fnT('advantages.caern.name'), description: fnT('advantages.caern.access'), cost: 1, type: 'advantage', levels: [1]},
            { id: 'caern_awakened', name: fnT('advantages.caern.name'), description: fnT('advantages.caern.awakened'), cost: 5, type: 'advantage', levels: [5]},
            { id: 'job_basic', name: fnT('advantages.job.name'), description: fnT('advantages.job.basic'), cost: 1, type: 'advantage', levels: [1]},
            { id: 'job_confirmed', name: fnT('advantages.job.name'), description: fnT('advantages.job.confirmed'), cost: 2, type: 'advantage', levels: [2]},
            { id: 'linguistics', name: fnT('advantages.linguistics.name'), description: fnT('advantages.linguistics.desc'), cost: 1, type: 'advantage', levels: [1, 2, 3, 4, 5]},
            { id: 'moon_refreshed', name: fnT('advantages.moon.refreshed'), description: fnT('advantages.moon.refreshed'), cost: 1, type: 'advantage', levels: [1]},
            { id: 'moon_stoked', name: fnT('advantages.moon.stoked'), description: fnT('advantages.moon.stoked'), cost: 3, type: 'advantage', levels: [3]},
            { id: 'visual_goodwolfy', name: fnT('advantages.visual.goodwolfy'), description: fnT('advantages.visual.goodwolfy'), cost: 1, type: 'advantage', levels: [1]},
            { id: 'mask_zeroed', name: fnT('advantages.mask.zeroed'), description: fnT('advantages.mask.zeroed'), cost: 1, type: 'advantage', levels: [1]},
            { id: 'mask_cobbler', name: fnT('advantages.mask.cobbler'), description: fnT('advantages.mask.cobbler'), cost: 1, type: 'advantage', levels: [1]},
            { id: 'spiritpact_companion', name: fnT('advantages.spiritpact.companion'), description: fnT('advantages.spiritpact.companion'), cost: 2, type: 'advantage', levels: [2]},
            { id: 'spiritpact_host', name: fnT('advantages.spiritpact.host'), description: fnT('advantages.spiritpact.host'), cost: 1, type: 'advantage', levels: [1]},
            { id: 'talisman', name: fnT('advantages.talisman.name'), description: fnT('advantages.talisman.desc'), cost: 1, type: 'advantage', levels: [1, 2, 3, 4, 5]},
            
            { id: 'substanceAbuse_incurable', name: fnT('flaws.substanceAbuse.incurable'), description: fnT('flaws.substanceAbuse.incurable'), cost: 2, type: 'flaw', levels: [2]},
            { id: 'substanceAbuse_dependency', name: fnT('flaws.substanceAbuse.dependency'), description: fnT('flaws.substanceAbuse.dependency'), cost: 1, type: 'flaw', levels: [1]},
            { id: 'caernPariah', name: fnT('flaws.caernPariah.name'), description: fnT('flaws.caernPariah.description'), cost: 1, type: 'flaw', levels: [1]},
            { id: 'illiterate', name: fnT('flaws.illiterate.name'), description: fnT('flaws.illiterate.description'), cost: 2, type: 'flaw', levels: [2]},
            { id: 'folkloric_bane', name: fnT('flaws.folkloric.bane'), description: fnT('flaws.folkloric.bane'), cost: 1, type: 'flaw', levels: [1]},
            { id: 'folkloric_taboo', name: fnT('flaws.folkloric.taboo'), description: fnT('flaws.folkloric.taboo'), cost: 1, type: 'flaw', levels: [1]},
            { id: 'folkloric_sign', name: fnT('flaws.folkloric.sign'), description: fnT('flaws.folkloric.sign'), cost: 1, type: 'flaw', levels: [1]},
            { id: 'croneCurse', name: fnT('flaws.croneCurse.name'), description: fnT('flaws.croneCurse.description'), cost: 2, type: 'flaw', levels: [2]},
            { id: 'moonSlave', name: fnT('flaws.moonSlave.name'), description: fnT('flaws.moonSlave.description'), cost: 2, type: 'flaw', levels: [2]},
            { id: 'visualFlaw_repulsive', name: fnT('flaws.visualFlaw.repulsive'), description: fnT('flaws.visualFlaw.repulsive'), cost: 2, type: 'flaw', levels: [2]},
            { id: 'visualFlaw_ugly', name: fnT('flaws.visualFlaw.ugly'), description: fnT('flaws.visualFlaw.ugly'), cost: 1, type: 'flaw', levels: [1]},
            { id: 'infamy', name: fnT('flaws.infamy.name'), description: fnT('flaws.infamy.description'), cost: 2, type: 'flaw', levels: [2]},
            { id: 'infamousPartner', name: fnT('flaws.infamousPartner.name'), description: fnT('flaws.infamousPartner.description'), cost: 1, type: 'flaw', levels: [1]},
            { id: 'suspect', name: fnT('flaws.suspect.name'), description: fnT('flaws.suspect.description'), cost: 2, type: 'flaw', levels: [2]},
            { id: 'recurringError', name: fnT('flaws.recurringError.name'), description: fnT('flaws.recurringError.description'), cost: 1, type: 'flaw', levels: [1]},
            { id: 'adversary', name: fnT('flaws.adversary.name'), description: fnT('flaws.adversary.description'), cost: 1, type: 'flaw', levels: [1, 2, 3]},
            { id: 'conditionalPact', name: fnT('flaws.conditionalPact.name'), description: fnT('flaws.conditionalPact.description'), cost: 1, type: 'flaw', levels: [1]},
            { id: 'destitute', name: fnT('flaws.destitute.name'), description: fnT('flaws.destitute.description'), cost: 1, type: 'flaw', levels: [1]},
            { id: 'wyrmMarked', name: fnT('flaws.wyrmMarked.name'), description: fnT('flaws.wyrmMarked.description'), cost: 1, type: 'flaw', levels: [1, 2] },
            { id: 'moonBane', name: fnT('flaws.moonBane.name'), description: fnT('flaws.moonBane.description'), cost: 1, type: 'flaw', levels: [1] },
            { id: 'hellHound', name: fnT('flaws.hellHound.name'), description: fnT('flaws.hellHound.description'), cost: 2, type: 'flaw', levels: [2] },
            { id: 'wolfMan', name: fnT('flaws.wolfMan.name'), description: fnT('flaws.wolfMan.description'), cost: 2, type: 'flaw', levels: [2] },
            { id: 'wyrmTouched_calamity', name: fnT('flaws.wyrmTouched.name'), description: fnT('flaws.wyrmTouched.calamity'), cost: 2, type: 'flaw', levels: [2] },
            { id: 'wyrmTouched_soulEater', name: fnT('flaws.wyrmTouched.name'), description: fnT('flaws.wyrmTouched.soulEater'), cost: 2, type: 'flaw', levels: [2] },
            { id: 'wyrmTouched_corruption', name: fnT('flaws.wyrmTouched.name'), description: fnT('flaws.wyrmTouched.corruption'), cost: 2, type: 'flaw', levels: [2] },
            
            { id: 'visual_imposingGlabro', name: fnT('advantages.visual.imposingGlabro'), description: fnT('advantages.visual.imposingGlabro'), cost: 2, type: 'advantage', levels: [2] },
            { id: 'metamorphosis_lunaResilience', name: fnT('advantages.metamorphosis.lunaResilience'), description: fnT('advantages.metamorphosis.lunaResilience'), cost: 2, type: 'advantage', levels: [2] },
            { id: 'supernatural_formMastery', name: fnT('advantages.supernatural.formMastery'), description: fnT('advantages.supernatural.formMastery'), cost: 1, type: 'advantage', levels: [1, 2, 3, 4, 5] },
            { id: 'heritage_thickSkin', name: fnT('advantages.heritage.thickSkin'), description: fnT('advantages.heritage.thickSkin'), cost: 3, type: 'advantage', levels: [3] },
        ];
    }

    return [
        ...common,
        { id: 'haven', name: fnT('advantages.haven.name'), description: fnT('advantages.haven.description'), cost: 1, type: 'advantage', levels: [1, 2, 3, 4, 5]},
        { id: 'herd', name: fnT('advantages.herd.name'), description: fnT('advantages.herd.description'), cost: 1, type: 'advantage', levels: [1, 2, 3, 4, 5]},
        { id: 'bloodhound', name: fnT('advantages.bloodhound.name'), description: fnT('advantages.bloodhound.description'), cost: 1, type: 'advantage', levels: [1]},

        { id: 'calmheart', name: fnT('advantages.calmheart.name'), description: "", cost: 4, type: 'advantage', levels: [4] },
        { id: 'daredevil', name: fnT('advantages.daredevil.name'), description: "", cost: 3, type: 'advantage', levels: [3] },
        { id: 'codeofhonor', name: fnT('advantages.codeofhonor.name'), description: "", cost: 2, type: 'advantage', levels: [2] },
        { id: 'fastlearner', name: fnT('advantages.fastlearner.name'), description: "", cost: 5, type: 'advantage', levels: [5] },
        { id: 'focused', name: fnT('advantages.focused.name'), description: "", cost: 1, type: 'advantage', levels: [1] },
        { id: 'headstrong', name: fnT('advantages.headstrong.name'), description: "", cost: 4, type: 'advantage', levels: [4] },
        { id: 'highhumanity', name: fnT('advantages.highhumanity.name'), description: "", cost: 3, type: 'advantage', levels: [3] },
        { id: 'ironwill', name: fnT('advantages.ironwill.name'), description: "", cost: 4, type: 'advantage', levels: [4] },
        { id: 'jackofalltrades', name: fnT('advantages.jackofalltrades.name'), description: "", cost: 4, type: 'advantage', levels: [4] },
        { id: 'expertinstructor', name: fnT('advantages.expertinstructor.name'), description: "", cost: 1, type: 'advantage', levels: [1] },
        { id: 'remorseful_merit', name: fnT('advantages.remorseful.name'), description: "", cost: 1, type: 'advantage', levels: [1] },
        { id: 'loremaster_merit_v', name: fnT('advantages.loremaster.name'), description: "", cost: 2, type: 'advantage', levels: [2] },
        { id: 'totalrecall', name: fnT('advantages.totalrecall.name'), description: "", cost: 1, type: 'advantage', levels: [1] },
        { id: 'crackdriver', name: fnT('advantages.crackdriver.name'), description: "", cost: 1, type: 'advantage', levels: [1] },
        { id: 'lightsleeper', name: fnT('advantages.lightsleeper.name'), description: "", cost: 3, type: 'advantage', levels: [3] },
        { id: 'sharpsenses', name: fnT('advantages.sharpsenses.name'), description: "", cost: 1, type: 'advantage', levels: [1] },
        { id: 'slippery_merit_v', name: fnT('advantages.slippery.name'), description: "", cost: 1, type: 'advantage', levels: [1] },
        { id: 'skillaptitude', name: fnT('advantages.skillaptitude.name'), description: "", cost: 4, type: 'advantage', levels: [4] },
        { id: 'tough_merit', name: fnT('advantages.tough.name'), description: "", cost: 4, type: 'advantage', levels: [4] },
        { id: 'unstakeable', name: fnT('advantages.unstakeable.name'), description: "", cost: 6, type: 'advantage', levels: [6] },
        { id: 'claninfiltrator_merit', name: fnT('advantages.claninfiltrator.name'), description: "", cost: 3, type: 'advantage', levels: [3] },
        { id: 'inspiringpresence', name: fnT('advantages.inspiringpresence.name'), description: "", cost: 1, type: 'advantage', levels: [1] },
        { id: 'prestigioussire', name: fnT('advantages.prestigioussire.name'), description: "", cost: 1, type: 'advantage', levels: [1] },
        { id: 'socialengineer_merit', name: fnT('advantages.socialengineer.name'), description: "", cost: 3, type: 'advantage', levels: [3] },
        { id: 'stalwartloyalty', name: fnT('advantages.stalwartloyalty.name'), description: "", cost: 1, type: 'advantage', levels: [1] },
        { id: 'underestimated_merit_v', name: fnT('advantages.underestimated.name'), description: "", cost: 1, type: 'advantage', levels: [1] },
        { id: 'aftermealglow', name: fnT('advantages.aftermealglow.name'), description: "", cost: 1, type: 'advantage', levels: [1] },
        { id: 'alchemyexpert', name: fnT('advantages.alchemyexpert.name'), description: "", cost: 5, type: 'advantage', levels: [5] },
        { id: 'animalaffinity', name: fnT('advantages.animalaffinity.name'), description: "", cost: 3, type: 'advantage', levels: [3] },
        { id: 'apexpredator_merit', name: fnT('advantages.apexpredator.name'), description: "", cost: 3, type: 'advantage', levels: [3] },
        { id: 'berserker', name: fnT('advantages.berserker.name'), description: "", cost: 3, type: 'advantage', levels: [3] },
        { id: 'bloodhealer_merit', name: fnT('advantages.bloodhealer.name'), description: "", cost: 3, type: 'advantage', levels: [3] },
        { id: 'delaydestruction_merit', name: fnT('advantages.delaydestruction.name'), description: "", cost: 3, type: 'advantage', levels: [3] },
        { id: 'dangersense_merit', name: fnT('advantages.dangersense.name'), description: "", cost: 3, type: 'advantage', levels: [3] },
        { id: 'demonicpact', name: fnT('advantages.demonicpact.name'), description: "", cost: 5, type: 'advantage', levels: [5] },
        { id: 'diablerist', name: fnT('advantages.diablerist.name'), description: "", cost: 4, type: 'advantage', levels: [4] },
        { id: 'disciplinecompetence', name: fnT('advantages.disciplinecompetence.name'), description: "", cost: 6, type: 'advantage', levels: [6] },
        { id: 'efficienteater_merit', name: fnT('advantages.efficienteater.name'), description: "", cost: 3, type: 'advantage', levels: [3] },
        { id: 'fasteater', name: fnT('advantages.fasteater.name'), description: "", cost: 3, type: 'advantage', levels: [3] },
        { id: 'fasthealer', name: fnT('advantages.fasthealer.name'), description: "", cost: 4, type: 'advantage', levels: [4] },
        { id: 'friendtofae', name: fnT('advantages.friendtofae.name'), description: "", cost: 3, type: 'advantage', levels: [3] },
        { id: 'holyaura', name: fnT('advantages.holyaura.name'), description: "", cost: 3, type: 'advantage', levels: [3] },
        { id: 'improvedghouls_merit', name: fnT('advantages.improvedghouls.name'), description: "", cost: 3, type: 'advantage', levels: [3] },
        { id: 'magicresistance', name: fnT('advantages.magicresistance.name'), description: "", cost: 4, type: 'advantage', levels: [4] },
        { id: 'memoriamdweller_merit', name: fnT('advantages.memoriamdweller.name'), description: "", cost: 1, type: 'advantage', levels: [1] },
        { id: 'obscure_merit_v', name: fnT('advantages.obscure.name'), description: "", cost: 1, type: 'advantage', levels: [1, 2, 3, 4, 5] },
        { id: 'powerfulvitae', name: fnT('advantages.powerfulvitae.name'), description: "", cost: 5, type: 'advantage', levels: [5] },
        { id: 'risingsun', name: fnT('advantages.risingsun.name'), description: "", cost: 3, type: 'advantage', levels: [3] },
        { id: 'spiritmentor', name: fnT('advantages.spiritmentor.name'), description: "", cost: 5, type: 'advantage', levels: [5] },
        { id: 'thaumaturgictraining', name: fnT('advantages.thaumaturgictraining.name'), description: "", cost: 5, type: 'advantage', levels: [5] },
        { id: 'truebond', name: fnT('advantages.truebond.name'), description: "", cost: 4, type: 'advantage', levels: [4] },
        { id: 'truefaith', name: fnT('advantages.truefaith.name'), description: "", cost: 6, type: 'advantage', levels: [6] },
        { id: 'truesight', name: fnT('advantages.truesight.name'), description: "", cost: 1, type: 'advantage', levels: [1, 2, 3, 4, 5] },
        { id: 'mysticalitem', name: fnT('advantages.mysticalitem.name'), description: "", cost: 2, type: 'advantage', levels: [2] },

        { id: 'addiction', name: fnT('flaws.addiction.name'), description: fnT('flaws.addiction.description'), cost: 1, type: 'flaw', levels: [1, 2]},
        { id: 'haunted', name: fnT('flaws.haunted.name'), description: fnT('flaws.haunted.description'), cost: 1, type: 'flaw', levels: [1, 2, 5]},
        { id: 'shunned', name: fnT('flaws.shunned.name'), description: fnT('flaws.shunned.description'), cost: 1, type: 'flaw', levels: [2]},
        { id: 'amnesia', name: fnT('flaws.amnesia.name'), description: "", cost: 5, type: 'flaw', levels: [5] },
        { id: 'curiosity', name: fnT('flaws.curiosity.name'), description: "", cost: 3, type: 'flaw', levels: [3] },
        { id: 'impatient', name: fnT('flaws.impatient.name'), description: "", cost: 4, type: 'flaw', levels: [4] },
        { id: 'paranoia', name: fnT('flaws.paranoia.name'), description: "", cost: 2, type: 'flaw', levels: [2] },
        { id: 'routine', name: fnT('flaws.routine.name'), description: "", cost: 2, type: 'flaw', levels: [2] },
        { id: 'morbidfascination', name: fnT('flaws.morbidfascination.name'), description: "", cost: 3, type: 'flaw', levels: [3] },
        { id: 'nightmares', name: fnT('flaws.nightmares.name'), description: "", cost: 5, type: 'flaw', levels: [5] },
        { id: 'sadist', name: fnT('flaws.sadist.name'), description: "", cost: 2, type: 'flaw', levels: [2] },
        { id: 'vengeful', name: fnT('flaws.vengeful.name'), description: "", cost: 4, type: 'flaw', levels: [4] },
        { id: 'weakwilled', name: fnT('flaws.weakwilled.name'), description: "", cost: 2, type: 'flaw', levels: [2] },
        { id: 'softhearted', name: fnT('flaws.softhearted.name'), description: "", cost: 5, type: 'flaw', levels: [5] },
        { id: 'bluntedfangs', name: fnT('flaws.bluntedfangs.name'), description: "", cost: 2, type: 'flaw', levels: [2] },
        { id: 'childlike', name: fnT('flaws.childlike.name'), description: "", cost: 5, type: 'flaw', levels: [5] },
        { id: 'fleshofthecorpse', name: fnT('flaws.fleshofthecorpse.name'), description: "", cost: 4, type: 'flaw', levels: [4] },
        { id: 'fragile', name: fnT('flaws.fragile.name'), description: "", cost: 5, type: 'flaw', levels: [5] },
        { id: 'stenchofdeath', name: fnT('flaws.stenchofdeath.name'), description: "", cost: 3, type: 'flaw', levels: [3] },
        { id: 'weakstomach', name: fnT('flaws.weakstomach.name'), description: "", cost: 2, type: 'flaw', levels: [2] },
        { id: 'mistakenidentity', name: fnT('flaws.mistakenidentity.name'), description: "", cost: 3, type: 'flaw', levels: [3] },
        { id: 'notorioussire', name: fnT('flaws.notorioussire.name'), description: "", cost: 1, type: 'flaw', levels: [1] },
        { id: 'oathbreaker', name: fnT('flaws.oathbreaker.name'), description: "", cost: 1, type: 'flaw', levels: [1] },
        { id: 'outsider_flaw_v', name: fnT('flaws.outsider.name'), description: "", cost: 2, type: 'flaw', levels: [2] },
        { id: 'brash_flaw_v', name: fnT('flaws.brash.name'), description: "", cost: 1, type: 'flaw', levels: [1] },
        { id: 'conflictingloyalties_flaw', name: fnT('flaws.conflictingloyalties.name'), description: "", cost: 2, type: 'flaw', levels: [2] },
        { id: 'dull_flaw_v', name: fnT('flaws.dull.name'), description: "", cost: 2, type: 'flaw', levels: [2] },
        { id: 'hunted', name: fnT('flaws.hunted.name'), description: "", cost: 5, type: 'flaw', levels: [5] },
        { id: 'intolerance', name: fnT('flaws.intolerance.name'), description: "", cost: 4, type: 'flaw', levels: [4] },
        { id: 'markedfordeath', name: fnT('flaws.markedfordeath.name'), description: "", cost: 5, type: 'flaw', levels: [5] },
        { id: 'overconfident_flaw_v', name: fnT('flaws.overconfident.name'), description: "", cost: 3, type: 'flaw', levels: [3] },
        { id: 'twistedupbringing', name: fnT('flaws.twistedupbringing.name'), description: "", cost: 4, type: 'flaw', levels: [4] },
        { id: 'angrybeast_flaw', name: fnT('flaws.angrybeast.name'), description: "", cost: 2, type: 'flaw', levels: [2] },
        { id: 'appetizingblood', name: fnT('flaws.appetizingblood.name'), description: "", cost: 4, type: 'flaw', levels: [4] },
        { id: 'beaconofunholy', name: fnT('flaws.beaconofunholy.name'), description: "", cost: 2, type: 'flaw', levels: [2] },
        { id: 'cannotembrace_flaw', name: fnT('flaws.cannotembrace.name'), description: "", cost: 2, type: 'flaw', levels: [2] },
        { id: 'cursed', name: fnT('flaws.cursed.name'), description: "", cost: 2, type: 'flaw', levels: [2] },
        { id: 'eeriepresence_flaw', name: fnT('flaws.eeriepresence.name'), description: "", cost: 2, type: 'flaw', levels: [2] },
        { id: 'deathskiss_flaw', name: fnT('flaws.deathskiss.name'), description: "", cost: 2, type: 'flaw', levels: [2] },
        { id: 'deepsleeper_flaw', name: fnT('flaws.deepsleeper.name'), description: "", cost: 1, type: 'flaw', levels: [1] },
        { id: 'disciplineinept', name: fnT('flaws.disciplineinept.name'), description: "", cost: 3, type: 'flaw', levels: [3] },
        { id: 'frigidaura_flaw', name: fnT('flaws.frigidaura.name'), description: "", cost: 2, type: 'flaw', levels: [2] },
        { id: 'magicsusceptibility', name: fnT('flaws.magicsusceptibility.name'), description: "", cost: 4, type: 'flaw', levels: [4] },
        { id: 'grimwounds', name: fnT('flaws.grimwounds.name'), description: "", cost: 3, type: 'flaw', levels: [3] },
        { id: 'repulsivetoanimals', name: fnT('flaws.repulsivetoanimals.name'), description: "", cost: 3, type: 'flaw', levels: [3] },
        { id: 'taintofcorruption', name: fnT('flaws.taintofcorruption.name'), description: "", cost: 3, type: 'flaw', levels: [3] },
        { id: 'taintedblood', name: fnT('flaws.taintedblood.name'), description: "", cost: 5, type: 'flaw', levels: [5] },
        { id: 'thirstforinnocence', name: fnT('flaws.thirstforinnocence.name'), description: "", cost: 4, type: 'flaw', levels: [4] },
        { id: 'weakblood', name: fnT('flaws.weakblood.name'), description: "", cost: 5, type: 'flaw', levels: [5] },
        { id: 'curseditem', name: fnT('flaws.curseditem.name'), description: "", cost: 2, type: 'flaw', levels: [2] },
    ];
};

export const fnGetLoresheets = (fnT: TFunction): Loresheet[] => [
    {
        id: "watcherOfMalditos",
        name: fnT('loresheets.watcherOfMalditos.name'),
        description: fnT('loresheets.watcherOfMalditos.description'),
        levels: [
            { level: 1, name: fnT('loresheets.watcherOfMalditos.level1.name'), description: fnT('loresheets.watcherOfMalditos.level1.description'), system: fnT('loresheets.watcherOfMalditos.level1.system') },
            { level: 2, name: fnT('loresheets.watcherOfMalditos.level2.name'), description: fnT('loresheets.watcherOfMalditos.level2.description'), system: fnT('loresheets.watcherOfMalditos.level2.system') },
            { level: 3, name: fnT('loresheets.watcherOfMalditos.level3.name'), description: fnT('loresheets.watcherOfMalditos.level3.description'), system: fnT('loresheets.watcherOfMalditos.level3.system') },
            { level: 4, name: fnT('loresheets.watcherOfMalditos.level4.name'), description: fnT('loresheets.watcherOfMalditos.level4.description'), system: fnT('loresheets.watcherOfMalditos.level4.system') },
            { level: 5, name: fnT('loresheets.watcherOfMalditos.level5.name'), description: fnT('loresheets.watcherOfMalditos.level5.description'), system: fnT('loresheets.watcherOfMalditos.level5.system') },
        ]
    },
    {
        id: "theSkinner",
        name: fnT('loresheets.theSkinner.name'),
        description: fnT('loresheets.theSkinner.description'),
        levels: [
            { level: 1, name: fnT('loresheets.theSkinner.level1.name'), description: fnT('loresheets.theSkinner.level1.description'), system: fnT('loresheets.theSkinner.level1.system') },
            { level: 2, name: fnT('loresheets.theSkinner.level2.name'), description: fnT('loresheets.theSkinner.level2.description'), system: fnT('loresheets.theSkinner.level2.system') },
            { level: 3, name: fnT('loresheets.theSkinner.level3.name'), description: fnT('loresheets.theSkinner.level3.description'), system: fnT('loresheets.theSkinner.level3.system') },
            { level: 4, name: fnT('loresheets.theSkinner.level4.name'), description: fnT('loresheets.theSkinner.level4.description'), system: fnT('loresheets.theSkinner.level4.system') },
            { level: 5, name: fnT('loresheets.theSkinner.level5.name'), description: fnT('loresheets.theSkinner.level5.description'), system: fnT('loresheets.theSkinner.level5.system') },
        ]
    },
    {
        id: "zhyzhak",
        name: fnT('loresheets.zhyzhak.name'),
        description: fnT('loresheets.zhyzhak.description'),
        levels: [
            { level: 1, name: fnT('loresheets.zhyzhak.level1.name'), description: fnT('loresheets.zhyzhak.level1.description'), system: fnT('loresheets.zhyzhak.level1.system') },
            { level: 2, name: fnT('loresheets.zhyzhak.level2.name'), description: fnT('loresheets.zhyzhak.level2.description'), system: fnT('loresheets.zhyzhak.level2.system') },
            { level: 3, name: fnT('loresheets.zhyzhak.level3.name'), description: fnT('loresheets.zhyzhak.level3.description'), system: fnT('loresheets.zhyzhak.level3.system') },
            { level: 4, name: fnT('loresheets.zhyzhak.level4.name'), description: fnT('loresheets.zhyzhak.level4.description'), system: fnT('loresheets.zhyzhak.level4.system') },
            { level: 5, name: fnT('loresheets.zhyzhak.level5.name'), description: fnT('loresheets.zhyzhak.level5.description'), system: fnT('loresheets.zhyzhak.level5.system') },
        ]
    },
    {
        id: "saboteurs",
        name: fnT('loresheets.saboteurs.name'),
        description: fnT('loresheets.saboteurs.description'),
        levels: [
            { level: 1, name: fnT('loresheets.saboteurs.level1.name'), description: fnT('loresheets.saboteurs.level1.description'), system: fnT('loresheets.saboteurs.level1.system') },
            { level: 2, name: fnT('loresheets.saboteurs.level2.name'), description: fnT('loresheets.saboteurs.level2.description'), system: fnT('loresheets.saboteurs.level2.system') },
            { level: 3, name: fnT('loresheets.saboteurs.level3.name'), description: fnT('loresheets.saboteurs.level3.description'), system: fnT('loresheets.saboteurs.level3.system') },
            { level: 4, name: fnT('loresheets.saboteurs.level4.name'), description: fnT('loresheets.saboteurs.level4.description'), system: fnT('loresheets.saboteurs.level4.system') },
            { level: 5, name: fnT('loresheets.saboteurs.level5.name'), description: fnT('loresheets.saboteurs.level5.description'), system: fnT('loresheets.saboteurs.level5.system') },
        ]
    },
    {
        id: "projectTwilight",
        name: fnT('loresheets.projectTwilight.name'),
        description: fnT('loresheets.projectTwilight.description'),
        levels: [
            { level: 1, name: fnT('loresheets.projectTwilight.level1.name'), description: fnT('loresheets.projectTwilight.level1.description'), system: fnT('loresheets.projectTwilight.level1.system') },
            { level: 2, name: fnT('loresheets.projectTwilight.level2.name'), description: fnT('loresheets.projectTwilight.level2.description'), system: fnT('loresheets.projectTwilight.level2.system') },
            { level: 3, name: fnT('loresheets.projectTwilight.level3.name'), description: fnT('loresheets.projectTwilight.level3.description'), system: fnT('loresheets.projectTwilight.level3.system') },
            { level: 4, name: fnT('loresheets.projectTwilight.level4.name'), description: fnT('loresheets.projectTwilight.level4.description'), system: fnT('loresheets.projectTwilight.level4.system') },
            { level: 5, name: fnT('loresheets.projectTwilight.level5.name'), description: fnT('loresheets.projectTwilight.level5.description'), system: fnT('loresheets.projectTwilight.level5.system') },
        ]
    },
    {
        id: "umbralTraveler",
        name: fnT('loresheets.umbralTraveler.name'),
        description: fnT('loresheets.umbralTraveler.description'),
        levels: [
            { level: 1, name: fnT('loresheets.umbralTraveler.level1.name'), description: fnT('loresheets.umbralTraveler.level1.description'), system: fnT('loresheets.umbralTraveler.level1.system') },
            { level: 2, name: fnT('loresheets.umbralTraveler.level2.name'), description: fnT('loresheets.umbralTraveler.level2.description'), system: fnT('loresheets.umbralTraveler.level2.system') },
            { level: 3, name: fnT('loresheets.umbralTraveler.level3.name'), description: fnT('loresheets.umbralTraveler.level3.description'), system: fnT('loresheets.umbralTraveler.level3.system') },
            { level: 4, name: fnT('loresheets.umbralTraveler.level4.name'), description: fnT('loresheets.umbralTraveler.level4.description'), system: fnT('loresheets.umbralTraveler.level4.system') },
            { level: 5, name: fnT('loresheets.umbralTraveler.level5.name'), description: fnT('loresheets.umbralTraveler.level5.description'), system: fnT('loresheets.umbralTraveler.level5.system') },
        ]
    },
    {
        id: "renegadeFenrir",
        name: fnT('loresheets.renegadeFenrir.name'),
        description: fnT('loresheets.renegadeFenrir.description'),
        levels: [
            { level: 1, name: fnT('loresheets.renegadeFenrir.level1.name'), description: fnT('loresheets.renegadeFenrir.level1.description'), system: fnT('loresheets.renegadeFenrir.level1.system') },
            { level: 2, name: fnT('loresheets.renegadeFenrir.level2.name'), description: fnT('loresheets.renegadeFenrir.level2.description'), system: fnT('loresheets.renegadeFenrir.level2.system') },
            { level: 3, name: fnT('loresheets.renegadeFenrir.level3.name'), description: fnT('loresheets.renegadeFenrir.level3.description'), system: fnT('loresheets.renegadeFenrir.level3.system') },
            { level: 4, name: fnT('loresheets.renegadeFenrir.level4.name'), description: fnT('loresheets.renegadeFenrir.level4.description'), system: fnT('loresheets.renegadeFenrir.level4.system') },
            { level: 5, name: fnT('loresheets.renegadeFenrir.level5.name'), description: fnT('loresheets.renegadeFenrir.level5.description'), system: fnT('loresheets.renegadeFenrir.level5.system') },
        ]
    },
    {
        id: "theBlackSpiral",
        name: fnT('loresheets.theBlackSpiral.name'),
        description: fnT('loresheets.theBlackSpiral.description'),
        levels: [
            { level: 1, name: fnT('loresheets.theBlackSpiral.level1.name'), description: fnT('loresheets.theBlackSpiral.level1.description'), system: fnT('loresheets.theBlackSpiral.level1.system') },
            { level: 2, name: fnT('loresheets.theBlackSpiral.level2.name'), description: fnT('loresheets.theBlackSpiral.level2.description'), system: fnT('loresheets.theBlackSpiral.level2.system') },
            { level: 3, name: fnT('loresheets.theBlackSpiral.level3.name'), description: fnT('loresheets.theBlackSpiral.level3.description'), system: fnT('loresheets.theBlackSpiral.level3.system') },
            { level: 4, name: fnT('loresheets.theBlackSpiral.level4.name'), description: fnT('loresheets.theBlackSpiral.level4.description'), system: fnT('loresheets.theBlackSpiral.level4.system') },
            { level: 5, name: fnT('loresheets.theBlackSpiral.level5.name'), description: fnT('loresheets.theBlackSpiral.level5.description'), system: fnT('loresheets.theBlackSpiral.level5.system') },
        ]
    }
];

export const fnGetRituals = (fnT: TFunction): { id: string, name: string, description: string }[] => [
    { id: "confinement", name: fnT('disciplines.werewolfRituals.confinement.name'), description: fnT('disciplines.werewolfRituals.confinement.description') },
    { id: "conquest", name: fnT('disciplines.werewolfRituals.social.conquest.name'), description: fnT('disciplines.werewolfRituals.social.conquest.description') },
    { id: "winterWolf", name: fnT('disciplines.werewolfRituals.social.winterWolf.name'), description: fnT('disciplines.werewolfRituals.social.winterWolf.description') }
];

export const fnGetTalismans = (fnT: TFunction): { id: string, name: string, description: string }[] => [
    { id: "spiritCatcher", name: fnT('disciplines.werewolfTalismans.spiritCatcher.name'), description: fnT('disciplines.werewolfTalismans.spiritCatcher.description') },
    { id: "windWhistle", name: fnT('disciplines.werewolfTalismans.windWhistle.name'), description: fnT('disciplines.werewolfTalismans.windWhistle.description') },
    { id: "klaive", name: fnT('disciplines.werewolfTalismans.klaive.name'), description: fnT('disciplines.werewolfTalismans.klaive.description') },
    { id: "tearOfGaia", name: fnT('disciplines.werewolfTalismans.tearOfGaia.name'), description: fnT('disciplines.werewolfTalismans.tearOfGaia.description') },
    { id: "heraldHorn", name: fnT('disciplines.werewolfTalismans.heraldHorn.name'), description: fnT('disciplines.werewolfTalismans.heraldHorn.description') },
    { id: "kingBrennusHammer", name: fnT('disciplines.werewolfTalismans.kingBrennusHammer.name'), description: fnT('disciplines.werewolfTalismans.kingBrennusHammer.description') },
    { id: "heatStone", name: fnT('disciplines.werewolfTalismans.heatStone.name'), description: fnT('disciplines.werewolfTalismans.heatStone.description') },
    { id: "assassinCrown", name: fnT('disciplines.werewolfTalismans.assassinCrown.name'), description: fnT('disciplines.werewolfTalismans.assassinCrown.description') },
    { id: "ironAxe", name: fnT('disciplines.werewolfTalismans.ironAxe.name'), description: fnT('disciplines.werewolfTalismans.ironAxe.description') },
    { id: "boneScourge", name: fnT('disciplines.werewolfTalismans.boneScourge.name'), description: fnT('disciplines.werewolfTalismans.boneScourge.description') }
];

// Helper to shorten looking up standard keys
const fnGetP = (fnT: TFunction, sDisc: string, nLvl: number, sKey: string, amalgam?: { discipline: string, level: number }[], prerequisite?: string) => {
    const sSystem = fnT(`disciplines.${sDisc}.powers.${sKey}.system`);
    let sCost = "";
    
    // Heuristic cost extraction
    const rCost = /(?:Cost|Custo):\s*([^.]+)/i;
    const mCost = sSystem.match(rCost);
    if (mCost) {
        sCost = mCost[1].trim();
    } else {
        const rFree = /^(?:No cost|Sem custo|Passive|Passivo)/i;
        const mFree = sSystem.match(rFree);
        if (mFree) {
             sCost = mFree[0].charAt(0).toUpperCase() + mFree[0].slice(1).toLowerCase();
        }
    }

    return {
        id: sKey,
        level: nLvl,
        name: fnT(`disciplines.${sDisc}.powers.${sKey}.name`),
        description: fnT(`disciplines.${sDisc}.powers.${sKey}.description`),
        system: sSystem,
        cost: sCost,
        amalgam,
        prerequisite
    };
};

export const VAMPIRE_DISCIPLINES = [
    "animalism", "auspex", "celerity", "dominate", "fortitude", "obfuscate",
    "potence", "presence", "protean", "bloodsorcery", "oblivion", "thinbloodalchemy"
];

export const WEREWOLF_GIFTS = [
    "ragabashgifts", "theurgegifts", "philodoxgifts", "galliardgifts", "ahroungifts",
    "blackfuriesgifts", "bonegnawersgifts", "childrenofgaiagifts", "fiandeirosdevidrogifts",
    "andarilhosdoasfaltogifts", "criadefenrisgifts", "wendigogifts", "redtalonsgifts",
    "shadowlordsgifts", "silverfangsgifts", "silentstridersgifts", "innategifts"
];

export const fnGetDisciplineDetails = (fnT: TFunction): Record<string, DisciplineDetail> => ({
    "animalism": {
        name: fnT('disciplines.animalism.name'),
        description: fnT('disciplines.animalism.description'),
        powers: [
            fnGetP(fnT, "animalism", 1, "bondFamulus"),
            fnGetP(fnT, "animalism", 1, "senseTheBeast"),
            fnGetP(fnT, "animalism", 2, "feralWhispers"),
            fnGetP(fnT, "animalism", 2, "feralFrenzy", undefined, "feralWhispers"),
            fnGetP(fnT, "animalism", 2, "huntTheBeast", undefined, "senseTheBeast"),
            fnGetP(fnT, "animalism", 3, "animalSucculence"),
            fnGetP(fnT, "animalism", 3, "quellTheBeast"),
            fnGetP(fnT, "animalism", 3, "unlivingHive", [{ discipline: "obfuscate", level: 2 }]),
            fnGetP(fnT, "animalism", 3, "howlOfRage", [{ discipline: "presence", level: 2 }]),
            fnGetP(fnT, "animalism", 3, "markPrey", [{ discipline: "obfuscate", level: 1 }]),
            fnGetP(fnT, "animalism", 4, "subsumeTheSpirit"),
            fnGetP(fnT, "animalism", 4, "packFrenzy"),
            fnGetP(fnT, "animalism", 5, "animalDominion"),
            fnGetP(fnT, "animalism", 5, "drawingOutTheBeast"),
            fnGetP(fnT, "animalism", 5, "subsumeTheServant", [{ discipline: "dominate", level: 4 }])
        ]
    },
    "auspex": {
        name: fnT('disciplines.auspex.name'),
        description: fnT('disciplines.auspex.description'),
        powers: [
            fnGetP(fnT, "auspex", 1, "heightenedSenses"),
            fnGetP(fnT, "auspex", 1, "senseTheUnseen"),
            fnGetP(fnT, "auspex", 1, "lieDetector"),
            fnGetP(fnT, "auspex", 2, "premonition"),
            fnGetP(fnT, "auspex", 2, "decipher"),
            fnGetP(fnT, "auspex", 2, "implantDream", [{ discipline: "dominate", level: 1 }]),
            fnGetP(fnT, "auspex", 2, "readOpponent", [{ discipline: "celerity", level: 1 }]),
            fnGetP(fnT, "auspex", 2, "senseStrengthsAndWeaknesses"),
            fnGetP(fnT, "auspex", 2, "obeah", [{ discipline: "fortitude", level: 1 }]),
            fnGetP(fnT, "auspex", 3, "scryTheSoul"),
            fnGetP(fnT, "auspex", 3, "shareTheSenses"),
            fnGetP(fnT, "auspex", 3, "psychicBacklash"),
            fnGetP(fnT, "auspex", 3, "scanTheRoom", [{ discipline: "potence", level: 1 }]),
            fnGetP(fnT, "auspex", 4, "spiritsTouch"),
            fnGetP(fnT, "auspex", 5, "clairvoyance"),
            fnGetP(fnT, "auspex", 5, "possession", [{ discipline: "dominate", level: 3 }]),
            fnGetP(fnT, "auspex", 5, "telepathy"),
            fnGetP(fnT, "auspex", 5, "aliviandoAAlmaBestial", [{ discipline: "dominate", level: 3 }], "obeah")
        ]
    },
    "celerity": {
        name: fnT('disciplines.celerity.name'),
        description: fnT('disciplines.celerity.description'),
        powers: [
            fnGetP(fnT, "celerity", 1, "catsGrace"),
            fnGetP(fnT, "celerity", 1, "rapidReflexes"),
            fnGetP(fnT, "celerity", 2, "fleetness"),
            fnGetP(fnT, "celerity", 2, "controlMomentum", [{ discipline: "auspex", level: 1 }]),
            fnGetP(fnT, "celerity", 3, "blink"),
            fnGetP(fnT, "celerity", 3, "traversal"),
            fnGetP(fnT, "celerity", 3, "combatTempest"),
            fnGetP(fnT, "celerity", 3, "speedIsPower"),
            fnGetP(fnT, "celerity", 4, "draughtOfElegance"),
            fnGetP(fnT, "celerity", 4, "unerringAim", [{ discipline: "auspex", level: 2 }]),
            fnGetP(fnT, "celerity", 4, "furiousFrenzy"),
            fnGetP(fnT, "celerity", 4, "longDistanceJourney", [{ discipline: "fortitude", level: 1 }], "blink"),
            fnGetP(fnT, "celerity", 5, "lightningStrike"),
            fnGetP(fnT, "celerity", 5, "splitSecond")
        ]
    },
    "dominate": {
        name: fnT('disciplines.dominate.name'),
        description: fnT('disciplines.dominate.description'),
        powers: [
            fnGetP(fnT, "dominate", 1, "cloudMemory"),
            fnGetP(fnT, "dominate", 1, "compel"),
            fnGetP(fnT, "dominate", 2, "mesmerize"),
            fnGetP(fnT, "dominate", 2, "dementation", [{ discipline: "obfuscate", level: 2 }]),
            fnGetP(fnT, "dominate", 2, "declareWeakness"),
            fnGetP(fnT, "dominate", 2, "objectCommand", [{ discipline: "auspex", level: 2 }]),
            fnGetP(fnT, "dominate", 2, "favorDoDomitor"),
            fnGetP(fnT, "dominate", 3, "theForgetfulMind"),
            fnGetP(fnT, "dominate", 3, "submergedDirective"),
            fnGetP(fnT, "dominate", 4, "rationalize"),
            fnGetP(fnT, "dominate", 4, "mentalConditioning", undefined, "compel"),
            fnGetP(fnT, "dominate", 5, "massManipulation"),
            fnGetP(fnT, "dominate", 5, "terminalDecree"),
            fnGetP(fnT, "dominate", 5, "energyVampire", [{ discipline: "oblivion", level: 3 }])
        ]
    },
    "fortitude": {
        name: fnT('disciplines.fortitude.name'),
        description: fnT('disciplines.fortitude.description'),
        powers: [
            fnGetP(fnT, "fortitude", 1, "resilience"),
            fnGetP(fnT, "fortitude", 1, "unswayableMind"),
            fnGetP(fnT, "fortitude", 1, "eternalVigilance"),
            fnGetP(fnT, "fortitude", 2, "toughness"),
            fnGetP(fnT, "fortitude", 2, "enduringBeasts", [{ discipline: "animalism", level: 1 }]),
            fnGetP(fnT, "fortitude", 2, "returnToSender"),
            fnGetP(fnT, "fortitude", 2, "mentalVault"),
            fnGetP(fnT, "fortitude", 2, "sleepLikeStone", undefined, "resilience"),
            fnGetP(fnT, "fortitude", 2, "valeren", [{ discipline: "auspex", level: 1 }]),
            fnGetP(fnT, "fortitude", 3, "defyBane"),
            fnGetP(fnT, "fortitude", 3, "fortifyTheInnerFacade"),
            fnGetP(fnT, "fortitude", 4, "draughtOfEndurance"),
            fnGetP(fnT, "fortitude", 5, "fleshOfMarble"),
            fnGetP(fnT, "fortitude", 5, "prowessFromPain")
        ]
    },
    "obfuscate": {
        name: fnT('disciplines.obfuscate.name'),
        description: fnT('disciplines.obfuscate.description'),
        powers: [
            fnGetP(fnT, "obfuscate", 1, "cloakOfShadows"),
            fnGetP(fnT, "obfuscate", 1, "silenceOfDeath"),
            fnGetP(fnT, "obfuscate", 2, "unseenPassage"),
            fnGetP(fnT, "obfuscate", 2, "shapeAura", [{ discipline: "presence", level: 1 }]),
            fnGetP(fnT, "obfuscate", 2, "quimerismo", [{ discipline: "presence", level: 1 }]),
            fnGetP(fnT, "obfuscate", 3, "ghostInTheMachine"),
            fnGetP(fnT, "obfuscate", 3, "maskOfAThousandFaces"),
            fnGetP(fnT, "obfuscate", 3, "duplicate", [{ discipline: "presence", level: 1 }], "cloakOfShadows"),
            fnGetP(fnT, "obfuscate", 3, "fataMorgana", [{ discipline: "presence", level: 2 }]),
            fnGetP(fnT, "obfuscate", 4, "conceal", [{ discipline: "auspex", level: 3 }]),
            fnGetP(fnT, "obfuscate", 4, "vanish", undefined, "cloakOfShadows"),
            fnGetP(fnT, "obfuscate", 4, "hiddenBlade"),
            fnGetP(fnT, "obfuscate", 5, "cloakTheGathering"),
            fnGetP(fnT, "obfuscate", 5, "impostorsGuise", undefined, "maskOfAThousandFaces"),
            fnGetP(fnT, "obfuscate", 5, "fadingMemory")
        ]
    },
    "potence": {
        name: fnT('disciplines.potence.name'),
        description: fnT('disciplines.potence.description'),
        powers: [
            fnGetP(fnT, "potence", 1, "lethalBody"),
            fnGetP(fnT, "potence", 1, "soaringLeap"),
            fnGetP(fnT, "potence", 2, "prowess"),
            fnGetP(fnT, "potence", 3, "brutalFeed"),
            fnGetP(fnT, "potence", 3, "sparkOfRage", [{ discipline: "presence", level: 3 }]),
            fnGetP(fnT, "potence", 3, "uncannyGrip"),
            fnGetP(fnT, "potence", 3, "fastballSpecial"),
            fnGetP(fnT, "potence", 4, "draughtOfMight"),
            fnGetP(fnT, "potence", 5, "earthshock"),
            fnGetP(fnT, "potence", 5, "fistOfCaine")
        ]
    },
    "presence": {
        name: fnT('disciplines.presence.name'),
        description: fnT('disciplines.presence.description'),
        powers: [
            fnGetP(fnT, "presence", 1, "awe"),
            fnGetP(fnT, "presence", 1, "daunt"),
            fnGetP(fnT, "presence", 2, "lingeringKiss"),
            fnGetP(fnT, "presence", 2, "subtleMessages"),
            fnGetP(fnT, "presence", 3, "dreadGaze"),
            fnGetP(fnT, "presence", 3, "entrancement"),
            fnGetP(fnT, "presence", 3, "throneRoom", [{ discipline: "auspex", level: 1 }]),
            fnGetP(fnT, "presence", 3, "obsession"),
            fnGetP(fnT, "presence", 4, "irresistibleVoice", [{ discipline: "dominate", level: 1 }]),
            fnGetP(fnT, "presence", 4, "summon"),
            fnGetP(fnT, "presence", 4, "twistWords", [{ discipline: "auspex", level: 2 }]),
            fnGetP(fnT, "presence", 4, "hideousLaughter"),
            fnGetP(fnT, "presence", 5, "majesty"),
            fnGetP(fnT, "presence", 5, "starMagnetism"),
            fnGetP(fnT, "presence", 5, "mindPrison", [{ discipline: "obfuscate", level: 3 }])
        ]
    },
    "protean": {
        name: fnT('disciplines.protean.name'),
        description: fnT('disciplines.protean.description'),
        powers: [
            fnGetP(fnT, "protean", 1, "eyesOfTheBeast"),
            fnGetP(fnT, "protean", 1, "weightOfTheFeather"),
            fnGetP(fnT, "protean", 1, "shedSkin"),
            fnGetP(fnT, "protean", 2, "feralWeapons"),
            fnGetP(fnT, "protean", 2, "vicissitude", [{ discipline: "dominate", level: 2 }]),
            fnGetP(fnT, "protean", 3, "earthMeld"),
            fnGetP(fnT, "protean", 3, "shapechange"),
            fnGetP(fnT, "protean", 3, "toolsOfNature", undefined, "feralWeapons"),
            fnGetP(fnT, "protean", 3, "modelagemDeCarne", [{ discipline: "dominate", level: 2 }], "vicissitude"),
            fnGetP(fnT, "protean", 4, "metamorphosis", undefined, "shapechange"),
            fnGetP(fnT, "protean", 4, "swarmForm", [{ discipline: "animalism", level: 2 }], "shapechange"),
            fnGetP(fnT, "protean", 4, "traverseTheEarth", undefined, "earthMeld"),
            fnGetP(fnT, "protean", 4, "formaHedionda", [{ discipline: "dominate", level: 2 }], "vicissitude"),
            fnGetP(fnT, "protean", 5, "mistForm"),
            fnGetP(fnT, "protean", 5, "theUnfetteredHeart"),
            fnGetP(fnT, "protean", 5, "umComATerra", [{ discipline: "animalism", level: 2 }], "earthMeld")
        ]
    },
    "bloodsorcery": {
        name: fnT('disciplines.bloodsorcery.name'),
        description: fnT('disciplines.bloodsorcery.description'),
        powers: [
            fnGetP(fnT, "bloodsorcery", 1, "corrosiveVitae"),
            fnGetP(fnT, "bloodsorcery", 1, "aTasteForBlood"),
            fnGetP(fnT, "bloodsorcery", 2, "extinguishVitae"),
            fnGetP(fnT, "bloodsorcery", 2, "bloodObject"),
            fnGetP(fnT, "bloodsorcery", 2, "bloodTendrils"),
            fnGetP(fnT, "bloodsorcery", 3, "bloodOfPotency"),
            fnGetP(fnT, "bloodsorcery", 3, "scorpionsTouch"),
            fnGetP(fnT, "bloodsorcery", 3, "diluteTheLine"),
            fnGetP(fnT, "bloodsorcery", 3, "healersBane"),
            fnGetP(fnT, "bloodsorcery", 4, "theftOfVitae"),
            fnGetP(fnT, "bloodsorcery", 4, "crimsonFury"),
            fnGetP(fnT, "bloodsorcery", 4, "curseOfTheSlowBlood"),
            fnGetP(fnT, "bloodsorcery", 5, "baalsCaress"),
            fnGetP(fnT, "bloodsorcery", 5, "cauldronOfBlood"),
            fnGetP(fnT, "bloodsorcery", 5, "telekinesis", [{ discipline: "auspex", level: 4 }])
        ]
    },
    "oblivion": {
        name: fnT('disciplines.oblivion.name'),
        description: fnT('disciplines.oblivion.description'),
        powers: [
             fnGetP(fnT, "oblivion", 1, "shadowCloak"),
             fnGetP(fnT, "oblivion", 1, "oblivionsSight"),
             fnGetP(fnT, "oblivion", 2, "armsOfAhriman"),
             fnGetP(fnT, "oblivion", 2, "shadowCast"),
             fnGetP(fnT, "oblivion", 2, "abyssalPulse"),
             fnGetP(fnT, "oblivion", 3, "touchOfOblivion"),
             fnGetP(fnT, "oblivion", 3, "shadowPuppet"),
             fnGetP(fnT, "oblivion", 3, "witnessTheEnd"),
             fnGetP(fnT, "oblivion", 4, "stygianShroud"),
             fnGetP(fnT, "oblivion", 5, "tenebrousAvatar")
        ]
    },
     "thinbloodalchemy": {
        name: fnT('disciplines.thinbloodalchemy.name'),
        description: fnT('disciplines.thinbloodalchemy.description'),
        powers: [
             fnGetP(fnT, "thinbloodalchemy", 1, "farReach"),
             fnGetP(fnT, "thinbloodalchemy", 1, "haze"),
             fnGetP(fnT, "thinbloodalchemy", 1, "profaneHierosGamos"),
             fnGetP(fnT, "thinbloodalchemy", 2, "envelop"),
             fnGetP(fnT, "thinbloodalchemy", 3, "defractionate"),
             fnGetP(fnT, "thinbloodalchemy", 4, "airborneMomentum"),
             fnGetP(fnT, "thinbloodalchemy", 5, "awakenTheSleeper")
        ]
    },
    "ragabashgifts": {
        name: fnT('disciplines.ragabashgifts.name'),
        description: fnT('disciplines.ragabashgifts.description'),
        powers: [
            fnGetP(fnT, "ragabashgifts", 1, "blurOfTheMilkyEye"),
            fnGetP(fnT, "ragabashgifts", 1, "liarsFace"),
        ]
    },
    "theurgegifts": {
        name: fnT('disciplines.theurgegifts.name'),
        description: fnT('disciplines.theurgegifts.description'),
        powers: [
            fnGetP(fnT, "theurgegifts", 1, "senseWyrm"),
            fnGetP(fnT, "theurgegifts", 1, "spiritSpeech"),
        ]
    },
    "philodoxgifts": {
        name: fnT('disciplines.philodoxgifts.name'),
        description: fnT('disciplines.philodoxgifts.description'),
        powers: [
            fnGetP(fnT, "philodoxgifts", 1, "kingOfTheBeasts"),
            fnGetP(fnT, "philodoxgifts", 1, "truthOfGaia"),
        ]
    },
    "galliardgifts": {
        name: fnT('disciplines.galliardgifts.name'),
        description: fnT('disciplines.galliardgifts.description'),
        powers: [
            fnGetP(fnT, "galliardgifts", 1, "callOfTheWyld"),
            fnGetP(fnT, "galliardgifts", 1, "mindspeak"),
        ]
    },
    "ahroungifts": {
        name: fnT('disciplines.ahroungifts.name'),
        description: fnT('disciplines.ahroungifts.description'),
        powers: [
            fnGetP(fnT, "ahroungifts", 1, "fallingTouch"),
            fnGetP(fnT, "ahroungifts", 1, "senseSilver"),
        ]
    },
    "blackfuriesgifts": {
        name: fnT('disciplines.blackfuriesgifts.name'),
        description: fnT('disciplines.blackfuriesgifts.description'),
        powers: [
            fnGetP(fnT, "blackfuriesgifts", 1, "breathOfTheWyld"),
            fnGetP(fnT, "blackfuriesgifts", 1, "heightenedSenses"),
        ]
    },
    "bonegnawersgifts": {
        name: fnT('disciplines.bonegnawersgifts.name'),
        description: fnT('disciplines.bonegnawersgifts.description'),
        powers: [
            fnGetP(fnT, "bonegnawersgifts", 1, "cooking"),
            fnGetP(fnT, "bonegnawersgifts", 1, "scentOfSweetSuccess"),
        ]
    },
    "childrenofgaiagifts": {
        name: fnT('disciplines.childrenofgaiagifts.name'),
        description: fnT('disciplines.childrenofgaiagifts.description'),
        powers: [
            fnGetP(fnT, "childrenofgaiagifts", 1, "dazzle"),
            fnGetP(fnT, "childrenofgaiagifts", 1, "resistPain"),
        ]
    },
    "fiandeirosdevidrogifts": {
        name: fnT('disciplines.fiandeirosdevidrogifts.name'),
        description: fnT('disciplines.fiandeirosdevidrogifts.description'),
        powers: [
            fnGetP(fnT, "fiandeirosdevidrogifts", 1, "spiritSpeech"),
            fnGetP(fnT, "fiandeirosdevidrogifts", 1, "umbralTether"),
        ]
    },
    "andarilhosdoasfaltogifts": {
        name: fnT('disciplines.andarilhosdoasfaltogifts.name'),
        description: fnT('disciplines.andarilhosdoasfaltogifts.description'),
        powers: [
            fnGetP(fnT, "andarilhosdoasfaltogifts", 1, "controlSimpleMachine"),
            fnGetP(fnT, "andarilhosdoasfaltogifts", 1, "plugAndPlay"),
        ]
    },
    "criadefenrisgifts": {
        name: fnT('disciplines.criadefenrisgifts.name'),
        description: fnT('disciplines.criadefenrisgifts.description'),
        powers: [
            fnGetP(fnT, "criadefenrisgifts", 1, "resistPain"),
            fnGetP(fnT, "criadefenrisgifts", 1, "furiousStrike"),
        ]
    },
    "wendigogifts": {
        name: fnT('disciplines.wendigogifts.name'),
        description: fnT('disciplines.wendigogifts.description'),
        powers: [
            fnGetP(fnT, "wendigogifts", 1, "beastSpeech"),
            fnGetP(fnT, "wendigogifts", 1, "tracklessStep"),
        ]
    },
    "redtalonsgifts": {
        name: fnT('disciplines.redtalonsgifts.name'),
        description: fnT('disciplines.redtalonsgifts.description'),
        powers: [
            fnGetP(fnT, "redtalonsgifts", 1, "beastLife"),
            fnGetP(fnT, "redtalonsgifts", 1, "hiddenKiller"),
        ]
    },
    "shadowlordsgifts": {
        name: fnT('disciplines.shadowlordsgifts.name'),
        description: fnT('disciplines.shadowlordsgifts.description'),
        powers: [
            fnGetP(fnT, "shadowlordsgifts", 1, "auraOfConfidence"),
            fnGetP(fnT, "shadowlordsgifts", 1, "fatalFlaw"),
        ]
    },
    "silverfangsgifts": {
        name: fnT('disciplines.silverfangsgifts.name'),
        description: fnT('disciplines.silverfangsgifts.description'),
        powers: [
            fnGetP(fnT, "silverfangsgifts", 1, "falconsGrasp"),
            fnGetP(fnT, "silverfangsgifts", 1, "senseWyrm"),
        ]
    },
    "silentstridersgifts": {
        name: fnT('disciplines.silentstridersgifts.name'),
        description: fnT('disciplines.silentstridersgifts.description'),
        powers: [
            fnGetP(fnT, "silentstridersgifts", 1, "speedOfThought"),
            fnGetP(fnT, "silentstridersgifts", 1, "messengersFortitude"),
        ]
    },
    "innategifts": {
        name: fnT('disciplines.innategifts.name'),
        description: fnT('disciplines.innategifts.description'),
        powers: [
            fnGetP(fnT, "innategifts", 1, "olharDesconcertante"),
            fnGetP(fnT, "innategifts", 1, "olhosDaCoruja"),
            fnGetP(fnT, "innategifts", 1, "pancadaFuriosa"),
            fnGetP(fnT, "innategifts", 1, "pesDeGato"),
            fnGetP(fnT, "innategifts", 1, "saltoDaLebre"),
            fnGetP(fnT, "innategifts", 1, "sentidosCrepusculares"),
            fnGetP(fnT, "innategifts", 1, "skinLaceration"),
            fnGetP(fnT, "innategifts", 1, "lycanthropeBite"),
            fnGetP(fnT, "innategifts", 1, "urbanHunter"),
            fnGetP(fnT, "innategifts", 1, "corruptedMemories"),
            fnGetP(fnT, "innategifts", 1, "cuttingWords"),
            fnGetP(fnT, "innategifts", 1, "hungryTeeth"),
            fnGetP(fnT, "innategifts", 1, "wyrmSpeech"),
            fnGetP(fnT, "innategifts", 1, "mouthFullOfTeeth"),
        ]
    },
});


export const aAttributeList = Object.values(Attribute);
export const aSkillList = Object.values(Skill);

export const oSkillPaths = {
    jackOfAllTrades: [3, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    balanced: [3, 3, 3, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1],
    specialist: [4, 3, 3, 3, 2, 2, 2, 1, 1, 1]
};

export const oDisciplineCreationPools = {
    [GameType.Vampire]: [2, 1],
    [GameType.Werewolf]: [1, 1, 1]
};

export const aMandatorySpecialtySkills = [Skill.Craft, Skill.Performance, Skill.Academics, Skill.Science];

export const oInitialCharacter: Character = {
  gameType: null,
  name: '',
  concept: '',
  ambition: '',
  desire: '',
  clan: null,
  sire: '',
  generation: 13,
  attributes: aAttributeList.reduce((acc, attr) => ({ ...acc, [attr]: 1 }), {} as Character['attributes']),
  skills: aSkillList.reduce((acc, skill) => ({ ...acc, [skill]: 0 }), {} as Character['skills']),
  disciplines: {},
  disciplinePowers: {},
  rituals: [],
  talismans: [],
  predatorType: null,
  humanity: 7,
  hunger: 1,
  rage: 1,
  harano: 0,
  hauglosk: 0,
  renown: { glory: 0, honor: 0, wisdom: 0 },
  health: null,
  willpower: null,
  bloodPotency: 1,
  touchstones: '',
  advantages: [],
  flaws: [],
  specialties: [],
  portraitUrl: '',
  loresheets: []
};
