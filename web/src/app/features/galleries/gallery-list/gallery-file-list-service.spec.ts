import { TestBed } from '@angular/core/testing';

import { GalleryFileListService } from './gallery-file-list-service';

describe('GalleryFileListService', () => {
  let service: GalleryFileListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GalleryFileListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
