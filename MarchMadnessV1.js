import { html, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

class Scoreboard extends LitElement {
  static get properties() {
    return {
      games: { type: Array },
    };
  }

  render() {
    return html`
      <ul>
        ${this.games.map(
          (game) =>
            html`
              <li>
                <strong>${game.competitions[0].competitors[0].team.name}</strong>
                ${game.competitions[0].competitors[0].score} - ${game.competitions[0].competitors[1].score}
                <strong>${game.competitions[0].competitors[1].team.name}</strong>
              </li>
            `
        )}
      </ul>
    `;
  }
}

class MarchMadnessControl extends LitElement {
  static properties = {
    games: { type: Array },
    selectedGameId: { type: String },
  };

  static getMetaConfig() {
    return {
      controlName: 'March Madness Scores',
      fallbackDisableSubmit: false,
      version: '1.0',
      properties: {
        gameId: {
          type: 'string',
          title: 'Game ID',
          description: 'ID of the game to display scores for',
          isValueField: true,
        },
      },
      events: ['ntx-value-change'],
      standardProperties: {
        fieldLabel: true,
        readOnly: true,
        required: true,
        description: true,
        toolTip: true,
        visibility: true,
        placeholder: true,
      },
    };
  }

  constructor() {
    super();
    this.games = [];
    this.selectedGameId = '';
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.loadGames();
  }

  async loadGames() {
    const response = await fetch('http://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard');
    const data = await response.json();
    this.games = data.events.filter((game) => game.competitions[0].status.type.name === 'STATUS_IN_PROGRESS');
  }

  render() {
    return html`
      <label for="game-select">Select a game:</label>
      <select id="game-select" @change="${this.handleChange}">
        <option value="">Select a game</option>
        ${this.games.map(
          (game) =>
            html`
              <option value="${game.id}" ?selected="${this.selectedGameId === game.id}">
                ${game.name} (${game.competitions[0].status.type.shortDetail})
              </option>
            `
        )}
      </select>

      ${this.selectedGameId
        ? html`
            <h3>${this.games.find((game) => game.id === this.selectedGameId).name}</h3>
            <scoreboard-element .games="${this.games.filter((game) => game.id === this.selectedGameId)}"></scoreboard-element>
          `
        : ''}
    `;
  }

  handleChange(event) {
    this.selectedGameId = event.target.value;
    const args = {
      bubbles: true,
      cancelable: false,
      composed: true,
      // value coming from input change event.
      detail: this.selectedGameId,
    };
    const valueChangeEvent = new CustomEvent('ntx-value-change', args);
    this.dispatchEvent(valueChangeEvent);
  }
}

const elementName = 'march-madness';
customElements.define(elementName, MarchMadnessControl);
