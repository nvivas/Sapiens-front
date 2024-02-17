import { Component, OnInit } from '@angular/core';
import { Juego } from '../../models/juego.model';
import { ApiService } from '../../services/api.service';
import { TranslateService } from '@ngx-translate/core';
import { JuegoService } from 'src/app/juego.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-juegos',
  templateUrl: './lista-juegos.component.html',
  styleUrls: ['./lista-juegos.component.scss']
})


export class ListaJuegosComponent implements OnInit {
  juegos: Juego[] = [];
  juegosFiltrados: any[] = [];
  filtro: string = '';

  constructor(private juego: ApiService ,private translate: TranslateService, private juegosService: JuegoService) {}

  ngOnInit(): void {
    this.getGames();
    this.obtenerJuegos();
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

  transform(items: any[], filtro: string): any[] {
    if (!items || !filtro) {
      return items;
    }
    return items.filter(item => item.nombre.toLowerCase().includes(filtro.toLowerCase()));
  }

  obtenerJuegos() {
    this.juegosService.obtenerJuegos().subscribe(
      (response: any) => {
        this.juegos = response;
        this.aplicarFiltro();
      },
      (error: any) => {
        console.error('Error al obtener los juegos', error);
      }
    );
  }

  aplicarFiltro() {
    this.juegosFiltrados = this.juegos.filter(juego =>
      juego.nombre.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }


}
