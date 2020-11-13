import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupMemebersComponent } from './group-memebers.component';

describe('GroupMemebersComponent', () => {
  let component: GroupMemebersComponent;
  let fixture: ComponentFixture<GroupMemebersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupMemebersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupMemebersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
