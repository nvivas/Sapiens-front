// nuevo-pedido.component.ts

import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-nuevo-pedido',
  templateUrl: './nuevo-pedido.component.html',
  styleUrls: ['./nuevo-pedido.component.scss'],
})
export class NuevoPedidoComponent {
  nuevoPedido: any = {};

  constructor(private apiService: ApiService) {}

  crearPedido(): void {
    this.apiService.createPedido(this.nuevoPedido).subscribe((data) => {
      console.log('Pedido creado:', data);
    });
  }
}
