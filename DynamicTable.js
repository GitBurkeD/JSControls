import { html, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class DynamicTable extends LitElement {
  static properties = {
    data: { type: Array },
  };

  static getMetaConfig() {
    return {
      controlName: 'DynamicTable',
      fallbackDisableSubmit: false,
      version: '1.0',
      properties: {
        data: {
          type: 'array',
          title: 'Data',
          description: 'Array of objects to populate the table',
          items: {
            type: 'object',
            properties: {},
          },
        },
      },
    };
  }

  constructor() {
    super();
    this.data = [];
    this.editing = false;
  }
//Chat GPT did this
  render() {
    return html`
      <table>
        <thead>
          <tr>
            ${Object.keys(this.data[0] || {}).map(key => html`<th>${key}</th>`)}
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          ${this.data.map(row => html`
            <tr>
              ${Object.values(row).map(value => html`<td>${value}</td>`)}
              <td>
                <input type="checkbox" @change=${this._toggleEditing} />
              </td>
            </tr>
          `)}
        </tbody>
      </table>
    `;
  }

  _toggleEditing(event) {
    this.editing = event.target.checked;
  }
}

const elementName = 'dynamic-table';
customElements.define(elementName, DynamicTable);
