export interface DadosUsuario {
    id?: number;
    nome: string;
    email: string;
    cim: string;
    telefone: string;
    cpf: string;
    rg: string;
    nascimento: string;
    iniciacao: string;
    criado_em: string;
    atualizado_em: string | null;
    ativo?: boolean;
    nivel_obreiro?: number;
  }

export interface UsuarioCadastro{
    nome: string;
    email: string;
    cim: string;
    senha: string;
    telefone: string;
    cpf: string;
    rg: string;
    nascimento: string;
    iniciacao: string;
    ativo: boolean;
    nivel_obreiro?: number;
}

export interface UsuarioEditado{
  nome?: string;
  email?: string;
  cim?: string;
  senha?: string;
  telefone?: string;
  cpf?: string;
  rg?: string;
  nascimento?: string;
  iniciacao?: string;
  ativo?: boolean;
  nivel_obreiro?: number;
}