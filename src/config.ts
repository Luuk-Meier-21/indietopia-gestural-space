// Config file

import { Planet } from "./modules/planet";

export const STAGE_CONFIG = {
  count: 2,
  startIndex: 0,
};

export const PLANETS_CONFIG: Planet[] = [
  {
    name: "Mercury",
    description: "",
    scale: 1,
    solarOffsetAngle: -20,
    orbitalOffset: -10,
  },
  {
    name: "Venus",
    description: "",
    scale: 0.95,
    solarOffsetAngle: 12,
    orbitalOffset: -10,
  },
  {
    name: "Earth",
    description: "",
    scale: 1,
    solarOffsetAngle: 20,
  },
  {
    name: "Mars",
    description: "",
    scale: 0.6,
    solarOffsetAngle: -2,
  },
  {
    name: "Jupiter",
    description: "",
    scale: 2.1,
    solarOffsetAngle: -8,
  },
  {
    name: "Saturn",
    description: "",
    scale: 1.9,
    solarOffsetAngle: 12,
  },
  {
    name: "Uranus",
    description: "",
    scale: 1.6,
    solarOffsetAngle: 5,
  },
  {
    name: "Neptune",
    description: "",
    scale: 1.65,
    solarOffsetAngle: 30,
  },
];
