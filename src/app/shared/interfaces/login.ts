export interface Login {
  userName: string,
  pass: string
}


export interface UsuarioLogado
{
  user: string,
  valid: boolean,
  token: string
}
