import { html, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class DynamicTable extends LitElement {
  static properties = {
    data: { type: String },
  };

  static getMetaConfig() {
    return {
      controlName: 'Dynamic Table',
      fallbackDisableSubmit: false,
      version: '1.0',
      iconUrl: 'one-line-text',
      groupName: 'groups',
      properties: {
        data: {
          type: 'string',
          title: 'Data',
          description: 'Data in JSON format',
        }
      },
      standardProperties: {
        readOnly: true,
        required: false,
        description: true,
    }
    };
  }

  constructor() {
    super();
    this.data = '[]';
  }

  render() {
    const data = JSON.parse(this.data);
    const headers = Object.keys(data[0]);

    return html`
      <table>
        <thead>
          <tr>
            ${headers.map(header => html`<th>${header}</th>`)}
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${data.map(
            row => html`
              <tr>
                ${headers.map(header => html`<td>${row[header]}</td>`)}
                <td><input type="checkbox" /></td>
              </tr>
            `
          )}
        </tbody>
      </table>
    `;
  }
}

const elementName = 'dynamic-table';
customElements.define(elementName, DynamicTable);
