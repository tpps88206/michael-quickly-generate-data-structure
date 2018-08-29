import { TestBed, inject } from '@angular/core/testing';

import { GenerateAngularService } from './generate-angular.service';

describe('GenerateAngularService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GenerateAngularService]
    });
  });

  it('should be created', inject([GenerateAngularService], (service: GenerateAngularService) => {
    expect(service).toBeTruthy();
  }));
});
