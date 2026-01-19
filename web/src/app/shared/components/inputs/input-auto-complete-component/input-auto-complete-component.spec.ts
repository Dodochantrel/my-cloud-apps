import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputAutoCompleteComponent } from './input-auto-complete-component';

describe('InputAutoCompleteComponent', () => {
  let component: InputAutoCompleteComponent;
  let fixture: ComponentFixture<InputAutoCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputAutoCompleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputAutoCompleteComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
