import Usuarios from '../models/usuariosModel';

interface Usuario {
    nomeCompleto: string
    agencia: string
    conta: string
    saldo: string
}

export class Consulta {


    static async buscarUsuarioById(id: string){
        const usuario: Usuario = await Usuarios.findOne({_id: id}).lean()
        return usuario
    }

}
