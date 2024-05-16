/* 
  What do we want to achieve?
  - The slotted element should not change at all
  - What types of animations do we want to support? 
    - When the element is scrolled into view
    - When it is loaded, or mounted
  - If possible, 
*/

import { animate, stagger, spring, type AnimationControls } from "motion";

const SCALE_UP = [];

class RevealElement2 extends HTMLElement {
  private animations: AnimationControls[] = [];
  private root: ShadowRoot;
  private slotted: Element[];

  constructor() {
    super();
    this.root = this.attachShadow({ mode: "closed" });
    this.slotted = this.root
      .appendChild(document.createElement("slot"))
      .assignedElements();

    const animation = animate(
      this.slotted,
      { opacity: [0, 1], y: [50, 0] },
      {
        delay: stagger(0.05),
        autoplay: false,
        easing: spring({ stiffness: 100, damping: 20 }),
      }
    );

    this.animations.push(animation);
  }

  connectedCallback() {
    this.playAnimations();
  }

  disconnectedCallback() {
    this.animations.forEach((animation) => {
      animation.stop();
    });
  }

  playAnimations() {
    this.animations.forEach((animation) => {
      animation.play();
    });
  }
}

customElements.define("reveal-element2", RevealElement2);
