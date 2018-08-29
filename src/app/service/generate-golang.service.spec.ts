import { TestBed, inject } from '@angular/core/testing';

import { GenerateGolangService } from './generate-golang.service';

describe('GenerateGolangService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GenerateGolangService]
    });
  });

  it('should be created', inject([GenerateGolangService], (service: GenerateGolangService) => {
    expect(service).toBeTruthy();
  }));
});
