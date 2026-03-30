import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToWatchVideoComponent } from './to-watch-video-component';

describe('ToWatchVideoComponent', () => {
  let component: ToWatchVideoComponent;
  let fixture: ComponentFixture<ToWatchVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToWatchVideoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToWatchVideoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
