import dotenv from 'dotenv'
import express from 'express'
import RegistrarUsuario from './core/usuario/service/RegistrarUsuario'
import SenhaCripto from './external/auth/SenhaCripto'
import RepositorioUsuarioPg from './external/db/RepositorioUsuarioPg'
import UserController from './external/api/UserController'
import LoginUser from './core/usuario/service/LoginUser'
import LoginUserController from './external/api/LoginUserController'
import GetProduct from './core/product/service/GetProduct'
import GetProductController from './external/api/GetProductController'
import UserMiddleware from './external/api/UserMiddleware'

dotenv.config()

const app = express()
const port = process.env.API_PORT ?? 4000

app.use(express.json())
app.use(express.urlencoded({ extended: true}))


app.listen(port, () => {
    console.log(`🔥 Servidor executando na porta: ${port}`)
})

//---------------------------------------------------- open routes
const repositorioUsuario = new RepositorioUsuarioPg()
const provedorCripto = new SenhaCripto()

const registerUser = new RegistrarUsuario(repositorioUsuario, provedorCripto)
const loginUser = new LoginUser(repositorioUsuario, provedorCripto)

new UserController(app, registerUser)
new LoginUserController(app, loginUser)

//----------------------------------------------------- protected routes
const userMiddleware = UserMiddleware(repositorioUsuario)

const userRepository = new GetProduct()
new GetProductController(app, userRepository, userMiddleware)