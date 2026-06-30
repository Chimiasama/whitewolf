
import { Character, Clan, Attribute, Skill, DisciplineDetail, PredatorTypeDetail, AdvantageFlaw, DisciplineCombo, GameType, Tribe, Auspice, Loresheet } from './types';

type TFunction = (key: string) => string;

export const fnGetTribeDetails = (fnT: TFunction): Record<Tribe, { name: string; description: string; gifts: string[]; bane: string; favor: string; }> => ({
    [Tribe.BlackFuries]: { name: fnT('tribes.blackfuries.name'), description: fnT('tribes.blackfuries.description'), gifts: ["Black Furies Gifts", "Innate Gifts"], bane: fnT('tribes.blackfuries.bane'), favor: fnT('tribes.blackfuries.favor') },
    [Tribe.BoneGnawers]: { name: fnT('tribes.bonegnawers.name'), description: fnT('tribes.bonegnawers.description'), gifts: ["Bone Gnawers Gifts", "Innate Gifts"], bane: fnT('tribes.bonegnawers.bane'), favor: fnT('tribes.bonegnawers.favor') },
    [Tribe.ChildrenOfGaia]: { name: fnT('tribes.childrenofgaia.name'), description: fnT('tribes.childrenofgaia.description'), gifts: ["Children of Gaia Gifts", "Innate Gifts"], bane: fnT('tribes.childrenofgaia.bane'), favor: fnT('tribes.childrenofgaia.favor') },
    [Tribe.Galestalkers]: { name: fnT('tribes.galestalkers.name'), description: fnT('tribes.galestalkers.description'), gifts: ["Galestalkers Gifts", "Innate Gifts"], bane: fnT('tribes.galestalkers.bane'), favor: fnT('tribes.galestalkers.favor') },
    [Tribe.GhostCouncil]: { name: fnT('tribes.ghostcouncil.name'), description: fnT('tribes.ghostcouncil.description'), gifts: ["Ghost Council Gifts", "Innate Gifts"], bane: fnT('tribes.ghostcouncil.bane'), favor: fnT('tribes.ghostcouncil.favor') },
    [Tribe.GlassWalkers]: { name: fnT('tribes.glasswalkers.name'), description: fnT('tribes.glasswalkers.description'), gifts: ["Glass Walkers Gifts", "Innate Gifts"], bane: fnT('tribes.glasswalkers.bane'), favor: fnT('tribes.glasswalkers.favor') },
    [Tribe.HartWardens]: { name: fnT('tribes.hartwardens.name'), description: fnT('tribes.hartwardens.description'), gifts: ["Hart Wardens Gifts", "Innate Gifts"], bane: fnT('tribes.hartwardens.bane'), favor: fnT('tribes.hartwardens.favor') },
    [Tribe.RedTalons]: { name: fnT('tribes.redtalons.name'), description: fnT('tribes.redtalons.description'), gifts: ["Red Talons Gifts", "Innate Gifts"], bane: fnT('tribes.redtalons.bane'), favor: fnT('tribes.redtalons.favor') },
    [Tribe.ShadowLords]: { name: fnT('tribes.shadowlords.name'), description: fnT('tribes.shadowlords.description'), gifts: ["Shadow Lords Gifts", "Innate Gifts"], bane: fnT('tribes.shadowlords.bane'), favor: fnT('tribes.shadowlords.favor') },
    [Tribe.SilverFangs]: { name: fnT('tribes.silverfangs.name'), description: fnT('tribes.silverfangs.description'), gifts: ["Silver Fangs Gifts", "Innate Gifts"], bane: fnT('tribes.silverfangs.bane'), favor: fnT('tribes.silverfangs.favor') },
    [Tribe.SilentStriders]: { name: fnT('tribes.silentstriders.name'), description: fnT('tribes.silentstriders.description'), gifts: ["Silent Striders Gifts", "Innate Gifts"], bane: fnT('tribes.silentstriders.bane'), favor: fnT('tribes.silentstriders.favor') }
});

