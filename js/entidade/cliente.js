export default class Cliente {
  constructor(nome, email, cpf, cep, numeroCasa, celular, senha) {
    this.nome = nome;
    this.cpf = cpf;
    this.email = email;
    this.cep = cep;
    this.numeroCasa = numeroCasa;
    this.celular = celular;
    this.senha = senha;
  }

  toJSON() {
    return {
      nome: this.nome,
      cpf: this.cpf,
      email: this.email,
      cep: this.cep,
      numeroCasa: this.numeroCasa,
      celular: this.celular,
      senha: this.senha
    };
  }

  static fromJSON(json) {
    return new Cliente(json.nome, json.email,json.cpf, json.cep, json.numeroCasa, json.celular, json.senha);
  }
}
