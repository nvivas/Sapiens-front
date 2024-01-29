import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaJuegosComponent } from './component/lista-juegos/lista-juegos.component';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  { path: 'juegos', component: ListaJuegosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
