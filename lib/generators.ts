
import { GameType } from '../types';
import {freshGenerated} from './randomChoice';

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
                male: ["Alfa", "Beta", "Galliard", "Ahroun", "Theurge", "Philodox", "Ragabash", "Ancião", "Líder de Seita", "Guardião", "Sentinela", "Irmão de Alcatéia", "Andarilho", "Falante de Espíritos"],
                female: ["Alfa", "Beta", "Galliard", "Ahroun", "Theurge", "Philodox", "Ragabash", "Anciã", "Líder de Seita", "Guardiã", "Sentinela", "Irmã de Alcatéia", "Andarilha", "Falante de Espíritos"]
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
                ["Membro da Alcatéia", "Membro da Alcatéia"], ["Parentela", "Parentela"], ["Falante de Espíritos", "Falante de Espíritos"], 
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
                ["reconstruindo a alcatéia", "reconstruindo a alcatéia"], ["comungando com espíritos", "comungando com espíritos"],
                ["guardando o caern", "guardando o caern"], ["perdido na Umbra", "perdida na Umbra"],
                ["lutando pelo futuro", "lutando pelo futuro"], ["vingando um parente caído", "vingando um parente caído"]
            ]
        }
    }
};


// Expanded original inspiration pools; no text is fetched from external services.
DATA.pt.firstNames.male.push(...["Abel", "Abílio", "Adriano", "Afonso", "Ailton", "Alberto", "Alessandro", "Alexandre", "Alfredo", "Álvaro", "Amaro", "Anselmo", "Ari", "Armando", "Artur", "Baltazar", "Benedito", "Cássio", "César", "Cícero", "Cláudio", "Cristiano", "Davi", "Dênis", "Diego", "Diogo", "Djalma", "Domingos", "Douglas", "Edgar", "Edmundo", "Elias", "Elton", "Emerson", "Ernesto", "Estevão", "Eugênio", "Evandro", "Ezequiel", "Fábio", "Fabrício", "Flávio", "Frederico", "Geraldo", "Gilberto", "Guilherme", "Hamilton", "Haroldo", "Hélio", "Hermes", "Ismael", "Israel", "Ivan", "Jacó", "Jaime", "Joaquim", "Jonas", "Josué", "Júlio", "Leandro", "Leônidas", "Lúcio", "Manoel", "Márcio", "Mário", "Maurício", "Mauro", "Moacir", "Natan", "Nelson", "Nilo", "Norberto", "Orlando", "Osvaldo", "Otto", "Pascoal", "Raul", "Renato", "Roberto", "Rodrigo", "Rogério", "Ronaldo", "Rui", "Sérgio", "Silas", "Tadeu", "Teodoro", "Tomás", "Ulisses", "Valdemar", "Wagner", "Wilson", "Zeca", "Akira", "Hassan", "Ibrahim", "Kenji", "Omar", "Ravi", "Tariq"]);
DATA.pt.firstNames.female.push(...["Adélia", "Adriana", "Agatha", "Alana", "Alessandra", "Aline", "Amélia", "Anabela", "Anita", "Antonella", "Aparecida", "Ariane", "Aurora", "Bárbara", "Benedita", "Betina", "Carla", "Carlota", "Carolina", "Catarina", "Celeste", "Célia", "Cíntia", "Conceição", "Cristiane", "Dalila", "Débora", "Diana", "Dolores", "Dora", "Edna", "Efigênia", "Eliane", "Eloá", "Emília", "Eunice", "Eva", "Evelyn", "Flávia", "Flora", "Francisca", "Geovana", "Glória", "Graça", "Hilda", "Iara", "Ilana", "Inês", "Ingrid", "Irene", "Íris", "Ivone", "Joana", "Joaquina", "Judite", "Karina", "Laís", "Lavínia", "Leda", "Lídia", "Lígia", "Liliane", "Lis", "Lúcia", "Luciana", "Luísa", "Lurdes", "Madalena", "Mafalda", "Marcela", "Margarida", "Marta", "Melissa", "Micaela", "Míriam", "Mônica", "Nádia", "Nair", "Nara", "Nicole", "Nina", "Noemi", "Norma", "Odete", "Paloma", "Pérola", "Pilar", "Priscila", "Quitéria", "Raquel", "Regina", "Renata", "Rita", "Roberta", "Rosa", "Rosana", "Ruth", "Sabrina", "Safira", "Samira", "Sandra", "Selma", "Sílvia", "Simone", "Sofia", "Sônia", "Soraia", "Sueli", "Tainá", "Talita", "Tatiana", "Telma", "Teresa", "Úrsula", "Vera", "Verônica", "Viviane", "Yara", "Zélia", "Zilda", "Aisha", "Akemi", "Amara", "Farah", "Mei", "Naomi", "Noor", "Sakura"]);
DATA.pt.lastNames.push(...["Abreu", "Aguiar", "Albuquerque", "Alencar", "Alvarenga", "Álvares", "Amaral", "Amorim", "Antunes", "Aragão", "Assis", "Ataíde", "Ávila", "Bandeira", "Barreto", "Bastos", "Batista", "Beltrão", "Bittencourt", "Borges", "Botelho", "Brandão", "Brito", "Bueno", "Cabral", "Caldas", "Camargo", "Caminha", "Candeias", "Carneiro", "Castro", "Cerqueira", "Chaves", "Coutinho", "Cruz", "Dantas", "Delgado", "Diniz", "Domingues", "Espíndola", "Esteves", "Falcão", "Farias", "Faro", "Fialho", "Fonseca", "Fontes", "Fragoso", "Franco", "Furtado", "Galvão", "Garcia", "Godoy", "Goulart", "Gouveia", "Guedes", "Guerra", "Leal", "Leite", "Lemos", "Linhares", "Lobo", "Lourenço", "Luz", "Macedo", "Magalhães", "Maia", "Marinho", "Matos", "Medeiros", "Meireles", "Miranda", "Monteiro", "Morais", "Muniz", "Navarro", "Neves", "Noronha", "Novais", "Paiva", "Peixoto", "Pimentel", "Pinheiro", "Portela", "Prado", "Queiroz", "Quintana", "Rangel", "Reis", "Resende", "Rezende", "Rios", "Sales", "Sampaio", "Siqueira", "Tavares", "Torres", "Valença", "Valente", "Vasconcelos", "Vaz", "Veloso", "Ventura", "Viana", "Vidal", "Xavier", "Yamamoto", "Tanaka", "Sato", "Kim", "Haddad", "Mansur", "Nasser", "Ibrahim"]);
DATA.pt.adjectives.push(...[["Paciente", "Paciente"], ["Diplomático", "Diplomática"], ["Investigativo", "Investigativa"], ["Reservado", "Reservada"], ["Compassivo", "Compassiva"], ["Pragmático", "Pragmática"], ["Meticuloso", "Meticulosa"], ["Inquieto", "Inquieta"], ["Discreto", "Discreta"], ["Carismático", "Carismática"], ["Contraditório", "Contraditória"], ["Resiliente", "Resiliente"], ["Cético", "Cética"], ["Supersticioso", "Supersticiosa"], ["Generoso", "Generosa"], ["Ambicioso", "Ambiciosa"], ["Metódico", "Metódica"], ["Observador", "Observadora"], ["Incansável", "Incansável"], ["Cauteloso", "Cautelosa"]] as [string,string][]);
DATA.pt.roles.vampire.push(...[["Arquivista", "Arquivista"], ["Restaurador", "Restauradora"], ["Mediador", "Mediadora"], ["Sindicalista", "Sindicalista"], ["Antiquário", "Antiquária"], ["Curador", "Curadora"], ["Agente funerário", "Agente funerária"], ["Diplomata", "Diplomata"], ["Falsificador", "Falsificadora"], ["Tradutor", "Tradutora"], ["Urbanista", "Urbanista"], ["Enfermeiro noturno", "Enfermeira noturna"], ["Colecionador de arte", "Colecionadora de arte"], ["Encadernador", "Encadernadora"], ["Radialista", "Radialista"], ["Leiloeiro", "Leiloeira"], ["Líder comunitário", "Líder comunitária"], ["Consultor de segurança", "Consultora de segurança"], ["Fotógrafo noturno", "Fotógrafa noturna"], ["Diplomata exilado", "Diplomata exilada"], ["Gestor de crises", "Gestora de crises"], ["Contrabandista", "Contrabandista"], ["Criptógrafo", "Criptógrafa"], ["Poeta", "Poeta"]] as [string,string][]);
DATA.pt.roles.werewolf.push(...[["Defensor dos rios", "Defensora dos rios"], ["Horticultor urbano", "Horticultora urbana"], ["Socorrista", "Socorrista"], ["Advogado ambiental", "Advogada ambiental"], ["Resgatista de fauna", "Resgatista de fauna"], ["Guardião de histórias", "Guardiã de histórias"], ["Pesquisador das águas", "Pesquisadora das águas"], ["Articulador comunitário", "Articuladora comunitária"], ["Vigia de incêndios", "Vigia de incêndios"], ["Guia da floresta", "Guia da floresta"], ["Negociador espiritual", "Negociadora espiritual"], ["Rastreador de desaparecidos", "Rastreadora de desaparecidos"], ["Sabotador", "Sabotadora"], ["Cuidador do bairro", "Cuidadora do bairro"], ["Explorador urbano", "Exploradora urbana"], ["Observador de tempestades", "Observadora de tempestades"], ["Professor itinerante", "Professora itinerante"], ["Cozinheiro comunitário", "Cozinheira comunitária"], ["Patrulheiro noturno", "Patrulheira noturna"], ["Guardião de passagens", "Guardiã de passagens"], ["Fotógrafo de fauna", "Fotógrafa de fauna"], ["Sobrevivente de desastre", "Sobrevivente de desastre"], ["Músico de rua", "Música de rua"], ["Guardião de ritos", "Guardiã de ritos"]] as [string,string][]);
DATA.pt.contexts.vampire.push(...[["reparando um juramento rompido", "reparando um juramento rompido"], ["escondendo uma testemunha inconveniente", "escondendo uma testemunha inconveniente"], ["ganhando tempo para um aliado", "ganhando tempo para um aliado"], ["contestando uma dívida herdada", "contestando uma dívida herdada"], ["procurando uma coterie desaparecida", "procurando uma coterie desaparecida"], ["protegendo um arquivo proibido", "protegendo um arquivo proibido"], ["construindo uma aliança improvável", "construindo uma aliança improvável"], ["desfazendo uma acusação falsa", "desfazendo uma acusação falsa"], ["mantendo um bairro vivo", "mantendo um bairro vivo"], ["decifrando cartas de um rival morto", "decifrando cartas de um rival morto"], ["seguindo pistas de um refúgio perdido", "seguindo pistas de um refúgio perdido"], ["negociando uma trégua frágil", "negociando uma trégua frágil"], ["recuperando uma identidade roubada", "recuperando uma identidade roubada"], ["guardando um segredo mortal", "guardando um segredo mortal"], ["rompendo com um protetor", "rompendo com um protetor"], ["aprendendo a resistir à Besta", "aprendendo a resistir à Besta"]] as [string,string][]);
DATA.pt.contexts.werewolf.push(...[["defendendo um rio ameaçado", "defendendo um rio ameaçado"], ["reconstruindo uma floresta queimada", "reconstruindo uma floresta queimada"], ["ouvindo espíritos esquecidos", "ouvindo espíritos esquecidos"], ["reparando a confiança da alcateia", "reparando a confiança da alcateia"], ["investigando um caern silencioso", "investigando um caern silencioso"], ["protegendo uma comunidade deslocada", "protegendo uma comunidade deslocada"], ["aprendendo a conviver com a Fúria", "aprendendo a conviver com a Fúria"], ["rastreando um veneno industrial", "rastreando um veneno industrial"], ["voltando de uma missão fracassada", "voltando de uma missão fracassada"], ["questionando uma tradição prejudicial", "questionando uma tradição prejudicial"], ["reabrindo um caminho espiritual", "reabrindo um caminho espiritual"], ["procurando um mentor desaparecido", "procurando um mentor desaparecido"], ["contendo um espírito inquieto", "contendo um espírito inquieto"], ["mantendo uma promessa difícil", "mantendo uma promessa difícil"], ["mapeando as cicatrizes da terra", "mapeando as cicatrizes da terra"], ["protegendo um lugar de memória", "protegendo um lugar de memória"]] as [string,string][]);
DATA.en.firstNames.male.push(...["Abel", "Abílio", "Adriano", "Afonso", "Ailton", "Alberto", "Alessandro", "Alexandre", "Alfredo", "Álvaro", "Amaro", "Anselmo", "Ari", "Armando", "Artur", "Baltazar", "Benedito", "Cássio", "César", "Cícero", "Cláudio", "Cristiano", "Davi", "Dênis", "Diego", "Diogo", "Djalma", "Domingos", "Douglas", "Edgar", "Edmundo", "Elias", "Elton", "Emerson", "Ernesto", "Estevão", "Eugênio", "Evandro", "Ezequiel", "Fábio", "Fabrício", "Flávio", "Frederico", "Geraldo", "Gilberto", "Guilherme", "Hamilton", "Haroldo", "Hélio", "Hermes", "Ismael", "Israel", "Ivan", "Jacó", "Jaime", "Joaquim", "Jonas", "Josué", "Júlio", "Leandro", "Leônidas", "Lúcio", "Manoel", "Márcio", "Mário", "Maurício", "Mauro", "Moacir", "Natan", "Nelson", "Nilo", "Norberto", "Orlando", "Osvaldo", "Otto", "Pascoal", "Raul", "Renato", "Roberto", "Rodrigo", "Rogério", "Ronaldo", "Rui", "Sérgio", "Silas", "Tadeu", "Teodoro", "Tomás", "Ulisses", "Valdemar", "Wagner", "Wilson", "Zeca", "Akira", "Hassan", "Ibrahim", "Kenji", "Omar", "Ravi", "Tariq"]);
DATA.en.firstNames.female.push(...["Adélia", "Adriana", "Agatha", "Alana", "Alessandra", "Aline", "Amélia", "Anabela", "Anita", "Antonella", "Aparecida", "Ariane", "Aurora", "Bárbara", "Benedita", "Betina", "Carla", "Carlota", "Carolina", "Catarina", "Celeste", "Célia", "Cíntia", "Conceição", "Cristiane", "Dalila", "Débora", "Diana", "Dolores", "Dora", "Edna", "Efigênia", "Eliane", "Eloá", "Emília", "Eunice", "Eva", "Evelyn", "Flávia", "Flora", "Francisca", "Geovana", "Glória", "Graça", "Hilda", "Iara", "Ilana", "Inês", "Ingrid", "Irene", "Íris", "Ivone", "Joana", "Joaquina", "Judite", "Karina", "Laís", "Lavínia", "Leda", "Lídia", "Lígia", "Liliane", "Lis", "Lúcia", "Luciana", "Luísa", "Lurdes", "Madalena", "Mafalda", "Marcela", "Margarida", "Marta", "Melissa", "Micaela", "Míriam", "Mônica", "Nádia", "Nair", "Nara", "Nicole", "Nina", "Noemi", "Norma", "Odete", "Paloma", "Pérola", "Pilar", "Priscila", "Quitéria", "Raquel", "Regina", "Renata", "Rita", "Roberta", "Rosa", "Rosana", "Ruth", "Sabrina", "Safira", "Samira", "Sandra", "Selma", "Sílvia", "Simone", "Sofia", "Sônia", "Soraia", "Sueli", "Tainá", "Talita", "Tatiana", "Telma", "Teresa", "Úrsula", "Vera", "Verônica", "Viviane", "Yara", "Zélia", "Zilda", "Aisha", "Akemi", "Amara", "Farah", "Mei", "Naomi", "Noor", "Sakura"]);
DATA.en.lastNames.push(...["Abreu", "Aguiar", "Albuquerque", "Alencar", "Alvarenga", "Álvares", "Amaral", "Amorim", "Antunes", "Aragão", "Assis", "Ataíde", "Ávila", "Bandeira", "Barreto", "Bastos", "Batista", "Beltrão", "Bittencourt", "Borges", "Botelho", "Brandão", "Brito", "Bueno", "Cabral", "Caldas", "Camargo", "Caminha", "Candeias", "Carneiro", "Castro", "Cerqueira", "Chaves", "Coutinho", "Cruz", "Dantas", "Delgado", "Diniz", "Domingues", "Espíndola", "Esteves", "Falcão", "Farias", "Faro", "Fialho", "Fonseca", "Fontes", "Fragoso", "Franco", "Furtado", "Galvão", "Garcia", "Godoy", "Goulart", "Gouveia", "Guedes", "Guerra", "Leal", "Leite", "Lemos", "Linhares", "Lobo", "Lourenço", "Luz", "Macedo", "Magalhães", "Maia", "Marinho", "Matos", "Medeiros", "Meireles", "Miranda", "Monteiro", "Morais", "Muniz", "Navarro", "Neves", "Noronha", "Novais", "Paiva", "Peixoto", "Pimentel", "Pinheiro", "Portela", "Prado", "Queiroz", "Quintana", "Rangel", "Reis", "Resende", "Rezende", "Rios", "Sales", "Sampaio", "Siqueira", "Tavares", "Torres", "Valença", "Valente", "Vasconcelos", "Vaz", "Veloso", "Ventura", "Viana", "Vidal", "Xavier", "Yamamoto", "Tanaka", "Sato", "Kim", "Haddad", "Mansur", "Nasser", "Ibrahim"]);
DATA.en.adjectives.push(...[["Patient", "Patient"], ["Diplomatic", "Diplomatic"], ["Inquisitive", "Inquisitive"], ["Reserved", "Reserved"], ["Compassionate", "Compassionate"], ["Pragmatic", "Pragmatic"], ["Meticulous", "Meticulous"], ["Restless", "Restless"], ["Discreet", "Discreet"], ["Charismatic", "Charismatic"], ["Contradictory", "Contradictory"], ["Resilient", "Resilient"], ["Skeptical", "Skeptical"], ["Superstitious", "Superstitious"], ["Generous", "Generous"], ["Ambitious", "Ambitious"], ["Methodical", "Methodical"], ["Observant", "Observant"], ["Tireless", "Tireless"], ["Cautious", "Cautious"]] as [string,string][]);
DATA.en.roles.vampire.push(...[["Archivist", "Archivist"], ["Restorer", "Restorer"], ["Mediator", "Mediator"], ["Union organizer", "Union organizer"], ["Antiquarian", "Antiquarian"], ["Curator", "Curator"], ["Undertaker", "Undertaker"], ["Diplomat", "Diplomat"], ["Forger", "Forger"], ["Translator", "Translator"], ["Urban planner", "Urban planner"], ["Night nurse", "Night nurse"], ["Art collector", "Art collector"], ["Bookbinder", "Bookbinder"], ["Radio host", "Radio host"], ["Auctioneer", "Auctioneer"], ["Community leader", "Community leader"], ["Security consultant", "Security consultant"], ["Night photographer", "Night photographer"], ["Exiled diplomat", "Exiled diplomat"], ["Crisis manager", "Crisis manager"], ["Smuggler", "Smuggler"], ["Cryptographer", "Cryptographer"], ["Poet", "Poet"]] as [string,string][]);
DATA.en.roles.werewolf.push(...[["River defender", "River defender"], ["Urban gardener", "Urban gardener"], ["Paramedic", "Paramedic"], ["Environmental lawyer", "Environmental lawyer"], ["Wildlife rescuer", "Wildlife rescuer"], ["Storykeeper", "Storykeeper"], ["Water researcher", "Water researcher"], ["Community organizer", "Community organizer"], ["Fire lookout", "Fire lookout"], ["Forest guide", "Forest guide"], ["Spiritual negotiator", "Spiritual negotiator"], ["Missing-person tracker", "Missing-person tracker"], ["Saboteur", "Saboteur"], ["Neighborhood healer", "Neighborhood healer"], ["Urban explorer", "Urban explorer"], ["Storm watcher", "Storm watcher"], ["Itinerant teacher", "Itinerant teacher"], ["Community cook", "Community cook"], ["Night patrol", "Night patrol"], ["Bridge keeper", "Bridge keeper"], ["Wildlife photographer", "Wildlife photographer"], ["Disaster survivor", "Disaster survivor"], ["Street musician", "Street musician"], ["Ritual keeper", "Ritual keeper"]] as [string,string][]);
DATA.en.contexts.vampire.push(...[["repairing a broken oath", "repairing a broken oath"], ["hiding an inconvenient witness", "hiding an inconvenient witness"], ["buying time for an ally", "buying time for an ally"], ["challenging an inherited debt", "challenging an inherited debt"], ["searching for a vanished coterie", "searching for a vanished coterie"], ["protecting a forbidden archive", "protecting a forbidden archive"], ["building an unlikely alliance", "building an unlikely alliance"], ["erasing a false accusation", "erasing a false accusation"], ["keeping a neighborhood alive", "keeping a neighborhood alive"], ["decoding a dead rival’s letters", "decoding a dead rival’s letters"], ["following traces of a lost haven", "following traces of a lost haven"], ["negotiating a fragile truce", "negotiating a fragile truce"], ["recovering a stolen identity", "recovering a stolen identity"], ["guarding a mortal secret", "guarding a mortal secret"], ["breaking away from a patron", "breaking away from a patron"], ["learning to resist the Beast", "learning to resist the Beast"]] as [string,string][]);
DATA.en.contexts.werewolf.push(...[["defending a threatened river", "defending a threatened river"], ["rebuilding a burned forest", "rebuilding a burned forest"], ["listening to forgotten spirits", "listening to forgotten spirits"], ["repairing the pack’s trust", "repairing the pack’s trust"], ["investigating a silent caern", "investigating a silent caern"], ["protecting a displaced community", "protecting a displaced community"], ["learning to live with rage", "learning to live with rage"], ["tracing an industrial poison", "tracing an industrial poison"], ["returning from a failed mission", "returning from a failed mission"], ["challenging a harmful tradition", "challenging a harmful tradition"], ["reopening a spiritual path", "reopening a spiritual path"], ["seeking a missing mentor", "seeking a missing mentor"], ["containing a restless spirit", "containing a restless spirit"], ["keeping a difficult promise", "keeping a difficult promise"], ["mapping the scars of the land", "mapping the scars of the land"], ["protecting a place of memory", "protecting a place of memory"]] as [string,string][]);

const getRandomGender = (): Gender => Math.random() > 0.5 ? 'male' : 'female';

const generateName = (sLocale: string = 'en', gender?: Gender, gameType: GameType = GameType.Vampire): string => {
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

const generateConcept = (sLocale: string = 'en', gender?: Gender, gameType: GameType = GameType.Vampire) => {
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

export const fnGenerateName = (locale='en',gender?:Gender,game=GameType.Vampire,current='') => freshGenerated(`name:${locale}:${game}`,()=>generateName(locale,gender,game),current);
export const fnGenerateConcept = (locale='en',gender?:Gender,game=GameType.Vampire,current='') => {
    let result=generateConcept(locale,gender,game);
    const concept=freshGenerated(`concept:${locale}:${game}`,()=>{result=generateConcept(locale,gender,game);return result.concept;},current);
    return {...result,concept};
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
