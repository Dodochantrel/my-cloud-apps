import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoInformationComponent } from './video-information-component';

describe('VideoInformationComponent', () => {
  let component: VideoInformationComponent;
  let fixture: ComponentFixture<VideoInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoInformationComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
