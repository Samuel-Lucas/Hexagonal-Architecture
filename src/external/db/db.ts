import 'dotenv/config'
import pgPromise from "pg-promise"

const pgp = pgPromise()

console.log("Conectando com o usuário:", process.env.DB_USER)

const db = pgp({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: String(process.env.DB_PASSWORD),
})

export default db