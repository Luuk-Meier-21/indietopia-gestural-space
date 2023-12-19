import { debugKeydown } from "./modules/debug";
import { HoldLoader } from "./modules/loader";
import { Stage } from "./modules/stage";
import { StageElement } from "./modules/stage-element";

import "./style.css";

// TODO: Select target elements based on data-... selectors, instead of `.class` `*[data-...]`.
// TODO: Move drag / drop logic to isolated class with its own methods.
// TODO: Move loader/hold logic to class

window.customElements.define("stage-element", StageElement);

let loader: HoldLoader;

function onDOMLoaded(_: Event) {
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

  loader = new HoldLoader(ctx, canvas.width, canvas.height);
}

document.addEventListener("DOMContentLoaded", onDOMLoaded);
document.addEventListener("keydown", debugKeydown);

let id: number;
let dragStart: number;
let selectCheck: number;
let progress: number = 0;
let mouseX: number;
let mouseY: number;
let isDragged: boolean = false;
let draggedElement: any = document.getElementById("dragged");
let touchEnter: boolean = false;

// Event listener and processing of touch inputs
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
  let touchedElement = document.elementFromPoint(
    mouseX,
    mouseY,
  ) as HTMLElement | null;

  // User elementsFromPoint

  // TODO: Look for parent node untill selector is found:
  if (touchedElement != null) {
    if (
      touchedElement.parentElement?.classList?.contains("selectable") ||
      (touchedElement.parentElement?.classList?.contains("dragtarget") &&
        isDragged)
    ) {
      onPointerEnter(touchedElement.parentNode);
    } else {
      onPointerLeave();
      touchEnter = false;
    }
  }
}

function progressbar() {
  if (progress >= 1) {
    clearInterval(id);
    loader.clear();
  } else {
    progress += 0.01;
    loader.draw(progress, mouseX, mouseY);
  }
}

function onPointerEnter(pointerSelected: any) {
  if (!touchEnter) {
    touchEnter = true;
    console.log(touchEnter);
    if (
      (!isDragged && !pointerSelected.classList.contains("dragtarget")) ||
      (isDragged && pointerSelected.classList.contains("dragtarget"))
    ) {
      selectCheck = setTimeout(delayedClick, 2000, pointerSelected);
      console.log("started select");

      // loading bar
      id = setInterval(progressbar, 20);
    }
  }
}

function onPointerLeave() {
  progress = 0;
  touchEnter = false;

  clearInterval(id);
  clearTimeout(selectCheck);

  loader.clear();
}

function delayedClick(selectedElement: any) {
  // if (i == 1) {
  //   // Thing has been selected, so change things
  //   // document.getElementById("text").innerHTML = "a";
  //   console.log("selected");
  // }
  // start draggin object
  if (selectedElement.classList.contains("selectdrag")) {
    console.log("drag");
    selectedElement.style.visibility = "hidden";
    dragStart = setInterval(onDragStart, 20);
  }

  if (selectedElement.classList.contains("dragtarget")) {
    clearInterval(dragStart);
    draggedElement.style.visibility = "hidden";
    draggedElement.style.left = 0 + "px";
    draggedElement.style.top = 0 + "px";
    selectedElement.querySelector(".selectdrag").style.visibility = "visible";
    isDragged = false;
  }
}

function onDragStart() {
  isDragged = true;

  draggedElement.style.visibility = "visible";
  draggedElement.style.left = mouseX - 30 + "px";
  draggedElement.style.top = mouseY - 10 + "px";
}
