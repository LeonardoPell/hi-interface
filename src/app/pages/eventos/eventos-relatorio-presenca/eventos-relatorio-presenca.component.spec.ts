import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosRelatorioPresencaComponent } from './eventos-relatorio-presenca.component';

describe('EventosRelatorioPresencaComponent', () => {
  let component: EventosRelatorioPresencaComponent;
  let fixture: ComponentFixture<EventosRelatorioPresencaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventosRelatorioPresencaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventosRelatorioPresencaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
