export interface Evento{
    id?: number;
    titulo: string;
    descricao: string;
    data?: string;
    hora?: string;
    data_hora_reuniao?: string;
    reuniao_aconteceu?: boolean
}