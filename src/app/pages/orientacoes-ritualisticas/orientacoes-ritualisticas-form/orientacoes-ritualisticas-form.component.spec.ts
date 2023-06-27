import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrientacoesRitualisticasFormComponent } from './orientacoes-ritualisticas-form.component';

describe('OrientacoesRitualisticasFormComponent', () => {
  let component: OrientacoesRitualisticasFormComponent;
  let fixture: ComponentFixture<OrientacoesRitualisticasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrientacoesRitualisticasFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrientacoesRitualisticasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
