import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostsListComponent } from './costs-list.component';

describe('CostsListComponent', () => {
  let component: CostsListComponent;
  let fixture: ComponentFixture<CostsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
