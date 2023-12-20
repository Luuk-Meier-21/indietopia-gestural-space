export class DragClient {
  private static instance: DragClient;

  private selectedElement: HTMLElement | null = null;

  private constructor() {}

  public static get getInstance(): DragClient {
    if (!DragClient.instance) {
      DragClient.instance = new DragClient();
    }

    return DragClient.instance;
  }

  setSelected(element: HTMLElement) {
    this.selectedElement = element;

    console.log(this.selectedElement);

    this.selectedElement.addEventListener("drag", () => {
      // console.log(event);
    });

    this.selectedElement.addEventListener("drop", (event) => {
      console.log(event);
    });
  }

  dropSelected() {}

  clearSelected() {}
}
