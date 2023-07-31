import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FotosReadComponent } from './fotos-read.component';

describe('FotosReadComponent', () => {
  let component: FotosReadComponent;
  let fixture: ComponentFixture<FotosReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FotosReadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FotosReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
