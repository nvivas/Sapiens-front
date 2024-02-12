import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaJuegosComponent } from './component/lista-juegos/lista-juegos.component';
import { HistoriaJuegosComponent } from './component/historia-juegos/historia-juegos.component';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  { path: 'juegos', component: ListaJuegosComponent },
  { path: 'historia-juegos', component: HistoriaJuegosComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
