import { FastifyInstance } from "fastify"
import mediaRoutes from "./routes/media.routes"
export default async(app: FastifyInstance)=>{
    app.register(mediaRoutes, {prefix:'/media'})
}