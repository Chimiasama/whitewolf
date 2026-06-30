
import { GameType } from '../types';

// Types
type Gender = 'male' | 'female';

interface LocalizedData {
    titles: { 
        vampire: { male: string[], female: string[] },
        werewolf: { male: string[], female: string[] }
    };
    firstNames: { male: string[], female: string[] };
    lastNames: string[];
    // Concepts are stored as tuples [MaleVariant, FemaleVariant]
    adjectives: [string, string][]; 
    roles: {
        vampire: [string, string][],
        werewolf: [string, string][]
    };
    contexts: {
        vampire: [string, string][],
        werewolf: [string, string][]
    };
}

const DATA: Record<'en' | 'pt', LocalizedData> = {
    en: {
        titles: {
            vampire: {
                male: ["Mr.", "Dr.", "Prof.", "Rev.", "Father", "Det.", "Officer", "Agent", "Judge", "Senator", "Mayor", "Prince", "Baron", "Sheriff", "Sir", "Lord", "Duke", "Bishop", "Elder", "Squire"],
                female: ["Ms.", "Mrs.", "Mx.", "Dr.", "Prof.", "Rev.", "Sister", "Det.", "Officer", "Agent", "Judge", "Senator", "Mayor", "Princess", "Baroness", "Sheriff", "Dame", "Lady", "Duchess", "Mother", "Matriarch"]
            },
            werewolf: {
                male: ["Alpha", "Beta", "Galliard", "Ahroun", "Theurge", "Philodox", "Ragabash", "Elder", "Sept Leader", "Guardian", "Sentinel", "Pack Brother", "Wanderer", "Spirit-Talker"],
                female: ["Alpha", "Beta", "Galliard", "Ahroun", "Theurge", "Philodox", "Ragabash", "Elder", "Sept Leader", "Guardian", "Sentinel", "Pack Sister", "Wanderer", "Spirit-Talker"]
            }
        },
        firstNames: {
            male: [
                "Alexander", "Adrian", "Arthur", "Asher", "Benjamin", "Caleb", "Cyrus", "Damian", "Darius", "Dante", 
                "Elias", "Ezra", "Felix", "Gabriel", "Gideon", "Hector", "Hugo", "Ivan", "Isaac", "Jasper", 
                "Julian", "Jonah", "Kai", "Kieran", "Lucas", "Lucian", "Leo", "Magnus", "Marcus", "Milo", 
                "Nathaniel", "Nikolai", "Oliver", "Orion", "Phoenix", "Preston", "Quinn", "Raphael", "Rowan", 
                "Sebastian", "Silas", "Soren", "Tobias", "Theodore", "Tristan", "Ulysses", "Victor", "Vincent", 
                "William", "Xavier", "Zachary", "Zeke", "Ren", "Jin", "Malakai", "Desmond", "Killian", "Roman"
            ],
            female: [
                "Amelia", "Aisha", "Aurora", "Bella", "Bianca", "Cassandra", "Celeste", "Delilah", "Elena", "Eva", 
                "Fiona", "Grace", "Hazel", "Iris", "Isabella", "Jade", "Katerina", "Lilith", "Luna", "Mara", 
                "Nadia", "Nora", "Octavia", "Ophelia", "Penelope", "Phoenix", "Quinn", "Raven", "Roxanne", 
                "Sophia", "Seraphina", "Talia", "Victoria", "Violet", "Willow", "Yasmine", "Zara", "Yuki", "Mei",
                "Elowen", "Genevieve", "Isolde", "Morgana", "Valerie", "Sloane", "Odette", "Freya"
            ]
        },
        lastNames: [
            "Abbott", "Adler", "Alvarez", "Ashford", "Bainbridge", "Blackwood", "Black", "Carver", "Castillo", 
            "Chambers", "Chen", "Cohen", "Corvinus", "Croft", "Cross", "Danvers", "Draven", "Dubois", "Dupont", 
            "Evans", "Falkner", "Faust", "Frost", "Gallo", "Giovanni", "Graves", "Grey", "Grimm", "Harker", 
            "Holloway", "Hunt", "Hyde", "Ibrahim", "Jones", "Kane", "Keaton", "King", "Knight", "Kovacs", 
            "Lecroix", "Lee", "Locke", "Lovlace", "Lupo", "Magnus", "Malone", "Mercer", "Miller", "Monroe", 
            "Moreau", "Moriarty", "Nash", "Night", "North", "O'Connell", "Orlock", "Patel", "Pierce", "Price", 
            "Quinn", "Ravenwood", "Reed", "Reeve", "Ricci", "Rossi", "Roth", "Russo", "Saber", "Salem", 
            "Salvatore", "Santos", "Shaw", "Sinclair", "Snow", "Solomon", "Steele", "Sterling", "Stone", "Storm", 
            "Strauss", "Sullivan", "Tanaka", "Thorne", "Valentine", "Vane", "Vega", "Vore", "Walker", "Ward", 
            "West", "White", "Winter", "Wolf", "Wright", "Xang", "York", "Young", "Zhang", "Vancortland", "Pendleton"
        ],
        adjectives: [
            ["Corrupt", "Corrupt"], ["Idealistic", "Idealistic"], ["Disgraced", "Disgraced"], 
            ["Wealthy", "Wealthy"], ["Homeless", "Homeless"], ["Vengeful", "Vengeful"],
            ["Addicted", "Addicted"], ["Charming", "Charming"], ["Reclusive", "Reclusive"], 
            ["Fanatical", "Fanatical"], ["Cynical", "Cynical"], ["Naive", "Naive"],
            ["Ruthless", "Ruthless"], ["Gentle", "Gentle"], ["Violent", "Violent"], 
            ["Brilliant", "Brilliant"], ["Mad", "Mad"], ["Silent", "Silent"], ["Lost", "Lost"],
            ["Ambitious", "Ambitious"], ["Lazy", "Lazy"], ["Paranoid", "Paranoid"], 
            ["Famous", "Famous"], ["Infamous", "Infamous"], ["Forgotten", "Forgotten"],
            ["Undead", "Undead"], ["Ancient", "Ancient"], ["Modern", "Modern"], 
            ["Tech-savvy", "Tech-savvy"], ["Traditional", "Traditional"], ["Elegant", "Elegant"],
            ["Sloppy", "Sloppy"], ["Aggressive", "Aggressive"], ["Passive", "Passive"], 
            ["Manipulative", "Manipulative"], ["Honest", "Honest"], ["Loyal", "Loyal"],
            ["Traitorous", "Traitorous"], ["Reluctant", "Reluctant"], ["Eager", "Eager"], 
            ["Melancholy", "Melancholy"], ["Stoic", "Stoic"], ["Feral", "Feral"],
            ["Morose", "Morose"], ["Obsessive", "Obsessive"], ["Calculating", "Calculating"]
        ],
        roles: {
            vampire: [
                ["Detective", "Detective"], ["Surgeon", "Surgeon"], ["Hacker", "Hacker"], 
                ["Influencer", "Influencer"], ["Drug Dealer", "Drug Dealer"], ["CEO", "CEO"],
                ["Artist", "Artist"], ["Musician", "Musician"], ["Bouncer", "Bouncer"], 
                ["Professor", "Professor"], ["Student", "Student"], ["Politician", "Politician"],
                ["Lawyer", "Lawyer"], ["Judge", "Judge"], ["Criminal", "Criminal"], 
                ["Thief", "Thief"], ["Assassin", "Assassin"], ["Soldier", "Soldier"], ["Mercenary", "Mercenary"],
                ["Priest", "Priestess"], ["Occultist", "Occultist"], ["Historian", "Historian"], 
                ["Librarian", "Librarian"], ["Scientist", "Scientist"], ["Coder", "Coder"],
                ["Model", "Model"], ["Actor", "Actress"], ["Director", "Director"], 
                ["Writer", "Writer"], ["Journalist", "Journalist"], ["Activist", "Activist"],
                ["Anarchist", "Anarchist"], ["Loyalist", "Loyalist"], ["Autarkis", "Autarkis"], 
                ["Sire", "Sire"], ["Childe", "Childe"], ["Ghoul-Master", "Ghoul-Master"],
                ["Blood Doll", "Blood Doll"], ["Fixer", "Fixer"], ["Cleaner", "Cleaner"], 
                ["Driver", "Driver"], ["Pilot", "Pilot"], ["Chef", "Chef"], ["Bartender", "Bartender"],
                ["Club Owner", "Club Owner"], ["Socialite", "Socialite"], ["Heir", "Heiress"], 
                ["Vigilante", "Vigilante"], ["Paramedic", "Paramedic"], ["Coroner", "Coroner"],
                ["Spy", "Spy"], ["Escort", "Escort"], ["Graverobber", "Graverobber"], ["Cultist", "Cultist"]
            ],
            werewolf: [
                ["Pack Member", "Pack Member"], ["Kinfolk", "Kinfolk"], ["Spirit Talker", "Spirit Talker"], 
                ["Guardian", "Guardian"], ["Tracker", "Tracker"], ["Warrior", "Warrior"],
                ["Visionary", "Visionary"], ["Judge", "Judge"], ["Trickster", "Trickster"],
                ["Caern Keeper", "Caern Keeper"], ["Lore-Singer", "Lore-Singer"], ["Ghost Hunter", "Ghost Hunter"],
                ["Wilderness Guide", "Wilderness Guide"], ["Urban Predator", "Urban Predator"], ["Eco-Terrorist", "Eco-Terrorist"],
                ["Shaman", "Shaman"], ["Mystic", "Mystic"], ["Protector", "Protector"], ["Scout", "Scout"]
            ]
        },
        contexts: {
            vampire: [
                ["seeking redemption", "seeking redemption"], ["running from the past", "running from the past"], 
                ["with a dark secret", "with a dark secret"], ["working for the Prince", "working for the Prince"], 
                ["plotting a coup", "plotting a coup"], ["addicted to vitae", "addicted to vitae"],
                ["protecting a mortal family", "protecting a mortal family"], ["hunting a rival", "hunting a rival"], 
                ["obsessed with Gehenna", "obsessed with Gehenna"], ["looking for the truth", "looking for the truth"], 
                ["hiding in plain sight", "hiding in plain sight"], ["of the Camarilla", "of the Camarilla"],
                ["of the Anarch Movement", "of the Anarch Movement"], ["feared by the kine", "feared by the kine"], 
                ["loved by the kine", "loved by the kine"], ["fighting the Second Inquisition", "fighting the Second Inquisition"], 
                ["servant of an Elder", "servant of an Elder"], ["master of shadows", "mistress of shadows"],
                ["seeking Golconda", "seeking Golconda"], ["lost in the modern nights", "lost in the modern nights"], 
                ["dealing in favors", "dealing in favors"], ["preserving the Masquerade", "preserving the Masquerade"], 
                ["breaking every rule", "breaking every rule"], ["from the old country", "from the old country"],
                ["with a vendetta", "with a vendetta"], ["haunted by a ghost", "haunted by a ghost"], 
                ["cursed by a warlock", "cursed by a warlock"], ["living in the sewers", "living in the sewers"],
                ["pulling the strings", "pulling the strings"]
            ],
            werewolf: [
                ["seeking balance", "seeking balance"], ["protecting the territory", "protecting the territory"],
                ["hunting the Wyrm", "hunting the Wyrm"], ["serving Gaia", "serving Gaia"],
                ["in constant rage", "in constant rage"], ["seeking wisdom", "seeking wisdom"],
                ["honoring the ancestors", "honoring the ancestors"], ["fleeing destruction", "fleeing destruction"],
                ["rebuilding the pack", "rebuilding the pack"], ["communing with spirits", "communing with spirits"],
                ["guarding the caern", "guarding the caern"], ["lost in the Umbra", "lost in the Umbra"],
                ["fighting for the future", "fighting for the future"], ["avenging a fallen kin", "avenging a fallen kin"]
            ]
        }
    },
    pt: {
        titles: {
            vampire: {
                male: ["Sr.", "Dr.", "Prof.", "Pe.", "Frei", "Det.", "Oficial", "Agente", "Juiz", "Senador", "Prefeito", "Príncipe", "Barão", "Primogênito", "Xerife", "Látego", "Guardião", "Flagelo", "Sir", "Lorde", "Duque", "Bispo", "Ancião", "Escudeiro"],
                female: ["Sra.", "Srta.", "Dra.", "Prof.", "Irmã", "Mãe", "Det.", "Oficial", "Agente", "Juíza", "Senadora", "Prefeita", "Princesa", "Baronesa", "Primogênita", "Xerife", "Látego", "Guardiã", "Flagelo", "Dama", "Lady", "Duquesa", "Bispa", "Anciã"]
            },
            werewolf: {
                male: ["Alfa", "Beta", "Galliard", "Ahroun", "Theurge", "Philodox", "Ragabash", "Ancião", "Líder de Seita", "Guardião", "Sentinela", "Irmão de Matilha", "Andarilho", "Falante de Espíritos"],
                female: ["Alfa", "Beta", "Galliard", "Ahroun", "Theurge", "Philodox", "Ragabash", "Anciã", "Líder de Seita", "Guardiã", "Sentinela", "Irmã de Matilha", "Andarilha", "Falante de Espíritos"]
            }
        },
        firstNames: {
            male: [
                "Miguel", "Arthur", "Gael", "Heitor", "Bernardo", "Samuel", "Pedro", "Gabriel", "Enzo", "Matheus", 
                "Lucas", "João", "Francisco", "Otávio", "Augusto", "Caio", "Vinícius", "Rafael", "Daniel", "Thiago", 
                "Bruno", "Eduardo", "Leonardo", "Vitor", "Antônio", "Carlos", "José", "Paulo", "Luís", "Marcos", 
                "André", "Felipe", "Ricardo", "Fernando", "Gustavo", "Henrique", "Igor", "Jorge", "Luan", "Marcelo",
                "Murilo", "Hugo", "Yuri", "Erick", "Bento", "Dante", "Calebe", "Benjamin", "Valentim", "Vicente"
            ],
            female: [
                "Helena", "Alice", "Laura", "Manuela", "Valentina", "Heloísa", "Luiza", "Giovanna", "Maria", 
                "Beatriz", "Cecília", "Maitê", "Isabela", "Lara", "Esther", "Marina", "Juliana", "Camila", 
                "Larissa", "Letícia", "Amanda", "Bruna", "Júlia", "Fernanda", "Ana", "Clara", "Daniela", 
                "Elisa", "Fabiana", "Gabriela", "Jéssica", "Lorena", "Mariana", "Natália", "Olívia", "Patrícia",
                "Emanuelly", "Vitória", "Sophia", "Rebeca", "Bianca", "Clarice", "Yasmin", "Luna", "Jade"
            ]
        },
        lastNames: [
            "Silva", "Santos", "Oliveira", "Souza", "Rodrigues", "Ferreira", "Alves", "Pereira", 
            "Lima", "Gomes", "Costa", "Ribeiro", "Martins", "Carvalho", "Almeida", "Lopes", 
            "Soares", "Fernandes", "Vieira", "Barbosa", "Rocha", "Dias", "Nascimento", "Andrade", 
            "Moreira", "Nunes", "Marques", "Machado", "Mendes", "Freitas", "Cardoso", "Ramos", 
            "Gonçalves", "Santana", "Teixeira", "Melo", "Barros", "Correia", "Moura", "Cavalcanti", 
            "Duarte", "Braga", "Pinto", "Guimarães", "Azevedo", "Campos", "Coelho", "Lacerda", "Figueiredo"
        ],
        adjectives: [
            ["Corrupto", "Corrupta"], ["Idealista", "Idealista"], ["Desonrado", "Desonrada"], 
            ["Rico", "Rica"], ["Sem-teto", "Sem-teto"], ["Vingativo", "Vingativa"],
            ["Viciado", "Viciada"], ["Charmoso", "Charmosa"], ["Recluso", "Reclusa"], 
            ["Fanático", "Fanática"], ["Cínico", "Cínica"], ["Ingênuo", "Ingênua"],
            ["Implacável", "Implacável"], ["Gentil", "Gentil"], ["Violento", "Violenta"], 
            ["Brilhante", "Brilhante"], ["Louco", "Louca"], ["Silencioso", "Silenciosa"], ["Perdido", "Perdida"],
            ["Ambicioso", "Ambiciosa"], ["Preguiçoso", "Preguiçosa"], ["Paranoico", "Paranoica"], 
            ["Famoso", "Famosa"], ["Infame", "Infame"], ["Esquecido", "Esquecida"],
            ["Morto-vivo", "Morto-viva"], ["Antigo", "Antiga"], ["Moderno", "Moderna"], 
            ["Tecnológico", "Tecnológica"], ["Tradicional", "Tradicional"], ["Elegante", "Elegante"],
            ["Desleixado", "Desleixada"], ["Agressivo", "Agressiva"], ["Passivo", "Passiva"], 
            ["Manipulador", "Manipuladora"], ["Honesto", "Honesta"], ["Leal", "Leal"],
            ["Traidor", "Traidora"], ["Relutante", "Relutante"], ["Ansioso", "Ansiosa"], 
            ["Melancólico", "Melancólica"], ["Estoico", "Estoica"], ["Feral", "Feral"],
            ["Calculista", "Calculista"], ["Obsessivo", "Obsessiva"], ["Deprimido", "Deprimida"]
        ],
        roles: {
            vampire: [
                ["Detetive", "Detetive"], ["Cirurgião", "Cirurgiã"], ["Hacker", "Hacker"], 
                ["Influencer", "Influencer"], ["Traficante", "Traficante"], ["CEO", "CEO"],
                ["Artista", "Artista"], ["Músico", "Música"], ["Leão de Chácara", "Leoa de Chácara"], 
                ["Professor", "Professora"], ["Estudante", "Estudante"], ["Político", "Política"],
                ["Advogado", "Advogada"], ["Juiz", "Juíza"], ["Criminoso", "Criminosa"], 
                ["Ladrão", "Ladra"], ["Assassino", "Assassina"], ["Soldado", "Soldada"], ["Mercenário", "Mercenária"],
                ["Padre", "Freira"], ["Ocultista", "Ocultista"], ["Historiador", "Historiadora"], 
                ["Bibliotecário", "Bibliotecária"], ["Cientista", "Cientista"], ["Programador", "Programadora"],
                ["Modelo", "Modelo"], ["Ator", "Atriz"], ["Diretor", "Diretora"], 
                ["Escritor", "Escritora"], ["Jornalista", "Jornalista"], ["Ativista", "Ativista"],
                ["Anarquista", "Anarquista"], ["Legalista", "Legalista"], ["Autarca", "Autarca"], 
                ["Senhor", "Senhora"], ["Cria", "Cria"], ["Mestre de Carniçal", "Mestra de Carniçal"],
                ["Boneca de Sangue", "Boneca de Sangue"], ["Agente", "Agente"], ["Limpador", "Limpador"], 
                ["Motorista", "Motorista"], ["Piloto", "Piloto"], ["Chef", "Chef"], ["Bartender", "Bartender"],
                ["Dono de Clube", "Dona de Clube"], ["Socialite", "Socialite"], ["Herdeiro", "Herdeira"], 
                ["Vigilante", "Vigilante"], ["Paramédico", "Paramédica"], ["Legista", "Legista"],
                ["Espião", "Espiã"], ["Escolta", "Escolta"], ["Saqueador de Túmulos", "Saqueadora de Túmulos"], ["Cultista", "Cultista"]
            ],
            werewolf: [
                ["Membro da Matilha", "Membro da Matilha"], ["Parentela", "Parentela"], ["Falante de Espíritos", "Falante de Espíritos"], 
                ["Guardião", "Guardiã"], ["Rastreador", "Rastreadora"], ["Guerreiro", "Guerreira"],
                ["Visionário", "Visionária"], ["Juiz", "Juíza"], ["Trapaceiro", "Trapaceira"],
                ["Guardião do Caern", "Guardiã do Caern"], ["Cantor de Lendas", "Cantora de Lendas"], ["Caçador de Fantasmas", "Caçadora de Fantasmas"],
                ["Guia Selvagem", "Guia Selvagem"], ["Predador Urbano", "Predadora Urbana"], ["Eco-Terrorista", "Eco-Terrorista"],
                ["Xamã", "Xamã"], ["Místico", "Mística"], ["Protetor", "Protetora"], ["Batedor", "Batedora"]
            ]
        },
        contexts: {
            vampire: [
                ["buscando redenção", "buscando redenção"], ["fugindo do passado", "fugindo do passado"], 
                ["com um segredo sombrio", "com um segredo sombrio"], ["trabalhando para o Príncipe", "trabalhando para o Príncipe"], 
                ["planejando um golpe", "planejando um golpe"], ["viciado em vitae", "viciada em vitae"],
                ["protegendo uma família mortal", "protegendo uma família mortal"], ["caçando um rival", "caçando uma rival"], 
                ["obcecado pela Gehenna", "obcecada pela Gehenna"], ["procurando a verdade", "procurando a verdade"], 
                ["escondido à vista de todos", "escondida à vista de todos"], ["da Camarilla", "da Camarilla"],
                ["do Movimento Anarquista", "do Movimento Anarquista"], ["temido pelo rebanho", "temida pelo rebanho"], 
                ["amado pelo rebanho", "amada pelo rebanho"], ["lutando contra a Segunda Inquisição", "lutando contra a Segunda Inquisição"], 
                ["servo de um Ancião", "serva de um Ancião"], ["mestre das sombras", "mestra das sombras"],
                ["buscando a Golconda", "buscando a Golconda"], ["perdido nas noites modernas", "perdida nas noites modernas"], 
                ["negociando favores", "negociando favores"], ["preservando a Máscara", "preservando a Máscara"], 
                ["quebrando todas as regras", "quebrando todas as regras"], ["do velho mundo", "do velho mundo"],
                ["com uma vingança", "com uma vingança"], ["assombrado por um fantasma", "assombrada por um fantasma"], 
                ["amaldiçoado por um feiticeiro", "amaldiçoada por um feiticeiro"], ["vivendo nos esgotos", "vivendo nos esgotos"],
                ["manipulando tudo por trás", "manipulando tudo por trás"]
            ],
            werewolf: [
                ["buscando equilíbrio", "buscando equilíbrio"], ["protegendo o território", "protegendo o território"],
                ["caçando a Wyrm", "caçando a Wyrm"], ["servindo a Gaia", "servindo a Gaia"],
                ["em fúria constante", "em fúria constante"], ["buscando sabedoria", "buscando sabedoria"],
                ["honrando os ancestrais", "honrando os ancestrais"], ["fugindo da destruição", "fugindo da destruição"],
                ["reconstruindo a matilha", "reconstruindo a matilha"], ["comungando com espíritos", "comungando com espíritos"],
                ["guardando o caern", "guardando o caern"], ["perdido na Umbra", "perdida na Umbra"],
                ["lutando pelo futuro", "lutando pelo futuro"], ["vingando um parente caído", "vingando um parente caído"]
            ]
        }
    }
};

