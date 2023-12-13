import { debugKeydown } from "./modules/debug";
import {
  PlanetBodyElement,
  PlanetOrbitElement,
  PlanetPuzzleCardElement,
} from "./modules/planet";
import { Stage } from "./modules/stage";
import { StageElement } from "./modules/stage-element";

import "./style.css";

window.customElements.define("stage-element", StageElement);
window.customElements.define("planet-orbit-element", PlanetOrbitElement);
window.customElements.define("planet-body-element", PlanetBodyElement);
window.customElements.define(
  "planet-puzzle-card-element",
  PlanetPuzzleCardElement,
);

function onDOMLoaded(_: Event) {
  Stage.getInstance.setupInitialStage();

  // document.addEventListener("pointermove", (e) => {
  //   console.log(e);
  // });
}

document.addEventListener("DOMContentLoaded", onDOMLoaded);
document.addEventListener("keydown", debugKeydown);
