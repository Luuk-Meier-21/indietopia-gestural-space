import { Component } from "./component";
import { map } from "./math";
import { StageEvent } from "./stage-event";

export class ZoomComponent extends Component {
  static componentName = "zoom";

  currentStage = 0;

  constructor() {
    super();
  }

  onStageChange(event: StageEvent): void {
    this.currentStage = event.detail.currentStage;

    if (this.currentStage > 0) {
      this.style.opacity = "1";
    } else {
      this.style.opacity = "0";
    }
  }

  handleViewportChange(event) {
    const view: VisualViewport = event.target;

    const translate = `translate(${view.offsetLeft}px,${view.offsetTop}px)`;
    const scale = `scale(${map(view.scale, 1, 3, 1, 0.3333)})`;

    this.style.transform = [translate, scale].join(" ");

    const textElement = this.querySelector("#zoom-text");

    textElement.textContent = `${Math.floor(view.scale * 100)}%`;
  }

  connectedCallback() {
    window.visualViewport.addEventListener("resize", (event) =>
      this.handleViewportChange(event),
    );
    window.visualViewport.addEventListener("scroll", (event) =>
      this.handleViewportChange(event),
    );

    const component = this.cloneTemplate(ZoomComponent.componentName);

    this.className = component.className;

    this.style.opacity = "0";

    this.replaceChildren(...component.children);
  }
}
