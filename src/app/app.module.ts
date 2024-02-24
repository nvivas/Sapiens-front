import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ListaJuegosComponent } from './component/lista-juegos/lista-juegos.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './component/navbar/navbar.component';
import { HistoriaJuegosComponent } from './component/historia-juegos/historia-juegos.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { DetalleJuegosComponent } from './component/detalle-juegos/detalle-juegos.component';
import { InicioComponent } from './component/inicio/inicio.component';
import { FilterPipe } from './filter.pipe';
import { PurchaseService } from './services/purchase.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    ListaJuegosComponent,
    NavbarComponent,
    HistoriaJuegosComponent,
    DetalleJuegosComponent,
    InicioComponent,
    FilterPipe,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RouterModule.forRoot([]),
    AppRoutingModule
  ],
  providers: [PurchaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
