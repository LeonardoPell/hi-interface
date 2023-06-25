import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrientacoesRitualisticasViewComponent } from './orientacoes-ritualisticas-view.component';

describe('OrientacoesRitualisticasViewComponent', () => {
  let component: OrientacoesRitualisticasViewComponent;
  let fixture: ComponentFixture<OrientacoesRitualisticasViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrientacoesRitualisticasViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrientacoesRitualisticasViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
