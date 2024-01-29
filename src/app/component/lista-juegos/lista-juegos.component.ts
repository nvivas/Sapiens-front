import { Component, OnInit } from '@angular/core';
import { Juego } from '../../models/juego.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-lista-juegos',
  templateUrl: './lista-juegos.component.html',
  styleUrls: ['./lista-juegos.component.scss']
})
export class ListaJuegosComponent implements OnInit {
  juegos: Juego[] = [];

  constructor(private juego: ApiService) {}

  ngOnInit(): void {
    this.getGames();
  }

  getGames(): void {
    this.juego.getJuegos()
      .subscribe(juego => this.juegos = juego);
  }
}
