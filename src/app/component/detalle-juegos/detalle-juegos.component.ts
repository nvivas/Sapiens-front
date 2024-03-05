import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Juego } from 'src/app/models/juego.model';
import { JuegoService } from 'src/app/services/juego.service';
import { PurchaseService } from '../../services/purchase.service';

@Component({
  selector: 'app-detalle-juegos',
  templateUrl: './detalle-juegos.component.html',
  styleUrls: ['./detalle-juegos.component.scss'],
})
export class DetalleJuegosComponent implements OnInit {
  juego!: Juego;
  juegoId: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private juegoService: JuegoService,
    private purchaseService: PurchaseService
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    console.warn('IdParam ', idParam);
    if (idParam !== null && idParam !== undefined) {
      this.juegoId = +idParam;
      this.obtenerJuego(this.juegoId);
    } else {
      console.error('Error: el parámetro id es null o undefined');
    }
  }

  obtenerJuego(juegoId: number) {
    this.juegoService.getJuegoById(juegoId).subscribe((juego) => {
      this.juego = juego;
    });
  }

  getImagePath(imageName: string): string {
    console.log('./../../../assets/img/' + imageName)
    return './../../../assets/img/' + imageName;
  }

   addToCart(item: any) {
    console.log("Juegos: " + this.juego.nombre);
    this.purchaseService.addToCart(item);
  }


}
