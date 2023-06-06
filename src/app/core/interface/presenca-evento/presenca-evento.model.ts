export interface PresencaEvento{
    id?: number;
    id_reuniao: number;
    usuarios_presentes: number[];
    criado_em?: string;
    atualizado_em?: string;
}