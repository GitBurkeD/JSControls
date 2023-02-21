import { html, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class LanguageControl extends LitElement {
  static properties = {
      languages: { type: Array },
      selectedLanguage: { type: String },
  };

  static getMetaConfig() {
    return {
      controlName: 'Set Form Language',
      fallbackDisableSubmit: false,
      version: '1.0',
      properties: {
        language: {
            type: 'string',
            title: 'Language',
            description: 'Language for form'
        }
      },
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
  
  constructor() {
    super();
    this.language = 'en';
    this.selectedLanguage = this.language;
  }

  render() {
    return html`
      <label for="language-input">Language:</label>
      <input type="text" id="language-input" value="${this.language}" @input="${this.handleChange}">
    `;
  }

  handleChange(event) {
    this.language = event.target.value;
    document.documentElement.lang = this.language;
    console.log = this.language
  }
}


const elementName = 'language-control';
customElements.define('language-control', LanguageControl);
