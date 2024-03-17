import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss'],
})
export class ContactoComponent {
  email: string = '';
  correoEnviado: boolean = false;
  mensajeExito: string = '';

  contacto = this.fb.group({
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    telefono: [''],
    mensaje: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    console.log('Enviado');
  }

  enviarCorreo() {
    setTimeout(() => {
      this.correoEnviado = true;
      this.mensajeExito = '';
      this.email = '';
    }, 1000);
  }
}
