import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriaHiramComponent } from './historia-hiram.component';

describe('HistoriaHiramComponent', () => {
  let component: HistoriaHiramComponent;
  let fixture: ComponentFixture<HistoriaHiramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriaHiramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriaHiramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
