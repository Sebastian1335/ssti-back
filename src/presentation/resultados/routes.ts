import { Router } from "express";
import { AuthMiddleware } from "../middleware/auth";
import { ResultadoController } from "./controller";
import { ResultadoService } from "../services/resultado.service";


export class Resultados {
    static get routes(): Router {
        const router = Router();
        const service = new ResultadoService()
        const controller = new ResultadoController(service)
        router.get('/', AuthMiddleware.validarToken, controller.getResultados)
        router.post('/crear', AuthMiddleware.validarToken, controller.postResultado)

        return router;
    }
}
