class LoadingComponent extends HTMLElement {
    static get observedAttributes() {
      return ['loading'];
    }
  
    connectedCallback() {
      this.attachShadow({ mode: 'open' }).innerHTML = `
      <style>
        :host{
          display: inline-grid;
          font-size: inherit;
          place-items: center;
          --offset-when-hidden: -100%;
        }
  
        .indicator, .text {
          grid-column: 1;
          grid-row: 1;
          transition: transform 300ms ease, opacity 300ms ease;
        }

        .indicator {
          transform: translateY(var(--offset-when-hidden));
          opacity: 0;
        }
  
        .text {
          transform: translateY(0%);
          opacity: 1;
        }
  
        :host([loading]) .indicator {
          transform: translateY(0);
          opacity: 1;
        }
        
        :host([loading]) .text{
          transform: translateY(calc(var(--offset-when-hidden) * -1));
          opacity: 0;
        }
  
        .ok-spinner {
          --ok-spinner-width: 2px;
          position: relative;
          place-content: center;
        }
  
        .ok-spinner:after {
          width: calc(1em - var(--ok-spinner-width));
          height: calc(1em - var(--ok-spinner-width));
          border: var(--ok-spinner-width) solid var(--ok-spinner-color, currentColor);
          animation: ok-spinner 1s linear infinite;
          border-color: var(--ok-spinner-background);
          border-radius: 50%;
          border-top: var(--ok-spinner-width) solid transparent;
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
  
  customElements.define('loading-indicator', LoadingComponent);
  