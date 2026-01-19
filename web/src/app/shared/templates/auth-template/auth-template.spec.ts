import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthTemplate } from './auth-template';

describe('AuthTemplate', () => {
  let component: AuthTemplate;
  let fixture: ComponentFixture<AuthTemplate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthTemplate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthTemplate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
