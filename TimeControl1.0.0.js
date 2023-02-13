import { html, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class TimeInputControl extends LitElement {
  static getMetaConfig() {
    return {
      controlName: 'Time Input Control',
      fallbackDisableSubmit: false,
      version: '1.0',
      iconUrl: 'date-picker',
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
        toolTip: true,
        visibility: true,
        placeholder: true
      }
    };
  }

  static properties = {
    value: '00:00:00'
  }

  constructor() {
    super();
    this.showClock = false;
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
    handleClick() {
      this.showClock = !this.showClock;
    }
  
    _onTimeSelected(event) {
      this.value = event.target.value;
      this.showClock = false;
    }
  
    render() {
      return html`
        <div class="time-picker">
          <input type="text" value="${this.value}" @click="${this.handleClick}" />
          ${this.showClock
            ? html`
              <div class="clock-picker">
                <input
                  type="time"
                  value="${this.value}"
                  @change="${this._onTimeSelected}"
                />
              </div>
            `
            : ''
          }
        </div>
      `;
    }
  }

const elementName = 'time-input-control';
customElements.define(elementName, TimeInputControl);
