class Box extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" }).innerHTML = `
    <style>
      :host(:not([to-slotted]):is([padding="xl"])),
      :host(:is([to-slotted][padding="xl"])) ::slotted(*){
        padding: 2rem;
      }

      :host(:not([to-slotted])):host([border="subtle"]),
      :host([to-slotted][border="subtle"])  ::slotted(*){
        border: 1px solid #ccc;
      }

      :host{
        display: block;
      }
      
    </style>
    <slot></slot><slot name='boop'></slot>`;
  }
}

customElements.define('cool-box', Box);