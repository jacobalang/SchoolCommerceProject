import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNotificationRulesComponent } from './list-notification-rules.component';

describe('ListNotificationRulesComponent', () => {
  let component: ListNotificationRulesComponent;
  let fixture: ComponentFixture<ListNotificationRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListNotificationRulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListNotificationRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