const getRandomGender = (): Gender => Math.random() > 0.5 ? 'male' : 'female';

export const fnGenerateName = (sLocale: string = 'en', gender?: Gender, gameType: GameType = GameType.Vampire): string => {
    const selectedGender = gender || getRandomGender();
    const oData = DATA[sLocale as keyof typeof DATA] || DATA.en;
    const bHasTitle = Math.random() < 0.20;
    
    let sTitle = "";
    if (bHasTitle) {
        const typeKey = gameType === GameType.Werewolf ? 'werewolf' : 'vampire';
        const titles = oData.titles[typeKey][selectedGender];
        sTitle = titles[Math.floor(Math.random() * titles.length)];
    }

    const names = oData.firstNames[selectedGender];
    const sFirst = names[Math.floor(Math.random() * names.length)];
    const sLast = oData.lastNames[Math.floor(Math.random() * oData.lastNames.length)];
    
    return `${sTitle ? sTitle + " " : ""}${sFirst} ${sLast}`;
};

export const fnGenerateConcept = (sLocale: string = 'en', gender?: Gender, gameType: GameType = GameType.Vampire) => {
    const selectedGender = gender || getRandomGender();
    const genderIndex = selectedGender === 'male' ? 0 : 1; 
    const oData = DATA[sLocale as keyof typeof DATA] || DATA.en;
    const nTemplate = Math.random();
    
    const typeKey = gameType === GameType.Werewolf ? 'werewolf' : 'vampire';
    const adjectivePair = oData.adjectives[Math.floor(Math.random() * oData.adjectives.length)];
    const rolePair = oData.roles[typeKey][Math.floor(Math.random() * oData.roles[typeKey].length)];
    const contextPair = oData.contexts[typeKey][Math.floor(Math.random() * oData.contexts[typeKey].length)];

    const sAdj = adjectivePair[genderIndex];
    const sRole = rolePair[genderIndex];
    const sContext = contextPair[genderIndex];

    let roleKey = rolePair[0]; 
    if (sLocale !== 'en') {
        const idx = DATA.pt.roles[typeKey].findIndex(r => r[0] === rolePair[0]);
        if (idx !== -1) {
            roleKey = DATA.en.roles[typeKey][idx][0];
        }
    } else {
        roleKey = rolePair[0];
    }

    let conceptString = "";
    if (sLocale === 'pt') {
        if (nTemplate < 0.4) {
            conceptString = `${sRole} ${sAdj}`;
        } else if (nTemplate < 0.7) {
            conceptString = `${sRole} ${sContext}`;
        } else {
            conceptString = `${sRole} ${sAdj} ${sContext}`;
        }
    } else {
        if (nTemplate < 0.4) {
            conceptString = `${sAdj} ${sRole}`;
        } else if (nTemplate < 0.7) {
            conceptString = `${sRole} ${sContext}`;
        } else {
            conceptString = `${sAdj} ${sRole} ${sContext}`;
        }
    }

    return {
        concept: conceptString,
        roleKey: roleKey 
    };
};

export const fnGenerateIdentity = (sLocale: string = 'en', gameType: GameType = GameType.Vampire) => {
    const charGender = getRandomGender();
    const mentorGender = getRandomGender();
    const conceptData = fnGenerateConcept(sLocale, charGender, gameType);

    const identity = {
        name: fnGenerateName(sLocale, charGender, gameType),
        concept: conceptData.concept,
        roleKey: conceptData.roleKey
    };

    if (gameType === GameType.Werewolf) {
        return {
            ...identity,
            mentor: fnGenerateName(sLocale, mentorGender, gameType)
        };
    } else {
        return {
            ...identity,
            sire: fnGenerateName(sLocale, mentorGender, gameType)
        };
    }
};
