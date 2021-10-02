import {Request, Response} from 'express'
import Usuarios from '../models/usuariosModel';

interface objTransferencia {
    agencia: string
    conta: string
    idRemetente: string
    valor: string
    token: string
}

interface Usuario {
    saldo: string
}

export class TransControle {

    static buscarUsuario(){
        console.log('Buscar usuario')
    }

    static async debitarDaConta(id: string, valorTransferencia: string){
        //Usuário que irá receber a transferência.
        let usuario: Usuario = await Usuarios.findOne({_id: id}).lean()
        let saldoAtual = usuario.saldo
        let saldoDebitar = valorTransferencia
        let valorAtualizado = (parseFloat(saldoAtual) - parseFloat(saldoDebitar)).toString()

        await Usuarios.updateOne({_id: id}, {saldo: valorAtualizado})
        console.log('Saldo Debitado com Sucesso!')
    }

    static async adicionarByAgConta(agencia: string, conta: string, valor: string){
        //Usuário que irá receber a transferência.
        let usuario: Usuario = await Usuarios.findOne({agencia: agencia, conta: conta}).lean()
        let saldoAtual = usuario.saldo
        let saldoAdicionar = valor
        let valorAtualizado = (parseFloat(saldoAtual) + parseFloat(saldoAdicionar)).toString()

        await Usuarios.updateOne({agencia: agencia, conta: conta}, {saldo: valorAtualizado})
        console.log('Saldo Adicionado com Sucesso!')
    }

    static verificarSaldoTransferencia(valorTransferir: string, valorSaldo: string): boolean{
        let saldo = parseFloat(valorSaldo)
        let valTransferir = parseFloat(valorTransferir)
        if(saldo < valTransferir) {
            return false
        }
        return true
    }

    static  async transferencia(req: Request, res: Response, objTransferencia: objTransferencia) {

        //Descompactar dados da transferência
        let idRemetente = objTransferencia.idRemetente;
        let agencia = objTransferencia.agencia
        let conta = objTransferencia.conta
        let valorTransferencia = objTransferencia.valor
        let token = objTransferencia.token

        //Passar o token para próxima rota
        req.flash('token', token)

        /// Busquei o usuário remetente pelo id
        const usuarioRemetente: Usuario  = await Usuarios.findById({_id: idRemetente}).lean()
        const status = TransControle.verificarSaldoTransferencia(valorTransferencia, usuarioRemetente.saldo)
        let usuario = await Usuarios.findById({_id: idRemetente})
        
        // Irá entrar no If somente se o saldo for suficiente
        if(status){        
            try{
                TransControle.debitarDaConta(idRemetente, valorTransferencia)
                TransControle.adicionarByAgConta(agencia, conta, valorTransferencia)
                return res.render('pages/confirmaTransferencia', { usuario: usuario })

            } catch (e) {
                return res.redirect('/erro ao transferir')
            }
            
        }
        res.render('pages/saldoInsuficiente', { usuario: usuario })        
        
    }
}

