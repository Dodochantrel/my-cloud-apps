import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCalendarComponent } from './event-calendar-component';

describe('EventCalendarComponent', () => {
  let component: EventCalendarComponent;
  let fixture: ComponentFixture<EventCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventCalendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventCalendarComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
