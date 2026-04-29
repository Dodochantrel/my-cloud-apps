import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditEventComponent } from './create-or-edit-event-component';

describe('CreateOrEditEventComponent', () => {
  let component: CreateOrEditEventComponent;
  let fixture: ComponentFixture<CreateOrEditEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateOrEditEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOrEditEventComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