export const fnGetAuspiceDetails = (fnT: TFunction): Record<Auspice, { name: string; description: string; gifts: string[]; }> => ({
    [Auspice.Ragabash]: { name: fnT('auspices.ragabash.name'), description: fnT('auspices.ragabash.description'), gifts: ["Ragabash Gifts"] },
    [Auspice.Theurge]: { name: fnT('auspices.theurge.name'), description: fnT('auspices.theurge.description'), gifts: ["Theurge Gifts"] },
    [Auspice.Philodox]: { name: fnT('auspices.philodox.name'), description: fnT('auspices.philodox.description'), gifts: ["Philodox Gifts"] },
    [Auspice.Galliard]: { name: fnT('auspices.galliard.name'), description: fnT('auspices.galliard.description'), gifts: ["Galliard Gifts"] },
    [Auspice.Ahroun]: { name: fnT('auspices.ahroun.name'), description: fnT('auspices.ahroun.description'), gifts: ["AhrounGifts"] }
});

export const fnGetClanDetails = (fnT: TFunction): Record<Clan, { name: string; description: string; disciplines: string[]; bane: string; compulsion: string; }> => ({
    [Clan.Brujah]: { name: fnT('clans.brujah.name'), description: fnT('clans.brujah.description'), disciplines: ["Celerity", "Potence", "Presence"], bane: fnT('clans.brujah.bane'), compulsion: fnT('clans.brujah.compulsion') },
    [Clan.Gangrel]: { name: fnT('clans.gangrel.name'), description: fnT('clans.gangrel.description'), disciplines: ["Animalism", "Fortitude", "Protean"], bane: fnT('clans.gangrel.bane'), compulsion: fnT('clans.gangrel.compulsion') },
    [Clan.Malkavian]: { name: fnT('clans.malkavian.name'), description: fnT('clans.malkavian.description'), disciplines: ["Auspex", "Dominate", "Obfuscate"], bane: fnT('clans.malkavian.bane'), compulsion: fnT('clans.malkavian.compulsion') },
    [Clan.Nosferatu]: { name: fnT('clans.nosferatu.name'), description: fnT('clans.nosferatu.description'), disciplines: ["Animalism", "Obfuscate", "Potence"], bane: fnT('clans.nosferatu.bane'), compulsion: fnT('clans.nosferatu.compulsion') },
    [Clan.Toreador]: { name: fnT('clans.toreador.name'), description: fnT('clans.toreador.description'), disciplines: ["Auspex", "Celerity", "Presence"], bane: fnT('clans.toreador.bane'), compulsion: fnT('clans.toreador.compulsion') },
    [Clan.Tremere]: { name: fnT('clans.tremere.name'), description: fnT('clans.tremere.description'), disciplines: ["Auspex", "Blood Sorcery", "Dominate"], bane: fnT('clans.tremere.bane'), compulsion: fnT('clans.tremere.compulsion') },
    [Clan.Ventrue]: { name: fnT('clans.ventrue.name'), description: fnT('clans.ventrue.description'), disciplines: ["Dominate", "Fortitude", "Presence"], bane: fnT('clans.ventrue.bane'), compulsion: fnT('clans.ventrue.compulsion') },
    [Clan.BanuHaqim]: { name: fnT('clans.banuhaqim.name'), description: fnT('clans.banuhaqim.description'), disciplines: ["Blood Sorcery", "Celerity", "Obfuscate"], bane: fnT('clans.banuhaqim.bane'), compulsion: fnT('clans.banuhaqim.compulsion') },
    [Clan.TheMinistry]: { name: fnT('clans.theministry.name'), description: fnT('clans.theministry.description'), disciplines: ["Obfuscate", "Presence", "Protean"], bane: fnT('clans.theministry.bane'), compulsion: fnT('clans.theministry.compulsion') },
    [Clan.Lasombra]: { name: fnT('clans.lasombra.name'), description: fnT('clans.lasombra.description'), disciplines: ["Dominate", "Oblivion", "Potence"], bane: fnT('clans.lasombra.bane'), compulsion: fnT('clans.lasombra.compulsion') },
    [Clan.Caitiff]: { name: fnT('clans.caitiff.name'), description: fnT('clans.caitiff.description'), disciplines: [], bane: fnT('clans.caitiff.bane'), compulsion: fnT('clans.caitiff.compulsion') },
    [Clan.ThinBlood]: { name: fnT('clans.thinblood.name'), description: fnT('clans.thinblood.description'), disciplines: ["Thin-Blood Alchemy"], bane: fnT('clans.thinblood.bane'), compulsion: fnT('clans.thinblood.compulsion') }
});

