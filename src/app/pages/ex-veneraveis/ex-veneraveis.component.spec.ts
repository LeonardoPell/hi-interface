import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExVeneraveisComponent } from './ex-veneraveis.component';

describe('ExVeneraveisComponent', () => {
  let component: ExVeneraveisComponent;
  let fixture: ComponentFixture<ExVeneraveisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExVeneraveisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExVeneraveisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
