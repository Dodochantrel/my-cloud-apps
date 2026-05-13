import { TestBed } from '@angular/core/testing';

import { GalleryCategoryService } from './gallery-category-service';

describe('GalleryCategoryService', () => {
  let service: GalleryCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GalleryCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
