import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditGroupComponent } from './create-or-edit-group-component';

describe('CreateOrEditGroupComponent', () => {
  let component: CreateOrEditGroupComponent;
  let fixture: ComponentFixture<CreateOrEditGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateOrEditGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOrEditGroupComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
