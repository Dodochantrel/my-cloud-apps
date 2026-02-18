import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentVideoComponent } from './current-video-component';

describe('CurrentVideoComponent', () => {
  let component: CurrentVideoComponent;
  let fixture: ComponentFixture<CurrentVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentVideoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentVideoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
