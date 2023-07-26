export interface FinanceiroSaida{
    id?: number;
    descricao: string;
    valor: number;
    tipo: number;
    data_pagamento?: string;
    ano_mes_pagamento?: string;
    ativo: boolean;
}

export interface SaidaServiceCreate{
    id?: number;
    descricao: string;
    valor: number;
    tipo: number;
    data_pagamento?: string;
    ano_mes_pagamento?: string;
    ativo: boolean;
}

export interface SaidaServiceEdit{
    id?: number;
    descricao: string;
    valor: number;
    tipo: number;
    data_pagamento?: string;
    ano_mes_pagamento?: string;
    ativo: boolean;
}