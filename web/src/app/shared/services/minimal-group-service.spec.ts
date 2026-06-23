import { TestBed } from '@angular/core/testing';

import { MinimalGroupService } from './minimal-group-service';

describe('MinimalGroupService', () => {
  let service: MinimalGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinimalGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
