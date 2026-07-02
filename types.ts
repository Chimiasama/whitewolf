
export enum GameType {
  Vampire = "Vampire",
  Werewolf = "Werewolf"
}

export enum Tribe {
  BlackFuries = "blackfuries",
  BoneGnawers = "bonegnawers",
  ChildrenOfGaia = "childrenofgaia",
  Galestalkers = "galestalkers",
  GhostCouncil = "ghostcouncil",
  GlassWalkers = "glasswalkers",
  HartWardens = "hartwardens",
  RedTalons = "redtalons",
  ShadowLords = "shadowlords",
  SilverFangs = "silverfangs",
  SilentStriders = "silentstriders"
}

export enum Auspice {
  Ragabash = "ragabash",
  Theurge = "theurge",
  Philodox = "philodox",
  Galliard = "galliard",
  Ahroun = "ahroun"
}

export enum Clan {
  Brujah = "brujah",
  Gangrel = "gangrel",
  Malkavian = "malkavian",
  Nosferatu = "nosferatu",
  Toreador = "toreador",
  Tremere = "tremere",
  Ventrue = "ventrue",
  BanuHaqim = "banuhaqim",
  TheMinistry = "theministry",
  Lasombra = "lasombra",
  Caitiff = "caitiff",
  ThinBlood = "thinblood"
}

export enum Attribute {
  Strength = "Strength",
  Dexterity = "Dexterity",
  Stamina = "Stamina",
  Charisma = "Charisma",
  Manipulation = "Manipulation",
  Composure = "Composure",
  Intelligence = "Intelligence",
  Wits = "Wits",
  Resolve = "Resolve"
}

export enum Skill {
  Athletics = "Athletics",
  Brawl = "Brawl",
  Craft = "Craft",
  Drive = "Drive",
  Firearms = "Firearms",
  Larceny = "Larceny",
  Melee = "Melee",
  Stealth = "Stealth",
  Survival = "Survival",
  AnimalKen = "Animal Ken",
  Etiquette = "Etiquette",
  Insight = "Insight",
  Intimidation = "Intimidation",
  Leadership = "Leadership",
  Performance = "Performance",
  Persuasion = "Persuasion",
  Streetwise = "Streetwise",
  Subterfuge = "Subterfuge",
  Academics = "Academics",
  Awareness = "Awareness",
  Finance = "Finance",
  Investigation = "Investigation",
  Medicine = "Medicine",
  Occult = "Occult",
  Politics = "Politics",
  Science = "Science",
  Technology = "Technology"
}

export type Attributes = Record<Attribute, number>;
export type Skills = Record<Skill, number>;
export type Disciplines = Record<string, number>;

export interface DisciplinePower {
    id: string; 
    level: number;
    name: string;
    description: string;
    system: string;
    cost?: string;
}

export interface DisciplineDetail {
    name: string;
    description: string;
    powers: DisciplinePower[];
}

export interface DisciplineCombo {
    id: string;
    name: string;
    description: string;
    requirements: { discipline: string, level: number }[];
    system: string;
    cost?: string;
}

export interface AdvantageFlaw {
    id: string;
    name: string;
    description: string;
    cost: number;
    type: 'advantage' | 'flaw';
    levels?: number[]; 
}

export interface Specialty {
    skill: Skill;
    name: string;
}

export interface PredatorTypeDetail {
    id: string;
    name: string;
    description: string;
    disciplineAdd?: { discipline: string, dots: number };
    humanityModifier: number;
    advantages: AdvantageFlaw[];
    flaws: AdvantageFlaw[];
    specialties: Specialty[];         
    specialtyOptions?: Specialty[];   
}


export interface LoresheetLevel {
    level: number;
    name: string;
    description: string;
    system: string;
}

export interface Loresheet {
    id: string;
    name: string;
    description: string;
    levels: LoresheetLevel[];
}

export interface Character {
  gameType: GameType | null;
  name: string;
  concept: string;
  ambition: string;
  desire: string;
  // Vampire specific
  clan?: Clan | null;
  sire?: string;
  generation: number;
  bloodPotency: number;
  hunger: number;
  humanity: number;
  // Werewolf specific
  tribe?: Tribe | null;
  auspice?: Auspice | null;
  mentor?: string;
  rage: number;
  harano: number;
  hauglosk: number;
  renown: {
    glory: number, 
    honor: number, 
    wisdom: number,
    shame?: { glory?: boolean, honor?: boolean, wisdom?: boolean } 
  };
  
  attributes: Attributes;
  skills: Skills;
  disciplines: Disciplines; // Used for Gifts in Werewolf
  disciplinePowers: Record<string, string[]>; 
  disciplineCombos: DisciplineCombo[];
  rituals: { id: string, name: string, description: string }[];
  talismans: { id: string, name: string, description: string }[];
  predatorType: string | null;
  health: number | null;
  willpower: number | null;
  touchstones: string;
  advantages: AdvantageFlaw[];
  flaws: AdvantageFlaw[];
  loresheets: { id: string, level: number }[];
  specialties: Specialty[];
  portraitUrl?: string;
}
