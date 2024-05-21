class LoaderComponent extends HTMLElement {
  private shadow = this.attachShadow({ mode: "open" });
  static get observedAttributes() {
    return ["src"];
  }

  async fetchPage(url: string) {
    return await this.parseResponse(
      fetch(url).then((response) => response.text())
    );
  }

  async parseResponse(text: Promise<string>) {
    return text
      .then(
        (html) =>
          new DOMParser()
            .parseFromString(html, "text/html")
            .querySelector("main")!
      )
      .then((main) =>
        this.shadow.getElementById("loader")!.replaceChildren(main)
      )
      .finally(() => this.bindFormSubmit());
  }

  private formSubmit(el: HTMLFormElement) {
    el.addEventListener("submit", async (event) => {
      event.preventDefault();
      const form = event.target as HTMLFormElement;
      const resource = form.action;

      const options = {
        method: form.method,
        body: new FormData(form),
      };

      const r = await fetch(resource, options);

      if (!r.ok) {
        // @TODO: Show an error message
        return;
      }

      await this.parseResponse(r.text());
      //this.shadow.getElementById("loader")!.replaceChildren(newDOM);
    });
  }

  bindFormSubmit() {
    this.shadow.querySelectorAll("form").forEach((e) => this.formSubmit(e));
  }

  constructor() {
    super();

    this.shadow.innerHTML = `
      <div>
        <slot></slot>
        <div id="loader">Laster ...</div>
      </div>
    `;
  }

  connectedCallback() {
    this.fetchPage(this.getAttribute("src")!);
  }
}

customElements.define("form-loader", LoaderComponent);
