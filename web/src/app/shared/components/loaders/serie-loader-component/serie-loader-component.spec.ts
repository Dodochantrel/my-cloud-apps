import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerieLoaderComponent } from './serie-loader-component';

describe('SerieLoaderComponent', () => {
  let component: SerieLoaderComponent;
  let fixture: ComponentFixture<SerieLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SerieLoaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SerieLoaderComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
