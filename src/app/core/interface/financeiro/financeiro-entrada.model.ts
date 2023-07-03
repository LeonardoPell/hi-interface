export interface FinanceiroEntrada{
    id?: number;
    descricao: string;
    valor: number;
    tipo: number;
    data_pagamento?: string;
    ano_mes_pagamento?: string;
    ativo: boolean;
}

export interface EntradaServiceCreate{
    id?: number;
    descricao: string;
    valor: number;
    tipo: number;
    data_pagamento?: string;
    ano_mes_pagamento?: string;
    ativo: boolean;
}

export interface EntradaServiceEdit{
    id?: number;
    descricao: string;
    valor: number;
    tipo: number;
    data_pagamento?: string;
    ano_mes_pagamento?: string;
    ativo: boolean;
}