export const fnGetPredatorTypes = (fnT: TFunction): PredatorTypeDetail[] => [
    { 
        name: fnT('predatorTypes.alleycat.name'), 
        description: fnT('predatorTypes.alleycat.description'),
        disciplineAdd: { discipline: "Potence", dots: 1 },
        humanityModifier: -1,
        advantages: [{ id: 'contacts_criminal', name: fnT('advantages.contacts.name'), description: fnT('advantages.contacts.description'), cost: 3, type: 'advantage', levels: [3] }], // Criminal Contact
        flaws: [],
        specialties: [],
        specialtyOptions: [
            { skill: Skill.Intimidation, name: fnT('predatorTypes.specialties.stickups') },
            { skill: Skill.Brawl, name: fnT('predatorTypes.specialties.grappling') }
        ]
    },
    { 
        name: fnT('predatorTypes.bagger.name'), 
        description: fnT('predatorTypes.bagger.description'),
        humanityModifier: 0,
        advantages: [],
        flaws: [{ id: 'enemy_bagger', name: fnT('flaws.enemy.name'), description: fnT('flaws.enemy.baggerDescription'), cost: 2, type: 'flaw', levels: [2]}],
        specialties: [],
        specialtyOptions: [
            { skill: Skill.Streetwise, name: fnT('predatorTypes.specialties.blackMarket') },
            { skill: Skill.Larceny, name: fnT('predatorTypes.specialties.lockpicking') }
        ]
    },
    { 
        name: fnT('predatorTypes.consensualist.name'), 
        description: fnT('predatorTypes.consensualist.description'),
        humanityModifier: 1,
        advantages: [],
        flaws: [
            { id: 'darksecret_consensualist', name: fnT('flaws.darksecret.name'), description: fnT('flaws.darksecret.description'), cost: 1, type: 'flaw', levels: [1]},
            { id: 'feeding_consensualist', name: fnT('flaws.feeding.name'), description: fnT('flaws.feeding.consensualistDescription'), cost: 1, type: 'flaw', levels: [1]}
        ],
        specialties: [],
        specialtyOptions: [
            { skill: Skill.Medicine, name: fnT('predatorTypes.specialties.phlebotomy') },
            { skill: Skill.Persuasion, name: fnT('predatorTypes.specialties.vessels') }
        ]
    },
    { 
        name: fnT('predatorTypes.farmer.name'), 
        description: fnT('predatorTypes.farmer.description'),
        humanityModifier: 0,
        advantages: [],
        flaws: [{ id: 'feeding_farmer', name: fnT('flaws.feeding.name'), description: fnT('flaws.feeding.farmerDescription'), cost: 2, type: 'flaw', levels: [2]}],
        specialties: [],
        specialtyOptions: [
            { skill: Skill.AnimalKen, name: fnT('predatorTypes.specialties.animal') },
            { skill: Skill.Survival, name: fnT('predatorTypes.specialties.hunting') }
        ]
    },
    { 
        name: fnT('predatorTypes.osiris.name'), 
        description: fnT('predatorTypes.osiris.description'),
        humanityModifier: -1,
        advantages: [
            { id: 'fame_osiris', name: fnT('advantages.fame.name'), description: fnT('advantages.fame.description'), cost: 2, type: 'advantage', levels: [2]},
            { id: 'herd_osiris', name: fnT('advantages.herd.name'), description: fnT('advantages.herd.description'), cost: 3, type: 'advantage', levels: [3]},
        ],
        flaws: [
            { id: 'enemy_osiris', name: fnT('flaws.enemy.name'), description: fnT('flaws.enemy.description'), cost: 2, type: 'flaw', levels: [2]},
            { id: 'shunned_osiris', name: fnT('flaws.shunned.name'), description: fnT('flaws.shunned.description'), cost: 2, type: 'flaw', levels: [2]} // Mythic Flaw equiv
        ],
        specialties: [],
        specialtyOptions: [
            { skill: Skill.Occult, name: fnT('predatorTypes.specialties.specificTradition') },
            { skill: Skill.Subterfuge, name: fnT('predatorTypes.specialties.seduction') }
        ]
    },
    { 
        name: fnT('predatorTypes.sandman.name'), 
        description: fnT('predatorTypes.sandman.description'),
        disciplineAdd: { discipline: "Auspex", dots: 1 },
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
        name: fnT('predatorTypes.siren.name'), 
        description: fnT('predatorTypes.siren.description'),
        disciplineAdd: { discipline: "Presence", dots: 1 },
        humanityModifier: 0,
        advantages: [{ id: 'beautiful_siren', name: fnT('advantages.beautiful.name'), description: fnT('advantages.beautiful.description'), cost: 2, type: 'advantage', levels: [2]}],
        flaws: [{ id: 'enemy_siren', name: fnT('flaws.enemy.name'), description: fnT('flaws.enemy.sirenDescription'), cost: 1, type: 'flaw', levels: [1]}],
        specialties: [],
        specialtyOptions: [
            { skill: Skill.Persuasion, name: fnT('predatorTypes.specialties.seduction') },
            { skill: Skill.Subterfuge, name: fnT('predatorTypes.specialties.seduction') }
        ]
    },
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
        { id: 'addiction', name: fnT('flaws.addiction.name'), description: fnT('flaws.addiction.description'), cost: 1, type: 'flaw', levels: [1, 2]},
        { id: 'haunted', name: fnT('flaws.haunted.name'), description: fnT('flaws.haunted.description'), cost: 1, type: 'flaw', levels: [1, 2]},
        { id: 'shunned', name: fnT('flaws.shunned.name'), description: fnT('flaws.shunned.description'), cost: 1, type: 'flaw', levels: [2]},
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
    { id: "confinement", name: fnT('tribes.rituals.confinement.name'), description: fnT('tribes.rituals.confinement.description') },
    { id: "conquest", name: fnT('tribes.rituals.conquest.name'), description: fnT('tribes.rituals.conquest.description') },
    { id: "winterWolf", name: fnT('tribes.rituals.winterWolf.name'), description: fnT('tribes.rituals.winterWolf.description') }
];

