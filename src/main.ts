// import global styles
import { Stage } from "./modules/stage";
import { StageElement } from "./modules/stage-element";
import "./style.css";

window.customElements.define("stage-element", StageElement);

// main entry point
function main() {
  Stage.getInstance.setupInitialStage();

  // fadeDOMLoading();

  setTimeout(() => {
    Stage.getInstance.next();
  }, 2000);

  setTimeout(() => {
    Stage.getInstance.prev();
  }, 4000);
}

// function fadeDOMLoading(): HTMLElement | null {
//   const main = document.getElementById("main");
//   if (main === null) {
//     console.error("no main view");
//     return null;
//   }

//   main.style.opacity = "1";
//   return main;
// }

// listen for dom loaded to start run entry point
document.addEventListener("DOMContentLoaded", () => main());
