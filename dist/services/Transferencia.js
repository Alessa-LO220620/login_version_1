"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransControle = void 0;
const usuariosModel_1 = __importDefault(require("../models/usuariosModel"));
class TransControle {
    static buscarUsuario() {
        console.log('Buscar usuario');
    }
    static debitarDaConta(id, valorTransferencia) {
        return __awaiter(this, void 0, void 0, function* () {
            //Usuário que irá receber a transferência.
            let usuario = yield usuariosModel_1.default.findOne({ _id: id }).lean();
            let saldoAtual = usuario.saldo;
            let saldoDebitar = valorTransferencia;
            let valorAtualizado = (parseFloat(saldoAtual) - parseFloat(saldoDebitar)).toString();
            yield usuariosModel_1.default.updateOne({ _id: id }, { saldo: valorAtualizado });
            console.log('Saldo Debitado com Sucesso!');
        });
    }
    static adicionarByAgConta(agencia, conta, valor) {
        return __awaiter(this, void 0, void 0, function* () {
            //Usuário que irá receber a transferência.
            let usuario = yield usuariosModel_1.default.findOne({ agencia: agencia, conta: conta }).lean();
            let saldoAtual = usuario.saldo;
            let saldoAdicionar = valor;
            let valorAtualizado = (parseFloat(saldoAtual) + parseFloat(saldoAdicionar)).toString();
            yield usuariosModel_1.default.updateOne({ agencia: agencia, conta: conta }, { saldo: valorAtualizado });
            console.log('Saldo Adicionado com Sucesso!');
        });
    }
    static verificarSaldoTransferencia(valorTransferir, valorSaldo) {
        let saldo = parseFloat(valorSaldo);
        let valTransferir = parseFloat(valorTransferir);
        if (saldo < valTransferir) {
            return false;
        }
        return true;
    }
    static transferencia(req, res, objTransferencia) {
        return __awaiter(this, void 0, void 0, function* () {
            //Descompactar dados da transferência
            let idRemetente = objTransferencia.idRemetente;
            let agencia = objTransferencia.agencia;
            let conta = objTransferencia.conta;
            let valorTransferencia = objTransferencia.valor;
            let token = objTransferencia.token;
            //Passar o token para próxima rota
            req.flash('token', token);
            /// Busquei o usuário remetente pelo id
            const usuarioRemetente = yield usuariosModel_1.default.findById({ _id: idRemetente }).lean();
            const status = TransControle.verificarSaldoTransferencia(valorTransferencia, usuarioRemetente.saldo);
            let usuario = yield usuariosModel_1.default.findById({ _id: idRemetente });
            // Irá entrar no If somente se o saldo for suficiente
            if (status) {
                try {
                    TransControle.debitarDaConta(idRemetente, valorTransferencia);
                    TransControle.adicionarByAgConta(agencia, conta, valorTransferencia);
                    return res.render('pages/confirmaTransferencia', { usuario: usuario });
                }
                catch (e) {
                    return res.redirect('/erro ao transferir');
                }
            }
            res.render('pages/saldoInsuficiente', { usuario: usuario });
        });
    }
}
exports.TransControle = TransControle;
