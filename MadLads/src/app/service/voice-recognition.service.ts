import { Injectable } from '@angular/core';
import { TextRecognitionService } from './text-recognition.service';

declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class VoiceRecognitionService {

  recognition = new webkitSpeechRecognition();
  isStoppedSpeechRecog = false;
  public text = '';
  tempWords='';

  constructor(private textService: TextRecognitionService) { }


  init() {

    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    this.recognition.addEventListener('result', (e:any) => {
      const transcript = Array.from(e.results)
        .map((result:any) => result[0])
        .map((result:any) => result.transcript)
        .join('');
      this.tempWords = transcript;
      console.log(transcript);
    });
  }

  start() {
    this.isStoppedSpeechRecog = false;
    this.recognition.start();
    console.log("Speech recognition started")
    this.recognition.addEventListener('end', (condition:any) => {
      if (this.isStoppedSpeechRecog) {
        this.recognition.stop();
        console.log("End speech recognition")
      } else {
        this.wordConcat();
        this.recognition.start();
      }
    });
  }
  stop() {
    this.isStoppedSpeechRecog = true;
    this.wordConcat()
    this.recognition.stop();
    console.log("End speech recognition")
  }

  wordConcat() {
    this.text = this.tempWords;
    this.tempWords = '';

    if (this.text.includes('bye')) {
      this.stop();
    }
    this.textService.saySpeech(this.text);
  }

  saySpeech(text:any) {
    if (text == '') {
      console.log("MOhsin");
      return;
    }
    const speech = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(speech);
  }
}
