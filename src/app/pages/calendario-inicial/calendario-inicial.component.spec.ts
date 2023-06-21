import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioInicialComponent } from './calendario-inicial.component';

describe('CalendarioInicialComponent', () => {
  let component: CalendarioInicialComponent;
  let fixture: ComponentFixture<CalendarioInicialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarioInicialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarioInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
