import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaJuegosComponent } from './component/lista-juegos/lista-juegos.component';
import { HistoriaJuegosComponent } from './component/historia-juegos/historia-juegos.component';
import { DetalleJuegosComponent } from './component/detalle-juegos/detalle-juegos.component';
import { InicioComponent } from './component/inicio/inicio.component';
import { ResumenCompraComponent } from './component/resumen-compra/resumen-compra.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full'},
  { path: 'inicio', component: InicioComponent },
  { path: 'juegos', component: ListaJuegosComponent },
  { path: 'historia-juegos', component: HistoriaJuegosComponent },
  { path: 'resumen-compra', component: ResumenCompraComponent },
  { path: 'detalle-juegos/:id', component: DetalleJuegosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
