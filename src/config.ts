// Config file

import { Planet } from "./modules/planet";

// stages:
export const STAGE_CONFIG = {
  count: 2,
  startIndex: 0,
};

// x many times planets are larger in the puzzle stage:
export const PUZZLE_PLANET_MULTIPLIER = 3;

// planet config:
export const PLANETS_CONFIG: Planet[] = [
  {
    name: "Mercury",
    description: "",
    scale: 1,
    solarOffsetAngle: -20,
    orbitalOffset: -10,
    image: "/planets/mercury.svg",
  },
  {
    name: "Venus",
    description: "",
    scale: 0.95,
    solarOffsetAngle: 12,
    orbitalOffset: -10,
    image: "/planets/venus.svg",
  },
  {
    name: "Earth",
    description: "",
    scale: 1,
    solarOffsetAngle: 20,
    image: "/planets/earth.svg",
  },
  {
    name: "Mars",
    description: "",
    scale: 0.6,
    solarOffsetAngle: -2,
    image: "/planets/mars.svg",
  },
  {
    name: "Jupiter",
    description: "",
    scale: 2.1,
    solarOffsetAngle: -8,
    image: "/planets/jupiter.svg",
  },
  {
    name: "Saturn",
    description: "",
    scale: 1.9,
    solarOffsetAngle: 12,
    image: "/planets/saturn.svg",
  },
  {
    name: "Uranus",
    description: "",
    scale: 1.6,
    solarOffsetAngle: 5,
    image: "/planets/uranus.svg",
  },
  {
    name: "Neptune",
    description: "",
    scale: 1.65,
    solarOffsetAngle: 30,
    image: "/planets/neptune.svg",
  },
];
