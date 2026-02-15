import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerieDetailsPage } from './serie-details-page';

describe('SerieDetailsPage', () => {
  let component: SerieDetailsPage;
  let fixture: ComponentFixture<SerieDetailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SerieDetailsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SerieDetailsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
