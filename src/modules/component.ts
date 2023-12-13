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

  getTemplate(componentId: string): Element {
    const template = document.getElementById(`${componentId}-template`);
    //@ts-ignore
    const clone: HTMLElement = template.content.cloneNode(true);

    return clone.querySelector(`#${componentId}`);
  }

  getSlot(component: Element, slotName: string = null): Element | null {
    if (slotName) {
      return component.querySelector(`slot[name='${slotName}']`);
    }

    return component.querySelector("slot");
  }

  getChild(): Element | null {
    return this.children[0];
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
