// purchase.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  addToCart(gameId: number) {
    return this.http.post(`${this.apiUrl}/purchase/${gameId}`, {});
  }

  // Agrega métodos adicionales según las necesidades, como obtener el contenido del carrito, finalizar la compra, etc.
}
