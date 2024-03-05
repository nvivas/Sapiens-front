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
  juegoSeleccionado: any;
  nombreFiltrado: string = '';
  filteredData: any[] = [];

  searchTerm: string = '';
  filteredItems: Juego[] = [];


  constructor(private juego: ApiService ,private translate: TranslateService, private juegosService: JuegoService,
                    private router: Router, private purchaseService: PurchaseService) {
                      this.getJuegos();
                    }

  ngOnInit(): void {
    this.getJuegos();
  }

  getJuegos(): void {
    this.juego.getJuegos().subscribe(juego => this.juegos = juego);
  }

  // searchGames(): void {
  //   this.filteredItems = this.juegos.filter(item => item.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()));
  // }

  searchGames(event: Event): void {
    this.filteredItems = this.juegos.filter(item => item.nombre.toLowerCase().includes((event.target as HTMLInputElement).value.toLowerCase()));
    console.log(this.filteredItems);
    const filterValue = (event.target as HTMLInputElement).value;
  }
  // cambiarIdioma(idioma: string) {
  //   this.translate.use(idioma); // Cambiar el idioma de la aplicación
  // }

  getImagePath(imageName: string): string {
    return './../../../assets/img/' + imageName;
  }

  filtrarJuegosPorNombre() {
    return this.juegos.filter(juego =>
      juego.nombre.toLowerCase().includes(this.nombreFiltrado.toLowerCase())
    );
  }
}
