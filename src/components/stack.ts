import { Rule, generateCSSRules } from "../utils/generateCSSRule";

const initial = `
:host(:not([to-slotted])) {
  flex-flow: column wrap;
  justify-content: flex-start;
  display: flex;
}

:host([to-slotted]) ::slotted(*) {
  flex-flow: column wrap;
  justify-content: flex-start;
  display: flex;
}

:host([horizontal][to-slotted]) ::slotted(*),
:host([horizontal]:not([to-slotted])) {
  flex-direction: row;
  align-items: center;
}

:host([horizontal='start'] ){
  align-items: start;
}

:host([horizontal='end'] ){
  align-items: end;
}

:host([justify='start'] ){
  justify-content: start;
}
:host([justify='center'] ){
  justify-content: center;
}
:host([justify='end'] ){
  justify-content: end;
}
:host([justify='space-between'] ){
  justify-content: space-between;
}
`;

/* const horizontal: Rule = {

} */

const gap = {
  property: "gap",
  token: "spacing",
  values: ["xs", "s", "m", "l", "xl", "none"],
};

const gapY = {
  property: "gap-row",
  token: "spacing",
  values: ["xs", "s", "m", "l", "xl", "none"],
};

const gapX = {
  property: "gap-column",
  token: "spacing",
  values: ["xs", "s", "m", "l", "xl", "none"],
};

const compiledCSS = [
  generateCSSRules(gap),
  generateCSSRules(gapX),
  generateCSSRules(gapY),
  initial,
].join("");

class Stack extends HTMLElement {
  root: ShadowRoot;
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
    const styleSheet = new CSSStyleSheet();
    styleSheet.replaceSync(compiledCSS);
    this.shadowRoot!.adoptedStyleSheets = [styleSheet];
  }

  connectedCallback() {
    this.root.innerHTML = `<slot></slot>`;
  }
}

customElements.define("ok-stack", Stack);
