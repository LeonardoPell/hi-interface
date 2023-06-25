import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrientacoesRitualisticasReadComponent } from './orientacoes-ritualisticas-read.component';

describe('OrientacoesRitualisticasReadComponent', () => {
  let component: OrientacoesRitualisticasReadComponent;
  let fixture: ComponentFixture<OrientacoesRitualisticasReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrientacoesRitualisticasReadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrientacoesRitualisticasReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
