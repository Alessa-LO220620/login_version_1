import {Request} from 'express'
import { Iusuarios } from "../models/usuariosInterface";

interface Itoken {
    token: string
    tipo: string
    id: string
}

export function verificarLogin(emailEntrada: string , senhaEntrada: string, user: Iusuarios) {
    var status = []
    var senhaUser = ''
    var emailUser = ''
    var emailEntrada = emailEntrada
    var senhaEntrada = senhaEntrada
    if(user == null) {
        senhaUser = 'undefined'
        emailUser = 'undefined'
        senhaEntrada = ''
        emailEntrada = ''
    } else {
        senhaUser = user.senha
        emailUser = user.email
    }

    if(emailEntrada == emailUser){
        status.push(true)
    } else status.push(false)
    if(senhaEntrada == senhaUser) {
        status.push(true)
    } else status.push(false)

    if(status[0] && status[1]){
        return true
    } else return false
}

export function recebeToken(req: Request): Itoken {
    let arrayToken = req.flash('token')
    let arrayTipo = req.flash('tipo')
    let arrayId = req.flash('id')
    const token = arrayToken[0]
    const tipo = arrayTipo[0]
    const id = arrayId[0]
    return {token: token, tipo: tipo, id: id}
}
