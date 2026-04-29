import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationNavigationComponent } from './application-navigation-component';

describe('ApplicationNavigationComponent', () => {
  let component: ApplicationNavigationComponent;
  let fixture: ComponentFixture<ApplicationNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationNavigationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
