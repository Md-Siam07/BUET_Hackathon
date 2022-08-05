import { Component, OnInit } from '@angular/core';
import { TextRecognitionService } from '../service/text-recognition.service';

@Component({
  selector: 'app-search-music',
  templateUrl: './search-music.component.html',
  styleUrls: ['./search-music.component.css']
})
export class SearchMusicComponent implements OnInit {

  constructor(public textRecognize: TextRecognitionService) { }

  ngOnInit(): void {
  }

}
