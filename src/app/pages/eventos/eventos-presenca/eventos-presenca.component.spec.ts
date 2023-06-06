import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosPresencaComponent } from './eventos-presenca.component';

describe('EventosPresencaComponent', () => {
  let component: EventosPresencaComponent;
  let fixture: ComponentFixture<EventosPresencaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventosPresencaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventosPresencaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
