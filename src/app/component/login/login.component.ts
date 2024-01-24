// login.component.ts

import { Component } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  onSubmit() {
    // Aquí implementarías la lógica de autenticación
    // Puedes utilizar un servicio para llamar a la API de autenticación y manejar la respuesta
    console.log('Nombre de usuario:', this.username);
    console.log('Contraseña:', this.password);
    // Llamada al servicio de autenticación...
  }
}
