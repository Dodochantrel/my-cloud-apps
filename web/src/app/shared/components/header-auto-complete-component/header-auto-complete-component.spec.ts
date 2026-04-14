import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAutoCompleteComponent } from './header-auto-complete-component';

describe('HeaderAutoCompleteComponent', () => {
  let component: HeaderAutoCompleteComponent;
  let fixture: ComponentFixture<HeaderAutoCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderAutoCompleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderAutoCompleteComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
