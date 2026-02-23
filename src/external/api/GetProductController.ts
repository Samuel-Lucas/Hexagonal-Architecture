import { Express } from 'express'
import 'dotenv/config'
import GetProduct from '@/core/product/service/GetProduct'

export default class GetProductController {
   
    constructor(
        server: Express,
        useCases: GetProduct,
        ...middlewares: any[]
    ) {
        server.get('/api/products/:id', ...middlewares, async (req, res) => {
            try {
                const product = await useCases.executar({
                    productId: (req.params as any).id,
                    user: (req as any).user
                })
                res.status(200).send(product)
            } catch(error: any) {
                res.status(400).send(error.message)
            }
        })
    }
}