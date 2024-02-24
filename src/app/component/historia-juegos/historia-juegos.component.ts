import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-historia-juegos',
  templateUrl: './historia-juegos.component.html',
  styleUrls: ['./historia-juegos.component.scss']
})
export class HistoriaJuegosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

// Método para llevar al usuario al principio de la página
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  selectedSection: string = ''; // Propiedad para almacenar la sección seleccionada

  scrollToSection(id: string) {
    const section = document.getElementById(id); // Obtener el elemento de la sección
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' }); // Desplazar la página a la sección
    }
  }



}
