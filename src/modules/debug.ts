import { Stage } from "./stage";

export function debugKeydown(event: KeyboardEvent) {
  switch (event.key) {
    case "ArrowRight":
      Stage.getInstance.next();
      console.log(
        "🚀 ~ Stage.getInstance.next();",
        Stage.getInstance.currentStage,
      );
      break;
    case "ArrowLeft":
      Stage.getInstance.prev();
      console.log(
        "🚀 ~ Stage.getInstance.prev();",
        Stage.getInstance.currentStage,
      );
      break;
  }
}
