import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriaMaconariaComponent } from './historia-maconaria.component';

describe('HistoriaMaconariaComponent', () => {
  let component: HistoriaMaconariaComponent;
  let fixture: ComponentFixture<HistoriaMaconariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriaMaconariaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriaMaconariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
