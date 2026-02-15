import { TestBed } from '@angular/core/testing';

import { VideoDetailsService } from './video-details-service';

describe('VideoDetailsService', () => {
  let service: VideoDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
