class LoadingComponent extends HTMLElement {
  private _loading = false;

  set loading(state: boolean) {
    this._loading = state;
    this.setAttribute('loading', `${state}`);
  }

  get loading(){
    return this._loading;
  }

  static get observedAttributes() {
    return ["loading"];
  }

  attributeChangedCallback(name: string, _: string, newValue: string) {
    if(name === 'loading'){
      this._loading = newValue === 'true' ? true : false;
    }
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" }).innerHTML = `
      <style>
        :host{
          font-size: inherit;
          display: inline-grid;
          place-items: center;
          --offset-when-hidden: 200%;
        }
  
        .indicator, .text {
          grid-column: 1;
          grid-row: 1;
          transition: transform 500ms cubic-bezier(0, 0, 0, 1.03), opacity 700ms ease;
        }

        .indicator {
          transform: translateY(var(--offset-when-hidden));
          opacity: 0;
          transition-delay: 100ms;
        }
  
        .text {
          transform: translateY(0%);
          opacity: 1;
        }
  
        :host([loading="true"]) .indicator {
          transform: translateY(0);
          opacity: 1;
        }
        
        :host([loading="true"]) .text{
          transform: translateY(calc(var(--offset-when-hidden) * -1));
          opacity: 0;
        }
  
        .ok-spinner {
          --ok-spinner-width: 0.2em;
          --ok-spinner-color: white;
          position: relative;
          place-content: center;
        }
  
        .ok-spinner:after {
          width: calc(1em - var(--ok-spinner-width));
          height: calc(1em - var(--ok-spinner-width));
          border: var(--ok-spinner-width) solid oklch(from var(--ok-spinner-color) l c h / 0.5);
          border-top: var(--ok-spinner-width) solid var(--ok-spinner-color);
          animation: ok-spinner 800ms linear infinite;
          border-radius: 50%;
          content: '';
          display: block;
        }
  
  
        @keyframes ok-spinner {
          0% {
            transform: rotate(0);
            visibility: visible;
          }
  
          100% {
            transform: rotate(1turn);
          }
        }
      </style>
  

        <div class="indicator">
            <slot name="indicator">
                <span class="ok-spinner" part="spinner"></span>
            </slot>
        </div>
        
        <span class="text">
          <slot></slot>
        </span>
    `;
  }
}

export type {LoadingComponent};

customElements.define("loading-indicator", LoadingComponent);
