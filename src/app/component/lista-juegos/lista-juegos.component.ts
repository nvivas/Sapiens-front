import { Component, OnInit } from '@angular/core';
import { Juego } from '../../models/juego.model';
import { ApiService } from '../../services/api.service';
import { TranslateService } from '@ngx-translate/core';
import { JuegoService } from 'src/app/services/juego.service';
import { Router } from '@angular/router';
import { PurchaseService } from '../../services/purchase.service';

@Component({
  selector: 'app-lista-juegos',
  templateUrl: './lista-juegos.component.html',
  styleUrls: ['./lista-juegos.component.scss']
})


export class ListaJuegosComponent implements OnInit {
  juegos: Juego[] = [];
  juegosFiltrados: any[] = [];
  filtro: string = '';
  juegoSeleccionado: any;
  filterPost = '';
  categorias: string[] = ['categoria1', 'categoria2', 'todos'];

  constructor(private juego: ApiService ,private translate: TranslateService, private juegosService: JuegoService,
                    private router: Router, private purchaseService: PurchaseService) {}

  ngOnInit(): void {
    this.getGames();
  }

  getGames(): void {
    this.juego.getJuegos().subscribe(juego => this.juegos = juego);
  }

  cambiarIdioma(idioma: string) {
    this.translate.use(idioma); // Cambiar el idioma de la aplicación
  }

  getImagePath(imageName: string): string {
    return './../../../assets/img/' + imageName;
  }

  filtrarProductos(event: any): void {
    const nombre = event.target.value;
    this.juegosService.filtrarJuegos(nombre);
  }

  addToCart(juegoID: number) {
    this.purchaseService.addToCart(juegoID).subscribe(
      () => {
        console.log('Juego agregado al carrito');
        // Aquí puedes manejar la actualización del carrito en el frontend si es necesario
      },
      (error) => {
        console.error('Error al agregar juego al carrito:', error);
      }
    );
  }
}
