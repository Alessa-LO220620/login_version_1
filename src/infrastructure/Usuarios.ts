import { TransControle } from "../services/Transferencia"

class Usuarios {

    constructor(
        private _nomeCompleto: string,
        private _cpf: string,
        private _email: string,
        private _senha: string,
        private _agencia: string,
        private _conta: string,
        private _saldo: string,
        private _status: boolean,
        private _cep: string,
        private _numeroCasa: string,
        private _complemento: string,
        private _telefone: string
    ) { }

    //Getters e Setters
    public get nome(): string {
        return this._nomeCompleto
    }

    public get cpf(): string {
        return this._cpf
    }

    public get email(): string {
        return this._email
    }

    public get senha(): string {
        return this._senha
    }

    public get telefone(): string {
        return this._telefone
    }
    public get complemento(): string {
        return this._complemento
    }
    public get numeroCasa(): string {
        return this._numeroCasa
    }
    public get cep(): string {
        return this._cep
    }
    public get status(): boolean {
        return this._status
    }
    public get saldo(): string {
        return this._saldo
    }
    public get conta(): string {
        return this._conta
    }
    public get agencia(): string {
        return this._agencia
    }

    //Métodos

    deposita(valor: string): void {
        let valorDeposito = parseFloat(valor)
        if (valorDeposito <= 0) {
            return
        }
        let valorSaldo = parseFloat(this.saldo)
        this._saldo = (valorSaldo + valorDeposito).toString()
    }

    saca(valor: string): void {
        let valorSaque = parseFloat(valor)
        let valorSaldo = parseFloat(this.saldo)
        if (valorSaldo <= valorSaque) {
            console.log('Você não tem saldo suficiente! Gostaria de fazer um emprestimo? Entre em contato')
            return
        }
        this._saldo = (valorSaldo - valorSaque).toString()

    }

    transfere() {
        TransControle.buscarUsuario();
    }

}



