import { html, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class AudioControl extends LitElement {
  static getMetaConfig() {
    return {
      controlName: 'Audio Control',
      fallbackDisableSubmit: false,
      version: '1.0',
      iconUrl: 'audio',
      groupName: 'media',
      standardProperties: {
        readOnly: false,
        required: false,
        description: true,
      }
    };
  }

  static properties = {
    name: 'Audio',
    title: 'Audio'
  }

  constructor() {
    super();
    this.recording = false;
    this.audioChunks = [];
    this.audioBlob = null;
    this.audioUrl = null;
  }

  handleClick(e) {
    if (this.recording) {
      this.recording = false;
      this.mediaRecorder.stop();
    } else {
      this.recording = true;
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          this.mediaRecorder = new MediaRecorder(stream);
          this.mediaRecorder.start();

          this.mediaRecorder.addEventListener("dataavailable", event => {
            this.audioChunks.push(event.data);
          });

          this.mediaRecorder.addEventListener("stop", () => {
            this.audioBlob = new Blob(this.audioChunks);
            this.audioUrl = URL.createObjectURL(this.audioBlob);
          });
        });
    }
  }

  render() {
    return html`
      <div>
        <button @click=${this.handleClick}>${this.recording ? 'Stop' : 'Record'}</button>
        ${this.audioUrl ? html`<audio controls src=${this.audioUrl}></audio>` : ''}
      </div>
    `;
  }
}

const elementName = 'audio-control';
customElements.define(elementName, AudioControl);
