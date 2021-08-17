import { Component, OnInit } from '@angular/core';

import { CategoriasService } from 'src/app/services/categorias.service';

import { MatTableDataSource } from '@angular/material/table';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-listagem-categorias',
  templateUrl: './listagem-categorias.component.html',
  styleUrls: ['./listagem-categorias.component.css']
})
export class ListagemCategoriasComponent implements OnInit {

  public _categorias = new MatTableDataSource<any>();
  public _displayedColumns: string[] | undefined;
  public _autoCompleteInput = new FormControl();
  public _opcoesCategorias: string[] = [];
  public _nomesCategorias!: Observable<string[]>;

  constructor(
    private categoriasService: CategoriasService,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    // this.categoriasService.PegarTodos().subscribe(resultado => {
    //   this._categorias.data = resultado;
    // });
    this.categoriasService.PegarTodos().subscribe((res) => {
      res.forEach((cat) => {
        this._opcoesCategorias.push(cat.nome!);
      })
    });

    this._displayedColumns = this.ExibirColunas();

    this._nomesCategorias = this._autoCompleteInput.valueChanges
      .pipe(startWith(''), map(nome => this.FiltrarNomes(nome)));
  }

  ExibirColunas(): string[] | undefined {
    return ['nome', 'icone', 'tipo', 'acoes'];
  }

  AbrirDialog(categoriaId: number, nome: string): void {
    this.matDialog.open(DialogExclusaoCategoriasComponent, {
      data: {
        categoriaId: categoriaId,
        nome: nome
      }
    })
    .afterClosed().subscribe(res => {
      if (res === true){
        this.categoriasService.PegarTodos()
        .subscribe(dados => {
          this._categorias.data = dados;
        });

        this._displayedColumns = this.ExibirColunas();
      }
    });
  }
 
  FiltrarNomes(nome: string): string[]{
    if (nome.trim().length >= 4) {
      this.categoriasService.FiltrarCategorias(nome.toLowerCase()).subscribe(res => {
        this._categorias.data = res;
      });
    }
    else{
      if (nome == '') {
        this.categoriasService.PegarTodos().subscribe(res => {
          this._categorias.data = res;
        });
      }
    }
    return this._opcoesCategorias.filter(cat => 
      cat.toLowerCase().includes(nome.toLowerCase())
    );
  }
}

@Component({
  selector: 'app-dialog-exclusao-categorias',
  templateUrl: 'dialog-exclusao-categorias.html'
})
export class DialogExclusaoCategoriasComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public dados: any,
    private categoriasService: CategoriasService
    //, private snackBar : MatSnackBar
  ) {}

  ExcluirCategoria(categoriaId: number): void {
    this.categoriasService
      .ExcluirCategoria(categoriaId)
      .subscribe((resultado) => {
        // this.snackBar.open(resultado.mensagem, null, {
        //   duration: 2000,
        //   horizontalPosition: 'right',
        //   verticalPosition: 'top'
        // });
      })
  }
}
