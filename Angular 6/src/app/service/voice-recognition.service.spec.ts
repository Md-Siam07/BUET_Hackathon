import { TestBed, inject } from '@angular/core/testing';

import { VoiceRecognitionService } from './voice-recognition.service';

describe('VoiceRecognitionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VoiceRecognitionService]
    });
  });

  it('should be created', inject([VoiceRecognitionService], (service: VoiceRecognitionService) => {
    expect(service).toBeTruthy();
  }));
});
