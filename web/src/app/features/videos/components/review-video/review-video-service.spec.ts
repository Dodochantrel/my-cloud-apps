import { TestBed } from '@angular/core/testing';

import { ReviewVideoService } from './review-video-service';

describe('ReviewVideoService', () => {
  let service: ReviewVideoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewVideoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
