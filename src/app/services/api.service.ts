import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuarios`);
  }

  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuarios`);
  }

  getJuegos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/juegos`);
  }

  getPedidos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/pedidos`);
  }

  getStocks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/stocks`);
  }

  createUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/usuarios`, usuario);
  }

  createPedido(pedido: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/pedidos`, pedido);
  }
}
