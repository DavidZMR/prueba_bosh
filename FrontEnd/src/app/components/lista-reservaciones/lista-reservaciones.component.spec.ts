import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaReservacionesComponent } from './lista-reservaciones.component';

describe('ListaReservacionesComponent', () => {
  let component: ListaReservacionesComponent;
  let fixture: ComponentFixture<ListaReservacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaReservacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaReservacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