export const fnGetTalismans = (fnT: TFunction): { id: string, name: string, description: string }[] => [
    { id: "spiritCatcher", name: fnT('tribes.werewolfTalismans.spiritCatcher.name'), description: fnT('tribes.werewolfTalismans.spiritCatcher.description') },
    { id: "windWhistle", name: fnT('tribes.werewolfTalismans.windWhistle.name'), description: fnT('tribes.werewolfTalismans.windWhistle.description') },
    { id: "klaive", name: fnT('tribes.werewolfTalismans.klaive.name'), description: fnT('tribes.werewolfTalismans.klaive.description') },
    { id: "tearOfGaia", name: fnT('tribes.werewolfTalismans.tearOfGaia.name'), description: fnT('tribes.werewolfTalismans.tearOfGaia.description') },
    { id: "heraldHorn", name: fnT('tribes.werewolfTalismans.heraldHorn.name'), description: fnT('tribes.werewolfTalismans.heraldHorn.description') },
    { id: "kingBrennusHammer", name: fnT('tribes.werewolfTalismans.kingBrennusHammer.name'), description: fnT('tribes.werewolfTalismans.kingBrennusHammer.description') },
    { id: "heatStone", name: fnT('tribes.werewolfTalismans.heatStone.name'), description: fnT('tribes.werewolfTalismans.heatStone.description') },
    { id: "assassinCrown", name: fnT('tribes.werewolfTalismans.assassinCrown.name'), description: fnT('tribes.werewolfTalismans.assassinCrown.description') },
    { id: "ironAxe", name: fnT('tribes.werewolfTalismans.ironAxe.name'), description: fnT('tribes.werewolfTalismans.ironAxe.description') },
    { id: "boneScourge", name: fnT('tribes.werewolfTalismans.boneScourge.name'), description: fnT('tribes.werewolfTalismans.boneScourge.description') }
];

export const fnGetDisciplineCombos = (fnT: TFunction): DisciplineCombo[] => [
    {
        id: "dementation",
        name: fnT('combos.dementation.name'),
        description: fnT('combos.dementation.description'),
        requirements: [{ discipline: "Dominate", level: 2 }, { discipline: "Auspex", level: 2 }],
        system: fnT('combos.dementation.system'),
        cost: "One Rouse Check"
    },
    {
        id: "chimerstry",
        name: fnT('combos.chimerstry.name'),
        description: fnT('combos.chimerstry.description'),
        requirements: [{ discipline: "Obfuscate", level: 2 }, { discipline: "Presence", level: 1 }],
        system: fnT('combos.chimerstry.system'),
        cost: "One Rouse Check"
    },
    {
        id: "viciousGaze",
        name: fnT('combos.viciousGaze.name'),
        description: fnT('combos.viciousGaze.description'),
        requirements: [{ discipline: "Presence", level: 2 }, { discipline: "Potence", level: 1 }],
        system: fnT('combos.viciousGaze.system'),
        cost: "Passive"
    },
    {
        id: "bullseye",
        name: fnT('combos.bullseye.name'),
        description: fnT('combos.bullseye.description'),
        requirements: [{ discipline: "Auspex", level: 3 }, { discipline: "Celerity", level: 2 }],
        system: fnT('combos.bullseye.system'),
        cost: "One Rouse Check"
    }
];

