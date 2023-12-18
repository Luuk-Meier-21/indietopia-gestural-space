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


let i: number = 0;
let id: number;
let dragStart: number;
let selectCheck: number;
let progress: number = 0;
let mouseX: number;
let mouseY: number;
let isDragged: boolean = false;
let draggedElement: any = document.getElementById("dragged");
let touchEnter: boolean = false;


let canvas: any = document.getElementById("selectcanvas");
canvas.setAttribute('width', screen.width);
canvas.setAttribute('height', screen.height);  

let ctx: any = canvas.getContext("2d");

// Event listener and processing of touch inputs
window.addEventListener("touchmove", (event) => {
  if (event.touches[0]) {
    mouseX = event.touches[0].clientX;
    mouseY = event.touches[0].clientY;
    onPointerMove();
    }});

window.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
  onPointerMove();
  });

function onPointerMove () {

  let touchedElement: any = document.elementFromPoint(mouseX, mouseY);

  if (touchedElement != null) {
    if (touchedElement.parentNode.classList.contains("selectable") 
    || (touchedElement.parentNode.classList.contains("dragtarget") && isDragged)) {
      onPointerEnter(touchedElement.parentNode);
            
    } else {
      onPointerLeave();
      touchEnter = false;
    }
  }
  
}

window.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

function onPointerEnter (pointerSelected: any)
{  
    if (!touchEnter) {
        touchEnter = true;
        console.log(touchEnter);
    if ((i == 0 && !isDragged && !pointerSelected.classList.contains("dragtarget") )||(isDragged && pointerSelected.classList.contains("dragtarget")) ) 
    {
        selectCheck = setTimeout(delayedClick, 2000, pointerSelected);
        console.log("started select");
        i = 1;

        // loading bar 
        id = setInterval(progressbar, 20);
        function progressbar() 
        {
            if (progress >= 2) 
            {
                clearInterval(id);
                i = 0;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            } else 
            {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                //background for bar
                ctx.beginPath();
                ctx.arc(mouseX - 10, mouseY - 10, 50, 0, 2 * Math.PI);
                ctx.strokeStyle = "lightgray";
                ctx.lineWidth = 10;
                ctx.stroke();

                
                progress += .02;
                ctx.beginPath();
                ctx.arc(mouseX - 10, mouseY - 10, 50, 0, progress * Math.PI);
                ctx.strokeStyle = "black";
                ctx.lineWidth = 10;
                ctx.stroke();
                

            }
        }

    } 
    }
}

    
function onPointerLeave () 
{
    i = 0;
    progress = 0;

    clearInterval(id);
    clearTimeout(selectCheck);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);


}
  

function delayedClick (selectedElement: any) 
{       
    if (i == 1) 
    {
        // Thing has been selected, so change things
        // document.getElementById("text").innerHTML = "a";
        console.log("selected");
    }   
    // start draggin object
    if (selectedElement.classList.contains("selectdrag")){
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
   

function onDragStart () 
{
    isDragged = true;

    draggedElement.style.visibility = "visible";
    draggedElement.style.left = mouseX - 30 + "px";
    draggedElement.style.top = mouseY - 10 + "px";

}