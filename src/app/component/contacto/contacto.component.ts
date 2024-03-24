import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss'],
})
export class ContactoComponent {
  email: string = '';
  correoEnviado: boolean = false;
  mensajeExito: string = '';
  contacto: FormGroup;
  isCorrecto: boolean = false;
  mensaje: string = '';
  isNombre: boolean = false;
  isEmail: boolean = false;
  isMensaje: boolean = false;

  constructor(private fb: FormBuilder) {
    // No me han funcionado las validaciones con Validators. Creado método para validar más abajo
    this.contacto = this.fb.group({
      nombre: [''],
      email: [''],
      mensaje: [''],
    });
  }

  onSubmit() {}

  enviarCorreo() {
    this.validacion();
  }

  validarEmail(email: string) {
    // Expresión regular para validar un correo electrónico
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  validacion() {
    const nombre = this.contacto.get('nombre')?.value;
    const email = this.contacto.get('email')?.value;
    const mensaje = this.contacto.get('mensaje')?.value;

    nombre == '' ? (this.isNombre = true) : (this.isNombre = false);
    email == '' || !this.validarEmail(email) ? (this.isEmail = true) : (this.isEmail = false);
    mensaje == '' ? (this.isMensaje = true) : (this.isMensaje = false);

    if (nombre != '' && email != '' && this.validarEmail(email) && mensaje != '') {
      setTimeout(() => {
        this.correoEnviado = true;
        this.mensajeExito = '';
        this.email = '';
      }, 1000);
    }
  }
}