// Helper to shorten looking up standard keys
const fnGetP = (fnT: TFunction, sDisc: string, nLvl: number, sKey: string) => {
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
        cost: sCost
    };
};

export const fnGetDisciplineDetails = (fnT: TFunction): Record<string, DisciplineDetail> => ({
    "Animalism": {
        name: fnT('disciplines.animalism.name'),
        description: fnT('disciplines.animalism.description'),
        powers: [
            fnGetP(fnT, "animalism", 1, "bondFamulus"),
            fnGetP(fnT, "animalism", 1, "senseTheBeast"),
            fnGetP(fnT, "animalism", 2, "feralWhispers"),
            fnGetP(fnT, "animalism", 3, "animalSucculence"),
            fnGetP(fnT, "animalism", 3, "quellTheBeast"),
            fnGetP(fnT, "animalism", 4, "subsumeTheSpirit"),
            fnGetP(fnT, "animalism", 5, "animalDominion"),
            fnGetP(fnT, "animalism", 5, "drawingOutTheBeast")
        ]
    },
    "Auspex": {
        name: fnT('disciplines.auspex.name'),
        description: fnT('disciplines.auspex.description'),
        powers: [
            fnGetP(fnT, "auspex", 1, "heightenedSenses"),
            fnGetP(fnT, "auspex", 1, "senseTheUnseen"),
            fnGetP(fnT, "auspex", 2, "premonition"),
            fnGetP(fnT, "auspex", 3, "scryTheSoul"),
            fnGetP(fnT, "auspex", 3, "shareTheSenses"),
            fnGetP(fnT, "auspex", 4, "spiritsTouch"),
            fnGetP(fnT, "auspex", 5, "clairvoyance"),
            fnGetP(fnT, "auspex", 5, "possession"),
            fnGetP(fnT, "auspex", 5, "telepathy")
        ]
    },
    "Celerity": {
        name: fnT('disciplines.celerity.name'),
        description: fnT('disciplines.celerity.description'),
        powers: [
            fnGetP(fnT, "celerity", 1, "catsGrace"),
            fnGetP(fnT, "celerity", 1, "rapidReflexes"),
            fnGetP(fnT, "celerity", 2, "fleetness"),
            fnGetP(fnT, "celerity", 3, "blink"),
            fnGetP(fnT, "celerity", 3, "traversal"),
            fnGetP(fnT, "celerity", 4, "draughtOfElegance"),
            fnGetP(fnT, "celerity", 4, "unerringAim"),
            fnGetP(fnT, "celerity", 5, "lightningStrike"),
            fnGetP(fnT, "celerity", 5, "splitSecond")
        ]
    },
    "Dominate": {
        name: fnT('disciplines.dominate.name'),
        description: fnT('disciplines.dominate.description'),
        powers: [
            fnGetP(fnT, "dominate", 1, "cloudMemory"),
            fnGetP(fnT, "dominate", 1, "compel"),
            fnGetP(fnT, "dominate", 2, "mesmerize"),
            fnGetP(fnT, "dominate", 2, "dementation"),
            fnGetP(fnT, "dominate", 3, "theForgetfulMind"),
            fnGetP(fnT, "dominate", 3, "submergedDirective"),
            fnGetP(fnT, "dominate", 4, "rationalize"),
            fnGetP(fnT, "dominate", 5, "massManipulation"),
            fnGetP(fnT, "dominate", 5, "terminalDecree")
        ]
    },
    "Fortitude": {
        name: fnT('disciplines.fortitude.name'),
        description: fnT('disciplines.fortitude.description'),
        powers: [
            fnGetP(fnT, "fortitude", 1, "resilience"),
            fnGetP(fnT, "fortitude", 1, "unswayableMind"),
            fnGetP(fnT, "fortitude", 2, "toughness"),
            fnGetP(fnT, "fortitude", 3, "defyBane"),
            fnGetP(fnT, "fortitude", 3, "fortifyTheInnerFacade"),
            fnGetP(fnT, "fortitude", 4, "draughtOfEndurance"),
            fnGetP(fnT, "fortitude", 5, "fleshOfMarble"),
            fnGetP(fnT, "fortitude", 5, "prowessFromPain")
        ]
    },
    "Obfuscate": {
        name: fnT('disciplines.obfuscate.name'),
        description: fnT('disciplines.obfuscate.description'),
        powers: [
            fnGetP(fnT, "obfuscate", 1, "cloakOfShadows"),
            fnGetP(fnT, "obfuscate", 1, "silenceOfDeath"),
            fnGetP(fnT, "obfuscate", 2, "unseenPassage"),
            fnGetP(fnT, "obfuscate", 3, "ghostInTheMachine"),
            fnGetP(fnT, "obfuscate", 3, "maskOfAThousandFaces"),
            fnGetP(fnT, "obfuscate", 4, "vanish"),
            fnGetP(fnT, "obfuscate", 5, "cloakTheGathering"),
            fnGetP(fnT, "obfuscate", 5, "impostorsGuise")
        ]
    },
    "Potence": {
        name: fnT('disciplines.potence.name'),
        description: fnT('disciplines.potence.description'),
        powers: [
            fnGetP(fnT, "potence", 1, "lethalBody"),
            fnGetP(fnT, "potence", 1, "soaringLeap"),
            fnGetP(fnT, "potence", 2, "prowess"),
            fnGetP(fnT, "potence", 3, "brutalFeed"),
            fnGetP(fnT, "potence", 3, "sparkOfRage"),
            fnGetP(fnT, "potence", 4, "draughtOfMight"),
            fnGetP(fnT, "potence", 5, "earthshock"),
            fnGetP(fnT, "potence", 5, "fistOfCaine")
        ]
    },
    "Presence": {
        name: fnT('disciplines.presence.name'),
        description: fnT('disciplines.presence.description'),
        powers: [
            fnGetP(fnT, "presence", 1, "awe"),
            fnGetP(fnT, "presence", 1, "daunt"),
            fnGetP(fnT, "presence", 2, "lingeringKiss"),
            fnGetP(fnT, "presence", 3, "dreadGaze"),
            fnGetP(fnT, "presence", 3, "entrancement"),
            fnGetP(fnT, "presence", 4, "irresistibleVoice"),
            fnGetP(fnT, "presence", 4, "summon"),
            fnGetP(fnT, "presence", 5, "majesty"),
            fnGetP(fnT, "presence", 5, "starMagnetism")
        ]
    },
    "Protean": {
        name: fnT('disciplines.protean.name'),
        description: fnT('disciplines.protean.description'),
        powers: [
            fnGetP(fnT, "protean", 1, "eyesOfTheBeast"),
            fnGetP(fnT, "protean", 1, "weightOfTheFeather"),
            fnGetP(fnT, "protean", 2, "feralWeapons"),
            fnGetP(fnT, "protean", 3, "earthMeld"),
            fnGetP(fnT, "protean", 3, "shapechange"),
            fnGetP(fnT, "protean", 4, "metamorphosis"),
            fnGetP(fnT, "protean", 5, "mistForm"),
            fnGetP(fnT, "protean", 5, "theUnfetteredHeart")
        ]
    },
    "Blood Sorcery": {
        name: fnT('disciplines.bloodsorcery.name'),
        description: fnT('disciplines.bloodsorcery.description'),
        powers: [
            fnGetP(fnT, "bloodsorcery", 1, "corrosiveVitae"),
            fnGetP(fnT, "bloodsorcery", 1, "aTasteForBlood"),
            fnGetP(fnT, "bloodsorcery", 2, "extinguishVitae"),
            fnGetP(fnT, "bloodsorcery", 3, "bloodOfPotency"),
            fnGetP(fnT, "bloodsorcery", 3, "scorpionsTouch"),
            fnGetP(fnT, "bloodsorcery", 4, "theftOfVitae"),
            fnGetP(fnT, "bloodsorcery", 5, "baalsCaress"),
            fnGetP(fnT, "bloodsorcery", 5, "cauldronOfBlood")
        ]
    },
    "Oblivion": {
        name: fnT('disciplines.oblivion.name'),
        description: fnT('disciplines.oblivion.description'),
        powers: [
             fnGetP(fnT, "oblivion", 1, "shadowCloak"),
             fnGetP(fnT, "oblivion", 1, "oblivionsSight"),
             fnGetP(fnT, "oblivion", 2, "armsOfAhriman"),
             fnGetP(fnT, "oblivion", 2, "shadowCast"),
             fnGetP(fnT, "oblivion", 3, "touchOfOblivion"),
             fnGetP(fnT, "oblivion", 4, "stygianShroud"),
             fnGetP(fnT, "oblivion", 5, "tenebrousAvatar")
        ]
    },
     "Thin-Blood Alchemy": {
        name: fnT('disciplines.thinbloodalchemy.name'),
        description: fnT('disciplines.thinbloodalchemy.description'),
        powers: [
             fnGetP(fnT, "thinbloodalchemy", 1, "farReach"),
        ]
    },
    "Ragabash Gifts": {
        name: fnT('disciplines.ragabashGifts.name'),
        description: fnT('disciplines.ragabashGifts.description'),
        powers: [
            fnGetP(fnT, "ragabashGifts", 1, "blurOfTheMilkyEye"),
            fnGetP(fnT, "ragabashGifts", 1, "liarsFace"),
        ]
    },
    "Theurge Gifts": {
        name: fnT('disciplines.theurgeGifts.name'),
        description: fnT('disciplines.theurgeGifts.description'),
        powers: [
            fnGetP(fnT, "theurgeGifts", 1, "senseWyrm"),
            fnGetP(fnT, "theurgeGifts", 1, "spiritSpeech"),
        ]
    },
    "Philodox Gifts": {
        name: fnT('disciplines.philodoxGifts.name'),
        description: fnT('disciplines.philodoxGifts.description'),
        powers: [
            fnGetP(fnT, "philodoxGifts", 1, "kingOfTheBeasts"),
            fnGetP(fnT, "philodoxGifts", 1, "truthOfGaia"),
        ]
    },
    "Galliard Gifts": {
        name: fnT('disciplines.galliardGifts.name'),
        description: fnT('disciplines.galliardGifts.description'),
        powers: [
            fnGetP(fnT, "galliardGifts", 1, "callOfTheWyld"),
            fnGetP(fnT, "galliardGifts", 1, "mindspeak"),
        ]
    },
    "AhrounGifts": {
        name: fnT('disciplines.ahrounGifts.name'),
        description: fnT('disciplines.ahrounGifts.description'),
        powers: [
            fnGetP(fnT, "ahrounGifts", 1, "fallingTouch"),
            fnGetP(fnT, "ahrounGifts", 1, "senseSilver"),
        ]
    },
    "Black Furies Gifts": {
        name: fnT('disciplines.blackFuriesGifts.name'),
        description: fnT('disciplines.blackFuriesGifts.description'),
        powers: [
            fnGetP(fnT, "blackFuriesGifts", 1, "breathOfTheWyld"),
            fnGetP(fnT, "blackFuriesGifts", 1, "heightenedSenses"),
        ]
    },
    "Bone Gnawers Gifts": {
        name: fnT('disciplines.boneGnawersGifts.name'),
        description: fnT('disciplines.boneGnawersGifts.description'),
        powers: [
            fnGetP(fnT, "boneGnawersGifts", 1, "cooking"),
            fnGetP(fnT, "boneGnawersGifts", 1, "scentOfSweetSuccess"),
        ]
    },
    "Children of Gaia Gifts": {
        name: fnT('disciplines.childrenOfGaiaGifts.name'),
        description: fnT('disciplines.childrenOfGaiaGifts.description'),
        powers: [
            fnGetP(fnT, "childrenOfGaiaGifts", 1, "dazzle"),
            fnGetP(fnT, "childrenOfGaiaGifts", 1, "resistPain"),
        ]
    },
    "Galestalkers Gifts": {
        name: fnT('disciplines.galestalkersGifts.name'),
        description: fnT('disciplines.galestalkersGifts.description'),
        powers: [
            fnGetP(fnT, "galestalkersGifts", 1, "beastSpeech"),
            fnGetP(fnT, "galestalkersGifts", 1, "tracklessStep"),
        ]
    },
    "Ghost Council Gifts": {
        name: fnT('disciplines.ghostCouncilGifts.name'),
        description: fnT('disciplines.ghostCouncilGifts.description'),
        powers: [
            fnGetP(fnT, "ghostCouncilGifts", 1, "spiritClaw"),
            fnGetP(fnT, "ghostCouncilGifts", 1, "umbralTether"),
        ]
    },
    "Glass Walkers Gifts": {
        name: fnT('disciplines.glassWalkersGifts.name'),
        description: fnT('disciplines.glassWalkersGifts.description'),
        powers: [
            fnGetP(fnT, "glassWalkersGifts", 1, "controlSimpleMachine"),
            fnGetP(fnT, "glassWalkersGifts", 1, "plugAndPlay"),
        ]
    },
    "Hart Wardens Gifts": {
        name: fnT('disciplines.hartWardensGifts.name'),
        description: fnT('disciplines.hartWardensGifts.description'),
        powers: [
            fnGetP(fnT, "hartWardensGifts", 1, "naturesBounty"),
            fnGetP(fnT, "hartWardensGifts", 1, "wardTheHaven"),
        ]
    },
    "Red Talons Gifts": {
        name: fnT('disciplines.redTalonsGifts.name'),
        description: fnT('disciplines.redTalonsGifts.description'),
        powers: [
            fnGetP(fnT, "redTalonsGifts", 1, "beastLife"),
            fnGetP(fnT, "redTalonsGifts", 1, "hiddenKiller"),
        ]
    },
    "Shadow Lords Gifts": {
        name: fnT('disciplines.shadowLordsGifts.name'),
        description: fnT('disciplines.shadowLordsGifts.description'),
        powers: [
            fnGetP(fnT, "shadowLordsGifts", 1, "auraOfConfidence"),
            fnGetP(fnT, "shadowLordsGifts", 1, "fatalFlaw"),
        ]
    },
    "Silver Fangs Gifts": {
        name: fnT('disciplines.silverFangsGifts.name'),
        description: fnT('disciplines.silverFangsGifts.description'),
        powers: [
            fnGetP(fnT, "silverFangsGifts", 1, "falconsGrasp"),
            fnGetP(fnT, "silverFangsGifts", 1, "senseWyrm"),
        ]
    },
    "Silent Striders Gifts": {
        name: fnT('disciplines.silentStridersGifts.name'),
        description: fnT('disciplines.silentStridersGifts.description'),
        powers: [
            fnGetP(fnT, "silentStridersGifts", 1, "speedOfThought"),
            fnGetP(fnT, "silentStridersGifts", 1, "messengersFortitude"),
        ]
    },
    "Innate Gifts": {
        name: fnT('disciplines.innateGifts.name'),
        description: fnT('disciplines.innateGifts.description'),
        powers: [
            fnGetP(fnT, "innateGifts", 1, "olharDesconcertante"),
            fnGetP(fnT, "innateGifts", 1, "olhosDaCoruja"),
            fnGetP(fnT, "innateGifts", 1, "pancadaFuriosa"),
            fnGetP(fnT, "innateGifts", 1, "pesDeGato"),
            fnGetP(fnT, "innateGifts", 1, "saltoDaLebre"),
            fnGetP(fnT, "innateGifts", 1, "sentidosCrepusculares"),
            fnGetP(fnT, "innateGifts", 1, "skinLaceration"),
            fnGetP(fnT, "innateGifts", 1, "lycanthropeBite"),
            fnGetP(fnT, "innateGifts", 1, "urbanHunter"),
            fnGetP(fnT, "innateGifts", 1, "corruptedMemories"),
            fnGetP(fnT, "innateGifts", 1, "cuttingWords"),
            fnGetP(fnT, "innateGifts", 1, "hungryTeeth"),
            fnGetP(fnT, "innateGifts", 1, "wyrmSpeech"),
            fnGetP(fnT, "innateGifts", 1, "mouthFullOfTeeth"),
        ]
    },
});


export const aAttributeList = Object.values(Attribute);
export const aSkillList = Object.values(Skill);

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
  disciplineCombos: [],
  rituals: [],
  talismans: [],
  predatorType: null,
  humanity: 7,
  hunger: 1,
  rage: 1,
  harano: 0,
  hauglosk: 0,
  renown: { glory: 0, honor: 0, wisdom: 0 },
  health: 0, 
  willpower: 0, 
  bloodPotency: 1,
  touchstones: '',
  advantages: [],
  flaws: [],
  specialties: [],
  portraitUrl: '',
  loresheets: []
};
