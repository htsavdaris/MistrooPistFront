import { TestBed } from '@angular/core/testing';

import { FysikaService } from './fysika.service';

describe('FysikaService', () => {
  let service: FysikaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FysikaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
