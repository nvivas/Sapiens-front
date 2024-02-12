import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriaJuegosComponent } from './historia-juegos.component';

describe('HistoriaJuegosComponent', () => {
  let component: HistoriaJuegosComponent;
  let fixture: ComponentFixture<HistoriaJuegosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriaJuegosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriaJuegosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
