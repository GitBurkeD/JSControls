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
        time: {
          type: 'string',
          title: 'Time',
          description: 'Time in HH:MM format'
        }
      },
      standardProperties: {
        readOnly: false,
        required: false,
        description: true,
      }
    };
  }

  static properties = {
    time: ''
  };

  constructor() {
    super();
    this.time = '';
    this.showClock = false;
  }

  _toggleClock() {
    this.showClock = !this.showClock;
  }

  _selectTime(event) {
    this.time = event.target.innerText;
    this.showClock = false;
  }

  render() {
    return html`
      <style>
        .clock {
          position: absolute;
          background-color: white;
          border: 1px solid gray;
          padding: 10px;
          display: none;
        }
        .clock.show {
          display: block;
        }
      </style>
      <input
        type="text"
        .value="${this.time}"
        @click="${this._toggleClock}"
      />
      <div class="clock" ?class="${this.showClock ? 'show' : ''}">
        ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map(
          hour => html`
            <div>
              ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59].map(
                minute => html`
                  <span
                    style="display: inline-block; padding: 5px;"
                    @click="${this._selectTime}"
                  >
                    ${hour}:${minute}
                  </span>
                `
              )}
            </div>
          `
        )}
      </div>
    `;
  }
}

const elementName = 'time-input-control';
customElements.define(elementName, TimeInputControl);
