import { Component, OnInit } from '@angular/core';
import { Juego } from '../../models/juego.model';
import { ApiService } from '../../services/api.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-lista-juegos',
  templateUrl: './lista-juegos.component.html',
  styleUrls: ['./lista-juegos.component.css']
})
export class ListaJuegosComponent implements OnInit {
  juegos: Juego[] = [];

  constructor(private juego: ApiService ,private translate: TranslateService) {}

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
}
