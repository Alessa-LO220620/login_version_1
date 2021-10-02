"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Módulos necessários para aplicação
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const connect_flash_1 = __importDefault(require("connect-flash"));
const mongoose_1 = __importDefault(require("mongoose"));
//Importar módulos das rotas
const indexRouter_1 = __importDefault(require("./routers/indexRouter"));
// Conectar o banco de dados
mongoose_1.default.Promise = global.Promise;
const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };
const pathBD = 'mongodb+srv://alessandro_almeida:alessandro_almeida@cluster0.8r6wf.mongodb.net/soulbrasil?retryWrites=true&w=majority';
mongoose_1.default.connect(pathBD, OPTIONS, () => {
    console.log('banco conectado!');
});
//Configurar Express
const app = (0, express_1.default)();
app.set("view engine", "ejs");
app.set("views", __dirname + "\\views");
app.use(express_1.default.static(__dirname + '\\public'));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)({
    secret: 'secret123',
    saveUninitialized: true,
    resave: true
}));
app.use((0, connect_flash_1.default)());
//Rotas
app.use('/', indexRouter_1.default);
//Iniciando a porta de escuta
const PORT = 3000;
app.listen(PORT, () => {
    console.log("Servidor rodando na porta " + PORT);
});
