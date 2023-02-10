import { html, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class OpenAIChat extends LitElement {
  static getMetaConfig() {
    return {
      controlName: 'Open AI Chat',
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
        apiKey: {
          type: 'string',
          title: 'API Key',
          description: 'API Key for OpenAI'
        }
      },
      standardProperties: {
        fieldLabel: true,
        readOnly: true,
        required: false,
        description: true,
      }
    };
  }

  static properties = {
    name: 'OpenAI Chat',
    title: 'OpenAI Chat',
    apiKey: ''
  };

  constructor() {
    super();
    this.apiKey = '';
    this.response = '';
    this.input = '';
  }

  handleSubmit() {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${this.apiKey}`
      },
      body: JSON.stringify({
        prompt: this.prompt,
        model: 'text-davinci-003',
        max_tokens: 100,
        temperature: 0.5
      })
    };

    fetch('https://api.openai.com/v1/completions', requestOptions)
      .then(async response => {
        if (!response.ok) {
          throw new Error(await response.text());
        }
        return response.json();
      })
      .then(data => {
        this.response = data.choices[0].text;
      })
      .catch(error => {
        console.error('Error getting response from OpenAI API', error);
        this.response = error.message;
      });
  }

  render() {
    return html`
      <div>
        <button @click=${this.handleSubmit}>Submit</button>
        <div>Response: ${this.response}</div>
      </div>
    `;
  }
}

const elementName = 'openai-chat';
customElements.define(elementName, OpenAIChat);
