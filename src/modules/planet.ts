import { PLANETS_CONFIG, PUZZLE_PLANET_MULTIPLIER } from "../config";
import { Component, StageChangeListener } from "./component";
import { enumerate } from "./generators";
import { StageEvent } from "./stage-event";

export interface Planet {
  name: string;
  description: string;
  scale: number;
  image: string;

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
  static componentName = "planet-orbit";

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
    this.style.width = `${orbitWidth * 2}%`;

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
    const component = this.cloneTemplate(PlanetOrbitElement.componentName);
    const slot = this.getSlot(component);

    slot.replaceChildren(...this.children);

    this.className = component.className;

    this.replaceChildren(component.children[0]);
  }
}

export class PlanetBodyElement extends PlanetComponent {
  static componentName = "planet-body";

  constructor() {
    super();
  }

  onStageChange(event: StageEvent): void {
    const stage = event.detail.currentStage;

    const isAtStart = stage === 0;
    const scale = isAtStart
      ? this.config.scale * PUZZLE_PLANET_MULTIPLIER
      : this.config.scale;

    const surface = this.querySelector("#planet-surface") as HTMLElement;
    surface.style.transform = `scale(${scale})`;
  }

  connectedCallback(): void {
    this.config = this.getPlanetConfig();
    const component = this.cloneTemplate(PlanetBodyElement.componentName);

    this.className = component.className;

    const surface = component.querySelector("#planet-surface") as HTMLElement;
    surface.style.transform = `scale(${this.config.scale * 3})`;

    const image = surface.querySelector("img") as HTMLElement;
    console.log(image);
    image.setAttribute("src", this.config.image);

    this.replaceChildren(component.children[0]);
  }
}

export class PlanetPuzzleCardElement extends PlanetComponent {
  static componentName = "planet-puzzle-card";

  constructor() {
    super();
  } // test

  connectedCallback(): void {
    this.config = this.getPlanetConfig();
    const component = this.cloneTemplate(PlanetPuzzleCardElement.componentName);
    const slot = this.getSlot(component);

    slot.replaceChildren(...this.children);

    const textElement: Element | null = component.querySelector("#planet-name");

    if (textElement !== null) {
      textElement.textContent = this.config.name;
    }

    this.replaceChildren(component);
  }
}

export class PlanetInfoCardElement extends PlanetComponent {
  static componentName = "planet-info-card";

  constructor() {
    super();
  }

  connectedCallback(): void {
    this.config = this.getPlanetConfig();
    const component = this.cloneTemplate(PlanetInfoCardElement.componentName);
    const slot = this.getSlot(component);

    slot.replaceChildren(...this.children);

    this.replaceChildren(component);
  }
}
