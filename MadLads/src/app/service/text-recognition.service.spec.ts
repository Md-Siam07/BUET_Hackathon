import { TestBed, inject } from '@angular/core/testing';

import { TextRecognitionService } from './text-recognition.service';

describe('TextRecognitionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TextRecognitionService]
    });
  });

  it('should be created', inject([TextRecognitionService], (service: TextRecognitionService) => {
    expect(service).toBeTruthy();
  }));
});
