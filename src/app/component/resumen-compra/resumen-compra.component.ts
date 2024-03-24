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
  total: number = 0;
  comprarAhora: boolean = false;
  checkoutForm: FormGroup;
  mensaje: boolean = false;

  private clearCartSubscription: Subscription = new Subscription();
  isVacio: boolean = false;
  juegoId: number = 0;
  cantidad: number = 1;

  constructor(
    private purchaseService: PurchaseService,
    private juegoService: JuegoService,
    private formBuilder: FormBuilder
  ) {
    this.checkoutForm = this.formBuilder.group({
      nombre: ['Nacho', Validators.required],
      apellidos: ['Vivas', Validators.required],
      direccion: ['Plaza', Validators.required],
      codigoPostal: [
        '12345',
        [Validators.required, Validators.pattern(/^\d{5}$/)],
      ],
      email: ['nacho@nacho.es', [Validators.required, Validators.email]],
      numero: ['1234-1231-12-1234567890'],
      caducidad: ['12/34'],
      cvv: ['123'],
    });
  }

  checkout(juegoId: number, cantidad: number) {
    setTimeout(() => {
      this.mensaje = true;
    }, 1000);

    for (let i = 0; i < this.juegos.length; i++) {
      this.juegoId = this.juegos[i].id;
      this.juegoService.actualizarStock(this.juegoId, cantidad).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error(error);
        }
      );

    }

    this.purchaseService.clearCart();
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
    if (this.total === 0) {
      this.isVacio = true;
      this.comprarAhora = false;
    } else {
      this.isVacio = false;
      this.comprarAhora = true;
    }

    this.total === 0 ? (this.isVacio = true) : (this.comprarAhora = true);
  }

  onDeleteItem(index: number) {
    this.purchaseService.deleteItem(index);
    this.refreshPage();
  }
  private refreshPage(): void {
    window.location.reload();
  }
}
