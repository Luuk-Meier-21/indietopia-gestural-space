import { debugKeydown } from "./modules/debug";
import { HoldLoader } from "./modules/loader";
import { DragDrop } from "./modules/drag";
import { Stage } from "./modules/stage";
import { StageElement } from "./modules/stage-element";

import "./style.css";

// TODO: Select target elements based on data-... selectors, instead of `.class` `*[data-...]`.

window.customElements.define("stage-element", StageElement);

let loader: HoldLoader;
let drag: DragDrop;
let dragElement: HTMLElement | null ;
let loaderInterval: number;
let mouseDragStart: number;
let selectCheck: number;
let progress: number = 0;
let mouseX: number;
let mouseY: number;
let isDragged: boolean = false;
let disableTouch: boolean = false;

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

  dragElement = document.getElementById(
    "dragged"
  ) as HTMLElement;


  loader = new HoldLoader(ctx, canvas.width, canvas.height);
  drag = new DragDrop(isDragged, dragElement);
}

document.addEventListener("DOMContentLoaded", onDOMLoaded);
document.addEventListener("keydown", debugKeydown);




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

  
  let touchedElement = document.elementsFromPoint(
    mouseX,
    mouseY,
  ) as Element[] | null;

  if (touchedElement){ 
    let hasSelectables = false;
    let tempArray : HTMLElement[] = Array.from(touchedElement) as HTMLElement[];
    for (let i : number = 0; i < tempArray.length; i++) {
      // if (touchedElement[i].classList.contains("selectable")) {
      if (tempArray[i].dataset.type === "selectable"){
        hasSelectables = true;
        onSelectEnter(touchedElement[i]);
      } else if (tempArray[i].dataset.type === "dragtarget" && drag.isDragged) {
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


function delayedSelect(selectedElement: HTMLElement) {

  if (selectedElement && dragElement) {
    if (selectedElement.dataset.draggable === "true") {
      mouseDragStart = setInterval(moveDraggedObject, 20);
      drag.startDrag(selectedElement);
    }    
  }
}

function moveDraggedObject() {
  drag.startIntervalDrag(mouseX, mouseY);
}

function delayedDrop (selectedElement: HTMLElement) {

  if (selectedElement !== null && drag.draggedElement !== null) {
    let elementChildren : HTMLElement[] = Array.from(selectedElement.querySelectorAll(`*`));
    if (elementChildren) {
      for (let j : number = 0; j < elementChildren.length; j++) {
        if (elementChildren[j].dataset.draggable = "true") {
          clearInterval(mouseDragStart);
          drag.stopDrag(elementChildren[j] as HTMLElement);
        }
      }
    }
  }
  
}
