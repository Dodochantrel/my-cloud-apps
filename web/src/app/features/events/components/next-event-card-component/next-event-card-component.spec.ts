import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextEventCardComponent } from './next-event-card-component';

describe('NextEventCardComponent', () => {
  let component: NextEventCardComponent;
  let fixture: ComponentFixture<NextEventCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NextEventCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NextEventCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
