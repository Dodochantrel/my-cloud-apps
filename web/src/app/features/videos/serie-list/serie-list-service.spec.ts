import { TestBed } from '@angular/core/testing';

import { SerieListService } from './serie-list-service';

describe('SerieListService', () => {
  let service: SerieListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SerieListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
