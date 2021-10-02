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
exports.transferenciaPost = exports.transferenciaGet = exports.loginPost = exports.loginGet = exports.listaClientesGet = exports.cadastroPost = exports.cadastroGet = exports.adminGet = exports.indexGet = exports.minhaContaGet = void 0;
const usuariosModel_1 = __importDefault(require("../models/usuariosModel"));
const Transferencia_1 = require("../services/Transferencia");
const Validacao_1 = require("../services/Validacao");
const Validacao_2 = require("../services/Validacao");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Consulta_1 = require("../services/Consulta");
const SECRET = '112365498sdfsfweddfwefsfdfwedd5';
function minhaContaGet(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const objToken = (0, Validacao_2.recebeToken)(req);
        const usuario = yield Consulta_1.Consulta.buscarUsuarioById(objToken.id);
        req.flash('token', `${objToken.token}`);
        res.render('pages/minhaConta', { usuario: usuario });
    });
}
exports.minhaContaGet = minhaContaGet;
function indexGet(req, res) {
    return res.redirect('/login');
}
exports.indexGet = indexGet;
function adminGet(req, res) {
    return res.send('/Admin');
}
exports.adminGet = adminGet;
function cadastroGet(req, res) {
    const objToken = (0, Validacao_2.recebeToken)(req);
    if (objToken.tipo == 'admin') {
        req.flash('token', `${objToken.token}`);
        return res.render('pages/cadastro');
    }
    res.send('Acesso negado!');
}
exports.cadastroGet = cadastroGet;
function cadastroPost(req, res) {
    const objToken = (0, Validacao_2.recebeToken)(req);
    //Implementar Orientação
    if (objToken.tipo == 'admin') {
        let usuarioTemp = req.body;
        usuarioTemp.tipoUsuario = 'cliente';
        let usuario = new usuariosModel_1.default(usuarioTemp);
        usuario.save();
        req.flash('token', `${objToken.token}`);
        res.redirect('/cadastro');
    }
    res.send('Usuário não autorizado a enviar formulário');
}
exports.cadastroPost = cadastroPost;
function listaClientesGet(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const objToken = (0, Validacao_2.recebeToken)(req);
        if (objToken.tipo == 'admin') {
            const clientes = yield usuariosModel_1.default.find({ status: true });
            req.flash('token', `${objToken.token}`);
            res.render('pages/listaClientes', { lista_clientes: clientes });
        }
        res.send('Acesso Negado!');
    });
}
exports.listaClientesGet = listaClientesGet;
function loginGet(req, res) {
    req.flash('token', '');
    res.render('pages/login', { msg: '' });
}
exports.loginGet = loginGet;
function loginPost(req, res) {
    let emailEntrada = req.body.email;
    let senhaEntrada = req.body.senha;
    let status = false;
    usuariosModel_1.default.findOne({ email: emailEntrada }, (err, user) => {
        if (err) {
            console.log(err);
        }
        status = (0, Validacao_1.verificarLogin)(emailEntrada, senhaEntrada, user);
        console.log('Status Usuario: ' + status);
        if (status) {
            const token = jsonwebtoken_1.default.sign({ tipo: user.tipoUsuario, id: user._id }, SECRET, { expiresIn: 600 });
            req.flash('token', `${token}`);
            if (user.tipoUsuario == 'admin')
                return res.redirect('/listaClientes');
            if (user.tipoUsuario == 'cliente')
                return res.redirect('/minhaConta');
        }
        return res.render('pages/login', { msg: 'Usuário ou senha inválida' });
    });
}
exports.loginPost = loginPost;
function transferenciaGet(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const objToken = (0, Validacao_2.recebeToken)(req);
        const usuario = yield Consulta_1.Consulta.buscarUsuarioById(objToken.id);
        if (objToken.tipo == 'cliente') {
            req.flash('token', objToken.token);
            console.log(`Rota de transferencia Get - usuário: ${usuario.nomeCompleto}`);
            return res.render('pages/transferencia', { usuario: usuario });
        }
        res.redirect('/login');
    });
}
exports.transferenciaGet = transferenciaGet;
function transferenciaPost(req, res) {
    const objToken = (0, Validacao_2.recebeToken)(req);
    if (objToken.tipo != 'cliente') {
        return res.redirect('/login');
    }
    //Objeto criado para transferência
    let objTransferencia = { agencia: '', conta: '', idRemetente: '', valor: '', token: '' };
    //Atribuir os valores dos atributos do objeto vindo da requisição
    objTransferencia.agencia = req.body.agencia;
    objTransferencia.conta = req.body.conta;
    objTransferencia.valor = req.body.valor;
    objTransferencia.idRemetente = objToken.id;
    objTransferencia.token = objToken.token;
    Transferencia_1.TransControle.transferencia(req, res, objTransferencia);
}
exports.transferenciaPost = transferenciaPost;
