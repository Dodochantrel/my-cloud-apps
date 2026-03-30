import { TestBed } from '@angular/core/testing';

import { ToWatchVideoService } from './to-watch-video-service';

describe('ToWatchVideoService', () => {
  let service: ToWatchVideoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToWatchVideoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
