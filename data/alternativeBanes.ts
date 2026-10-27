import type {Character} from '../types';
export const ALTERNATIVE_BANES = [
  {
    "clan": "banuhaqim",
    "name": "Sangue Nocivo",
    "english": "Noxious Blood",
    "summary": "Mortais que ingerem vitae sofrem dano agravado igual à gravidade por quantidade equivalente a um teste de Despertar; vitae não cura ferimentos mortais.",
    "reference": "Players Guide, p. 56; docs/Vampire5edPlayersGuide01, Clan Bane Variants"
  },
  {
    "clan": "brujah",
    "name": "Violência",
    "english": "Violence",
    "summary": "Crítico bagunçado causa dano igual à gravidade; gastar 1 Força de Vontade converte esse dano de agravado em superficial.",
    "reference": "Players Guide, p. 56; docs/Vampire5edPlayersGuide01, Clan Bane Variants"
  },
  {
    "clan": "gangrel",
    "name": "Instintos de Sobrevivência",
    "english": "Survival Instincts",
    "summary": "Subtraia a gravidade dos testes para resistir ao frenesi de medo, mínimo 1 dado.",
    "reference": "Players Guide, p. 57; docs/Vampire5edPlayersGuide01, Clan Bane Variants"
  },
  {
    "clan": "hecata",
    "name": "Decomposição",
    "english": "Decay",
    "summary": "Defeitos adicionais iguais à gravidade entre Lacaios, Refúgio e Recursos, ou compensação em dobro de pontos; compras dessas Vantagens custam XP extra igual à gravidade.",
    "reference": "Players Guide, p. 57; docs/Vampire5edPlayersGuide01, Clan Bane Variants"
  },
  {
    "clan": "lasombra",
    "name": "Insensibilidade",
    "english": "Callousness",
    "summary": "Subtraia a gravidade dos testes de Remorso, mínimo 1 dado.",
    "reference": "Players Guide, p. 57; docs/Vampire5edPlayersGuide01, Clan Bane Variants"
  },
  {
    "clan": "malkavian",
    "name": "Manifestações Sobrenaturais",
    "english": "Unnatural Manifestations",
    "summary": "Usar Disciplinas inquieta mortais; interações sociais exceto Intimidação sofrem penalidade igual à gravidade por uma cena; vampiros reconhecem sua natureza.",
    "reference": "Players Guide, p. 57; docs/Vampire5edPlayersGuide01, Clan Bane Variants"
  },
  {
    "clan": "theministry",
    "name": "Sangue Frio",
    "english": "Cold-Blooded",
    "summary": "Rubor da Vida exige alimentação recente de uma fonte viva e testes de Despertar iguais à gravidade.",
    "reference": "Players Guide, p. 58; docs/Vampire5edPlayersGuide01, Clan Bane Variants"
  },
  {
    "clan": "nosferatu",
    "name": "Infestação",
    "english": "Infestation",
    "summary": "Vermes infestam o Refúgio e locais fechados visitados; atividades de concentração sofrem as penalidades previstas no livro.",
    "reference": "Players Guide, p. 58; docs/Vampire5edPlayersGuide01, Clan Bane Variants"
  },
  {
    "clan": "ravnos",
    "name": "Nome do Desnascimento",
    "english": "Unbirth Name",
    "summary": "Quem pronuncia seu nome de quando foi Abraçado recebe bônus igual à gravidade contra suas Disciplinas; você sofre penalidade igual contra os poderes desse oponente.",
    "reference": "Players Guide, p. 58; docs/Vampire5edPlayersGuide01, Clan Bane Variants"
  },
  {
    "clan": "salubri",
    "name": "Ascetismo",
    "english": "Asceticism",
    "summary": "Com Fome menor que 3, penalidade igual à gravidade nas paradas de Disciplina; o terceiro olho permanece.",
    "reference": "Players Guide, p. 58; docs/Vampire5edPlayersGuide01, Clan Bane Variants"
  },
  {
    "clan": "toreador",
    "name": "Empatia Agonizante",
    "english": "Agonizing Empathy",
    "summary": "Ao ferir mortal na alimentação, sofre dano correspondente, limitado pela gravidade por alimentação.",
    "reference": "Players Guide, p. 59; docs/Vampire5edPlayersGuide01, Clan Bane Variants"
  },
  {
    "clan": "tremere",
    "name": "Sangue Roubado",
    "english": "Stolen Blood",
    "summary": "Impulso de Sangue exige testes de Despertar iguais à gravidade, com a opção de recuo descrita na fonte.",
    "reference": "Players Guide, p. 59; docs/Vampire5edPlayersGuide01, Clan Bane Variants"
  },
  {
    "clan": "tzimisce",
    "name": "Cortesia Amaldiçoada",
    "english": "Cursed Courtesy",
    "summary": "Entrar sem convite em residência custa Força de Vontade igual à gravidade e penaliza Disciplinas enquanto permanecer.",
    "reference": "Players Guide, p. 59; docs/Vampire5edPlayersGuide01, Clan Bane Variants"
  },
  {
    "clan": "ventrue",
    "name": "Hierarquia",
    "english": "Hierarchy",
    "summary": "Penalidade igual à gravidade em Disciplinas contra vampiros de geração menor; atacá-los diretamente custa Força de Vontade igual à gravidade.",
    "reference": "Players Guide, p. 59; docs/Vampire5edPlayersGuide01, Clan Bane Variants"
  }
];
export const baneSeverity=(potency:number)=>potency===0?0:potency<=2?2:potency<=4?3:potency<=6?4:potency<=8?5:6;
export const hasAlternativeBane=(c:Character)=>c.baneVariant==='alternative'||c.flaws.some(f=>f.id==='twicecursed'||f.id==='twice-cursed');
export const alternativeBane=(c:Character)=>ALTERNATIVE_BANES.find(b=>b.clan===c.clan);
