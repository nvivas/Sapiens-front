import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegoRolComponent } from './juego-rol.component';

describe('JuegoRolComponent', () => {
  let component: JuegoRolComponent;
  let fixture: ComponentFixture<JuegoRolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JuegoRolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JuegoRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
