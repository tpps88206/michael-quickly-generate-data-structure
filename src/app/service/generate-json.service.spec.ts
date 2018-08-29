import { TestBed, inject } from '@angular/core/testing';

import { GenerateJsonService } from './generate-json.service';

describe('GenerateJsonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GenerateJsonService]
    });
  });

  it('should be created', inject([GenerateJsonService], (service: GenerateJsonService) => {
    expect(service).toBeTruthy();
  }));
});
