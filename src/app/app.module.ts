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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetalleJuegosComponent } from './component/detalle-juegos/detalle-juegos.component';
import { InicioComponent } from './component/inicio/inicio.component';
import { PurchaseService } from './services/purchase.service';
import { ResumenCompraComponent } from './component/resumen-compra/resumen-compra.component';
import { ContactoComponent } from './component/contacto/contacto.component';
import { JuegoRolComponent } from './component/juego-rol/juego-rol.component';

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
    ResumenCompraComponent,
    ContactoComponent,
    JuegoRolComponent
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
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [PurchaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
