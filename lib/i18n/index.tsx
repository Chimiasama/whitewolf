import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

// Inlined JSON to avoid import assertion issues
const en = {
  "app": {
    "title": "World of Darkness Character Creator",
    "subtitle": "Bring your supernatural being to life",
    "vampire": "Vampire: The Masquerade",
    "werewolf": "Werewolf: The Apocalypse"
  },
  "gameSelection": {
    "title": "Choose your Game",
    "subtitle": "Select the supernatural path you wish to follow",
    "vampireDesc": "Play as a Kindred, a vampire struggling to maintain their humanity while navigating the complex politics of the night.",
    "werewolfDesc": "Play as a Garou, a werewolf warrior of Gaia fighting a losing war against the corruption of the Wyrm."
  },
  "buttons": {
    "next": "Next",
    "back": "Back",
    "jumpToSheet": "Jump to Sheet",
    "close": "Close"
  },
  "steps": {
    "gameSelection": "Game",
    "concept": "Concept",
    "clan": "Clan",
    "tribe": "Tribe",
    "auspice": "Auspice",
    "attributes": "Attributes",
    "skills": "Skills",
    "finishingTouches": "Finishing Touches",
    "sheet": "Sheet"
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
    "skill": "Skill"
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
    "desirePlaceholder": "Short-term goal, e.g., To taste the blood of a celebrity"
  },
  "clan": {
    "title": "Choose your Bloodline"
  },
  "clans": {
    // ... (existing clans)
  },
  "tribes": {
    "blackfuries": { "name": "Black Furies", "description": "Fierce warriors who guard the wild places and punish those who desecrate them.", "bane": "They suffer a penalty to social rolls with those who disrespect the wild.", "favor": "The favor of Pegasus." },
    "bonegnawers": { "name": "Bone Gnawers", "description": "Survivors of the urban sprawl, the downtrodden who see what others miss.", "bane": "They are often looked down upon by other Garou.", "favor": "The favor of Rat." },
    "childrenofgaia": { "name": "Children of Gaia", "description": "Peacemakers and healers who seek to unite the Garou and heal the world.", "bane": "They find it harder to enter Rage.", "favor": "The favor of Unicorn." },
    "galestalkers": { "name": "Galestalkers", "description": "Hunters of the frozen north, masters of survival in the harshest conditions.", "bane": "They are often cold and distant.", "favor": "The favor of North Wind." },
    "ghostcouncil": { "name": "Ghost Council", "description": "Keepers of secrets and masters of the Umbra, the spirit world.", "bane": "They are often haunted by the spirits they command.", "favor": "The favor of Owl." },
    "glasswalkers": { "name": "Glass Walkers", "description": "Masters of technology and the urban environment, seeing the spirit in the machine.", "bane": "They are disconnected from the natural world.", "favor": "The favor of Cockroach." },
    "hartwardens": { "name": "Hart Wardens", "description": "Protectors of the rural lands and the traditions of the old ways.", "bane": "They are bound by strict codes of honor.", "favor": "The favor of Stag." },
    "redtalons": { "name": "Red Talons", "description": "Garou who have forsaken humanity, living as wolves and hunting those who destroy the wild.", "bane": "They find it almost impossible to interact with human society.", "favor": "The favor of Griffin." },
    "shadowlords": { "name": "Shadow Lords", "description": "Ambitious and ruthless leaders who believe only the strong should rule.", "bane": "They are often distrusted by others.", "favor": "The favor of Grandfather Thunder." },
    "silverfangs": { "name": "Silver Fangs", "description": "The traditional royalty of the Garou, noble and powerful but often flawed.", "bane": "They are prone to hereditary madness.", "favor": "The favor of Falcon." }
  },
  "auspices": {
    "ragabash": { "name": "Ragabash", "description": "The New Moon, the trickster and questioner of ways." },
    "theurge": { "name": "Theurge", "description": "The Crescent Moon, the seer and spirit-talker." },
    "philodox": { "name": "Philodox", "description": "The Half Moon, the judge and keeper of balance." },
    "galliard": { "name": "Galliard", "description": "The Gibbous Moon, the moon-dancer and lore-keeper." },
    "ahroun": { "name": "Ahroun", "description": "The Full Moon, the warrior and protector." }
  },
  "attributes": {
    "title": "Distribute Attributes",
    "subtitle": "Assign your attributes based on the required spread: one Attribute at 4 dots, three at 3, four at 2, and one remains at 1.",
    "bestTitle": "Best Attribute (4 Dots)",
    "goodTitle": "Good Attributes (3 Dots)",
    "averageTitle": "Average Attributes (2 Dots)",
    "oneAt4": "One at 4",
    "threeAt3": "Three at 3",
    "fourAt2": "Four at 2",
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
    "subtitle": "First, choose a skill distribution that fits your character concept. Then, assign skills to the available slots.",
    "chooseSpread": "Choose Skill Spread",
    "specialist": { "name": "Specialist", "description": "One Skill at 4, three at 3, three at 2, and three at 1." },
    "balanced": { "name": "Balanced", "description": "Three Skills at 3, five at 2, and seven at 1." },
    "jack": { "name": "Jack of all Trades", "description": "One Skill at 3, eight at 2, and ten at 1." },
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
    }
  },
  "finishingTouches": {
    "title": "Finishing Touches",
    "disciplines": {
      "title": "Disciplines",
      "subtitle": "Your clan determines your starting Disciplines. Choose one to have 2 dots and another to have 1 dot.",
      "twoDots": "Two Dots",
      "oneDot": "One Dot",
      "compendiumTitle": "Discipline Compendium"
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
    "touchstonesPlaceholder": "Who are the mortals that anchor your humanity? e.g., Touchstone: My sister, Sarah. Conviction: Never harm a child."
  },
  "summary": {
    "title": "Character Summary",
    "readySubtitle": "Your character is ready for the night!",
    "incompleteSubtitle": "Some details are still missing.",
    "missing_concept": "Name, Concept, Ambition, and Desire are required.",
    "missing_clan": "You must choose a Clan.",
    "missing_tribe": "You must choose a Tribe.",
    "missing_auspice": "You must choose an Auspice.",
    "error_attributes": "All attributes must be assigned according to the spread.",
    "error_skills": "All skills must be assigned according to the spread.",
    "missing_predator": "You must choose a Predator Type.",
    "error_disciplines": "You must assign 3 dots in Disciplines.",
    "error_gifts": "You must assign 3 dots in Gifts.",
    "error_advantages": "You must spend at least 7 points on Advantages.",
    "error_flaws": "You must take at least 2 points in Flaws."
  },
  "predatorTypes": {
    "alleycat": { "name": "Alleycat", "description": "You feed through ambush and violence.", "specialty": "Street Fighting" },
    "bagger": { "name": "Bagger", "description": "You feed on cold, preserved blood.", "specialty": "Breaking and Entering", "specialty2": "Blood Bags" },
    "consensualist": { "name": "Consensualist", "description": "You only feed from willing mortals.", "specialty": "Seduction" },
    "farmer": { "name": "Farmer", "description": "You feed exclusively from animals.", "specialty": "Livestock" },
    "osiris": { "name": "Osiris", "description": "You cultivate a cult or group to feed from.", "specialty": "Cults" },
    "sandman": { "name": "Sandman", "description": "You feed on sleeping victims.", "specialty": "Breaking and Entering" },
    "siren": { "name": "Siren", "description": "You seduce your victims to feed.", "specialty": "Seduction" }
  },
  "characterSheet": {
    "name": "Name",
    "clan": "Clan",
    "sire": "Sire",
    "concept": "Concept",
    "ambition": "Ambition",
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
    "humanity": "Humanity",
    "rage": "Rage",
    "harano": "Harano",
    "hauglosk": "Hauglosk",
    "renown": "Renown",
    "glory": "Glory",
    "honor": "Honor",
    "wisdom": "Wisdom",
    "tribe": "Tribe",
    "auspice": "Auspice",
    "gifts": "Gifts",
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
    "animalism": { "name": "Animalism", "description": "The ability to communicate with and control animals, and to tap into the Beast within oneself.", "powers": {
      "1": { "name": "Bond Famulus", "description": "Form a mystical bond with an animal, making it a loyal companion.", "system": "Spend a full night with an animal. It becomes exceptionally loyal and you can telepathically sense its emotional state." },
      "2": { "name": "Feral Whispers", "description": "Issue telepathic commands to animals.", "system": "Make a Charisma + Animal Ken roll to command an animal or group of animals." },
      "3": { "name": "Animal Succulence", "description": "Make animal blood as nourishing as human blood.", "system": "The vampire can slake an additional point of Hunger when feeding on animals." },
      "4": { "name": "Subsume the Spirit", "description": "Possess an animal, seeing and hearing through its senses.", "system": "Make a Charisma + Animal Ken roll. Success allows you to control the animal for a scene." },
      "5": { "name": "Animal Dominion", "description": "Exert your will over a large group of animals, turning them into a swarm under your command.", "system": "Make a Charisma + Animal Ken roll. The number of successes determines the size and duration of your control." }
    }},
    "auspex": { "name": "Auspex", "description": "Supernatural senses that can perceive the unseen, read emotions, and pierce illusions.", "powers": {
      "1": { "name": "Sense the Unseen", "description": "Detect the presence of supernatural beings like vampires, werewolves, and ghosts.", "system": "Roll Wits + Auspex. Success reveals the presence and general type of supernatural creatures nearby." },
      "2": { "name": "Premonition", "description": "Gain flashes of insight into the immediate future, often as a warning of danger.", "system": "At the Storyteller's discretion, you receive a brief, cryptic vision of a future event." },
      "3": { "name": "Scry the Soul", "description": "Read the surface thoughts and emotions of a target by looking into their eyes.", "system": "Roll Manipulation + Auspex vs Composure + Subterfuge to read a target's aura and surface thoughts." },
      "4": { "name": "Spirit's Touch", "description": "By handling an object, receive visions of its past owners and significant events.", "system": "Roll Resolve + Auspex. Successes determine the clarity and detail of the visions." },
      "5": { "name": "Clairvoyance", "description": "Project your senses to a distant location, seeing and hearing as if you were there.", "system": "Roll Intelligence + Auspex. The range and duration depend on the number of successes." }
    }},
    "celerity": { "name": "Celerity", "description": "Supernatural speed and reflexes, allowing the vampire to move and react with blinding quickness.", "powers": {
      "1": { "name": "Cat's Grace", "description": "Gain a supernatural sense of balance and acrobatic ability.", "system": "You are immune to falling damage unless falling from a great height. Add one die to Dexterity checks for balance." },
      "2": { "name": "Fleetness", "description": "Move with incredible speed in short bursts.", "system": "For one turn, you can take an extra move action." },
      "3": { "name": "Blink", "description": "Move so fast you seem to disappear and reappear a short distance away.", "system": "Add your Celerity rating in dice to your defense pool against one attack." },
      "4": { "name": "Traversal", "description": "Run up walls or across water for a short period.", "system": "Spend a Rouse Check to ignore vertical surfaces or liquids for one turn." },
      "5": { "name": "Lightning Strike", "description": "Move so fast you can attack multiple enemies almost simultaneously.", "system": "You may split your attack dice pool to make extra attacks against different targets." }
    }},
    "dominate": { "name": "Dominate", "description": "The power to command and control the minds of others through direct eye contact.", "powers": {
      "1": { "name": "Cloud Memory", "description": "Cause a target to forget a few moments of time.", "system": "Roll Charisma + Dominate vs Wits + Resolve. Success makes the target forget the last few minutes." },
      "2": { "name": "Mesmerize", "description": "Implant a single, compelling command in a target's mind.", "system": "Give a one-verb command ('Go,' 'Stop,' 'Fall'). Roll Charisma + Dominate vs Wits + Resolve." },
      "3": { "name": "The Forgetful Mind", "description": "Rewrite a target's memories of an entire scene.", "system": "Roll Manipulation + Dominate vs Intelligence + Resolve. You can alter or create memories." },
      "4": { "name": "Submerged Directive", "description": "Implant a command that will be triggered by a specific event or keyword.", "system": "As Mesmerize, but the command remains dormant until a trigger you define occurs." },
      "5": { "name": "Terminal Decree", "description": "Give a command so powerful it can force the target to act against their nature, even self-destructively.", "system": "Roll Charisma + Dominate vs Resolve + Humanity. This can force actions that lead to the target's death." }
    }},
    "fortitude": { "name": "Fortitude", "description": "Supernatural toughness and resilience, allowing a vampire to ignore wounds that would kill a mortal.", "powers": {
      "1": { "name": "Resilience", "description": "Your skin becomes unnaturally tough.", "system": "Add one die to your Stamina soak rolls against superficial damage." },
      "2": { "name": "Unswayable Mind", "description": "Resist mental and emotional manipulation.", "system": "Add your Fortitude rating to your defense pool against powers that affect your mind or emotions." },
      "3": { "name": "Defy Bane", "description": "Resist the banes of vampiric existence, such as sunlight and fire.", "system": "Add your Fortitude rating to your soak pool against sunlight and fire." },
      "4": { "name": "Draught of Endurance", "description": "Your blood can imbue others with your resilience.", "system": "A mortal who drinks your blood gains your Fortitude rating to their health levels for one scene." },
      "5": { "name": "Flesh of Marble", "description": "Become almost immune to harm for a short time.", "system": "Halve all incoming damage (rounded down) for one scene." }
    }},
    "obfuscate": { "name": "Obfuscate", "description": "The ability to remain unseen and unheard, either by hiding in plain sight or by clouding the minds of others.", "powers": {
      "1": { "name": "Cloak of Shadows", "description": "Become invisible as long as you remain still and in shadow.", "system": "You cannot be seen unless an observer has Auspex or is actively searching for you." },
      "2": { "name": "Unseen Passage", "description": "Move without being seen, as long as you do not draw attention to yourself.", "system": "Roll Wits + Obfuscate. Success allows you to move unnoticed for a scene." },
      "3": { "name": "Mask of a Thousand Faces", "description": "Create a convincing illusion to change your appearance.", "system": "Roll Manipulation + Obfuscate. You can appear as a different person, though this doesn't hold up to physical inspection." },
      "4": { "name": "Vanish", "description": "Disappear from sight in an instant, even while being observed.", "system": "Roll Wits + Obfuscate. If you succeed, you are gone from sight." },
      "5": { "name": "Cloak the Gathering", "description": "Extend your invisibility to a group of people.", "system": "You can hide a number of people equal to your Obfuscate rating." }
    }},
    "potence": { "name": "Potence", "description": "The Discipline of supernatural strength, far beyond mortal limits.", "powers": {
      "1": { "name": "Lethal Body", "description": "Your unarmed attacks are as deadly as weapons.", "system": "Your unarmed attacks do Aggravated damage to mortals." },
      "2": { "name": "Prowess", "description": "Perform incredible feats of strength.", "system": "Add your Potence rating as bonus dice to all Strength-based rolls." },
      "3": { "name": "Brutal Feed", "description": "Drain blood from a victim with shocking, deadly force.", "system": "When grappling, you can inflict Aggravated damage and drain blood in the same turn." },
      "4": { "name": "Uncanny Grip", "description": "Climb sheer surfaces and hold on with inhuman strength.", "system": "You can climb any surface without a roll, as long as you can get a handhold." },
      "5": { "name": "Fist of Caine", "description": "Channel your strength into a single, devastating blow.", "system": "Make a single unarmed attack that does massive Aggravated damage." }
    }},
    "presence": { "name": "Presence", "description": "The power to attract, sway, and terrify others with your supernatural charisma.", "powers": {
      "1": { "name": "Awe", "description": "Make those around you admire and feel drawn to you.", "system": "Add your Presence rating to any Charisma-based social rolls." },
      "2": { "name": "Dread Gaze", "description": "Instill terror in a single target with just a look.", "system": "Roll Charisma + Presence vs Composure + Resolve. Success forces the target to flee in terror." },
      "3": { "name": "Entrancement", "description": "Make a single person utterly infatuated with you for a short time.", "system": "Roll Manipulation + Presence. The target will do anything non-harmful to please you for a scene." },
      "4": { "name": "Summon", "description": "Compel someone you have previously met to come to you.", "system": "Roll Charisma + Presence. The target feels an overwhelming urge to travel to your location." },
      "5": { "name": "Majesty", "description": "Radiate an aura of absolute authority that no one dares to challenge.", "system": "For a scene, no one can act hostilely towards you unless you attack first. Resisting requires a significant Willpower expenditure." }
    }},
    "protean": { "name": "Protean", "description": "The Discipline of shapeshifting, allowing a vampire to alter their form and meld with the earth.", "powers": {
      "1": { "name": "Eyes of the Beast", "description": "Your eyes glow red in the dark, allowing you to see perfectly in pitch blackness.", "system": "You can see in complete darkness. This can be intimidating." },
      "2": { "name": "Feral Weapons", "description": "Grow vicious claws that can tear through flesh and metal.", "system": "Your unarmed attacks do Aggravated damage." },
      "3": { "name": "Earth Meld", "description": "Sink into the earth to rest, protected from sunlight.", "system": "You can sink into natural soil and remain there, dormant, until the next sunset." },
      "4": { "name": "Shape of the Beast", "description": "Transform into the form of an animal, like a wolf or a bat.", "system": "Roll Stamina + Protean. You can transform into a single chosen animal form." },
      "5": { "name": "Mist Form", "description": "Transform your body into a cloud of mist, able to slip through cracks and ignore physical harm.", "system": "You become incorporeal and immune to most physical attacks." }
    }},
    "bloodsorcery": { "name": "Blood Sorcery", "description": "The esoteric practice of using Vitae to power rituals and cast spells.", "powers": {
      "1": { "name": "Corrosive Vitae", "description": "Make a drop of your blood acidic and corrosive.", "system": "A drop of your blood can eat through non-living material." },
      "2": { "name": "A Taste for Blood", "description": "Learn deep secrets from a single drop of another's blood.", "system": "By tasting blood, you can learn the target's generation, clan (if any), and if they are under a blood bond." },
      "3": { "name": "Extinguish Vitae", "description": "Cause another vampire's blood to become inert and useless.", "system": "Roll Intelligence + Blood Sorcery. Success forces the target to expend more blood to use their powers." },
      "4": { "name": "Scorpion's Touch", "description": "Make your own blood into a potent poison.", "system": "Your touch becomes toxic, dealing Aggravated damage to mortals and vampires alike." },
      "5": { "name": "Baal's Caress", "description": "Boil a victim's blood in their veins from a distance.", "system": "Roll Intelligence + Blood Sorcery vs Stamina + Resolve. Deals massive Aggravated damage to the target." }
    }},
    "oblivion": { "name": "Oblivion", "description": "Command over the shadows and the energies of the underworld.", "powers": {
      "1": { "name": "Shadow Cloak", "description": "Deepen ambient shadows around you, aiding stealth.", "system": "Add one die to Stealth rolls in areas with at least some shadow." },
      "2": { "name": "Stygian Shroud", "description": "Create a cloud of supernatural darkness that blinds and deafens.", "system": "Roll Resolve + Oblivion. Success creates a zone of sensory deprivation." },
      "3": { "name": "Arms of Ahriman", "description": "Summon tendrils of shadow to grasp and attack your foes.", "system": "Roll Dexterity + Oblivion to make an attack with shadow tendrils." },
      "4": { "name": "Shadow Step", "description": "Step into one shadow and emerge from another nearby.", "system": "Roll Wits + Oblivion. The range depends on the number of successes." },
      "5": { "name": "Tenebrous Avatar", "description": "Transform into a monstrous being of pure shadow.", "system": "You become a terrifying shadow creature, gaining combat bonuses and the ability to fly." }
    }},
    "thinbloodalchemy": { "name": "Thin-Blood Alchemy", "description": "The makeshift and often unstable practice of creating pseudo-Disciplines from vitae.", "powers": {
      "1": { "name": "Distill Vitae", "description": "Create a formula that can mimic a low-level Discipline power.", "system": "Roll Intelligence + Alchemy. The result depends on the recipe and the roll's success." }
    }}
  }
};
const pt = {
  "app": {
    "title": "Criador de Personagens do Mundo das Trevas",
    "subtitle": "Dê vida ao seu ser sobrenatural",
    "vampire": "Vampiro: A Máscara",
    "werewolf": "Lobisomem: O Apocalipse"
  },
  "gameSelection": {
    "title": "Escolha seu Jogo",
    "subtitle": "Selecione o caminho sobrenatural que deseja seguir",
    "vampireDesc": "Jogue como um Membro, um vampiro lutando para manter sua humanidade enquanto navega pela complexa política da noite.",
    "werewolfDesc": "Jogue como um Garou, um guerreiro lobisomem de Gaia lutando uma guerra perdida contra a corrupção da Wyrm."
  },
  "buttons": {
    "next": "Próximo",
    "back": "Voltar",
    "jumpToSheet": "Ir para a Ficha",
    "close": "Fechar"
  },
  "steps": {
    "gameSelection": "Jogo",
    "concept": "Conceito",
    "clan": "Clã",
    "tribe": "Tribo",
    "auspice": "Augúrio",
    "attributes": "Atributos",
    "skills": "Perícias",
    "finishingTouches": "Toques Finais",
    "sheet": "Ficha"
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
    "skill": "Perícia"
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
    "desirePlaceholder": "Objetivo de curto prazo, ex: Provar o sangue de uma celebridade"
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
  "tribes": {
    "blackfuries": { "name": "Fúrias Negras", "description": "Guerreiras ferozes que guardam os lugares selvagens e punem aqueles que os profanam.", "bane": "Elas sofrem uma penalidade em testes sociais com aqueles que desrespeitam a natureza.", "favor": "O favor de Pégaso." },
    "bonegnawers": { "name": "Roedores de Ossos", "description": "Sobreviventes da expansão urbana, os oprimidos que veem o que os outros ignoram.", "bane": "Eles são frequentemente desprezados por outros Garou.", "favor": "O favor do Rato." },
    "childrenofgaia": { "name": "Filhos de Gaia", "description": "Pacificadores e curadores que buscam unir os Garou e curar o mundo.", "bane": "Eles acham mais difícil entrar em Fúria.", "favor": "O favor do Unicórnio." },
    "galestalkers": { "name": "Caçadores de Vendavais", "description": "Caçadores do norte gelado, mestres da sobrevivência nas condições mais severas.", "bane": "Eles são frequentemente frios e distantes.", "favor": "O favor do Vento Norte." },
    "ghostcouncil": { "name": "Conselho Fantasma", "description": "Guardiões de segredos e mestres da Umbra, o mundo espiritual.", "bane": "Eles são frequentemente assombrados pelos espíritos que comandam.", "favor": "O favor da Coruja." },
    "glasswalkers": { "name": "Andarilhos do Asfalto", "description": "Mestres da tecnologia e do ambiente urbano, vendo o espírito na máquina.", "bane": "Eles estão desconectados do mundo natural.", "favor": "O favor da Barata." },
    "hartwardens": { "name": "Guardiões do Cervo", "description": "Protetores das terras rurais e das tradições dos caminhos antigos.", "bane": "Eles estão vinculados por estritos códigos de honra.", "favor": "O favor do Cervo." },
    "redtalons": { "name": "Garras Vermelhas", "description": "Garou que renunciaram à humanidade, vivendo como lobos e caçando aqueles que destroem o selvagem.", "bane": "Eles acham quase impossível interagir com a sociedade humana.", "favor": "O favor do Grifo." },
    "shadowlords": { "name": "Senhores das Sombras", "description": "Líderes ambiciosos e implacáveis que acreditam que apenas os fortes devem governar.", "bane": "Eles são frequentemente desacreditados pelos outros.", "favor": "O favor do Vovô Trovão." },
    "silverfangs": { "name": "Presas de Prata", "description": "A realeza tradicional dos Garou, nobres e poderosos, mas frequentemente falhos.", "bane": "Eles são propensos à loucura hereditária.", "favor": "O favor do Falcão." }
  },
  "auspices": {
    "ragabash": { "name": "Ragabash", "description": "A Lua Nova, o trapaceiro e questionador dos caminhos." },
    "theurge": { "name": "Teurgo", "description": "A Lua Crescente, o vidente e falante de espíritos." },
    "philodox": { "name": "Filodox", "description": "A Lua Meia, o juiz e guardião do equilíbrio." },
    "galliard": { "name": "Galliard", "description": "A Lua Gibosa, o dançarino da lua e guardião do saber." },
    "ahroun": { "name": "Ahroun", "description": "A Lua Cheia, o guerreiro e protetor." }
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
    }
  },
  "finishingTouches": {
    "title": "Toques Finais",
    "disciplines": {
      "title": "Disciplinas",
      "subtitle": "Seu clã determina suas Disciplinas iniciais. Escolha uma para ter 2 pontos e outra para ter 1 ponto.",
      "twoDots": "Dois Pontos",
      "oneDot": "Um Ponto",
      "compendiumTitle": "Compêndio de Disciplinas"
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
    "touchstonesPlaceholder": "Quem são os mortais que ancoram sua humanidade? ex: Pedra de Toque: Minha irmã, Sarah. Convicção: Nunca ferir uma criança."
  },
  "summary": {
    "title": "Resumo do Personagem",
    "readySubtitle": "Seu personagem está pronto para a noite!",
    "incompleteSubtitle": "Alguns detalhes ainda estão faltando.",
    "missing_concept": "Nome, Conceito, Ambição e Desejo são obrigatórios.",
    "missing_clan": "Você deve escolher um Clã.",
    "missing_tribe": "Você deve escolher uma Tribo.",
    "missing_auspice": "Você deve escolher um Augúrio.",
    "error_attributes": "Todos os atributos devem ser atribuídos de acordo com a distribuição.",
    "error_skills": "Todas as perícias devem ser atribuídas de acordo com a distribuição.",
    "missing_predator": "Você deve escolher um Tipo de Predador.",
    "error_disciplines": "Você deve atribuir 3 pontos em Disciplinas.",
    "error_gifts": "Você deve atribuir 3 pontos em Dons.",
    "error_advantages": "Você deve gastar pelo menos 7 pontos em Vantagens.",
    "error_flaws": "Você deve ter pelo menos 2 pontos em Defeitos."
  },
   "predatorTypes": {
    "alleycat": { "name": "Gato de Beco", "description": "Você se alimenta através de emboscadas e violência.", "specialty": "Luta de Rua" },
    "bagger": { "name": "Bolsista", "description": "Você se alimenta de sangue frio e preservado.", "specialty": "Arrombamento", "specialty2": "Bolsas de Sangue" },
    "consensualist": { "name": "Consensual", "description": "Você só se alimenta de mortais dispostos.", "specialty": "Sedução" },
    "farmer": { "name": "Fazendeiro", "description": "Você se alimenta exclusivamente de animais.", "specialty": "Gado" },
    "osiris": { "name": "Osíris", "description": "Você cultiva um culto ou grupo para se alimentar.", "specialty": "Cultos" },
    "sandman": { "name": "Sandman", "description": "Você se alimenta de vítimas adormecidas.", "specialty": "Arrombamento" },
    "siren": { "name": "Sereia", "description": "Você seduz suas vítimas para se alimentar.", "specialty": "Sedução" }
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
    "humanity": "Humanidade",
    "rage": "Fúria",
    "harano": "Harano",
    "hauglosk": "Hauglosk",
    "renown": "Renome",
    "glory": "Glória",
    "honor": "Honra",
    "wisdom": "Sabedoria",
    "tribe": "Tribo",
    "auspice": "Augúrio",
    "gifts": "Dons",
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
    "animalism": { "name": "Animalismo", "description": "A habilidade de se comunicar e controlar animais, e de acessar a Besta interior.", "powers": {
      "1": { "name": "Vínculo Famulus", "description": "Forme um vínculo místico com um animal, tornando-o um companheiro leal.", "system": "Passe uma noite inteira com um animal. Ele se torna excepcionalmente leal e você pode sentir seu estado emocional telepaticamente." },
      "2": { "name": "Sussurros Selvagens", "description": "Dê comandos telepáticos a animais.", "system": "Faça um teste de Carisma + Animalismo para comandar um animal ou grupo de animais." },
      "3": { "name": "Suficiência Animal", "description": "Torna o sangue animal tão nutritivo quanto o sangue humano.", "system": "O vampiro pode saciar um ponto adicional de Fome ao se alimentar de animais." },
      "4": { "name": "Subjugar o Espírito", "description": "Possua um animal, vendo e ouvindo através de seus sentidos.", "system": "Faça um teste de Carisma + Animalismo. O sucesso permite que você controle o animal por uma cena." },
      "5": { "name": "Domínio Animal", "description": "Exerça sua vontade sobre um grande grupo de animais, transformando-os em um enxame sob seu comando.", "system": "Faça um teste de Carisma + Animalismo. O número de sucessos determina o tamanho e a duração do seu controle." }
    }},
    "auspex": { "name": "Auspícios", "description": "Sentidos sobrenaturais que podem perceber o invisível, ler emoções e perfurar ilusões.", "powers": {
      "1": { "name": "Sentir o Oculto", "description": "Detecte a presença de seres sobrenaturais como vampiros, lobisomens e fantasmas.", "system": "Role Raciocínio + Auspícios. O sucesso revela a presença e o tipo geral de criaturas sobrenaturais próximas." },
      "2": { "name": "Premonição", "description": "Obtenha flashes de insight sobre o futuro imediato, muitas vezes como um aviso de perigo.", "system": "A critério do Narrador, você recebe uma visão breve e enigmática de um evento futuro." },
      "3": { "name": "Vistoriar a Alma", "description": "Leia os pensamentos superficiais e as emoções de um alvo olhando em seus olhos.", "system": "Role Manipulação + Auspícios vs Autocontrole + Lábia para ler a aura e os pensamentos superficiais de um alvo." },
      "4": { "name": "Toque do Espírito", "description": "Ao manusear um objeto, receba visões de seus antigos proprietários e eventos significativos.", "system": "Role Determinação + Auspícios. Os sucessos determinam a clareza e os detalhes das visões." },
      "5": { "name": "Clarividência", "description": "Projete seus sentidos para um local distante, vendo e ouvindo como se estivesse lá.", "system": "Role Inteligência + Auspícios. O alcance e a duração dependem do número de sucessos." }
    }},
    "celerity": { "name": "Rapidez", "description": "Velocidade e reflexos sobrenaturais, permitindo ao vampiro mover-se e reagir com uma rapidez estonteante.", "powers": {
      "1": { "name": "Graça Felina", "description": "Ganhe um senso sobrenatural de equilíbrio e habilidade acrobática.", "system": "Você é imune a dano de queda, a menos que caia de uma grande altura. Adicione um dado aos testes de Destreza para equilíbrio." },
      "2": { "name": "Agilidade", "description": "Mova-se com velocidade incrível em rajadas curtas.", "system": "Por um turno, você pode realizar uma ação de movimento extra." },
      "3": { "name": "Piscar", "description": "Mova-se tão rápido que parece desaparecer e reaparecer a uma curta distância.", "system": "Adicione sua pontuação de Rapidez em dados à sua parada de defesa contra um ataque." },
      "4": { "name": "Travessia", "description": "Corra por paredes ou sobre a água por um curto período.", "system": "Gaste uma Verificação de Excitação para ignorar superfícies verticais ou líquidos por um turno." },
      "5": { "name": "Golpe Relâmpago", "description": "Mova-se tão rápido que pode atacar múltiplos inimigos quase simultaneamente.", "system": "Você pode dividir sua parada de dados de ataque para fazer ataques extras contra alvos diferentes." }
    }},
    "dominate": { "name": "Dominação", "description": "O poder de comandar e controlar as mentes dos outros através do contato visual direto.", "powers": {
      "1": { "name": "Nublar Memória", "description": "Faça um alvo esquecer alguns momentos do tempo.", "system": "Role Carisma + Dominação vs Raciocínio + Determinação. O sucesso faz o alvo esquecer os últimos minutos." },
      "2": { "name": "Hipnotizar", "description": "Implante um único comando convincente na mente de um alvo.", "system": "Dê um comando de um verbo ('Vá', 'Pare', 'Caia'). Role Carisma + Dominação vs Raciocínio + Determinação." },
      "3": { "name": "A Mente Esquecida", "description": "Reescreva as memórias de um alvo de uma cena inteira.", "system": "Role Manipulação + Dominação vs Inteligência + Determinação. Você pode alterar ou criar memórias." },
      "4": { "name": "Diretiva Submersa", "description": "Implante um comando que será acionado por um evento ou palavra-chave específica.", "system": "Como Hipnotizar, mas o comando permanece dormente até que um gatilho que você define ocorra." },
      "5": { "name": "Decreto Terminal", "description": "Dê um comando tão poderoso que pode forçar o alvo a agir contra sua natureza, até mesmo de forma autodestrutiva.", "system": "Role Carisma + Dominação vs Determinação + Humanidade. Isso pode forçar ações que levam à morte do alvo." }
    }},
    "fortitude": { "name": "Fortitude", "description": "Resistência e resiliência sobrenaturais, permitindo a um vampiro ignorar ferimentos que matariam um mortal.", "powers": {
      "1": { "name": "Resiliência", "description": "Sua pele se torna anormalmente resistente.", "system": "Adicione um dado às suas rolagens de absorção de Vigor contra dano superficial." },
      "2": { "name": "Mente Inabalável", "description": "Resista à manipulação mental e emocional.", "system": "Adicione sua pontuação de Fortitude à sua parada de defesa contra poderes que afetam sua mente ou emoções." },
      "3": { "name": "Desafiar Perdição", "description": "Resista às perdições da existência vampírica, como luz solar e fogo.", "system": "Adicione sua pontuação de Fortitude à sua parada de absorção contra luz solar e fogo." },
      "4": { "name": "Dose de Resistência", "description": "Seu sangue pode imbuir outros com sua resiliência.", "system": "Um mortal que beber seu sangue ganha sua pontuação de Fortitude em seus níveis de vitalidade por uma cena." },
      "5": { "name": "Carne de Mármore", "description": "Torne-se quase imune a danos por um curto período.", "system": "Reduza pela metade todo o dano recebido (arredondado para baixo) por uma cena." }
    }},
    "obfuscate": { "name": "Ofuscação", "description": "A habilidade de permanecer invisível e inaudível, seja se escondendo à vista de todos ou nublando as mentes dos outros.", "powers": {
      "1": { "name": "Manto de Sombras", "description": "Torne-se invisível enquanto permanecer imóvel e na sombra.", "system": "Você não pode ser visto a menos que um observador tenha Auspícios ou esteja procurando ativamente por você." },
      "2": { "name": "Passagem Oculta", "description": "Mova-se sem ser visto, desde que não chame a atenção para si mesmo.", "system": "Role Raciocínio + Ofuscação. O sucesso permite que você se mova despercebido por uma cena." },
      "3": { "name": "Máscara de Mil Faces", "description": "Crie uma ilusão convincente para mudar sua aparência.", "system": "Role Manipulação + Ofuscação. Você pode parecer uma pessoa diferente, embora isso não resista a uma inspeção física." },
      "4": { "name": "Desvanecer", "description": "Desapareça da vista em um instante, mesmo enquanto está sendo observado.", "system": "Role Raciocínio + Ofuscação. Se você tiver sucesso, você desaparece da vista." },
      "5": { "name": "Ocultar o Grupo", "description": "Estenda sua invisibilidade para um grupo de pessoas.", "system": "Você pode esconder um número de pessoas igual à sua pontuação de Ofuscação." }
    }},
    "potence": { "name": "Potência", "description": "A Disciplina da força sobrenatural, muito além dos limites mortais.", "powers": {
      "1": { "name": "Corpo Letal", "description": "Seus ataques desarmados são tão mortais quanto armas.", "system": "Seus ataques desarmados causam dano Agravado a mortais." },
      "2": { "name": "Proeza", "description": "Realize feitos incríveis de força.", "system": "Adicione sua pontuação de Potência como dados de bônus em todos os testes baseados em Força." },
      "3": { "name": "Alimentação Brutal", "description": "Drene sangue de uma vítima com força chocante e mortal.", "system": "Ao agarrar, você pode infligir dano Agravado e drenar sangue no mesmo turno." },
      "4": { "name": "Aperto Incomum", "description": "Escale superfícies íngremes e segure-se com força desumana.", "system": "Você pode escalar qualquer superfície sem um teste, desde que consiga se segurar." },
      "5": { "name": "Punho de Caim", "description": "Canalize sua força em um único golpe devastador.", "system": "Faça um único ataque desarmado que causa dano Agravado massivo." }
    }},
    "presence": { "name": "Presença", "description": "O poder de atrair, influenciar e aterrorizar os outros com seu carisma sobrenatural.", "powers": {
      "1": { "name": "Temor", "description": "Faça com que aqueles ao seu redor o admirem e se sintam atraídos por você.", "system": "Adicione sua pontuação de Presença a quaisquer testes sociais baseados em Carisma." },
      "2": { "name": "Olhar Aterrador", "description": "Instile terror em um único alvo com apenas um olhar.", "system": "Role Carisma + Presença vs Autocontrole + Determinação. O sucesso força o alvo a fugir em terror." },
      "3": { "name": "Transe", "description": "Deixe uma única pessoa completamente apaixonada por você por um curto período.", "system": "Role Manipulação + Presença. O alvo fará qualquer coisa não prejudicial para agradá-lo por uma cena." },
      "4": { "name": "Convocar", "description": "Compele alguém que você já conheceu a vir até você.", "system": "Role Carisma + Presença. O alvo sente um desejo avassalador de viajar para sua localização." },
      "5": { "name": "Majestade", "description": "Irradie uma aura de autoridade absoluta que ninguém ousa desafiar.", "system": "Por uma cena, ninguém pode agir hostilmente contra você, a menos que você ataque primeiro. Resistir requer um gasto significativo de Força de Vontade." }
    }},
    "protean": { "name": "Metamorfose", "description": "A Disciplina da mudança de forma, permitindo a um vampiro alterar sua forma e se fundir com a terra.", "powers": {
      "1": { "name": "Olhos da Besta", "description": "Seus olhos brilham em vermelho no escuro, permitindo que você veja perfeitamente na escuridão total.", "system": "Você pode ver na escuridão completa. Isso pode ser intimidador." },
      "2": { "name": "Armas Selvagens", "description": "Cresça garras viciosas que podem rasgar carne e metal.", "system": "Seus ataques desarmados causam dano Agravado." },
      "3": { "name": "Fusão com a Terra", "description": "Mergulhe na terra para descansar, protegido da luz solar.", "system": "Você pode mergulhar em solo natural e permanecer lá, dormente, até o próximo pôr do sol." },
      "4": { "name": "Forma da Besta", "description": "Transforme-se na forma de um animal, como um lobo ou um morcego.", "system": "Role Vigor + Metamorfose. Você pode se transformar em uma única forma animal escolhida." },
      "5": { "name": "Forma de Névoa", "description": "Transforme seu corpo em uma nuvem de névoa, capaz de passar por frestas e ignorar danos físicos.", "system": "Você se torna incorpóreo e imune à maioria dos ataques físicos." }
    }},
    "bloodsorcery": { "name": "Feitiçaria de Sangue", "description": "A prática esotérica de usar Vitae para alimentar rituais e lançar feitiços.", "powers": {
      "1": { "name": "Vitae Corrosiva", "description": "Torne uma gota do seu sangue ácida e corrosiva.", "system": "Uma gota do seu sangue pode corroer material não-vivo." },
      "2": { "name": "Um Gosto por Sangue", "description": "Aprenda segredos profundos de uma única gota do sangue de outro.", "system": "Ao provar o sangue, você pode aprender a geração do alvo, clã (se houver), e se ele está sob um laço de sangue." },
      "3": { "name": "Extinguir Vitae", "description": "Faça o sangue de outro vampiro se tornar inerte e inútil.", "system": "Role Inteligência + Feitiçaria de Sangue. O sucesso força o alvo a gastar mais sangue para usar seus poderes." },
      "4": { "name": "Toque do Escorpião", "description": "Transforme seu próprio sangue em um veneno potente.", "system": "Seu toque se torna tóxico, causando dano Agravado a mortais e vampiros." },
      "5": { "name": "Carícia de Baal", "description": "Ferva o sangue de uma vítima em suas veias à distância.", "system": "Role Inteligência + Feitiçaria de Sangue vs Vigor + Determinação. Causa dano Agravado massivo ao alvo." }
    }},
    "oblivion": { "name": "Olvido", "description": "Comando sobre as sombras e as energias do submundo.", "powers": {
      "1": { "name": "Manto de Sombras", "description": "Aprofunde as sombras ambientes ao seu redor, auxiliando a furtividade.", "system": "Adicione um dado aos testes de Furtividade em áreas com pelo menos alguma sombra." },
      "2": { "name": "Mortalha Estígia", "description": "Crie uma nuvem de escuridão sobrenatural que cega e ensurdece.", "system": "Role Determinação + Olvido. O sucesso cria uma zona de privação sensorial." },
      "3": { "name": "Braços de Ahriman", "description": "Convoque tentáculos de sombra para agarrar e atacar seus inimigos.", "system": "Role Destreza + Olvido para fazer um ataque com tentáculos de sombra." },
      "4": { "name": "Passo Sombrio", "description": "Entre em uma sombra e saia de outra próxima.", "system": "Role Raciocínio + Olvido. O alcance depende do número de sucessos." },
      "5": { "name": "Avatar Tenebroso", "description": "Transforme-se em um ser monstruoso de pura sombra.", "system": "Você se torna uma criatura sombria aterrorizante, ganhando bônus de combate e a habilidade de voar." }
    }},
    "thinbloodalchemy": { "name": "Alquimia de Sangue-Fraco", "description": "A prática improvisada e muitas vezes instável de criar pseudo-Disciplinas a partir de vitae.", "powers": {
      "1": { "name": "Destilar Vitae", "description": "Crie uma fórmula que pode imitar o poder de uma Disciplina de baixo nível.", "system": "Role Inteligência + Alquimia. O resultado depende da receita e do sucesso do teste." }
    }}
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