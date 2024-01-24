// app.module.ts

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuariosComponent } from './component/usuarios/usuarios.component';
import { JuegosComponent } from './component/juegos/juegos.component';
import { PedidosComponent } from './component/pedidos/pedidos.component';
import { StocksComponent } from './component/stocks/stocks.component';
import { NuevoUsuarioComponent } from './component/nuevo-usuario/nuevo-usuario.component';
import { NuevoPedidoComponent } from './component/nuevo-pedido/nuevo-pedido.component';
import { LoginComponent } from './component/login/login.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './component/navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    JuegosComponent,
    PedidosComponent,
    StocksComponent,
    NuevoUsuarioComponent,
    NuevoPedidoComponent,
    LoginComponent,
    NavbarComponent,
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
