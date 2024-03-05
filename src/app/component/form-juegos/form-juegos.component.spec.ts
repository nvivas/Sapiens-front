import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormJuegosComponent } from './form-juegos.component';

describe('InicioComponent', () => {
  let component: FormJuegosComponent;
  let fixture: ComponentFixture<FormJuegosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormJuegosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormJuegosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
