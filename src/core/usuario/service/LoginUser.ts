import CasoDeUso from "@/core/shared/CasoDeUso";
import Usuario from "../model/Usuario";
import RepositorioUsuario from "./RepositorioUsuario";
import { error } from "console";
import Erros from "@/core/shared/Erros";
import ProvedorCriptografia from "./ProvedorCriptografia";

export type Entry = { 
    email: string; 
    senha: string
}

export type Output = { 
    user: Usuario; 
    token: string
}

export default class LoginUser implements CasoDeUso<Entry, Output> {
    
    constructor(
        private repository: RepositorioUsuario,
        private criptoProvider: ProvedorCriptografia,
    ) {}

    async executar(entry: Entry): Promise<Output> {
        
        const existingUser = await this.repository.buscarPorEmail(entry.email)

        if (!existingUser) throw new Error(Erros.USUARIO_NAO_EXISTE)

        const samePassword = await this.criptoProvider.comparar(entry.senha, existingUser.senha!)

        if (!samePassword) throw new Error(Erros.SENHA_INCORRETA)

        return {
            user: { ...existingUser, senha: undefined},
            token: 'token'
        }
    }
}