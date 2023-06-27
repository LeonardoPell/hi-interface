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
    elevacao?: string;
    exaltacao?: string;
    ime?: string;
    grau?: string;
    endereco_comercial?: string;
    telefone_comercial?: string;
    endereco_residencial?: string;
    telefone_residencial?: string;
    nome_pai?: string;
    nome_mae?: string;
    nome_esposa?: string;
    filhos?: string[];
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
    elevacao?: string;
    exaltacao?: string;
    ime?: string;
    grau?: string;
    endereco_comercial?: string;
    telefone_comercial?: string;
    endereco_residencial?: string;
    telefone_residencial?: string;
    nome_pai?: string;
    nome_mae?: string;
    nome_esposa?: string;
    filhos?: string[];
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
  elevacao?: string;
  exaltacao?: string;
  ime?: string;
  grau?: string;
  endereco_comercial?: string;
  telefone_comercial?: string;
  endereco_residencial?: string;
  telefone_residencial?: string;
  nome_pai?: string;
  nome_mae?: string;
  nome_esposa?: string;
  filhos?: string[];
}