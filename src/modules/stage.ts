import { STAGE_CONFIG } from "../config";
import { StageEventDispatcher } from "./stage-event";

// Stage singleton
export class Stage {
  private static instance: Stage;
  private stageLength;
  private currStageIndex;

  private constructor() {
    this.stageLength = STAGE_CONFIG.count;
    this.currStageIndex = STAGE_CONFIG.startIndex;
  }

  public static get getInstance(): Stage {
    if (!Stage.instance) {
      Stage.instance = new Stage();
    }

    return Stage.instance;
  }

  setupInitialStage() {
    this.propagateStage();
  }

  propagateStage() {
    StageEventDispatcher.dispatchToElements("stagechange", {
      currentStage: this.currentStage,
    });
  }

  get currentStage(): number {
    return this.currStageIndex;
  }

  updateStage(index: number): number {
    if (index >= this.stageLength) {
      return -1;
    }

    this.currStageIndex = index;
    this.propagateStage();
    return this.currStageIndex;
  }

  next(): number {
    return this.updateStage(this.currStageIndex + 1);
  }

  prev(): number {
    return this.updateStage(this.currStageIndex - 1);
  }
}
