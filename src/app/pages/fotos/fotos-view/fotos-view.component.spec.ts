import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FotosViewComponent } from './fotos-view.component';

describe('FotosViewComponent', () => {
  let component: FotosViewComponent;
  let fixture: ComponentFixture<FotosViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FotosViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FotosViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
