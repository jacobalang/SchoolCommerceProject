import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeTransComponent } from './make-trans.component';

describe('MakeTransComponent', () => {
  let component: MakeTransComponent;
  let fixture: ComponentFixture<MakeTransComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakeTransComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeTransComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
