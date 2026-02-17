import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VideoSearchInputComponent } from './video-search-input-component';



describe('VideoSearchInputComponent', () => {
  let component: VideoSearchInputComponent;
  let fixture: ComponentFixture<VideoSearchInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoSearchInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoSearchInputComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
