import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieLoaderComponent } from './movie-loader-component';

describe('MovieLoaderComponent', () => {
  let component: MovieLoaderComponent;
  let fixture: ComponentFixture<MovieLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieLoaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieLoaderComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
