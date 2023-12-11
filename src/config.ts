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
    solarOffsetAngle: -10,
    orbitalOffset: -10,
  },
  {
    name: "Venus",
    description: "",
    solarOffsetAngle: 12,
    orbitalOffset: -10,
  },
  {
    name: "Earth",
    description: "",
  },
  {
    name: "Mars",
    description: "",
  },
  {
    name: "Jupiter",
    description: "",
  },
  {
    name: "Saturn",
    description: "",
  },
  {
    name: "Uranus",
    description: "",
  },
  {
    name: "Neptune",
    description: "",
  },
];
