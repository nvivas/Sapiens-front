import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Juego } from 'src/app/models/juego.model';
import { JuegoService } from 'src/app/services/juego.service';
import { PurchaseService } from '../../services/purchase.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-detalle-juegos',
  templateUrl: './detalle-juegos.component.html',
  styleUrls: ['./detalle-juegos.component.scss'],
})
export class DetalleJuegosComponent implements OnInit {
  juego!: Juego;
  juegoId: number | undefined;
  idioma: string = '';
  isIdioma: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private juegoService: JuegoService,
    private purchaseService: PurchaseService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    console.warn('IdParam ', idParam);
    this.translateService.setDefaultLang('es');
    this.verificarIdiomaActual();
    if (idParam !== null && idParam !== undefined) {
      this.juegoId = +idParam;
      this.obtenerJuego(this.juegoId);
    }
  }

  obtenerJuego(juegoId: number) {
    this.juegoService.getJuegoById(juegoId).subscribe((juego) => {
      this.juego = juego;
    });
  }

  getImagePath(imageName: string): string {
    const ruta = './../../../assets/img/';
    return ruta + imageName;
  }

  addToCart(item: any) {
    console.log('Juegos: ' + this.juego.nombre);
    this.purchaseService.addToCart(item);
    const alertMessage = this.translateService.instant('detalle.alerta');
    alert(alertMessage);
  }

  verificarIdiomaActual(): boolean {
    // Obtener el idioma actual o el idioma predeterminado si no está definido
    this.idioma = this.translateService.currentLang;
    console.log('Idioma: ' + this.idioma);
    this.idioma == 'en' ? (this.isIdioma = false) : (this.isIdioma = true);
    return this.isIdioma;
  }
}
