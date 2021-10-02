"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Transferencia_1 = require("./Transferencia");
class Usuarios {
    constructor(_nomeCompleto, _cpf, _email, _senha, _agencia, _conta, _saldo, _status, _cep, _numeroCasa, _complemento, _telefone) {
        this._nomeCompleto = _nomeCompleto;
        this._cpf = _cpf;
        this._email = _email;
        this._senha = _senha;
        this._agencia = _agencia;
        this._conta = _conta;
        this._saldo = _saldo;
        this._status = _status;
        this._cep = _cep;
        this._numeroCasa = _numeroCasa;
        this._complemento = _complemento;
        this._telefone = _telefone;
    }
    //Getters e Setters
    get nome() {
        return this._nomeCompleto;
    }
    get cpf() {
        return this._cpf;
    }
    get email() {
        return this._email;
    }
    get senha() {
        return this._senha;
    }
    get telefone() {
        return this._telefone;
    }
    get complemento() {
        return this._complemento;
    }
    get numeroCasa() {
        return this._numeroCasa;
    }
    get cep() {
        return this._cep;
    }
    get status() {
        return this._status;
    }
    get saldo() {
        return this._saldo;
    }
    get conta() {
        return this._conta;
    }
    get agencia() {
        return this._agencia;
    }
    //Métodos
    deposita(valor) {
        let valorDeposito = parseFloat(valor);
        if (valorDeposito <= 0) {
            return;
        }
        let valorSaldo = parseFloat(this.saldo);
        this._saldo = (valorSaldo + valorDeposito).toString();
    }
    saca(valor) {
        let valorSaque = parseFloat(valor);
        let valorSaldo = parseFloat(this.saldo);
        if (valorSaldo <= valorSaque) {
            console.log('Você não tem saldo suficiente! Gostaria de fazer um emprestimo? Entre em contato');
            return;
        }
        this._saldo = (valorSaldo - valorSaque).toString();
    }
    transfere() {
        Transferencia_1.TransferenciaControle.buscarUsuario();
    }
}
let usuario = new Usuarios('soul', '123', 'eu@eu.com', '123', 'ag1234', 'conta001', '1000000', true, '123', '123456789', 'casa', '999999999');
let usuario2 = new Usuarios('soul', '123', 'eu@eu.com', '123', 'ag1234', 'conta001', '1000000', true, '123', '123456789', 'casa', '999999999');
// usuario.deposita('-300');
usuario.saca('2000000');
console.log(usuario.transfere());
