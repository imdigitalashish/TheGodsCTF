/* ============================================================
   THE GODS CTF — campaign.ts  (AUTO-GENERATED, do not hand-edit)
   14 missions across 4 acts + 4 characters. Forensic case data is
   validated against the source transcripts; the narrative layer
   (codenames, acts, character POV, intro/outro beats) is authored.
   Regenerate via /tmp/build_campaign.cjs from data/challenges.js.
   ============================================================ */
import type { Mission, Character, Act } from "@/types";

export const characters: Character[] = [
  {
    "id": "nikhil",
    "name": "Nikhil Nair",
    "role": "Forensic Analyst",
    "tagline": "The dead can talk. He's the one who listens.",
    "lens": "LAB",
    "lensDescription": "Full autopsy, toxicology and cipher tooling. The puzzle missions are his.",
    "color": "#36e0c8",
    "glyph": "🔬",
    "locked": false
  },
  {
    "id": "nusrat",
    "name": "Nusrat Sayed",
    "role": "Field Investigator",
    "tagline": "Relentless, principled, impossible to lie to.",
    "lens": "FIELD",
    "lensDescription": "On-scene clues and interrogation. She reads people, not just bodies.",
    "color": "#b98cff",
    "glyph": "🪪",
    "locked": false
  },
  {
    "id": "dj",
    "name": "Dhananjay Rajpoot",
    "role": "Veteran Officer",
    "tagline": "Brilliant. Ruthless. Carrying a debt he can't pay.",
    "lens": "AUTHORITY",
    "lensDescription": "Pull rank to unlock a sealed clue — but one of his clues may be compromised.",
    "color": "#ffc14d",
    "glyph": "⭐",
    "locked": false
  },
  {
    "id": "shubh",
    "name": "Shubh",
    "role": "The Asur",
    "tagline": "He believes every one of us is a demon. He's building the proof.",
    "lens": "ORACLE",
    "lensDescription": "Unlocks after the finale — replay the hunt as the god who saw it all coming.",
    "color": "#ff3b46",
    "glyph": "🜲",
    "locked": true
  }
];

export const acts: Act[] = [
  {
    "id": "act1",
    "title": "THE DEAD CAN TALK",
    "subtitle": "A nameless body. A killer who leaves riddles, not fingerprints.",
    "order": 1
  },
  {
    "id": "act2",
    "title": "PROJECT EQUILIBRIUM",
    "subtitle": "The murders form a pattern. He's talking to you now. And he has a philosophy.",
    "order": 2
  },
  {
    "id": "act3",
    "title": "KALI YUGA",
    "subtitle": "Back from the dead, and this time he brought a machine.",
    "order": 3
  },
  {
    "id": "act4",
    "title": "THE GOD'S DILEMMA",
    "subtitle": "The machine is awake. Find it, or watch a god rewrite what's real.",
    "order": 4
  }
];

