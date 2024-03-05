// resumen-compra.component.ts
import { Component, OnInit } from '@angular/core';
import { PurchaseService } from '../../services/purchase.service';
import { Juego } from 'src/app/models/juego.model';
import { JuegoService } from 'src/app/services/juego.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resumen-compra',
  templateUrl: './resumen-compra.component.html',
  styleUrls: ['./resumen-compra.component.scss'],
})
export class ResumenCompraComponent implements OnInit {
  items: Juego[] = [];
  juegos: Juego[] = [];
  itemCount: number = 0;
  juegoId: number | undefined;
  juego!: Juego;
  total: number = 0;

  private clearCartSubscription: Subscription = new Subscription();

  constructor(private purchaseService: PurchaseService, private juegoService: JuegoService, private route: ActivatedRoute) {  }

  ngOnInit(): void {
    this.items = this.purchaseService.getItems();
    this.purchaseService.getDataFromDatabase();
    this.obtenerJuegosAgregados();
    // Suscribirse al evento de carrito borrado
    this.clearCartSubscription = this.purchaseService.getClearCartObservable().subscribe(() => {
      this.items = [];
      this.updateItemCount();
    });

    this.calculateTotal();
  }

  obtenerJuego(juegoId: number) {
    this.juegoService.getJuegoById(juegoId).subscribe((juego) => {
      this.juego = juego;
    });
  }

  obtenerJuegosAgregados(): void {
    console.log("obtenerJuegosAgregados")
    console.log(this.items);
    this.juegoService.obtenerJuegosAgregados(this.items);
    this.juegoService.juegos$.subscribe(
      (juegos: Juego[]) => {
        this.juegos = juegos;

      },
      (error) => {
        console.error('Error al obtener los juegos agregados:', error);
      }
    );
  }

  obtenerJuegos(): void {
    this.juegoService.obtenerJuegos().subscribe(
      (juegos: Juego[]) => {
        this.juegos = juegos;
      },
      (error) => {
        console.error('Error al obtener los juegos:', error);
      }
    );
  }

  ngOnDestroy(): void {
    // Liberar la suscripción al salir del componente
    this.clearCartSubscription.unsubscribe();
  }

  borrarCarrito() {
    this.purchaseService.clearCart();
  }

  private updateItemCount() {
    this.itemCount = this.purchaseService.getItemCount();
  }

  calculateTotal(): void {
    // this.items.precio;
    // const totalItems = this.itemCount * this.items.precio;
    if (this.items.every(item => typeof item.precio === 'number')) {
      this.total = this.items.reduce((acc, item) => acc + item.precio, 0);
    } else {
      console.error('Alguno de los elementos en el arreglo "items" no tiene una propiedad "precio" que sea un número.');
    }
  }
}
