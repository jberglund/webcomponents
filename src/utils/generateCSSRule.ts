export type Rule = {
  property: string;
  rule?: string;
  token?: string;
  values: string[];
  valueType?: "custom-property" | "value";
};

export function generateCSSRules({
  property,
  rule,
  values,
  token,
  valueType = "custom-property",
}: Rule) {
  return values
    .map((value) =>
      `
    :host([${property}="${value}"]):host(:not([to-slotted])),
    :host([to-slotted][${property}="${value}"]) ::slotted(*){ 
      ${rule || property}: ${
        valueType === "custom-property" ? `var(--${token}-${value})` : value
      }; 
    }
  `.trim()
    )
    .join("");
}
