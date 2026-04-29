import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputToggleSwitchComponent } from './input-toggle-switch-component';

describe('InputToggleSwitchComponent', () => {
  let component: InputToggleSwitchComponent;
  let fixture: ComponentFixture<InputToggleSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputToggleSwitchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputToggleSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
