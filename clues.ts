import {
  noAccessArgumentAudio,
  noAccessPrivateWhereabouts,
  noAccessSynthesisReport,
  policePostNetworkVulnerability,
  yards_400,
} from "./messages";

const aliases = new Map(
  Object.entries({
    "cytotoxic waste": ["cytotoxic"],
    padu: ["barber padu", "barber"],
    "the yards": ["yards"],
    "breakwater 4": ["breakwater4"],
    "golden mountain facility": ["golden mountain"],
    "the trumps": ["trumps", "trump tower", "the trump"],
    nrs: ["Neurodegenerative Reanimation Syndrome"],
    "masjid kassim": ["kassim", "masjid"],
    "wakaf kassim": ["wakaf"],
    "victor he": ["victor"],
    "dr nathan": ["nathan"],
    "dr samantha": ["samantha"],
  })
);

export function replaceWithAlias(text: string) {
  for (let [root, aliasWords] of aliases) {
    if (aliasWords.includes(text.toLowerCase())) {
      return root;
    }
  }

  return text.toLowerCase();
}

export type Clue = {
  value: string | number;
  type: "file" | "photo" | "string" | "checkpoint";
  caption?: string;
};

export function file(value: string): Clue {
  return {
    value: value,
    type: "file",
  };
}

export function photo(value: string, caption?: string): Clue {
  return {
    value: value,
    type: "photo",
    caption,
  };
}

export function str(value: string): Clue {
  return {
    value: value,
    type: "string",
  };
}

export function checkpoint(value: number): Clue {
  return {
    value,
    type: "checkpoint",
  };
}

export const newsMap: Record<string, Clue | Clue[]> = {
  "14-01-2045": [
    str(`pulling records...`),
    photo("./news/masjid_kassim.png"),
    checkpoint(2),
  ],
  "01-02-2045": [str(`pulling records...`), photo("./news/trump_towers.png")],
};

export const searchMap: Record<string, Clue | Clue[]> = {
  padu: str(
    `Padu is the owner and operator of the barber shop “Barber Padu” (LOC: A8G7K9L0). He is a suspect in relation to the case of the “Masjid Kassim Infection”, accused for being the spreader of the infection`
  ),
  "wakaf kassim": str(
    `> Wakaf Kassim is the owner of a mosque recently ravaged by the “Masjid Kassim Infection” outbreak that happened on 14th January 2045.`
  ),
  "golden mountain facility": str(
    `> Golden mountain facility (LAT 1.317652, LONG 103.908331) is an infection containment facility used to house both the infected and to attempt to treat those who have been exposed to the infection. It is a high-security facility built to contain the ravaging infection.`
  ),
  "cytotoxic waste":
    str(`Cytotoxic waste is a kind of radioactive waste containing substances with genotoxic properties. It has been observed that individuals infected by the NRS have displayed significant levels of such waste in their bloodstreams. 
In Singapore, Aroma Bio Chemical is the sole authorised entity to process such waste. The waste is brought to what is referred to as “The Yards”, the allocated disposal ground.`),
  "the yards": [
    str(
      "> The Yards (LAT 1.3146191, LONG 103.9110596) is a compound that belongs to Aroma Bio Chemical (ABC). It is known to be an allocated Chemical Waste Disposal plant."
    ),
    str(yards_400),
    checkpoint(5),
  ],
  "breakwater 4": [photo("./files/breakwater_4.png"), checkpoint(9)],
  essentials: [photo("./files/essentials.png"), checkpoint(8)],
  nrs: str(
    `The Neurodegenerative Reanimation Syndrome (NRS) Virus is a virus that turns its host into a cannibalistic zombie. It was first discovered on 13-01-2045 at the Masjid Kassim Incident.`
  ),
  "the trumps": str(
    `The Trumps is the building that houses the Donald Trump's HQ. It is also identified as the location by which Victor He was last seen.`
  ),
  "masjid kassim": str(
    `Masjid Kassim is a mosque located in the heart of Singapore. It is the location of the first outbreak of the NRS virus.`
  ),
  "donald trump": str(
    `Donald Trump is a renowned billionaire as well as politician. He has recently committed publicly to finding a cure to the NRS virus, and has personally funded much of Aroma Bio Chemical's research.`
  ),
  "victor he": str(
    `Victor He is known as the one who holds the Interleukin 10 Receptor Subunit Alpha (IL10RA) gene, the potential cure to the NRS virus. He was working closely with Aroma Bio Chemical to develop a cure to the NRS virus, till he went missing on 31-01-2045.`
  ),
  "dr samantha": str(
    `Dr. Samantha is daughter to the CEO of Aroma Bio Chemical (ABC), and Head of Operations at ABC. She is has been instrumental to the success of the company, and has been spearheading the push for a cure.`
  ),
  "dr nathan": str(
    `Dr. Nathan is a highly accomplished scientist and a leading expert in the field of biochemical research. He is the Head of Research at Aroma Bio Chemical and is reportedly missing. He is suspected to be the murder of Victor He.`
  ),
};

