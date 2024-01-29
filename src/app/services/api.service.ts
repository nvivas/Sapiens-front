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

  getJuegos(): Observable<any[]> {
    debugger;
    return this.http.get<any[]>(`${this.apiUrl}/juegos`);
  }
}
