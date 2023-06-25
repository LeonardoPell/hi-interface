export interface OrientacaoRitualistica{
    id?: number;
    descricao_arquivo: string;
    url_arquivo: string;
    ativo?: boolean;
}

export interface OrientacaoRitualisticaEdit{
    id?: number;
    descricao_arquivo?: string;
    url_arquivo?: string;
    ativo?: boolean;
}