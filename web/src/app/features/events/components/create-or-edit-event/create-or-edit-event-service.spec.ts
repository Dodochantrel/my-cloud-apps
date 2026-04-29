import { TestBed } from '@angular/core/testing';

import { CreateOrEditEventService } from './create-or-edit-event-service';

describe('CreateOrEditEventService', () => {
  let service: CreateOrEditEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateOrEditEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
