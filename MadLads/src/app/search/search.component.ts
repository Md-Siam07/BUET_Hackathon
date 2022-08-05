import { Component, OnInit } from '@angular/core';
import { TextRecognitionService } from '../service/text-recognition.service';
import { VoiceRecognitionService } from '../service/voice-recognition.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(public trs: TextRecognitionService) { }

  ngOnInit(): void {
  }

}
