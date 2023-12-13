import { PLANETS_CONFIG } from "../config";
import { Component, StageChangeListener } from "./component";
import { StageEvent, StageEventListener } from "./stage-event";

export interface Planet {
  name: string;
  description: string;
  scale: number;

  // Out of bounds but a def wish
  solarOffsetAngle?: number;
  orbitalOffset?: number;
  orbitalRotation?: number;
  progradeOffset?: number;
  normalOffset?: number;
}

export abstract class PlanetComponent extends Component {
  config: Planet;

  constructor() {
    super();
  }

  getPlanetConfig(): Planet {
    const planetIndex: number = parseInt(
      this.getAttribute("data-index") || "-1",
    );
    // const inner = this.innerHTML;
    const planet = PLANETS_CONFIG[planetIndex];
    if (!planet) {
      this.textContent = "No planet found";
      return;
    }

    return planet;
  }
}

export class PlanetOrbitElement
  extends PlanetComponent
  implements StageChangeListener
{
  hasSolarRotation: boolean = false;
  hasInitRender = false;

  constructor() {
    super();
  }

  get solarRotation(): string {
    const value: number = this.hasSolarRotation
      ? this.config.solarOffsetAngle || 0
      : 0;
    return `rotate(${value}deg)`;
  }

  onStageChange(event: StageEvent): void {
    this.hasSolarRotation = event.detail.currentStage > 0;
    this.renderAttributes();
  }

  renderOrbit() {
    const orbitWidth: number = parseInt(this.getAttribute("width"));
    this.style.width = `${orbitWidth * 2}dvw`;

    const orbitDetails = this.querySelector(
      "#planet-orbit-detail",
    ) as HTMLElement;

    orbitDetails.style.transform = [this.solarRotation].join(" ");
  }

  renderAttributes() {
    this.renderOrbit();
  }

  connectedCallback() {
    this.config = this.getPlanetConfig();
    const component = this.getTemplate("planet-orbit") as HTMLElement;
    const slot = this.getSlot(component);
    const slotContent = this.getChild();

    slot.replaceWith(slotContent);

    this.className = component.className;

    this.replaceChildren(component.children[0]);
  }
}

export class PlanetBodyElement extends PlanetComponent {
  constructor() {
    super();
  }

  connectedCallback(): void {
    this.config = this.getPlanetConfig();
    const component = this.getTemplate("planet-body") as HTMLElement;

    this.className = component.className;

    component.children[0].style.transform = `scale(${this.config.scale})`;

    this.replaceChildren(component.children[0]);
  }
}

export class PlanetPuzzleCardElement extends PlanetComponent {
  constructor() {
    super();
  }

  connectedCallback(): void {
    this.config = this.getPlanetConfig();
    const component = this.getTemplate("planet-puzzle-card");
    const slot = this.getSlot(component);
    const slotContent = this.getChild();

    slot.replaceWith(slotContent);

    const text = component.querySelector("#planet-name");

    text.textContent = this.config.name;

    this.replaceChildren(component);
  }
}
