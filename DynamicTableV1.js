import { html, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class DynamicTable extends LitElement {

  static getMetaConfig() {
    return {
      controlName: 'Dynamic Table',
      fallbackDisableSubmit: false,
      version: '1.0',
      iconUrl: 'one-line-text',
      groupName: 'groups',
      properties: {
        who: {
          type: 'string',
          title: 'Table Data',
          description: 'Data in JSON format'
        }
      },
      standardProperties: {
        title: true,
        readOnly: true,
        required: false,
        description: true
      }
    };
  }
  static properties = {
    who: {type: String}
  }
  render() {
    const who = JSON.parse(this.who);
    const headers = Object.keys(who[0]);

    return html`
      <table>
        <thead>
          <tr>
            ${headers.map(header => html`<th>${header}</th>`)}
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${who.map(
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