import RegistrarUsuario from '@/core/usuario/service/RegistrarUsuario';
import { Express } from 'express'

export default class UserController {
   
    constructor(
        server: Express,
        useCases: RegistrarUsuario
    ) {
        server.post('/api/users/register', async (req, res) => {
            try {
                await useCases.executar({
                    nome: req.body.nome,
                    email: req.body.email,
                    senha: req.body.senha
                })

                res.status(201).send()
            } catch(error: any) {
                res.status(400).send(error.message)
            }
        })
    }
}