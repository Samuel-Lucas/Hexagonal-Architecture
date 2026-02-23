import CasoDeUso from "@/core/shared/CasoDeUso"
import Product from "../model/Product"
import Usuario from "@/core/usuario/model/Usuario"

export type Entry = {
    productId: string,
    user: Usuario
}

export default class GetProduct implements CasoDeUso<Entry, Product> {

    async executar(entry: Entry): Promise<Product> {

        return {
            id: entry.productId,
            name: "Product 1",
            price: 10.00,
            consultedBy: entry.user.email
        }
    }
}