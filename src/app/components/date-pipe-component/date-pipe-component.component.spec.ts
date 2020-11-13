import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePipeComponentComponent } from './date-pipe-component.component';

describe('DatePipeComponentComponent', () => {
  let component: DatePipeComponentComponent;
  let fixture: ComponentFixture<DatePipeComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatePipeComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePipeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
