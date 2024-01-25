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

  startDrag(selectedElement: HTMLElement) {
    if (selectedElement) {
      selectedElement.style.opacity = "0.3";
      selectedElement.setAttribute("data-draggable", "false");

      // selectedElement.style.visibility = "hidden";
    }
  }

  stopDrag(selectedElement: HTMLElement) {
    this.isDragged = false;
    this.draggedElement.style.visibility = "hidden";

    if (selectedElement) {
      // selectedElement.style.visibility = "visible";
      selectedElement.style.opacity = "1";
      selectedElement.setAttribute("data-draggable", "true");
    }
  }
}
