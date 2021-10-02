import * as express from "express";
import * as indexController from '../controllers/indexController';
import * as verifica from "../controllers/middlewareController";
const router = express.Router();


router.get('/', indexController.indexGet)

router.get('/admin', indexController.adminGet)

router.get('/minhaConta', verifica.verifyJWT, indexController.minhaContaGet)

router.get('/cadastro' , verifica.verifyJWT, indexController.cadastroGet)

router.post('/cadastro', verifica.verifyJWT, indexController.cadastroPost)

router.get('/listaClientes', verifica.verifyJWT, indexController.listaClientesGet)

router.get('/login', indexController.loginGet)

router.post('/login', indexController.loginPost)

router.get('/transferencia', verifica.verifyJWT, indexController.transferenciaGet)

router.post('/transferencia', verifica.verifyJWT, indexController.transferenciaPost)




export default router

