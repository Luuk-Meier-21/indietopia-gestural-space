// export class DragClient {
//   private static instance: DragClient;

//   private selectedElement: HTMLElement | null = null;

//   private constructor() {}

//   public static get getInstance(): DragClient {
//     if (!DragClient.instance) {
//       DragClient.instance = new DragClient();
//     }

//     return DragClient.instance;
//   }

//   setSelected(element: HTMLElement) {
//     this.selectedElement = element;

//     console.log(this.selectedElement);

//     this.selectedElement.addEventListener("drag", () => {
//       // console.log(event);
//     });

//     this.selectedElement.addEventListener("drop", (event) => {
//       console.log(event);
//     });
//   }

//   dropSelected() {}

//   clearSelected() {}
// }
export class DragDrop {
  constructor(
    public isDragged: boolean,
    public draggedElement: HTMLElement,
  ) {}

  startIntervalDrag(x: number, y: number) {
    this.isDragged = true;
    this.draggedElement.style.visibility = "visible";
    this.draggedElement.style.left =
      x - this.draggedElement.querySelector("img").width / 2 + "px";
    this.draggedElement.style.top =
      y - this.draggedElement.querySelector("img").height / 2 + "px";
  }

  startDrag(selectedElement: HTMLImageElement) {
    if (selectedElement) {
      selectedElement.style.opacity = "0.3";
      selectedElement.setAttribute("data-draggable", "false");

      if (selectedElement.getAttribute("data-originalsrc")) {
        selectedElement.src = selectedElement.getAttribute("data-originalsrc");
      }
    }
  }

  stopDrag(selectedElement: HTMLImageElement) {
    if (selectedElement) {
      selectedElement.style.opacity = "1";
      selectedElement.setAttribute("data-draggable", "true");

      // Saves the original src, to revert to after moving the planet again
      selectedElement.setAttribute("data-originalsrc", selectedElement.src);

      selectedElement.src = this.draggedElement
        .querySelector("*")
        .getAttribute("src");

      // selectedElement.getBoundingClientRect().width =
      //   this.draggedElement.querySelector("img").width;

      // selectedElement.getBoundingClientRect().height =
      //   this.draggedElement.querySelector("img").height;
    }
    this.isDragged = false;
    this.draggedElement.style.visibility = "hidden";
  }
}
