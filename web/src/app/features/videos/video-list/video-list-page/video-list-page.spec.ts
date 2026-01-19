import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoListPage } from './video-list-page';

describe('VideoListPage', () => {
  let component: VideoListPage;
  let fixture: ComponentFixture<VideoListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoListPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoListPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
