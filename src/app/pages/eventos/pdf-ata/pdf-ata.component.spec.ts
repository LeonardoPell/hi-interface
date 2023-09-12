import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfAtaComponent } from './pdf-ata.component';

describe('PdfAtaComponent', () => {
  let component: PdfAtaComponent;
  let fixture: ComponentFixture<PdfAtaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfAtaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfAtaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
