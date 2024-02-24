import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Juego } from '../models/juego.model';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {
  private apiUrl = environment.apiUrl + '/juegos';
  private juegosSubject = new BehaviorSubject<any[]>([]);
  juegos$ = this.juegosSubject.asObservable();

  juegos: Juego[] = [];

  constructor(private http: HttpClient) { }

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
