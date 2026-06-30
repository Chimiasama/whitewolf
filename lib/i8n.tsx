

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

// Inlined JSON to avoid import assertion issues
const en = {
  "app": {
    "title": "Vampire Character Creator",
    "subtitle": "Bring your Kindred to unlife in the World of Darkness"
  },
  "buttons": {
    "next": "Next",
    "back": "Back",
    "jumpToSheet": "Jump to Sheet",
    "close": "Close",
    "expandAll": "Expand All",
    "collapseAll": "Collapse All",
    "save": "Save",
    "load": "Load",
    "download": "Download JSON",
    "upload": "Upload JSON",
    "reset": "Reset Character",
    "add": "Add",
    "cancel": "Cancel",
    "confirm": "Confirm"
  },
  "steps": {
    "concept": "Concept",
    "clan": "Clan",
    "attributes": "Attributes",
    "skills": "Skills",
    "finishingTouches": "Finishing Touches",
    "sheet": "Final Character Sheet"
  },
  "summary": {
      "title": "Character Summary & Progress",
      "readySubtitle": "All basic fields are filled. You can view your character sheet below.",
      "incompleteSubtitle": "Please complete the following sections to finalize your character.",
      "missing_concept": "Name, Concept, Ambition, or Desire missing.",
      "missing_clan": "Clan not selected.",
      "error_attributes": "Attributes must sum to 22.",
      "error_skills": "Skills distribution incomplete (min 22 points).",
      "missing_predator": "Predator Type not selected.",
      "error_disciplines": "Select at least 2 Discipline dots (+ Predator adds).",
      "error_advantages": "Spend 7 points on Advantages.",
      "error_flaws": "Take 2 points of Flaws."
  },
  "common": {
    "selectPlaceholder": "Select...",
    "selectAttrPlaceholder": "Select Attribute",
    "selectSkillPlaceholder": "Select Skill",
    "selectDiscPlaceholder": "Select Discipline...",
    "unnamed": "Unnamed",
    "unknown": "Unknown",
    "notDefined": "Not defined",
    "keyAttributes": "Key Attributes",
    "keySkills": "Key Skills",
    "noClanSelected": "No clan selected.",
    "noneListed": "None listed.",
    "skill": "Skill",
    "available": "Available",
    "assigned": "Assigned",
    "clear": "Clear",
    "value": "Value",
    "poolDistribution": "Point Pool",
    "poolLegend": "Bright orbs are available. Dark orbs are already assigned.",
    "managePowers": "Manage Powers"
  },
  "concept": {
    "title": "Core Concept",
    "subtitle": "Define the core identity of your character. Who were they? Who are they now?",
    "name": "Name",
    "sire": "Sire",
    "sirePlaceholder": "Who made you a vampire?",
    "concept": "Concept",
    "conceptPlaceholder": "e.g., Disillusioned activist",
    "ambition": "Ambition",
    "ambitionPlaceholder": "Long-term goal, e.g., To overthrow the Prince",
    "desire": "Desire",
    "desirePlaceholder": "Short-term goal, e.g., To taste the blood of a celebrity",
    "portrait": "Character Portrait",
    "uploadPortrait": "Upload Image",
    "removePortrait": "Remove Image"
  },
  "clan": {
    "title": "Choose your Bloodline"
  },
  "clans": {
    "brujah": { "name": "Brujah", "description": "Rebels and rabble-rousers who fight for their passionate beliefs.", "bane": "Their tempers are hair-triggers. Resisting a frenzy is harder.", "compulsion": "Rebellion. The vampire must act against someone in a position of authority or a currently held belief." },
    "gangrel": { "name": "Gangrel", "description": "Nomads and survivors, intimately tied to their animalistic nature.", "bane": "They gain animal features when they frenzy.", "compulsion": "Feral Impulses. The vampire regresses to an animalistic state, unable to speak and acting on instinct." },
    "malkavian": { "name": "Malkavian", "description": "Seers and lunatics cursed with insight that shatters the mind.", "bane": "They are afflicted with a permanent derangement.", "compulsion": "Delusion. The vampire's derangement becomes the absolute truth, affecting their perception of reality." },
    "nosferatu": { "name": "Nosferatu", "description": "Hideously deformed outcasts who traffic in secrets from the shadows.", "bane": "They are monstrously ugly and can never pass as human.", "compulsion": "Cryptophilia. The vampire becomes obsessed with a secret, willing to do anything to learn more about it." },
    "toreador": { "name": "Toreador", "description": "Artists and visionaries, obsessed with beauty in all its forms.", "bane": "They become obsessed with beauty, making it hard to act in beautiful surroundings.", "compulsion": "Aesthetic Fixation. The vampire becomes captivated by a thing of beauty, unable to act until they've spent time appreciating it." },
    "tremere": { "name": "Tremere", "description": "Warlocks and occultists who wield the power of blood sorcery.", "bane": "Their blood makes them more easily bound by other vampires.", "compulsion": "Perfectionism. The vampire becomes obsessed with a task, repeating it until it is perfect." },
    "ventrue": { "name": "Ventrue", "description": "The ruling clan of aristocrats, executives, and kings.", "bane": "They have a specific and rare feeding preference.", "compulsion": "Arrogance. The vampire must assert their authority and will not accept being denied." },
    "banuhaqim": { "name": "Banu Haqim", "description": "Judges and assassins who hunt other vampires and follow a strict code of law.", "bane": "They are compelled to feed on the blood of other vampires.", "compulsion": "Judgment. The vampire must punish someone who has transgressed a code they hold." },
    "theministry": { "name": "The Ministry", "description": "Corrupters and liberators who use vice and temptation as their primary tools.", "bane": "They are vulnerable to bright lights.", "compulsion": "Transgression. The vampire must lead someone to act on their darkest desires." },
    "lasombra": { "name": "Lasombra", "description": "Ambitious and ruthless social Darwinists who command the power of shadow.", "bane": "They have no reflection, and technology often glitches in their presence.", "compulsion": "Ambition. The vampire must prove their superiority and will not tolerate failure." },
    "caitiff": { "name": "Caitiff", "description": "Clanless vampires, outsiders with no lineage to call their own.", "bane": "They are shunned by vampiric society and must pay more for certain social merits.", "compulsion": "Rootlessness. The vampire feels a desperate need to belong, trying to fit in with any group." },
    "thinblood": { "name": "Thin-Blood", "description": "Weak-blooded vampires of the 14th generation or higher, barely a true vampire.", "bane": "They are weak and suffer various debilitating conditions.", "compulsion": "Insularity. The vampire becomes focused on their own problems, ignoring the needs of others." }
  },
  "attributes": {
    "title": "Distribute Attributes",
    "subtitle": "Assign values from the Point Pool to your attributes.",
    "selectorLabel": "{{label}} #{{number}}",
     "list": {
      "Strength": "Strength",
      "Dexterity": "Dexterity",
      "Stamina": "Stamina",
      "Charisma": "Charisma",
      "Manipulation": "Manipulation",
      "Composure": "Composure",
      "Intelligence": "Intelligence",
      "Wits": "Wits",
      "Resolve": "Resolve"
    }
  },
  "skills": {
    "title": "Distribute Skills",
    "subtitle": "Select a distribution spread, then click on Skills to assign values.",
    "chooseSpread": "Choose Skill Spread",
    "specialist": { "name": "Specialist", "description": "Focus on a few skills: One at 4, three at 3, three at 2, three at 1." },
    "balanced": { "name": "Balanced", "description": "A well-rounded approach: Three at 3, five at 2, seven at 1." },
    "jack": { "name": "Jack of all Trades", "description": "Wide knowledge, low focus: One at 3, eight at 2, ten at 1." },
    "masterTitle": "Master Skill (4 Dots)",
    "expertTitle": "Expert Skills (3 Dots)",
    "adeptTitle": "Adept Skills (2 Dots)",
    "noviceTitle": "Novice Skills (1 Dot)",
    "oneAt4": "One at 4",
    "selectorLabel": "{{label}} #{{number}}",
    "manageSpecialties": {
        "title": "Manage Specialties",
        "fromPredator": "From Predator Type",
        "none": "None",
        "required": "Required Specialties",
        "specialtyRequired": "Specialty required",
        "optional": "Optional Specialties",
        "optionalSubtitle": "You get one free specialty. Assign it to any skill you have at least one dot in.",
        "addSpecialty": "Add Specialty",
        "specialtyName": "Specialty Name"
    },
    "list": {
      "Athletics": "Athletics",
      "Brawl": "Brawl",
      "Craft": "Craft",
      "Drive": "Drive",
      "Firearms": "Firearms",
      "Larceny": "Larceny",
      "Melee": "Melee",
      "Stealth": "Stealth",
      "Survival": "Survival",
      "Animal Ken": "Animal Ken",
      "Etiquette": "Etiquette",
      "Insight": "Insight",
      "Intimidation": "Intimidation",
      "Leadership": "Leadership",
      "Performance": "Performance",
      "Persuasion": "Persuasion",
      "Streetwise": "Streetwise",
      "Subterfuge": "Subterfuge",
      "Academics": "Academics",
      "Awareness": "Awareness",
      "Finance": "Finance",
      "Investigation": "Investigation",
      "Medicine": "Medicine",
      "Occult": "Occult",
      "Politics": "Politics",
      "Science": "Science",
      "Technology": "Technology"
    },
    "specialtyExamples": {
      "Athletics": "e.g. Parkour, Swimming, Throwing, Climbing",
      "Brawl": "e.g. Boxing, Grappling, Dirty Fighting, Throws",
      "Craft": "e.g. Carpentry, Electronics, Painting, Mechanics",
      "Drive": "e.g. Evasion, Pursuit, Motorcycles, Stunts",
      "Firearms": "e.g. Pistols, Rifles, Sniping, Fast-Draw",
      "Larceny": "e.g. Lockpicking, Pickpocketing, Safecracking",
      "Melee": "e.g. Knives, Swords, Axes, Improvised Weapons",
      "Stealth": "e.g. Camouflage, Hiding, Moving Silently, Crowds",
      "Survival": "e.g. Hunting, Tracking, Urban, Woodland",
      "Animal Ken": "e.g. Dogs, Horses, Wolves, Training",
      "Etiquette": "e.g. Camarilla, High Society, Street, Corporate",
      "Insight": "e.g. Empathy, Detecting Lies, Motives",
      "Intimidation": "e.g. Physical, Psychological, Stare Down, Blackmail",
      "Leadership": "e.g. Command, Inspiration, Oratory, War",
      "Performance": "e.g. Acting, Dancing, Singing, Instruments",
      "Persuasion": "e.g. Bargaining, Fast Talk, Seduction, Negotiation",
      "Streetwise": "e.g. Black Market, Gangs, Rumors, Drugs",
      "Subterfuge": "e.g. Impeccable Lying, Seduction, The Long Con",
      "Academics": "e.g. History, Law, Literature, Philosophy",
      "Awareness": "e.g. Ambushes, Camouflage, Traps",
      "Finance": "e.g. Banking, Money Laundering, Stock Market",
      "Investigation": "e.g. Criminology, Deduction, Forensics",
      "Medicine": "e.g. First Aid, Surgery, Toxicology, Pathology",
      "Occult": "e.g. Blood Magic, Ghosts, Noddist Lore, Spirits",
      "Politics": "e.g. Camarilla, City Gov, Anarchs, Media",
      "Science": "e.g. Biology, Chemistry, Physics, Geology",
      "Technology": "e.g. Hacking, Security Systems, Coding"
    }
  },
  "finishingTouches": {
    "title": "Finishing Touches",
    "disciplines": {
      "title": "Disciplines",
      "subtitle": "Your clan determines your starting Disciplines. Choose one to have 2 dots and another to have 1 dot.",
      "twoDots": "Two Dots",
      "oneDot": "One Dot",
      "compendiumTitle": "Discipline Compendium",
      "selectPowers": "Select Powers",
      "powersSelected": "{{count}}/{{total}} Selected"
    },
    "predatorType": {
      "title": "Predator Type"
    },
    "advantages": {
      "title": "Advantages"
    },
    "flaws": {
      "title": "Flaws"
    },
    "touchstones": "Touchstones & Convictions",
    "touchstonesPlaceholder": "Who are the mortals that anchor your humanity? e.g., Touchstone: My sister, Sarah. Conviction: Never harm a child.",
    "specialties": {
        "title": "Specialties",
        "subtitle": "Specialties apply to skills you have at least one dot in. Predator types grant some automatically.",
        "fromPredator": "Predator Type Specialties",
        "required": "Mandatory",
        "choice": "Make a Selection",
        "free": "Character Specialties",
        "freeSubtitle": "You may add free specialties or purchase them with experience later.",
        "addSpecialty": "Add Specialty",
        "selectSkill": "Select Skill",
        "enterSpecialty": "Enter Specialty Name",
        "noSkillsAvailable": "You must assign skill dots before choosing specialties.",
        "emptySlot": "Empty Slot",
        "predatorBonus": "Predator Bonus"
    }
  },
  "predatorTypes": {
    "alleycat": { "name": "Alleycat", "description": "You feed through ambush and violence.", "specialty": "Street Fighting" },
    "bagger": { "name": "Bagger", "description": "You feed on cold, preserved blood.", "specialty": "Breaking and Entering", "specialty2": "Blood Bags" },
    "consensualist": { "name": "Consensualist", "description": "You only feed from willing mortals.", "specialty": "Seduction" },
    "farmer": { "name": "Farmer", "description": "You feed exclusively from animals.", "specialty": "Livestock" },
    "osiris": { "name": "Osiris", "description": "You cultivate a group or group to feed from.", "specialty": "Cults" },
    "sandman": { "name": "Sandman", "description": "You feed on sleeping victims.", "specialty": "Breaking and Entering" },
    "siren": { "name": "Siren", "description": "You seduce your victims to feed.", "specialty": "Seduction" },
    "specialties": {
        "stickups": "Stickups",
        "grappling": "Grappling",
        "blackMarket": "Black Market",
        "lockpicking": "Lockpicking",
        "phlebotomy": "Phlebotomy",
        "vessels": "Vessels",
        "animal": "Specific Animal",
        "hunting": "Hunting",
        "specificTradition": "Specific Tradition",
        "seduction": "Seduction",
        "anesthetics": "Anesthetics",
        "breakIn": "Break-In"
    }
  },
  "characterSheet": {
    "name": "Name",
    "clan": "Clan",
    "sire": "Sire",
    "concept": "Concept",
    "ambition": "Ambição",
    "desire": "Desire",
    "clanBane": "Clan Bane",
    "clanCompulsion": "Clan Compulsion",
    "predatorType": "Predator Type",
    "generation": "Generation",
    "bloodPotency": "Blood Potency",
    "attributes": { "physical": "Physical Attributes", "social": "Social Attributes", "mental": "Mental Attributes" },
    "skills": { "physical": "Physical Skills", "social": "Social Skills", "mental": "Mental Skills" },
    "disciplines": "Disciplines",
    "vitals": "Vitals",
    "hunger": "Hunger",
    "humanity": "Humanity",
    "willpower": "Willpower",
    "health": "Health",
    "advantages": "Advantages",
    "flaws": "Flaws",
    "specialties": "Specialties",
    "touchstones": "Touchstones & Convictions",
    "gemini": {
        "title": "Gemini AI Assistant",
        "subtitle": "Use AI to flesh out your character's story and motivations.",
        "generateBackstory": "Generate Backstory",
        "suggestPlotHooks": "Suggest Plot Hooks",
        "describePortrait": "Describe Portrait",
        "backstoryTitle": "Generated Backstory",
        "plotHookTitle": "Generated Plot Hooks",
        "portraitTitle": "Generated Portrait Description"
    }
  },
  "gemini": {
    "loading": "Generating... The darkness is contemplating...",
    "errorGeneric": "An error occurred during generation.",
    "errorBackstory": "Failed to generate backstory. Please check the console for details.",
    "errorPlotHook": "Failed to generate plot hooks. Please check the console for details.",
    "errorPortrait": "Failed to generate portrait description. Please check the console for details.",
    "backstoryPrompt": "Write a dark, personal, and engaging backstory for this character. It should be about 3-4 paragraphs long. Focus on their human life, the circumstances of their embrace (becoming a vampire), and their first few nights of unlife. Make it fit the gothic-punk tone of the game.",
    "plotHookPrompt": "Generate three distinct and interesting plot hooks for this character to begin their first story in a game session. Each plot hook should be a short paragraph. They should tie into the character's ambition, desire, or predator type. Format them as a numbered list.",
    "portraitPrompt": "Provide a vivid, detailed description of this character's appearance, suitable for an artist to draw a character portrait. Describe their face, typical clothing, posture, and the subtle (or not-so-subtle) signs of being a vampire. The description should be a single, detailed paragraph."
  },
  "compendium": {
      "level": "Level",
      "system": "System"
  },
  "advantages": {
    "allies": { "name": "Allies", "description": "Mortals who support and help you, usually family or friends." },
    "contacts": { "name": "Contacts", "description": "A network of people you can get information from." },
    "fame": { "name": "Fame", "description": "You are well-known in a certain mortal sphere." },
    "haven": { "name": "Haven", "description": "A safe place to rest during the day." },
    "herd": { "name": "Herd", "description": "A group of mortals from whom you can feed reliably." },
    "influence": { "name": "Influence", "description": "Sway within a mortal organization or sphere." },
    "resources": { "name": "Resources", "description": "Wealth, assets, and disposable income." },
    "beautiful": { "name": "Beautiful", "description": "You are exceptionally attractive." },
    "bloodhound": { "name": "Bloodhound", "description": "You can smell the resonance of blood." }
  },
  "flaws": {
    "addiction": { "name": "Addiction", "description": "You are addicted to a substance other than blood." },
    "darksecret": { "name": "Dark Secret", "description": "You have a secret that could ruin you if revealed." },
    "enemy": { "name": "Enemy", "description": "You have an enemy who actively works against you.", "baggerDescription": "Your supply is not secure, and someone wants to take it from you.", "sirenDescription": "A former lover or a jealous rival." },
    "haunted": { "name": "Haunted", "description": "A spirit or other supernatural entity haunts you." },
    "shunned": { "name": "Shunned", "description": "You are distrusted by a significant portion of Kindred society." },
    "feeding": { "name": "Feeding Flaw", "description": "A specific limitation on your feeding.", "consensualistDescription": "You can only feed from those who explicitly consent.", "farmerDescription": "You find it difficult or impossible to feed on human blood." }
  },
  "disciplines": {
    "animalism": { 
        "name": "Animalism", 
        "description": "Control animals and the beast within.",
        "powers": {
            "bondFamulus": { "name": "Bond Famulus", "description": "Psychically bond with an animal.", "system": "No cost. Bond takes 1 scene." },
            "senseTheBeast": { "name": "Sense the Beast", "description": "Sense the Beast in others.", "system": "Resolve + Animalism vs Composure + Subterfuge." },
            "feralWhispers": { "name": "Feral Whispers", "description": "Communicate with animals.", "system": "Manip/Cha + AnimalKen. Cost: One Rouse Check per scene." },
            "animalSucculence": { "name": "Animal Succulence", "description": "Gain more nourishment from animal blood.", "system": "Passive. Animal blood slakes 1 additional hunger." },
            "quellTheBeast": { "name": "Quell the Beast", "description": "Calm the Beast in others.", "system": "Cha + Animalism vs Resolve." },
            "subsumeTheSpirit": { "name": "Subsume the Spirit", "description": "Possess an animal.", "system": "Cost: One Rouse Check. Manip + Animalism vs standard difficulty." },
            "animalDominion": { "name": "Animal Dominion", "description": "Control a horde of animals.", "system": "Cost: One Rouse Check. Cha + Animalism." },
            "drawingOutTheBeast": { "name": "Drawing out the Beast", "description": "Transfer your frenzy to another.", "system": "Wits + Animalism vs Composure + Resolve." }
        }
    },
    "auspex": { 
        "name": "Auspex", 
        "description": "Supernatural senses and perception.",
        "powers": {
            "heightenedSenses": { "name": "Heightened Senses", "description": "Enhance sight, smell, or hearing.", "system": "No cost. Add rating to perception rolls." },
            "senseTheUnseen": { "name": "Sense the Unseen", "description": "See ghosts, hidden vampires, etc.", "system": "Wits + Auspex vs Obfuscate." },
            "premonition": { "name": "Premonition", "description": "Flashes of the future or insight.", "system": "Cost: One Rouse Check (optional). Resolve + Auspex." },
            "scryTheSoul": { "name": "Scry the Soul", "description": "Read auras.", "system": "Int + Auspex vs Composure + Subterfuge." },
            "shareTheSenses": { "name": "Share the Senses", "description": "See through another's eyes.", "system": "Cost: One Rouse Check. Resolve + Auspex." },
            "spiritsTouch": { "name": "Spirit's Touch", "description": "Read psychic impressions from objects.", "system": "Resolve + Auspex." },
            "clairvoyance": { "name": "Clairvoyance", "description": "See distant locations.", "system": "Cost: One Rouse Check. Int + Auspex." },
            "possession": { "name": "Possession", "description": "Possess a mortal.", "system": "Cost: Two Rouse Checks. Resolve + Auspex vs Resolve + Int." },
            "telepathy": { "name": "Telepathy", "description": "Read or speak into minds.", "system": "Cost: One Rouse Check. Resolve + Auspex vs Composure + Subterfuge." }
        }
    },
    "celerity": {
        "name": "Celerity",
        "description": "Supernatural speed and reflexes.",
        "powers": {
            "catsGrace": { "name": "Cat's Grace", "description": "Perfect balance and fall resistance.", "system": "Passive." },
            "rapidReflexes": { "name": "Rapid Reflexes", "description": "Perceive the world in slow motion.", "system": "Passive. No penalty for minor actions." },
            "fleetness": { "name": "Fleetness", "description": "Move with blinding speed.", "system": "Cost: One Rouse Check. Add rating to non-combat Dex rolls." },
            "blink": { "name": "Blink", "description": "Move fast enough to vanish.", "system": "Cost: One Rouse Check. Dex + Athletics to dodge (add rating)." },
            "traversal": { "name": "Traversal", "description": "Run on walls or water.", "system": "Cost: One Rouse Check. Dex + Athletics." },
            "draughtOfElegance": { "name": "Draught of Elegance", "description": "Share Celerity via blood.", "system": "Cost: One Rouse Check." },
            "unerringAim": { "name": "Unerring Aim", "description": "Supernatural aim with thrown/fired weapons.", "system": "Cost: One Rouse Check. Aim action is instant." },
            "lightningStrike": { "name": "Lightning Strike", "description": "Strike faster than the eye can follow.", "system": "Cost: One Rouse Check. Target gets no defense if not supernatural." },
            "splitSecond": { "name": "Split Second", "description": "Interrupt actions.", "system": "Cost: One Rouse Check. Retcon last few seconds." }
        }
    },
    "dominate": {
        "name": "Dominate",
        "description": "Mind control via eye contact.",
        "powers": {
            "cloudMemory": { "name": "Cloud Memory", "description": "Erase recent memories.", "system": "Cha + Dominate vs Wits + Resolve." },
            "compel": { "name": "Compel", "description": "Single action command.", "system": "Cha + Dominate vs Int + Resolve." },
            "mesmerize": { "name": "Mesmerize", "description": "Complex implanted commands.", "system": "Manip + Dominate vs Int + Resolve." },
            "dementation": { "name": "Dementation", "description": "Incites madness.", "system": "Manip + Dominate vs Composure + Int." },
            "theForgetfulMind": { "name": "The Forgetful Mind", "description": "Rewrite long-term memories.", "system": "Manip + Dominate vs Int + Resolve." },
            "submergedDirective": { "name": "Submerged Directive", "description": "Delayed hypnotic trigger.", "system": "No additional cost." },
            "rationalize": { "name": "Rationalize", "description": "Victims believe actions were their idea.", "system": "Passive." },
            "massManipulation": { "name": "Mass Manipulation", "description": "Dominate groups.", "system": "Cost: One Rouse Check." },
            "terminalDecree": { "name": "Terminal Decree", "description": "Command suicide.", "system": "No additional cost. Harder to resist." }
        }
    },
    "fortitude": {
        "name": "Fortitude",
        "description": "Supernatural durability.",
        "powers": {
            "resilience": { "name": "Resilience", "description": "Add rating to health.", "system": "Passive." },
            "unswayableMind": { "name": "Unswayable Mind", "description": "Resist mental influence.", "system": "Add rating to resist dice pools." },
            "toughness": { "name": "Toughness", "description": "Subtract superficial damage.", "system": "Subtract rating from superficial damage taken." },
            "defyBane": { "name": "Defy Bane", "description": "Resist sunlight/fire.", "system": "Cost: One Rouse Check to convert Agg to Sup." },
            "fortifyTheInnerFacade": { "name": "Fortify the Inner Facade", "description": "Hide thoughts/aura.", "system": "Passive. Contest readers with Fortitude." },
            "draughtOfEndurance": { "name": "Draught of Endurance", "description": "Share Fortitude via blood.", "system": "Cost: One Rouse Check." },
            "fleshOfMarble": { "name": "Flesh of Marble", "description": "Ignore first source of damage.", "system": "Cost: One Rouse Check." },
            "prowessFromPain": { "name": "Prowess from Pain", "description": "Gain bonuses when wounded.", "system": "Passive. Add damage taken to physical pools." }
        }
    },
    "obfuscate": {
        "name": "Obfuscate",
        "description": "Stealth and illusion.",
        "powers": {
            "cloakOfShadows": { "name": "Cloak of Shadows", "description": "Invisible while standing still.", "system": "No cost." },
            "silenceOfDeath": { "name": "Silence of Death", "description": "Silence all movement noise.", "system": "No cost." },
            "unseenPassage": { "name": "Unseen Passage", "description": "Invisible while moving.", "system": "Wits + Obfuscate vs Wits + Auspex." },
            "ghostInTheMachine": { "name": "Ghost in the Machine", "description": "Effect extends to electronic recordings.", "system": "Passive." },
            "maskOfAThousandFaces": { "name": "Mask of a Thousand Faces", "description": "Change appearance.", "system": "Cost: One Rouse Check." },
            "vanish": { "name": "Vanish", "description": "Disappear from plain sight.", "system": "Wits + Obfuscate vs Wits + Awareness." },
            "cloakTheGathering": { "name": "Cloak the Gathering", "description": "Hide a group.", "system": "Cost: One Rouse Check." },
            "impostorsGuise": { "name": "Impostor's Guise", "description": "Perfectly mimic a specific person.", "system": "Cost: One Rouse Check. Manip + Performance." }
        }
    },
    "potence": {
        "name": "Potence",
        "description": "Supernatural strength.",
        "powers": {
            "lethalBody": { "name": "Lethal Body", "description": "Unarmed attacks are lethal.", "system": "Passive." },
            "soaringLeap": { "name": "Soaring Leap", "description": "Jump great distances.", "system": "No cost." },
            "prowess": { "name": "Prowess", "description": "Add rating to strength damage.", "system": "Passive." },
            "brutalFeed": { "name": "Brutal Feed", "description": "Feed in combat instantly.", "system": "Strength + Brawl vs Str + Brawl." },
            "sparkOfRage": { "name": "Spark of Rage", "description": "Cause frenzy in others.", "system": "Manip + Presence vs Composure + Resolve." },
            "draughtOfMight": { "name": "Draught of Might", "description": "Share Potence via blood.", "system": "Cost: One Rouse Check." },
            "earthshock": { "name": "Earthshock", "description": "Ground slam area attack.", "system": "Cost: One Rouse Check. Knockdown nearby foes." },
            "fistOfCaine": { "name": "Fist of Caine", "description": "Attack from distance.", "system": "Cost: One Rouse Check. Strength + Brawl." }
        }
    },
    "presence": {
        "name": "Presence",
        "description": "Emotional manipulation and awe.",
        "powers": {
            "awe": { "name": "Awe", "description": "Attract attention.", "system": "Manip + Presence. Cost: Free." },
            "daunt": { "name": "Daunt", "description": "Intimidate with an aura.", "system": "Add rating to Intimidation. Passive." },
            "lingeringKiss": { "name": "Lingering Kiss", "description": "Addiction to the Kiss.", "system": "Victim gains bonus to rolls to aid you." },
            "dreadGaze": { "name": "Dread Gaze", "description": "Terrify a target.", "system": "Cha + Presence vs Composure + Resolve." },
            "entrancement": { "name": "Entrancement", "description": "Make target serve you.", "system": "Cha + Presence vs Composure + Resolve." },
            "irresistibleVoice": { "name": "Irresistible Voice", "description": "Dominate using only voice.", "system": "Passive." },
            "summon": { "name": "Summon", "description": "Call a person to you.", "system": "Cost: One Rouse Check. Cha + Presence." },
            "majesty": { "name": "Majesty", "description": "Impossible to attack.", "system": "Cost: One Rouse Check. Cha + Presence." },
            "starMagnetism": { "name": "Star Magnetism", "description": "Awe affects everyone continuously.", "system": "Cost: One Rouse Check." }
        }
    },
    "protean": {
        "name": "Metamorfose",
        "description": "A Disciplina da mudança de forma, permitindo a um vampiro alterar sua forma e se fundir com a terra.",
        "powers": {
            "eyesOfTheBeast": { "name": "Olhos da Besta", "description": "Seus olhos brilham em vermelho no escuro, permitindo que você veja perfeitamente na escuridão total.", "system": "Você pode ver na escuridão completa. Isso pode ser intimidador." },
            "weightOfTheFeather": { "name": "Peso da Pena", "description": "Flutuar e imunidade a dano de queda.", "system": "Sem custo." },
            "feralWeapons": { "name": "Armas Selvagens", "description": "Cresça garras viciosas que podem rasgar carne e metal.", "system": "Seus ataques desarmados causam dano Agravado." },
            "earthMeld": { "name": "Fusão com a Terra", "description": "Mergulhe na terra para descansar, protegido da luz solar.", "system": "Você pode mergulhar em solo natural e permanecer lá, dormente, até o próximo pôr do sol." },
            "shapechange": { "name": "Mudança de Forma", "description": "Transforme-se na forma de um animal, como um lobo ou um morcego.", "system": "Role Vigor + Metamorfose. Você pode se transformar em uma única forma animal escolhida." },
            "metamorphosis": { "name": "Metamorfose", "description": "Torne-se um animal maior/menor.", "system": "Custo: Um Teste de Sangue." },
            "mistForm": { "name": "Forma de Névoa", "description": "Transforme seu corpo em uma nuvem de névoa, capaz de passar por frestas e ignorar danos físicos.", "system": "Você se torna incorpóreo e imune à maioria dos ataques físicos." },
            "theUnfetteredHeart": { "name": "O Coração Livre", "description": "Órgãos internos são maleáveis.", "system": "Mais difícil de estacar." }
        }
    },
    "bloodsorcery": {
        "name": "Feitiçaria de Sangue",
        "description": "A prática esotérica de usar Vitae para alimentar rituais e lançar feitiços.",
        "powers": {
            "corrosiveVitae": { "name": "Vitae Corrosiva", "description": "Torne uma gota do seu sangue ácida e corrosiva.", "system": "Uma gota do seu sangue pode corroer material não-vivo." },
            "aTasteForBlood": { "name": "Um Gosto por Sangue", "description": "Aprenda segredos profundos de uma única gota do sangue de outro.", "system": "Ao provar o sangue, você pode aprender a geração do alvo, clã (se houver), e se ele está sob um laço de sangue." },
            "extinguishVitae": { "name": "Extinguir Vitae", "description": "Faça o sangue de outro vampiro se tornar inerte e inútil.", "system": "Role Inteligência + Feitiçaria de Sangue. O sucesso força o alvo a gastar mais sangue para usar seus poderes." },
            "bloodOfPotency": { "name": "Sangue de Potência", "description": "Aumente Potência do Sangue.", "system": "Custo: Um Teste de Sangue." },
            "scorpionsTouch": { "name": "Toque do Escorpião", "description": "Transforme seu próprio sangue em um veneno potente.", "system": "Seu toque se torna tóxico, causando dano Agravado a mortais e vampiros." },
            "theftOfVitae": { "name": "Roubo de Vitae", "description": "Roube sangue à distância.", "system": "Custo: Um Teste de Sangue." },
            "baalsCaress": { "name": "Carícia de Baal", "description": "Ferva o sangue de uma vítima em suas veias à distância.", "system": "Role Inteligência + Feitiçaria de Sangue vs Vigor + Determinação. Causa dano Agravado massivo ao alvo." },
            "cauldronOfBlood": { "name": "Caldeirão de Sangue", "description": "Ferver sangue na vítima.", "system": "Custo: Um Teste de Sangue." }
        }
    },
    "oblivion": {
        "name": "Olvido",
        "description": "Comando sobre as sombras e as energias do submundo.",
        "powers": {
             "shadowCloak": { "name": "Manto de Sombras", "description": "Aprofunde as sombras ambientes ao seu redor, auxiliando a furtividade.", "system": "Adicione um dado aos testes de Furtividade em áreas com pelo menos alguma sombra." },
             "oblivionsSight": { "name": "Visão do Olvido", "description": "Veja no escuro/fantasmas.", "system": "Custo: Um Teste de Sangue." },
             "armsOfAhriman": { "name": "Braços de Ahriman", "description": "Convoque tentáculos de sombra para agarrar e atacar seus inimigos.", "system": "Role Destreza + Olvido para fazer um ataque com tentáculos de sombra." },
             "shadowCast": { "name": "Projeção Sombria", "description": "Projete sombras.", "system": "Sem custo." },
             "touchOfOblivion": { "name": "Toque do Olvido", "description": "Murchar via toque.", "system": "Custo: Um Teste de Sangue." },
             "stygianShroud": { "name": "Mortalha Estígia", "description": "Crie uma nuvem de escuridão sobrenatural que cega e ensurdece.", "system": "Role Determinação + Olvido. O sucesso cria uma zona de privação sensorial." },
             "tenebrousAvatar": { "name": "Avatar Tenebroso", "description": "Transforme-se em um ser monstruoso de pura sombra.", "system": "Você se torna uma criatura sombria aterrorizante, ganhando bônus de combate e a habilidade de voar." }
        }
    },
    "thinbloodalchemy": {
        "name": "Alquimia de Sangue-Fraco",
        "description": "A prática improvisada e muitas vezes instável de criar pseudo-Disciplinas a partir de vitae.",
        "powers": {
             "farReach": { "name": "Longo Alcance", "description": "Telecinese.", "system": "Custo: Um Teste de Sangue." }
        }
    }
  }
};
const pt = {
  "app": {
    "title": "Criador de Personagens de Vampiro",
    "subtitle": "Dê vida ao seu Membro no Mundo das Trevas"
  },
  "buttons": {
    "next": "Próximo",
    "back": "Voltar",
    "jumpToSheet": "Ir para a Ficha",
    "close": "Fechar",
    "expandAll": "Expandir Tudo",
    "collapseAll": "Recolher Tudo",
    "save": "Salvar",
    "load": "Carregar",
    "download": "Baixar JSON",
    "upload": "Carregar JSON",
    "reset": "Reiniciar Personagem",
    "add": "Adicionar",
    "cancel": "Cancelar",
    "confirm": "Confirmar"
  },
  "steps": {
    "concept": "Conceito",
    "clan": "Clã",
    "attributes": "Atributos",
    "skills": "Perícias",
    "finishingTouches": "Toques Finais",
    "sheet": "Ficha de Personagem Final"
  },
  "summary": {
      "title": "Resumo e Progresso do Personagem",
      "readySubtitle": "Todos os campos básicos estão preenchidos. Você pode ver sua ficha de personagem abaixo.",
      "incompleteSubtitle": "Por favor, complete as seguintes seções para finalizar seu personagem.",
      "missing_concept": "Nome, Conceito, Ambição ou Desejo faltando.",
      "missing_clan": "Clã não selecionado.",
      "error_attributes": "Atributos devem somar 22.",
      "error_skills": "Distribuição de perícias incompleta (mín 22 pontos).",
      "missing_predator": "Tipo de Predador não selecionado.",
      "error_disciplines": "Selecione pelo menos 2 pontos em Disciplinas (+ bônus de Predador).",
      "error_advantages": "Gaste 7 pontos em Vantagens.",
      "error_flaws": "Escolha 2 pontos em Defeitos."
  },
  "common": {
    "selectPlaceholder": "Selecione...",
    "selectAttrPlaceholder": "Selecione Atributo",
    "selectSkillPlaceholder": "Selecione Perícia",
    "selectDiscPlaceholder": "Selecione Disciplina...",
    "unnamed": "Sem nome",
    "unknown": "Desconhecido",
    "notDefined": "Não definido",
    "keyAttributes": "Atributos Chave",
    "keySkills": "Perícias Chave",
    "noClanSelected": "Nenhum clã selecionado.",
    "noneListed": "Nenhum listado.",
    "skill": "Perícia",
    "available": "Disponível",
    "assigned": "Atribuído",
    "clear": "Limpar",
    "value": "Valor",
    "poolDistribution": "Reserva de Pontos",
    "poolLegend": "Esferas brilhantes estão disponíveis. Esferas escuras já foram atribuídas.",
    "managePowers": "Gerenciar Poderes"
  },
  "concept": {
    "title": "Conceito Principal",
    "subtitle": "Defina a identidade principal do seu personagem. Quem ele era? Quem ele é agora?",
    "name": "Nome",
    "sire": "Senhor",
    "sirePlaceholder": "Quem te transformou em vampiro?",
    "concept": "Conceito",
    "conceptPlaceholder": "ex: Ativista desiludido",
    "ambition": "Ambição",
    "ambitionPlaceholder": "Objetivo de longo prazo, ex: Derrubar o Príncipe",
    "desire": "Desejo",
    "desirePlaceholder": "Objetivo de curto prazo, ex: Provar o sangue de uma celebridade",
    "portrait": "Retrato do Personagem",
    "uploadPortrait": "Enviar Imagem",
    "removePortrait": "Remover Imagem"
  },
  "clan": {
    "title": "Escolha sua Linhagem"
  },
  "clans": {
    "brujah": { "name": "Brujah", "description": "Rebeldes e agitadores que lutam por suas crenças apaixonadas.", "bane": "Seus temperamentos são gatilhos curtos. Resistir a um frenesi é mais difícil.", "compulsion": "Rebelião. O vampiro deve agir contra alguém em posição de autoridade ou uma crença atual." },
    "gangrel": { "name": "Gangrel", "description": "Nômades e sobreviventes, intimamente ligados à sua natureza animal.", "bane": "Eles ganham características animais quando entram em frenesi.", "compulsion": "Impulsos Ferozes. O vampiro regride a um estado animal, incapaz de falar e agindo por instinto." },
    "malkavian": { "name": "Malkavian", "description": "Videntes e lunáticos amaldiçoados com uma percepção que estilhaça a mente.", "bane": "Eles são afligidos por uma perturbação permanente.", "compulsion": "Ilusão. A perturbação do vampiro se torna a verdade absoluta, afetando sua percepção da realidade." },
    "nosferatu": { "name": "Nosferatu", "description": "Párias terrivelmente deformados que traficam segredos das sombras.", "bane": "Eles são monstruosamente feios e nunca podem se passar por humanos.", "compulsion": "Criptofilia. O vampiro torna-se obcecado por um segredo, disposto a fazer qualquer coisa para saber mais sobre ele." },
    "toreador": { "name": "Toreador", "description": "Artistas e visionários, obcecados pela beleza em todas as suas formas.", "bane": "Eles se tornam obcecados pela beleza, dificultando a ação em ambientes belos.", "compulsion": "Fixação Estética. O vampiro fica cativado por algo belo, incapaz de agir até que tenha passado um tempo apreciando-o." },
    "tremere": { "name": "Tremere", "description": "Bruxos e ocultistas que manipulam o poder da feitiçaria do sangue.", "bane": "O sangue deles os torna mais facilmente Laçados por outros vampiros.", "compulsion": "Perfeccionismo. O vampiro fica obcecado com uma tarefa, repetindo-a até que esteja perfeita." },
    "ventrue": { "name": "Ventrue", "description": "O clã governante de aristocratas, executivos e reis.", "bane": "Eles têm uma preferência alimentar específica e rara.", "compulsion": "Arrogância. O vampiro deve afirmar sua autoridade e não aceitará ser negado." },
    "banuhaqim": { "name": "Banu Haqim", "description": "Juízes e assassinos que caçam outros vampiros e seguem um código de lei estrito.", "bane": "Eles são compelidos a se alimentar do sangue de outros vampiros.", "compulsion": "Julgamento. O vampiro deve punir alguém que transgrediu um código que ele defende." },
    "theministry": { "name": "O Ministério", "description": "Corruptores e libertadores que usam o vício e a tentação como suas principais ferramentas.", "bane": "Eles são vulneráveis a luzes fortes.", "compulsion": "Transgressão. O vampiro deve levar alguém a agir sobre seus desejos mais sombrios." },
    "lasombra": { "name": "Lasombra", "description": "Darwinistas sociais ambiciosos e impiedosos que comandam o poder das sombras.", "bane": "Eles não têm reflexo e a tecnologia muitas vezes falha em sua presença.", "compulsion": "Ambição. O vampiro deve provar sua superioridade e não tolerará o fracasso." },
    "caitiff": { "name": "Caitiff", "description": "Vampiros sem clã, forasteiros sem linhagem para chamar de sua.", "bane": "Eles são evitados pela sociedade vampírica e devem pagar mais por certos méritos sociais.", "compulsion": "Falta de Raízes. O vampiro sente uma necessidade desesperada de pertencer, tentando se encaixar em qualquer grupo." },
    "thinblood": { "name": "Sangue-Fraco", "description": "Vampiros de sangue fraco da 14ª geração ou superior, mal um vampiro de verdade.", "bane": "Eles são fracos e sofrem de várias condições debilitantes.", "compulsion": "Isolamento. O vampiro se concentra em seus próprios problemas, ignorando as necessidades dos outros." }
  },
  "attributes": {
    "title": "Distribua os Atributos",
    "subtitle": "Distribua seus atributos com base na regra: um Atributo em 4 pontos, três em 3, quatro em 2, e um permanece em 1.",
    "bestTitle": "Melhor Atributo (4 Pontos)",
    "goodTitle": "Bons Atributos (3 Pontos)",
    "averageTitle": "Atributos Médios (2 Pontos)",
    "oneAt4": "Um em 4",
    "threeAt3": "Três em 3",
    "fourAt2": "Quatro em 2",
    "selectorLabel": "{{label}} #{{number}}",
    "list": {
      "Strength": "Força",
      "Dexterity": "Destreza",
      "Stamina": "Vigor",
      "Charisma": "Carisma",
      "Manipulation": "Manipulação",
      "Composure": "Autocontrole",
      "Intelligence": "Inteligência",
      "Wits": "Raciocínio",
      "Resolve": "Determinação"
    }
  },
  "skills": {
    "title": "Distribua as Perícias",
    "subtitle": "Primeiro, escolha uma distribuição de perícias que se encaixe no seu conceito. Depois, atribua as perícias aos espaços disponíveis.",
    "chooseSpread": "Escolha a Distribuição de Perícias",
    "specialist": { "name": "Especialista", "description": "Uma Perícia em 4, três em 3, três em 2 e três em 1." },
    "balanced": { "name": "Equilibrado", "description": "Três Perícias em 3, cinco em 2 e sete em 1." },
    "jack": { "name": "Pau para toda obra", "description": "Uma Perícia em 3, oito em 2 e dez em 1." },
    "masterTitle": "Perícia Mestra (4 Pontos)",
    "expertTitle": "Perícias Experientes (3 Pontos)",
    "adeptTitle": "Perícias Adeptas (2 Pontos)",
    "noviceTitle": "Perícias Novatas (1 Ponto)",
    "oneAt4": "Uma em 4",
    "selectorLabel": "{{label}} #{{number}}",
    "manageSpecialties": {
        "title": "Gerenciar Especialidades",
        "fromPredator": "Do Tipo de Predador",
        "none": "Nenhuma",
        "required": "Especialidades Obrigatórias",
        "specialtyRequired": "Especialidade obrigatória",
        "optional": "Especialidades Opcionais",
        "optionalSubtitle": "Você ganha uma especialidade gratuita. Atribua-a a qualquer perícia em que você tenha pelo menos um ponto.",
        "addSpecialty": "Adicionar Especialidade",
        "specialtyName": "Nome da Especialidade"
    },
     "list": {
      "Athletics": "Atletismo",
      "Brawl": "Briga",
      "Craft": "Ofícios",
      "Drive": "Condução",
      "Firearms": "Armas de Fogo",
      "Larceny": "Ladinagem",
      "Melee": "Armas Brancas",
      "Stealth": "Furtividade",
      "Survival": "Sobrevivência",
      "Animal Ken": "Trato com Animais",
      "Etiquette": "Etiqueta",
      "Insight": "Intuição",
      "Intimidation": "Intimidação",
      "Leadership": "Liderança",
      "Performance": "Performance",
      "Persuasion": "Persuasão",
      "Streetwise": "Manha",
      "Subterfuge": "Lábia",
      "Academics": "Academicismo",
      "Awareness": "Prontidão",
      "Finance": "Finanças",
      "Investigation": "Investigação",
      "Medicine": "Medicina",
      "Occult": "Ocultismo",
      "Politics": "Política",
      "Science": "Ciências",
      "Technology": "Tecnologia"
    },
    "specialtyExamples": {
      "Athletics": "ex: Parkour, Natação, Arremesso, Escalada",
      "Brawl": "ex: Boxe, Agarrar, Golpes Sujos, Arremessos",
      "Craft": "ex: Carpintaria, Eletrônica, Pintura, Mecânica",
      "Drive": "ex: Evasão, perseguição, Motocicletas, Acrobacias",
      "Firearms": "ex: Pistolas, Rifles, Tiro ao Alvo, Saque Rápido",
      "Larceny": "ex: Arrombamento, Bater Carteira, Cofres",
      "Melee": "ex: Facas, Espadas, Machados, Armas Improvisadas",
      "Stealth": "ex: Camuflagem, Esconder-se, Movimento Silencioso, Multidões",
      "Survival": "ex: Caça, Rastreamento, Urbano, Floresta",
      "Animal Ken": "ex: Cães, Cavalos, Lobos, Adestramento",
      "Etiquette": "ex: Camarilla, Alta Sociedade, Rua, Corporativo",
      "Insight": "ex: Empatia, Detectar Mentiras, Motivos",
      "Intimidation": "ex: Física, Psicológica, Olhar Fixo, Chantagem",
      "Leadership": "ex: Comando, Inspiração, Oratória, Guerra",
      "Performance": "ex: Atuação, Dança, Canto, Instrumentos",
      "Persuasion": "ex: Barganha, Lábia, Sedução, Negociação",
      "Streetwise": "ex: Mercado Negro, Gangues, Rumores, Drogas",
      "Subterfuge": "ex: Mentira Impecável, Sedução, O Grande Golpe",
      "Academics": "ex: História, Direito, Literatura, Filosofia",
      "Awareness": "ex: Emboscadas, Camuflagem, Armadilhas",
      "Finance": "ex: Bancos, Lavagem de Dinheiro, Mercado de Ações",
      "Investigation": "ex: Criminologia, Dedução, Forense",
      "Medicine": "ex: Primeiros Socorros, Cirurgia, Toxicologia, Patologia",
      "Occult": "ex: Magia de Sangue, Fantasmas, Sabedoria Nodista, Espíritos",
      "Politics": "ex: Camarilla, Governo da Cidade, Anarquistas, Mídia",
      "Science": "ex: Biologia, Química, Física, Geologia",
      "Technology": "ex: Hacking, Sistemas de Segurança, Programação"
    }
  },
  "finishingTouches": {
    "title": "Toques Finais",
    "disciplines": {
      "title": "Disciplinas",
      "subtitle": "Seu clã determina suas Disciplinas iniciais. Escolha uma para ter 2 pontos e outra para ter 1 ponto.",
      "twoDots": "Dois Pontos",
      "oneDot": "Um Ponto",
      "compendiumTitle": "Compêndio de Disciplinas",
      "selectPowers": "Selecionar Poderes",
      "powersSelected": "{{count}}/{{total}} Selecionados"
    },
    "predatorType": {
      "title": "Tipo de Predador"
    },
    "advantages": {
      "title": "Vantagens"
    },
    "flaws": {
      "title": "Defeitos"
    },
    "touchstones": "Pedras de Toque e Convicções",
    "touchstonesPlaceholder": "Quem são os mortais que ancoram sua humanidade? ex: Pedra de Toque: Minha irmã, Sarah. Convicção: Nunca ferir uma criança.",
    "specialties": {
        "title": "Especialidades",
        "subtitle": "Selecione especialidades baseadas no seu Tipo de Predador e uma escolha livre.",
        "fromPredator": "Especialidades de Predador",
        "required": "Obrigatórias",
        "choice": "Escolha Uma",
        "free": "Especialidades do Personagem",
        "freeSubtitle": "Você pode adicionar especialidades livres ou comprá-las com experiência depois.",
        "addSpecialty": "Adicionar Especialidade",
        "selectSkill": "Selecionar Perícia",
        "enterSpecialty": "Nome da Especialidade",
        "noSkillsAvailable": "Você deve atribuir pontos em perícias antes de escolher especialidades.",
        "emptySlot": "Espaço Vazio",
        "predatorBonus": "Bônus de Predador"
    }
  },
   "predatorTypes": {
    "alleycat": { "name": "Gato de Beco", "description": "Você se alimenta através de emboscadas e violência.", "specialty": "Luta de Rua" },
    "bagger": { "name": "Bolsista", "description": "Você se alimenta de sangue frio e preservado.", "specialty": "Arrombamento", "specialty2": "Bolsas de Sangue" },
    "consensualist": { "name": "Consensual", "description": "Você só se alimenta de mortais dispostos.", "specialty": "Sedução" },
    "farmer": { "name": "Fazendeiro", "description": "Você se alimenta exclusivamente de animais.", "specialty": "Gado" },
    "osiris": { "name": "Osíris", "description": "Você cultiva um culto ou grupo para se alimentar.", "specialty": "Cultos" },
    "sandman": { "name": "Sandman", "description": "Você se alimenta de vítimas adormecidas.", "specialty": "Arrombamento" },
    "siren": { "name": "Sereia", "description": "Você seduz suas vítimas para se alimentar.", "specialty": "Sedução" },
    "specialties": {
        "stickups": "Assaltos",
        "grappling": "Agarrar",
        "blackMarket": "Mercado Negro",
        "lockpicking": "Arrombamento",
        "phlebotomy": "Flebotomia",
        "vessels": "Vasos",
        "animal": "Animal Específico",
        "hunting": "Caça",
        "specificTradition": "Tradição Específica",
        "seduction": "Sedução",
        "anesthetics": "Anestésicos",
        "breakIn": "Invasão"
    }
  },
  "characterSheet": {
    "name": "Nome",
    "clan": "Clã",
    "sire": "Senhor",
    "concept": "Conceito",
    "ambition": "Ambição",
    "desire": "Desejo",
    "clanBane": "Perdição do Clã",
    "clanCompulsion": "Compulsão do Clã",
    "predatorType": "Tipo de Predador",
    "generation": "Geração",
    "bloodPotency": "Potência do Sangue",
    "attributes": { "physical": "Atributos Físicos", "social": "Atributos Sociais", "mental": "Atributos Mentais" },
    "skills": { "physical": "Perícias Físicas", "social": "Perícias Sociais", "mental": "Perícias Mentais" },
    "disciplines": "Disciplinas",
    "vitals": "Sinais Vitais",
    "hunger": "Fome",
    "humanity": "Humanidade",
    "willpower": "Força de Vontade",
    "health": "Vitalidade",
    "advantages": "Vantagens",
    "flaws": "Defeitos",
    "specialties": "Especialidades",
    "touchstones": "Pedras de Toque e Convicções",
    "gemini": {
        "title": "Assistente de IA Gemini",
        "subtitle": "Use a IA para desenvolver a história e as motivações do seu personagem.",
        "generateBackstory": "Gerar História",
        "suggestPlotHooks": "Sugerir Ganchos de Trama",
        "describePortrait": "Descrever Retrato",
        "backstoryTitle": "História Gerada",
        "plotHookTitle": "Ganchos de Trama Gerados",
        "portraitTitle": "Descrição de Retrato Gerada"
    }
  },
  "gemini": {
    "loading": "Gerando... A escuridão está contemplando...",
    "errorGeneric": "Ocorreu um erro durante a geração.",
    "errorBackstory": "Falha ao gerar a história. Por favor, verifique o console para detalhes.",
    "errorPlotHook": "Falha ao gerar os ganchos de trama. Por favor, verifique o console para detalhes.",
    "errorPortrait": "Falha ao gerar a descrição do retrato. Por favor, verifique o console para detalhes.",
    "backstoryPrompt": "Escreva uma história sombria, pessoal e envolvente para este personagem. Deve ter cerca de 3-4 parágrafos. Foque na vida humana, nas circunstâncias do abraço (tornar-se vampiro) e nas primeiras noites de não-vida. Faça com que se encaixe no tom gótico-punk do jogo.",
    "plotHookPrompt": "Gere três ganchos de trama distintos e interessantes para este personagem começar sua primeira história em uma sessão de jogo. Cada gancho de trama deve ser um parágrafo curto. Eles devem estar ligados à ambição, desejo ou tipo de predador do personagem. Formate-os como uma lista numerada.",
    "portraitPrompt": "Forneça uma descrição vívida e detalhada da aparência deste personagem, adequada para um artista desenhar um retrato. Descreva seu rosto, roupas típicas, postura e os sinais sutis (ou não tão sutis) de ser um vampiro. A descrição deve ser um único parágrafo detalhado."
  },
  "compendium": {
      "level": "Nível",
      "system": "Sistema"
  },
  "advantages": {
    "allies": { "name": "Aliados", "description": "Mortais que te apoiam e ajudam, geralmente família ou amigos." },
    "contacts": { "name": "Contatos", "description": "Uma rede de pessoas de quem você pode obter informações." },
    "fame": { "name": "Fama", "description": "Você é bem conhecido em uma certa esfera mortal." },
    "haven": { "name": "Refúgio", "description": "Um lugar seguro para descansar durante o dia." },
    "herd": { "name": "Rebanho", "description": "Um grupo de mortais de quem você pode se alimentar de forma confiável." },
    "influence": { "name": "Influência", "description": "Poder dentro de uma organização ou esfera mortal." },
    "resources": { "name": "Recursos", "description": "Riqueza, ativos e renda disponível." },
    "beautiful": { "name": "Belo", "description": "Você é excepcionalmente atraente." },
    "bloodhound": { "name": "Faro de Sangue", "description": "Você pode sentir o cheiro da ressonância do sangue." }
  },
  "flaws": {
    "addiction": { "name": "Vício", "description": "Você é viciado em uma substância que não seja sangue." },
    "darksecret": { "name": "Segredo Sombrio", "description": "Você tem um segredo que poderia te arruinar se revelado." },
    "enemy": { "name": "Inimigo", "description": "Você tem um inimigo que trabalha ativamente contra você.", "baggerDescription": "Seu suprimento não é seguro e alguém quer tomá-lo de você.", "sirenDescription": "Um ex-amante ou um rival ciumento." },
    "haunted": { "name": "Assombrado", "description": "Um espírito ou outra entidade sobrenatural te assombra." },
    "shunned": { "name": "Evitado", "description": "Você não é confiável para uma parte significativa da sociedade dos Membros." },
    "feeding": { "name": "Defeito de Alimentação", "description": "Uma limitação específica na sua alimentação.", "consensualistDescription": "Você só pode se alimentar de quem consente explicitamente.", "farmerDescription": "Você acha difícil ou impossível se alimentar de sangue humano." }
  },
  "disciplines": {
    "animalism": { 
        "name": "Animalismo", 
        "description": "A habilidade de se comunicar e controlar animais, e de acessar a Besta interior.",
        "powers": {
            "bondFamulus": { "name": "Vínculo Famulus", "description": "Forme um vínculo místico com um animal, tornando-o um companheiro leal.", "system": "Passe uma noite inteira com um animal. Ele se torna excepcionalmente leal e você pode sentir seu estado emocional telepaticamente." },
            "senseTheBeast": { "name": "Sentir a Besta", "description": "Sente a Besta em outros.", "system": "Determinação + Animalismo vs Autocontrole + Lábia." },
            "feralWhispers": { "name": "Sussurros Selvagens", "description": "Dê comandos telepáticos a animais.", "system": "Faça um teste de Carisma + Animalismo para comandar um animal ou grupo de animais." },
            "animalSucculence": { "name": "Suficiência Animal", "description": "Torna o sangue animal tão nutritivo quanto o sangue humano.", "system": "O vampiro pode saciar um ponto adicional de Fome ao se alimentar de animais." },
            "quellTheBeast": { "name": "Acalmar a Besta", "description": "Acalme a Besta em outros.", "system": "Car + Animalismo vs Determinação." },
            "subsumeTheSpirit": { "name": "Subjugar o Espírito", "description": "Possua um animal, vendo e ouvindo através de seus sentidos.", "system": "Faça um teste de Carisma + Animalismo. O sucesso permite que você controle o animal por uma cena." },
            "animalDominion": { "name": "Domínio Animal", "description": "Exerça sua vontade sobre um grande grupo de animais, transformando-os em um enxame sob seu comando.", "system": "Faça um teste de Carisma + Animalismo. O número de sucessos determina o tamanho e a duração do seu controle." },
            "drawingOutTheBeast": { "name": "Expulsar a Besta", "description": "Transfira seu frenesi para outro.", "system": "Raciocínio + Animalismo vs Autocontrole + Determinação." }
        }
    },
    "auspex": { 
        "name": "Auspícios", 
        "description": "Sentidos sobrenaturais que podem perceber o invisível, ler emoções e perfurar ilusões.",
        "powers": {
            "heightenedSenses": { "name": "Sentidos Aguçados", "description": "Melhore visão, olfato ou audição.", "system": "Sem custo. Adicione nível aos testes de percepção." },
            "senseTheUnseen": { "name": "Sentir o Oculto", "description": "Detecte a presença de seres sobrenaturais como vampiros, lobisomens e fantasmas.", "system": "Raciocínio + Auspícios vs Ofuscação." },
            "premonition": { "name": "Premonição", "description": "Obtenha flashes de insight sobre o futuro imediato, muitas vezes como um aviso de perigo.", "system": "A critério do Narrador, você recebe uma visão breve e enigmática de um evento futuro." },
            "scryTheSoul": { "name": "Vistoriar a Alma", "description": "Leia os pensamentos superficiais e as emoções de um alvo olhando em seus olhos.", "system": "Role Manipulação + Auspícios vs Autocontrole + Lábia para ler a aura e os pensamentos superficiais de um alvo." },
            "shareTheSenses": { "name": "Compartilhar Sentidos", "description": "Veja pelos olhos de outro.", "system": "Custo: Um Teste de Sangue. Determinação + Auspícios." },
            "spiritsTouch": { "name": "Toque do Espírito", "description": "Ao manusear um objeto, receba visões de seus antigos proprietários e eventos significativos.", "system": "Role Determinação + Auspícios. Os sucessos determinam a clareza e os detalhes das visões." },
            "clairvoyance": { "name": "Clarividência", "description": "Projete seus sentidos para um local distante, vendo e ouvindo como se estivesse lá.", "system": "Role Inteligência + Auspícios. O alcance e a duração dependem do número de sucessos." },
            "possession": { "name": "Possessão", "description": "Possua um mortal.", "system": "Custo: Dois Testes de Sangue. Determinação + Auspícios vs Determinação + Int." },
            "telepathy": { "name": "Telepatia", "description": "Leia ou fale em mentes.", "system": "Custo: Um Teste de Sangue. Determinação + Auspícios vs Autocontrole + Lábia." }
        }
    },
    "celerity": {
        "name": "Rapidez",
        "description": "Velocidade e reflexos sobrenaturais, permitindo ao vampiro mover-se e reagir com uma rapidez estonteante.",
        "powers": {
            "catsGrace": { "name": "Graça Felina", "description": "Ganhe um senso sobrenatural de equilíbrio e habilidade acrobática.", "system": "Você é imune a dano de queda, a menos que caia de uma grande altura. Adicione um dado aos testes de Destreza para equilíbrio." },
            "rapidReflexes": { "name": "Reflexos Rápidos", "description": "Perceba o mundo em câmera lenta.", "system": "Passivo. Sem penalidade para ações menores." },
            "fleetness": { "name": "Agilidade", "description": "Mova-se com velocidade incrível em rajadas curtas.", "system": "Por um turno, você pode realizar uma ação de movimento extra." },
            "blink": { "name": "Piscar", "description": "Mova-se tão rápido que parece desaparecer e reaparecer a uma curta distância.", "system": "Adicione sua pontuação de Rapidez em dados à sua parada de defesa contra um ataque." },
            "traversal": { "name": "Travessia", "description": "Corra por paredes ou sobre a água por um curto período.", "system": "Gaste uma Verificação de Excitação para ignorar superfícies verticais ou líquidos por um turno." },
            "draughtOfElegance": { "name": "Dose de Elegância", "description": "Compartilhe Rapidez via sangue.", "system": "Custo: Um Teste de Sangue." },
            "unerringAim": { "name": "Mira Infalível", "description": "Mira sobrenatural com armas.", "system": "Custo: Um Teste de Sangue. Ação de mirar é instantânea." },
            "lightningStrike": { "name": "Golpe Relâmpago", "description": "Mova-se tão rápido que pode atacar múltiplos inimigos quase simultaneamente.", "system": "Você pode dividir sua parada de dados de ataque para fazer ataques extras contra alvos diferentes." },
            "splitSecond": { "name": "Fração de Segundo", "description": "Interrompa ações.", "system": "Custo: Um Teste de Sangue. Refaça últimos segundos." }
        }
    },
    "dominate": {
        "name": "Dominação",
        "description": "O poder de comandar e controlar as mentes dos outros através do contato visual direto.",
        "powers": {
            "cloudMemory": { "name": "Nublar Memória", "description": "Faça um alvo esquecer alguns momentos do tempo.", "system": "Role Carisma + Dominação vs Raciocínio + Determinação. O sucesso faz o alvo esquecer os últimos minutos." },
            "compel": { "name": "Compelir", "description": "Comando de ação única.", "system": "Car + Dominação vs Int + Determinação." },
            "mesmerize": { "name": "Hipnotizar", "description": "Implante um único comando convincente na mente de um alvo.", "system": "Dê um comando de um verbo ('Vá', 'Pare', 'Caia'). Role Carisma + Dominação vs Raciocínio + Determinação." },
            "dementation": { "name": "Demência", "description": "Incita loucura.", "system": "Manip + Dominação vs Autocontrole + Int." },
            "theForgetfulMind": { "name": "A Mente Esquecida", "description": "Reescreva as memórias de um alvo de uma cena inteira.", "system": "Role Manipulação + Dominação vs Inteligência + Determinação. Você pode alterar ou criar memórias." },
            "submergedDirective": { "name": "Diretiva Submersa", "description": "Implante um comando que será acionado por um evento ou palavra-chave específica.", "system": "Como Hipnotizar, mas o comando permanece dormente até que um gatilho que você define ocorra." },
            "rationalize": { "name": "Racionalizar", "description": "Vítimas acreditam que ações foram ideia delas.", "system": "Passivo." },
            "massManipulation": { "name": "Manipulação em Massa", "description": "Domine grupos.", "system": "Custo: Um Teste de Sangue." },
            "terminalDecree": { "name": "Decreto Terminal", "description": "Dê um comando tão poderoso que pode forçar o alvo a agir contra sua natureza, até mesmo de forma autodestrutiva.", "system": "Role Carisma + Dominação vs Determinação + Humanidade. Isso pode forçar ações que levam à morte do alvo." }
        }
    },
    "fortitude": {
        "name": "Fortitude",
        "description": "Resistência e resiliência sobrenaturais, permitindo a um vampiro ignorar ferimentos que matariam um mortal.",
        "powers": {
            "resilience": { "name": "Resiliência", "description": "Sua pele se torna anormalmente resistente.", "system": "Adicione um dado às suas rolagens de absorção de Vigor contra dano superficial." },
            "unswayableMind": { "name": "Mente Inabalável", "description": "Resista à manipulação mental e emocional.", "system": "Adicione sua pontuação de Fortitude à sua parada de defesa contra poderes que afetam sua mente ou emoções." },
            "toughness": { "name": "Dureza", "description": "Subtraia dano superficial.", "system": "Subtraia nível de dano superficial recebido." },
            "defyBane": { "name": "Desafiar Perdição", "description": "Resista às perdições da existência vampírica, como luz solar e fogo.", "system": "Adicione sua pontuação de Fortitude à sua parada de absorção contra luz solar e fogo." },
            "fortifyTheInnerFacade": { "name": "Fortificar a Fachada Interior", "description": "Esconda pensamentos/aura.", "system": "Passivo. Contesta leitores com Fortitude." },
            "draughtOfEndurance": { "name": "Dose de Resistência", "description": "Seu sangue pode imbuir outros com sua resiliência.", "system": "Um mortal que beber seu sangue ganha sua pontuação de Fortitude em seus níveis de vitalidade por uma cena." },
            "fleshOfMarble": { "name": "Carne de Mármore", "description": "Torne-se quase imune a danos por um curto período.", "system": "Reduza pela metade todo o dano recebido (arredondado para baixo) por uma cena." },
            "prowessFromPain": { "name": "Proeza da Dor", "description": "Ganhe bônus quando ferido.", "system": "Passivo. Adicione dano recebido a paradas físicas." }
        }
    },
    "obfuscate": {
        "name": "Ofuscação",
        "description": "A habilidade de permanecer invisível e inaudível, seja se escondendo à vista de todos ou nublando as mentes dos outros.",
        "powers": {
            "cloakOfShadows": { "name": "Manto de Sombras", "description": "Torne-se invisível enquanto permanecer imóvel e na sombra.", "system": "Você não pode ser visto a menos que um observador tenha Auspícios ou esteja procurando ativamente por você." },
            "silenceOfDeath": { "name": "Silêncio da Morte", "description": "Silencie todo ruído de movimento.", "system": "Sem custo." },
            "unseenPassage": { "name": "Passagem Oculta", "description": "Mova-se sem ser visto, desde que não chame a atenção para si mesmo.", "system": "Role Raciocínio + Ofuscação. O sucesso permite que você se mova despercebido por uma cena." },
            "ghostInTheMachine": { "name": "Fantasma na Máquina", "description": "Efeito se estende a gravações eletrônicas.", "system": "Passivo." },
            "maskOfAThousandFaces": { "name": "Máscara de Mil Faces", "description": "Crie uma ilusão convincente para mudar sua aparência.", "system": "Role Manipulação + Ofuscação. Você pode parecer uma pessoa diferente, embora isso não resista a uma inspeção física." },
            "vanish": { "name": "Desvanecer", "description": "Desapareça da vista em um instante, mesmo enquanto está sendo observado.", "system": "Role Raciocínio + Ofuscação. Se você tiver sucesso, você desaparece da vista." },
            "cloakTheGathering": { "name": "Ocultar o Grupo", "description": "Estenda sua invisibilidade para um grupo de pessoas.", "system": "Você pode esconder um número de pessoas igual à sua pontuação de Ofuscação." },
            "impostorsGuise": { "name": "Disfarce do Impostor", "description": "Imite perfeitamente uma pessoa específica.", "system": "Custo: Um Teste de Sangue. Manip + Performance." }
        }
    },
    "potence": {
        "name": "Potência",
        "description": "A Disciplina da força sobrenatural, muito além dos limites mortais.",
        "powers": {
            "lethalBody": { "name": "Corpo Letal", "description": "Seus ataques desarmados são tão mortais quanto armas.", "system": "Seus ataques desarmados causam dano Agravado a mortais." },
            "soaringLeap": { "name": "Salto Planado", "description": "Salte grandes distâncias.", "system": "Sem custo." },
            "prowess": { "name": "Proeza", "description": "Realize feitos incríveis de força.", "system": "Adicione sua pontuação de Potência como dados de bônus em todos os testes baseados em Força." },
            "brutalFeed": { "name": "Alimentação Brutal", "description": "Drene sangue de uma vítima com força chocante e mortal.", "system": "Ao agarrar, você pode infligir dano Agravado e drenar sangue no mesmo turno." },
            "sparkOfRage": { "name": "Centelha de Fúria", "description": "Cause frenesi em outros.", "system": "Manip + Presença vs Autocontrole + Determinação." },
            "draughtOfMight": { "name": "Dose de Poder", "description": "Compartilhe Potência via sangue.", "system": "Custo: Um Teste de Sangue." },
            "earthshock": { "name": "Terremoto", "description": "Ataque de área no solo.", "system": "Custo: Um Teste de Sangue. Derruba inimigos próximos." },
            "fistOfCaine": { "name": "Punho de Caim", "description": "Canalize sua força em um único golpe devastador.", "system": "Faça um único ataque desarmado que causa dano Agravado massivo." }
        }
    },
    "presence": {
        "name": "Presença",
        "description": "O poder de atrair, influenciar e aterrorizar os outros com seu carisma sobrenatural.",
        "powers": {
            "awe": { "name": "Temor", "description": "Faça com que aqueles ao seu redor o admirem e se sintam atraídos por você.", "system": "Adicione sua pontuação de Presença a quaisquer testes sociais baseados em Carisma." },
            "daunt": { "name": "Intimidar", "description": "Intimide com uma aura.", "system": "Adicione nível a Intimidação. Passivo." },
            "lingeringKiss": { "name": "Beijo Persistente", "description": "Vício no Beijo.", "system": "Vítima ganha bônus em rolagens para te ajudar." },
            "dreadGaze": { "name": "Olhar Aterrador", "description": "Instile terror em um único alvo com apenas um olhar.", "system": "Role Carisma + Presença vs Autocontrole + Determinação. O sucesso força o alvo a fugir em terror." },
            "entrancement": { "name": "Transe", "description": "Deixe uma única pessoa completamente apaixonada por você por um curto período.", "system": "Role Manipulação + Presença. O alvo fará qualquer coisa não prejudicial para agradá-lo por uma cena." },
            "irresistibleVoice": { "name": "Voz Irresistível", "description": "Domine usando apenas a voz.", "system": "Passivo." },
            "summon": { "name": "Convocar", "description": "Compele alguém que você já conheceu a vir até você.", "system": "Role Carisma + Presença. O alvo sente um desejo avassalador de viajar para sua localização." },
            "majesty": { "name": "Majestade", "description": "Irradie uma aura de autoridade absoluta que ninguém ousa desafiar.", "system": "Por uma cena, ninguém pode agir hostilmente contra você, a menos que você ataque primeiro. Resistir requer um gasto significativo de Força de Vontade." },
            "starMagnetism": { "name": "Magnetismo Estelar", "description": "Temor afeta a todos continuamente.", "system": "Custo: Um Teste de Sangue." }
        }
    },
    "protean": {
        "name": "Metamorfose",
        "description": "A Disciplina da mudança de forma, permitindo a um vampiro alterar sua forma e se fundir com a terra.",
        "powers": {
            "eyesOfTheBeast": { "name": "Olhos da Besta", "description": "Seus olhos brilham em vermelho no escuro, permitindo que você veja perfeitamente na escuridão total.", "system": "Você pode ver na escuridão completa. Isso pode ser intimidador." },
            "weightOfTheFeather": { "name": "Peso da Pena", "description": "Flutuar e imunidade a dano de queda.", "system": "Sem custo." },
            "feralWeapons": { "name": "Armas Selvagens", "description": "Cresça garras viciosas que podem rasgar carne e metal.", "system": "Seus ataques desarmados causam dano Agravado." },
            "earthMeld": { "name": "Fusão com a Terra", "description": "Mergulhe na terra para descansar, protegido da luz solar.", "system": "Você pode mergulhar em solo natural e permanecer lá, dormente, até o próximo pôr do sol." },
            "shapechange": { "name": "Mudança de Forma", "description": "Transforme-se na forma de um animal, como um lobo ou um morcego.", "system": "Role Vigor + Metamorfose. Você pode se transformar em uma única forma animal escolhida." },
            "metamorphosis": { "name": "Metamorfose", "description": "Torne-se um animal maior/menor.", "system": "Custo: Um Teste de Sangue." },
            "mistForm": { "name": "Forma de Névoa", "description": "Transforme seu corpo em uma nuvem de névoa, capaz de passar por frestas e ignorar danos físicos.", "system": "Você se torna incorpóreo e imune à maioria dos ataques físicos." },
            "theUnfetteredHeart": { "name": "O Coração Livre", "description": "Órgãos internos são maleáveis.", "system": "Mais difícil de estacar." }
        }
    },
    "bloodsorcery": {
        "name": "Feitiçaria de Sangue",
        "description": "A prática esotérica de usar Vitae para alimentar rituais e lançar feitiços.",
        "powers": {
            "corrosiveVitae": { "name": "Vitae Corrosiva", "description": "Torne uma gota do seu sangue ácida e corrosiva.", "system": "Uma gota do seu sangue pode corroer material não-vivo." },
            "aTasteForBlood": { "name": "Um Gosto por Sangue", "description": "Aprenda segredos profundos de uma única gota do sangue de outro.", "system": "Ao provar o sangue, você pode aprender a geração do alvo, clã (se houver), e se ele está sob um laço de sangue." },
            "extinguishVitae": { "name": "Extinguir Vitae", "description": "Faça o sangue de outro vampiro se tornar inerte e inútil.", "system": "Role Inteligência + Feitiçaria de Sangue. O sucesso força o alvo a gastar mais sangue para usar seus poderes." },
            "bloodOfPotency": { "name": "Sangue de Potência", "description": "Aumente Potência do Sangue.", "system": "Custo: Um Teste de Sangue." },
            "scorpionsTouch": { "name": "Toque do Escorpião", "description": "Transforme seu próprio sangue em um veneno potente.", "system": "Seu toque se torna tóxico, causando dano Agravado a mortais e vampiros." },
            "theftOfVitae": { "name": "Roubo de Vitae", "description": "Roube sangue à distância.", "system": "Custo: Um Teste de Sangue." },
            "baalsCaress": { "name": "Carícia de Baal", "description": "Ferva o sangue de uma vítima em suas veias à distância.", "system": "Role Inteligência + Feitiçaria de Sangue vs Vigor + Determinação. Causa dano Agravado massivo ao alvo." },
            "cauldronOfBlood": { "name": "Caldeirão de Sangue", "description": "Ferver sangue na vítima.", "system": "Custo: Um Teste de Sangue." }
        }
    },
    "oblivion": {
        "name": "Olvido",
        "description": "Comando sobre as sombras e as energias do submundo.",
        "powers": {
             "shadowCloak": { "name": "Manto de Sombras", "description": "Aprofunde as sombras ambientes ao seu redor, auxiliando a furtividade.", "system": "Adicione um dado aos testes de Furtividade em áreas com pelo menos alguma sombra." },
             "oblivionsSight": { "name": "Visão do Olvido", "description": "Veja no escuro/fantasmas.", "system": "Custo: Um Teste de Sangue." },
             "armsOfAhriman": { "name": "Braços de Ahriman", "description": "Convoque tentáculos de sombra para agarrar e atacar seus inimigos.", "system": "Role Destreza + Olvido para fazer um ataque com tentáculos de sombra." },
             "shadowCast": { "name": "Projeção Sombria", "description": "Projete sombras.", "system": "Sem custo." },
             "touchOfOblivion": { "name": "Toque do Olvido", "description": "Murchar via toque.", "system": "Custo: Um Teste de Sangue." },
             "stygianShroud": { "name": "Mortalha Estígia", "description": "Crie uma nuvem de escuridão sobrenatural que cega e ensurdece.", "system": "Role Determinação + Olvido. O sucesso cria uma zona de privação sensorial." },
             "tenebrousAvatar": { "name": "Avatar Tenebroso", "description": "Transforme-se em um ser monstruoso de pura sombra.", "system": "Você se torna uma criatura sombria aterrorizante, ganhando bônus de combate e a habilidade de voar." }
        }
    },
    "thinbloodalchemy": {
        "name": "Alquimia de Sangue-Fraco",
        "description": "A prática improvisada e muitas vezes instável de criar pseudo-Disciplinas a partir de vitae.",
        "powers": {
             "farReach": { "name": "Longo Alcance", "description": "Telecinese.", "system": "Custo: Um Teste de Sangue." }
        }
    }
  }
};

type Locale = 'en' | 'pt';
type Translations = typeof en;

const translations: Record<Locale, Translations> = { en, pt };

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, replacements?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const getInitialLocale = (): Locale => {
  if (typeof window !== 'undefined' && window.navigator) {
    // Check for languages like 'pt', 'pt-BR', 'pt-PT'
    const browserLang = window.navigator.language.toLowerCase();
    if (browserLang.startsWith('pt')) {
      return 'pt';
    }
  }
  return 'en';
};

const getNestedTranslation = (obj: any, key: string): string | undefined => {
  return key.split('.').reduce((o, i) => (o ? o[i] : undefined), obj);
};

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>(getInitialLocale());

  const t = useCallback((key: string, replacements?: Record<string, string | number>): string => {
    let translation = getNestedTranslation(translations[locale], key) || getNestedTranslation(translations['en'], key) || key;

    if (replacements) {
        Object.keys(replacements).forEach(rKey => {
            translation = translation.replace(`{{${rKey}}}`, String(replacements[rKey]));
        });
    }
    
    return translation;
  }, [locale]);

  const value = useMemo(() => ({
    locale,
    setLocale,
    t
  }), [locale, t]);

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};