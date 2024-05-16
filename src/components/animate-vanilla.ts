/* 
  What do we want to achieve?
  - The slotted element should not change at all
  - What types of animations do we want to support? 
    - When the element is scrolled into view
    - When it is loaded, or mounted
  - If possible, 

*/

const FADE_IN: Keyframe[] = [{ opacity: 0 }, { opacity: 1 }];

const SLIDE_IN: Keyframe[] = [
  { transform: "translateY(100%)" },
  { transform: "translateY(0)" },
];

const EASE = "cubic-bezier(.25, 0, .3, 1)";

class RevealElement extends HTMLElement {
  private animations: Animation[];
  private root: ShadowRoot;
  private slotted: Element[];

  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
    this.slotted = this.root
      .appendChild(document.createElement("slot"))
      .assignedElements();
    this.animations = [];

    this.slotted.forEach((element, index) => {
      element.animate(FADE_IN, {
        duration: 500,
        delay: 300 + index * 25,
        easing: "ease-in-out",
        //composite: "add", // the first one cant have composite
        fill: "both",
      });

      const slideIn = element.animate(SLIDE_IN, {
        duration: 600,
        delay: 200 + index * 50,
        easing: "ease-in-out",
        fill: "both",
        composite: "add",
      });

      console.log(element.getAnimations(), slideIn, element);
      this.animations.push(slideIn);
    });
  }

  connectedCallback() {
    this.playAnimations();
  }

  playAnimations() {
    this.animations.forEach((animation) => {
      animation.play();
    });
  }
}

customElements.define("reveal-element", RevealElement);
