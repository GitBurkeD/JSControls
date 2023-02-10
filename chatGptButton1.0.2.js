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
        maxTokens: {
          type: 'string',
          title: 'Max Tokens',
          description: 'Max tokens for api Call'
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
    apiKey: '',
    response: '',
    loading: false
  };

  constructor() {
    super();
    this.apiKey = '';
    this.response = '';
    this.input = '';
    this.loading = false;
  }

  async handleSubmit() {
    this.loading=true;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${this.apiKey}`
      },
      body: JSON.stringify({
        prompt: this.prompt,
        model: 'text-davinci-003',
        max_tokens: this.maxTokens,
        temperature: 0.5
      })
    };

    const response = await fetch('https://api.openai.com/v1/completions', requestOptions)
      .then(async response => {
        if (!response.ok) {
          throw new Error(await response.text());
        }
        this.loading = false;
        return response.json();
        
      })
      .then(data => {
        this.response = data.choices[0].text;
        this.loading = false;
        this.requestUpdate()
      })
      .catch(error => {
        console.error('Error getting response from OpenAI API', error);
        this.loading = false;
        this.response = error.message;
      });
  }

  render() {
    return html`
      <div>
        <button @click=${this.handleSubmit}>Submit</button>
        <div>${this.loading ? html`<p>Loading...</p>` : html`<p>${this.response}</p>`}</div>
      </div>
    `;
  }
}

const elementName = 'openai-chat';
customElements.define(elementName, OpenAIChat);
