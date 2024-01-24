// app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './component/usuarios/usuarios.component';
import { JuegosComponent } from './component/juegos/juegos.component';
import { PedidosComponent } from './component/pedidos/pedidos.component';
import { StocksComponent } from './component/stocks/stocks.component';
import { NuevoUsuarioComponent } from './component/nuevo-usuario/nuevo-usuario.component';
import { NuevoPedidoComponent } from './component/nuevo-pedido/nuevo-pedido.component';
import { LoginComponent } from './component/login/login.component';

const routes: Routes = [
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'juegos', component: JuegosComponent },
  { path: 'pedidos', component: PedidosComponent },
  { path: 'stocks', component: StocksComponent },
  { path: 'nuevo-usuario', component: NuevoUsuarioComponent },
  { path: 'nuevo-pedido', component: NuevoPedidoComponent },
  { path: '', redirectTo: '/usuarios', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
