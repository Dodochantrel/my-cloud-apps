import { TestBed } from '@angular/core/testing';

import { VideoCardService } from './video-card-service';

describe('VideoCardService', () => {
  let service: VideoCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
