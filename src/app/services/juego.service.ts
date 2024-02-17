import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {
  private apiUrl = environment.apiUrl + '/juegos';

  constructor(private http: HttpClient) { }

  obtenerJuegos() {
    return this.http.get<any[]>(this.apiUrl);
  }

  getJuegoById(id: number) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
