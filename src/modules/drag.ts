export class DragDrop {
constructor(
  public isDragged: boolean,
  public draggedElement: HTMLElement,

) {}


startIntervalDrag(x: number, y: number) {

    this.isDragged = true;
    this.draggedElement.style.visibility = "visible";
    this.draggedElement.style.left = x - 30 + "px";
    this.draggedElement.style.top = y - 10 + "px";
    

}


startDrag(selectedElement: HTMLElement) {
    
    if (selectedElement) {
        selectedElement.style.visibility = "hidden";
    }

}

stopDrag(selectedElement: HTMLElement) {

    console.log(selectedElement);
    this.isDragged = false;
    this.draggedElement.style.visibility = "hidden";
    this.draggedElement.style.left = -100 + "px";
    this.draggedElement.style.top = -100 + "px";

    if (selectedElement) {
        selectedElement.style.visibility = "visible";
    }
}
}
