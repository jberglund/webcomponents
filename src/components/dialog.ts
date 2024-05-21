const initial = `
  :host {
    display: block;
    box-sizing: border-box;
  }
`;

class DialogElement extends HTMLElement {
  private root: ShadowRoot;
  private dialog: HTMLDialogElement;

  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
    const styleSheet = new CSSStyleSheet();
    styleSheet.replaceSync(initial);

    this.root.adoptedStyleSheets = [styleSheet];
    this.dialog = document.createElement("dialog");
    this.dialog.appendChild(document.createElement("slot"));

    this.root.appendChild(this.dialog);
  }

  openDialog = () => {
    this.dialog.showModal();
  };

  close = () => {
    this.dialog.close();
  };

  connectedCallback() {
    this.openDialog();
  }
}

customElements.define("ok-dialog", DialogElement);

class CloseDialog extends HTMLElement {
  private root: ShadowRoot;
  private slotted: Element;

  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
    this.slotted = this.root
      .appendChild(document.createElement("slot"))
      .assignedElements()[0];

    if (!this.slotted || this.slotted.nodeName !== "BUTTON") {
      console.warn("Slotted element is not a button", this.slotted);
    }
  }

  closeDialog = (event: Event) => {
    event.preventDefault();
    try {
      // this will either call the method we defined in ok-dialog OR the native dialog method
      //@ts-expect-error
      this.closest("ok-dialog, dialog")!.close();
    } catch (e) {
      console.warn("No dialog found to close", e);
    }
  };

  connectedCallback() {
    this.slotted.addEventListener("click", this.closeDialog);
  }
  disconnectedCallback() {
    this.slotted.removeEventListener("click", this.closeDialog);
  }
}

customElements.define("ok-dialog-close", CloseDialog);
