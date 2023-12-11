import { debugKeydown } from "./modules/debug";
import { Stage } from "./modules/stage";
import { StageElement } from "./modules/stage-element";

import "./style.css";

window.customElements.define("stage-element", StageElement);

function onDOMLoaded(_: Event) {
  Stage.getInstance.setupInitialStage();
}

document.addEventListener("DOMContentLoaded", onDOMLoaded);
document.addEventListener("keydown", debugKeydown);
