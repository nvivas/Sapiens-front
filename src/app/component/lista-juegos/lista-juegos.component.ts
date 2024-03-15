import { Component, OnInit } from '@angular/core';
import { Juego } from '../../models/juego.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-lista-juegos',
  templateUrl: './lista-juegos.component.html',
  styleUrls: ['./lista-juegos.component.scss'],
})
export class ListaJuegosComponent implements OnInit {
  juegosOriginales: Juego[] = [];
  juegos: Juego[] = [];
  textoInput: string = '';

  constructor(private juego: ApiService) {}

  ngOnInit(): void {
    this.getJuegos();
  }

  getImagePath(imageName: string): string {
    return './../../../assets/img/' + imageName;
  }

  onInputChange(event: any): void {
    this.textoInput = event.target.value;
  }

  getJuegos(): void {
    this.juego.getJuegos().subscribe((juegos) => {
      this.juegos = juegos;
      this.juegosOriginales = juegos;
    });
  }

  filtro(): void {
    const textoInputLower = this.textoInput.toLowerCase();
    const juegosFiltrados = this.juegosOriginales.filter((juego) =>
      juego.nombre.toLowerCase().includes(textoInputLower)
    );
    this.juegos = juegosFiltrados;
  }

  mostrarTodos(): void {
    this.juegos = this.juegosOriginales;
  }
}
