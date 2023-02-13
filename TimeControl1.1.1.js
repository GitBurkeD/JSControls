import { html, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
import flatpickr from 'https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.js';

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
    this._flatpickr = null;
  }

  firstUpdated() {
    this._flatpickr = flatpickr(this.shadowRoot.querySelector('input'), {
      enableTime: true,
      noCalendar: true,
      dateFormat: 'H:i',
      onChange: (selectedDates, dateStr) => {
        this._onTimeSelected(dateStr);
      }
    });
  }

  _onTimeSelected(value) {
    const args = {
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: value
    };
    const event = new CustomEvent('ntx-value-change', args);
    this.dispatchEvent(event);
  }

  render() {
    return html`
      <input type="text" value="${this.value}" />
    `;
  }
}

const elementName = 'time-control';
customElements.define(elementName, TimeInputControl);