import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Juego } from 'src/app/models/juego.model';
import { JuegoService } from 'src/app/services/juego.service';

@Component({
  selector: 'app-detalle-juegos',
  templateUrl: './detalle-juegos.component.html',
  styleUrls: ['./detalle-juegos.component.scss'],
})
export class DetalleJuegosComponent implements OnInit {
  juego: Juego | undefined;
  juegoId: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private juegoService: JuegoService
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

    // this.route.params.subscribe((params) => {
    //   const juegoId = +params['id'];
    //   this.obtenerJuego(juegoId);
    // });
  }

  obtenerJuego(juegoId: number) {
    this.juegoService.getJuegoById(juegoId).subscribe((juego) => {
      this.juego = juego;
    });
  }
}
