const parseStringToHTML = (htmlString: string) =>
  new DOMParser()
    .parseFromString(htmlString, "text/html")
    .querySelector("main")!;

/*
 * 1. Look for anchor tags in the slotted content
 * 2. Attach events to anchor tags with the following attribute: ll-follow ll-modal
 * 3. When an anchor tag is clicked,
 * 3.1.  Prevent the default action
 * 3.2.  Fetch content of the anchor tag href
 * 3.3.  Store the content of the current page in history.state
 * 3.4.  Replace the content of the current page with the fetched content
 * 4. Rebind events to the new content
 * 5. Repeat
 */

class LoaderLoader extends HTMLElement {
  private root: ShadowRoot;
  private slotted: Element;

  private bindLinks() {
    this.slotted.querySelectorAll("a[ll-follow]").forEach((a) => {
      a.addEventListener("click", (event) => {
        event.preventDefault();

        this.fetchPage(a.getAttribute("href")!);
      });
    });
  }

  private async fetchPage(url: string) {
    const response = await fetch(url);
    const text = await response.text();
    //history.pushState(text, "", url);
    //console.log(history.state);
    await this.insertPage(text);
  }
  private async insertPage(html: string) {
    const newDOM = parseStringToHTML(html);
    this.root.replaceChildren(newDOM);
    this.bindLinks();
  }

  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
    this.slotted = this.root
      .appendChild(document.createElement("slot"))
      .assignedElements()[0];
  }

  connectedCallback() {
    this.bindLinks();

    window.addEventListener("popstate", (event) => {
      console.log(event);
      if (event.state) {
        this.insertPage(event.state);
      }
    });
  }
}

customElements.define("loader-loader", LoaderLoader);
