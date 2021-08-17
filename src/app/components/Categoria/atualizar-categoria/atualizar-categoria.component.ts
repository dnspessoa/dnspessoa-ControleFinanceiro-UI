import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Categoria } from 'src/app/models/Categoria';
import { Tipo } from 'src/app/models/Tipo';
import { CategoriasService } from 'src/app/services/categorias.service';
import { TiposService } from 'src/app/services/tipos.service';

@Component({
  selector: 'app-atualizar-categoria',
  templateUrl: './atualizar-categoria.component.html',
  styleUrls: ['./atualizar-categoria.component.css']
})
export class AtualizarCategoriaComponent implements OnInit {

  public _nomeCategoria: string | undefined;
  public _categoriaId: number = 0; 
  public _categoria : Observable<Categoria> | undefined;
  public _tipos: Tipo[] | undefined;
  public _formulario: any;

  constructor(
    private router : Router,
    private activatedRoute : ActivatedRoute,
    private tiposService: TiposService,
    private categoriasService : CategoriasService
  ) { }

  ngOnInit(): void {
    this._categoriaId = this.activatedRoute.snapshot.params.id;
    this.tiposService.PegarTodos().subscribe(res => {
      this._tipos = res;
    });

    this.categoriasService.PegarCategoriaPeloId(this._categoriaId).subscribe(res => {
      this._nomeCategoria = res.nome;

      this._formulario = new FormGroup({
        categoriaId: new FormControl(res.categoriaId),
        nome: new FormControl(res.nome),
        icone: new FormControl(res.icone),
        tipoId: new FormControl(res.tipoId),
      });
    });
  }

  get propriedade() {
    return this._formulario.controls;
  }

  EnviarFormulario() : void {
    const categoria = this._formulario.value;
    this.categoriasService
      .AtualizarCategoria(this._categoriaId, categoria)
      .subscribe((res) => {
        this.router.navigate(['categorias/listagemcategorias']);
      });
  }

  voltarListagem() :  void {
    this.router.navigate(['categorias/listagemcategorias']);
  }

}
