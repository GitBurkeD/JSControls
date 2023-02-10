import { html, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class ChatControl extends LitElement {
  static getMetaConfig() {
    return {
      controlName: 'Chat Control',
      fallbackDisableSubmit: false,
      version: '1.0',
      iconUrl: 'one-line-text',
      groupName: 'groups',
      properties: {
        prompt: {
          type: 'string',
          title: 'Prompt',
          description: 'Text prompt to send to OpenAI'
        },
        authToken: {
            type: 'string',
            title: 'Authorization Token',
            description: 'Your token from Open AI. Be sure to include Bearer prior to the token'
          }
      },
      standardProperties: {
        fieldLabel: true,
        readOnly: true,
        required: false,
        description: true
      }
    };
  }
  static properties = {
    prompt: '',
    authToken: ''
  };

  constructor() {
    super();
    this.response = '';
  }

  render() {
    return html`
    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('https://api.openai.com/v1/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': ${this.authToken}
          },
          body: JSON.stringify({
            prompt: ${this.prompt},
            max_tokens: 100,
            temperature: 0.5,
            model: 'text-davinci-003',
          })
        });
        const json = await response.json();
        this.result = json.choices[0].text;
      };
      
      this.shadowRoot.querySelector('button').addEventListener('click', handleSubmit);
        <div>
          <button type="submit" @click=${this.handleSubmit}>Generate Response</button>
        </div>
        ${this.response
          ? html`
              <p>Generated response:</p>
              <p>${this.response}</p>
            `
          : ''}
    `;
  }
}

const elementName = 'chat-ai-control';
customElements.define(elementName, ChatControl);
