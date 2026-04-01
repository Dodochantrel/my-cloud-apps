import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventListPage } from './event-list-page';

describe('EventListPage', () => {
  let component: EventListPage;
  let fixture: ComponentFixture<EventListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventListPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventListPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
