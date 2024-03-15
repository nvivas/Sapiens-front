import { Component, OnInit } from '@angular/core';
import { Juego } from '../../models/juego.model';
import { ApiService } from '../../services/api.service';
import { TranslateService } from '@ngx-translate/core';
import { JuegoService } from 'src/app/services/juego.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { PurchaseService } from '../../services/purchase.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lista-juegos',
  templateUrl: './lista-juegos.component.html',
  styleUrls: ['./lista-juegos.component.scss'],
})
export class ListaJuegosComponent implements OnInit {
  juegosOriginales: Juego[] = [];
  juegos: Juego[] = [];
  juegoId!: number;
  juegoPrueba: Juego | undefined;
  items: any[] = [];
  textoInput: string = '';

  constructor(
    private juego: ApiService
  ) {}

  ngOnInit(): void {
    this.getJuegos();
  }

  getImagePath(imageName: string): string {
    return './../../../assets/img/' + imageName;
  }

  onInputChange(event: any): void {
    this.textoInput = event.target.value;
  }

  obtenerTexto(): void {
    console.log('Texto del input:', this.textoInput);
    // Aquí puedes hacer lo que quieras con el valor del input
  }

  getJuegos(): void {
    this.juego.getJuegos().subscribe((juegos) => {
      this.juegos = juegos;
      this.juegosOriginales = juegos;
    });
  }

  filtro(): void {
    if (this.textoInput) {
      const juegosFiltrados = this.juegosOriginales.filter(
        (juego) => juego.nombre === this.textoInput
      );
      this.juegos = juegosFiltrados;
    } else {
      this.juegos = this.juegosOriginales;
    }
  }
}
