import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListagemCategoriasComponent } from './components/Categoria/listagem-categorias/listagem-categorias.component';
import { NovaCategoriaComponent } from './components/Categoria/nova-categoria/nova-categoria.component';
import { AtualizarCategoriaComponent } from './components/Categoria/atualizar-categoria/atualizar-categoria.component';

const routes: Routes = [
  {
    // path: 'categorias/listagemcategorias', loadChildren: () => import('./components/Categoria/listagem-categorias/listagem-categorias.component').then(m => m.ListagemCategoriasComponent)
    path: 'categorias/listagemcategorias', component: ListagemCategoriasComponent
  },
  {
    path: 'categorias/novacategoria', component: NovaCategoriaComponent
  },
  {
    path: 'categorias/AtualizarCategoria/:id', component: AtualizarCategoriaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
