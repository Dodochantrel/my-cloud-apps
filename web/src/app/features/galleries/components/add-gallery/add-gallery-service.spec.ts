import { TestBed } from '@angular/core/testing';

import { AddGalleryService } from './add-gallery-service';

describe('AddGalleryService', () => {
  let service: AddGalleryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddGalleryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
