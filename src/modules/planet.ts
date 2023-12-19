import { PLANETS_CONFIG, PUZZLE_PLANET_MULTIPLIER } from "../config";
import { Component, StageChangeListener } from "./component";
import { circleVectorAtDegrees, map } from "./math";
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

  minOpacity = 0.3;

  currentStage = 0;

  constructor() {
    super();
  }

  get currentScale(): number {
    return 0.3;
  }

  setOpacity(value: number = this.minOpacity): void {
    const inner = this.querySelector(
      "#planet-info-inner",
    ) as HTMLElement | null;
    if (inner === null) {
      return;
    }

    if (this.currentStage > 0) {
      inner.style.opacity = `${value}`;
    } else {
      inner.style.opacity = "0";
    }
  }

  onStageChange(event: StageEvent): void {
    this.currentStage = event.detail.currentStage;

    this.setOpacity();
    this.updateCardPosition();
  }

  updateCardPosition(): boolean {
    const siblingBody = (this.parentElement.querySelector(
      "planet-body-element",
    ) || null) as PlanetBodyElement | null;

    if (siblingBody === null) {
      return false;
    }

    // const m = 0.7;
    // const offset = 1;

    // body
    const bodyScale = siblingBody.bodyScale;
    const { x, y } = circleVectorAtDegrees(0, 0, bodyScale / 2, 45);

    // orbit
    const angle = this.currentStage > 0 ? -this.config.solarOffsetAngle : 0;

    const offset = 0.5;

    const translate = `translate(${x + offset}vw, ${y + offset}vw)`;
    const scale = `scale(.3)`;
    const rotate = `rotate(${angle}deg)`;

    this.style.transform = [translate, scale, rotate].join(" ");

    return true;
  }

  handleViewportChange(event) {
    const view: VisualViewport = event.target;

    console.log(map(view.scale, 1, 3, this.minOpacity, 1));

    this.setOpacity(map(view.scale, 1, 3, this.minOpacity, 1));
  }

  connectedCallback(): void {
    window.visualViewport.addEventListener("resize", (event) =>
      this.handleViewportChange(event),
    );

    this.config = this.getPlanetConfig();
    const component = this.cloneTemplate(PlanetInfoCardElement.componentName);

    const heading = component.querySelector("#planet-info-heading");
    heading.textContent = this.config.name;

    const text = component.querySelector("#planet-info-text");
    text.textContent = this.config.description;

    this.setOpacity();

    this.className = component.className;
    this.replaceChildren(...component.children);

    this.updateCardPosition();

    // this.style.transform = `transform(${siblingBody.bodyScale * n}%, ${
    //   siblingBody.bodyScale * n
    // }%)`;
    // console.log(
    //   `transform(${siblingBody.bodyScale * n}%, ${siblingBody.bodyScale * n}%)`,
    // );
  }
}
