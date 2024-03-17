import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Juego } from '../models/juego.model';
import { PurchaseService } from './purchase.service';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {
  private apiUrl = environment.apiUrl + '/juegos';
  private juegosSubject = new BehaviorSubject<any[]>([]);
  juegos$ = this.juegosSubject.asObservable();
  total: number = 0;
  juego: Juego[] = [];

  constructor(private http: HttpClient) { }


  obtenerJuegosAgregados(items:any[]): void {
    const juegosAgregadosArray = Array.from(items);
    const observables = juegosAgregadosArray.map(juegoId => this.getJuegoDataById(juegoId));

    forkJoin(observables).subscribe(
      (items: Juego[]) => {
        this.juegosSubject.next(items);
        console.log("juegosSubject Service")
        let juegos = this.juegosSubject.getValue();
        for (let juego of juegos) {
          console.log(juego.nombre);
          console.log(juego.precio);
          this.total += +juego.precio;
          console.log("Total " + this.total);
        }
      },
      (error) => {
        console.error('Error al obtener los juegos agregados:', error);
      }
    );
  }

   // Obtener solo el ID, nombre y precio del juego
   private getJuegoDataById(id: number): Observable<Juego> {
    return this.http.get<Juego>(`${this.apiUrl}/${id}`).pipe(
      map((juego: Juego) => ({
        id: juego.id,
        nombre: juego.nombre,
        precio: juego.precio,
        descripcion:juego.descripcion,
        categoria: juego.categoria,
        stock: juego.stock,
        imagen_ruta: juego.imagen_ruta,
        descripcion_ingles: juego.descripcion_ingles
      }))
    );
  }

  getJuegoById(id: number) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  filtrarProductos(categoria: string): void {
    console.log("Entra en filtrar productos del servicio");
      const juegosFiltrados = this.juego.filter(
        (juegoFiltro) => juegoFiltro.categoria === categoria
      );
      this.juegosSubject.next(juegosFiltrados);

      console.log("Juegos Filtrados: " + juegosFiltrados);
      console.log("juegosSubject.next: " + this.juegosSubject.next(juegosFiltrados));
  }
}
