import { TestBed, inject } from '@angular/core/testing';

import { RateProgressService } from './rate-progress.service';

describe('RateProgressService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RateProgressService]
    });
  });

  it('should be created', inject([RateProgressService], (service: RateProgressService) => {
    expect(service).toBeTruthy();
  }));
});
