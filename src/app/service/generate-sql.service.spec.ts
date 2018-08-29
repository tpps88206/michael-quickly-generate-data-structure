import { TestBed, inject } from '@angular/core/testing';

import { GenerateSqlService } from './generate-sql.service';

describe('GenerateSqlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GenerateSqlService]
    });
  });

  it('should be created', inject([GenerateSqlService], (service: GenerateSqlService) => {
    expect(service).toBeTruthy();
  }));
});
