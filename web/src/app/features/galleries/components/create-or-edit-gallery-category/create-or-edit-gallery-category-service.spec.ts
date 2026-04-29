import { TestBed } from '@angular/core/testing';

import { CreateOrEditGalleryCategoryService } from '../create-or-edit-gallery-category-service';

describe('CreateOrEditGalleryCategoryService', () => {
  let service: CreateOrEditGalleryCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateOrEditGalleryCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
