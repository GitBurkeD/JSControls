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
        readOnly: true,
        required: false,
        description: true,
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

  firstUpdated() {
    this.getResponse();
  }

  async getResponse() {
    const response = await fetch('https://api.openai.com/v1/engines/davinci/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.authToken
      },
      body: JSON.stringify({
        prompt: this.prompt,
        max_tokens: 100,
        temperature: 0.5
      })
    });
    const json = await response.json();
    this.response = json.choices[0].text;
  }

  render() {
    return html`
      <div>
        <p>${this.response}</p>
      </div>
    `;
  }
}

const elementName = 'chat-control';
customElements.define(elementName, ChatControl);
