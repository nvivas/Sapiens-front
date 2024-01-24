// juegos.component.ts

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.scss'],
})
export class JuegosComponent implements OnInit {
  juegos: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getJuegos().subscribe((data) => {
      this.juegos = data;
    });
  }
}
