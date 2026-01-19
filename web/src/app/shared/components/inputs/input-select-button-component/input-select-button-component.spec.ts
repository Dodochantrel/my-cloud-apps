import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSelectButtonComponent } from './input-select-button-component';

describe('InputSelectButtonComponent', () => {
  let component: InputSelectButtonComponent;
  let fixture: ComponentFixture<InputSelectButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputSelectButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputSelectButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
