"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Create Usuarios schema
const UsuariosSchema = new mongoose_1.Schema({
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
const Usuarios = (0, mongoose_1.model)('usuarios', UsuariosSchema);
exports.default = Usuarios;
