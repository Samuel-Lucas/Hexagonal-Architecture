import dotenv from 'dotenv'
import express from 'express'
import RegistrarUsuario from './core/usuario/service/RegistrarUsuario'
import SenhaCripto from './external/auth/SenhaCripto'
import RepositorioUsuarioPg from './external/db/RepositorioUsuarioPg'
import UserController from './external/api/UserController'

dotenv.config()

const app = express()
const port = process.env.API_PORT ?? 4000

app.use(express.json())
app.use(express.urlencoded({ extended: true}))


app.listen(port, () => {
    console.log(`🔥 Servidor executando na porta: ${port}`)
})

// ---------------------------------------------------- open routes
const repositorioUsuario = new RepositorioUsuarioPg()
const proverdorCripto = new SenhaCripto()
const registerUser = new RegistrarUsuario(repositorioUsuario, proverdorCripto)

new UserController(app, registerUser);