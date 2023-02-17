import {
  noAccessArgumentAudio,
  noAccessPrivateWhereabouts,
  noAccessSynthesisReport,
  policePostNetworkVulnerability,
} from "./messages";

export type Clue = {
  value: string;
  type: "file" | "photo" | "string";
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

export const newsMap: Record<string, Clue | Clue[]> = {
  "14-01-2045": photo("./news/masjid_kassim.png"),
  "01-02-2045": photo("./news/trump_towers.png"),
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
  cytotoxic:
    str(`Cytotoxic waste is a kind of radioactive waste containing substances with genotoxic properties. It has been observed that individuals infected by the NRS have displayed significant levels of such waste in their bloodstreams. 
In Singapore, Aroma Bio Chemical is the sole authorised entity to process such waste. The waste is brought to what is referred to as “The Yards”, the allocated disposal ground.`),
  "the yards": [
    str(
      "> The Yards (LAT 1.3146191, LONG 103.9110596) is a compound that belongs to Aroma Bio Chemical (ABC). It is known to be an allocated Chemical Waste Disposal plant."
    ),
    file("./files/400_log.txt"),
  ],
  "breakwater 4": photo("./files/breakwater_4.png"),
  breakwater4: photo("./files/breakwater_4.png"),
  essentials: photo("./files/essentials.png"),
};

export const locationSearch: Record<string, Clue | Clue[]> = {
  wx304912: photo("./cams/trump_tower_cams.png"),
  // access level 1: barber padu, shaking hands
  a8g7k9l0_1: [
    photo("./cams/A8G7K9L0_1.png"),
    photo("./files/access_level_2.png", noAccessPrivateWhereabouts),
  ],
  // access level 2: barber padu, shaking hands
  a8g7k9l0_2: photo("./cams/A8G7K9L0_2.png"),
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
    file("./files/H1I2J3K4.log"),
  ],
  // padu following victor
  114034: [
    photo("./cams/police_post_cams.png"),
    str(policePostNetworkVulnerability),
  ],
  // access_level 2: escape boat
  j7k6l5m4_2: photo("./cams/J7K6L5M4_2.png"),
  // access_level 3: escape boat
  j7k6l5m4_3: photo("./cams/J7K6L5M4_3.png"),
};

// a map to check if there exists some sort of access level requirements for any clue code
export const accessLevelRequirements: Record<string, number> = {
  a8g7k9l0: 2, // padu /cams (actually also has level 3, but not coding behaviour for it)
  h1i2j3k4: 3, // argument audio /cams
  p9q8r7s6: 2, // seek truth /hack
  j7k6l5m4: 3, // east coast boat /cams
  kronos: 3,
};

export const hackMap: Record<string, Clue | Clue[]> = {
  bfghjklq: file("./files/BFGHJKLQ.log"),
  p9q8r7s6_2: [
    str("Interecepting message..."),
    file("./files/P9Q8R7S6_2.log"),
    photo("./files/access_level_3.png", noAccessSynthesisReport),
  ],
  p9q8r7s6_3: [
    file("./files/P9Q8R7S6_3.log"),
    file("./files/NRS_synthesis_report_full.pdf"),
  ],
  cxlsdkse: file("./files/CXLSDKSE.log"), // trump - john intercepted message
  // infected list of patients at golden mountain
  devisieed: [
    str("Hacking into database..."),
    file("./files/NRS_synthesis_report.pdf"),
    file("./files/patient_infection_records.pdf"),
  ],
  kronos_2: [
    str("Exploiting nearby networks..."),
    photo("./cams/rock_1.png"), // Main Clue
    photo("./cams/rock_2.png"), // Main Clue
    photo("./cams/rock_3.png"), // Main Clue
    photo("./cams/the_argument.png"), // Side Clue
    str(noAccessArgumentAudio),
  ],
  kronos_3: [
    photo("./cams/the_argument.png"), // Side Clue
    file("./files/H1I2J3K4.log"),
  ],
  h1i2j3k4_2: [
    photo("./cams/the_argument.png"), // Side Clue
    str(noAccessArgumentAudio),
  ],
  h1i2j3k4_3: [
    photo("./cams/the_argument.png"), // Side Clue
    file("./files/H1I2J3K4.log"),
  ],
  m9n8o7p6: file("./files/M9N8O7P6.log"), // samantha and padu message
};
