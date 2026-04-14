import { TestBed } from '@angular/core/testing';

import { CreateOrEditGroupService } from './create-or-edit-group-service';

describe('CreateOrEditGroupService', () => {
  let service: CreateOrEditGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateOrEditGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
