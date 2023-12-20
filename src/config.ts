// Config file

import { Planet } from "./modules/planet";

// stages:
export const STAGE_CONFIG = {
  count: 2,
  startIndex: 0,
};

// x many times planets are larger in the puzzle stage:
export const PUZZLE_PLANET_MULTIPLIER = 3;

export const SOLAR_OFFSET = "100dvw";

// planet config:
export const PLANETS_CONFIG: Planet[] = [
  {
    name: "Mercury",
    description:
      "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.",
    scale: 0.4,
    // puzzleScaleMultiplier: 10,
    solarOffsetAngle: -20,
    orbitalOffset: -10,
    image: "/planets/mercury.svg",
  },
  {
    name: "Venus",
    description:
      "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.",
    scale: 0.9,
    solarOffsetAngle: 12,
    orbitalOffset: -10,
    image: "/planets/venus.svg",
  },
  {
    name: "Earth",
    description:
      "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.",
    scale: 1,
    solarOffsetAngle: 14,
    image: "/planets/earth.svg",
  },
  {
    name: "Mars",
    description:
      "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.",
    scale: 0.55,
    solarOffsetAngle: -2,
    image: "/planets/mars.svg",
  },
  {
    name: "Jupiter",
    description:
      "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.",
    scale: 4,
    puzzleScaleMultiplier: 2,
    solarOffsetAngle: -8,
    image: "/planets/jupiter.svg",
  },
  {
    name: "Saturn",
    description:
      "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.",
    scale: 5.5,
    puzzleScaleMultiplier: 2,
    solarOffsetAngle: 10,
    image: "/planets/saturn.svg",
  },
  {
    name: "Uranus",
    description:
      "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.",
    scale: 5,
    puzzleScaleMultiplier: 2,
    solarOffsetAngle: 5,
    image: "/planets/uranus.svg",
  },
  {
    name: "Neptune",
    description:
      "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.",
    scale: 2.7,
    solarOffsetAngle: 30,
    image: "/planets/neptune.svg",
  },
];
