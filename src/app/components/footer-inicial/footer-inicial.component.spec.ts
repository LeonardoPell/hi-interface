import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterInicialComponent } from './footer-inicial.component';

describe('FooterInicialComponent', () => {
  let component: FooterInicialComponent;
  let fixture: ComponentFixture<FooterInicialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterInicialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
