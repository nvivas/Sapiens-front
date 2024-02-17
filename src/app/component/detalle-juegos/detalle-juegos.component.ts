import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JuegoService } from 'src/app/juego.service';
import { Juego } from 'src/app/models/juego.model';

@Component({
  selector: 'app-detalle-juegos',
  templateUrl: './detalle-juegos.component.html',
  styleUrls: ['./detalle-juegos.component.scss'],
})
export class DetalleJuegosComponent implements OnInit {
  juego: Juego | undefined;
  juegoId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private juegoService: JuegoService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam !== null && idParam !== undefined && !isNaN(+idParam)) {
        this.juegoId = +idParam;
        this.juegoService.getJuegoById(this.juegoId);
      } else {
        console.error(
          'Error: this.juegoId no está definido o su valor no es numérico'
        );
      }
    });
  }
}
