import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextRecognitionService {

  constructor() { }

  saySpeech(text) {
    let reply = "Please say something";
    if (text == null) {
      console.log("MOhsin");
      return;
    }

    if (text.includes('song')) {
      reply = "la la la"
    } else if (text.includes('news')) {
      reply = "its war time";
    } else if (text.includes('weather')) {
      reply = "Its rainning";
    } else if (text.includes('note')) {
      reply = "I AM taking notes";
    }

    if(reply == 'Please say something') {
      return;
    }
    const speech = new SpeechSynthesisUtterance(reply);
    speechSynthesis.speak(speech);
  }
}
