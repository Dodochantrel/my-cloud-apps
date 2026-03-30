import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchedVideoComponent } from './watched-video-component';

describe('WatchedVideoComponent', () => {
  let component: WatchedVideoComponent;
  let fixture: ComponentFixture<WatchedVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatchedVideoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatchedVideoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
