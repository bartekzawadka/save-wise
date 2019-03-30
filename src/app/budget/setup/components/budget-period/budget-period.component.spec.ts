import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetPeriodComponent } from './budget-period.component';

describe('BudgetPeriodComponent', () => {
  let component: BudgetPeriodComponent;
  let fixture: ComponentFixture<BudgetPeriodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetPeriodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
