import { debugKeydown } from "./modules/debug";
import {
  PlanetBodyElement,
  PlanetOrbitElement,
  PlanetPuzzleCardElement,
} from "./modules/planet";
import { Stage } from "./modules/stage";
import { StageElement } from "./modules/stage-element";
import { StageEventListener } from "./modules/stage-event";

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

function viewportHandler(event) {
  const view: VisualViewport = event.target;
  // Range: 1 <-> 3
  const zoom = view.scale;
  // document.body.style.zoom = map(zoom, 1, 3, 1, 0.3333);

  // document.body.style.width = `${parseInt(document.body.style.width) * zoom}`;
}

StageEventListener.addListener("stagestart", document.body, (event) => {
  scrollTo({
    left: 0,
    behavior: "smooth",
  });
});

document.addEventListener("DOMContentLoaded", onDOMLoaded);
window.visualViewport.addEventListener("resize", viewportHandler);

// DEBUG
document.addEventListener("keydown", debugKeydown);
