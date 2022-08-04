import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from "@angular/router";
import { VoiceRecognitionService } from '../service/voice-recognition.service';
import { TextRecognitionService } from '../service/text-recognition.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userDetails;
  constructor(private userService: UserService, private router: Router,
     public voiceService: VoiceRecognitionService,
     private textService:TextRecognitionService
     ) {
    voiceService.init();
  }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
      },
      err => {
        console.log(err);

      }
    );
  }

  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

  voiceAssistant(): void {
    this.voiceService.start();
    this.textService.saySpeech(this.voiceService.text);
  }

  voiceAssistantStop(): void {
    this.voiceService.stop();
  }

}
