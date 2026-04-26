import { TestBed } from '@angular/core/testing';

import { GalleryListService } from './gallery-list-service';

describe('GalleryListService', () => {
  let service: GalleryListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GalleryListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
