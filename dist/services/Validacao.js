"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recebeToken = exports.verificarLogin = void 0;
function verificarLogin(emailEntrada, senhaEntrada, user) {
    var status = [];
    var senhaUser = '';
    var emailUser = '';
    var emailEntrada = emailEntrada;
    var senhaEntrada = senhaEntrada;
    if (user == null) {
        senhaUser = 'undefined';
        emailUser = 'undefined';
        senhaEntrada = '';
        emailEntrada = '';
    }
    else {
        senhaUser = user.senha;
        emailUser = user.email;
    }
    if (emailEntrada == emailUser) {
        status.push(true);
    }
    else
        status.push(false);
    if (senhaEntrada == senhaUser) {
        status.push(true);
    }
    else
        status.push(false);
    if (status[0] && status[1]) {
        return true;
    }
    else
        return false;
}
exports.verificarLogin = verificarLogin;
function recebeToken(req) {
    let arrayToken = req.flash('token');
    let arrayTipo = req.flash('tipo');
    let arrayId = req.flash('id');
    const token = arrayToken[0];
    const tipo = arrayTipo[0];
    const id = arrayId[0];
    return { token: token, tipo: tipo, id: id };
}
exports.recebeToken = recebeToken;
