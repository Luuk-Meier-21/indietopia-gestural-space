import { Component, StageChangeListener } from "./component";
import { StageEvent } from "./stage-event";

export class StageElement extends Component implements StageChangeListener {
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

  onStageChange(event: StageEvent): void {
    const currentStage = event.detail.currentStage;
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

  connectedCallback() {}

  // On destroy
  disconnectedCallback() {}
}
