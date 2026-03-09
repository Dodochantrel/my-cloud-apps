import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewVideoComponent } from './review-video-component';

describe('ReviewVideoComponent', () => {
  let component: ReviewVideoComponent;
  let fixture: ComponentFixture<ReviewVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewVideoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewVideoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
