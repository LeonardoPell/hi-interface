import { PastaFotos } from "./pasta.model";

export interface Foto {
    id?: number;
    descricao_foto: string;
    url_arquivo: string;
    pasta: number;
    ativo?: boolean;
    pastaModel?: PastaFotos;
}

export interface EditaFoto {
    id?: number;
    descricao_foto?: string;
    url_arquivo?: string;
    pasta?: number;
    ativo?: boolean;
    pastaModel?: PastaFotos;
}