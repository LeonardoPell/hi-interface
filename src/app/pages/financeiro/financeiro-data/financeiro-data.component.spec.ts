import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceiroDataComponent } from './financeiro-data.component';

describe('FinanceiroDataComponent', () => {
  let component: FinanceiroDataComponent;
  let fixture: ComponentFixture<FinanceiroDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinanceiroDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanceiroDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
