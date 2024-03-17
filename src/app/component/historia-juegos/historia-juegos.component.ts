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

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  selectedSection: string = '';
  scrollToSection(id: string) {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