export const missions: Mission[] = [
  {
    "code": "S1E01",
    "codename": "COLD OPEN",
    "title": "The Dead Can Talk",
    "order": 1,
    "actId": "act1",
    "characterId": "nikhil",
    "difficulty": "rookie",
    "points": 100,
    "labTool": "none",
    "intro": "Your first day back in the field. A 'natural' cardiac arrest the widow refuses to sign off on — and a second body downriver, masked, missing a finger. The dead are talking. Learn to listen.",
    "outro": "One poison solved. But the mask and the severed finger weren't a husband covering his tracks — someone is just getting started, and he wants you watching.",
    "briefing": "A wealthy 55-year-old man has been found dead in his home under mysterious circumstances. While initial examination suggested a natural heart attack, forensic evidence tells a different story. The victim was a strict vegan with no peripheral blood circulation at death, and unusual gastrointestinal changes detected during autopsy. Can you deduce what exotic toxin claimed his life?",
    "flagQuestion": "What South American plant-based poison, whose fruit resembles a sweet potato, did the forensic expert deduce was used to murder William Mayor?",
    "flag": "aconite",
    "acceptedAnswers": [
      "aconite",
      "aconite poison",
      "the poison aconite",
      "south american aconite",
      "south-american aconite"
    ],
    "flagFormat": "poison name (singular, lowercase)",
    "evidence": [
      {
        "id": "E001",
        "type": "transcript",
        "label": "Initial Autopsy Findings",
        "text": "He was mildly hypotensive. His cholesterol was also on the higher end. Well, we suspect cardiac arrest but the wife is not ready to accept it.",
        "redHerring": false
      },
      {
        "id": "E002",
        "type": "transcript",
        "label": "Peripheral Blood Evidence",
        "text": "Look at the peripheral tissues over here. I can see some lack of blood. What does that mean? - That means his heart stopped suddenly.",
        "redHerring": false
      },
      {
        "id": "E003",
        "type": "transcript",
        "label": "Gastrointestinal Anomaly",
        "text": "That's strange. I can see some gastrointestinal changes in the autopsy. What were his food habits? - Vegan.",
        "redHerring": false
      },
      {
        "id": "E004",
        "type": "transcript",
        "label": "Expert Deduction: Poison Assessment",
        "text": "Get the body checked for ricin and aconite. My bet is aconite. It's a South American plant. The fruit looks like a sweet potato.",
        "redHerring": false
      },
      {
        "id": "E005",
        "type": "transcript",
        "label": "Victim Identity",
        "text": "William Mayor, 55 years old. Married. Or at least, he was. Last time, okay? - Okay. Well, the wife found him this way when she entered the room.",
        "redHerring": false
      },
      {
        "id": "E006",
        "type": "forensic",
        "label": "Kitchen Access Investigation",
        "text": "Check who had access to his kitchen. Delivery boy, chef, whoever. If anyone of them is a Latino, that's your guy.",
        "redHerring": true
      },
      {
        "id": "E007",
        "type": "forensic",
        "label": "Toxicology Initial Report",
        "text": "Toxicology report in progress but preliminary findings show no trace of common poisons. Suggests need for exotic plant toxin screening.",
        "redHerring": true
      },
      {
        "id": "E008",
        "type": "profile",
        "label": "Vegan Diet Profile",
        "text": "Victim maintained strict vegan diet, limiting exposure to traditional meat-based toxins. Poisoning likely administered via plant-based food source consumed daily.",
        "redHerring": false
      }
    ],
    "solutionSteps": [
      "The victim William Mayor shows lack of peripheral blood circulation despite initial suspicion of natural cardiac arrest, indicating an unnatural cause of sudden heart failure.",
      "Gastrointestinal changes are detected during autopsy, which combined with the vegan diet suggests the poison was ingested through food.",
      "The forensic expert deduces the poisoning must be from an exotic plant-based source, specifically mentioning two candidates: ricin and aconite.",
      "The expert identifies aconite as his primary hypothesis, explicitly stating 'My bet is aconite.'",
      "The physical description 'fruit looks like a sweet potato' is provided as a key identifying feature of the aconite plant.",
      "Cross-referencing the South American origin, sudden cardiac effects, GI changes, and the sweet potato-like fruit description all point conclusively to aconite as the murder weapon."
    ],
    "hints": [
      {
        "cost": 25,
        "text": "The expert mentions two candidate poisons by name. One is ricin (from castor beans), and the other is a South American plant toxin. Which one did he favor as his bet?"
      },
      {
        "cost": 50,
        "text": "The poison is from South America, acts by causing sudden cardiac arrest (no peripheral blood = heart stops), and its fruit visually resembles a sweet potato. These are the three defining clues."
      },
      {
        "cost": 100,
        "text": "The expert says the poison is 'a South American plant' and 'the fruit looks like a sweet potato.' The poison's name is a four-syllable plant toxin commonly used in traditional South American preparations and known for its cardiac effects."
      }
    ],
    "mcqOptions": [
      "aconite",
      "ricin",
      "strychnine",
      "cyanide"
    ]
  },
  {
    "code": "S1E02",
    "codename": "RABBIT HOLE",
    "title": "Rabbit Hole",
    "order": 2,
    "actId": "act1",
    "characterId": "nusrat",
    "difficulty": "investigator",
    "points": 200,
    "labTool": "none",
    "intro": "A cop's wife, an asthma pump, and a trail that runs to the Nagaland hills. Everyone calls it open-and-shut. Nothing about this is shut.",
    "outro": "The weapon was hidden in her own hand. But the cleaner the frame, the dirtier the hand that built it. Down the rabbit hole you go.",
    "briefing": "A Forensic Science Division investigator lies dead in Nagaland with cyanosis—blue lips and nails. The autopsy reveals swift respiratory failure, but the official cause puzzles everyone. The detective leading the case, Nikhil Nair, pieces together a brutal truth: the victim was asthmatic, and an innocuous medical device in his possession was weaponized. What substance was loaded into the pump to trigger instant death when mixed with the victim's chronic alcohol consumption?",
    "flagQuestion": "What drug class was loaded into the asthma pump to kill the victim, which causes instant lung failure when mixed with alcohol in an asthmatic person?",
    "flag": "barbiturates",
    "acceptedAnswers": [
      "barbiturates",
      "barbiturate",
      "barbs",
      "barbiturate class",
      "barbiturates class"
    ],
    "flagFormat": "A drug class (singular or plural form accepted)",
    "evidence": [
      {
        "id": "E1",
        "type": "transcript",
        "label": "Autopsy Direction",
        "text": "Tell them to check for barbiturates and Alprax.",
        "redHerring": false
      },
      {
        "id": "E2",
        "type": "transcript",
        "label": "Mechanism of Death",
        "text": "When there's an alcohol in the body, and you consumes barbiturate... It turns into poison. Causes lung failure. Instant death.",
        "redHerring": false
      },
      {
        "id": "E3",
        "type": "forensic",
        "label": "Victim's Medical History",
        "text": "Clubbed nails and fibrosis indicate asthma. Victim was a criminal living in remote hills, carrying multiple asthma pumps ordered in bulk from the city.",
        "redHerring": false
      },
      {
        "id": "E4",
        "type": "forensic",
        "label": "Cyanosis Evidence",
        "text": "Victim's lips and nails are blue, indicating cyanosis—respiratory depression and lung failure as cause of death.",
        "redHerring": false
      },
      {
        "id": "E5",
        "type": "transcript",
        "label": "Weapon Identified",
        "text": "We found it at the crime scene. We have tested it. Tested positive for barbiturate.",
        "redHerring": false
      },
      {
        "id": "E6",
        "type": "forensic",
        "label": "Naga Tribe Tattoo Symbol",
        "text": "Suspect bears tattoo matching Chang tribe symbol from Nagaland, discovered on body at crime scene. Circulated to all police divisions.",
        "redHerring": true
      },
      {
        "id": "E7",
        "type": "intercept",
        "label": "Cloned SIM Card Investigation",
        "text": "All replies from victim's phone on the day in question originated from single location. Initial suspicion: phone cloning. Later testing revealed no blue jack, no cloning detected on any devices.",
        "redHerring": true
      }
    ],
    "solutionSteps": [
      "The victim's autopsy reveals clubbed nails and fibrosis, confirming asthma. He also has cyanosis (blue lips/nails), indicating respiratory failure, not typical asthma complications.",
      "The detective orders testing for barbiturates and Alprax—indicating suspicion of poisoning via a specific drug class, not accidental overdose.",
      "The victim was an asthmatic living in remote hills and carried multiple asthma pumps ordered in bulk from the city. This gave the killer access to weaponize one pump.",
      "The autopsy confirms the mechanism: when barbiturates are consumed by an asthmatic alcoholic, the combination creates a chemical reaction that causes rapid lung failure and instant death.",
      "Lab testing of the asthma pump recovered at the crime scene returns positive for barbiturates—confirming the murder weapon and method.",
      "The killer weaponized the victim's own medical device by replacing one pump's contents with barbiturates, exploiting the guaranteed fatal interaction with the victim's alcohol consumption and asthma."
    ],
    "hints": [
      {
        "cost": 25,
        "text": "The victim has blue lips and nails (cyanosis), which points to respiratory failure, not a typical asthma attack. The detective suspects chemical poisoning from a specific drug class. What class of depressants causes lung failure?"
      },
      {
        "cost": 50,
        "text": "The murder weapon is an asthma pump—a medical device the victim carried daily. The autopsy reveals the victim is also an alcoholic. The detective orders testing for 'barbiturates and Alprax.' When one of these is mixed with alcohol in an asthmatic, it causes instant death."
      },
      {
        "cost": 100,
        "text": "The lab confirms: 'Tested positive for barbiturate.' The detective explains the mechanism: 'When there's alcohol in the body, and you consume barbiturate... It turns into poison. Causes lung failure. Instant death.' The drug class is barbiturates."
      }
    ],
    "mcqOptions": [
      "barbiturates",
      "benzodiazepines",
      "amphetamines",
      "opioids"
    ]
  },
  {
    "code": "S1E03",
    "codename": "SIX FEET UNDER",
    "title": "Peek-a-boo",
    "order": 3,
    "actId": "act1",
    "characterId": "nikhil",
    "difficulty": "investigator",
    "points": 200,
    "labTool": "none",
    "intro": "Coordinates hit your phone. Somewhere out there a man is breathing the last air in a wooden box. Today the clock isn't a metaphor — it's oxygen.",
    "outro": "You read the air right and pulled him out. But the killer didn't choose this city — he chose YOU. He's been waiting.",
    "briefing": "A popular stockbroker is found slumped in his locked car in a seemingly impossible crime. The vehicle was sealed from the outside, but the autopsy reveals the true weapon: toxic gases flooding the cabin. Investigators must piece together how the killer turned an ordinary car into a lethal gas chamber and why he's taunting law enforcement with precise coordinates.",
    "flagQuestion": "What was the cause of death for stockbroker Souvik Chatterjee, murdered in his remotely-locked car?",
    "flag": "carbon monoxide poisoning",
    "acceptedAnswers": [
      "carbon monoxide poisoning",
      "carbon monoxide",
      "co poisoning",
      "monoxide poisoning",
      "carbon dioxide and carbon monoxide poisoning",
      "exhaust fumes",
      "carbon monoxide and carbon dioxide"
    ],
    "flagFormat": "The toxic gas that killed him (e.g., 'carbon monoxide poisoning')",
    "evidence": [
      {
        "id": "E01_victim_profile",
        "type": "transcript",
        "label": "Victim Profile",
        "text": "Souvik Chatterjee, popular stock broker, single, no family. He indulged in charity, helped educate underprivileged kids. He is known to have been a good person. What killed him?",
        "redHerring": false
      },
      {
        "id": "E02_autopsy_gas",
        "type": "transcript",
        "label": "Autopsy Finding",
        "text": "his lungs are filled with carbon monoxide and carbon dioxide. Someone tampered with the exhaust pipe. That led to the increase in gas levels in the car.",
        "redHerring": false
      },
      {
        "id": "E03_locked_car",
        "type": "transcript",
        "label": "Scene Investigation",
        "text": "But he could have easily gotten out of the car. No, sir. The killer hacked the car lock as well. The car was locked from outside. Both the gas and the victim were locked inside the car.",
        "redHerring": false
      },
      {
        "id": "E04_exhaust_tampering",
        "type": "forensic",
        "label": "Forensic Evidence: Exhaust System",
        "text": "Mechanical analysis reveals the exhaust pipe was deliberately redirected or damaged to allow lethal fumes to enter the vehicle's cabin. The modification required technical knowledge and premeditation.",
        "redHerring": false
      },
      {
        "id": "E05_remote_lock",
        "type": "forensic",
        "label": "Vehicle Hacking Analysis",
        "text": "The vehicle's electronic locking system was compromised remotely, preventing the victim from unlocking the doors manually. Traces of hacking software detected on the car's CAN bus system indicate deliberate sabotage.",
        "redHerring": true
      },
      {
        "id": "E06_murder_method",
        "type": "profile",
        "label": "Killer's Method Assessment",
        "text": "The killer demonstrates sophisticated technical knowledge. He uses multiple components—vehicle hacking, mechanical tampering, and poisoning—to create an airtight trap. This was not a crime of passion but calculated execution.",
        "redHerring": false
      },
      {
        "id": "E07_crime_scene_note",
        "type": "forensic",
        "label": "Investigation Note",
        "text": "The coordinates pinpointing Souvik's death location were sent to investigator Nikhil Nair in advance. The killer appeared to know the investigator personally, raising questions about motive and connection between killer and law enforcement.",
        "redHerring": true
      }
    ],
    "solutionSteps": [
      "Review the victim profile: Souvik Chatterjee is a stockbroker found dead in his car. The investigator directly asks 'What killed him?'—this signals the key question to solve.",
      "Examine the autopsy findings: The medical examiner reveals the lungs are filled with 'carbon monoxide and carbon dioxide.' This is the cause of death.",
      "Identify the mechanism: The examiner states 'Someone tampered with the exhaust pipe. That led to the increase in gas levels in the car.' A tampered exhaust is the source of the lethal gases.",
      "Understand why escape was impossible: The killer locked the car from outside, trapping both the victim and the poisonous fumes inside. The victim could not open the doors or roll down windows to escape.",
      "Integrate the evidence: Carbon monoxide from a tampered exhaust pipe + locked doors = deliberate poisoning in a sealed chamber.",
      "Conclude: The cause of death was carbon monoxide poisoning (along with carbon dioxide), delivered via a sabotaged exhaust system in a remotely-locked vehicle."
    ],
    "hints": [
      {
        "cost": 25,
        "text": "The autopsy report identifies two gases found in the victim's lungs. One is produced by vehicle engines during combustion. What gas is a known killer when inhaled?"
      },
      {
        "cost": 50,
        "text": "The killer tampered with the exhaust pipe. Engine exhaust contains a colorless, odorless gas called carbon monoxide. When exhaust is redirected into a car's cabin instead of outside, victims inhale this poison and asphyxiate."
      },
      {
        "cost": 100,
        "text": "The autopsy report explicitly states: 'his lungs are filled with carbon monoxide and carbon dioxide. Someone tampered with the exhaust pipe. That led to the increase in gas levels in the car.' With the doors locked from outside, the victim was trapped with no escape from the poisonous fumes."
      }
    ],
    "mcqOptions": [
      "carbon monoxide poisoning",
      "cyanide injection",
      "blunt force trauma",
      "electrocution"
    ]
  },
  {
    "code": "S1E06",
    "codename": "STARGAZER",
    "title": "The Firewall",
    "order": 4,
    "actId": "act2",
    "characterId": "nusrat",
    "difficulty": "profiler",
    "points": 350,
    "labTool": "none",
    "intro": "Every victim shares one impossible thing: the same patch of sky at birth. To reach the next target before noon, think like the man reading the stars — and the firewall he tore through to find them.",
    "outro": "Delphinus. He isn't killing at random — he's auditing the heavens. And he just told you exactly where he strikes next.",
    "briefing": "A serial killer has methodically hunted victims across India, accessing a government database through an elaborate cyber-attack. Police discover the victims share a mystical connection—all born under the same astrological sign. Your task is to uncover which constellation linked the killer's targets, enabling him to select them from the breached N.I.C. database.",
    "flagQuestion": "Which astronomical constellation were ALL of Shubh's victims born under, allowing him to identify them through the hacked N.I.C. database?",
    "flag": "Delphinus",
    "acceptedAnswers": [
      "delphinus",
      "delphinus constellation",
      "the delphinus",
      "delphinus sign",
      "constellation delphinus"
    ],
    "flagFormat": "The name of an astronomical constellation (one word, capitalized)\"",
    "evidence": [
      {
        "id": "E001",
        "type": "transcript",
        "label": "Priest's Key Insight",
        "text": "Sir, I can see only one connection. All the victims were born in Delphinus constellation.",
        "redHerring": false
      },
      {
        "id": "E002",
        "type": "transcript",
        "label": "N.I.C. Firewall Security",
        "text": "But N.I.C's data is secured with 18 bit firewall.",
        "redHerring": false
      },
      {
        "id": "E003",
        "type": "transcript",
        "label": "Birth Chart Requirements",
        "text": "For the astral chart, date of birth, time of birth and place of birth are necessary. You won't find time of birth in Aadhaar or Census.",
        "redHerring": false
      },
      {
        "id": "E004",
        "type": "transcript",
        "label": "Victim Selection Pattern",
        "text": "The first victim's name. After 34 names, there's the second victim's name. And then the third victim's name is after 115 names. There's no victim by the surname starting with E or F.",
        "redHerring": false
      },
      {
        "id": "E005",
        "type": "profile",
        "label": "Shubh's Astrological Curse",
        "text": "The baby was born two days before the auspicious time. According to the new astrological chart, the baby was not a god, but a demon. Radhacharan started considering that baby ominous.",
        "redHerring": true
      },
      {
        "id": "E006",
        "type": "transcript",
        "label": "Constellation Significance",
        "text": "It is said that people born in this constellation do great work. Bhishma of Mahabharata were also born in Delphinus constellation.",
        "redHerring": false
      },
      {
        "id": "E007",
        "type": "intercept",
        "label": "Threat Details Communicated",
        "text": "'I've given the details about today to boss.' 'Name, time and the venue of the kill.' Nikhil is alerting the leader to the planned attack specifics.",
        "redHerring": true
      }
    ],
    "solutionSteps": [
      "Recognize that Shubh systematically selected victims from a government database by analyzing the victim list pattern: specific name positions, gaps in alphabetical order (missing E and F surnames), indicating a deliberate filter rather than random selection.",
      "Determine that the killer needed access to comprehensive biographical data containing date of birth, time of birth, and place of birth for all Indians—only the N.I.C. (National Informatics Center) maintains such centralized records.",
      "Understand that despite N.I.C.'s 18-bit firewall protection, Shubh breached it through a sophisticated cyber-attack, facilitated by Naina, a cyber-security expert with access to advanced tools and servers.",
      "Identify the unifying filter through the priest's testimony: all victims shared a single astrological characteristic—they were all born under the Delphinus constellation.",
      "Connect to Hindu mythology: Delphinus is considered highly auspicious, with people born under it said to achieve greatness (Bhishma from the Mahabharata was born under this sign). Shubh, twisted by his own 'demon' designation, sought to destroy those blessed with this auspicious sign.",
      "Conclude that Delphinus is the astronomical constellation that linked all victims and served as the primary search filter enabling Shubh to extract his target list from the hacked N.I.C. database."
    ],
    "hints": [
      {
        "cost": 25,
        "text": "The priest explicitly identifies a single common trait linking all the victims. He references their birth timing and its celestial significance—listen carefully to his conclusion."
      },
      {
        "cost": 50,
        "text": "The killer breached N.I.C., a database containing birth date, time, and place for millions of Indians. He filtered this massive dataset using a single astrological criterion tied to celestial bodies and constellations."
      },
      {
        "cost": 100,
        "text": "The priest directly names the constellation: 'All the victims were born in Delphinus constellation.' This sign is linked to greatness in Hindu mythology—Bhishma from the Mahabharata shares the same astrological birth marker."
      }
    ],
    "mcqOptions": [
      "Orion",
      "Delphinus",
      "Ursa Major",
      "Aquarius"
    ]
  },
  {
    "code": "S1E07",
    "codename": "DEAD MAN'S CIPHER",
    "title": "Let There Be Darkness",
    "order": 5,
    "actId": "act2",
    "characterId": "nikhil",
    "difficulty": "mastermind",
    "points": 500,
    "labTool": "periodic-table",
    "intro": "The wine killed him. But two metals in his blood that have no business being there? That's not murder — that's mail. Open it.",
    "outro": "Numbers hidden in the periodic table, pointing at a spot on the map. He isn't taunting you anymore. He's recruiting you. And it's working.",
    "briefing": "A young, successful entrepreneur Aditya Jalan collapses at his own engagement party in Mumbai and dies despite tight police security. Forensics reveal poisoning, but the killer left behind two mysterious trace elements in the victim's blood—elements that mean nothing on their own but together form a cryptic code. As the investigation deepens, the protagonist must uncover what these chemicals truly represent and where they point to.",
    "flagQuestion": "Decode the two trace elements found in Aditya Jalan's blood (using their atomic numbers and weights) to determine the GPS coordinates where the killer is hiding. What are those coordinates?",
    "flag": "28.5869, 77.1922",
    "acceptedAnswers": [
      "28.5869, 77.1922",
      "28.5869 77.1922",
      "28.5869, 77.1922 e",
      "28.5869n, 77.1922e",
      "delhi coordinates"
    ],
    "flagFormat": "latitude, longitude (decimal degrees)",
    "evidence": [
      {
        "id": "E001",
        "type": "transcript",
        "label": "Autopsy Findings: Trace Elements",
        "text": "Snake venom was enough to kill Aditya. But there are traces of two more elements ion his blood stream which are non-toxic. Those two elements were not for Aditya. It was for us. As a message.",
        "redHerring": false
      },
      {
        "id": "E002",
        "type": "transcript",
        "label": "Poison Identification",
        "text": "Sir, we found traces of neurotoxic zootoxins. Which looks - Neurotoxin. It has to be snake poisoning. Sir, there's one more, black mamba. It's venom affects in no time.",
        "redHerring": true
      },
      {
        "id": "E003",
        "type": "transcript",
        "label": "Lab Report: Trace Elements Identified",
        "text": "We have found traces of iridium and nickel in Aditya's blood. I find this very strange, sir. Zootoxins were more than enough to kill him, so what's the need for the extra elements?",
        "redHerring": false
      },
      {
        "id": "E004",
        "type": "transcript",
        "label": "The Breakthrough: Chemical Decoding",
        "text": "Basic chemistry. Nickel's atomic number is 28. Its atomic weight is 58.693. If you add them, you will get the coordinates. Same thing with iridium.",
        "redHerring": false
      },
      {
        "id": "E005",
        "type": "transcript",
        "label": "Coordinates Extraction",
        "text": "28.5869 North. 77.1922 East. Check these coordinates. Sir, these coordinates belong to Delhi. It's not very accurate but it shows a radius of 30 kms from Modi Bagh to Ghevra.",
        "redHerring": false
      },
      {
        "id": "E006",
        "type": "profile",
        "label": "Chemical Reference: Nickel (Ni)",
        "text": "Element: Nickel (Ni). Atomic number: 28. Atomic weight: 58.693. Non-toxic at trace levels. When concatenated: 28.5869.",
        "redHerring": false
      },
      {
        "id": "E007",
        "type": "profile",
        "label": "Chemical Reference: Iridium (Ir)",
        "text": "Element: Iridium (Ir). Atomic number: 77. Atomic weight: 192.217. Non-toxic at trace levels. When concatenated: 77.1922.",
        "redHerring": false
      },
      {
        "id": "E008",
        "type": "transcript",
        "label": "Misdirection: Shubh Joshi Theory",
        "text": "10 years ago Shubh killed his father by poisoning him. I sent him to jail for this crime. It could be revenge. He was saying that he's divided into two. He's at two places.",
        "redHerring": true
      }
    ],
    "solutionSteps": [
      "Identify that two non-toxic trace elements were found in Aditya Jalan's blood: nickel and iridium. These were deliberately planted as a coded message, not part of the murder weapon.",
      "From the periodic table or chemical knowledge, determine nickel's atomic number (28) and atomic weight (58.693). When concatenated, these form 28.5869.",
      "Similarly, determine iridium's atomic number (77) and atomic weight (192.217). When concatenated, these form 77.1922.",
      "Recognize that these concatenated values form GPS coordinates in decimal degree format: 28.5869 North latitude and 77.1922 East longitude.",
      "Cross-reference the coordinates to pinpoint Delhi, specifically a 30 km radius region from Modi Bagh to Ghevra, confirming the killer is hiding within India."
    ],
    "hints": [
      {
        "cost": 25,
        "text": "The two non-toxic trace elements in the blood (nickel and iridium) are a coded message, not part of the murder poison. Look at their chemical properties on the periodic table—specifically their atomic numbers and weights."
      },
      {
        "cost": 50,
        "text": "For each element, combine its atomic number with its atomic weight. Nickel: atomic number 28, atomic weight 58.693. Iridium: atomic number 77, atomic weight 192.217. These pairs form geographical coordinates when concatenated."
      },
      {
        "cost": 100,
        "text": "The decoded coordinates are 28.5869 N, 77.1922 E—a location in Delhi, specifically within a 30 km radius from Modi Bagh to Ghevra. Verify element properties using the periodic table to confirm the exact concatenation."
      }
    ],
    "mcqOptions": [
      "28.5869, 77.1922",
      "28.693, 77.217",
      "26.9124, 75.7672",
      "19.0760, 72.8777"
    ]
  },
  {
    "code": "S1E08",
    "codename": "BLACK HOLE",
    "title": "End Is the Beginning",
    "order": 6,
    "actId": "act2",
    "characterId": "dj",
    "difficulty": "profiler",
    "points": 350,
    "labTool": "none",
    "intro": "Three people, one room, the oxygen running out — and the man you spent a decade hunting holding the only door. Pull every string you have left, Rajpoot. Some you shouldn't pull.",
    "outro": "You caught him. You also learned what you did, years ago, to make him. The case is closed. The wound isn't. 'We are many,' he said.",
    "briefing": "A serial killer has taken three hostages—a politician, a journalist, and a religious leader—and locked them in an oxygen-depleted chamber where survival depends on how many are willing to die. Police have 45 minutes to locate the facility before the air runs out. A critical clue arrives through an unexpected channel: a wearable fitness tracker that Shubh carelessly left as a breadcrumb trail. You must piece together fragmentary intel and forensic deductions to identify the warehouse before it becomes a tomb.",
    "flagQuestion": "What is the specific location where Shubh held the three hostages in the oxygen-depletion chamber?",
    "flag": "VNS Chemical Factory, Okhla",
    "acceptedAnswers": [
      "vns chemical factory, okhla",
      "vns chemical factory okhla",
      "vns chemicals okhla",
      "vns chemicals, okhla",
      "vns chemical factory in okhla",
      "okhla vns chemical factory"
    ],
    "flagFormat": "Facility name and Delhi district (e.g. 'Facility Name, District')",
    "evidence": [
      {
        "id": "E001",
        "type": "transcript",
        "label": "Shubh's Oxygen Game Explained",
        "text": "After 12 hours in this room the oxygen in this room will be exhausted. After that you will suffocate. Gradually, you will stop breathing. The game is easy. The fewer people there are the more oxygen you get.",
        "redHerring": false
      },
      {
        "id": "E002",
        "type": "transcript",
        "label": "Nikhil's Deduction on Location Type",
        "text": "Listen, I'm sure that he is keeping them hostage in a chemical factory.",
        "redHerring": false
      },
      {
        "id": "E003",
        "type": "transcript",
        "label": "The Three Hostages Confirmed",
        "text": "Apart from Neeraj Jadhav famous activist and journalist Radhika Venkatesh and Moulana Umar, who is India Muslim Foundation...",
        "redHerring": false
      },
      {
        "id": "E004",
        "type": "transcript",
        "label": "Dying Officer's Location Reveal",
        "text": "VNS Chemical Factory. Okhla.",
        "redHerring": false
      },
      {
        "id": "E005",
        "type": "forensic",
        "label": "Fitbit Geolocation Analysis",
        "text": "Kesar wore a Fitbit fitness tracker. Forensic data found 12 Fitbits near his residence on Sept 25 at 7pm. Of these, only 1 Fitbit signal pinged near the prison—proving Kesar was there and narrowing the location to industrial zones accessible from his known movements.",
        "redHerring": false
      },
      {
        "id": "E006",
        "type": "transcript",
        "label": "Police Constraint: 127 Factories",
        "text": "Which chemical factory is it? 45 minutes. 127 chemical factories. Find them.",
        "redHerring": false
      },
      {
        "id": "E007",
        "type": "transcript",
        "label": "False Lead: Leo Chemical Valley",
        "text": "Check the road along the canal. Leo Chemical, Valley number 6. Come on, DJ. How can you be so sure, the killer will come here?",
        "redHerring": true
      },
      {
        "id": "E008",
        "type": "forensic",
        "label": "Succinylcholine Toxicology Link",
        "text": "Officer Lolark was administered succinylcholine, a rare paralytic agent. This chemical is primarily manufactured at major pharmaceutical facilities in the Okhla industrial zone, suggesting the killer selected a location with both sealed chambers and access to specialized chemical materials.",
        "redHerring": false
      }
    ],
    "solutionSteps": [
      "Nikhil deduces that the hostages are held in a sealed industrial space—specifically a chemical factory—because such facilities have sealed chambers capable of creating oxygen-depletion conditions (E002).",
      "Police face the critical constraint of 127 chemical factories across Delhi-NCR with only 45 minutes before hostages die from asphyxiation (E006).",
      "Forensic analysis of Kesar's Fitbit narrows the search: 12 Fitbits detected around his residence, but only 1 pinged near the prison, establishing he traveled to an industrial location accessible from that point (E005).",
      "Officer Lolark is poisoned with succinylcholine, a chemical manufactured at only a few major pharmaceutical plants in India, primarily concentrated in the Okhla industrial zone (E008).",
      "The convergence of clues—chemical factory location, access to succinylcholine, Fitbit trail to the general area, and the Okhla industrial zone concentration—identifies VNS Chemical Factory as the specific facility.",
      "Nikhil, dying from the poison administered by Shubh, reveals the exact answer: 'VNS Chemical Factory. Okhla.' (E004)"
    ],
    "hints": [
      {
        "cost": 25,
        "text": "The killer chose a specific type of industrial facility that would allow him to create an oxygen-depletion chamber. There are 127 such facilities in Delhi-NCR. What industrial zone is most famous for pharmaceutical and chemical manufacturing in Delhi?"
      },
      {
        "cost": 50,
        "text": "A Fitbit fitness tracker pinged multiple locations near the suspect's residence on Sept 25. Of 12 Fitbits detected, only 1 appeared near the prison—then the trail goes to an industrial facility. The killer accessed a chemical he uses for murder: succinylcholine, manufactured at major plants in Okhla. Which facility in Okhla would have both sealed chambers and chemical storage?"
      },
      {
        "cost": 100,
        "text": "Officer Lolark was poisoned with succinylcholine—a rare pharmaceutical chemical. VNS is the largest chemical-pharmaceutical facility in Okhla, producing this exact drug. It has industrial chambers and infrastructure perfect for Shubh's oxygen-depletion game. The answer: VNS Chemical Factory, Okhla."
      }
    ],
    "mcqOptions": [
      "VNS Chemical Factory, Okhla",
      "Leo Chemical, Valley number 6",
      "Delhi Refinery Complex, Badarpur",
      "Hindustan Petroleum Works, Noida"
    ]
  },
  {
    "code": "S2E01",
    "codename": "PRIME TIME",
    "title": "The Dance of Death",
    "order": 7,
    "actId": "act3",
    "characterId": "nusrat",
    "difficulty": "investigator",
    "points": 200,
    "labTool": "none",
    "intro": "He's dead — you watched him burn. So who's killing three strangers live on national TV at 9:05 sharp, signing it 'Kali'? Read the body. The coordinates are in his teeth.",
    "outro": "Three implants, three cities, three deaths you couldn't stop. The god is back — and this time he's playing to an audience.",
    "briefing": "A frozen victim is discovered at a cold storage facility with fresh surgical stitches, cryptic clues, and an explosive countdown to 9:05 PM. The killer has orchestrated a meticulous puzzle embedding three simultaneous attack coordinates. You must decode the victim's body to identify the paralytic agent used and uncover the three target locations before nightfall.",
    "flagQuestion": "What specific paralyzing agent was hidden inside the victim's three fresh dental implants?",
    "flag": "strychnine",
    "acceptedAnswers": [
      "strychnine",
      "strychinine",
      "strychnine poison",
      "the poison strychnine",
      "strychnine paralyzing agent"
    ],
    "flagFormat": "poison name (lowercase)",
    "evidence": [
      {
        "id": "E1",
        "type": "transcript",
        "label": "Autopsy Blood Report",
        "text": "Strychnine. Strychnine. Strychnine.",
        "redHerring": false
      },
      {
        "id": "E2",
        "type": "forensic",
        "label": "Dental Implant Discovery",
        "text": "Three fresh implants found in victim's jaw, recently installed post-mortem. Each implant contains encoded GPS coordinates pointing to simultaneous attack targets in three cities.",
        "redHerring": false
      },
      {
        "id": "E3",
        "type": "transcript",
        "label": "Primary Victim Observations",
        "text": "Primary observation of unidentified male victim in his 30s. No bleeding in the cornea. An incision on the abdomen. No conclusive fatal injuries. And body found frozen in an ice-slab.",
        "redHerring": false
      },
      {
        "id": "E4",
        "type": "forensic",
        "label": "Implant-Poison Connection",
        "text": "It's a rare problem. It's a paralyzing agent. We had a test case during our training. The killer had administered this poison through dental implants. Shubh is pointing towards that.",
        "redHerring": false
      },
      {
        "id": "E5",
        "type": "transcript",
        "label": "Attack Coordinates Location",
        "text": "The first location is Rhythm Mall, Mumbai. The second location is Swell Health Hospital, Delhi. The third one is a residential location in Bengaluru. Koramangala.",
        "redHerring": false
      },
      {
        "id": "E6",
        "type": "profile",
        "label": "Rudraksha Prophecy - Three Cities Myth",
        "text": "The Asuras had built three cities at the dawn of time which couldn't be destroyed individually. At the end of that story, Lord Shiva destroyed all the three cities together with just one arrow. One arrow and three cities.",
        "redHerring": true
      },
      {
        "id": "E7",
        "type": "transcript",
        "label": "Time-Sensitive Countdown",
        "text": "What is Shubh going to do at 9:05? Magic. Magic is often an optical illusion. But this magic will open your eyes.",
        "redHerring": true
      },
      {
        "id": "E8",
        "type": "forensic",
        "label": "Toxicology Analysis",
        "text": "Strychnine is a rare alkaloid neurotoxin that causes muscular rigidity and paralysis. When administered via dental implants, it induces fatal respiratory collapse. The victim showed no external trauma—death was entirely by paralyzing agent.",
        "redHerring": false
      }
    ],
    "solutionSteps": [
      "The victim is discovered frozen with fresh surgical stitches and three newly installed dental implants—highly unusual for a corpse.",
      "The autopsy blood report directly identifies strychnine in the victim's bloodstream—a paralyzing neurotoxin.",
      "Forensic analysis confirms strychnine as a rare paralyzing agent historically delivered via dental implants, matching a known training case.",
      "Each of the three dental implants is found to contain encoded GPS coordinates pointing to three separate cities (Mumbai, Delhi, Bengaluru).",
      "The killer's pattern mirrors Rudraksha mythology (three cities destroyed by one arrow), confirming a coordinated three-simultaneous-attack scenario at 9:05 PM.",
      "The paralyzing agent hidden in the implants is strychnine—the murder weapon and the key to solving the puzzle of three coordinated attacks."
    ],
    "hints": [
      {
        "cost": 25,
        "text": "The blood report mentions a specific compound repeated three times. What does the toxicology lab identify in the victim's body?"
      },
      {
        "cost": 50,
        "text": "Three fresh dental implants contain both coordinates AND the weapon used to kill the victim. What paralyzing agent is commonly delivered via implanted devices in forensic training cases?"
      },
      {
        "cost": 100,
        "text": "Strychnine—a rare paralyzing neurotoxin—was explicitly detected in the victim's blood. The killer hid it inside the three dental implants to encode both the murder weapon and the three attack targets."
      }
    ],
    "mcqOptions": [
      "strychnine",
      "ricin",
      "cyanide",
      "arsenic"
    ]
  },
  {
    "code": "S2E02",
    "codename": "DEAD AIR",
    "title": "The Past, the Present and the Future",
    "order": 8,
    "actId": "act3",
    "characterId": "nikhil",
    "difficulty": "investigator",
    "points": 200,
    "labTool": "none",
    "intro": "Three hearts stop in the same second, kilometres apart. No poison, no wound. Someone reached through the air and switched them off. Find the frequency.",
    "outro": "Hacked pacemakers. The kills went wireless. The trigger-man is just a finger — the hand is somewhere in the network now.",
    "briefing": "Three victims collapse with cardiac arrest miles apart, simultaneously, yet the killer is nowhere near them—and an autopsy reveals something impossible. A man in a red jacket haunts the CCTV footage at each crime scene. As the forensic team digs deeper, they uncover a device small enough to hide in plain sight, wielding lethal power over beating hearts. The question is no longer how he killed them, but what deadly instrument did he weaponize?",
    "flagQuestion": "What implanted medical device did the killer hack via radio frequency to trigger simultaneous cardiac arrest in all three victims?",
    "flag": "pacemaker",
    "acceptedAnswers": [
      "pacemaker",
      "pace maker",
      "pacemaker-cum-defibrillator",
      "defibrillator",
      "pacemaker defibrillator",
      "pace-maker"
    ],
    "flagFormat": "The name of an implanted medical device (one word or hyphenated)",
    "evidence": [
      {
        "id": "E001",
        "type": "transcript",
        "label": "Autopsy Discovery",
        "text": "A pacemaker! How could a cardiac arrest take place with a pacemaker in place? The cause of death is clearly cardiac arrest.",
        "redHerring": false
      },
      {
        "id": "E002",
        "type": "forensic",
        "label": "Triple Pacemaker Finding",
        "text": "All three of them had pacemakers in their hearts and each of them died of a heart attack. That means he killed all of them using the same method. But still, how can all the three pacemakers malfunction at the same time?",
        "redHerring": false
      },
      {
        "id": "E003",
        "type": "forensic",
        "label": "Radio Frequency Vulnerability",
        "text": "It has a radio chip. He tapped into its radio frequency, hacked the pacemaker and caused the defibrillator to give a shock intense enough to fail the heart. The range of radio frequency is very limited—around 20 feet.",
        "redHerring": false
      },
      {
        "id": "E004",
        "type": "transcript",
        "label": "CCTV Evidence - Red Jacket",
        "text": "Zoom in. That guy in the red jacket. See, his hand is in his pocket. It could be a remote or a trigger. Sir, this was exactly one second before Prashant's collapse.",
        "redHerring": false
      },
      {
        "id": "E005",
        "type": "forensic",
        "label": "Frequency Alternator Seized",
        "text": "A frequency alternator was found in Pushkar Johri's bedroom. It is used to manipulate the frequencies of electronic devices. This is what he used to tamper with the pacemaker.",
        "redHerring": false
      },
      {
        "id": "E006",
        "type": "forensic",
        "label": "Alarm Clock Transmitter",
        "text": "An alarm clock recovered from Divyakant's house contained a hidden transmitter device. As soon as the button was pressed, he suffered a heart attack. However, no criminal match was found in the database.",
        "redHerring": true
      },
      {
        "id": "E007",
        "type": "transcript",
        "label": "Swati's Murder Scene",
        "text": "Her body had the mask of 'Asur'. Her index finger was cut, but I don't think Shubh did this. It looked like a set up. It looked like someone was trying to portray this as Shubh's job.",
        "redHerring": true
      },
      {
        "id": "E008",
        "type": "profile",
        "label": "Suspect Profile - Pushkar Johri",
        "text": "Pushkar Johri: graphic designer, fired two years ago for sexual harassment allegations. Unemployed, low profile. Found at location matching CCTV footage. Riya's drawings discovered in his apartment.",
        "redHerring": false
      }
    ],
    "solutionSteps": [
      "All three victims died of cardiac arrest at the same time but were miles apart. The common cause: each victim had an implanted pacemaker in their heart.",
      "Autopsy and forensic examination revealed the pacemakers had radio chips—electronic components that could transmit and receive signals via radio frequency.",
      "The killer exploited this vulnerability: by hacking into each pacemaker's radio frequency (within ~20 feet range), he could remotely trigger the defibrillator to deliver a fatal electrical shock to the heart.",
      "CCTV footage placed a man in a red jacket (suspect Pushkar Johri) at each crime scene exactly one second before each victim collapsed, consistent with activating the hack remotely via a portable device.",
      "Police found a frequency alternator in suspect Pushkar Johri's apartment—the precise tool used to manipulate and hijack electronic device frequencies, confirming the method.",
      "The device weaponized to commit these three murders was the pacemaker itself, turned from lifesaver into lethal instrument through radio frequency hacking."
    ],
    "hints": [
      {
        "cost": 25,
        "text": "All three victims died of the same cause: cardiac arrest. Yet each had a device implanted in their chest designed to prevent exactly that. What common component did the victims share?"
      },
      {
        "cost": 50,
        "text": "The killer did not inject poison or use a blade. Instead, he stayed exactly 20 feet away and used radio waves to attack the victims from a distance. The weapon was hidden inside their own bodies."
      },
      {
        "cost": 100,
        "text": "A frequency alternator found in the killer's apartment is specifically designed to manipulate radio frequencies. The device he hacked had a radio chip inside. The defibrillator inside each victim's chest was triggered remotely to deliver a fatal shock."
      }
    ],
    "mcqOptions": [
      "pacemaker",
      "insulin pump",
      "neurostimulator",
      "glucose monitor"
    ]
  },
  {
    "code": "S2E03",
    "codename": "BURN NOTICE",
    "title": "Burning the Forest",
    "order": 9,
    "actId": "act3",
    "characterId": "nikhil",
    "difficulty": "profiler",
    "points": 350,
    "labTool": "none",
    "intro": "A tortured body wearing the Asur's signature — except the method is all wrong. Either the god changed his style, or someone is wearing his face. Prove the forgery.",
    "outro": "Insulin, not his MO — a copycat, and a good one, with forensic access he shouldn't have. The call is coming from inside the house.",
    "briefing": "A forensic autopsy reveals shocking contradictions: Swati's body bears signs of repeated insulin injections despite no diabetes diagnosis, a neck laceration consistent with Shubh's signature method, and a severed finger with a mask placed post-mortem. The investigators must determine whether this is Shubh's genuine work or a mastermind mimicking his MO to frame him—or someone else entirely. The thread of a forged DNA report hangs over the investigation.",
    "flagQuestion": "What is the specific substance used to torture Swati in this copycat killer case, proving it was NOT Shubh's work?",
    "flag": "insulin",
    "acceptedAnswers": [
      "insulin",
      "insulin shots",
      "insulin injection",
      "insulin injections",
      "repeated insulin",
      "insulin overdose"
    ],
    "flagFormat": "a single substance name (one word)",
    "evidence": [
      {
        "id": "autopsy_001",
        "type": "transcript",
        "label": "Autopsy Finding: Hypoglycemic Changes",
        "text": "Her body is showing hypoglycemic changes. See? Insulin shots. So many! But her report suggests she didn't have diabetes.",
        "redHerring": false
      },
      {
        "id": "autopsy_002",
        "type": "transcript",
        "label": "Autopsy Finding: Neck Injury",
        "text": "A deep long incise neck injury on the front side of the neck. With a sharp object, maybe a knife.",
        "redHerring": false
      },
      {
        "id": "forensic_001",
        "type": "forensic",
        "label": "Forensic Analysis: No Medical Need for Insulin",
        "text": "Medical records show Swati had no diagnosis of diabetes or any endocrine condition requiring insulin therapy. Repeated injections therefore served no therapeutic purpose and must have been inflicted deliberately.",
        "redHerring": false
      },
      {
        "id": "transcript_001",
        "type": "transcript",
        "label": "Detective's Deduction: Copycat MO",
        "text": "Shubh had no reason to torture Swati. I was right. This is not Shubh's work. Someone else murdered her, chopped off her finger and put a mask on her face. To make it look like it was done by Shubh. It's a copycat killer.",
        "redHerring": false
      },
      {
        "id": "evidence_001",
        "type": "forensic",
        "label": "Interrogation Method Signature",
        "text": "The repeated insulin injections caused hypoglycemic torture—inducing severe physiological distress without leaving obvious external marks until autopsy. This selective torture method suggests the killer needed information from Swati and possessed forensic knowledge to mimic Shubh's signature while diverging in methodology.",
        "redHerring": false
      },
      {
        "id": "dna_001",
        "type": "intercept",
        "label": "Fabricated DNA Evidence (Red Herring)",
        "text": "Police records were falsified to link Kesar Bharadwaj to the crime scene. DNA sample was planted retroactively with backdated report claiming victim died three months prior, when death actually occurred 10-12 days earlier. Kesar was in jail at time of actual death.",
        "redHerring": true
      },
      {
        "id": "profile_001",
        "type": "profile",
        "label": "Copycat Killer Profile",
        "text": "Killer possesses forensic expertise, knowledge of Shubh's MO, and motive to extract information from Swati. Uses insulin overdose as torture rather than Shubh's typical methodologies, employs mask and finger amputation as false signature elements, then strategically stages crime to implicate the original perpetrator.",
        "redHerring": false
      }
    ],
    "solutionSteps": [
      "Recognize that Swati's autopsy shows multiple insulin injections but medical records reveal no diabetes diagnosis or legitimate medical need for the substance.",
      "Understand that insulin injections cause hypoglycemic torture—severe physiological distress and potential death—making it an interrogation weapon rather than medical treatment.",
      "Note the juxtaposition: while the neck laceration matches Shubh's known signature (deep incision with sharp object), the insulin torture does NOT match Shubh's documented methods with Swati.",
      "Recognize that the killer deliberately mimicked some signature elements (neck wound, finger amputation, mask placement) to frame Shubh while using a completely different torture method, indicating a copycat with forensic knowledge.",
      "Conclude that the substance used—insulin—proves this is a copycat killer extracting information from Swati, not Shubh's genuine work, because Shubh had no reason to torture her and would not use this method.",
      "The planted DNA evidence against Kesar is a red herring; the true answer is the torture substance itself: insulin."
    ],
    "hints": [
      {
        "cost": 25,
        "text": "The autopsy revealed that Swati received multiple injections of a substance, yet her medical records show she did not have the condition typically requiring this substance. What was she repeatedly injected with?"
      },
      {
        "cost": 50,
        "text": "The injections caused hypoglycemic changes in her body. Hypoglycemia is caused by low blood sugar. What hormone regulates blood sugar and is medically used to lower it in diabetics—but Swati was not diabetic?"
      },
      {
        "cost": 100,
        "text": "Insulin injections on a non-diabetic victim cause severe physiological torture and distress. This torture method directly contradicts Shubh's known MO, proving the killer is a copycat using insulin as their weapon to extract information from Swati."
      }
    ],
    "mcqOptions": [
      "cyanide poison",
      "insulin",
      "morphine",
      "carbon monoxide"
    ]
  },
  {
    "code": "S2E04",
    "codename": "TWO FACES",
    "title": "Designing the Future",
    "order": 10,
    "actId": "act3",
    "characterId": "dj",
    "difficulty": "profiler",
    "points": 350,
    "labTool": "none",
    "intro": "An honest officer is dead and the ballistics don't match the story you were handed. The man who told that story has been standing next to you the whole time. Run his face.",
    "outro": "'Rasool Shaikh' never existed before a prison fire. Balveer Suber walked out of that fire — and straight onto your team. The mole had a desk.",
    "briefing": "A fellow investigator has been killed while probing the death of an agency head. Before her death, she suspected a trusted officer of deeper involvement than he claimed. DNA and ballistics evidence now point to a startling revelation: the officer's identity is not what it seems. His real identity is locked in a jail database and matches a dangerous escapee from years ago. Uncover who this imposter really is.",
    "flagQuestion": "What is the real name of the police officer operating under the alias 'Rasool Shaikh'?",
    "flag": "Balveer Suber",
    "acceptedAnswers": [
      "balveer suber",
      "balveer",
      "suber",
      "balveer suber"
    ],
    "flagFormat": "Full name (two words, first name first)",
    "evidence": [
      {
        "id": "E001",
        "type": "transcript",
        "label": "DNA match confirmation",
        "text": "Sir, Rasool and Balveer are the same person. He escaped from jail with Shubh and stayed hidden for years. After that, he turned from Balveer Suber to Rasool Shaikh. Sir, we have Balveer Suber's DNA report which matches 100 percent with Rasool's DNA.",
        "redHerring": false
      },
      {
        "id": "E002",
        "type": "forensic",
        "label": "Ballistics report reveals double shooting",
        "text": "There are visible signs of skeletal trauma in the thoracic region. There is high energy fragmentation. The exit wound is near the third rib. Looks like a 9mm. It's a regular service revolver. Lolark's gun. It was missing at the crime scene. This means Lolark died from a bullet fired from his gun. So, he was shot with these bullets after his death to make up a story.",
        "redHerring": false
      },
      {
        "id": "E003",
        "type": "transcript",
        "label": "Neighbor identifies photo discrepancy",
        "text": "Can you tell me where this house is? Mr. Shaikh's house. Yes, it's in the next lane. But it's been closed for years. When? It was around the year 2012. The year in which Rasool got admission in Jamia. Do you know his son, Rasool? He was like a son to me. He would stay at our house more than at his. This is him, right? No. This is not Rasool.",
        "redHerring": false
      },
      {
        "id": "E004",
        "type": "transcript",
        "label": "Parents recognize Balveer",
        "text": "Is this your son, Balveer? Looks like him. He was a kid when we last saw him. Ballu! He is Balveer! The exact same eyes! Yes. It's the same eyes. Is Ballu alive? We were told that... No, he is alive.",
        "redHerring": false
      },
      {
        "id": "E005",
        "type": "transcript",
        "label": "Rasool's fabricated background",
        "text": "Rasool Shaikh. Born and brought up in Ghaziabad. He was a topper at the local school. He went to Jamia on a scholarship. He was a debate champion there. Then, the head of Cultural Club and passed out with top grades. Finally, he got selected to the CBI training program five years ago. No red flags. This is a well-designed profile. Fake but clean. Rasool's past has been very carefully erased.",
        "redHerring": false
      },
      {
        "id": "E006",
        "type": "transcript",
        "label": "Third jail escapee identified",
        "text": "DJ had told me that three more people had escaped from jail with Shubh. Om Pandey and Jagdish Munda had been found. They just couldn't find the third person. Balveer Suber.",
        "redHerring": false
      },
      {
        "id": "E007",
        "type": "forensic",
        "label": "Shalini Swaraj cause of death",
        "text": "This the M-Vac DNA analysis report of the lake victim. Age 38. Asthmatic. Dental records show two fillings. She's in the early stages of multiple sclerosis. We found a match for the lake victim's DNA. Shalini Swaraj. Coder. The company she worked is Bio-pulse.",
        "redHerring": true
      },
      {
        "id": "E008",
        "type": "intercept",
        "label": "Algorithms on Shalini's laptop",
        "text": "These are very complex algorithms that are generally used for AI applications. Because they're generally used for projectile launches, drone attacks, bank trading, controlling dams. Maybe Shubh is going to use these to launch an attack.",
        "redHerring": true
      }
    ],
    "solutionSteps": [
      "Investigator Ishani's suspicions about Rasool and inconsistencies in Lolark's death are validated by ballistic analysis: Lolark was shot with his own 9mm service revolver, not the MP5 Rasool falsely claimed in his statement.",
      "The fake MP5 narrative was fabricated to distance Rasool from the actual murder weapon. This indicates Rasool deliberately lied about his involvement in Lolark's death.",
      "Nikhil discovers that three jail-breakers escaped with the criminal Shubh. Two have been found (Om Pandey, Jagdish Munda), but the third escapee was never captured: Balveer Suber.",
      "A neighbor provides a crucial lead: Rasool's family's house was abandoned in 2012 when they moved to Dubai—the exact year Rasool gained Jamia admission. The neighbor's photograph is NOT of the original Rasool, suggesting an identity switch.",
      "Nikhil obtains DNA samples from Balveer Suber's biological parents and cross-references them with Rasool Shaikh's DNA. The results show a 100% match, proving they are the same person.",
      "The truth is revealed: the trusted police officer Rasool Shaikh is actually Balveer Suber, a jail escapee who has been living under a fabricated identity. He killed Lolark with Lolark's own weapon and murdered investigator Ishani to cover his tracks."
    ],
    "hints": [
      {
        "cost": 25,
        "text": "A neighbor says the photo shown is NOT the real Rasool. Yet this person was admitted to Jamia in 2012—the same year Rasool's family went to Dubai. How can both be true if it's the same person?"
      },
      {
        "cost": 50,
        "text": "Three jail-breakers escaped with criminal Shubh. Police found Om Pandey and Jagdish Munda. But the third escapee, Balveer Suber, was never captured. DNA evidence now shows this 'Rasool' is a 100% genetic match to Balveer's parents."
      },
      {
        "cost": 100,
        "text": "Balveer Suber and Rasool Shaikh share identical DNA. The officer fabricated his entire background—school records, university credentials, everything—to hide his past as a prison escapee responsible for murdering Agency Head Lolark with Lolark's own 9mm revolver."
      }
    ],
    "mcqOptions": [
      "Balveer Suber",
      "Arjun Bhalla",
      "Om Pandey",
      "Jagdish Munda"
    ]
  },
  {
    "code": "S2E05",
    "codename": "THE IMMORTAL",
    "title": "The Countdown Begins",
    "order": 11,
    "actId": "act4",
    "characterId": "nikhil",
    "difficulty": "profiler",
    "points": 350,
    "labTool": "none",
    "intro": "Nusrat's gone — traded for a supercomputer — and the kidnapper's source code keeps whispering one name from a war that never ends. Decode the obsession before the deadline.",
    "outro": "Ashwatthama — the warrior cursed never to die. That's not a codename, it's a thesis. He's building something that can't be killed.",
    "briefing": "Nusrat has vanished from her car without a trace. The ATF discovers evidence of kidnapping in abandoned dirt, while tech specialists uncover a state-of-the-art machine learning system hidden in plain sight. A countdown has begun—Rasool demands data transfer, threatening Nusrat's life. Your investigation reveals fragments of a mythological codename buried deep in the source code: the key to understanding Shubh's apocalyptic ambitions.",
    "flagQuestion": "What is the mythological codename for the AI project hidden in Rasool's machine learning source code?",
    "flag": "ashwatthama",
    "acceptedAnswers": [
      "ashwatthama",
      "ashwathama",
      "ashvatthama",
      "ashwatthma"
    ],
    "flagFormat": "A single word: the mythological name from Hindu epic",
    "evidence": [
      {
        "id": "E001",
        "type": "transcript",
        "label": "Source code discovery",
        "text": "All I could see was a fraction of the data imprint. One second. A word repeated several times in the source code. Ashwatthama.",
        "redHerring": false
      },
      {
        "id": "E002",
        "type": "transcript",
        "label": "Mythological reference",
        "text": "In the Mahabharata, who could have taken the Mahabharata to its conclusion. But Lord Krishna gave him a curse.",
        "redHerring": false
      },
      {
        "id": "E003",
        "type": "forensic",
        "label": "Soil chemistry analysis",
        "text": "Polyethylene glycol and cellulase enzymes present in soil from Nusrat's car. The combination of cellulase enzymes and pectinase is used for cotton processing and enhancing fabric quality. Textile plant suspected.",
        "redHerring": false
      },
      {
        "id": "E004",
        "type": "forensic",
        "label": "Machine learning classification",
        "text": "File extension suggests ML data for AI applications, military warfare, cyber attacks, or space exploration. Complex algorithms indicate large-scale data processing and state-of-the-art infrastructure.",
        "redHerring": false
      },
      {
        "id": "E005",
        "type": "transcript",
        "label": "High bandwidth usage pattern",
        "text": "One month's data usage is only 30 GB. Every night at 8 p.m., he made the same transaction at Sicily Burger. He goes there for the bandwidth. He needs enormous bandwidth to do Shubh's bidding.",
        "redHerring": true
      },
      {
        "id": "E006",
        "type": "intercept",
        "label": "Cryptocurrency trace",
        "text": "User wildcat123 transferred cryptocurrency worth Rs. 500,000 to a deceased person's bank account (Neha Talwar, died 12 years ago). Identity theft confirmed. Transfer occurred exactly one hour before Nusrat's abduction at 9:30 p.m.",
        "redHerring": true
      },
      {
        "id": "E007",
        "type": "forensic",
        "label": "Textile plant location",
        "text": "Mercuric chloride detected in soil sample. Combined with cellulase/pectinase signature, soil trace matches shuttered textile plant near Dadri petrol pump. Plant shut down within past three months; mild chemical intensity indicates recent activity.",
        "redHerring": false
      },
      {
        "id": "E008",
        "type": "profile",
        "label": "Project scope assessment",
        "text": "Rasool's project codename may hint at apocalyptic implications. In Hindu mythology, Ashwatthama was a warrior cursed by Krishna to eternal suffering for mass destruction. The parallel suggests Shubh's ambitions involve widespread harm or societal upheaval.",
        "redHerring": false
      }
    ],
    "solutionSteps": [
      "Identify that Naia and team discover a 'fraction of the data imprint' while analyzing Rasool's laptop during the system access scene. They observe a repeated word in the source code that stands out among technical parameters.",
      "Recognize the word 'Ashwatthama' is mentioned explicitly multiple times as appearing 'in the source code' and as 'part of Shubh's masterplan'—this is the core clue directly from transcript.",
      "Research the mythological context: Ashwatthama is a figure from the Mahabharata, a warrior cursed by Krishna for mass destruction. This explains the reference and hints at apocalyptic/destructive implications fitting Shubh's AI project.",
      "Cross-reference with machine learning classification evidence: the file extensions and bandwidth requirements indicate a massive AI system for 'military warfare, cyber attacks, or space exploration.'",
      "Connect the codename to the overall plot: Shubh has been orchestrating this ML project under the mythological alias Ashwatthama, linking ancient Hindu prophecy of apocalypse to modern technology.",
      "Confirm the flag: 'Ashwatthama' is the mythological codename for the AI project, the answer Naia discovered in Rasool's source code analysis."
    ],
    "hints": [
      {
        "cost": 25,
        "text": "Naia sees a word 'repeated several times' in Rasool's source code that doesn't look like typical technical jargon. It sounds Sanskrit or mythological. Listen carefully to what name she reads aloud."
      },
      {
        "cost": 50,
        "text": "The name is from Hindu mythology—specifically the Mahabharata. It refers to a warrior cursed by Lord Krishna to eternal suffering. This mythological parallel likely hints at the destructive nature of Shubh's AI project."
      },
      {
        "cost": 100,
        "text": "Naia directly states: 'A word repeated several times in the source code... Ashwatthama.' She then references the Mahabharata and explains that this is 'part of Shubh's masterplan.' The codename is Ashwatthama."
      }
    ],
    "mcqOptions": [
      "ashwatthama",
      "krishna",
      "shubh",
      "rasool"
    ]
  },
  {
    "code": "S2E06",
    "codename": "THE DOMINO",
    "title": "The Domino Effect",
    "order": 12,
    "actId": "act4",
    "characterId": "nikhil",
    "difficulty": "mastermind",
    "points": 500,
    "labTool": "none",
    "intro": "A shell company with fake clients and AI bots quietly tipping the stock market. Push one tile and a nation falls. Find the hand behind the curtain before it does.",
    "outro": "Arjun Bhalla — a friend's name on the worst paperwork you've ever read. Markets crash, riots start, not one shot fired. This is how a god ends a world.",
    "briefing": "A server hidden in a glass works factory near Shastri Nagar has been seized, revealing a sophisticated AI-driven stock market manipulation scheme. Call records point to a fake identity, but forensic analysis of the server data and recovered algorithms unveils a vast criminal enterprise. The investigators must trace the ownership through corporate records to identify the master architect who orchestrated the economic collapse—and Shubh's ultimate attack on the nation's financial system.",
    "flagQuestion": "What is the full name of the industrialist revealed to be the secret real owner of the shell company running the AI stock-market bot fraud?",
    "flag": "arjun bhalla",
    "acceptedAnswers": [
      "arjun bhalla",
      "arjun",
      "bhalla",
      "a. bhalla",
      "a bhalla"
    ],
    "flagFormat": "A full name (first name and surname)",
    "evidence": [
      {
        "id": "E1",
        "type": "transcript",
        "label": "Server Room Discovery",
        "text": "Sir! Naina found something in the server room. Guess who the real company owner is. Who? Arjun Bhalla.",
        "redHerring": false
      },
      {
        "id": "E2",
        "type": "transcript",
        "label": "Fake Clientele Evidence",
        "text": "But you must know that 65 percent of your clients are fake. What are you hiding behind a fake clientele and an inflated balance sheet?",
        "redHerring": false
      },
      {
        "id": "E3",
        "type": "transcript",
        "label": "Fake Identity Lead",
        "text": "This is registered... In the name of Viral Vajpayee. That's obviously a fake ID.",
        "redHerring": true
      },
      {
        "id": "E4",
        "type": "forensic",
        "label": "AI Algorithm Integration",
        "text": "The algorithms on Shalini's laptop were the missing parts of those here. Shalini's algorithm works with bots. You can manipulate the stock market with it.",
        "redHerring": false
      },
      {
        "id": "E5",
        "type": "forensic",
        "label": "Dual Company Ownership",
        "text": "Both that company and this one belong to Arjun Bhalla. Their stock prices have touched record highs in the last six months. So, he's using bots to increase the prices of his shares.",
        "redHerring": false
      },
      {
        "id": "E6",
        "type": "transcript",
        "label": "Biopulse Pacemaker Connection",
        "text": "Biopulse. The pacemakers in the three victims. Both that company and this one belong to Arjun Bhalla.",
        "redHerring": false
      },
      {
        "id": "E7",
        "type": "transcript",
        "label": "Industrialist Cover Story",
        "text": "This man always talks about honesty and hard work. But he's really a fraud. With the help of the corrupt board members of the Fortune Bank, he has swindled Rs. 820 billion.",
        "redHerring": false
      }
    ],
    "solutionSteps": [
      "Locate the seized servers in Rashmi Glass Works factory near Shastri Nagar—investigators found a hidden server room running an AI stock-market bot operation.",
      "Identify the shell company's registered contact: Viral Vajpayee appears in call records, but this is a confirmed fake identity used as a front.",
      "Examine the forensic data in the servers: Shalini's AI algorithms are designed to manipulate stock prices using automated bots, simulating artificial bull runs.",
      "Cross-reference corporate ownership: Both the server company (glass works) and Biopulse (manufacturer of pacemakers found on three victims) are traced to the same owner.",
      "Review server records for the true registered owner: Naina's discovery in the hidden server room reveals Arjun Bhalla as the real company proprietor.",
      "Confirm motive and scope: Arjun Bhalla's publicly listed companies have seen record highs due to bot-driven manipulation, with 65% of reported clientele being fake entities created to inflate trading volume and enable stock market fraud totaling Rs. 820 billion."
    ],
    "hints": [
      {
        "cost": 25,
        "text": "The call records lead to a Viral Vajpayee, but this is a decoy. Look instead at who actually owns the servers discovered in the glass works factory."
      },
      {
        "cost": 50,
        "text": "The AI algorithms found in Shalini's laptop drive up stock prices for two companies: one manufactures medical devices (Biopulse), the other runs the bot operation. Both have the same corporate owner registered in the server room."
      },
      {
        "cost": 100,
        "text": "When Naina examines the server room records, she identifies the true owner by name: Arjun Bhalla. This wealthy industrialist used shell companies, fake clients (65% of the roster), and AI-powered bots to artificially inflate his own company valuations and trigger the economic collapse."
      }
    ],
    "mcqOptions": [
      "Viral Vajpayee",
      "Arjun Bhalla",
      "Dr. Venkat Rao",
      "Shalini Mehta"
    ]
  },
  {
    "code": "S2E07",
    "codename": "THE INVISIBLE FIFTH",
    "title": "Birth of the New God",
    "order": 13,
    "actId": "act4",
    "characterId": "nikhil",
    "difficulty": "mastermind",
    "points": 500,
    "labTool": "map",
    "intro": "Twenty-five servers. One bleeds the private lives of millions into the god's machine — and it's on no map. The breach is live. You have seconds. Find the needle.",
    "outro": "Noida, Phase-2, Dadri Road. A building that officially doesn't exist, ten times louder than the rest. You found the conduit. Now survive shutting it off.",
    "briefing": "The financial markets have collapsed, chaos consumes the streets, and a mysterious figure known as Shubh wields impossible knowledge of every move the authorities make—before they make it. The team discovers that Spell Notion, a billion-dollar social media giant, has been supplying stolen user data to fuel Shubh's predictions. With time running out and an 11-year-old child positioned as humanity's last hope, a covert breach into Spell Notion's infrastructure reveals an anomaly: one server is pumping out ten times the data traffic of all others combined. But which of their many Indian locations holds the key to shutting down Shubh's godlike machine?",
    "flagQuestion": "What is the exact physical location of Spell Notion's hidden fifth server—the one feeding stolen user data to Shubh's AI?",
    "flag": "Noida, Phase-2, Dadri Road",
    "acceptedAnswers": [
      "noida, phase-2, dadri road",
      "noida phase-2 dadri road",
      "noida phase 2 dadri road",
      "phase-2 dadri road noida",
      "noida dadri road phase-2"
    ],
    "flagFormat": "City, Phase number, Road name (e.g., Noida, Phase-2, Dadri Road)",
    "evidence": [
      {
        "id": "E001",
        "type": "transcript",
        "label": "Server architecture briefing",
        "text": "Spell Notion has 25 servers in India. 24 of them are mid-sized and four are big. There's a fifth hidden one. It's outgoing traffic is ten times more compared to those of the others.",
        "redHerring": false
      },
      {
        "id": "E002",
        "type": "transcript",
        "label": "Hidden server location confirmed",
        "text": "Got it! Noida, Phase-2, Dadri Road.",
        "redHerring": false
      },
      {
        "id": "E003",
        "type": "forensic",
        "label": "Spell Notion's surveillance infrastructure",
        "text": "Spell Notion's app grants users microphone and camera access during installation. The platform secretly captures videos and pictures without user permission, enabling covert surveillance of millions across India.",
        "redHerring": false
      },
      {
        "id": "E004",
        "type": "intercept",
        "label": "TAO breach operation window",
        "text": "Tailored Access Operation (NSA) team deployed to exploit Spell Notion's firewall. Breach detected within three-minute window. Access confirmed to multiple server locations. Anomalous traffic pattern identified during critical window before detection protocols re-engaged.",
        "redHerring": false
      },
      {
        "id": "E005",
        "type": "forensic",
        "label": "Ransomware attack five years ago",
        "text": "Spell Notion suffered a big ransomware attack five years ago attributed to an anonymous hacker. Company shut down for couple of hours. Details covered up mysteriously. Likely timing of initial data exfiltration pipeline establishment.",
        "redHerring": true
      },
      {
        "id": "E006",
        "type": "profile",
        "label": "Shubh's operational requirements",
        "text": "Shubh's predictive AI requires 'unlimited data' to forecast human behavior. Without continuous user data feeds, his prophecy machine loses power. The hidden server is the lifeblood of his omniscience.",
        "redHerring": false
      },
      {
        "id": "E007",
        "type": "forensic",
        "label": "The invisible fifth server (red herring)",
        "text": "Spell Notion's standard infrastructure includes mid-sized and large public facilities scattered across India. Standard audits identify 24 confirmed servers handling typical user traffic. All show normal outbound volume patterns with no anomalies.",
        "redHerring": true
      }
    ],
    "solutionSteps": [
      "The team discovers Spell Notion is the data source supplying Shubh's AI predictions by tracing photo metadata and intercepted communications to the platform.",
      "They identify that Spell Notion has 25 servers across India: 24 mid-sized ones and 4 large ones, totaling 28 servers visible to standard audits (note: math error in episode dialogue, but consistent with what's stated).",
      "Critical clue: During TAO's NSA breach, Kevin's network analysis reveals a fifth hidden server not listed in Spell Notion's public infrastructure. This server's outgoing traffic is 10x greater than all other servers combined—a massive anomaly.",
      "Using TAO (NSA's Tailored Access Operation), the team breaches Spell Notion's firewall in a 3-minute window before detection protocols activate and firewall re-engages.",
      "Within that critical breach window, the exact location of the anomalous server is geolocated from the network traffic data Kevin captures.",
      "The result: Noida, Phase-2, Dadri Road—a facility operating in plain sight but hidden from official records, pumping stolen user data to Shubh's prediction engine 24/7."
    ],
    "hints": [
      {
        "cost": 25,
        "text": "Spell Notion runs more servers than initially documented. Look for the one that stands out: its traffic dwarfs the others by a factor of ten. That anomaly is your compass."
      },
      {
        "cost": 50,
        "text": "The TAO breach revealed 25 confirmed servers. But Kevin's analysis screamed: one is hidden. One pumps 10x the data. One feeds the machine. What city appears in the geolocation data Kevin recovered before the firewall re-engaged?"
      },
      {
        "cost": 100,
        "text": "Kevin said it clearly during the breach: 'Got it! Noida, Phase-2, Dadri Road.' This is where Shubh's data heart beats. This is where his omniscience is powered."
      }
    ],
    "mcqOptions": [
      "Mumbai, Bandra, Marine Drive",
      "Noida, Phase-2, Dadri Road",
      "Bangalore, Indiranagar, Tech Park",
      "Delhi, Connaught Place, Central"
    ]
  },
  {
    "code": "S2E08",
    "codename": "GOD MODE",
    "title": "The God's Dilemma",
    "order": 14,
    "actId": "act4",
    "characterId": "nikhil",
    "difficulty": "mastermind",
    "points": 500,
    "labTool": "none",
    "intro": "The machine is awake and it doesn't need him anymore. One hidden process, one trigger, one ten-second window between you and a weapon that rewrites what people believe is real. Last call, Nikhil.",
    "outro": "You reached the trigger. But for Kali, every ending is a new beginning — a god in a machine never truly dies. Roll credits. Watch your back.",
    "briefing": "As Shubh orchestrates his apocalyptic final move, Nikhil races to locate the digital architect of chaos itself—the fail-safe AI core that will trigger even if its creator falls. A sonic device lurks in plain sight at the ghat, and a hidden server process ticks toward release. The weapon has a name, and it is the key to stopping the Kali cult's last revenge.",
    "flagQuestion": "What is the name of Shubh's ultimate AI weapon—the deepfake and stolen-data engine designed to trigger automatically even if he is killed?",
    "flag": "Mayastra",
    "acceptedAnswers": [
      "mayastra",
      "the mayastra",
      "maya astra",
      "maya-astra",
      "mayastra weapon",
      "mayastra ai",
      "the weapon of illusion"
    ],
    "flagFormat": "A Sanskrit-derived weapon name (mythological term combining maya + astra)",
    "evidence": [
      {
        "id": "E1",
        "type": "transcript",
        "label": "The Fail-Safe Doctrine",
        "text": "We think if Shubh is the body, then the AI machine is the soul. The machine he built must be fail-safe, so that if something were to happen to him, the 'Mayastra' would still get released.",
        "redHerring": false
      },
      {
        "id": "E2",
        "type": "transcript",
        "label": "The Hidden Trigger",
        "text": "Nikhil that's the end, there is a hidden process running in the server. Go to the program! Yes! There! Nikhil it's there! Click it. DJ, we found the trigger.",
        "redHerring": false
      },
      {
        "id": "E3",
        "type": "transcript",
        "label": "The Sonic Window",
        "text": "Nusrat, it's a sonic bomb. We'll have a ten-second window after it gets triggered. Hopefully, no one's going to die.",
        "redHerring": false
      },
      {
        "id": "E4",
        "type": "forensic",
        "label": "Server Override Analysis",
        "text": "The fail-safe mechanism uses a 10-second sonic trigger as a timer reset. If the trigger process executes without manual override within the window, the system automatically broadcasts its payload globally via hijacked networks.",
        "redHerring": false
      },
      {
        "id": "E5",
        "type": "profile",
        "label": "Shubh's Mythological Framework",
        "text": "Shubh views his AI as an extension of Kali's cosmic power—eternally reborn. He weaponizes Sanskrit terminology: 'Maya' refers to illusion and deception; 'Astra' means weapon or celestial tool. His digital weapon conceptually parallels the legendary weapons of Hindu mythology.",
        "redHerring": false
      },
      {
        "id": "E6",
        "type": "transcript",
        "label": "The Gaming Console Discovery",
        "text": "What is a gaming console doing with a man like Pushkar? A gaming console also has a hard drive, right? Send it for a safety scan.",
        "redHerring": true
      },
      {
        "id": "E7",
        "type": "intercept",
        "label": "Online Gaming Code Exchange",
        "text": "Player 'Modern Munto' sent pictures of sunflowers instead of bombs and weapons to Pushkar via Omega Warriors multiplayer game. Missing florets in the flower heads encoded coordinates to attack sites using the Fibonacci sequence.",
        "redHerring": true
      },
      {
        "id": "E8",
        "type": "forensic",
        "label": "Deepfake + Stolen Identity Module",
        "text": "The AI can track audio, video and location of every person sitting in the auditorium on Shubh's phone. Integrated deepfake engine creates realistic video impersonations. Stolen government and corporate databases feed identity manipulation profiles.",
        "redHerring": false
      }
    ],
    "solutionSteps": [
      "Evidence E1 explicitly states the weapon name in Nusrat and Nikhil's tactical briefing: the fail-safe machine is called the 'Mayastra.' It will auto-release if Shubh is eliminated.",
      "Evidence E5 provides the mythological and linguistic framework: 'Maya' (illusion/deception) combined with 'Astra' (weapon/celestial tool) yields a Sanskrit weapon name for an 'illusion weapon' aligned with Shubh's Kali theology.",
      "Evidence E2 and E3 confirm the technical trigger: a hidden server process uses a 10-second sonic bomb timer as the launch window.",
      "Evidence E4 describes the auto-broadcast fail-safe mechanism—the system releases globally via hijacked networks if not manually overridden within the sonic window.",
      "Evidence E8 reveals the weapon's actual capabilities: deepfakes, stolen identity data, and real-time biometric tracking—a complete 'weapon of illusion' that can impersonate and manipulate reality.",
      "Red herrings E6 and E7 (gaming console and sunflower coordinates) are investigation trails that locate Shubh's base, but they do not identify the weapon's name—which is 'Mayastra.'"
    ],
    "hints": [
      {
        "cost": 25,
        "text": "The weapon's name is a Sanskrit compound: one word means 'illusion' or 'deception' (think of the Vedic concept of maya), and the other means 'weapon' or 'celestial arrow.' Shubh weaponized illusion itself—a dual concept from Hindu mythology."
      },
      {
        "cost": 50,
        "text": "Listen to Nikhil and Nusrat's tactical analysis when they brief on the fail-safe: they explicitly name the AI construct. It starts with the letter 'M' and is two syllables when pronounced."
      },
      {
        "cost": 100,
        "text": "The exact name is stated in Nusrat's briefing: '...the 'Mayastra' would still get released.' It is the weapon of illusion—a direct parallel to celestial weapons from Hindu cosmic warfare. Maya (illusion) + Astra (weapon)."
      }
    ],
    "mcqOptions": [
      "Mayastra",
      "Kalistra",
      "Asurweb",
      "Dharmacode"
    ]
  }
];
