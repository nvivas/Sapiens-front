// purchase.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private items: any[] = [];
  private itemCountSubject: Subject<number> = new Subject<number>();
  private storageKey = 'carrito';
  private clearCartSubject: Subject<void> = new Subject<void>();
  private juegosAgregados: Set<number> = new Set<number>();
  private apiUrl = environment.apiUrl + '/juegos';

  constructor(private http: HttpClient) {
    this.loadCart();
  }

  addToCart(item: any) {
    this.items.push(item);
    console.log("juegos: " + this.items),
    this.juegosAgregados.add(item.id); // Almacenar el ID del juego agregado
    this.saveCart();
    this.updateItemCount(); // Actualiza el contador cuando se añade un elemento
  }

  getItems(): any[] {
    console.log(this.items)
    return this.items;
  }

  getItemCount(): number {
    return this.items.length;
  }

  getItemCountObservable(): Observable<number> {
    return this.itemCountSubject.asObservable();
  }

  clearCart() {
    this.items = [];
    this.saveCart();
    this.clearCartSubject.next(); // Emitir evento de carrito borrado
    this.updateItemCount(); // Actualizar contador de elementos
  }

  private saveCart() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
  }

  private loadCart() {
    const storedCart = localStorage.getItem(this.storageKey);
    this.items = storedCart ? JSON.parse(storedCart) : [];
    this.updateItemCount();
  }

  getClearCartObservable(): Observable<void> {
    return this.clearCartSubject.asObservable();
  }

  private updateItemCount() {
    this.itemCountSubject.next(this.items.length);
  }

  // Método para obtener los datos de la base de datos
  getDataFromDatabase(): Observable<any[]> {
    console.log(this.http.get<any[]>(this.apiUrl))
    return this.http.get<any[]>(this.apiUrl);
  }
  private refreshPage(): void {
    window.location.reload();
  }

  deleteItem(index: number) {
    this.items.splice(index, 1);
    this.saveCart();
    this.updateItemCount();
    this.clearCartSubject.next();
}
}
