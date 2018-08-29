import { TestBed, inject } from '@angular/core/testing';

import { WordProcessService } from './word-process.service';

describe('WordProcessService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WordProcessService]
    });
  });

  it('should be created', inject([WordProcessService], (service: WordProcessService) => {
    expect(service).toBeTruthy();
  }));
});
