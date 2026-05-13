import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputEditorComponent } from './input-editor-component';

describe('InputEditorComponent', () => {
  let component: InputEditorComponent;
  let fixture: ComponentFixture<InputEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputEditorComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
