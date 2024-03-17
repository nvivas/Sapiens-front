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
  mensaje: boolean = false;

  private clearCartSubscription: Subscription = new Subscription();

  constructor(
    private purchaseService: PurchaseService,
    private juegoService: JuegoService,
    private formBuilder: FormBuilder
  ) {
    this.checkoutForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      direccion: ['', Validators.required],
      codigoPostal: ['', Validators.required, Validators.min(5),  Validators.max(5)],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.min(9),  Validators.max(9)]]
    });
  }

  checkout() {
    setTimeout(() => {
      this.mensaje = true;
    }, 1000);
  }

  onSubmit() {
    console.log('Enviado');
  }

  ngOnInit(): void {
    this.items = this.purchaseService.getItems();
    this.purchaseService.getDataFromDatabase();
    this.obtenerJuegosAgregados();
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
