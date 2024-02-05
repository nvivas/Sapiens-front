// app.module.ts

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaJuegosComponent } from './component/lista-juegos/lista-juegos.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    AppComponent,
    ListaJuegosComponent,
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, TranslateModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
