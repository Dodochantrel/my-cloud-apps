import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationTitleComponent } from './application-title-component';

describe('ApplicationTitleComponent', () => {
  let component: ApplicationTitleComponent;
  let fixture: ComponentFixture<ApplicationTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationTitleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
