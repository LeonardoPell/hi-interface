import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceiroOpcoesComponent } from './financeiro-opcoes.component';

describe('FinanceiroOpcoesComponent', () => {
  let component: FinanceiroOpcoesComponent;
  let fixture: ComponentFixture<FinanceiroOpcoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinanceiroOpcoesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanceiroOpcoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
