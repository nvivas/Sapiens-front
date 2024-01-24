// nuevo-usuario.component.ts

import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.scss'],
})
export class NuevoUsuarioComponent {
  nuevoUsuario: any = {};

  constructor(private apiService: ApiService) {}

  crearUsuario(): void {
    this.apiService.createUsuario(this.nuevoUsuario).subscribe((data) => {
      console.log('Usuario creado:', data);
    });
  }
}
