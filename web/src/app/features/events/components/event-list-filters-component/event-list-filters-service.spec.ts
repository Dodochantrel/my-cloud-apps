import { TestBed } from '@angular/core/testing';

import { EventListFiltersService } from './event-list-filters-service';

describe('EventListFiltersService', () => {
  let service: EventListFiltersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventListFiltersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
