import { html, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class LanguageControl extends LitElement {
  static properties = {
    languages: { type: Array },
    selectedLanguage: { type: String },
  };

  static getMetaConfig() {
    return {
      controlName: 'Form Language Dropdown',
      fallbackDisableSubmit: false,
      version: '1.0',
      properties: {
        language: {
          type: 'string',
          title: 'Language',
          description: 'Language for form',
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

  constructor() {
    super();
    this.languages = ['en', 'fr', 'es'];
    this.language = 'en';
    this.selectedLanguage = this.language;
  }

  render() {
    return html`
      <label for="language-select">Language:</label>
      <select id="language-select" @change="${this.handleChange}">
        ${this.languages.map(lang => html`<option value="${lang}" ?selected="${this.language === lang}">${lang}</option>`)}
      </select>
    `;
  }

  handleChange(event) {
    this.language = event.target.value;
    document.documentElement.lang = this.language;
    console.log(this.language);
    const args = {
        bubbles: true,
        cancelable: false,
        composed: true,
        // value coming from input change event. 
        detail: event.target.value,
    };
    const event = new CustomEvent('ntx-value-change', args);
    this.dispatchEvent(event);
  }
}

const elementName = 'language-dropdown';
customElements.define('language-dropdown', LanguageControl);
