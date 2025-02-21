import { Router } from "express";
import { AuthController } from "./controller";
import { AuthService } from "../services/auth.service";
import { AuthMiddleware } from "../middleware/auth";

export class AuthRoutes {
    static get routes(): Router {
        const router = Router();

        const authService = new AuthService();
        const authController = new AuthController(authService);
        // Definir las rutas
        router.post("/login", authController.loginUser);
        router.post("/register", authController.registerUser);
        router.get(
            "/getUsers",
            (req, res, next) => {
                req.body.requiresAdmin = true;
                next();
            },
            AuthMiddleware.validarToken,
            authController.getAllUsers
        );
        return router;
    }
}
