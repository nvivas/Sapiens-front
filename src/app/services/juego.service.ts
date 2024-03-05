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

  constructor(private http: HttpClient, private purchaseService: PurchaseService) { }


  obtenerJuegosAgregados(items:any[]): void {
    console.log("service");
    console.log(items)
    // const juegosAgregados = this.purchaseService.getJuegosAgregados();
    const juegosAgregadosArray = Array.from(items);

    // Iterar sobre los IDs de los juegos agregados y obtener los juegos correspondientes
    const observables = juegosAgregadosArray.map(juegoId => this.getJuegoDataById(juegoId));
    // Combinar todos los observables en un solo observable
    forkJoin(observables).subscribe(
      (items: Juego[]) => {
        this.juegosSubject.next(items);
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
