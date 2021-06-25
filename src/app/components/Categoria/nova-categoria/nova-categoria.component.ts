import { Component, OnInit } from '@angular/core';
import { Tipo } from 'src/app/models/Tipo';
import { TiposService } from 'src/app/services/tipos.service';
import { FormGroup, FormControl } from '@angular/forms';
import { CategoriasService } from 'src/app/services/categorias.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nova-categoria',
  templateUrl: './nova-categoria.component.html',
  styleUrls: ['./nova-categoria.component.css']
})
export class NovaCategoriaComponent implements OnInit {

  public _formulario: any;
  public _tipos: Tipo[] | undefined;

  constructor(
    private tiposServices: TiposService,
    private categoriasService: CategoriasService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.tiposServices.PegarTodos().subscribe(resultado => {
      this._tipos = resultado;
      //teste mostra o formato dos dados
      console.log(resultado);
    });

    this._formulario = new FormGroup({
      nome: new FormControl(null),
      icone: new FormControl(null),
      tipoId: new FormControl(null)
    });
  }

  get propriedade() {
    return this._formulario.controls;
  }

  EnviarFormulario(): void {
    const categoria = this._formulario.value;

    this.categoriasService.NovaCategoria(categoria).subscribe(resultado => {
      this.router.navigate(['categorias/listagemcategorias'])
    });
  }

  voltarListagem() :  void {
    this.router.navigate(['categorias/listagemcategorias']);
  }

}
