import {Request, Response, NextFunction} from 'express'
import JwtProvider from './JwtProvider'
import 'dotenv/config'
import Usuario from '@/core/usuario/model/Usuario'
import RepositorioUsuario from '@/core/usuario/service/RepositorioUsuario'

export default function UserMiddleware(repository: RepositorioUsuario) {

    return async (req: Request, res: Response, next: NextFunction) => {
        const deniedAccess = () => res.status(403).send('Token inválido')

        const token = req.headers.authorization?.replace('Bearer ', '')

        if (!token) {
            deniedAccess()
            return
        }

        const jwtProvider = new JwtProvider(process.env.JWT_SECRET!)

        const userToken = jwtProvider.obtain(token) as Usuario
        const user = await repository.buscarPorEmail(userToken.email)

        if (!user) {
            deniedAccess()
            return
        }

        (req as any).user = user
        next()
    }
}