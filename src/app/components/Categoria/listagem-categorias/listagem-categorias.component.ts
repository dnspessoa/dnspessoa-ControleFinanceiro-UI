import { Component, OnInit } from '@angular/core';

import { CategoriasService } from 'src/app/services/categorias.service';

import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-listagem-categorias',
  templateUrl: './listagem-categorias.component.html',
  styleUrls: ['./listagem-categorias.component.css']
})
export class ListagemCategoriasComponent implements OnInit {

  public _categorias = new MatTableDataSource<any>();
  public _displayedColumns: string[] | undefined;

  constructor(
    private categoriasService: CategoriasService
  ) { }

  ngOnInit(): void {
    this.categoriasService.PegarTodos().subscribe(resultado => {
      this._categorias.data = resultado;
    });

    this._displayedColumns = ExibirColunas();
  }
  
}

function ExibirColunas(): string[] | undefined {
  return ['nome', 'icone', 'tipo', 'acoes'];
}

