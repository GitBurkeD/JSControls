import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class AudioRecorder extends LitElement {
  static getMetaConfig() {
    return {
      controlName: 'Audio Recorder',
      fallbackDisableSubmit: false,
      version: '1.0',
      iconUrl: 'microphone',
      groupName: 'media',
      properties: {},
      standardProperties: {
        readOnly: true,
        required: false,
        description: true,
      }
    };
  }

  constructor() {
    super();
    this.recording = false;
    this.audioChunks = [];
  }

  startRecording() {
    this.recording = true;
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.start();
        this.mediaRecorder.addEventListener("dataavailable", event => {
          this.audioChunks.push(event.data);
        });
        this.mediaRecorder.addEventListener("stop", () => {
          this.blob = new Blob(this.audioChunks, { 'type' : 'audio/ogg; codecs=opus' });
          this.audioUrl = URL.createObjectURL(this.blob);
        });
      })
      .catch(error => {
        console.error("There was an error accessing the microphone: ", error);
      });
  }

  stopRecording() {
    this.recording = false;
    this.mediaRecorder.stop();
  }

  playAudio() {
    this.audioElement = new Audio(this.audioUrl);
    this.audioElement.play();
  }

  render() {
    return html`
      ${this.recording ? 
        html`<button @click="${this.stopRecording}">Stop Recording</button>` : 
        html`<button @click="${this.startRecording}">Start Recording</button>`
      }
      ${this.audioUrl ? 
        html`<button @click="${this.playAudio}">Play Recording</button>` : 
        html``
      }
    `;
  }
}

customElements.define("audio-recorder", AudioRecorder);
