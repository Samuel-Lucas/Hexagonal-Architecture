import LoginUser from '@/core/usuario/service/LoginUser';
import { Express } from 'express'

export default class LoginUserController {
   
    constructor(
        server: Express,
        useCases: LoginUser
    ) {
        server.post('/api/users/login', async (req, res) => {
            try {
                const response = await useCases.executar({
                    email: req.body.email,
                    senha: req.body.senha
                })

                res.status(200).send(response)
            } catch(error: any) {
                res.status(400).send(error.message)
            }
        })
    }
}