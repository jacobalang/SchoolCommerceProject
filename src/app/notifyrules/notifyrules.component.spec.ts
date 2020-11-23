import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifyrulesComponent } from './notifyrules.component';

describe('NotifyrulesComponent', () => {
  let component: NotifyrulesComponent;
  let fixture: ComponentFixture<NotifyrulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotifyrulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifyrulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
