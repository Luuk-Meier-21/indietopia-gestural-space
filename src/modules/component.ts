import { StageEvent, StageEventListener } from "./stage-event";

export interface StageStartListener {
  onStageStart(event: StageEvent): void;
}

export interface StageChangeListener {
  onStageChange(event: StageEvent): void;
}

export interface StageEndListener {
  onStageEnd(event: StageEvent): void;
}

export abstract class Component extends HTMLElement {
  hasSolarRotation: boolean = false;

  constructor() {
    super();
    this.addListeners(this);
  }

  cloneTemplate(templateName: string): HTMLElement {
    const template = document.getElementById(`${templateName}-template`);
    // @ts-expect-error content is undefined
    const clone: HTMLElement = template.content.cloneNode(true);

    return clone.querySelector(`#${templateName}`);
  }

  getSlot(component: Element, slotName: string = null): Element | null {
    if (slotName) {
      return component.querySelector(`slot[name='${slotName}']`);
    }

    return component.querySelector("slot");
  }

  addListeners(element: Component) {
    StageEventListener.addListener(
      "stagestart",
      element,
      (event: StageEvent) => {
        this.onStageStart(event);
      },
    );

    StageEventListener.addListener(
      "stagechange",
      element,
      (event: StageEvent) => {
        this.onStageChange(event);
      },
    );

    StageEventListener.addListener("stageend", element, (event: StageEvent) => {
      this.onStageEnd(event);
    });
  }

  connectedCallback() {}

  onStageStart(_: StageEvent) {}
  onStageChange(_: StageEvent) {}
  onStageEnd(_: StageEvent) {}
}
