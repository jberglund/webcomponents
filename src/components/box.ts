import { type Rule, generateCSSRules } from "../utils/generateCSSRule";

const sizes = ["xs", "s", "m", "l", "xl"];

const initial = `
  :host {
    display: block;
    box-sizing: border-box;
  }
`;
const padding: Rule = {
  property: "padding",
  token: "spacing",
  values: sizes,
};

const paddingInline: Rule = {
  property: "padding-inline",
  token: "spacing",
  values: sizes,
};

const paddingBlock: Rule = {
  property: "padding-block",
  token: "spacing",
  values: sizes,
};

const borderRadius: Rule = {
  rule: "border-radius",
  token: "border-radius",
  values: ["xs", "s", "m", "pill", "circle"],
  property: "radius",
};

const background: Rule = {
  property: "background",
  token: "background-color",
  values: ["success", "warning", "danger", "info", "subtle"],
};

const border: Rule = {
  property: "border",
  rule: "border",
  token: "border",
  values: ["success", "warning", "danger", "info", "subtle"],
};

const shadow: Rule = {
  property: "shadow",
  rule: "box-shadow",
  token: "shadow",
  values: ["xs", "s", "m", "l", "xl", "2xl"],
};

const display: Rule = {
  property: "display",
  rule: "display",
  values: ["flex", "flex-inline", "block", "inline"],
  valueType: "value",
};

const compiledCSS = [
  generateCSSRules(padding),
  generateCSSRules(paddingBlock),
  generateCSSRules(paddingInline),
  generateCSSRules(borderRadius),
  generateCSSRules(background),
  generateCSSRules(border),
  generateCSSRules(shadow),
  generateCSSRules(display),
  initial,
].join("");

/**
 * Here is a description of my web component.
 *
 * @element ok-box
 *
 * @attr {success|warning|danger|info|subtle} border - The border color.
 * @attr {success|warning|danger|info|subtle} background - The background color.
 * @attr {flex|flex-inline|block|inline} display - The background color.
 * @attr {xs|s|m|pill|circle} radius - The border-radius of the box.
 * @attr {xs|s|m|l|xl} shadow - The shadow of the box.
 * @attr {xs|s|m|l|xl} padding
 * @attr {xs|s|m|l|xl} padding-inline
 *
 * @slot - This is an unnamed slot (the default slot)
 */
class Box extends HTMLElement {
  private root: ShadowRoot;

  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
    const styleSheet = new CSSStyleSheet();
    styleSheet.replaceSync(compiledCSS);
    this.shadowRoot!.adoptedStyleSheets = [styleSheet];
    this.root.innerHTML = `<slot></slot>`;
  }
}

customElements.define("ok-box", Box);
