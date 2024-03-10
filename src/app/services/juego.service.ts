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
  juegos: Juego[] = [];
  total: number = 0;

  constructor(private http: HttpClient, private purchaseService: PurchaseService) { }


  enviarNombre(nombre: string) {
    return this.http.get<Juego>(`${this.apiUrl}?nombre=${nombre}`);
  }

  obtenerJuegoPorNombre(nombre: string): Observable<any> {
    console.log('Enviando nombre a Laravel:', nombre);
    return this.http.get<Juego>(`${this.apiUrl}/${nombre}`);
  }
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
        imagen_ruta: juego.imagen_ruta
      }))
    );
  }
  obtenerJuegos() {
    return this.http.get<any[]>(this.apiUrl);
  }

  getJuegoById(id: number) {
    console.log("getJuegoById")
    // console.log(this.http.get<any>(`${this.apiUrl}/${id}`))
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  filtrarJuegos(nombre: string): void {
    if (nombre === 'todos') {
      this.juegosSubject.next(this.juegos);
    } else {
      const juegosFiltrados = this.juegos.filter(
        (juego) => juego.nombre === nombre
      );
      this.juegosSubject.next(juegosFiltrados);
    }
  }
}
