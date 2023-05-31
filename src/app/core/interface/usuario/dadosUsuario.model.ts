export interface DadosUsuario {
    id?: number;
    nome: string;
    email: string;
    cim: string;
    codigo_obreiro: string;
    telefone: string;
    cpf: string;
    rg: string;
    nascimento: string;
    iniciacao: string;
    criado_em: string;
    atualizado_em: string | null;
  }

export interface UsuarioCadastro{
    nome: string;
    email: string;
    cim: string;
    senha: string;
    codigo_obreiro: string;
    telefone: string;
    cpf: string;
    rg: string;
    nascimento: string;
    iniciacao: string;
    ativo: number;
}

export interface UsuarioEditado{
  nome?: string;
  email?: string;
  cim?: string;
  senha?: string;
  codigo_obreiro?: string;
  telefone?: string;
  cpf?: string;
  rg?: string;
  nascimento?: string;
  iniciacao?: string;
  ativo?: number;
}