export const locationSearch: Record<string, Clue | Clue[]> = {
  wx304912: [
    str(`pulling surveillance...`),
    photo("./cams/trump_tower_cams.png"),
    checkpoint(1),
  ],
  // access level 1: barber padu, shaking hands
  a8g7k9l0_1: [
    photo("./cams/A8G7K9L0_1.png"),
    photo("./files/access_level_2.png", noAccessPrivateWhereabouts),
  ],
  // access level 2: barber padu, shaking hands
  a8g7k9l0_2: [
    str(`pulling surveillance...`),
    photo("./cams/A8G7K9L0_2.png"),
    checkpoint(3),
  ],
  a8g7k9l0_3: [str(`pulling surveillance...`), photo("./cams/A8G7K9L0_3.png")],
  b6h5m1n2: photo("./cams/rock_1.png"),
  e1f2g3h4: photo("./cams/rock_2.png"),
  c4d3e2f1: photo("./cams/rock_3.png"),
  // the argument
  h1i2j3k4_2: [
    photo("./cams/the_argument.png"), // Side Clue
    str(noAccessArgumentAudio),
  ],
  h1i2j3k4_3: [
    photo("./cams/the_argument.png"), // Side Clue
    file("./files/H1I2J3K4.txt"),
  ],
  // padu following victor
  114034: [
    str(`pulling surveillance...`),
    photo("./cams/police_post_cams.png"),
    str(policePostNetworkVulnerability),
  ],
  // access_level 2: escape boat
  j7k6l5m4_2: [str(`pulling surveillance...`), photo("./cams/J7K6L5M4_2.png")],
  // access_level 3: escape boat
  j7k6l5m4_3: [str(`pulling surveillance...`), photo("./cams/J7K6L5M4_3.png")],
};

// a map to check if there exists some sort of access level requirements for any clue code
export const accessLevelRequirements: Record<string, number> = {
  a8g7k9l0: 2, // padu /cams (actually also has level 3, but not coding behaviour for it)
  h1i2j3k4: 3, // argument audio /cams
  p9q8r7s6: 2, // seek truth /hack
  j7k6l5m4: 3, // east coast boat /cams
  kronos: 2,
};

export const hackMap: Record<string, Clue | Clue[]> = {
  bfghjklq: file("./files/BFGHJKLQ.txt"),
  p9q8r7s6_2: [
    str("Interecepting message..."),
    file("./files/P9Q8R7S6_2.txt"),
    photo("./files/access_level_3.png", noAccessSynthesisReport),
    checkpoint(7),
  ],
  p9q8r7s6_3: [
    file("./files/P9Q8R7S6_3.txt"),
    file("./files/NRS_synthesis_report_full.pdf"),
  ],
  cxlsdkse: file("./files/CXLSDKSE.txt"), // trump - john intercepted message
  // infected list of patients at golden mountain
  devisieed: [
    str("Hacking into database..."),
    file("./files/NRS_synthesis_report.pdf"),
    file("./files/patient_infection_records.pdf"),
    checkpoint(4),
  ],
  kronos_2: [
    str("Exploiting nearby networks..."),
    photo("./cams/rock_1.png"), // Main Clue
    photo("./cams/rock_2.png"), // Main Clue
    photo("./cams/rock_3.png"), // Main Clue
    photo("./cams/the_argument.png"), // Side Clue
    str(noAccessArgumentAudio),
    checkpoint(6),
  ],
  kronos_3: [
    str(`pulling surveillance...`),
    photo("./cams/the_argument.png"), // Side Clue
    file("./files/H1I2J3K4.txt"),
  ],
  h1i2j3k4_2: [
    photo("./cams/the_argument.png"), // Side Clue
    str(noAccessArgumentAudio),
  ],
  h1i2j3k4_3: [
    photo("./cams/the_argument.png"), // Side Clue
    file("./files/H1I2J3K4.txt"),
  ],
  m9n8o7p6: file("./files/M9N8O7P6.txt"), // samantha and padu message
  j7k6l5m4_3: file("./files/J7K6L5M4.txt"), // escape boat
};
