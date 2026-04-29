import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupListPage } from './group-list-page';

describe('GroupListPage', () => {
  let component: GroupListPage;
  let fixture: ComponentFixture<GroupListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupListPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupListPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
