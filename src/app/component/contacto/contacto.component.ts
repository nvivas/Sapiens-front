import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
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
    // Lógica para enviar el formulario
    console.log(this.contacto.value);
  }

  enviarCorreo() {
    // Aquí podrías enviar el correo electrónico usando un servicio HTTP
    // y luego, cuando la respuesta sea exitosa, ejecutar lo siguiente:

    // Simulando un tiempo de espera antes de mostrar el mensaje de éxito
    setTimeout(() => {
      this.correoEnviado = true;
      this.mensajeExito = 'El correo electrónico ha sido enviado.';
      this.email = ''; // Vaciar el campo de correo electrónico
    }, 2000); // Espera de 2 segundos
  }
}
