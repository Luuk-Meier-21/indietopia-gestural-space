export type StageEventType = "stagechange" | "stagestart" | "stageend";
export type StageEventDetail = {
  currentStage: number;
  [str: string]: any;
};
export type StageEvent = {
  currentTarget: HTMLElement;
  detail: StageEventDetail;
};

const EVENT_ATTR_PREFIX = "listener";

export class StageEventDispatcher {
  constructor() {}

  static dispatchToElements(type: StageEventType, data: StageEventDetail) {
    const event = new CustomEvent(type, {
      detail: data,
    });

    document
      .querySelectorAll(`[data-${EVENT_ATTR_PREFIX}-${type}]`)
      .forEach((element: Element) => {
        element.dispatchEvent(event);
      });
  }
}

export class StageEventListener {
  constructor() {}

  static addListener(
    type: StageEventType,
    element: HTMLElement,
    callback: (e: StageEvent) => void,
  ) {
    element.setAttribute(`data-${EVENT_ATTR_PREFIX}-${type}`, "");
    element.addEventListener(type, callback as unknown as (e: Event) => void);
  }
}
