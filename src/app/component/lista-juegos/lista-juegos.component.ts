import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Juego } from '../../models/juego.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-lista-juegos',
  templateUrl: './lista-juegos.component.html',
  styleUrls: ['./lista-juegos.component.scss'],
})
export class ListaJuegosComponent implements OnInit {

  @ViewChild('filtroInput') filtroInput: ElementRef | undefined;
  juegosOriginales: Juego[] = [];
  juegos: Juego[] = [];
  textoInput: string = '';
  isVacio: boolean = false;

  constructor(private juego: ApiService, private elementRef: ElementRef) {}

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
    this.isVacio = false;

    if(juegosFiltrados.length === 0) {
      this.isVacio = true;
    }
  }

  mostrarTodos(inputElement: HTMLInputElement): void {
    this.isVacio = false;
    this.juegos = this.juegosOriginales;
    inputElement.value = '';
  }
}
