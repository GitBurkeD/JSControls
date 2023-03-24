import { html, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class MarchMadnessControl extends LitElement {
  static properties = {
    games: { type: Array },
    selectedGame: { type: Object },
  };

  static getMetaConfig() {
    return {
      controlName: 'March Madness Scores',
      fallbackDisableSubmit: true,
      version: '1.0',
      properties: {},
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
    this.games = [];
    this.selectedGame = null;
    this.fetchScores();
  }

  render() {
    return html`
      <label for="game-select">Select a game:</label>
      <select id="game-select" @change="${this.handleChange}">
        ${this.games.map(game => html`
          <option value="${JSON.stringify(game)}" ?selected="${this.selectedGame && this.selectedGame.id === game.id}">
            ${game.title}
          </option>
        `)}
      </select>
    `;
  }

  async fetchScores() {
    const response = await fetch('https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard');
    const data = await response.json();
    const games = data.events
      .filter(game => game.status.type.name === 'STATUS_IN_PROGRESS')
      .map(game => ({
        id: game.id,
        title: `${game.competitions[0].competitors[0].team.abbreviation} vs. ${game.competitions[0].competitors[1].team.abbreviation}`,
        scores: game.competitions[0].competitors.map(competitor => ({
          name: competitor.team.abbreviation,
          score: competitor.score
        }))
      }));
    this.games = games;
    this.selectedGame = games[0];
  }

  handleChange(event) {
    this.selectedGame = JSON.parse(event.target.value);
    const args = {
        bubbles: true,
        cancelable: false,
        composed: true,
        // value coming from input change event. 
        detail: this.selectedGame,
    };
    const valueChangeEvent = new CustomEvent('ntx-value-change', args);
    this.dispatchEvent(valueChangeEvent);
  }
}

const elementName = 'march-madness';
customElements.define(elementName, MarchMadnessControl);
