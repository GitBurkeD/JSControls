import { html, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class TimeInputControl extends LitElement {
  static getMetaConfig() {
    return {
      controlName: 'Time Input Control',
      fallbackDisableSubmit: false,
      version: '1.0',
      iconUrl: 'one-line-text',
      groupName: 'inputs',
      properties: {
        value: {
          type: 'string',
          title: 'Time',
          description: 'Time in HH:MM format',
          isValueField: true
        }
      },
      events: ["ntx-value-change"],
      standardProperties: {
        fieldLabel: true,
        readOnly: true,
        required: true,
        description: true,
      }
    };
  }

  static properties = {
    value: ''
  };

  constructor() {
    super();
    this.value = "12:00";
    this.isOpen = false;
  }

  toggleClock() {
    this.isOpen = !this.isOpen;
  }

  selectTime(event) {
    this.value = event.target.textContent;
    this.isOpen = false;
  }
  onChange(e) {
    const args = {
        bubbles: true,
        cancelable: false,
        composed: true,
        // value coming from input change event. 
        detail: e.target.value,
    };
    const event = new CustomEvent('ntx-value-change', args);
    this.dispatchEvent(event);
    }
  render() {
    return html`
      <style>
        .time-input {
          position: relative;
        }

        .time-input__clock {
          position: absolute;
          top: 100%;
          left: 0;
          display: flex;
          flex-wrap: wrap;
          background-color: #fff;
          border: 1px solid #ccc;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          padding: 10px;
          z-index: 1;
          display: ${this.isOpen ? "block" : "none"};
        }

        .time-input__clock button {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: none;
          background-color: #fff;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          margin: 10px;
          font-size: 16px;
        }
      </style>
      <div class="time-input">
        <input
          type="text"
          value=${this.value}
          @click=${this.toggleClock}
        />
        <div class="time-input__clock">
          ${Array.from({ length: 24 }, (_, i) => {
            return html`
              <button @click=${this.selectTime}>
                ${("0" + i).slice(-2)}:00
              </button>
            `;
          })}
        </div>
      </div>
    `;
  }
}

const elementName = 'time-input-control';
customElements.define(elementName, TimeInputControl);
