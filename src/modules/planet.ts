import { PLANETS_CONFIG, PUZZLE_PLANET_MULTIPLIER } from "../config";
import { Component, StageChangeListener } from "./component";
import { StageEvent } from "./stage-event";

export interface Planet {
  name: string;
  description: string;
  scale: number;
  puzzleScaleMultiplier?: number;
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
    this.style.width = `calc(${orbitWidth * 2}% + 40vw)`;

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

  currentStage = 0;

  constructor() {
    super();
  }

  get bodyScale(): number {
    const isAtStart = this.currentStage === 0;
    const scaleMultiplier =
      this.config.puzzleScaleMultiplier || PUZZLE_PLANET_MULTIPLIER;
    const scale = isAtStart
      ? this.config.scale * scaleMultiplier
      : this.config.scale;

    return scale;
  }

  onStageChange(event: StageEvent): void {
    this.currentStage = event.detail.currentStage;

    const surface = this.querySelector("#planet-surface") as HTMLElement;
    surface.style.transform = `scale(${this.bodyScale})`;
  }

  connectedCallback(): void {
    this.config = this.getPlanetConfig();
    const component = this.cloneTemplate(PlanetBodyElement.componentName);

    this.className = component.className;

    const surface = component.querySelector("#planet-surface") as HTMLElement;
    surface.style.transform = `scale(${this.bodyScale})`;

    const image = surface.querySelector("img") as HTMLElement;
    image.setAttribute("src", this.config.image);

    this.replaceChildren(...component.children);
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

  currentStage = 0;

  constructor() {
    super();
  }

  get currentScale(): number {
    return 0.3;
  }

  onStageChange(event: StageEvent): void {
    this.currentStage = event.detail.currentStage;

    const hasBodySibling = this.updateCardPosition();
  }

  updateCardPosition(): boolean {
    const siblingBody = (this.parentElement.querySelector(
      "planet-body-element",
    ) || null) as PlanetBodyElement | null;

    if (siblingBody === null) {
      return false;
    }

    console.log(siblingBody.bodyScale);

    // const m = 0.7;
    const offset = siblingBody.bodyScale;
    const angle = this.currentStage > 0 ? -this.config.solarOffsetAngle : 0;

    const translate = `translate(${offset}vw,0)`;
    const scale = `scale(0.3)`;
    const rotate = `rotate(${angle}deg)`;

    this.style.transform = [translate, scale, rotate].join(" ");
    console.log(this.style.transform);
    return true;
  }

  connectedCallback(): void {
    this.config = this.getPlanetConfig();
    const component = this.cloneTemplate(PlanetInfoCardElement.componentName);

    this.updateCardPosition();

    this.className = component.className;
    this.replaceChildren(...component.children);

    // this.style.transform = `transform(${siblingBody.bodyScale * n}%, ${
    //   siblingBody.bodyScale * n
    // }%)`;
    // console.log(
    //   `transform(${siblingBody.bodyScale * n}%, ${siblingBody.bodyScale * n}%)`,
    // );
  }
}
