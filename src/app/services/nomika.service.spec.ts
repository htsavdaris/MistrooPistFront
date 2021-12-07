import { TestBed } from '@angular/core/testing';

import { NomikaService } from './nomika.service';

describe('NomikaService', () => {
  let service: NomikaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NomikaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
