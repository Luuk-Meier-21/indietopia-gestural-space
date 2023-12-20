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

  currentStage: number;

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

  setOpacity(): void {
    // if (this.currentStage > 0) {
    //   this.style.opacity = `${value}`;
    // } else {
    //   inner.style.opacity = "0";
    // }
  }

  onStageChange(event: StageEvent): void {
    this.currentStage = event.detail.currentStage;
    this.hasSolarRotation = event.detail.currentStage > 0;
    this.renderAttributes();
    this.setOpacity();
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
  isSolved = false;

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

  handleDragStart() {
    this.style.opacity = "0.4";
  }

  handleDragEnd() {
    this.style.opacity = "1";
  }

  handleDragOver(e) {
    e.preventDefault();
    return false;
  }

  handleDragEnter() {
    this.classList.add("over");
  }

  handleDragLeave() {
    this.classList.remove("over");
  }

  handleDrop(e) {
    e.stopPropagation(); // stops the browser from redirecting.
    console.log(e);
    return false;
  }

  connectedCallback(): void {
    this.setAttribute("draggable", "true");

    this.addEventListener("dragstart", this.handleDragStart);
    this.addEventListener("dragover", this.handleDragOver);
    this.addEventListener("dragenter", this.handleDragEnter);
    this.addEventListener("dragleave", this.handleDragLeave);
    this.addEventListener("dragend", this.handleDragEnd);
    this.addEventListener("drop", this.handleDrop);

    // this.addEventListener("pointerenter", (event) =>
    //   this.handlePointerEnter(event),
    // );

    // this.addEventListener("pointermove", (event) =>
    //   this.handlePointerMove(event),
    // );

    // this.addEventListener("pointerleave", (event) =>
    //   this.handleLeaveEnter(event),
    // );

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
  }
}
