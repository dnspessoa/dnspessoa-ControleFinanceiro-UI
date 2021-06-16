import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListagemCategoriasComponent } from './components/Categoria/listagem-categorias/listagem-categorias.component';

const routes: Routes = [
  {
    // path: 'categorias/listagemcategorias', loadChildren: () => import('./components/Categoria/listagem-categorias/listagem-categorias.component').then(m => m.ListagemCategoriasComponent)
    path: 'categorias/listagemcategorias', component: ListagemCategoriasComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
