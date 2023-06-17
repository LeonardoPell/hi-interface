export interface Evento{
    id?: number;
    titulo: string;
    descricao: string;
    data?: string;
    hora?: string;
    data_hora_reuniao?: string;
    reuniao_aconteceu?: boolean
}

export interface DadosRelatorioEvento {
    qtdReunioesTotal: number,
    dadosUsuarios: DadosUsuarioRelatorioEvento[],
}

export interface DadosUsuarioRelatorioEvento{
    id: number,
    nome: string,
    cor: string,
    porcentagem: number,
    quantidadeReunioes: number,
}