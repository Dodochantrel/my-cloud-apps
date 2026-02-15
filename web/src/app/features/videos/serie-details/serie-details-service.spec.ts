import { TestBed } from '@angular/core/testing';

import { SerieDetailsService } from './serie-details-service';

describe('SerieDetailsService', () => {
  let service: SerieDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SerieDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
