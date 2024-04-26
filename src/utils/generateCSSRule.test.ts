import { Rule, generateCSSRules } from "./generateCSSRule";
import { expect, it, describe } from "vitest";

describe("generateCSSRules", () => {
  it("should generate CSS rules correctly", () => {
    const rule: Rule = {
      property: "color",
      rule: "background-color",
      values: ["red"],
      token: "theme",
    };

    const expected = `
    :host([color="red"]):host(:not([to-slotted])),
    :host([to-slotted][color="red"]) ::slotted(*){ 
      background-color: var(--theme-red); 
    }
    `.trim();

    const result = generateCSSRules(rule);

    expect(result).toEqual(expected);
  });
  it("should generate CSS rules correctly with custom value type", () => {
    const rule: Rule = {
      property: "display",
      rule: "display",
      values: ["flex"],
      valueType: "value",
    };

    const expected = `
    :host([display="flex"]):host(:not([to-slotted])),
    :host([to-slotted][display="flex"]) ::slotted(*){ 
      display: flex; 
    }
    `.trim();
    const result = generateCSSRules(rule);
    console.log(result);
    // prettier-ignore
    expect(result).toEqual(expected);
  });
});
