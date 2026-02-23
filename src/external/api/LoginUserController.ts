import LoginUser from '@/core/usuario/service/LoginUser'
import { Express } from 'express'
import JwtProvider from './JwtProvider'
import 'dotenv/config'

export default class LoginUserController {
   
    constructor(
        server: Express,
        useCases: LoginUser
    ) {
        server.post('/api/users/login',
            async (req, res) => {
            try {
                const user = await useCases.executar({
                    email: req.body.email,
                    senha: req.body.senha
                })

                const provider = new JwtProvider(process.env.JWT_SECRET!)

                res.status(200).send(provider.generate(user))
            } catch(error: any) {
                res.status(400).send(error.message)
            }
        })
    }
}