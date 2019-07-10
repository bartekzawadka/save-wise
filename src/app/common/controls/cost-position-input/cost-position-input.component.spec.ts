import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostPositionInputComponent } from './cost-position-input.component';

describe('CostPositionInputComponent', () => {
  let component: CostPositionInputComponent;
  let fixture: ComponentFixture<CostPositionInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostPositionInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostPositionInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
