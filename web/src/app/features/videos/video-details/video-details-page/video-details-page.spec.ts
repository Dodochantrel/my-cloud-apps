import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoDetailsPage } from './video-details-page';

describe('VideoDetailsPage', () => {
  let component: VideoDetailsPage;
  let fixture: ComponentFixture<VideoDetailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoDetailsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoDetailsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
