import { Component, OnInit } from '@angular/core';
import { TextRecognitionService } from '../service/text-recognition.service';

@Component({
  selector: 'app-top-news',
  templateUrl: './top-news.component.html',
  styleUrls: ['./top-news.component.css']
})
export class TopNewsComponent implements OnInit {

  constructor(public textRecord: TextRecognitionService) { }

  ngOnInit(): void {
  }

}
