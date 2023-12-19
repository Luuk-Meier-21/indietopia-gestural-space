import { debugKeydown } from "./modules/debug";
import {
  PlanetBodyElement,
  PlanetInfoCardElement,
  PlanetOrbitElement,
  PlanetPuzzleCardElement,
} from "./modules/planet";
import { Stage } from "./modules/stage";
import { StageElement } from "./modules/stage-element";
import { StageEventListener } from "./modules/stage-event";
import { ZoomComponent } from "./modules/zoom";

import "./style.css";

window.customElements.define("stage-element", StageElement);
window.customElements.define("planet-orbit-element", PlanetOrbitElement);
window.customElements.define("planet-body-element", PlanetBodyElement);
window.customElements.define(
  "planet-puzzle-card-element",
  PlanetPuzzleCardElement,
);
window.customElements.define("planet-info-card-element", PlanetInfoCardElement);
window.customElements.define("zoom-element", ZoomComponent);

function onDOMLoaded() {
  Stage.getInstance.setupInitialStage();

  // document.addEventListener("pointermove", (e) => {
  //   console.log(e);
  // });
}

// function viewportHandler(event) {
//   // zoom range: 1 <-> 3
//   const view: VisualViewport = event.target;

//   const zoomElement = document.getElementById("zoom-indicator");
//   console.log(view);

//   zoomElement.textContent = `${Math.floor(view.scale * 100)}%`;

//   // document.body.style.zoom = map(zoom, 1, 3, 1, 0.3333);
//   // document.body.style.width = `${parseInt(document.body.style.width) * zoom}`;
// }

StageEventListener.addListener("stagestart", document.body, () => {
  scrollTo({
    left: 0,
    behavior: "smooth",
  });
});

document.addEventListener("DOMContentLoaded", onDOMLoaded);
// window.visualViewport.addEventListener("resize", viewportHandler);

// DEBUG
document.addEventListener("keydown", debugKeydown);
