import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastaViewComponent } from './pasta-view.component';

describe('PastaViewComponent', () => {
  let component: PastaViewComponent;
  let fixture: ComponentFixture<PastaViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastaViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
