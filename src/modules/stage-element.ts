import { StageEvent, StageEventListener } from "./stage-event";

export class StageElement extends HTMLElement {
  constructor() {
    super();
  }

  get activeStages(): number[] {
    const serializedStages: string =
      this.getAttribute("data-active-stages") || "";
    const stages: string[] = serializedStages.split(",");

    return stages
      .map((stage: string) => parseInt(stage))
      .filter((stage) => !isNaN(stage));
  }

  stageChangeCallback(currentStage: number) {
    this.setAttribute("data-stage", `${currentStage}`);

    if (this.activeStages.includes(currentStage)) {
      this.stageActiveCallback(currentStage);
    } else {
      this.stageInactiveCallback(currentStage);
    }
  }

  stageActiveCallback(_: number) {
    this.setAttribute("data-stage-active", "");
    this.removeAttribute("data-stage-inactive");
  }

  stageInactiveCallback(_: number) {
    this.removeAttribute("data-stage-active");
    this.setAttribute("data-stage-inactive", "");
  }

  connectedCallback() {
    StageEventListener.addListener("stagechange", this, (event: StageEvent) => {
      this.stageChangeCallback(event.detail.currentStage);
    });

    // const shadow = this.attachShadow({ mode: "open" });
  }

  // On destroy
  disconnectedCallback() {}
}
