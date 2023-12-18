import { STAGE_CONFIG } from "../config";
import { StageEventDispatcher } from "./stage-event";

// Stage singleton
export class Stage {
  private static instance: Stage;
  private stageLength;
  currentStage;

  private constructor() {
    this.stageLength = STAGE_CONFIG.count;
    this.currentStage = STAGE_CONFIG.startIndex;
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
    if (this.currentStage === 0) {
      StageEventDispatcher.dispatchToElements("stagestart", {
        currentStage: this.currentStage,
      });
    }
    if (this.currentStage >= this.stageLength) {
      StageEventDispatcher.dispatchToElements("stageend", {
        currentStage: this.currentStage,
      });
    }
    StageEventDispatcher.dispatchToElements("stagechange", {
      currentStage: this.currentStage,
    });
  }

  updateStage(newStage: number): number {
    if (newStage < 0) {
      return 0;
    }

    if (newStage >= this.stageLength) {
      return this.stageLength - 1;
    }

    this.currentStage = newStage;
    this.propagateStage();
    return this.currentStage;
  }

  next(): number {
    return this.updateStage(this.currentStage + 1);
  }

  prev(): number {
    return this.updateStage(this.currentStage - 1);
  }
}
