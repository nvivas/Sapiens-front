import { Component, OnInit } from '@angular/core';
import { Juego } from '../../models/juego.model';
import { ApiService } from '../../services/api.service';
import { TranslateService } from '@ngx-translate/core';
import { JuegoService } from 'src/app/services/juego.service';
import { Router } from '@angular/router';
import { PurchaseService } from '../../services/purchase.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lista-juegos',
  templateUrl: './lista-juegos.component.html',
  styleUrls: ['./lista-juegos.component.scss']
})

export class ListaJuegosComponent implements OnInit {
  juegos: Juego[] = [];

  constructor(private juego: ApiService) {
                    }

  ngOnInit(): void {
    this.getJuegos();
  }

  getJuegos(): void {
    this.juego.getJuegos().subscribe(juego => this.juegos = juego);
  }

  getImagePath(imageName: string): string {
    return './../../../assets/img/' + imageName;
  }
}
