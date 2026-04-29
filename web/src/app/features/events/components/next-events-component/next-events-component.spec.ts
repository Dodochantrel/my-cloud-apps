import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextEventsComponent } from './next-events-component';

describe('NextEventsComponent', () => {
  let component: NextEventsComponent;
  let fixture: ComponentFixture<NextEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NextEventsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NextEventsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
