import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sapiens-front';
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('es'); // Establece el idioma predeterminado
  }

  cambiarIdioma(idioma: string) {
    this.translate.use(idioma); // Cambia el idioma
  }
}
 