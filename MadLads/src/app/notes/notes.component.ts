import { Component, OnInit } from '@angular/core';
import { TextRecognitionService } from '../service/text-recognition.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  constructor(public trs: TextRecognitionService) { }
  //comment
  ngOnInit(): void {
  }

  remainingTime(input: string){
    return Math.floor((Date.now() - Number(input))/60000);
  }

}
