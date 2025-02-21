import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { Resultados } from "./resultados/routes";


export class AppRoutes {


  static get routes(): Router {

    const router = Router();

    router.use('/api/auth', AuthRoutes.routes);
    router.use('/api/resultados', Resultados.routes)
    
    return router;
  }


}