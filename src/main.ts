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
import { HoldLoader } from "./modules/loader";
import { DragDrop } from "./modules/drag";

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

let loader: HoldLoader;
let drag: DragDrop;
let dragElement: HTMLElement | null;
let loaderInterval: number;
let mouseDragStart: number;
let selectCheck: number;
let progress: number = 0;
let mouseX: number;
let mouseY: number;
let isDragged: boolean = false;
let disableTouch: boolean = false;

function onDOMLoaded() {
  Stage.getInstance.setupInitialStage();

  let canvas = document.getElementById(
    "selectcanvas",
  ) as HTMLCanvasElement | null;
  if (canvas === null) {
    canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
  }

  canvas.setAttribute("width", screen.width.toString());
  canvas.setAttribute("height", screen.height.toString());

  let ctx: CanvasRenderingContext2D = canvas.getContext(
    "2d",
  ) as CanvasRenderingContext2D;

  dragElement = document.getElementById("dragged") as HTMLElement;

  loader = new HoldLoader(ctx, canvas.width, canvas.height);
  drag = new DragDrop(isDragged, dragElement);

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

window.addEventListener("touchmove", (event) => {
  if (event.touches[0]) {
    mouseX = event.touches[0].clientX;
    mouseY = event.touches[0].clientY;
    onPointerMove();
  }
});

window.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;

  onPointerMove();
});

function onPointerMove() {
  let touchedElement = document.elementsFromPoint(mouseX, mouseY) as
    | Element[]
    | null;

  if (touchedElement) {
    let hasSelectables = false;
    let tempArray: HTMLElement[] = Array.from(touchedElement) as HTMLElement[];
    for (let i: number = 0; i < tempArray.length; i++) {
      if (
        tempArray[i].dataset.type === "selectable" &&
        tempArray[i].getAttribute("data-draggable") === "true" &&
        !drag.isDragged
      ) {
        hasSelectables = true;
        onSelectEnter(touchedElement[i]);
      } else if (
        tempArray[i].dataset.type === "selectable" &&
        tempArray[i].getAttribute("data-draggable") === "false" &&
        drag.isDragged
      ) {
        hasSelectables = true;
        onDropEnter(touchedElement[i]);
      }
    }
    if (!hasSelectables) {
      onPointerLeave();
    }
  }
}

function progressbar() {
  if (progress >= 1) {
    clearInterval(loaderInterval);
    loader.clear();
  } else {
    progress += 0.01;
    loader.draw(progress, mouseX, mouseY);
  }
}

function onSelectEnter(pointerSelected: Element) {
  if (!disableTouch) {
    disableTouch = true;
    selectCheck = setTimeout(delayedSelect, 2000, pointerSelected);
    loaderInterval = setInterval(progressbar, 20);
  }
}

function onDropEnter(pointerSelected: Element) {
  if (!disableTouch) {
    disableTouch = true;
    selectCheck = setTimeout(delayedDrop, 2000, pointerSelected);
    loaderInterval = setInterval(progressbar, 20);
  }
}

function onPointerLeave() {
  progress = 0;
  disableTouch = false;

  clearInterval(loaderInterval);
  clearTimeout(selectCheck);

  loader.clear();
}

function delayedSelect(selectedElement: HTMLImageElement) {
  if (selectedElement && dragElement) {
    if (selectedElement.dataset.draggable === "true") {
      drag.draggedElement.querySelector("img").src = selectedElement.src;

      drag.draggedElement.querySelector("img").width =
        selectedElement.getBoundingClientRect().width;

      drag.draggedElement.querySelector("img").height =
        selectedElement.getBoundingClientRect().height;

      mouseDragStart = setInterval(moveDraggedObject, 20);

      drag.startDrag(selectedElement);
    }
  }
}
// Updates the location of the dragged object to be the same as the mouse
function moveDraggedObject() {
  drag.startIntervalDrag(mouseX, mouseY);
}

function delayedDrop(selectedElement: HTMLElement) {
  if (selectedElement !== null && drag.draggedElement !== null) {
    if (selectedElement.getAttribute("data-draggable") === "false") {
      clearInterval(mouseDragStart);
      drag.stopDrag(selectedElement as HTMLImageElement);
    }
    // let elementChildren: HTMLElement[] = Array.from(
    //   selectedElement.querySelectorAll(`*`),
    // );
    // if (elementChildren) {
    //   for (let j: number = 0; j < elementChildren.length; j++) {
    //     if (elementChildren[j].dataset.draggable == "false") {
    //       clearInterval(mouseDragStart);
    //       drag.stopDrag(elementChildren[j] as HTMLImageElement);
    //     }
    //   }
    // }
  }
}
