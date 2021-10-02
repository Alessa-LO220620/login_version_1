"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = '112365498sdfsfweddfwefsfdfwedd5';
function verifyJWT(req, res, next) {
    try {
        let arrayToken = req.flash('token');
        const token = arrayToken[0];
        const data = jsonwebtoken_1.default.verify(token, SECRET);
        const { id, tipo } = data;
        if (data) {
            req.flash('tipo', tipo);
            req.flash('token', token);
            req.flash('id', id);
            next();
        }
    }
    catch (e) {
        console.log('erro: ' + e);
        res.redirect('/login');
    }
}
exports.verifyJWT = verifyJWT;
