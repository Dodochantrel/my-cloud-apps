import { TestBed } from '@angular/core/testing';

import { WatchedVideoService } from './watched-video-service';

describe('WatchedVideoService', () => {
  let service: WatchedVideoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WatchedVideoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
