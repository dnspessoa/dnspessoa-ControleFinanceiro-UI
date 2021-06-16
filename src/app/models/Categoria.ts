import { Tipo } from "./Tipo";

export class Categoria {

    categoriaId: number | undefined;
    nome: string | undefined;
    icone: string | undefined;
    tipoId: number | undefined;
    tipo: Tipo | undefined;
}