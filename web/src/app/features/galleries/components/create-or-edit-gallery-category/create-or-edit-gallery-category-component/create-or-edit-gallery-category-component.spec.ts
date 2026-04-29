import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditGalleryCategoryComponent } from './create-or-edit-gallery-category-component';

describe('CreateOrEditGalleryCategoryComponent', () => {
  let component: CreateOrEditGalleryCategoryComponent;
  let fixture: ComponentFixture<CreateOrEditGalleryCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateOrEditGalleryCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOrEditGalleryCategoryComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
