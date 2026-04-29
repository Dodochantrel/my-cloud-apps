import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventListFiltersComponent } from './event-list-filters-component';

describe('EventListFiltersComponent', () => {
  let component: EventListFiltersComponent;
  let fixture: ComponentFixture<EventListFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventListFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventListFiltersComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
