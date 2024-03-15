// resumen-compra.component.ts
import { Component, OnInit } from '@angular/core';
import { PurchaseService } from '../../services/purchase.service';
import { Juego } from 'src/app/models/juego.model';
import { JuegoService } from 'src/app/services/juego.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-resumen-compra',
  templateUrl: './resumen-compra.component.html',
  styleUrls: ['./resumen-compra.component.scss'],
})
export class ResumenCompraComponent implements OnInit {
  items: Juego[] = [];
  juegos: Juego[] = [];
  itemCount: number = 0;
  total: number | undefined;
  comprarAhora: boolean = false;
  checkoutForm: FormGroup;
  confirmationMessage: string = '';

  private clearCartSubscription: Subscription = new Subscription();

  constructor(private purchaseService: PurchaseService,
    private juegoService: JuegoService,
    private formBuilder: FormBuilder
  ) {

    this.checkoutForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      direccion: ['', Validators.required],
      codigoPostal: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required]
    });
  }

  checkout() {
    if (this.checkoutForm.valid) {
      this.confirmationMessage = `¡Gracias por su compra, ${this.checkoutForm.value.nombre}!
        Sus datos de contacto son:
        Nombre: ${this.checkoutForm.value.nombre}
        Apellidos: ${this.checkoutForm.value.apellidos}
        Dirección: ${this.checkoutForm.value.direccion}
        Código Postal: ${this.checkoutForm.value.codigoPostal}
        Correo Electrónico: ${this.checkoutForm.value.email}
        Teléfono: ${this.checkoutForm.value.telefono}
      `;
      this.checkoutForm.reset();
    }
  }

  ngOnInit(): void {
    this.items = this.purchaseService.getItems();
    this.purchaseService.getDataFromDatabase();
    this.obtenerJuegosAgregados();
    // Suscribirse al evento de carrito borrado
    this.clearCartSubscription = this.purchaseService
      .getClearCartObservable()
      .subscribe(() => {
        this.items = [];
        this.updateItemCount();
      });

    this.calculateTotal();
  }

  obtenerJuegosAgregados(): void {
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

  ngOnDestroy(): void {
    // Liberar la suscripción al salir del componente
    this.clearCartSubscription.unsubscribe();
  }

  borrarCarrito() {
    this.purchaseService.clearCart();
    window.location.reload();
  }

  private updateItemCount() {
    this.itemCount = this.purchaseService.getItemCount();
  }

  calculateTotal(): void {
    this.juegoService.juegos$.subscribe((total) => {
      this.total = this.juegos.reduce((acc, juego) => acc + +juego.precio, 0);
    });
  }

  comprar() {
    this.comprarAhora = true;
    this.purchaseService.clearCart();
  }
}
