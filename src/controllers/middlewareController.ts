import jwt from 'jsonwebtoken'
import {Request, Response, NextFunction} from 'express'

const SECRET = '112365498sdfsfweddfwefsfdfwedd5'

interface TokenDecoded {
    id: string;
    tipo: string
    iat: number;
    exp: number;
}

export function verifyJWT (req: Request, res: Response, next: NextFunction) {
    
    try {
        let arrayToken = req.flash('token')
        const token = arrayToken[0]
        const data  = jwt.verify(token, SECRET)
        const {id, tipo} = data as TokenDecoded
        if(data){
            req.flash('tipo', tipo)
            req.flash('token', token)
            req.flash('id', id)
            next()
        }
        
    } catch (e){
        console.log('erro: ' + e)
        res.redirect('/login')
    }
    

    
}