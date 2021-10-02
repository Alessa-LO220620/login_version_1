import { Schema, model } from 'mongoose';

// Create Usuarios schema
const UsuariosSchema = new Schema({
    nomeCompleto: String,
    cpf: String,
    email: String,
    senha: String,
    agencia: String,
    conta: String,
    saldo: String,
    status: Boolean,
    cep: String,
    numeroCasa: String,
    complemento: String,
    telefone: String,
    tipoUsuario: String

});

// Create Usuarios model
const Usuarios = model('usuarios', UsuariosSchema);

export default Usuarios;

