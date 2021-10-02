import { Request, Response } from 'express';
import Usuarios from '../models/usuariosModel';
import { TransControle } from '../services/Transferencia';
import { Iusuarios } from '../models/usuariosInterface';
import { verificarLogin } from '../services/Validacao';
import { recebeToken } from '../services/Validacao';
import jwt from 'jsonwebtoken';
import { Consulta } from '../services/Consulta';

const SECRET = '112365498sdfsfweddfwefsfdfwedd5'


export  async function minhaContaGet(req: Request, res: Response) {
    
    const objToken = recebeToken(req)
    const usuario = await Consulta.buscarUsuarioById(objToken.id)
    req.flash('token', `${objToken.token}`)
    res.render('pages/minhaConta', { usuario: usuario })
    
}

export function indexGet(req: Request, res: Response) {
        return res.redirect('/login')
}

export function adminGet(req: Request, res: Response) {
    return res.send('/Admin')
}

export  function cadastroGet(req: Request, res: Response) {
    const objToken = recebeToken(req)
    if(objToken.tipo == 'admin'){
        req.flash('token', `${objToken.token}`)
        return res.render('pages/cadastro')
    }
       
    res.send('Acesso negado!')
}

export function cadastroPost(req: Request, res: Response) {
    const objToken = recebeToken(req)  
    //Implementar Orientação
    if(objToken.tipo == 'admin'){
        let usuarioTemp = req.body
        usuarioTemp.tipoUsuario = 'cliente'
        let usuario = new Usuarios(usuarioTemp)
        usuario.save()
        req.flash('token', `${objToken.token}`)
        res.redirect('/cadastro')
    }

    res.send('Usuário não autorizado a enviar formulário')
    
}

export async function listaClientesGet(req: Request, res: Response) {
    const objToken = recebeToken(req)
    if(objToken.tipo == 'admin'){

        const clientes = await Usuarios.find({status: true})

        req.flash('token', `${objToken.token}`)
        res.render('pages/listaClientes', {lista_clientes: clientes})
    }
    
    res.send('Acesso Negado!')
}

export function loginGet(req: Request, res: Response) {
    req.flash('token', '')
    res.render('pages/login', { msg: '' })
}

export function loginPost(req: Request, res: Response) {
    let emailEntrada = req.body.email
    let senhaEntrada = req.body.senha
    let status = false
    Usuarios.findOne({ email: emailEntrada }, (err: Error, user: Iusuarios) => {
        if (err) {
            console.log(err)
        }
        status = verificarLogin(emailEntrada, senhaEntrada, user)
        console.log('Status Usuario: ' + status)
        if (status) {
            const token = jwt.sign({ tipo: user.tipoUsuario, id: user._id }, SECRET, { expiresIn: 600 })
            req.flash('token', `${token}`)
            if (user.tipoUsuario == 'admin')
                return res.redirect('/listaClientes')

            if (user.tipoUsuario == 'cliente')
                return res.redirect('/minhaConta')
        }
        return res.render('pages/login', { msg: 'Usuário ou senha inválida' })
    })
}

export async function transferenciaGet(req: Request, res: Response) {
    const objToken = recebeToken(req)
    const usuario = await Consulta.buscarUsuarioById(objToken.id)
    if (objToken.tipo == 'cliente') {

        req.flash('token', objToken.token)
        console.log(`Rota de transferencia Get - usuário: ${usuario.nomeCompleto}`)
        return res.render('pages/transferencia', { usuario: usuario })
    }

    res.redirect('/login')

}

export function transferenciaPost(req: Request, res: Response) {
    const objToken = recebeToken(req)
    if (objToken.tipo != 'cliente') {
        return res.redirect('/login')
    }

    //Objeto criado para transferência
    let objTransferencia = { agencia: '', conta: '', idRemetente: '', valor: '', token: '' }
    //Atribuir os valores dos atributos do objeto vindo da requisição
    objTransferencia.agencia = req.body.agencia
    objTransferencia.conta = req.body.conta;
    objTransferencia.valor = req.body.valor
    objTransferencia.idRemetente = objToken.id
    objTransferencia.token = objToken.token

    TransControle.transferencia(req, res, objTransferencia)
}

