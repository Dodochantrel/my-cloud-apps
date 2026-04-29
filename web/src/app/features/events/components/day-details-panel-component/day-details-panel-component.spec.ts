import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayDetailsPanelComponent } from './day-details-panel-component';

describe('DayDetailsPanelComponent', () => {
  let component: DayDetailsPanelComponent;
  let fixture: ComponentFixture<DayDetailsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayDetailsPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DayDetailsPanelComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
