import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputStarRatingComponent } from './input-star-rating-component';

describe('InputStarRatingComponent', () => {
  let component: InputStarRatingComponent;
  let fixture: ComponentFixture<InputStarRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputStarRatingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputStarRatingComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
