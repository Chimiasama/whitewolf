
import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

// Inlined translations to ensure consistency and avoid module resolution issues
const oEn = {
  "app": {
    "title": "World of Darkness Creator",
    "subtitle": "Bring your character to life in the World of Darkness",
    "vampire": "Vampire: The Masquerade",
    "werewolf": "Werewolf: The Apocalypse"
  },
  "buttons": {
    "next": "Next",
    "back": "Back",
    "jumpToSheet": "Jump to Sheet",
    "close": "Close",
    "expandAll": "Expand All",
    "collapseAll": "Collapse All",
    "save": "Save",
    "activate": "Activate",
    "load": "Load",
    "export": "Export JSON",
    "import": "Import JSON",
    "reset": "Reset",
    "add": "Add",
    "cancel": "Cancel",
    "confirm": "Confirm",
    "delete": "Delete",
    "print": "Print Sheet",
    "backToGameSelection": "Back to Game Selection"
  },
  "storage": {
    "title": "Character Storage",
    "saveMode": "Save Character",
    "loadMode": "Load Character",
    "enterName": "Character Name",
    "savedCharacters": "Saved Characters",
    "noSaves": "No saved characters found.",
    "overwriteWarning": "Character with this name already exists. Overwrite?",
    "deleteConfirm": "Are you sure you want to delete this character?",
    "saveSuccess": "Character saved successfully.",
    "saveError": "Failed to save character.",
    "loadSuccess": "Character loaded successfully.",
    "loadError": "Failed to load character.",
    "deleteSuccess": "Character '{{name}}' deleted.",
    "importSuccess": "Character imported from JSON.",
    "importError": "Invalid JSON file.",
    "namePlaceholder": "My Character"
  },
  "gameSelection": {
    "title": "Select Your Fate",
    "subtitle": "Choose the chronicle you wish to embark upon.",
    "vampireDesc": "The Beast within rages. Survive the night in the World of Darkness.",
    "werewolfDesc": "When will you Rage? Fight the Wyrm and save Gaia."
  },
  "steps": {
    "gameSelectionStep": "Game",
    "concept": "Concept",
    "clan": "Clan",
    "tribe": "Tribe",
    "auspice": "Auspice",
    "attributes": "Attributes",
    "skills": "Skills",
    "finishingTouches": "Finishing Touches",
    "sheet": "Final Character Sheet",
    "creationMethod": "Creation Method"
  },
  "xpLevels": {
    "fledgling": {
      "vampire": "Fledgling",
      "werewolf": "Pup"
    },
    "neonate": {
      "vampire": "Neonate",
      "werewolf": "Cliath"
    },
    "ancilla": {
      "vampire": "Ancilla",
      "werewolf": "Adren"
    }
  },
  "creationMethod": {
    "title": "Creation Method",
    "subtitle": "How do you want to build your character?",
    "manual": "Manual Creation",
    "manualDesc": "Choose every detail of your character step by step.",
    "random": "Random Generation",
    "randomDesc": "Let the fates decide. Generate a complete character instantly.",
    "randomLevel": "Random {{level}}",
    "randomFledglingDesc": {
      "vampire": "0 XP • 13th Gen",
      "werewolf": "0 XP"
    },
    "randomNeonateDesc": {
      "vampire": "15 XP • 12th Gen",
      "werewolf": "15 XP"
    },
    "randomAncillaDesc": {
      "vampire": "35 XP • 11th Gen",
      "werewolf": "35 XP"
    }
  },
  "summary": {
    "title": "Character Summary & Progress",
    "readySubtitle": "All basic fields are filled. You can view your character sheet below.",
    "incompleteSubtitle": "Please complete the following sections to finalize your character.",
    "missing_concept": "Name, Concept, Ambition, or Desire missing.",
    "missing_clan": "Clan not selected.",
    "error_attributes": "Attributes must sum to 22.",
    "error_skills": "Skills distribution must follow one of the three paths.",
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
    "none": "None",
    "notDefined": "Not defined",
    "keyAttributes": "Key Attributes",
    "keySkills": "Key Skills",
    "noClanSelected": "No clan selected.",
    "selectClanToSeeDetails": "Select a Clan to see details",
    "selectTribeToSeeDetails": "Select a Tribe to see details",
    "selectAuspiceToSeeDetails": "Select an Auspice to see details",
    "noneListed": "None listed.",
    "skill": "Skill",
    "available": "Available",
    "assigned": "Assigned",
    "clear": "Clear",
    "value": "Value",
    "poolDistribution": "Point Pool",
    "poolLegend": "Bright orbs are available. Dark orbs are already assigned.",
    "managePowers": "Manage Powers",
    "paintMode": "Painting {{value}}",
    "paintInstruction": "Click on attributes or skills to assign the active value.",
    "confirm": "Confirm",
    "randomIdentity": "Random Identity",
    "specialty": "Specialty",
    "specialtyPlaceholder": "ex: Parkour",
    "resetWarning": "Are you sure you want to reset all character data? This cannot be undone.",
    "resetSuccess": "Character reset to default.",
    "generateSuccess": "Character generated successfully!"
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
    "portraitPlaceholder": "Upload Photo",
    "changePortrait": "Change Photo"
  },
  "clan": {
    "title": "Choose your Bloodline"
  },
  "clans": {
    "brujah": {
      "name": "Brujah",
      "description": "Rebels and rabble-rousers who fight for their passionate beliefs.",
      "bane": "Their tempers are hair-triggers. Resisting a frenzy is harder.",
      "compulsion": "Rebellion. The vampire must act against someone in a position of authority or a currently held belief."
    },
    "gangrel": {
      "name": "Gangrel",
      "description": "Nomads and survivors, intimately tied to their animalistic nature.",
      "bane": "They gain animal features when they frenzy.",
      "compulsion": "Feral Impulses. The vampire regresses to an animalistic state, unable to speak and acting on instinct."
    },
    "malkavian": {
      "name": "Malkavian",
      "description": "Seers and lunatics cursed with insight that shatters the mind.",
      "bane": "They are afflicted with a permanent derangement.",
      "compulsion": "Delusion. The vampire's derangement becomes the absolute truth, affecting their perception of reality."
    },
    "nosferatu": {
      "name": "Nosferatu",
      "description": "Hideously deformed outcasts who traffic in secrets from the shadows.",
      "bane": "They are monstrously ugly and can never pass as human.",
      "compulsion": "Cryptophilia. The vampire becomes obsessed with a secret, willing to do anything to learn more about it."
    },
    "toreador": {
      "name": "Toreador",
      "description": "Artists and visionaries, obsessed with beauty in all its forms.",
      "bane": "They become obsessed with beauty, making it hard to act in beautiful surroundings.",
      "compulsion": "Aesthetic Fixation. The vampire becomes captivated by a thing of beauty, unable to act until they've spent time appreciating it."
    },
    "tremere": {
      "name": "Tremere",
      "description": "Warlocks and occultists who wield the power of blood sorcery.",
      "bane": "Their blood makes them more easily bound by other vampires.",
      "compulsion": "Perfectionism. The vampire becomes obsessed with a task, repeating it until it is perfect."
    },
    "ventrue": {
      "name": "Ventrue",
      "description": "The ruling clan of aristocrats, executives, and kings.",
      "bane": "They have a specific and rare feeding preference.",
      "compulsion": "Arrogance. The vampire must assert their authority and will not accept being denied."
    },
    "banuhaqim": {
      "name": "Banu Haqim",
      "description": "Judges and assassins who hunt other vampires and follow a strict code of law.",
      "bane": "They are compelled to feed on the blood of other vampires.",
      "compulsion": "Judgment. The vampire must punish someone who has transgressed a code they hold."
    },
    "theministry": {
      "name": "The Ministry",
      "description": "Corrupters and libertadores who use vice and temptation as their primary tools.",
      "bane": "They are vulnerable to bright lights.",
      "compulsion": "Transgression. The vampire must lead someone to act on their darkest desires."
    },
    "lasombra": {
      "name": "Lasombra",
      "description": "Ambitious and ruthless social Darwinists who command the power of shadow.",
      "bane": "They have no reflection, and technology often glitches in their presence.",
      "compulsion": "Ambition. The vampire must prove their superiority and will not tolerate failure."
    },
    "ravnos": {
      "name": "Ravnos",
      "description": "Masters of misdirection, the Tricksters prefer not to fight for something they can obtain by more subtle methods.",
      "bane": "The fire of their Blood consumes them if they settle for too long. If they sleep in the same place more than once in seven nights, they suffer aggravated damage.",
      "compulsion": "Tempting Fate. The vampire is driven to court danger. Any solution that is not the most audacious or dangerous suffers a penalty."
    },
    "salubri": {
      "name": "Salubri",
      "description": "Renowned for their wisdom and erudition, the Salubri are now little more than a despised footnote. Every Salubri bears a third eye on their forehead.",
      "bane": "They are hunted, and their Vitae is particularly addictive to other vampires. Their third eye always weeps blood whenever they use a Discipline power.",
      "compulsion": "Affective Empathy. The vampire is seized by empathy for a personal problem afflicting someone and seeks to help resolve it."
    },
    "tzimisce": {
      "name": "Tzimisce",
      "description": "For the Tzimisce, possession is everything. They seek to conquer and dominate the object of their possessiveness, guarding it with jealousy.",
      "bane": "They are rooted to a specific possession (a domain, a group of people, etc.). They must sleep surrounded by this possession, or suffer willpower damage.",
      "compulsion": "Covetousness. The vampire becomes obsessed with possessing something or someone in the scene."
    },
    "caitiff": {
      "name": "Caitiff",
      "description": "Clanless vampires, outsiders with no lineage to call their own.",
      "bane": "They are shunned by vampiric society and must pay more for certain social merits.",
      "compulsion": "Rootlessness. The vampire feels a desperate need to belong, trying to fit in with any group."
    },
    "thinblood": {
      "name": "Thin-Blood",
      "description": "Weak-blooded vampires of the 14th generation or higher, barely a true vampire.",
      "bane": "They are weak and suffer various debilitating conditions.",
      "compulsion": "Insularity. The vampire becomes focused on their own problems, ignoring the needs of others."
    }
  },
  "lore": {
    "concept": "The Embrace is not a gift. It is a violent violation of the self. Who were you before the darkness took you?",
    "intro": "The Blood is the Life... and it is the Curse.",
    "attributes": "We are stronger, faster, and more resilient than the kine, but the Beast lurks in every surge of power.",
    "skills": "Immortality offers the time to master all arts, yet we squander eternity on the struggle for survival.",
    "finishing": "We are defined not just by our lineage, but by how we survive the endless night and whom we prey upon."
  },
  "attributes": {
    "title": "Distribute Attributes",
    "subtitle": "Assign values from the Point Pool to your attributes.",
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
    "subtitle": "Click on Skills to assign values from the point pool.",
    "paths": {
      "title": "Skill Path",
      "detected": "Detected Path: {{path}}",
      "none": "No valid path detected",
      "multiple": "Valid Paths: {{paths}}",
      "jackOfAllTrades": "Jack of all Trades",
      "balanced": "Balanced",
      "specialist": "Specialist"
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
    }
  },
  "finishingTouches": {
    "title": "Finishing Touches",
    "disciplines": {
      "title": "Disciplines",
      "subtitle": "Select Discipline dots and manage their associated powers.",
      "selectPowers": "Select Powers",
      "powersSelected": "{{count}}/{{total}} Selected"
    },
    "gifts": {
      "subtitle": "Choose your starting Gifts from your Tribe and Auspice. Allocate 3 dots total."
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
    "touchstonesPlaceholder": "Describe your character's touchstones and convictions..."
  },
  "characterSheet": {
    "name": "Name",
    "clan": "Clan",
    "sire": "Sire",
    "mentor": "Mentor",
    "concept": "Concept",
    "ambition": "Ambition",
    "desire": "Desire",
    "clanBane": "Clan Bane",
    "clanCompulsion": "Clan Compulsion",
    "predatorType": "Predator Type",
    "generation": "Generation",
    "bloodPotency": "Blood Potency",
    "attributes": {
      "physical": "Physical Attributes",
      "social": "Social Attributes",
      "mental": "Mental Attributes"
    },
    "skills": {
      "physical": "Physical Skills",
      "social": "Social Skills",
      "mental": "Mental Skills"
    },
    "disciplines": "Disciplines",
    "gifts": "Gifts",
    "vitals": "Vitals",
    "hunger": "Hunger",
    "humanity": "Humanity",
    "willpower": "Willpower",
    "health": "Health",
    "rage": "Rage",
    "renown": "Renown",
    "glory": "Glory",
    "honor": "Honor",
    "wisdom": "Wisdom",
    "gloryCredo": "I shall be valorous, dependable, generous, protect the weak, and exterminate the Wyrm.",
    "honorCredo": "I shall be respectful, loyal, just, keep my word, and accept all fair challenges.",
    "wisdomCredo": "I shall learn, ponder, be prudent, be merciful, think before acting, and listen before thinking.",
    "harano": "Harano",
    "hauglosk": "Hauglosk",
    "haranoDesc": "Despair and giving up on Gaia.",
    "haugloskDesc": "Fanaticism and loss of compassion.",
    "desperateRage": "Desperate Rage",
    "desperateRageDesc": "Fill a square of Harano to raise your Rage to 5. Once per session.",
    "unrelentingWillpower": "Unrelenting Willpower",
    "unrelentingWillpowerDesc": "Fill a square of Hauglosk to heal all Willpower damage. Once per session.",
    "vexame": "Shame",
    "vexameDesc": "Temporary reduction in Renown for violating credos.",
    "tribeBane": "Tribe Bane",
    "rituals": "Rituals",
    "talismans": "Talismans",
    "specialAbilities": "Special Abilities",
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
    "errorBackstory": "Failed to generate backstory.",
    "errorPlotHook": "Failed to generate plot hooks.",
    "errorPortrait": "Failed to generate portrait description.",
    "backstoryPrompt": "Write a dark backstory (3-4 paragraphs).",
    "plotHookPrompt": "Generate three distinct plot hooks.",
    "portraitPrompt": "Provide a vivid description of the appearance."
  },
  "compendium": {
    "level": "Level",
    "lvl": "Lvl",
    "print": "Print",
    "system": "System",
    "dots": "dots",
    "passive": "Passive",
    "noCost": "No cost",
    "cost": "Cost",
    "requirements": "Requirements",
    "dotsIncluded": "dots included",
    "dotsPenalty": "dots penalty",
    "advantage": "Advantage",
    "flaw": "Flaw",
    "predator": "Predator",
    "grantedBenefits": "Granted Benefits",
    "potentialCosts": "Potential Costs",
    "favor": "Favor",
    "bane": "Bane",
    "rouseCheck": "Rouse Check",
    "oneRouseCheck": "1 Rouse Check"
  },
  "predatorTypes": {
    "alleycat": {
      "name": "Alleycat",
      "description": "You hunt via ambush and physical violence on the streets."
    },
    "bagger": {
      "name": "Bagger",
      "description": "You obtain blood from cold storage or crime scenes."
    },
    "consensualist": {
      "name": "Consensualist",
      "description": "You only feed from those who explicitly permit it."
    },
    "farmer": {
      "name": "Farmer",
      "description": "You refuse to feed on humans, subsisting only on animals."
    },
    "osiris": {
      "name": "Osiris",
      "description": "You lead a cult or social circle that offers their blood freely."
    },
    "sandman": {
      "name": "Sandman",
      "description": "You feed on victims while they sleep."
    },
    "siren": {
      "name": "Siren",
      "description": "You use seduction and beauty to charm your prey."
    },
    "noAdvantages": "No static advantages granted.",
    "noFlaws": "No static flaws required.",
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
  "disciplines": {
    "animalism": {
      "name": "Animalism",
      "description": "The ability to communicate with and control animals.",
      "powers": {
        "bondFamulus": {
          "name": "Bond Famulus",
          "description": "Form a mystical bond with an animal companion.",
          "system": "No cost. Bond takes one scene."
        },
        "senseTheBeast": {
          "name": "Sense the Beast",
          "description": "Detect the presence of the Beast in others.",
          "system": "Resolve + Animalism vs Composure + Subterfuge."
        },
        "feralWhispers": {
          "name": "Feral Whispers",
          "description": "Communicate and issue simple commands to animals.",
          "system": "Charisma + Animal Ken. Cost: One Rouse Check."
        },
        "feralFrenzy": {
          "name": "Feral Frenzy",
          "description": "Incite frenzy in nearby animals.",
          "system": "Manipulation + Animalism vs Difficulty. Cost: One Rouse Check."
        },
        "huntTheBeast": {
          "name": "Hunt the Beast",
          "description": "Track a target by the scent of their Beast.",
          "system": "Resolve + Animalism vs Composure + Subterfuge. Cost: One Rouse Check."
        },
        "animalSucculence": {
          "name": "Animal Succulence",
          "description": "Draw more nourishment from animal blood.",
          "system": "Passive. Animal blood slakes 1 additional Hunger."
        },
        "quellTheBeast": {
          "name": "Quell the Beast",
          "description": "Intimidate and calm the Beast in others.",
          "system": "Charisma + Animalism vs Resolve + Composure."
        },
        "unlivingHive": {
          "name": "Unliving Hive",
          "description": "Extend Animalism powers to swarms of insects.",
          "system": "Passive. Allows insects as famuli."
        },
        "howlOfRage": {
          "name": "Howl of Rage",
          "description": "As with Spark of Rage, but using Animalism.",
          "system": "Manipulation + Animalism. Cost: One Rouse Check."
        },
        "markPrey": {
          "name": "Mark Prey",
          "description": "Mark a target as prey for other vampires.",
          "system": "Charisma + Animalism vs Composure + Resolve. Cost: One Rouse Check."
        },
        "subsumeTheSpirit": {
          "name": "Subsume the Spirit",
          "description": "Possess the body of an animal companion.",
          "system": "Manipulation + Animalism. Cost: One Rouse Check."
        },
        "packFrenzy": {
          "name": "Pack Frenzy",
          "description": "Spread a frenzy among willing kindred.",
          "system": "Wits + Animalism. Cost: One Rouse Check."
        },
        "animalDominion": {
          "name": "Animal Dominion",
          "description": "Control an entire swarm or pack of animals.",
          "system": "Charisma + Animalism. Cost: One Rouse Check."
        },
        "drawingOutTheBeast": {
          "name": "Drawing out the Beast",
          "description": "Transfer your own frenzy into another target.",
          "system": "Wits + Animalism vs Composure + Resolve."
        },
        "subsumeTheServant": {
          "name": "Subsume the Servant",
          "description": "Transfer mind into a ghoul with your blood.",
          "system": "Manipulation + Animalism. Cost: Two Rouse Checks."
        }
      }
    },
    "auspex": {
      "name": "Auspex",
      "description": "Supernatural senses and extrasensory perception.",
      "powers": {
        "heightenedSenses": {
          "name": "Heightened Senses",
          "description": "Sharpen your mundane senses to superhuman levels.",
          "system": "No cost. Add level to perception tests."
        },
        "senseTheUnseen": {
          "name": "Sense the Unseen",
          "description": "Detect hidden supernatural entities or powers.",
          "system": "Wits + Auspex vs Obfuscate or difficulty."
        },
        "lieDetector": {
          "name": "Lie Detector",
          "description": "Know when you are being lied to.",
          "system": "Passive. Add level to Insight checks."
        },
        "readOpponent": {
          "name": "Read Opponent",
          "description": "Read intentions and subtle physical clues of opponents.",
          "system": "Wits + Auspex vs Strength + Subterfuge. Cost: One Rouse Check."
        },
        "premonition": {
          "name": "Premonition",
          "description": "Receive brief, cryptic flashes of the near future.",
          "system": "Resolve + Auspex. Cost: One Rouse Check (optional)."
        },
        "obeah": {
          "name": "Obeah",
          "description": "Calm an emotionally agitated target.",
          "system": "Autocontrole + Auspex vs Difficulty 2. Cost: One Rouse Check."
        },
        "decipher": {
          "name": "Decipher",
          "description": "Understand any language or code by reading intent.",
          "system": "Intelligence + Auspex. Cost: One Rouse Check."
        },
        "senseStrengthsAndWeaknesses": {
          "name": "Sense Strengths and Weaknesses",
          "description": "Appraise the aura for physical and mental traits.",
          "system": "Intelligence + Auspex vs Composure + Subterfuge. Cost: One Rouse Check."
        },
        "scryTheSoul": {
          "name": "Scry the Soul",
          "description": "Read the aura and emotions of a target.",
          "system": "Intelligence + Auspex vs Composure + Subterfuge."
        },
        "shareTheSenses": {
          "name": "Share the Senses",
          "description": "See and hear through the senses of another.",
          "system": "Resolve + Auspex. Cost: One Rouse Check."
        },
        "psychicBacklash": {
          "name": "Psychic Backlash",
          "description": "Cause mental backlash to those trying to control you.",
          "system": "Whenever defending against mental manipulation. Cost: One Rouse Check."
        },
        "scanTheRoom": {
          "name": "Scan the Room",
          "description": "Thorough investigation of a room in moments.",
          "system": "Wits + Investigation + level. Cost: One Rouse Check."
        },
        "spiritsTouch": {
          "name": "Spirit's Touch",
          "description": "Read psychic imprints left on objects.",
          "system": "Resolve + Auspex. Number of successes defines detail."
        },
        "clairvoyance": {
          "name": "Clairvoyance",
          "description": "Project your senses to a distant location.",
          "system": "Intelligence + Auspex. Cost: One Rouse Check."
        },
        "possession": {
          "name": "Possession",
          "description": "Take control of a mortal's body.",
          "system": "Resolve + Auspex vs Resolve + Intelligence. Cost: Two Rouse Checks."
        },
        "telepathy": {
          "name": "Telepathy",
          "description": "Read deep thoughts or project your voice into minds.",
          "system": "Resolve + Auspex vs Composure + Subterfuge. Cost: One Rouse Check."
        },
        "aliviandoAAlmaBestial": {
          "name": "Relieving the Bestial Soul",
          "description": "Share moral serenity with another Kindred.",
          "system": "Autocontrole + Auspícios vs Humanidade. Cost: Two Rouse Checks, 1 Stain."
        },
        "telekinesis": {
          "name": "Telekinesis",
          "description": "Move objects or people with your mind.",
          "system": "Resolve + Blood Sorcery vs Strength + Athletics. Cost: One Rouse Check."
        }
      }
    },
    "celerity": {
      "name": "Celerity",
      "description": "Supernatural speed, grace, and reflexes.",
      "powers": {
        "catsGrace": {
          "name": "Cat's Grace",
          "description": "Preternatural balance and grace.",
          "system": "Passive. Immune to falling damage from low heights."
        },
        "rapidReflexes": {
          "name": "Rapid Reflexes",
          "description": "The world slows down for you.",
          "system": "Passive. No penalty for taking a minor action."
        },
        "fleetness": {
          "name": "Fleetness",
          "description": "Move with blinding speed.",
          "system": "Add level to non-combat Dex tests. Cost: One Rouse Check."
        },
        "controlMomentum": {
          "name": "Control Momentum",
          "description": "Redirect an assailant's attack to another target.",
          "system": "Dexterity or Strength + Celerity vs Dex + Athletics. Cost: One Rouse Check."
        },
        "blink": {
          "name": "Blink",
          "description": "Move so fast you seem to vanish.",
          "system": "Move to a target instantly. Cost: One Rouse Check."
        },
        "traversal": {
          "name": "Traversal",
          "description": "Run across walls or liquids for short bursts.",
          "system": "Dexterity + Athletics. Cost: One Rouse Check."
        },
        "combatTempest": {
          "name": "Combat Tempest",
          "description": "Face multiple opponents without penalties.",
          "system": "Passive while active. Cost: One Rouse Check."
        },
        "speedIsPower": {
          "name": "Speed is Power",
          "description": "Add momentum to a single strength action.",
          "system": "Add half Celerity to Strength action. Cost: One Rouse Check."
        },
        "draughtOfElegance": {
          "name": "Draught of Elegance",
          "description": "Share your speed through your blood.",
          "system": "Consumer gains Celerity level 1. Cost: One Rouse Check."
        },
        "unerringAim": {
          "name": "Unerring Aim",
          "description": "Uncanny precision with ranged weapons.",
          "system": "The Aim action becomes instant. Cost: One Rouse Check."
        },
        "furiousFrenzy": {
          "name": "Furious Frenzy",
          "description": "Multiple actions per turn during Frenzy.",
          "system": "Two actions per turn. Any Crítico é Crítico Bestial. After frenzy, full Superficial damage. Cost: Free."
        },
        "longDistanceJourney": {
          "name": "Long Distance Journey",
          "description": "Maintain high speeds for longer travel.",
          "system": "Stamina + Celerity vs Difficulty 3. Cost: One Rouse Check."
        },
        "lightningStrike": {
          "name": "Lightning Strike",
          "description": "Attack faster than a target can react.",
          "system": "Target cannot defend unless supernatural. Cost: One Rouse Check."
        },
        "splitSecond": {
          "name": "Split Second",
          "description": "React to events that just happened.",
          "system": "Retcon the last few seconds of action. Cost: One Rouse Check."
        }
      }
    },
    "dominate": {
      "name": "Dominate",
      "description": "The power to control minds through eye contact.",
      "powers": {
        "cloudMemory": {
          "name": "Cloud Memory",
          "description": "Erase the last few minutes of memory.",
          "system": "Charisma + Dominate vs Wits + Resolve."
        },
        "compel": {
          "name": "Compel",
          "description": "Issue a single, immediate command.",
          "system": "Charisma + Dominate vs Intelligence + Resolve."
        },
        "mesmerize": {
          "name": "Mesmerize",
          "description": "Implant complex hypnotic suggestions.",
          "system": "Manipulation + Dominate vs Intelligence + Resolve."
        },
        "dementation": {
          "name": "Dementation",
          "description": "Shatter the sanity of a target.",
          "system": "Manipulation + Dominate vs Composure + Intelligence."
        },
        "favorDoDomitor": {
          "name": "Domitor's Favor",
          "description": "Make it harder for blood-bound servants to act against you.",
          "system": "Penalty to defiance rolls. Cost: One Rouse Check."
        },
        "declareWeakness": {
          "name": "Declare Weakness",
          "description": "Convince a target they are weak in an attribute.",
          "system": "Manipulation + Dominate vs Composure + Intelligence. Cost: One Rouse Check."
        },
        "implantDream": {
          "name": "Implant Dream",
          "description": "Implant a dream to be experienced when target sleeps.",
          "system": "Resolve + Dominate vs Composure + Intelligence. Cost: One Rouse Check."
        },
        "theForgetfulMind": {
          "name": "The Forgetful Mind",
          "description": "Permanently rewrite long-term memories.",
          "system": "Manipulation + Dominate vs Intelligence + Resolve."
        },
        "submergedDirective": {
          "name": "Submerged Directive",
          "description": "Commands are triggered by a keyword later.",
          "system": "Passive enhancement to Mesmerize."
        },
        "objectCommand": {
          "name": "Object Command",
          "description": "Imprint a mental command on an object.",
          "system": "Manipulation + Dominate vs Intelligence + Resolve. Cost: One Rouse Check."
        },
        "rationalize": {
          "name": "Rationalize",
          "description": "Victims believe your commands were their own ideas.",
          "system": "Passive enhancement."
        },
        "mentalConditioning": {
          "name": "Mental Conditioning",
          "description": "Break down mental barriers through repeated use.",
          "system": "Gain breaches in victim's mind. Cost: One Rouse Check."
        },
        "massManipulation": {
          "name": "Mass Manipulation",
          "description": "Dominate multiple targets simultaneously.",
          "system": "Use powers on groups. Cost: One Rouse Check."
        },
        "terminalDecree": {
          "name": "Terminal Decree",
          "description": "Command targets to harm themselves or die.",
          "system": "Overcomes self-preservation. Cost: No additional."
        },
        "energyVampire": {
          "name": "Energy Vampire",
          "description": "Leech mental energy through conversation.",
          "system": "Manipulation + Dominate vs Composure + Resolve. Cost: One Rouse Check."
        }
      }
    },
    "fortitude": {
      "name": "Fortitude",
      "description": "Supernatural physical and mental toughness.",
      "powers": {
        "resilience": {
          "name": "Resilience",
          "description": "Increase your physical health pool.",
          "system": "Passive. Add level to Health."
        },
        "unswayableMind": {
          "name": "Unswayable Mind",
          "description": "Resist all forms of mental manipulation.",
          "system": "Passive. Add level to resist dice pools."
        },
        "eternalVigilance": {
          "name": "Eternal Vigilance",
          "description": "Resist the effects of daytime slumber.",
          "system": "Passive. Add level to checks to stay awake."
        },
        "toughness": {
          "name": "Toughness",
          "description": "Subtract damage from incoming physical blows.",
          "system": "Subtract level from superficial damage. Cost: One Rouse Check."
        },
        "enduringBeasts": {
          "name": "Enduring Beasts",
          "description": "Share toughness with animals you influence.",
          "system": "Stamina + Animalism vs Difficulty 3. Cost: One Rouse Check."
        },
        "valeren": {
          "name": "Valeren",
          "description": "Heal another vampire's body.",
          "system": "Inteligência + Fortitude vs Difficulty 2. Cost: One Rouse Check."
        },
        "mentalVault": {
          "name": "Mental Vault",
          "description": "Store and protect important information for perfect recall.",
          "system": "Passive. Bonus to protect memories from mental powers."
        },
        "defyBane": {
          "name": "Defy Bane",
          "description": "Resist fire and sunlight for a short time.",
          "system": "Downgrade Aggravated to Superficial. Cost: One Rouse Check."
        },
        "fortifyTheInnerFacade": {
          "name": "Fortify the Inner Facade",
          "description": "Hide your thoughts and aura from Auspex.",
          "system": "Passive. Contest readers with Resolve + Fortitude."
        },
        "returnToSender": {
          "name": "Return to Sender",
          "description": "Violently eject foreign objects like stakes or bullets.",
          "system": "Stamina + Fortitude vs Dex + Athletics. Cost: One Rouse Check."
        },
        "sleepLikeStone": {
          "name": "Sleep like Stone",
          "description": "Fortify form while in torpor.",
          "system": "Passive. Treat all damage as superficial while in torpor."
        },
        "draughtOfEndurance": {
          "name": "Draught of Endurance",
          "description": "Share your resilience through your blood.",
          "system": "Consumer gains Fortitude level 1. Cost: One Rouse Check."
        },
        "fleshOfMarble": {
          "name": "Flesh of Marble",
          "description": "Become essentially invulnerable to harm for a moment.",
          "system": "Ignore first damage source per turn. Cost: One Rouse Check."
        },
        "prowessFromPain": {
          "name": "Prowess from Pain",
          "description": "Gain power as your body is broken.",
          "system": "Passive. Ignore wound penalties and gain physical bonuses."
        }
      }
    },
    "obfuscate": {
      "name": "Obfuscate",
      "description": "The power to vanish from sight and senses.",
      "powers": {
        "cloakOfShadows": {
          "name": "Cloak of Shadows",
          "description": "Become invisible while standing perfectly still.",
          "system": "No cost. Requires shadows or cover."
        },
        "silenceOfDeath": {
          "name": "Silence of Death",
          "description": "Silence all sound you make.",
          "system": "No cost. Zone of silence around user."
        },
        "unseenPassage": {
          "name": "Unseen Passage",
          "description": "Move while remaining invisible.",
          "system": "Wits + Obfuscate. Detection requires Auspex."
        },
        "chimerstry": {
          "name": "Chimerstry",
          "description": "Create brief but vivid hallucinations.",
          "system": "Manipulation + Obfuscate vs Composure + Wits. Cost: One Rouse Check."
        },
        "ghostInTheMachine": {
          "name": "Ghost in the Machine",
          "description": "Your powers work against cameras and mics.",
          "system": "Passive enhancement."
        },
        "maskOfAThousandFaces": {
          "name": "Mask of a Thousand Faces",
          "description": "Assume a different mundane appearance.",
          "system": "Manipulation + Performance. Cost: One Rouse Check."
        },
        "fataMorgana": {
          "name": "Fata Morgana",
          "description": "Create elaborate sensory hallucinations.",
          "system": "Manipulation + Obfuscate vs Difficulty. Cost: One Rouse Check."
        },
        "shapeAura": {
          "name": "Shape Aura",
          "description": "Mask your true essence and give false readings.",
          "system": "Manipulation + Obfuscate vs Composure + Awareness. Cost: One Rouse Check."
        },
        "duplicate": {
          "name": "Duplicate",
          "description": "Create a mirror duplicate that mirrors movements.",
          "system": "Composure + Obfuscate. Cost: One Rouse Check."
        },
        "conceal": {
          "name": "Conceal",
          "description": "Cloak an inanimate object.",
          "system": "Intelligence + Obfuscate vs Difficulty. Cost: One Rouse Check."
        },
        "vanish": {
          "name": "Vanish",
          "description": "Disappear instantly even while being watched.",
          "system": "Wits + Obfuscate vs Wits + Awareness. Cost: One Rouse Check."
        },
        "hiddenBlade": {
          "name": "Hidden Blade",
          "description": "Focus obfuscation on a single weapon.",
          "system": "Wits + Obfuscate vs Wits + Awareness. Cost: One Rouse Check."
        },
        "cloakTheGathering": {
          "name": "Cloak the Gathering",
          "description": "Extend your invisibility to a group.",
          "system": "Hide others with you. Cost: One Rouse Check."
        },
        "impostorsGuise": {
          "name": "Impostor's Guise",
          "description": "Perfectly mimic a specific person.",
          "system": "Manipulation + Performance. Cost: One Rouse Check."
        },
        "fadingMemory": {
          "name": "Fading Memory",
          "description": "Mask the very memory of your presence.",
          "system": "Resolve + Obfuscate vs Difficulty. Cost: One Rouse Check."
        },
        "mindPrison": {
          "name": "Mind Prison",
          "description": "Trap a person in a false dreamlike reality.",
          "system": "Resolve + Presence vs Intelligence + Resolve. Cost: Two Rouse Checks."
        }
      }
    },
    "potence": {
      "name": "Potence",
      "description": "Supernatural strength and destructive force.",
      "powers": {
        "lethalBody": {
          "name": "Lethal Body",
          "description": "Unarmed strikes become as deadly as weapons.",
          "system": "Passive. Do Aggravated damage to mortals."
        },
        "soaringLeap": {
          "name": "Soaring Leap",
          "description": "Jump incredible distances.",
          "system": "No cost. Increase jump distance significantly."
        },
        "prowess": {
          "name": "Prowess",
          "description": "Add more force to every strike.",
          "system": "Passive. Add level to Strength damage."
        },
        "brutalFeed": {
          "name": "Brutal Feed",
          "description": "Siphon blood with violent speed in combat.",
          "system": "Strength + Brawl. Slake Hunger instantly."
        },
        "sparkOfRage": {
          "name": "Spark of Rage",
          "description": "Ignite frenzy in those around you.",
          "system": "Manipulation + Presence. Cost: One Rouse Check."
        },
        "uncannyGrip": {
          "name": "Uncanny Grip",
          "description": "Burrow extremities into surfaces to climb.",
          "system": "Automatic success to climb. Cost: One Rouse Check."
        },
        "fastballSpecial": {
          "name": "Fastball Special",
          "description": "Throw allies or enemies into combat.",
          "system": "Strength + Potence. Cost: One Rouse Check."
        },
        "draughtOfMight": {
          "name": "Draught of Might",
          "description": "Share your strength through your blood.",
          "system": "Consumer gains Potence level 1. Cost: One Rouse Check."
        },
        "earthshock": {
          "name": "Earthshock",
          "description": "Strike the ground to create a shockwave.",
          "system": "Strength + Brawl. Knockdown nearby targets. Cost: One Rouse Check."
        },
        "fistOfCaine": {
          "name": "Fist of Caine",
          "description": "Project your strength into a distant physical blow.",
          "system": "Attack at range with melee pool. Cost: One Rouse Check."
        }
      }
    },
    "presence": {
      "name": "Presence",
      "description": "The power to sway emotions and command attention.",
      "powers": {
        "awe": {
          "name": "Awe",
          "description": "Attract and hold the attention of others.",
          "system": "Manipulation + Presence. No cost."
        },
        "daunt": {
          "name": "Daunt",
          "description": "Project an aura of terrifying menace.",
          "system": "Passive. Add level to Intimidation."
        },
        "lingeringKiss": {
          "name": "Lingering Kiss",
          "description": "Make your bite addictive to the victim.",
          "system": "Passive. Victim becomes obsessed with your Kiss."
        },
        "subtleMessages": {
          "name": "Subtle Messages",
          "description": "Subtly change the emotional state of a target.",
          "system": "Manipulation + Presence vs Composure + Wits. Cost: One Rouse Check."
        },
        "dreadGaze": {
          "name": "Dread Gaze",
          "description": "Instill overwhelming terror with a look.",
          "system": "Charisma + Presence vs Composure + Resolve."
        },
        "entrancement": {
          "name": "Entrancement",
          "description": "Make a target utterly infatuated with you.",
          "system": "Charisma + Presence vs Composure + Resolve. Cost: One Rouse Check."
        },
        "throneRoom": {
          "name": "Throne Room",
          "description": "Arrange a space to amplify influence.",
          "system": "Craft + Presence. Cost: One Rouse Check."
        },
        "obsession": {
          "name": "Obsession",
          "description": "Create a sense of obsession in a target towards a focus.",
          "system": "Manipulation + Presence vs Intelligence + Composure. Cost: One Rouse Check."
        },
        "irresistibleVoice": {
          "name": "Irresistible Voice",
          "description": "Use Presence powers through voice alone.",
          "system": "Passive. No longer requires eye contact."
        },
        "summon": {
          "name": "Summon",
          "description": "Compel someone you've met to come to you.",
          "system": "Manipulation + Presence. Cost: One Rouse Check."
        },
        "twistWords": {
          "name": "Twist Words",
          "description": "Weaponize an opponent's words in front of an audience.",
          "system": "Insight + Presence vs Social. Cost: One Rouse Check."
        },
        "hideousLaughter": {
          "name": "Hideous Laughter",
          "description": "Instill uproarious crippling laughter.",
          "system": "Charisma + Presence vs Composure + Wits. Cost: One Rouse Check."
        },
        "majesty": {
          "name": "Majesty",
          "description": "Radiate an aura of absolute divine authority.",
          "system": "Targets cannot act against you. Cost: One Rouse Check."
        },
        "starMagnetism": {
          "name": "Star Magnetism",
          "description": "Your Presence is so strong it affects people even via media.",
          "system": "Passive. Works via TV, photos, etc."
        }
      }
    },
    "protean": {
      "name": "Protean",
      "description": "The Discipline of shapeshifting.",
      "powers": {
        "eyesOfTheBeast": {
          "name": "Eyes of the Beast",
          "description": "See in complete darkness.",
          "system": "No cost. Eyes glow red."
        },
        "weightOfTheFeather": {
          "name": "Weight of the Feather",
          "description": "Become almost weightless.",
          "system": "No cost. Drift down safely from any height."
        },
        "shedSkin": {
          "name": "Shed Skin",
          "description": "Shed damaged form to appear untouched.",
          "system": "Used while mending. Cost: One Rouse Check."
        },
        "feralWeapons": {
          "name": "Feral Weapons",
          "description": "Grow vicious claws and fangs.",
          "system": "Unarmed attacks do Aggravated damage. Cost: One Rouse Check."
        },
        "vicissitude": {
          "name": "Vicissitude",
          "description": "Malleable flesh, muscle, and bone.",
          "system": "Determinação + Proteanismo. Cost: One Rouse Check."
        },
        "earthMeld": {
          "name": "Earth Meld",
          "description": "Sink into the earth for safety.",
          "system": "Must be natural soil. Cost: One Rouse Check."
        },
        "shapechange": {
          "name": "Shapechange",
          "description": "Transform into a predatory animal.",
          "system": "Stamina + Protean. Cost: One Rouse Check."
        },
        "modelagemDeCarne": {
          "name": "Flesh Crafting",
          "description": "Inflict body alterations on others.",
          "system": "Determinação + Proteanismo vs Vigor + Determinação. Cost: One Rouse Check."
        },
        "toolsOfNature": {
          "name": "Tools of Nature",
          "description": "Mimic complex physiological features from animals.",
          "system": "Resolve + Animalism vs Difficulty. Cost: One Rouse Check."
        },
        "metamorphosis": {
          "name": "Metamorphosis",
          "description": "Assume more varied or monstrous forms.",
          "system": "Passive enhancement to Shapechange."
        },
        "formaHedionda": {
          "name": "Horrific Form",
          "description": "Assume a monstrous vision of your Beast.",
          "system": "Passive. Cost: One Rouse Check."
        },
        "swarmForm": {
          "name": "Swarm Form",
          "description": "Transform into a sentient swarm.",
          "system": "Passive. Cost: One Rouse Check."
        },
        "traverseTheEarth": {
          "name": "Traverse the Earth",
          "description": "Travel through natural earth while melded.",
          "system": "Passive. Cost: One Rouse Check."
        },
        "mistForm": {
          "name": "Mist Form",
          "description": "Transform into a living cloud of vapor.",
          "system": "Stamina + Protean. Cost: One Rouse Check."
        },
        "theUnfetteredHeart": {
          "name": "The Unfettered Heart",
          "description": "Your internal organs move to avoid stakes.",
          "system": "Passive. Harder to stake the user."
        },
        "umComATerra": {
          "name": "One with the Earth",
          "description": "Experiment stimuli from nearby area while melded.",
          "system": "As Earth Meld, plus sensory stimuli. Cost: Two Rouse Checks."
        }
      }
    },
    "bloodsorcery": {
      "name": "Blood Sorcery",
      "description": "Ancient magic powered by the blood of Caine.",
      "powers": {
        "corrosiveVitae": {
          "name": "Corrosive Vitae",
          "description": "Turn your blood into a powerful acid.",
          "system": "One Rouse Check. Melts non-living material."
        },
        "aTasteForBlood": {
          "name": "A Taste for Blood",
          "description": "Learn a target's traits by tasting their blood.",
          "system": "No roll. Learn Clan, Generation, etc."
        },
        "extinguishVitae": {
          "name": "Extinguish Vitae",
          "description": "Cause another vampire's blood to become inert.",
          "system": "Intelligence + Blood Sorcery. Cost: One Rouse Check."
        },
        "bloodObject": {
          "name": "Blood Object",
          "description": "Solidify blood into simple shapes.",
          "system": "Craft + Blood Sorcery. Cost: One or more Rouse Checks."
        },
        "bloodTendrils": {
          "name": "Blood Tendrils",
          "description": "Manipulate blood into malleable tendrils.",
          "system": "Wits + Blood Sorcery. Cost: One Rouse Check."
        },
        "bloodOfPotency": {
          "name": "Blood of Potency",
          "description": "Temporarily increase your Blood Potency.",
          "system": "One Rouse Check. Gain +1 Blood Potency."
        },
        "scorpionsTouch": {
          "name": "Scorpion's Touch",
          "description": "Turn your blood into a paralyzing toxin.",
          "system": "One Rouse Check. Applied via touch/wound."
        },
        "diluteTheLine": {
          "name": "Dilute the Line",
          "description": "Lower the Blood Potency of another vampire.",
          "system": "Intelligence + Blood Sorcery vs Resolve + Stamina. Cost: One Rouse Check."
        },
        "healersBane": {
          "name": "Healer's Bane",
          "description": "Corrupt the healing properties of another's blood.",
          "system": "Resolve + Blood Sorcery vs Stamina + Occult. Cost: One Rouse Check."
        },
        "theftOfVitae": {
          "name": "Theft of Vitae",
          "description": "Draw blood directly from a target into yourself.",
          "system": "Wits + Blood Sorcery. Cost: One Rouse Check."
        },
        "crimsonFury": {
          "name": "Crimson Fury",
          "description": "Drive those who drink your blood into Frenzy.",
          "system": "Manipulation + Blood Sorcery vs Composure + Stamina. Cost: One Rouse Check."
        },
        "curseOfTheSlowBlood": {
          "name": "Curse of the Slow Blood",
          "description": "Require additional Rouse checks for gifts.",
          "system": "Resolve + Blood Sorcery vs Stamina + Composure. Cost: One Rouse Check."
        },
        "baalsCaress": {
          "name": "Baal's Caress",
          "description": "Coat your weapon in boiling, deadly blood.",
          "system": "Weapon does Aggravated damage. Cost: One Rouse Check."
        },
        "cauldronOfBlood": {
          "name": "Cauldron of Blood",
          "description": "Boil the blood inside a victim's veins.",
          "system": "Resolve + Blood Sorcery vs Stamina + Fortitude. Massive Aggravated damage."
        },
        "telekinesis": {
          "name": "Telekinesis",
          "description": "Move objects or people with your mind.",
          "system": "Resolve + Blood Sorcery vs Strength + Athletics. Cost: One Rouse Check."
        }
      }
    },
    "oblivion": {
      "name": "Oblivion",
      "description": "Command over the abyss and shadows.",
      "powers": {
        "shadowCloak": {
          "name": "Shadow Cloak",
          "description": "Enshroud yourself in darkness to aid stealth.",
          "system": "No cost. Add level to Stealth."
        },
        "oblivionsSight": {
          "name": "Oblivion's Sight",
          "description": "See in absolute darkness and detect ghosts.",
          "system": "One Rouse Check per scene."
        },
        "armsOfAhriman": {
          "name": "Arms of Ahriman",
          "description": "Summon shadow tendrils to attack or grab.",
          "system": "Dexterity + Oblivion. Cost: One Rouse Check."
        },
        "shadowCast": {
          "name": "Shadow Cast",
          "description": "Project your shadow independently.",
          "system": "Manipulation + Oblivion. No cost."
        },
        "abyssalPulse": {
          "name": "Abyssal Pulse",
          "description": "Disable electronic equipment in an area.",
          "system": "Wits + Oblivion vs Difficulty. Cost: One Rouse Check."
        },
        "touchOfOblivion": {
          "name": "Touch of Oblivion",
          "description": "Wither flesh and bone with a cold touch.",
          "system": "Strength + Oblivion vs Stamina + Fortitude. One Rouse Check."
        },
        "shadowPuppet": {
          "name": "Shadow Puppet",
          "description": "Control another's shadow and mimic actions.",
          "system": "Resolve + Oblivion vs Resolve + Composure. Cost: One Rouse Check."
        },
        "stygianShroud": {
          "name": "Stygian Shroud",
          "description": "Create a cloud of absolute sensory deprivation.",
          "system": "Resolve + Oblivion. Cost: One Rouse Check."
        },
        "tenebrousAvatar": {
          "name": "Tenebrous Avatar",
          "description": "Transform into a living shadow.",
          "system": "Stamina + Oblivion. Cost: Two Rouse Checks."
        }
      }
    },
    "thinbloodalchemy": {
      "name": "Thin-Blood Alchemy",
      "description": "The makeshift chemistry of the weak-blooded.",
      "powers": {
        "farReach": {
          "name": "Far Reach",
          "description": "Simple telekinesis via alchemical fumes.",
          "system": "Intelligence + Alchemy. One Rouse Check."
        },
        "haze": {
          "name": "Haze",
          "description": "Create a field of mist to obscure silhouette.",
          "system": "Penalty to ranged attacks. Cost: One Rouse Check."
        },
        "profaneHierosGamos": {
          "name": "Profane Hieros Gamos",
          "description": "Change gender or physical appearance.",
          "system": "Permanent until performed again. Cost: Brewing process."
        },
        "envelop": {
          "name": "Envelop",
          "description": "Mist that clings to a victim and blinds it.",
          "system": "Wits + Alchemy vs Stamina + Survival. Cost: One Rouse Check."
        },
        "defractionate": {
          "name": "Defractionate",
          "description": "Homeopathic elixir to refresh fractionated blood.",
          "system": "Distillation roll determines bags. Cost: Brewing process."
        },
        "airborneMomentum": {
          "name": "Airborne Momentum",
          "description": "Potion that allows limited flight or hovering.",
          "system": "Strength + Alchemy vs Dex + Athletics. Cost: One Rouse Check."
        },
        "awakenTheSleeper": {
          "name": "Awaken the Sleeper",
          "description": "Elixir that can awaken a vampire from Torpor.",
          "system": "Successes determine Blood Potency limit. Cost: Brewing process."
        }
      }
    },
    "ragabashgifts": {
      "name": "Ragabash Gifts",
      "description": "Gifts of the New Moon, focusing on trickery and subversion.",
      "powers": {
        "blurOfTheMilkyEye": {
          "name": "Blur of the Milky Eye",
          "description": "Become a blur to the senses.",
          "system": "Wits + Stealth. Passive."
        },
        "liarsFace": {
          "name": "Liar's Face",
          "description": "Your lies are impossible to detect.",
          "system": "Manipulation + Subterfuge. Passive."
        }
      }
    },
    "theurgegifts": {
      "name": "Theurge Gifts",
      "description": "Gifts of the Crescent Moon, focusing on spirits and the Umbra.",
      "powers": {
        "senseWyrm": {
          "name": "Sense Wyrm",
          "description": "Detect the presence of the Wyrm.",
          "system": "Intelligence + Occult. No cost."
        },
        "spiritSpeech": {
          "name": "Spirit Speech",
          "description": "Communicate with spirits.",
          "system": "Charisma + Insight. No cost."
        }
      }
    },
    "philodoxgifts": {
      "name": "Philodox Gifts",
      "description": "Gifts of the Half Moon, focusing on balance and judgment.",
      "powers": {
        "kingOfTheBeasts": {
          "name": "King of the Beasts",
          "description": "Command animals with authority.",
          "system": "Charisma + Animal Ken. No cost."
        },
        "truthOfGaia": {
          "name": "Truth of Gaia",
          "description": "Sense if someone is lying.",
          "system": "Intelligence + Insight vs Manipulation + Subterfuge."
        }
      }
    },
    "galliardgifts": {
      "name": "Galliard Gifts",
      "description": "Gifts of the Gibbous Moon, focusing on lore and inspiration.",
      "powers": {
        "callOfTheWyld": {
          "name": "Call of the Wyld",
          "description": "Communicate over long distances via howling.",
          "system": "Stamina + Performance. No cost."
        },
        "mindspeak": {
          "name": "Mindspeak",
          "description": "Project thoughts into the minds of others.",
          "system": "Manipulation + Empathy. Cost: 1 Rage check."
        }
      }
    },
    "ahroungifts": {
      "name": "Ahroun Gifts",
      "description": "Gifts of the Full Moon, focusing on combat and leadership.",
      "powers": {
        "fallingTouch": {
          "name": "Falling Touch",
          "description": "Send an opponent sprawling with a touch.",
          "system": "Dexterity + Medicine. Cost: 1 Rage check."
        },
        "senseSilver": {
          "name": "Sense Silver",
          "description": "Detect the presence of silver.",
          "system": "Perception + Primal-Urge. Passive."
        }
      }
    },
    "blackfuriesgifts": {
      "name": "Black Furies Gifts",
      "description": "Gifts of the Black Furies, focusing on justice and nature.",
      "powers": {
        "breathOfTheWyld": {
          "name": "Breath of the Wyld",
          "description": "Incite a crowd to action.",
          "system": "Charisma + Leadership. Cost: 1 Rage check."
        },
        "heightenedSenses": {
          "name": "Heightened Senses",
          "description": "Sharpen all senses.",
          "system": "Passive. Add level to perception tests."
        }
      }
    },
    "bonegnawersgifts": {
      "name": "Bone Gnawers Gifts",
      "description": "Gifts of the Bone Gnawers, focusing on urban survival.",
      "powers": {
        "cooking": {
          "name": "Cooking",
          "description": "Turn anything into edible food.",
          "system": "Intelligence + Survival. No cost."
        },
        "scentOfSweetSuccess": {
          "name": "Scent of Sweet Success",
          "description": "Know exactly what to say to succeed.",
          "system": "Manipulation + Etiquette. Passive."
        }
      }
    },
    "childrenofgaiagifts": {
      "name": "Children of Gaia Gifts",
      "description": "Gifts of the Children of Gaia, focusing on healing and peace.",
      "powers": {
        "dazzle": {
          "name": "Dazzle",
          "description": "Overwhelm a target with beauty and light.",
          "system": "Charisma + Performance vs Composure + Resolve."
        },
        "resistPain": {
          "name": "Resist Pain",
          "description": "Ignore wound penalties.",
          "system": "Passive. Ignore penalties for a scene."
        }
      }
    },
    "fiandeirosdevidrogifts": {
      "name": "Glass Spinners Gifts",
      "description": "Gifts of the Glass Spinners, focusing on spirits and the Umbra.",
      "powers": {
        "spiritSpeech": {
          "name": "Spirit Speech",
          "description": "Communicate with spirits.",
          "system": "Charisma + Insight. No cost."
        },
        "umbralTether": {
          "name": "Umbral Tether",
          "description": "Create a link to return from the Umbra.",
          "system": "Intelligence + Occult. No cost."
        }
      }
    },
    "andarilhosdoasfaltogifts": {
      "name": "Glass Walkers Gifts",
      "description": "Gifts of the Glass Walkers, focusing on technology.",
      "powers": {
        "controlSimpleMachine": {
          "name": "Control Simple Machine",
          "description": "Manipulate mechanical devices.",
          "system": "Manipulation + Technology. No cost."
        },
        "plugAndPlay": {
          "name": "Plug and Play",
          "description": "Interface with any electronic device.",
          "system": "Intelligence + Technology. Passive."
        }
      }
    },
    "criadefenrisgifts": {
      "name": "Get of Fenris Gifts",
      "description": "Gifts of the Get of Fenris, focusing on combat and brutality.",
      "powers": {
        "resistPain": {
          "name": "Resist Pain",
          "description": "Ignore wound penalties.",
          "system": "Passive. Ignore penalties for a scene."
        },
        "furiousStrike": {
          "name": "Furious Strike",
          "description": "Concentrate Rage into blows.",
          "system": "Add Glory to a Brawl pool. Cost: 1 Rage check."
        }
      }
    },
    "wendigogifts": {
      "name": "Wendigo Gifts",
      "description": "Gifts of the Wendigo, focusing on tracking and the cold.",
      "powers": {
        "beastSpeech": {
          "name": "Beast Speech",
          "description": "Talk to any animal.",
          "system": "Charisma + Animal Ken. No cost."
        },
        "tracklessStep": {
          "name": "Trackless Step",
          "description": "Leave no trail behind.",
          "system": "Dexterity + Stealth. Passive."
        }
      }
    },
    "redtalonsgifts": {
      "name": "Red Talons Gifts",
      "description": "Gifts of the Red Talons, focusing on the wild and predators.",
      "powers": {
        "beastLife": {
          "name": "Beast Life",
          "description": "Communicate with and lead animals.",
          "system": "Charisma + Animal Ken. No cost."
        },
        "hiddenKiller": {
          "name": "Hidden Killer",
          "description": "Conceal the evidence of a kill.",
          "system": "Intelligence + Stealth. Passive."
        }
      }
    },
    "shadowlordsgifts": {
      "name": "Shadow Lords Gifts",
      "description": "Gifts of the Shadow Lords, focusing on dominance and shadows.",
      "powers": {
        "auraOfConfidence": {
          "name": "Aura of Confidence",
          "description": "Project absolute self-assurance.",
          "system": "Manipulation + Subterfuge. Passive."
        },
        "fatalFlaw": {
          "name": "Fatal Flaw",
          "description": "Sense a target's weakness.",
          "system": "Perception + Insight. No cost."
        }
      }
    },
    "silverfangsgifts": {
      "name": "Silver Fangs Gifts",
      "description": "Gifts of the Silver Fangs, focusing on leadership and nobility.",
      "powers": {
        "falconsGrasp": {
          "name": "Falcon's Grasp",
          "description": "Your grip is unbreakable.",
          "system": "Strength + Brawl. Passive."
        },
        "senseWyrm": {
          "name": "Sense Wyrm",
          "description": "Detect the presence of the Wyrm.",
          "system": "Intelligence + Occult. No cost."
        }
      }
    },
    "silentstridersgifts": {
      "name": "Silent Striders Gifts",
      "description": "Gifts of the Silent Striders, focusing on travel and messages.",
      "powers": {
        "speedOfThought": {
          "name": "Speed of Thought",
          "description": "Double your movement speed.",
          "system": "Passive. Double land speed."
        },
        "messengersFortitude": {
          "name": "Messenger's Fortitude",
          "description": "Travel for days without rest.",
          "system": "Stamina + Athletics. No cost."
        }
      }
    },
    "innategifts": {
      "name": "Innate Gifts",
      "description": "Gifts available to all Garou.",
      "powers": {
        "olharDesconcertante": {
          "name": "Disconcerting Gaze",
          "description": "Establish dominance at the top of the food chain.",
          "system": "Charisma + Honor vs Composure + Resolve. Target cowers or shows submission."
        },
        "olhosDaCoruja": {
          "name": "Eyes of the Owl",
          "description": "See in complete darkness.",
          "system": "See in natural darkness. Wisdom bonus to resist supernatural darkness."
        },
        "pancadaFuriosa": {
          "name": "Furious Strike",
          "description": "Concentrate Rage into blows.",
          "system": "Add Glory to a Brawl pool. Cost: 1 Rage check."
        },
        "pesDeGato": {
          "name": "Cat's Feet",
          "description": "Supernatural balance and agility.",
          "system": "Automatic success on balance. Immune to falling damage (10x Honor in meters)."
        },
        "saltoDaLebre": {
          "name": "Hare's Leap",
          "description": "Leap great distances.",
          "system": "Strength + Glory. 3m horizontal or 2m vertical per success."
        },
        "sentidosCrepusculares": {
          "name": "Twilight Senses",
          "description": "Attunement to the physical realm and the Umbra simultaneously.",
          "system": "Intelligence + Wisdom. Interact with inhabitants of both worlds."
        },
        "skinLaceration": {
          "name": "Skin Laceration",
          "description": "Sacrifice health for transformation.",
          "system": "Sacrifice Health instead of Rage checks for transformation."
        },
        "lycanthropeBite": {
          "name": "Lycanthrope's Bite",
          "description": "Bite makes victim aggressive.",
          "system": "Roll Manipulation + Glory vs Composure + Resolve."
        },
        "urbanHunter": {
          "name": "Urban Hunter",
          "description": "Bonus to tracking in cities.",
          "system": "Add half Wisdom to tracking rolls in urban environments."
        },
        "corruptedMemories": {
          "name": "Corrupted Memories",
          "description": "Replace memories of yourself in others.",
          "system": "Roll Intelligence + Wisdom vs Wits + Resolve."
        },
        "cuttingWords": {
          "name": "Cutting Words",
          "description": "Mental anguish causes bleeding.",
          "system": "Roll Manipulation + Honor vs Composure + Intelligence."
        },
        "hungryTeeth": {
          "name": "Hungry Teeth",
          "description": "Bite spirits to absorb essence.",
          "system": "Bonus damage against spirits; recover Willpower on kill."
        },
        "wyrmSpeech": {
          "name": "Wyrm-Speech",
          "description": "Voice as a weapon against spirits.",
          "system": "Roll Charisma + Glory vs Composure + Resolve."
        },
        "mouthFullOfTeeth": {
          "name": "Mouth Full of Teeth",
          "description": "Multiply teeth for extra damage.",
          "system": "Bonus damage that decreases with each bite."
        }
      }
    },
    "werewolfRituals": {
      "abjuration": {
        "name": "Ritual of Abjuration",
        "description": "Purifies a person, place, or object of spiritual possession."
      },
      "patronage": {
        "name": "Ritual of Patronage",
        "description": "Adopts a Patron Spirit for the pack."
      },
      "seekKin": {
        "name": "Ritual of Seek Kin",
        "description": "Locates an emerging Garou before they cause harm."
      },
      "livingCaern": {
        "name": "Ritual of the Living Caern",
        "description": "Invigorates and renews a Caern's spiritual link."
      },
      "social": {
        "ceremonyForDead": {
          "name": "Ceremony for the Dead",
          "description": "Honors those who have recently died."
        },
        "conquest": {
          "name": "Ritual of Conquest",
          "description": "Honors a Garou's trials and position."
        },
        "winterWolf": {
          "name": "Ritual of the Winter Wolf",
          "description": "A solemn end for those too old or wounded to fight."
        }
      }
    },
    "werewolfTalismans": {
      "spiritCatcher": {
        "name": "Spirit Catcher",
        "description": "Captivates spirits so they cannot leave."
      },
      "windWhistle": {
        "name": "Wind Whistle",
        "description": "Summons wind to cover tracks."
      },
      "klaive": {
        "name": "Klaive",
        "description": "A silver dagger used in ritual combat."
      },
      "tearOfGaia": {
        "name": "Tear of Gaia",
        "description": "Rare fossils that can reduce Harano or Hauglosk."
      },
      "heraldHorn": {
        "name": "Herald's Horn",
        "description": "Summon pack members and find safe paths."
      },
      "kingBrennusHammer": {
        "name": "Hammer of King Brennus",
        "description": "Ancient warhammer, lethal to Black Spiral Dancers."
      },
      "heatStone": {
        "name": "The Heat Stone",
        "description": "Radioactive stone that inhibits all healing."
      },
      "assassinCrown": {
        "name": "Assassin's Crown",
        "description": "Increases Rage and prevents losing the wolf."
      },
      "ironAxe": {
        "name": "The Iron Axe",
        "description": "Sacrifice health for extra damage."
      },
      "boneScourge": {
        "name": "The Bone Scourge",
        "description": "Whip that inflicts Willpower damage."
      }
    }
  },
  "advantages": {
    "resources": {
      "name": "Resources"
    },
    "allies": {
      "name": "Allies"
    },
    "contacts": {
      "name": "Contacts"
    },
    "fame": {
      "name": "Fame"
    },
    "haven": {
      "name": "Haven"
    },
    "herd": {
      "name": "Herd"
    },
    "influence": {
      "name": "Influence"
    },
    "beautiful": {
      "name": "Beautiful"
    },
    "bloodhound": {
      "name": "Bloodhound"
    },
    "safehouse": {
      "name": "Safe House",
      "hidden": "Hidden: -2 dice to be located.",
      "secure": "Secure: +2 dice to resist unauthorized entry."
    },
    "caern": {
      "name": "Caern",
      "access": "Access: Permission to use a specific Caern.",
      "awakened": "Awakened: Part of a sept with a powerful Caern."
    },
    "job": {
      "name": "Job",
      "basic": "Basic: Provides an alibi or cover.",
      "confirmed": "Confirmed: Coworkers corroborate your cover."
    },
    "linguistics": {
      "name": "Linguistics",
      "desc": "Each dot allows fluency in one additional language."
    },
    "moon": {
      "refreshed": "Moon-Refreshed: Recover 1 Willpower when howling to the moon.",
      "stoked": "Moon-Stoked: Gain +1 Rage when howling to the moon."
    },
    "visual": {
      "goodwolfy": "Good Wolfy: Your wolf form looks like a dog.",
      "stunning": "Stunning: +2 dice to appropriate Social tests.",
      "imposingGlabro": "Imposing Glabro: Your Glabro form is more muscular than bulky. No Social penalty."
    },
    "metamorphosis": {
      "name": "Metamorphosis",
      "lunaResilience": "Luna's Resilience: Gain two additional Health boxes in Glabro and Hispo forms."
    },
    "supernatural": {
      "name": "Supernatural",
      "formMastery": "Form Mastery: Extend a Gift's use to Hominid or Lupus form."
    },
    "heritage": {
      "name": "Savage Heritage",
      "thickSkin": "Thick Skin: Your Health is 4 + Stamina instead of 3 + Stamina."
    },
    "mask": {
      "name": "Mask",
      "zeroed": "Zeroed: Real records deleted.",
      "cobbler": "Cobbler: Can create Masks."
    },
    "spiritpact": {
      "name": "Spirit Pact",
      "companion": "Companion: Spirit can follow you everywhere.",
      "host": "Host: Spirit has a physical host."
    },
    "talisman": {
      "name": "Talisman",
      "desc": "Possession of a spiritually important item (Klaive, etc)."
    },
    "heraldHorn": {
      "name": "Herald's Horn",
      "desc": "Summon pack members and find safe paths."
    },
    "kingBrennusHammer": {
      "name": "Hammer of King Brennus",
      "desc": "Ancient warhammer, lethal to Black Spiral Dancers."
    },
    "heatStone": {
      "name": "The Heat Stone",
      "desc": "Radioactive stone that inhibits all healing."
    },
    "assassinCrown": {
      "name": "Assassin's Crown",
      "desc": "Increases Rage and prevents losing the wolf."
    },
    "ironAxe": {
      "name": "The Iron Axe",
      "desc": "Sacrifice health for extra damage."
    },
    "boneScourge": {
      "name": "The Bone Scourge",
      "desc": "Whip that inflicts Willpower damage."
    }
  },
  "flaws": {
    "enemy": {
      "name": "Enemy"
    },
    "addiction": {
      "name": "Addiction"
    },
    "darksecret": {
      "name": "Dark Secret"
    },
    "haunted": {
      "name": "Haunted"
    },
    "shunned": {
      "name": "Shunned"
    },
    "feeding": {
      "name": "Feeding Flaw"
    },
    "substanceAbuse": {
      "incurable": "Incurable Addiction: -2 dice when not using substance.",
      "dependency": "Dependency: -1 die when not using substance."
    },
    "caernPariah": {
      "name": "Caern Pariah",
      "description": "Persona non grata in local Caerns."
    },
    "illiterate": {
      "name": "Illiterate",
      "description": "Cannot read or write. Academics/Science limited to 1."
    },
    "folkloric": {
      "bane": "Folkloric Bane: Take Aggravated damage from a specific source (Holy Water, etc).",
      "taboo": "Folkloric Taboo: Must spend Willpower to overcome a specific aversion.",
      "sign": "Folkloric Sign: Physical indicator of your nature (-1 Social)."
    },
    "croneCurse": {
      "name": "Crone's Curse",
      "description": "Aged rapidly or transformed late. -1 Health box."
    },
    "moonSlave": {
      "name": "Moon-Slave",
      "description": "Must change form when first seeing the moon."
    },
    "visualFlaw": {
      "repulsive": "Repulsive: -2 dice to Social tests.",
      "ugly": "Ugly: -1 die to Social tests."
    },
    "infamy": {
      "name": "Infamy",
      "description": "Famous for something terrible."
    },
    "infamousPartner": {
      "name": "Infamous Partner",
      "description": "Associate has Infamy."
    },
    "suspect": {
      "name": "Suspect",
      "description": "Biometrics in intelligence databases."
    },
    "recurringError": {
      "name": "Recurring Error",
      "description": "Records show you as dead or on a watch list."
    },
    "adversary": {
      "name": "Adversary",
      "description": "A rival Garou who wishes you ill."
    },
    "conditionalPact": {
      "name": "Conditional Pact",
      "description": "Must perform/avoid acts to keep spirit's favor."
    },
    "destitute": {
      "name": "Destitute",
      "description": "No money or home."
    },
    "wyrmMarked": {
      "name": "Wyrm-Marked Flesh",
      "description": "Your supernatural forms show Wyrm influence. Social penalty."
    },
    "moonBane": {
      "name": "Moon's Ill Omen",
      "description": "Howling for Rage is uncertain. Rage check required."
    },
    "hellHound": {
      "name": "Hellhound",
      "description": "Hispo and Lupus forms impose Delirium like Crinos."
    },
    "wolfMan": {
      "name": "Wolf-Man",
      "description": "Crinos form looks more human. Cannot bite, but less Delirium."
    },
    "wyrmTouched": {
      "name": "Wyrm-Touched",
      "description": "The Wyrm has clawed into your soul.",
      "calamity": "Calamity Wyrm: +1 Difficulty to resist Frenzy.",
      "soulEater": "Soul-Eater Wyrm: Must test Harano at the end of every session.",
      "corruption": "Corruption Wyrm: Must test Hauglosk at the end of every session."
    }
  },
  "auspices": {
    "ragabash": {
      "name": "Ragabash",
      "description": "Tricksters and questioners of tradition. Born under the new moon, they have the freedom to challenge common sense."
    },
    "theurge": {
      "name": "Theurge",
      "description": "Mystics and seers with an aptitude for interacting with the spiritual world. Born under the crescent moon."
    },
    "philodox": {
      "name": "Philodox",
      "description": "Judges and arbitrators responsible for mediating conflicts and interpreting the Litany. Born under the half-moon."
    },
    "galliard": {
      "name": "Galliard",
      "description": "Storytellers and keepers of oral lore and the law. Born under the gibbous moon."
    },
    "ahroun": {
      "name": "Ahroun",
      "description": "Warriors and combatants predisposed to ferocity and leadership in times of war. Born under the full moon."
    }
  },
  "tribes": {
    "blackfuries": {
      "name": "Black Furies",
      "description": "Defenders of justice and fighters against oppression.",
      "favor": "Oppose Power: +1 die to oppose someone in power or bypass obstacles.",
      "bane": "Must Correct Injustice: If they allow an injustice to continue, recover only 1 Willpower.",
      "archetypes": [
        "Wanted",
        "First Responder",
        "Musician",
        "Scout"
      ]
    },
    "bonegnawers": {
      "name": "Bone Gnawers",
      "description": "Specialists in urban secrets and survival on the fringes.",
      "favor": "Find Hidden: +1 die to find something lost or unnoticed.",
      "bane": "Help the Downtrodden: If they pass an opportunity to help the disadvantaged, recover only 1 Willpower.",
      "archetypes": [
        "Gazette Chronicler",
        "Sound Technician",
        "Our Friend",
        "Ride Driver"
      ]
    },
    "childrenofgaia": {
      "name": "Children of Gaia",
      "description": "Seek to understand Gaia's mysteries and direct Fury toward healing.",
      "favor": "Insight: +1 die to discover something about a person, animal, or spirit.",
      "bane": "Honesty: If they lie or hide the truth for personal gain, recover only 1 Willpower.",
      "archetypes": [
        "Healer",
        "Dealer",
        "Traveler",
        "Miner"
      ]
    },
    "fiandeirosdevidro": {
      "name": "Glass Spinners",
      "description": "Mystics who weave the threads of the spirit world into physical reality.",
      "favor": "Spirit Weaving: +1 die to interact with or command spirits.",
      "bane": "Fragile Balance: If they fail to maintain spiritual harmony, recover only 1 Willpower.",
      "archetypes": [
        "Umbramancer",
        "Thread-Seeker"
      ]
    },
    "andarilhosdoasfalto": {
      "name": "Glass Walkers",
      "description": "Masters of technology and applied science in the urban jungle.",
      "favor": "Structured Approach: +1 die to Technology or Science.",
      "bane": "Spider's Web: Cannot harm Spider spirits. If they destroy complex machines, recover only 1 Willpower.",
      "archetypes": [
        "Urbanist",
        "Investigator"
      ]
    },
    "criadefenris": {
      "name": "Get of Fenris (Cult)",
      "description": "Fierce warriors who have fallen into fanaticism and bloodlust.",
      "favor": "Unrelenting Force: +1 die to damage-dealing rolls.",
      "bane": "Bloodlust: If they show mercy to a worthy foe, recover only 1 Willpower.",
      "archetypes": [
        "Berserker",
        "Fanatic"
      ]
    },
    "redtalons": {
      "name": "Red Talons",
      "description": "Wolves who fight to reclaim wild territories from human expansion.",
      "favor": "Relentless Combatant: +1 die to Brawl when Health is below half.",
      "bane": "Abhor Complexity: Using technology causes recovery of only 1 Willpower.",
      "archetypes": [
        "Bounty Hunter",
        "Man-Eater"
      ]
    },
    "shadowlords": {
      "name": "Shadow Lords",
      "description": "Strategists who value strength and cunning to dominate enemies.",
      "favor": "Exploit Weakness: +1 die to Intimidation or Subterfuge.",
      "bane": "Pride: If defeated by a Garou of lower Renown, recover only 1 Willpower.",
      "archetypes": [
        "Boyar",
        "Assassin"
      ]
    },
    "silentstriders": {
      "name": "Silent Striders",
      "description": "Travelers and messengers who carry news and secrets.",
      "favor": "Swift Passage: +1 die to Athletics or Stealth for travel.",
      "bane": "Ritual for the Dead: If they witness death without a ritual, recover only 1 Willpower.",
      "archetypes": [
        "Kin-Seeker",
        "Ambassador"
      ]
    },
    "silverfangs": {
      "name": "Silver Fangs",
      "description": "The noble lineage of the Garou, traditional leaders.",
      "favor": "Lead by Example: +1 die to Persuasion or Leadership.",
      "bane": "Honor: If they act dishonorably or lose Renown, recover only 1 Willpower.",
      "archetypes": [
        "Local Celebrity",
        "Exiled Noble"
      ]
    },
    "wendigo": {
      "name": "Wendigo (Galestalkers)",
      "description": "Peerless trackers and tireless hunters from the frozen north.",
      "favor": "Inexorable: +1 die to pursuits of their prey.",
      "bane": "Fresh Kill: Must consume fresh-killed game daily; otherwise, recover only 1 Willpower.",
      "archetypes": [
        "Spirit Walker",
        "Gaucho"
      ]
    }
  },
  "loresheets": {
    "title": "Loresheets",
    "subtitle": "Loresheets provide unique benefits and connections to the world.",
    "watcherOfMalditos": {
      "name": "Watcher of the Malditos",
      "description": "Guardians of imprisoned spirits.",
      "level1": {
        "name": "Canary",
        "description": "Sixth sense for Malditos.",
        "system": "+2 dice to Investigation related to Malditos."
      },
      "level2": {
        "name": "Cell Builder",
        "description": "Prepare prisons for Malditos.",
        "system": "+1 die to Ritual of Confinement."
      },
      "level3": {
        "name": "Wisdom of the Void",
        "description": "Consult a powerful imprisoned Maldito.",
        "system": "Add spirit's Power to knowledge rolls once per session."
      },
      "level4": {
        "name": "Watcher's Map",
        "description": "Map of imprisoned Malditos in the region.",
        "system": "Possess a map indicating locations."
      },
      "level5": {
        "name": "Watcher's Routine",
        "description": "Comfort in the whispers of the prisoner.",
        "system": "Recover Aggravated Willpower by talking to the Maldito once per chronicle."
      }
    },
    "theSkinner": {
      "name": "The Skinner",
      "description": "A mass of wolf skins that hunts Garou.",
      "level1": {
        "name": "Early Warning",
        "description": "Sensitive to the Skinner's presence.",
        "system": "+2 dice to Perception to detect ambushes."
      },
      "level2": {
        "name": "Support Network",
        "description": "Contact with those hurt by the Skinner.",
        "system": "Gain Allies (••••)."
      },
      "level3": {
        "name": "Skinner's Bane",
        "description": "Weapon to destroy the Skinner.",
        "system": "Weapon inflicts Aggravated damage to Moon-Usurpers."
      },
      "level4": {
        "name": "Strange Scholar",
        "description": "Knowledge of other supernatural creatures.",
        "system": "+2 dice against non-Garou/spirit creatures once per session."
      },
      "level5": {
        "name": "Skin Tear",
        "description": "Skill in manipulating their curse.",
        "system": "Prevent Moon-Usurper from shapeshifting for a session once per session."
      }
    },
    "zhyzhak": {
      "name": "Zhyzhak",
      "description": "The champion of the Black Spiral Dancers.",
      "level1": {
        "name": "Thicker Skin",
        "description": "Tolerance to pain.",
        "system": "1 point of armor against blades in hominid form."
      },
      "level2": {
        "name": "Victory Story",
        "description": "Accumulated victories.",
        "system": "+4 dice to Charisma tests once per session."
      },
      "level3": {
        "name": "Intruder of Fate",
        "description": "Breaking destinies.",
        "system": "Prevent or distort a prophecy once per chronicle."
      },
      "level4": {
        "name": "Deadliest Uses",
        "description": "Turn items into weapons.",
        "system": "Self-inflict 1 Aggravated Willpower for Aggravated damage with improvised weapons."
      },
      "level5": {
        "name": "Physique to Match",
        "description": "Reflexes to match the monster.",
        "system": "-2 dice to Crinos form opponents against you."
      }
    },
    "saboteurs": {
      "name": "Saboteurs",
      "description": "A movement focused on crippling Pentex Group operations and sharing information on subsidiaries.",
      "level1": {
        "name": "Demagogue",
        "description": "You know how to stir the anger of the working mass.",
        "system": "Once per story, add two dice to pools to incite a human crowd to violence."
      },
      "level2": {
        "name": "Arsonist",
        "description": "You have a knack for setting fires using construction materials.",
        "system": "With 2-7 days of prep, trigger a structural fire at a chosen moment without being present."
      },
      "level3": {
        "name": "Big Bash",
        "description": "Hold an event to attract public attention to a cause.",
        "system": "Once per story, Fame increases by 3 until the end of the session."
      },
      "level4": {
        "name": "Delegator",
        "description": "Expert at shifting blame to others.",
        "system": "+2 dice to convince others someone else is responsible. -1 die to Social tests against werewolves in the same scene."
      },
      "level5": {
        "name": "Paper Trail",
        "description": "Find documents linking Pentex to a specific transgression.",
        "system": "Once per chronicle, find incriminating documents. Pentex will know it was you (or you can frame another Saboteur)."
      }
    },
    "projectTwilight": {
      "name": "Project Twilight",
      "description": "Federal death squads and government organizations hunting werewolves.",
      "level1": {
        "name": "Undue Procedure",
        "description": "Make a small piece of evidence disappear.",
        "system": "Once per story, remove a minor piece of evidence (photo, file, DNA result)."
      },
      "level2": {
        "name": "Perfect Alibi",
        "description": "Present false evidence of your location on federal letterhead.",
        "system": "Once per story, provide a classified federal alibi for your whereabouts."
      },
      "level3": {
        "name": "Undue Bravery",
        "description": "Claim credit for taking down a major threat.",
        "system": "Once per story, +3 dice to a relevant Social test. -1 die to other Social tests in the same scene."
      },
      "level4": {
        "name": "Warning",
        "description": "Advance notice of Project Twilight actions.",
        "system": "Once per chronicle, learn details of planned direct actions against your pack."
      },
      "level5": {
        "name": "The Red Phone",
        "description": "A high-placed contact owes you a favor.",
        "system": "Once per chronicle, gain 5 dice to distribute for operations involving hunter organizations. Failure attracts a systemic enemy."
      }
    },
    "umbralTraveler": {
      "name": "Umbral Traveler",
      "description": "Specialists in exploring the dynamic and mysterious spirit realm.",
      "level1": {
        "name": "Silver Tracks",
        "description": "Leave silver tracks in the Umbra only you can see.",
        "system": "Difficulty to return to the physical world via Ritual of the Crossing is reduced by 1."
      },
      "level2": {
        "name": "Web Music",
        "description": "Attract pattern-spiders by playing their webs.",
        "system": "Once per scene, attract the attention of a pattern-spider by strumming spirit webs."
      },
      "level3": {
        "name": "Initiate of the Underworld",
        "description": "See ghosts in the Umbra or physical world.",
        "system": "You can see 'ghosts' unless they use specific supernatural powers to hide."
      },
      "level4": {
        "name": "Spiritual Nourishment",
        "description": "Sustained by the spirit world.",
        "system": "Suffer only Superficial damage when failing to spend Willpower to remain in the Umbra."
      },
      "level5": {
        "name": "Chthonic Secret",
        "description": "Guardian of a monumental Umbral secret.",
        "system": "You know a major secret (location of a powerful spirit's home, etc.). The spirit knows you know."
      }
    },
    "renegadeFenrir": {
      "name": "Renegade Fenrir",
      "description": "Garou who broke their pact with Wolf when the Cult of Fenris fell to Hauglosk.",
      "level1": {
        "name": "Boot-licker",
        "description": "Find purpose in following despotic leaders.",
        "system": "Once per session, recover 1 Willpower after rerolling in a conflict while following orders from a higher Renown Garou."
      },
      "level2": {
        "name": "Repudiated Henchman",
        "description": "Respected Garou made an example of you.",
        "system": "Renown is treated as 1 lower for social interactions. On a failed Rage check to Lose the Wolf, roll an extra die; if successful, keep 1 Rage."
      },
      "level3": {
        "name": "Indomitable",
        "description": "Intrepid even after renouncing Wolf.",
        "system": "+2 dice to resist supernatural fear. If used, -1 die to resist frenzy for the scene."
      },
      "level4": {
        "name": "Directed Rage",
        "description": "Fenris's harshness remains within you.",
        "system": "Once per scene, automatically succeed on a Rage check to activate a Gift, but add a Brutal result to the pool."
      },
      "level5": {
        "name": "Ultimate Howl",
        "description": "Witnessed the effects of Hauglosk directly.",
        "system": "Once per chronicle, when marking the last Hauglosk square, make a Rage check. If failed, unmark the square."
      }
    },
    "theBlackSpiral": {
      "name": "The Black Spiral",
      "description": "Knowledge of the horrific Labyrinth and the tribe affiliated with the Wyrm.",
      "level1": {
        "name": "Black Spiral Glyph",
        "description": "Know the true nuances of the Wyrm's glyph.",
        "system": "Can use the glyph to bait or deceive. -2 dice to Social pools with Garou who know you have this skill (except pack)."
      },
      "level2": {
        "name": "Bad Company",
        "description": "Contact with a BSD, fomor, or vampire.",
        "system": "Once per story, share info with a Wyrm-associated contact. Renown reduced by 2 until the end of the session."
      },
      "level3": {
        "name": "Encysted Spiral",
        "description": "Know of BSD hideouts desfiguring the world.",
        "system": "Can use a BSD hideout as a Safe House and stay Zeroed while hiding there."
      },
      "level4": {
        "name": "Closed Body",
        "description": "A Wyrm-spirit refuses to harm you.",
        "system": "A specific Wyrm-spirit won't harm you due to a secret pact. If seen, it causes major suspicion."
      },
      "level5": {
        "name": "The Labyrinth Solution",
        "description": "Attempt to deprogram a Black Spiral Dancer.",
        "system": "Once per story, attempt to cleanse a BSD of Bat's influence through isolation and tests."
      }
    }
  }
};

const oPt = {
  "app": {
    "title": "Criador de Personagens",
    "subtitle": "Dê vida ao seu personagem no Mundo das Trevas",
    "vampire": "Vampiro: A Máscara",
    "werewolf": "Lobisomem: O Apocalipse"
  },
  "buttons": {
    "next": "Próximo",
    "back": "Voltar",
    "jumpToSheet": "Ir para a Ficha",
    "close": "Fechar",
    "expandAll": "Expandir Tudo",
    "collapseAll": "Recolher Tudo",
    "save": "Salvar",
    "activate": "Ativar",
    "load": "Carregar",
    "export": "Exportar JSON",
    "import": "Importar JSON",
    "reset": "Reiniciar",
    "add": "Adicionar",
    "cancel": "Cancelar",
    "confirm": "Confirmar",
    "delete": "Excluir",
    "print": "Imprimir Ficha",
    "backToGameSelection": "Voltar para Seleção de Jogo"
  },
  "storage": {
    "title": "Armazenamento de Personagens",
    "saveMode": "Salvar Personagem",
    "loadMode": "Carregar Personagem",
    "enterName": "Nome do Personagem",
    "savedCharacters": "Personagens Salvos",
    "noSaves": "Nenhum personagem salvo encontrado.",
    "overwriteWarning": "Personagem com este nome já existe. Sobrescrever?",
    "deleteConfirm": "Tem certeza que deseja excluir este personagem?",
    "saveSuccess": "Personagem salvo com sucesso.",
    "saveError": "Falha ao salvar o personagem.",
    "loadSuccess": "Personagem carregado com sucesso.",
    "loadError": "Falha ao carregar o personagem.",
    "deleteSuccess": "Personagem '{{name}}' excluído.",
    "importSuccess": "Personagem importado do JSON.",
    "importError": "Arquivo JSON inválido.",
    "namePlaceholder": "Meu Personagem"
  },
  "gameSelection": {
    "title": "Selecione o Jogo",
    "subtitle": "Escolha o cenário que deseja explorar.",
    "vampireDesc": "A Besta interior ruge. Sobreviva à noite no Mundo das Trevas.",
    "werewolfDesc": "Quando você irá enfurecer? Lute contra a Wyrm e salve Gaia."
  },
  "steps": {
    "gameSelectionStep": "Jogo",
    "concept": "Conceito",
    "clan": "Clã",
    "tribe": "Tribo",
    "auspice": "Augúrio",
    "attributes": "Atributos",
    "skills": "Perícias",
    "finishingTouches": "Toques Finais",
    "sheet": "Ficha Final",
    "creationMethod": "Método de Criação"
  },
  "xpLevels": {
    "fledgling": {
      "vampire": "Recruta",
      "werewolf": "Filhote"
    },
    "neonate": {
      "vampire": "Neonato",
      "werewolf": "Cliath"
    },
    "ancilla": {
      "vampire": "Ancilla",
      "werewolf": "Adren"
    }
  },
  "creationMethod": {
    "title": "Método de Criação",
    "subtitle": "Como você deseja construir seu personagem?",
    "manual": "Criação Manual",
    "manualDesc": "Escolha cada detalhe do seu personagem passo a passo.",
    "random": "Geração Aleatória",
    "randomDesc": "Deixe o destino decidir. Gere um personagem completo instantaneamente.",
    "randomLevel": "Aleatório {{level}}",
    "randomFledglingDesc": {
      "vampire": "0 XP • 13ª Ger",
      "werewolf": "0 XP"
    },
    "randomNeonateDesc": {
      "vampire": "15 XP • 12ª Ger",
      "werewolf": "15 XP"
    },
    "randomAncillaDesc": {
      "vampire": "35 XP • 11ª Ger",
      "werewolf": "35 XP"
    }
  },
  "auspices": {
    "ragabash": {
      "name": "Ragabash",
      "description": "Malandros e questionadores das tradições. Transformados sob a lua nova, têm liberdade para contestar o senso comum."
    },
    "theurge": {
      "name": "Theurge",
      "description": "Místicos e videntes com aptidão para interagir com o mundo espiritual. Transformados sob a lua crescente."
    },
    "philodox": {
      "name": "Philodox",
      "description": "Juízes e árbitros responsáveis por mediar conflitos e interpretar a Litania. Transformados sob a meia-lua."
    },
    "galliard": {
      "name": "Galliard",
      "description": "Contadores de histórias e guardiões dos saberes orais e da lei. Transformados sob a lua gibosa."
    },
    "ahroun": {
      "name": "Ahroun",
      "description": "Guerreiros e combatentes predispostos à ferocidade e liderança em tempos de guerra. Transformados sob a lua cheia."
    }
  },
  "tribes": {
    "blackfuries": {
      "name": "Fúrias Negras",
      "description": "Defensoras da justiça e combatentes da opressão.",
      "favor": "Opor ao Poder: +1 dado para se opor ao poder ou saltar obstáculos.",
      "bane": "Corrigir Injustiça: Se permitir injustiça, recupera apenas 1 de Vontade.",
      "archetypes": [
        "Procurado",
        "Socorrista"
      ]
    },
    "bonegnawers": {
      "name": "Roedores de Ossos",
      "description": "Especialistas em segredos urbanos e sobrevivência nas margens.",
      "favor": "Achar o Oculto: +1 dado para achar algo perdido.",
      "bane": "Ajudar Desvalidos: Se ignorar quem precisa, recupera apenas 1 de Vontade.",
      "archetypes": [
        "Cronista",
        "Motorista"
      ]
    },
    "childrenofgaia": {
      "name": "Filhos de Gaia",
      "description": "Buscam entender Gaia e curar o mundo.",
      "favor": "Intuição: +1 dado para descobrir algo sobre alguém.",
      "bane": "Honestidade: Se mentir para ganho pessoal, recupera apenas 1 de Vontade.",
      "archetypes": [
        "Curandeiro",
        "Viajante"
      ]
    },
    "fiandeirosdevidro": {
      "name": "Fiandeiros de Vidro",
      "description": "Místicos que tecem os fios do mundo espiritual na realidade física.",
      "favor": "Tecelagem Espiritual: +1 dado para interagir com espíritos.",
      "bane": "Equilíbrio Frágil: Se falhar na harmonia espiritual, recupera apenas 1 de Vontade.",
      "archetypes": [
        "Umbramante",
        "Buscador"
      ]
    },
    "andarilhosdoasfalto": {
      "name": "Andarilhos do Asfalto",
      "description": "Mestres da tecnologia e ciência na selva urbana.",
      "favor": "Abordagem Estruturada: +1 dado em Tecnologia ou Ciência.",
      "bane": "Teia da Aranha: Se destruir máquinas complexas, recupera apenas 1 de Vontade.",
      "archetypes": [
        "Urbanista",
        "Investigador"
      ]
    },
    "criadefenris": {
      "name": "Cria de Fenris (Culto)",
      "description": "Guerreiros ferozes que sucumbiram ao fanatismo e sede de sangue.",
      "favor": "Força Implacável: +1 dado em rolagens de dano.",
      "bane": "Sede de Sangue: Se mostrar misericórdia, recupera apenas 1 de Vontade.",
      "archetypes": [
        "Berserker",
        "Fanático"
      ]
    },
    "redtalons": {
      "name": "Garras Vermelhas",
      "description": "Lobos que lutam para retomar territórios da expansão humana.",
      "favor": "Combatente Implacável: +1 dado em Briga (Vida < metade).",
      "bane": "Abominar Complexidade: Usar tecnologia recupera apenas 1 de Vontade.",
      "archetypes": [
        "Caçador",
        "Devorador"
      ]
    },
    "shadowlords": {
      "name": "Senhores das Sombras",
      "description": "Estrategistas que valorizam força e astúcia.",
      "favor": "Explorar Fraqueza: +1 dado em Intimidação ou Lábia.",
      "bane": "Orgulho: Se derrotado por menor Renome, recupera apenas 1 de Vontade.",
      "archetypes": [
        "Boiardo",
        "Assassino"
      ]
    },
    "silentstriders": {
      "name": "Peregrinos Silenciosos",
      "description": "Viajantes e mensageiros que portam notícias e segredos.",
      "favor": "Passagem Rápida: +1 dado em Atletismo ou Furtividade.",
      "bane": "Ritual aos Mortos: Se ignorar a morte, recupera apenas 1 de Vontade.",
      "archetypes": [
        "Mensageiro",
        "Embaixador"
      ]
    },
    "silverfangs": {
      "name": "Presas de Prata",
      "description": "A linhagem nobre dos Garou, líderes tradicionais.",
      "favor": "Liderar pelo Exemplo: +1 dado em Persuasão ou Liderança.",
      "bane": "Honra: Se agir desonradamente, recupera apenas 1 de Vontade.",
      "archetypes": [
        "Nobre",
        "Celebridade"
      ]
    },
    "wendigo": {
      "name": "Wendigo (Galopantes do Fantasma)",
      "description": "Rastreadores inigualáveis e caçadores das terras geladas.",
      "favor": "Inexorável: +1 dado em perseguições.",
      "bane": "Caça Fresca: Se não comer caça do dia, recupera apenas 1 de Vontade.",
      "archetypes": [
        "Andarilho",
        "Gaúcho"
      ]
    }
  },
  "summary": {
    "title": "Resumo e Progresso",
    "readySubtitle": "Todos os campos básicos estão preenchidos.",
    "incompleteSubtitle": "Complete as seções abaixo.",
    "missing_concept": "Nome, Conceito, Ambição ou Desejo faltando.",
    "missing_clan": "Clã não selecionado.",
    "error_attributes": "Atributos devem somar 22.",
    "error_skills": "A distribuição de perícias deve seguir uma das três trilhas.",
    "missing_predator": "Tipo de Predador não selecionado.",
    "error_disciplines": "Selecione pelo menos 2 pontos em Disciplinas.",
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
    "none": "Nenhum",
    "notDefined": "Não definido",
    "keyAttributes": "Atributos Chave",
    "keySkills": "Perícias Chave",
    "noClanSelected": "Nenhum clã selecionado.",
    "selectClanToSeeDetails": "Selecione um Clã para ver detalhes",
    "selectTribeToSeeDetails": "Selecione uma Tribo para ver detalhes",
    "selectAuspiceToSeeDetails": "Selecione um Augúrio para ver detalhes",
    "noneListed": "Nenhum listado.",
    "skill": "Perícia",
    "available": "Disponível",
    "assigned": "Atribuído",
    "clear": "Limpar",
    "value": "Valor",
    "poolDistribution": "Reserva de Pontos",
    "poolLegend": "Esferas brilhantes disponíveis. Escuras já atribuídas.",
    "managePowers": "Gerenciar Poderes",
    "paintMode": "Pintando {{value}}",
    "paintInstruction": "Clique nos atributos ou perícias para atribuir o valor ativo.",
    "confirm": "Confirmar",
    "randomIdentity": "Identidade Aleatória",
    "specialty": "Especialidade",
    "specialtyPlaceholder": "ex: Parkour",
    "resetWarning": "Tem certeza que deseja reiniciar todos os dados do personagem? Isso não pode ser desfeito.",
    "resetSuccess": "Personagem reiniciado para o padrão.",
    "generateSuccess": "Personagem gerado com sucesso!"
  },
  "concept": {
    "title": "Conceito Principal",
    "subtitle": "Quem você era? Quem você é agora?",
    "name": "Nome",
    "sire": "Senhor",
    "sirePlaceholder": "Quem te transformou?",
    "concept": "Conceito",
    "conceptPlaceholder": "ex: Ativista desiludido",
    "ambition": "Ambição",
    "ambitionPlaceholder": "Objetivo de longo prazo",
    "desire": "Desejo",
    "desirePlaceholder": "Objetivo de curto prazo",
    "portrait": "Retrato",
    "portraitPlaceholder": "Enviar Foto",
    "changePortrait": "Mudar Foto"
  },
  "clan": {
    "title": "Escolha sua Linhagem"
  },
  "clans": {
    "brujah": {
      "name": "Brujah",
      "description": "Rebeldes e agitadores.",
      "bane": "Temperamento explosivo.",
      "compulsion": "Rebelião."
    },
    "gangrel": {
      "name": "Gangrel",
      "description": "Nômades e sobreviventes.",
      "bane": "Traços animais ao entrar em frenesi.",
      "compulsion": "Impulsos Ferozes."
    },
    "malkavian": {
      "name": "Malkavian",
      "description": "Videntes e lunáticos.",
      "bane": "Perturbação permanente.",
      "compulsion": "Ilusão."
    },
    "nosferatu": {
      "name": "Nosferatu",
      "description": "Párias terrivelmente deformados.",
      "bane": "Monstruosidade física.",
      "compulsion": "Criptofilia."
    },
    "toreador": {
      "name": "Toreador",
      "description": "Artistas obcecados pela beleza.",
      "bane": "Fixação estética extrema.",
      "compulsion": "Fixação Estética."
    },
    "tremere": {
      "name": "Tremere",
      "description": "Bruxos do sangue.",
      "bane": "Facilidade em ser laçado.",
      "compulsion": "Perfeccionismo."
    },
    "ventrue": {
      "name": "Ventrue",
      "description": "Aristocratas e reis.",
      "bane": "Preferência alimentar rara.",
      "compulsion": "Arrogância."
    },
    "banuhaqim": {
      "name": "Banu Haqim",
      "description": "Juízes e assassinos.",
      "bane": "Vício em sangue de vampiro.",
      "compulsion": "Julgamento."
    },
    "theministry": {
      "name": "O Ministério",
      "description": "Corruptores e libertadores.",
      "bane": "Vulnerabilidade a luzes fortes.",
      "compulsion": "Transgressão."
    },
    "lasombra": {
      "name": "Lasombra",
      "description": "Social Darwinistas das sombras.",
      "bane": "Sem reflexo.",
      "compulsion": "Ambição."
    },
    "ravnos": {
      "name": "Ravnos",
      "description": "Mestres da desorientação, os Trapaceiros preferem não lutar por algo que podem obter por métodos mais sutis.",
      "bane": "O fogo solar que incinerou seu fundador arde no Sangue do clã, irrompendo da sua carne caso se estabeleçam por muito tempo.",
      "compulsion": "Destino Tentador."
    },
    "salubri": {
      "name": "Salubri",
      "description": "Renomados por sua sabedoria e erudição, os Salubri são agora pouco mais do que uma desprezada nota de rodapé. Todo Salubri ostenta um terceiro olho na testa.",
      "bane": "Eles são caçados e seu Vitae é particularmente viciante para outros vampiros. Seu terceiro olho chora sangue sempre que usam um poder de Disciplina.",
      "compulsion": "Empatia Afetiva."
    },
    "tzimisce": {
      "name": "Tzimisce",
      "description": "Para os Tzimisce, possuir é tudo. Eles almejam conquistar e dominar o objeto da sua possessividade, vigiando-o com ciúmes comparável ao de um dragão.",
      "bane": "Os Tzimisce são enraizados: todo Tzimisce deve escolher uma posse específica e passar seu dia de sono cercado por ela.",
      "compulsion": "Cobiça."
    },
    "caitiff": {
      "name": "Caitiff",
      "description": "Vampiros sem clã.",
      "bane": "Evitados pela sociedade.",
      "compulsion": "Falta de Raízes."
    },
    "thinblood": {
      "name": "Sangue-Fraco",
      "description": "Quase humanos.",
      "bane": "Diversas debilidades.",
      "compulsion": "Isolamento."
    }
  },
  "lore": {
    "concept": "O Abraço não é um presente. Quem era você antes da escuridão?",
    "intro": "O Sangue é a Vida... e a Maldição.",
    "attributes": "Somos mais fortes, mas a Besta espreita.",
    "skills": "Imortalidade oferece tempo para mestria.",
    "finishing": "Somos definidos por como sobrevivemos."
  },
  "attributes": {
    "title": "Distribua Atributos",
    "subtitle": "Atribua valores da Reserva de Pontos aos seus atributos.",
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
    "title": "Distribua Perícias",
    "subtitle": "Clique nas Perícias para atribuir valores da reserva de pontos.",
    "paths": {
      "title": "Trilha de Perícias",
      "detected": "Trilha Detectada: {{path}}",
      "none": "Nenhuma trilha válida detectada",
      "multiple": "Trilhas Válidas: {{paths}}",
      "jackOfAllTrades": "Faz tudo",
      "balanced": "Equilibrado",
      "specialist": "Especialista"
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
    }
  },
  "finishingTouches": {
    "title": "Toques Finais",
    "disciplines": {
      "title": "Disciplinas",
      "subtitle": "Selecione os pontos e gerencie os poderes.",
      "selectPowers": "Selecionar Poderes",
      "powersSelected": "{{count}}/{{total}} Selecionados"
    },
    "gifts": {
      "subtitle": "Escolha seus Dons iniciais baseados em sua Tribo e Augúrio. Aloque 3 pontos no total."
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
    "touchstonesPlaceholder": "Descreva as pedras de toque e convicções do seu personagem..."
  },
  "characterSheet": {
    "name": "Nome",
    "clan": "Clã",
    "sire": "Senhor",
    "mentor": "Mentor",
    "concept": "Conceito",
    "ambition": "Ambição",
    "desire": "Desejo",
    "clanBane": "Perdição",
    "clanCompulsion": "Compulsão",
    "predatorType": "Predador",
    "generation": "Geração",
    "bloodPotency": "Potência do Sangue",
    "attributes": {
      "physical": "Físicos",
      "social": "Sociais",
      "mental": "Mentais"
    },
    "skills": {
      "physical": "Físicas",
      "social": "Sociais",
      "mental": "Mentais"
    },
    "disciplines": "Disciplinas",
    "gifts": "Dons",
    "vitals": "Sinais Vitais",
    "hunger": "Fome",
    "humanity": "Humanidade",
    "willpower": "Vontade",
    "health": "Vitalidade",
    "rage": "Fúria",
    "renown": "Renome",
    "glory": "Glória",
    "honor": "Honra",
    "wisdom": "Sabedoria",
    "gloryCredo": "Hei de ser valoroso, confiável, generoso, proteger os fracos e exterminar a Wyrm.",
    "honorCredo": "Hei de ser respeitoso, leal, justo, manter a palavra e aceitar todos os desafios justos.",
    "wisdomCredo": "Hei de aprender, ponderar, ser prudente, ser misericordioso, pensar antes de agir e ouvir antes de pensar.",
    "harano": "Harano",
    "hauglosk": "Hauglosk",
    "tribeBane": "Interdição da Tribo",
    "haranoDesc": "Desespero e desistência de servir a Gaia.",
    "haugloskDesc": "Fanatismo e perda de compaixão.",
    "desperateRage": "Fúria Desesperada",
    "desperateRageDesc": "Preencha um quadrado de Harano para elevar sua Fúria a 5. Uma vez por sessão.",
    "unrelentingWillpower": "Força de Vontade Implacável",
    "unrelentingWillpowerDesc": "Preencha um quadrado de Hauglosk para curar todo o dano à sua Força de Vontade. Uma vez por sessão.",
    "vexame": "Vexame",
    "vexameDesc": "Redução temporária de Renome por contrariar credos.",
    "rituals": "Rituais",
    "talismans": "Talismãs",
    "specialAbilities": "Habilidades Especiais",
    "advantages": "Vantagens",
    "flaws": "Defeitos",
    "specialties": "Especialidades",
    "touchstones": "Pedras de Toque",
    "gemini": {
      "title": "Assistente Gemini",
      "subtitle": "Desenvolva sua história com IA.",
      "generateBackstory": "Gerar História",
      "suggestPlotHooks": "Sugerir Ganchos",
      "describePortrait": "Descrever Retrato",
      "backstoryTitle": "História Gerada",
      "plotHookTitle": "Ganchos Gerados",
      "portraitTitle": "Retrato Gerado"
    }
  },
  "gemini": {
    "loading": "Gerando...",
    "errorGeneric": "Erro na geração.",
    "errorBackstory": "Falha ao gerar a história.",
    "errorPlotHook": "Falha ao gerar ganchos de trama.",
    "errorPortrait": "Falha ao gerar descrição do retrato.",
    "backstoryPrompt": "Escreva uma história.",
    "plotHookPrompt": "Gere três ganchos.",
    "portraitPrompt": "Descreva a aparência."
  },
  "compendium": {
    "level": "Nível",
    "lvl": "Nvl",
    "print": "Imprimir",
    "system": "Sistema",
    "dots": "pontos",
    "passive": "Passivo",
    "noCost": "Sem custo",
    "cost": "Custo",
    "requirements": "Requisitos",
    "dotsIncluded": "pontos inclusos",
    "dotsPenalty": "pontos de penalidade",
    "advantage": "Vantagem",
    "flaw": "Defeito",
    "predator": "Predador",
    "grantedBenefits": "Benefícios Concedidos",
    "potentialCosts": "Custos Potenciais",
    "favor": "Favor",
    "bane": "Perdição",
    "rouseCheck": "Teste de Sangue",
    "oneRouseCheck": "1 Teste de Sangue"
  },
  "predatorTypes": {
    "alleycat": {
      "name": "Gato de Beco",
      "description": "Você caça por emboscadas e violência física nas ruas."
    },
    "bagger": {
      "name": "Bolsista",
      "description": "Você obtém sangue de armazenamento a frio ou cenas de crime."
    },
    "consensualist": {
      "name": "Consensual",
      "description": "Você só se alimenta daqueles que permitem explicitamente."
    },
    "farmer": {
      "name": "Fazendeiro",
      "description": "Você se recusa a se alimentar de humanos, subsistindo de animais."
    },
    "osiris": {
      "name": "Osíris",
      "description": "Você lidera um culto ou círculo social que oferece sangue livremente."
    },
    "sandman": {
      "name": "Sandman",
      "description": "Você se alimenta de vítimas enquanto elas dormem."
    },
    "siren": {
      "name": "Sereia",
      "description": "Você usa sedução e beleza para encantar suas presas."
    },
    "noAdvantages": "Nenhuma vantagem estática concedida.",
    "noFlaws": "Nenhum defeito estático obrigatório.",
    "specialties": {
      "seduction": "Sedução",
      "stickups": "Assaltos",
      "grappling": "Agarrar",
      "blackMarket": "Mercado Negro",
      "lockpicking": "Arrombamento",
      "phlebotomy": "Flebotomia",
      "vessels": "Vasos",
      "animal": "Animal Específico",
      "hunting": "Caça",
      "specificTradition": "Tradição Específica",
      "anesthetics": "Anestésicos",
      "breakIn": "Invasão"
    }
  },
  "disciplines": {
    "animalism": {
      "name": "Animalismo",
      "description": "A habilidade de se comunicar e controlar animais.",
      "powers": {
        "bondFamulus": {
          "name": "Vínculo Famulus",
          "description": "Forme um vínculo místico com um animal companheiro.",
          "system": "Sem custo. O vínculo leva uma cena."
        },
        "senseTheBeast": {
          "name": "Sentir a Besta",
          "description": "Detecta a presença da Besta em outros.",
          "system": "Determinação + Animalismo vs Autocontrole + Lábia."
        },
        "feralWhispers": {
          "name": "Sussurros Selvagens",
          "description": "Comunica-se e emite comandos simples para animais.",
          "system": "Carisma + Trato com Animais. Custo: Um Teste de Sangue."
        },
        "feralFrenzy": {
          "name": "Frenesi Feral",
          "description": "Incita frenesi em animais próximos.",
          "system": "Manipulação + Animalismo vs Dificuldade. Custo: Um Teste de Sangue."
        },
        "huntTheBeast": {
          "name": "Caçar a Besta",
          "description": "Rastreia um alvo pelo cheiro de sua Besta.",
          "system": "Determinação + Animalismo vs Autocontrole + Lábia. Custo: Um Teste de Sangue."
        },
        "animalSucculence": {
          "name": "Suficiência Animal",
          "description": "Extrai mais nutrição do sangue animal.",
          "system": "Passivo. Sangue animal sacia 1 de Fome adicional."
        },
        "quellTheBeast": {
          "name": "Acalmar a Besta",
          "description": "Intimida e acalma a Besta em outros.",
          "system": "Carisma + Animalismo vs Determinação + Autocontrole."
        },
        "unlivingHive": {
          "name": "Colmeia Viva",
          "description": "Estende poderes de Animalismo a enxames de insetos.",
          "system": "Passivo. Permite insetos como famuli."
        },
        "howlOfRage": {
          "name": "Uivo de Fúria",
          "description": "Como Centelha de Fúria, mas usando Animalismo.",
          "system": "Manipulação + Animalismo. Custo: Um Teste de Sangue."
        },
        "markPrey": {
          "name": "Marcar Presa",
          "description": "Marca um alvo como prey para outros vampiros.",
          "system": "Carisma + Animalismo vs Autocontrole + Determinação. Custo: Um Teste de Sangue."
        },
        "subsumeTheSpirit": {
          "name": "Subjugar o Espírito",
          "description": "Possui o corpo de um animal companheiro.",
          "system": "Manipulação + Animalismo. Custo: Um Teste de Sangue."
        },
        "packFrenzy": {
          "name": "Frenesi de Matilha",
          "description": "Espalha um frenesi entre membros dispostos.",
          "system": "Raciocínio + Animalismo. Custo: Um Teste de Sangue."
        },
        "animalDominion": {
          "name": "Domínio Animal",
          "description": "Controla um enxame ou bando inteiro de animais.",
          "system": "Carisma + Animalismo. Custo: Um Teste de Sangue."
        },
        "drawingOutTheBeast": {
          "name": "Expulsar a Besta",
          "description": "Transfere seu próprio frenesi para outro alvo.",
          "system": "Raciocínio + Animalismo vs Autocontrole + Determinação."
        },
        "subsumeTheServant": {
          "name": "Subjugar o Servo",
          "description": "Transfere a mente para um ghoul com seu sangue.",
          "system": "Manipulação + Animalismo. Custo: Dois Testes de Sangue."
        },
        "umComATerra": {
          "name": "Um com a Terra",
          "description": "Experimenta estímulos da área próxima enquanto fundido.",
          "system": "Como Fusão com a Terra, mais estímulos sensoriais. Custo: Dois Testes de Sangue."
        }
      }
    },
    "auspex": {
      "name": "Auspícios",
      "description": "Sentidos sobrenaturais e percepção extra-sensorial.",
      "powers": {
        "heightenedSenses": {
          "name": "Sentidos Aguçados",
          "description": "Aguça seus sentidos mundanos a níveis sobre-humanos.",
          "system": "Sem custo. Adiciona nível aos testes de percepção."
        },
        "senseTheUnseen": {
          "name": "Sentir o Oculto",
          "description": "Detecta entidades ou poderes sobrenaturais ocultos.",
          "system": "Raciocínio + Auspícios vs Ofuscação ou dificuldade."
        },
        "lieDetector": {
          "name": "Detector de Mentiras",
          "description": "Sabe quando estão mentindo para você.",
          "system": "Passivo. Soma nível em testes de Intuição."
        },
        "readOpponent": {
          "name": "Ler Oponente",
          "description": "Lê intenções e pistas físicas sutis de oponentes.",
          "system": "Raciocínio + Auspícios vs Força + Lábia. Custo: Um Teste de Sangue."
        },
        "premonition": {
          "name": "Premonição",
          "description": "Recebe visões breves e crípticas do futuro próximo.",
          "system": "Determinação + Auspícios. Custo: Um Teste de Sangue (opcional)."
        },
        "obeah": {
          "name": "Obeah",
          "description": "O vampiro acalma um alvo emocionalmente agitado, restaurando-lhe um mínimo de equilíbrio.",
          "system": "Autocontrole + Auspícios contra Dificuldade 2 e restaura uma quantidade de níveis de dano Superficial à Força de Vontade igual à margem de sucesso. Custo: Um Teste de Sangue."
        },
        "decipher": {
          "name": "Decifrar",
          "description": "Entende qualquer língua ou código lendo a intenção.",
          "system": "Inteligência + Auspícios. Custo: Um Teste de Sangue."
        },
        "senseStrengthsAndWeaknesses": {
          "name": "Sentir Forças e Fraquezas",
          "description": "Avalia a aura para traços físicos e mentais.",
          "system": "Inteligência + Auspícios vs Autocontrole + Lábia. Custo: Um Teste de Sangue."
        },
        "scryTheSoul": {
          "name": "Vistoriar a Alma",
          "description": "Lê a aura e as emoções de um alvo.",
          "system": "Inteligência + Auspícios vs Autocontrole + Lábia."
        },
        "shareTheSenses": {
          "name": "Compartilhar Sentidos",
          "description": "Vê e ouve através dos sentidos de outro.",
          "system": "Determinação + Auspícios. Custo: Um Teste de Sangue."
        },
        "psychicBacklash": {
          "name": "Recuo Psíquico",
          "description": "Causa recuo mental em quem tenta controlar você.",
          "system": "Sempre que defender de manipulação mental. Custo: Um Teste de Sangue."
        },
        "scanTheRoom": {
          "name": "Vistoriar o Recinto",
          "description": "Investigação minuciosa de um local em momentos.",
          "system": "Raciocínio + Investigação + nível. Custo: Um Teste de Sangue."
        },
        "spiritsTouch": {
          "name": "Toque do Espírito",
          "description": "Lê impressões psíquicas deixadas em objetos.",
          "system": "Determinação + Auspícios. Número de sucessos define os detalhes."
        },
        "clairvoyance": {
          "name": "Clarividência",
          "description": "Projeta seus sentidos para um local distante.",
          "system": "Inteligência + Auspícios. Custo: Um Teste de Sangue."
        },
        "possession": {
          "name": "Possessão",
          "description": "Assume o controle do corpo de um mortal.",
          "system": "Determinação + Auspícios vs Determinação + Inteligência. Custo: Dois Testes de Sangue."
        },
        "telepathy": {
          "name": "Telepatia",
          "description": "Lê pensamentos profundos ou projeta sua voz em mentes.",
          "system": "Determinação + Auspícios vs Autocontrole + Lábia. Custo: Um Teste de Sangue."
        },
        "aliviandoAAlmaBestial": {
          "name": "Aliviando a Alma Bestial",
          "description": "Este poder compartilha uma porção da serenidade moral do vampiro com um Membro arrependido.",
          "system": "O vampiro passa uma cena isolado com o alvo e rola Autocontrole + Auspícios vs. A Humanidade do alvo. Para cada sucesso na margem, o vampiro pode remover uma Mácula do alvo, ou erguer um “escudo” psicológico. Custo: Dois Testes de Sangue, ganha uma Mácula."
        },
        "telekinesis": {
          "name": "Telecinese",
          "description": "Move objetos ou pessoas com a mente.",
          "system": "Determinação + Feitiçaria de Sangue vs Força + Atletismo. Custo: Um Teste de Sangue."
        }
      }
    },
    "celerity": {
      "name": "Rapidez",
      "description": "Velocidade, graça e reflexos sobrenaturais.",
      "powers": {
        "catsGrace": {
          "name": "Graça Felina",
          "description": "Equilíbrio e graça preternaturais.",
          "system": "Passivo. Imune a dano de queda de baixas alturas."
        },
        "rapidReflexes": {
          "name": "Reflexos Rápidos",
          "description": "O mundo desacelera para você.",
          "system": "Passivo. Sem penalidade para realizar uma ação menor."
        },
        "fleetness": {
          "name": "Agilidade",
          "description": "Move-se com velocidade ofuscante.",
          "system": "Adiciona nível a testes de Destreza fora de combate. Custo: Um Teste de Sangue."
        },
        "controlMomentum": {
          "name": "Controlar Impulso",
          "description": "Redireciona o ataque de um agressor para outro alvo.",
          "system": "Destreza ou Força + Rapidez vs Destreza + Atletismo. Custo: Um Teste de Sangue."
        },
        "blink": {
          "name": "Piscar",
          "description": "Move-se tão rápido que parece desaparecer.",
          "system": "Move-se para um alvo instantaneamente. Custo: Um Teste de Sangue."
        },
        "traversal": {
          "name": "Travessia",
          "description": "Corre por paredes ou líquidos em rajadas curtas.",
          "system": "Destreza + Atletismo. Custo: Um Teste de Sangue."
        },
        "combatTempest": {
          "name": "Tempestade de Combate",
          "description": "Enfrenta múltiplos oponentes sem penalidades.",
          "system": "Passivo enquanto ativo. Custo: Um Teste de Sangue."
        },
        "speedIsPower": {
          "name": "Velocidade é Poder",
          "description": "Soma impulso a uma única ação de força.",
          "system": "Soma metade da Rapidez em ação de Força. Custo: Um Teste de Sangue."
        },
        "draughtOfElegance": {
          "name": "Dose de Elegância",
          "description": "Compartilha sua velocidade através do seu sangue.",
          "system": "O consumidor ganha Rapidez nível 1. Custo: Um Teste de Sangue."
        },
        "unerringAim": {
          "name": "Mira Infalível",
          "description": "Precisão estranha com armas à distância.",
          "system": "A ação de Mirar torna-se instantânea. Custo: Um Teste de Sangue."
        },
        "furiousFrenzy": {
          "name": "Frenesi Furioso",
          "description": "Múltiplas ações por turno durante Frenesi.",
          "system": "Duas ações por turno. Qualquer Crítico é Crítico Bestial. Após frenesi, dano Superficial total. Custo: Grátis."
        },
        "longDistanceJourney": {
          "name": "Jornada de Longa Distância",
          "description": "Mantém altas velocidades para viagens longas.",
          "system": "Vigor + Rapidez vs Dificuldade 3. Custo: Um Teste de Sangue."
        },
        "lightningStrike": {
          "name": "Golpe Relâmpago",
          "description": "Ataca mais rápido do que um alvo pode reagir.",
          "system": "O alvo não pode se defender a menos que seja sobrenatural. Custo: Um Teste de Sangue."
        },
        "splitSecond": {
          "name": "Fração de Segundo",
          "description": "Reage a eventos que acabaram de acontecer.",
          "system": "Refaz os últimos segundos de ação. Custo: Um Teste de Sangue."
        }
      }
    },
    "dominate": {
      "name": "Dominação",
      "description": "O poder de controlar mentes através do contato visual.",
      "powers": {
        "cloudMemory": {
          "name": "Nublar Memória",
          "description": "Apaga os últimos minutos de memória.",
          "system": "Carisma + Dominação vs Raciocínio + Determinação."
        },
        "compel": {
          "name": "Compelir",
          "description": "Emite um comando imediato de ação única.",
          "system": "Carisma + Dominação vs Inteligência + Determinação."
        },
        "mesmerize": {
          "name": "Hipnotizar",
          "description": "Implanta sugestões hipnóticas complexas.",
          "system": "Manipulação + Dominação vs Inteligência + Determinação."
        },
        "dementation": {
          "name": "Demência",
          "description": "Estilhaça a sanidade de um alvo.",
          "system": "Manipulação + Dominação vs Autocontrole + Inteligência."
        },
        "favorDoDomitor": {
          "name": "Favor do Domitor",
          "description": "Enquanto condicionado por Favor do Domitor, um servo ligado a um vampiro por um Laço de Sangue descobre ser muito mais difícil agir contra seu mestre.",
          "system": "Rolagens de Desafio para servos teimosos são feitas com uma penalidade de três dados. Custo: Um Teste de Sangue."
        },
        "declareWeakness": {
          "name": "Declarar Fraqueza",
          "description": "Convence um alvo de que ele é fraco em um atributo.",
          "system": "Manipulação + Dominação vs Autocontrole + Inteligência. Custo: Um Teste de Sangue."
        },
        "implantDream": {
          "name": "Implantar Sonho",
          "description": "Implanta um sonho a ser vivido quando o alvo dormir.",
          "system": "Determinação + Dominação vs Autocontrole + Inteligência. Custo: Um Teste de Sangue."
        },
        "theForgetfulMind": {
          "name": "A Mente Esquecida",
          "description": "Reescreve permanentemente memórias de longo prazo.",
          "system": "Manipulação + Dominação vs Inteligência + Determinação."
        },
        "submergedDirective": {
          "name": "Diretiva Submersa",
          "description": "Comandos são acionados por uma palavra-chave mais tarde.",
          "system": "Melhoria passiva para Hipnotizar."
        },
        "objectCommand": {
          "name": "Comando de Objeto",
          "description": "Imprime um comando mental em um objeto.",
          "system": "Manipulação + Dominação vs Inteligência + Determinação. Custo: Um Teste de Sangue."
        },
        "rationalize": {
          "name": "Racionalizar",
          "description": "Vítimas acreditam que seus comandos foram ideias delas mesmas.",
          "system": "Melhoria passiva."
        },
        "mentalConditioning": {
          "name": "Condicionamento Mental",
          "description": "Quebra barreiras mentais pelo uso repetido.",
          "system": "Ganha brechas na mente da vítima. Custo: Um Teste de Sangue."
        },
        "massManipulation": {
          "name": "Manipulação em Massa",
          "description": "Domina múltiplos alvos simultaneamente.",
          "system": "Usa poderes em grupos. Custo: Um Teste de Sangue."
        },
        "terminalDecree": {
          "name": "Decreto Terminal",
          "description": "Comanda alvos a se ferirem ou morrerem.",
          "system": "Supera a autopreservação. Sem custo adicional."
        },
        "energyVampire": {
          "name": "Vampiro de Energia",
          "description": "Drena energia mental através da conversa.",
          "system": "Manipulação + Dominação vs Autocontrole + Determinação. Custo: Um Teste de Sangue."
        }
      }
    },
    "fortitude": {
      "name": "Fortitude",
      "description": "Resistência física e mental sobrenatural.",
      "powers": {
        "resilience": {
          "name": "Resiliência",
          "description": "Aumenta sua reserva de vitalidade física.",
          "system": "Passivo. Adiciona nível à Vitalidade."
        },
        "unswayableMind": {
          "name": "Mente Inabalável",
          "description": "Resiste a todas as formas de manipulação mental.",
          "system": "Passivo. Adiciona nível às paradas de dados de resistência."
        },
        "eternalVigilance": {
          "name": "Vigilância Eterna",
          "description": "Resiste aos efeitos do sono diurno.",
          "system": "Passivo. Soma nível em testes para ficar acordado."
        },
        "toughness": {
          "name": "Dureza",
          "description": "Subtrai dano de golpes físicos recebidos.",
          "system": "Subtrai nível do dano superficial recebido. Custo: Um Teste de Sangue."
        },
        "enduringBeasts": {
          "name": "Bestas Resistentes",
          "description": "Compartilha resistência com animais influenciados.",
          "system": "Vigor + Animalismo vs Dificuldade 3. Custo: Um Teste de Sangue."
        },
        "valeren": {
          "name": "Valeren",
          "description": "O vampiro projeta sua Fortitude para fora, ordenando que o poder do seu Sangue repare o corpo ferido de outro vampiro.",
          "system": "O vampiro testa Inteligência + Fortitude contra Dificuldade 2 e cura uma quantidade de níveis de dano Superficial à Vitalidade igual à margem do teste. Custo: Um Teste de Sangue."
        },
        "mentalVault": {
          "name": "Cofre Mental",
          "description": "Armazena e protege informações importantes para recordação perfeita.",
          "system": "Passivo. Bônus para proteger memórias de poderes mentais."
        },
        "defyBane": {
          "name": "Desafiar Perdição",
          "description": "Resiste ao fogo e à luz solar por um curto período.",
          "system": "Rebaixa Agravado para Superficial. Custo: Um Teste de Sangue."
        },
        "fortifyTheInnerFacade": {
          "name": "Fortificar a Fachada Interior",
          "description": "Esconde seus pensamentos e aura de Auspícios.",
          "system": "Passivo. Contesta leitores com Determinação + Fortitude."
        },
        "returnToSender": {
          "name": "Devolver ao Remetente",
          "description": "Expulsa violentamente objetos estranhos como estacas ou balas.",
          "system": "Vigor + Fortitude vs Destreza + Atletismo. Custo: Um Teste de Sangue."
        },
        "sleepLikeStone": {
          "name": "Sono de Pedra",
          "description": "Fortifica a forma enquanto em torpor.",
          "system": "Passivo. Trata todo dano como superficial em torpor."
        },
        "draughtOfEndurance": {
          "name": "Dose de Resistência",
          "description": "Compartilha sua resistência através do seu sangue.",
          "system": "O consumidor ganha Fortitude nível 1. Custo: Um Teste de Sangue."
        },
        "fleshOfMarble": {
          "name": "Carne de Mármore",
          "description": "Torna-se essencialmente invulnerável por um momento.",
          "system": "Ignora a primeira fonte de dano por turno. Custo: Um Teste de Sangue."
        },
        "prowessFromPain": {
          "name": "Proeza da Dor",
          "description": "Ganha poder enquanto seu corpo é quebrado.",
          "system": "Passivo. Ignora penalidades de ferimento e ganha bônus físicos."
        }
      }
    },
    "obfuscate": {
      "name": "Ofuscação",
      "description": "O poder de desaparecer da vista e dos sentidos.",
      "powers": {
        "cloakOfShadows": {
          "name": "Manto de Sombras",
          "description": "Torna-se invisível enquanto estiver perfeitamente parado.",
          "system": "Sem custo. Requer sombras ou cobertura."
        },
        "silenceOfDeath": {
          "name": "Silêncio da Morte",
          "description": "Silencia todo som que você faz.",
          "system": "Sem custo. Zona de silêncio ao redor do usuário."
        },
        "unseenPassage": {
          "name": "Passagem Oculta",
          "description": "Move-se enquanto permanece invisível.",
          "system": "Raciocínio + Ofuscação. Detecção requer Auspícios."
        },
        "chimerstry": {
          "name": "Quimerismo",
          "description": "O vampiro é capaz de criar breves, porém vívidas alucinações, distraindo e atraindo a atenção daqueles afetados.",
          "system": "O vampiro testa Manipulação + Ofuscação vs. Autocontrole + Raciocínio. Custo: Um Teste de Sangue."
        },
        "ghostInTheMachine": {
          "name": "Fantasma na Máquina",
          "description": "Seus poderes funcionam contra câmeras e microfones.",
          "system": "Melhoria passiva."
        },
        "maskOfAThousandFaces": {
          "name": "Máscara de Mil Faces",
          "description": "Assume uma aparência mundana diferente.",
          "system": "Manipulação + Performance. Custo: Um Teste de Sangue."
        },
        "fataMorgana": {
          "name": "Fata Morgana",
          "description": "O vampiro pode criar alucinações elaboradas, fazendo com que quaisquer alvos na sua vizinhança vejam, ouçam e sintam o que ele quiser.",
          "system": "O usuário realiza um teste de Manipulação + Ofuscação contra uma Dificuldade igual a 1 mais o número de sentidos afetados pela alucinação. Custo: Um Teste de Sangue."
        },
        "shapeAura": {
          "name": "Moldar Aura",
          "description": "Mascara sua verdadeira essência e dá leituras falsas.",
          "system": "Manipulação + Ofuscação vs Autocontrole + Prontidão. Custo: Um Teste de Sangue."
        },
        "duplicate": {
          "name": "Duplicata",
          "description": "Cria uma duplicata que espelha movimentos.",
          "system": "Autocontrole + Ofuscação. Custo: Um Teste de Sangue."
        },
        "conceal": {
          "name": "Ocultar",
          "description": "Encobre um objeto inanimado.",
          "system": "Inteligência + Ofuscação vs Dificuldade. Custo: Um Teste de Sangue."
        },
        "vanish": {
          "name": "Desvanecer",
          "description": "Desaparece instantaneamente, mesmo sendo observado.",
          "system": "Raciocínio + Ofuscação vs Raciocínio + Prontidão. Custo: Um Teste de Sangue."
        },
        "hiddenBlade": {
          "name": "Lâmina Oculta",
          "description": "Foca a ofuscação em uma única arma.",
          "system": "Raciocínio + Ofuscação vs Raciocínio + Prontidão. Custo: Um Teste de Sangue."
        },
        "cloakTheGathering": {
          "name": "Ocultar o Grupo",
          "description": "Estende sua invisibilidade para um grupo.",
          "system": "Esconde outros com você. Custo: Um Teste de Sangue."
        },
        "impostorsGuise": {
          "name": "Disfarce do Impostor",
          "description": "Imita perfeitamente uma pessoa específica.",
          "system": "Manipulação + Performance. Custo: Um Teste de Sangue."
        },
        "fadingMemory": {
          "name": "Memória Desvanecente",
          "description": "Mascara a própria memória de sua presença.",
          "system": "Determinação + Ofuscação vs Dificuldade. Custo: Um Teste de Sangue."
        },
        "mindPrison": {
          "name": "Prisão Mental",
          "description": "Prende uma pessoa em uma realidade falsa de sonho.",
          "system": "Determinação + Presença vs Inteligência + Determinação. Custo: Dois Testes de Sangue."
        }
      }
    },
    "potence": {
      "name": "Potência",
      "description": "Força sobrenatural e força destrutiva.",
      "powers": {
        "lethalBody": {
          "name": "Corpo Letal",
          "description": "Ataques desarmados tornam-se tão mortais quanto armas.",
          "system": "Passivo. Causa dano Agravado a mortais."
        },
        "soaringLeap": {
          "name": "Salto Planado",
          "description": "Salta distâncias incríveis.",
          "system": "Sem custo. Aumenta a distância de salto significativamente."
        },
        "prowess": {
          "name": "Proeza",
          "description": "Adiciona mais força a cada golpe.",
          "system": "Passivo. Adiciona nível ao dano de Força."
        },
        "brutalFeed": {
          "name": "Alimentação Brutal",
          "description": "Drena sangue com velocidade violenta em combate.",
          "system": "Força + Briga. Sacie a Fome instantaneamente."
        },
        "sparkOfRage": {
          "name": "Centelha de Fúria",
          "description": "Acende o frenesi naqueles ao seu redor.",
          "system": "Manipulação + Presença. Custo: Um Teste de Sangue."
        },
        "uncannyGrip": {
          "name": "Aperto Incomum",
          "description": "Grip and burrow extremities into almost any surface.",
          "system": "Sucedo automático para escalar. Custo: Um Teste de Sangue."
        },
        "fastballSpecial": {
          "name": "Especial Fastball",
          "description": "Arremessa aliados ou inimigos no combate.",
          "system": "Força + Potência. Custo: Um Teste de Sangue."
        },
        "draughtOfMight": {
          "name": "Dose de Poder",
          "description": "Compartilha sua força através do seu sangue.",
          "system": "O consumidor ganha Potência nível 1. Custo: Um Teste de Sangue."
        },
        "earthshock": {
          "name": "Terremoto",
          "description": "Golpeia o chão para criar uma onda de choque.",
          "system": "Força + Briga. Derruba alvos próximos. Custo: Um Teste de Sangue."
        },
        "fistOfCaine": {
          "name": "Punho de Caim",
          "description": "Projeta sua força em um golpe físico distante.",
          "system": "Ataca à distância com parada de combate corpo a corpo. Custo: Um Teste de Sangue."
        }
      }
    },
    "presence": {
      "name": "Presença",
      "description": "O poder de influenciar emoções e comandar a atenção.",
      "powers": {
        "awe": {
          "name": "Temor",
          "description": "Atrai e mantém a atenção dos outros.",
          "system": "Manipulação + Presença. Sem custo."
        },
        "daunt": {
          "name": "Intimidar",
          "description": "Projeta uma aura de ameaça aterrorizante.",
          "system": "Passivo. Adiciona nível a Intimidação."
        },
        "lingeringKiss": {
          "name": "Beijo Persistente",
          "description": "Torna sua mordida viciante para a vítima.",
          "system": "Passivo. A vítima fica obcecada pelo seu Beijo."
        },
        "subtleMessages": {
          "name": "Mensagens Subtis",
          "description": "Muda sutilmente o estado emocional de um alvo.",
          "system": "Manipulação + Presença vs Autocontrole + Raciocínio. Custo: Um Teste de Sangue."
        },
        "dreadGaze": {
          "name": "Olhar Aterrador",
          "description": "Instila terror esmagador com um olhar.",
          "system": "Carisma + Presença vs Autocontrole + Determinação."
        },
        "entrancement": {
          "name": "Transe",
          "description": "Torna um alvo completamente apaixonado por você.",
          "system": "Carisma + Presença vs Autocontrole + Determinação. Custo: Um Teste de Sangue."
        },
        "throneRoom": {
          "name": "Sala do Trono",
          "description": "Arranja um espaço para amplificar a influência.",
          "system": "Ofícios + Presença. Custo: Um Teste de Sangue."
        },
        "obsession": {
          "name": "Obsessão",
          "description": "Cria um senso de obsessão em um alvo em direção a um foco.",
          "system": "Manipulação + Presença vs Inteligência + Autocontrole. Custo: Um Teste de Sangue."
        },
        "irresistibleVoice": {
          "name": "Voz Irresistível",
          "description": "Usa poderes de Presença apenas através da voz.",
          "system": "Passivo. Não requer mais contato visual."
        },
        "summon": {
          "name": "Convocar",
          "description": "Compele alguém que você conheceu a vir até você.",
          "system": "Manipulação + Presença. Custo: Um Teste de Sangue."
        },
        "twistWords": {
          "name": "Distorcer Palavras",
          "description": "Usa as palavras de um oponente contra ele diante de uma audiência.",
          "system": "Intuição + Presença vs Social. Custo: Um Teste de Sangue."
        },
        "hideousLaughter": {
          "name": "Gargalhada Atroz",
          "description": "Instila uma gargalhada paralisante e histérica.",
          "system": "Carisma + Presença vs Autocontrole + Raciocínio. Custo: Um Teste de Sangue."
        },
        "majesty": {
          "name": "Majestade",
          "description": "Irradia uma aura de autoridade divina absoluta.",
          "system": "Alvos não podem agir contra você. Custo: Um Teste de Sangue."
        },
        "starMagnetism": {
          "name": "Magnetismo Estelar",
          "description": "Sua Presença é tão forte que afeta as pessoas até via mídia.",
          "system": "Passivo. Funciona via TV, fotos, etc."
        }
      }
    },
    "protean": {
      "name": "Metamorfose",
      "description": "A Disciplina da mudança de forma.",
      "powers": {
        "eyesOfTheBeast": {
          "name": "Olhos da Besta",
          "description": "Vê na escuridão total.",
          "system": "Sem custo. Olhos brilham em vermelho."
        },
        "weightOfTheFeather": {
          "name": "Peso da Pena",
          "description": "Torna-se quase sem peso.",
          "system": "Sem custo. Cai com segurança de qualquer altura."
        },
        "shedSkin": {
          "name": "Troca de Pele",
          "description": "Desprende a pele danificada para parecer intocado fisicamente.",
          "system": "Realizado durante o descanso. Custo: Um Teste de Sangue."
        },
        "feralWeapons": {
          "name": "Armas Selvagens",
          "description": "Cresce garras e presas cruéis.",
          "system": "Ataques desarmados causam dano Agravado. Custo: Um Teste de Sangue."
        },
        "vicissitude": {
          "name": "Vicissitude",
          "description": "Este poder permite que o vampiro exija que sua própria carne o obedeça.",
          "system": "Teste Determinação + Metamorfose. Cada sucesso permite uma alteração. Custo: Um Teste de Sangue."
        },
        "earthMeld": {
          "name": "Fusão com a Terra",
          "description": "Mergulha na terra para segurança.",
          "system": "Deve ser solo natural. Custo: Um Teste de Sangue."
        },
        "shapechange": {
          "name": "Mudança de Forma",
          "description": "Transforma-se em um animal predador.",
          "system": "Vigor + Metamorfose. Custo: Um Teste de Sangue."
        },
        "modelagemDeCarne": {
          "name": "Modelagem de Carne",
          "description": "Estendendo sua maestria sobre a carne para corpos de terceiros.",
          "system": "Determinação + Metamorfose vs Vigor + Determinação. Custo: Um Teste de Sangue."
        },
        "toolsOfNature": {
          "name": "Ferramentas da Natureza",
          "description": "Mimetiza características fisiológicas complexas de animais.",
          "system": "Raciocínio + Metamorfose vs Dificuldade. Custo: Um Teste de Sangue."
        },
        "metamorphosis": {
          "name": "Metamorfose",
          "description": "Assume formas mais variadas ou monstruosas.",
          "system": "Melhoria passiva para Mudança de Forma."
        },
        "formaHedionda": {
          "name": "Forma Hedionda",
          "description": "Assume uma forma monstruosa completa, visão da Besta encarnada.",
          "system": "Concede alterações livres de Vicissitude. Custo: Um Teste de Sangue."
        },
        "swarmForm": {
          "name": "Forma de Enxame",
          "description": "Transforma-se instantaneamente em um enxame de pequenas criaturas.",
          "system": "Vigor + Metamorfose. Custo: Um Teste de Sangue."
        },
        "traverseTheEarth": {
          "name": "Atravessar a Terra",
          "description": "Viaja através da terra natural enquanto fundido.",
          "system": "Velocidade de caminhada através da terra. Custo: Um Teste de Sangue."
        },
        "mistForm": {
          "name": "Forma de Névoa",
          "description": "Transforma-se em uma nuvem viva de vapor.",
          "system": "Vigor + Metamorfose. Custo: Um Teste de Sangue."
        },
        "theUnfetteredHeart": {
          "name": "O Coração Livre",
          "description": "Seus órgãos internos se movem para evitar estacas.",
          "system": "Passivo. Mais difícil de estacar o usuário."
        },
        "umComATerra": {
          "name": "Um com a Terra",
          "description": "Experimenta estímulos da área próxima enquanto fundido.",
          "system": "Como Fusão com a Terra, mais estímulos sensoriais. Custo: Dois Testes de Sangue."
        }
      }
    },
    "bloodsorcery": {
      "name": "Feitiçaria de Sangue",
      "description": "Magia antiga alimentada pelo sangue de Caim.",
      "powers": {
        "corrosiveVitae": {
          "name": "Vitae Corrosiva",
          "description": "Transforma seu sangue em um ácido poderoso.",
          "system": "Um Teste de Sangue. Derrete material não-vivo."
        },
        "aTasteForBlood": {
          "name": "Um Gosto por Sangue",
          "description": "Aprende os traços de um alvo provando seu sangue.",
          "system": "Sem rolagem. Aprende Clã, Geração, etc."
        },
        "extinguishVitae": {
          "name": "Extinguir Vitae",
          "description": "Faz o sangue de outro vampiro tornar-se inerte.",
          "system": "Inteligência + Feitiçaria de Sangue. Custo: Um Teste de Sangue."
        },
        "bloodObject": {
          "name": "Objeto de Sangue",
          "description": "Solidifica sangue em formas simples.",
          "system": "Ofícios + Feitiçaria de Sangue. Custo: Um ou mais Testes de Sangue."
        },
        "bloodTendrils": {
          "name": "Tentáculos de Sangue",
          "description": "Manipula sangue em tentáculos maleáveis.",
          "system": "Raciocínio + Feitiçaria de Sangue. Custo: Um Teste de Sangue."
        },
        "bloodOfPotency": {
          "name": "Sangue de Potência",
          "description": "Aumenta temporariamente sua Potência do Sangue.",
          "system": "Um Teste de Sangue. Ganha +1 de Potência do Sangue."
        },
        "scorpionsTouch": {
          "name": "Toque do Escorpião",
          "description": "Transforma seu sangue em uma toxina paralisante.",
          "system": "Um Teste de Sangue. Aplicado via toque/ferida."
        },
        "diluteTheLine": {
          "name": "Diluir a Linhagem",
          "description": "Diminui a Potência do Sangue de outro vampiro.",
          "system": "Inteligência + Feitiçaria de Sangue vs Determinação + Vigor. Custo: Um Teste de Sangue."
        },
        "healersBane": {
          "name": "Perdição do Curandeiro",
          "description": "Corrompe as propriedades de cura do sangue de outro.",
          "system": "Determinação + Feitiçaria de Sangue vs Vigor + Ocultismo. Custo: Um Teste de Sangue."
        },
        "theftOfVitae": {
          "name": "Roubo de Vitae",
          "description": "Extrai sangue diretamente de um alvo para você.",
          "system": "Raciocínio + Feitiçaria de Sangue. Custo: Um Teste de Sangue."
        },
        "crimsonFury": {
          "name": "Fúria Carmesim",
          "description": "Leva quem bebe seu sangue ao Frenesi.",
          "system": "Manipulação + Feitiçaria de Sangue vs Autocontrole + Vigor. Custo: Um Teste de Sangue."
        },
        "curseOfTheSlowBlood": {
          "name": "Maldição do Sangue Lento",
          "description": "Exige testes de sangue adicionais para dons.",
          "system": "Determinação + Feitiçaria de Sangue vs Vigor + Autocontrole. Custo: Um Teste de Sangue."
        },
        "baalsCaress": {
          "name": "Carícia de Baal",
          "description": "Cobre sua arma com sangue fervente e mortal.",
          "system": "A arma causa dano Agravado. Custo: Um Teste de Sangue."
        },
        "cauldronOfBlood": {
          "name": "Caldeirão de Sangue",
          "description": "Ferve o sangue dentro das veias de uma vítima.",
          "system": "Determinação + Feitiçaria de Sangue vs Vigor + Fortitude. Dano Agravado massivo."
        },
        "telekinesis": {
          "name": "Telecinese",
          "description": "Move objetos ou pessoas com a mente.",
          "system": "Determinação + Feitiçaria de Sangue vs Força + Atletismo. Custo: Um Teste de Sangue."
        }
      }
    },
    "oblivion": {
      "name": "Olvido",
      "description": "Comando sobre o abismo e as sombras.",
      "powers": {
        "shadowCloak": {
          "name": "Manto de Sombras",
          "description": "Envolve-se em escuridão para auxiliar a furtividade.",
          "system": "Sem custo. Adiciona nível a Furtividade."
        },
        "oblivionsSight": {
          "name": "Visão do Olvido",
          "description": "Vê na escuridão absoluta e detecta fantasmas.",
          "system": "Um Teste de Sangue por cena."
        },
        "armsOfAhriman": {
          "name": "Braços de Ahriman",
          "description": "Convoca tentáculos de sombra para atacar ou agarrar.",
          "system": "Destreza + Olvido. Custo: Um Teste de Sangue."
        },
        "shadowCast": {
          "name": "Projeção Sombria",
          "description": "Projeta sua sombra independentemente.",
          "system": "Manipulação + Olvido. Sem custo."
        },
        "abyssalPulse": {
          "name": "Pulso Abissal",
          "description": "Desativa equipamentos eletrônicos em uma área.",
          "system": "Raciocínio + Olvido vs Dificuldade. Custo: Um Teste de Sangue."
        },
        "touchOfOblivion": {
          "name": "Toque do Olvido",
          "description": "Murcha carne e osso com um toque frio.",
          "system": "Força + Olvido vs Vigor + Fortitude. Um Teste de Sangue."
        },
        "shadowPuppet": {
          "name": "Fantoche de Sombra",
          "description": "Controla a sombra de outro e mimetiza ações.",
          "system": "Determinação + Olvido vs Determinação + Autocontrole. Custo: Um Teste de Sangue."
        },
        "stygianShroud": {
          "name": "Mortalha Estígia",
          "description": "Cria uma nuvem de privação sensorial absoluta.",
          "system": "Determinação + Olvido. Custo: Um Teste de Sangue."
        },
        "tenebrousAvatar": {
          "name": "Avatar Tenebroso",
          "description": "Transforma-se em uma sombra viva.",
          "system": "Vigor + Olvido. Custo: Dois Testes de Sangue."
        }
      }
    },
    "thinbloodalchemy": {
      "name": "Alquimia de Sangue-Fraco",
      "description": "A química improvisada dos sangue-fraco.",
      "powers": {
        "farReach": {
          "name": "Longo Alcance",
          "description": "Telecinese simples via vapores alquímicos.",
          "system": "Inteligência + Alquimia. Um Teste de Sangue."
        },
        "haze": {
          "name": "Neblina",
          "description": "Cria campo de névoa para obscurecer silhueta.",
          "system": "Penalidade para ataques à distância. Custo: Um Teste de Sangue."
        },
        "profaneHierosGamos": {
          "name": "Hieros Gamos Profano",
          "description": "Muda o gênero ou aparência física.",
          "system": "Permanente até ser realizado novamente. Custo: Processo de cozimento."
        },
        "envelop": {
          "name": "Envolver",
          "description": "Névoa que se agarra à vítima e a cega.",
          "system": "Raciocínio + Alquimia vs Vigor + Sobrevivência. Custo: Um Teste de Sangue."
        },
        "defractionate": {
          "name": "Defracionar",
          "description": "Elixir homeopático para atualizar sangue fracionado.",
          "system": "Rolagem de destilação determina bolsas. Custo: Processo de cozimento."
        },
        "airborneMomentum": {
          "name": "Momento Aéreo",
          "description": "Poção que permite voo limitado ou flutuação.",
          "system": "Força + Alquimia vs Destreza + Atletismo. Custo: Um Teste de Sangue."
        },
        "awakenTheSleeper": {
          "name": "Despertar o Adormecido",
          "description": "Elixir que pode despertar um vampiro do Torpor.",
          "system": "Sucessos determinam limite de Potência do Sangue. Custo: Processo de cozimento."
        }
      }
    },
    "ragabashgifts": {
      "name": "Dons de Ragabash",
      "description": "Dons da Lua Nova, focados em trapaça e subversão.",
      "powers": {
        "blurOfTheMilkyEye": {
          "name": "Borrão do Olhar Enevoado",
          "description": "Torne-se um borrão para os sentidos.",
          "system": "Raciocínio + Furtividade. Passivo."
        },
        "liarsFace": {
          "name": "Rosto do Mentiroso",
          "description": "Suas mentiras são impossíveis de detectar.",
          "system": "Manipulação + Subterfúgio. Passivo."
        }
      }
    },
    "theurgegifts": {
      "name": "Dons de Theurge",
      "description": "Dons da Lua Crescente, focados em espíritos e na Umbra.",
      "powers": {
        "senseWyrm": {
          "name": "Sentir a Wyrm",
          "description": "Detecta a presença da Wyrm.",
          "system": "Inteligência + Ocultismo. Sem custo."
        },
        "spiritSpeech": {
          "name": "Fala dos Espíritos",
          "description": "Comunica-se com espíritos.",
          "system": "Carisma + Intuição. Sem custo."
        }
      }
    },
    "philodoxgifts": {
      "name": "Dons de Philodox",
      "description": "Dons da Meia-Lua, focados em equilíbrio e julgamento.",
      "powers": {
        "kingOfTheBeasts": {
          "name": "Rei das Feras",
          "description": "Comanda animais com autoridade.",
          "system": "Carisma + Empatia com Animais. Sem custo."
        },
        "truthOfGaia": {
          "name": "Verdade de Gaia",
          "description": "Sente se alguém está mentindo.",
          "system": "Inteligência + Intuição vs Manipulação + Subterfúgio."
        }
      }
    },
    "galliardgifts": {
      "name": "Dons de Galliard",
      "description": "Dons da Lua Gibosa, focados em saber e inspiração.",
      "powers": {
        "callOfTheWyld": {
          "name": "Chamado do Selvagem",
          "description": "Comunica-se a longas distâncias uivando.",
          "system": "Vigor + Performance. Sem custo."
        },
        "mindspeak": {
          "name": "Fala Mental",
          "description": "Projeta pensamentos nas mentes de outros.",
          "system": "Manipulação + Empatia. Custo: 1 teste de Fúria."
        }
      }
    },
    "ahroungifts": {
      "name": "Dons de Ahroun",
      "description": "Dons da Lua Cheia, focados em combate e liderança.",
      "powers": {
        "fallingTouch": {
          "name": "Toque de Queda",
          "description": "Derruba um oponente com um toque.",
          "system": "Destreza + Medicina. Custo: 1 teste de Fúria."
        },
        "senseSilver": {
          "name": "Sentir Prata",
          "description": "Detecta a presença de prata.",
          "system": "Percepção + Instinto Primitivo. Passivo."
        }
      }
    },
    "blackfuriesgifts": {
      "name": "Dons das Fúrias Negras",
      "description": "Dons das Fúrias Negras, focados em justiça e natureza.",
      "powers": {
        "breathOfTheWyld": {
          "name": "Sopro do Selvagem",
          "description": "Incita uma multidão à ação.",
          "system": "Carisma + Liderança. Custo: 1 teste de Fúria."
        },
        "heightenedSenses": {
          "name": "Sentidos Aguçados",
          "description": "Aguça todos os sentidos.",
          "system": "Passivo. Adiciona nível aos testes de percepção."
        }
      }
    },
    "bonegnawersgifts": {
      "name": "Dons dos Roedores de Ossos",
      "description": "Dons dos Roedores de Ossos, focados em sobrevivência urbana.",
      "powers": {
        "cooking": {
          "name": "Cozinhar",
          "description": "Transforma qualquer coisa em comida comestível.",
          "system": "Inteligência + Sobrevivência. Sem custo."
        },
        "scentOfSweetSuccess": {
          "name": "Cheiro do Sucesso Doce",
          "description": "Sabe exatamente o que dizer para ter sucesso.",
          "system": "Manipulação + Etiqueta. Passivo."
        }
      }
    },
    "childrenofgaiagifts": {
      "name": "Dons dos Filhos de Gaia",
      "description": "Dons dos Filhos de Gaia, focados em cura e paz.",
      "powers": {
        "dazzle": {
          "name": "Ofuscar",
          "description": "Sobrecarrega um alvo com beleza e luz.",
          "system": "Carisma + Performance vs Compostura + Determinação."
        },
        "resistPain": {
          "name": "Resistir à Dor",
          "description": "Ignora penalidades por ferimentos.",
          "system": "Passivo. Ignora penalidades por uma cena."
        }
      }
    },
    "fiandeirosdevidrogifts": {
      "name": "Dons dos Fiandeiros de Vidro",
      "description": "Dons dos Fiandeiros de Vidro, focados em espíritos e na Umbra.",
      "powers": {
        "spiritSpeech": {
          "name": "Fala dos Espíritos",
          "description": "Comunica-se com espíritos.",
          "system": "Carisma + Intuição. Sem custo."
        },
        "umbralTether": {
          "name": "Vínculo Umbral",
          "description": "Cria um link para retornar da Umbra.",
          "system": "Inteligência + Ocultismo. Sem custo."
        }
      }
    },
    "andarilhosdoasfaltogifts": {
      "name": "Dons dos Andarilhos do Asfalto",
      "description": "Dons dos Andarilhos do Asfalto, focados em tecnologia.",
      "powers": {
        "controlSimpleMachine": {
          "name": "Controlar Máquina Simples",
          "description": "Manipula dispositivos mecânicos.",
          "system": "Manipulação + Tecnologia. Sem custo."
        },
        "plugAndPlay": {
          "name": "Conectar e Usar",
          "description": "Interface com qualquer dispositivo eletrônico.",
          "system": "Inteligência + Tecnologia. Passivo."
        }
      }
    },
    "criadefenrisgifts": {
      "name": "Dons da Cria de Fenris",
      "description": "Dons da Cria de Fenris, focados em combate e brutalidade.",
      "powers": {
        "resistPain": {
          "name": "Resistir à Dor",
          "description": "Ignora penalidades por ferimentos.",
          "system": "Passivo. Ignora penalidades por uma cena."
        },
        "furiousStrike": {
          "name": "Pancada Furiosa",
          "description": "Concentra Fúria nos golpes.",
          "system": "Soma Glória a uma parada de Briga. Custo: 1 checagem de Fúria."
        }
      }
    },
    "wendigogifts": {
      "name": "Dons dos Wendigo",
      "description": "Dons dos Wendigo, focados em rastreamento e frio.",
      "powers": {
        "beastSpeech": {
          "name": "Fala das Feras",
          "description": "Fala com qualquer animal.",
          "system": "Carisma + Empatia com Animais. Sem custo."
        },
        "tracklessStep": {
          "name": "Passo Sem Rastro",
          "description": "Não deixa rastro para trás.",
          "system": "Destreza + Furtividade. Passivo."
        }
      }
    },
    "redtalonsgifts": {
      "name": "Dons dos Garras Vermelhas",
      "description": "Dons dos Garras Vermelhas, focados no selvagem e predadores.",
      "powers": {
        "beastLife": {
          "name": "Vida das Feras",
          "description": "Comunica-se e lidera animais.",
          "system": "Carisma + Empatia com Animais. Sem custo."
        },
        "hiddenKiller": {
          "name": "Assassino Oculto",
          "description": "Oculta as evidências de uma matança.",
          "system": "Inteligência + Furtividade. Passivo."
        }
      }
    },
    "shadowlordsgifts": {
      "name": "Dons dos Senhores das Sombras",
      "description": "Dons dos Senhores das Sombras, focados em dominância e sombras.",
      "powers": {
        "auraOfConfidence": {
          "name": "Aura de Confiança",
          "description": "Projeta auto-segurança absoluta.",
          "system": "Manipulação + Subterfúgio. Passivo."
        },
        "fatalFlaw": {
          "name": "Falha Fatal",
          "description": "Sente a fraqueza de um alvo.",
          "system": "Percepção + Intuição. Sem custo."
        }
      }
    },
    "silverfangsgifts": {
      "name": "Dons dos Presas de Prata",
      "description": "Dons dos Presas de Prata, focados em liderança e nobreza.",
      "powers": {
        "falconsGrasp": {
          "name": "Garra do Falcão",
          "description": "Seu aperto é inquebrável.",
          "system": "Força + Briga. Passivo."
        },
        "senseWyrm": {
          "name": "Sentir a Wyrm",
          "description": "Detecta a presença da Wyrm.",
          "system": "Inteligência + Ocultismo. Sem custo."
        }
      }
    },
    "silentstridersgifts": {
      "name": "Dons dos Peregrinos Silenciosos",
      "description": "Dons dos Peregrinos Silenciosos, focados em viagens e mensagens.",
      "powers": {
        "speedOfThought": {
          "name": "Velocidade do Pensamento",
          "description": "Dobra sua velocidade de movimento.",
          "system": "Passivo. Dobra velocidade terrestre."
        },
        "messengersFortitude": {
          "name": "Fortitude do Mensageiro",
          "description": "Viaja por dias sem descanso.",
          "system": "Vigor + Atletismo. Sem custo."
        }
      }
    },
    "innategifts": {
      "name": "Dons Inatos",
      "description": "Dons disponíveis para todos os Garou.",
      "powers": {
        "olharDesconcertante": {
          "name": "Olhar Desconcertante",
          "description": "Estabelece dominância no topo da cadeia alimentar.",
          "system": "Carisma + Honra vs Autocontrole + Determinação. Alvo se encolhe ou demonstra submissão."
        },
        "olhosDaCoruja": {
          "name": "Olhos da Coruja",
          "description": "Enxerga na escuridão completa.",
          "system": "Enxerga em escuridão natural. Bônus de Sabedoria para resistir a trevas sobrenaturais."
        },
        "pancadaFuriosa": {
          "name": "Pancada Furiosa",
          "description": "Concentra Fúria nos golpes.",
          "system": "Soma Glória a uma parada de Briga. Custo: 1 checagem de Fúria."
        },
        "pesDeGato": {
          "name": "Pés de Gato",
          "description": "Equilíbrio e agilidade sobrenaturais.",
          "system": "Sucesso automático em equilíbrio. Imune a dano de queda (10x Honra em metros)."
        },
        "saltoDaLebre": {
          "name": "Salto da Lebre",
          "description": "Salta grandes distâncias.",
          "system": "Força + Glória. 3m horizontal ou 2m vertical por sucesso."
        },
        "sentidosCrepusculares": {
          "name": "Sentidos Crepusculares",
          "description": "Sintonia com o reino físico e a Umbra simultaneamente.",
          "system": "Inteligência + Sabedoria. Interage com habitantes de ambos os mundos."
        },
        "skinLaceration": {
          "name": "Pele Dilacerada",
          "description": "Sacrifique vitalidade para transformação.",
          "system": "Sacrifique Vitalidade em vez de checagens de Fúria para transformação."
        },
        "lycanthropeBite": {
          "name": "Mordida do Licantropo",
          "description": "Mordida torna a vítima agressiva.",
          "system": "Teste Manipulação + Glória vs Autocontrole + Determinação."
        },
        "urbanHunter": {
          "name": "Caçador Urbano",
          "description": "Bônus para rastreamento em cidades.",
          "system": "Adiciona metade de Sabedoria a testes de rastreamento em ambientes urbanos."
        },
        "corruptedMemories": {
          "name": "Memórias Corrompidas",
          "description": "Substitui memórias de si mesmo em outros.",
          "system": "Teste Inteligência + Sabedoria vs Raciocínio + Determinação."
        },
        "cuttingWords": {
          "name": "Palavras Cortantes",
          "description": "Angústia mental causa sangramento.",
          "system": "Teste Manipulação + Honra vs Autocontrole + Inteligência."
        },
        "hungryTeeth": {
          "name": "Dentes Famintos",
          "description": "Morda espíritos para absorver essência.",
          "system": "Dano bônus contra espíritos; recupera Força de Vontade ao matar."
        },
        "wyrmSpeech": {
          "name": "Fala-da-Wyrm",
          "description": "Voz como arma contra espíritos.",
          "system": "Teste Carisma + Glória vs Autocontrole + Determinação."
        },
        "mouthFullOfTeeth": {
          "name": "Boca Cheia de Dentes",
          "description": "Multiplica dentes para dano extra.",
          "system": "Dano bônus que diminui a cada mordida."
        }
      }
    },
    "werewolfRituals": {
      "abjuration": {
        "name": "Ritual de Abjuração",
        "description": "Purifica pessoa, lugar ou objeto de possessão espiritual."
      },
      "patronage": {
        "name": "Ritual de Apadrinhamento",
        "description": "Adota um Espírito Padroeiro para a alcateia."
      },
      "seekKin": {
        "name": "Ritual de Buscar Parentes",
        "description": "Localiza um Garou emergente antes que ele faça mal."
      },
      "livingCaern": {
        "name": "Ritual do Caern Vivente",
        "description": "Revigora e renova a ligação espiritual de um Caern."
      },
      "social": {
        "ceremonyForDead": {
          "name": "Cerimônia pelos Falecidos",
          "description": "Homenageia aqueles que morreram recentemente."
        },
        "conquest": {
          "name": "Ritual de Conquista",
          "description": "Homenageia as provações e a posição de uma Garou."
        },
        "winterWolf": {
          "name": "Ritual do Lobo do Inverno",
          "description": "Fim solene para quem está velho ou ferido demais para lutar."
        }
      }
    },
    "werewolfTalismans": {
      "spiritCatcher": {
        "name": "Apanhador de Espíritos",
        "description": "Impede um espírito de sair de perto do garou."
      },
      "windWhistle": {
        "name": "Apito para Vento",
        "description": "Suscita rajada de vento para cobrir rastros."
      },
      "klaive": {
        "name": "Klaive",
        "description": "Adaga de prata usada no combate ritualístico."
      },
      "tearOfGaia": {
        "name": "Lágrima de Gaia",
        "description": "Fósseis raros que podem reduzir Harano ou Hauglosk."
      },
      "heraldHorn": {
        "name": "Chifre do Arauto",
        "description": "Convoca membros da alcateia e indica caminhos seguros."
      },
      "kingBrennusHammer": {
        "name": "Martelo do Rei Brennus",
        "description": "Martelo de guerra ancestral, letal contra Dançarinos da Espiral Negra."
      },
      "heatStone": {
        "name": "A Pedra do Calor",
        "description": "Pedra radioativa que inibe qualquer forma de cura."
      },
      "assassinCrown": {
        "name": "A Coroa do Assassino",
        "description": "Aumenta a Fúria e impede a perda do lobo."
      },
      "ironAxe": {
        "name": "O Machado de Ferro",
        "description": "Sacrifique vitalidade para causar dano extra."
      },
      "boneScourge": {
        "name": "O Flagelo de Osso",
        "description": "Chicote que inflige dano à Força de Vontade."
      }
    }
  },
  "advantages": {
    "resources": {
      "name": "Recursos"
    },
    "allies": {
      "name": "Aliados"
    },
    "contacts": {
      "name": "Contatos"
    },
    "fame": {
      "name": "Fama"
    },
    "haven": {
      "name": "Refúgio"
    },
    "herd": {
      "name": "Rebanho"
    },
    "influence": {
      "name": "Influência"
    },
    "beautiful": {
      "name": "Belo"
    },
    "bloodhound": {
      "name": "Faro de Sangue"
    },
    "safehouse": {
      "name": "Aparelho",
      "hidden": "Escondido: -2 dados para ser localizado.",
      "secure": "Seguro: +2 dados para resistir a entradas não autorizadas."
    },
    "caern": {
      "name": "Caern",
      "access": "Acesso: Permissão para usar um Caern específico.",
      "awakened": "Desperto: Parte de uma fratria com um Caern potente."
    },
    "job": {
      "name": "Emprego",
      "basic": "Básico: Fornece um álibi ou disfarce.",
      "confirmed": "Confirmado: Colegas corroboram seu disfarce."
    },
    "linguistics": {
      "name": "Linguística",
      "desc": "Cada ponto permite fluência em um idioma adicional."
    },
    "moon": {
      "refreshed": "Revigorado pela Lua: Recupera 1 de Vontade ao uivar para a lua.",
      "stoked": "Atiçado pela Lua: Ganha +1 de Fúria ao uivar para a lua."
    },
    "visual": {
      "goodwolfy": "Lupino Bonzinho: Sua forma lupina parece um cachorro.",
      "stunning": "Deslumbrante: +2 dados em testes Sociais apropriados.",
      "imposingGlabro": "Glabro Imponente: Sua forma glabro é mais musculosa e definida. Sem penalidade Social."
    },
    "metamorphosis": {
      "name": "Metamorfose",
      "lunaResilience": "Resiliência de Luna: Ganha duas caixas de Vitalidade adicionais nas formas Glabro e Hispo."
    },
    "supernatural": {
      "name": "Sobrenatural",
      "formMastery": "Domínio Sobre as Formas: Estende o uso de um Dom para a forma hominídea ou lupina."
    },
    "heritage": {
      "name": "Herança Selvagem",
      "thickSkin": "Pele Espessa: Sua Vitalidade é 4 + Vigor, em vez de 3 + Vigor."
    },
    "mask": {
      "name": "Máscara",
      "zeroed": "Zerado: Registros reais apagados.",
      "cobbler": "Sapateiro: Pode criar Máscaras."
    },
    "spiritpact": {
      "name": "Pacto Espiritual",
      "companion": "Acompanhante: O espírito pode segui-lo em toda parte.",
      "host": "Hospedeiro: O espírito tem um corpo físico."
    },
    "talisman": {
      "name": "Talismã",
      "desc": "Posse de um item espiritualmente importante (Klaive, etc)."
    },
    "heraldHorn": {
      "name": "Chifre do Arauto",
      "desc": "Convoca membros da alcateia e indica caminhos seguros."
    },
    "kingBrennusHammer": {
      "name": "Martelo do Rei Brennus",
      "desc": "Martelo de guerra ancestral, letal contra Dançarinos da Espiral Negra."
    },
    "heatStone": {
      "name": "A Pedra do Calor",
      "desc": "Pedra radioativa que inibe qualquer forma de cura."
    },
    "assassinCrown": {
      "name": "A Coroa do Assassino",
      "desc": "Aumenta a Fúria e impede a perda do lobo."
    },
    "ironAxe": {
      "name": "O Machado de Ferro",
      "desc": "Sacrifique vitalidade para causar dano extra."
    },
    "boneScourge": {
      "name": "O Flagelo de Osso",
      "desc": "Chicote que inflige dano à Força de Vontade."
    }
  },
  "flaws": {
    "enemy": {
      "name": "Inimigo"
    },
    "addiction": {
      "name": "Vício"
    },
    "darksecret": {
      "name": "Segredo Sombrio"
    },
    "haunted": {
      "name": "Assombrado"
    },
    "shunned": {
      "name": "Evitado"
    },
    "feeding": {
      "name": "Defeito de Alimentação"
    },
    "substanceAbuse": {
      "incurable": "Vício Incurável: -2 dados quando não usa a substância.",
      "dependency": "Dependência: -1 dado quando não usa a substância."
    },
    "caernPariah": {
      "name": "Pária de Caern",
      "description": "Persona non grata em caerns locais."
    },
    "illiterate": {
      "name": "Analfabeto",
      "description": "Não sabe ler nem escrever. Erudição/Ciência limitados a 1."
    },
    "folkloric": {
      "bane": "Perdição Folclórica: Sofre dano Agravado de uma fonte específica (Água benta, etc).",
      "taboo": "Tabu Folclórico: Deve gastar Vontade para superar uma aversão específica.",
      "sign": "Sinal Folclórico: Indicador físico de sua natureza (-1 Social)."
    },
    "croneCurse": {
      "name": "Maldição da Anciã",
      "description": "Envelheceu rápido ou transformou-se tarde. -1 caixa de Vitalidade."
    },
    "moonSlave": {
      "name": "Escravo da Lua",
      "description": "Deve mudar de forma ao ver a lua pela primeira vez."
    },
    "visualFlaw": {
      "repulsive": "Repulsivo: -2 dados em testes Sociais.",
      "ugly": "Feio: -1 dado em testes Sociais."
    },
    "infamy": {
      "name": "Infâmia",
      "description": "Famoso por algo terrível."
    },
    "infamousPartner": {
      "name": "Parceiro Infame",
      "description": "Associado possui Infâmia."
    },
    "suspect": {
      "name": "Suspeito",
      "description": "Biometria em bancos de dados de inteligência."
    },
    "recurringError": {
      "name": "Erro Recorrente",
      "description": "Registros mostram você como morto ou em lista de vigilância."
    },
    "adversary": {
      "name": "Adversário",
      "description": "Um Garou rival que lhe deseja mal."
    },
    "conditionalPact": {
      "name": "Pacto Condicional",
      "description": "Deve realizar/evitar atos para manter o favor do espírito."
    },
    "destitute": {
      "name": "Destituído",
      "description": "Sem dinheiro ou casa."
    },
    "wyrmMarked": {
      "name": "Carne Marcada pela Wyrm",
      "description": "Suas formas sobrenaturais sugerem influência da Wyrm. Penalidade Social."
    },
    "moonBane": {
      "name": "Mau Agouro da Lua",
      "description": "Suplicar a Luna para restaurar Fúria é incerto. Exige checagem de Fúria."
    },
    "hellHound": {
      "name": "Cão do Inferno",
      "description": "Formas hispo e lupina impõem Delírio como se estivesse em Crinos."
    },
    "wolfMan": {
      "name": "Homem-Lobo",
      "description": "Forma crinos se aproxima mais do lado humano. Impede mordida, mas reduz Delírio."
    },
    "wyrmTouched": {
      "name": "Tocado pela Wyrm",
      "description": "A Wyrm cravou-se profundamente em sua alma.",
      "calamity": "Wyrm da Calamidade: +1 na Dificuldade para resistir ao Frenesi.",
      "soulEater": "Wyrm da Devoradora-de-Almas: Deve realizar teste de Harano ao final de cada sessão.",
      "corruption": "Wyrm da Corrupção: Deve realizar teste de Hauglosk ao final de cada sessão."
    }
  },
  "loresheets": {
    "title": "Fichas de Conhecimento",
    "subtitle": "As Fichas de Conhecimento fazem o personagem evoluir 'para os lados', não 'para cima', oferecendo benefícios expressivos com seus próprios riscos.",
    "watcherOfMalditos": {
      "name": "Vigia dos Malditos",
      "description": "Guardiões de espíritos aprisionados.",
      "level1": {
        "name": "Canário",
        "description": "Sexto sentido para Malditos.",
        "system": "+2 dados em testes de Investigação relacionados a Malditos."
      },
      "level2": {
        "name": "Construtor de Celas",
        "description": "Prepara prisões adequadas para Malditos.",
        "system": "+1 dado normal ao usar o Ritual de Confinamento."
      },
      "level3": {
        "name": "Sabedoria do Vazio",
        "description": "Consulta um Maldito poderoso aprisionado.",
        "system": "Soma o Poder do espírito a um teste de conhecimento uma vez por sessão."
      },
      "level4": {
        "name": "Mapa do Vigia dos Malditos",
        "description": "Mapa com localização de Malditos aprisionados na região.",
        "system": "Possui um mapa indicando as localizações."
      },
      "level5": {
        "name": "Rotina de Vigia",
        "description": "Conforto nos sussurros do prisioneiro.",
        "system": "Recupera Força de Vontade Agravada ao conversar com o Maldito uma vez por crônica."
      }
    },
    "theSkinner": {
      "name": "O Esfolador",
      "description": "Uma massa de peles de lobo que caça Garou.",
      "level1": {
        "name": "Aviso Prévio",
        "description": "Sensível à presença do Esfolador.",
        "system": "+2 dados em testes de Percepção para detectar emboscadas."
      },
      "level2": {
        "name": "Rede de Apoio",
        "description": "Contato com pessoas prejudicadas pelo Esfolador.",
        "system": "Ganha Aliados (••••)."
      },
      "level3": {
        "name": "A Perdição do Esfolador",
        "description": "Arma capaz de destruir o Esfolador.",
        "system": "Arma inflige dano Agravado contra Luas Usurpadas."
      },
      "level4": {
        "name": "Estudioso Estranho",
        "description": "Conhecimento sobre outras criaturas sobrenaturais.",
        "system": "+2 dados contra criaturas não-Garou/espírito uma vez por sessão."
      },
      "level5": {
        "name": "Dilacerar Pele",
        "description": "Habilidade em manipular a maldição deles.",
        "system": "Impede Lua Usurpada de se metamorfosear por uma sessão uma vez por sessão."
      }
    },
    "zhyzhak": {
      "name": "Zhyzhak",
      "description": "A campeã dos Dançarinos da Espiral Negra.",
      "level1": {
        "name": "Pele Mais Espessa",
        "description": "Tolerância à dor.",
        "system": "1 ponto de armadura contra lâminas em forma hominídea."
      },
      "level2": {
        "name": "História de Vitória",
        "description": "Vitórias acumuladas.",
        "system": "+4 dados em testes de Carisma uma vez por sessão."
      },
      "level3": {
        "name": "Intruso do Destino",
        "description": "Quebrando destinos.",
        "system": "Impede ou distorce uma profecia uma vez por crônica."
      },
      "level4": {
        "name": "Usos Mais Mortais",
        "description": "Transforma itens em armas.",
        "system": "Sofre 1 dano Agravado de Vontade para causar dano Agravado com armas improvisadas."
      },
      "level5": {
        "name": "Físico à Altura",
        "description": "Reflexos para acompanhar o monstro.",
        "system": "-2 dados para oponentes em forma Crinos contra você."
      }
    },
    "saboteurs": {
      "name": "Sabotadores",
      "description": "Um movimento focado em aleijar as operações do Pentex Group e compartilhar informações sobre subsidiárias.",
      "level1": {
        "name": "Demagogo",
        "description": "Você sabe despertar a ira da massa trabalhadora.",
        "system": "Uma vez por história, sempre que tentar levar uma multidão humana a agir com violência, some dois dados à parada."
      },
      "level2": {
        "name": "Incendiário",
        "description": "Você leva jeito para botar fogo em construções usando materiais de obra.",
        "system": "Com 2-7 dias de preparo, desencadeie um incêndio estrutural em um momento escolhido sem estar presente."
      },
      "level3": {
        "name": "Festa de Arromba",
        "description": "Realize um evento para atrair a atenção pública para uma causa.",
        "system": "Uma vez por história, sua Fama aumenta em 3 até o fim da sessão."
      },
      "level4": {
        "name": "Delegante",
        "description": "Expert em jogar a culpa nos outros.",
        "system": "+2 dados para convencer alguém de que outra pessoa é responsável. -1 dado em testes Sociais contra lobisomens na mesma cena."
      },
      "level5": {
        "name": "Rastro Documental",
        "description": "Encontre documentos que ligam a Pentex a uma transgressão específica.",
        "system": "Uma vez por crônica, encontre documentos incriminatórios. A Pentex saberá que foi você (ou você pode dedurar outro Sabotador)."
      }
    },
    "projectTwilight": {
      "name": "Projeto Crepúsculo",
      "description": "Esquadrões da morte federais e organizações governamentais que caçam lobisomens.",
      "level1": {
        "name": "Procedimento Indevido",
        "description": "Faça sumir uma prova pequena, mas relevante.",
        "system": "Uma vez por história, remova uma prova menor (foto, arquivo, teste de DNA)."
      },
      "level2": {
        "name": "Álibi Perfeito",
        "description": "Apresente prova falsa de sua localização em papel timbrado federal.",
        "system": "Uma vez por história, forneça um álibi federal confidencial para seu paradeiro."
      },
      "level3": {
        "name": "Bravura Indébita",
        "description": "Reivindique a autoria da execução de uma grande ameaça.",
        "system": "Uma vez por história, +3 dados em um teste Social relevante. -1 dado em outros testes Sociais na mesma cena."
      },
      "level4": {
        "name": "Aviso",
        "description": "Aviso prévio de ações do Projeto Crepúsculo.",
        "system": "Uma vez por crônica, saiba detalhes de ações diretas planejadas contra sua alcateia."
      },
      "level5": {
        "name": "O Telefone Vermelho",
        "description": "Alguém bem posicionado na organização lhe deve um favor.",
        "system": "Uma vez por crônica, ganhe 5 dados para distribuir em operações envolvendo organizações caçadoras. Falha atrai um inimigo sistêmico."
      }
    },
    "umbralTraveler": {
      "name": "Viajante Umbrático",
      "description": "Especialistas em explorar o reino espiritual dinâmico e misterioso.",
      "level1": {
        "name": "Pegadas de Prata",
        "description": "Deixe um rastro de pegadas prateadas na Umbra que só você enxerga.",
        "system": "A Dificuldade de passar da Umbra para o mundo físico com o Ritual da Travessia é reduzida em 1."
      },
      "level2": {
        "name": "A Música da Teia",
        "description": "Atraia aranhas-do-padrão dedilhando suas teias.",
        "system": "Uma vez por cena, atraia a atenção de uma aranha-do-padrão dedilhando teias espirituais."
      },
      "level3": {
        "name": "Iniciado no Mundo Inferior",
        "description": "Enxergue fantasmas na Umbra ou no mundo físico.",
        "system": "Você enxerga 'fantasmas', a menos que usem poderes sobrenaturais específicos para se esconder."
      },
      "level4": {
        "name": "Alimento Espiritual",
        "description": "Sustentado pelo mundo espiritual.",
        "system": "Sofra apenas dano Superficial à Vitalidade quando falhar em gastar Vontade para permanecer na Umbra."
      },
      "level5": {
        "name": "Segredo Ctônico",
        "description": "Guardião de um segredo umbrático monumental.",
        "system": "Você conhece um segredo maior (localização da casa de um espírito poderoso, etc). O espírito sabe que você sabe."
      }
    },
    "renegadeFenrir": {
      "name": "Fenrir Renegado",
      "description": "Garou que romperam o pacto com Lobo quando a Seita de Fenris sucumbiu ao hauglosk.",
      "level1": {
        "name": "Lambe-botas",
        "description": "Encontre propósito em seguir líderes despóticos.",
        "system": "Uma vez por sessão, recupere 1 de Vontade após rerrolar em conflito seguindo ordens de um Garou de Renome superior."
      },
      "level2": {
        "name": "Sequaz Repudiado",
        "description": "Garou respeitados fizeram de você um exemplo.",
        "system": "Seu Renome é tratado como 1 ponto a menos em interações sociais. Em falha no teste de Fúria para Perder o Lobo, role um dado extra; se tiver êxito, mantenha 1 de Fúria."
      },
      "level3": {
        "name": "Indômito",
        "description": "Intrépido mesmo após renunciar a Lobo.",
        "system": "+2 dados para resistir a medo sobrenatural. Se usado, -1 dado para resistir ao frenesi na cena."
      },
      "level4": {
        "name": "Ira Direcionada",
        "description": "A aspereza de Fenris segue forte em seu íntimo.",
        "system": "Uma vez por cena, tenha sucesso automático em teste de Fúria para ativar Dom, mas some um resultado Brutal à parada."
      },
      "level5": {
        "name": "Uivo Derradeiro",
        "description": "Presenciou os efeitos do hauglosk diretamente.",
        "system": "Uma vez por crônica, ao marcar o último quadrado de hauglosk, faça teste de Fúria. Se falhar, desmarque o quadrado."
      }
    },
    "theBlackSpiral": {
      "name": "A Espiral Negra",
      "description": "Conhecimento sobre o horrível Labirinto e a tribo afiliada à Wyrm.",
      "level1": {
        "name": "Glifo da Espiral Negra",
        "description": "Conheça as verdadeiras nuances do glifo da Wyrm.",
        "system": "Pode usar o glifo como isca ou para enganar. -2 dados em paradas Sociais com Garou que sabem desta habilidade (exceto alcateia)."
      },
      "level2": {
        "name": "Más Companhias",
        "description": "Contato com um Dançarino da Espiral Negra, fomor ou vampiro.",
        "system": "Uma vez por história, compartilhe info com contato associado à Wyrm. Renome reduzido em 2 até o fim da sessão."
      },
      "level3": {
        "name": "Espiral Encistada",
        "description": "Conheça tocas de Dançarinos que desfiguram o mundo.",
        "system": "Pode usar um refúgio de Dançarinos como Aparelho e ficar Zerado enquanto se esconder ali."
      },
      "level4": {
        "name": "Corpo Fechado",
        "description": "Um espírito da Wyrm se recusa a feri-lo.",
        "system": "Um espírito específico da Wyrm não o ferirá devido a um pacto secreto. Se visto, causa grande suspeita."
      },
      "level5": {
        "name": "A Solução do Labirinto",
        "description": "Tente desprogramar um Dançarino da Espiral Negra.",
        "system": "Uma vez por história, tente limpar um Dançarino da influência de Morcego através de isolamento e testes."
      }
    }
  }
}

type Locale = 'en' | 'pt';
type Translations = typeof oEn;
const oTranslations: Record<Locale, Translations> = { en: oEn, pt: oPt };

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, replacements?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const fnGetInitialLocale = (): Locale => {
  if (typeof window !== 'undefined' && window.navigator) {
    const sBrowserLang = window.navigator.language.toLowerCase();
    if (sBrowserLang.startsWith('pt')) return 'pt';
  }
  return 'en';
};

const fnGetNestedTranslation = (oObj: any, sKey: string): string | undefined => {
  return sKey.split('.').reduce((o, i) => (o ? o[i] : undefined), oObj);
};

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children: oChildren }) => {
  const [sLocale, fnSetLocale] = useState<Locale>(fnGetInitialLocale());

  const fnT = useCallback((sKey: string, oReplacements?: Record<string, string | number>): string => {
    let sTranslation = fnGetNestedTranslation(oTranslations[sLocale], sKey) || fnGetNestedTranslation(oTranslations['en'], sKey) || sKey;
    if (oReplacements) {
        Object.keys(oReplacements).forEach(sRKey => {
            sTranslation = sTranslation.replace(`{{${sRKey}}}`, String(oReplacements[sRKey]));
        });
    }
    return sTranslation;
  }, [sLocale]);

  const oValue = useMemo(() => ({
    locale: sLocale,
    setLocale: fnSetLocale,
    t: fnT
  }), [sLocale, fnT]);

  return (
    <I18nContext.Provider value={oValue}>
      {oChildren}
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
