import { Request, Response } from "express"
import { CustomError, RegisterUserDto } from "../../domain"
import { AuthService } from "../services/auth.service"
import { LoginUserDto } from "../../domain/dto/auth/login-user.dto"

export class AuthController {
    constructor(
        public readonly authService:AuthService
    ) {}

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError){
            return res.status(error.statusCode).json({error: error.message})
        }
        console.log(`${error}`)
        return res.status(500).json({error: 'Internal Server Error'})
    }
    
    registerUser = (req: Request, res: Response) => {
        const [error, registerDto] = RegisterUserDto.create(req.body)
        if (error) return res.status(400).json({error})
        
        this.authService.registro(registerDto!)
            .then((user) => res.json(user))
            .catch(error => this.handleError(error, res))
    }

    loginUser = (req: Request, res: Response) => {
        const [error, loginDto] = LoginUserDto.create(req.body)
        if(error) return res.status(400).json({error})
        
        this.authService.loginUser(loginDto!)
            .then((user) => res.json(user))
            .catch(error => this.handleError(error, res))
    }

    getAllUsers = (req: Request, res: Response) => {
        this.authService.getUsers()
            .then((users) => res.json(users))
            .catch(error => this.handleError(error, res))
    }

    getPerfil = (req: Request, res: Response) => {
        console.log(req.body);
        const id = +req.body.user.id;
        const rol = req.body.rol
        this.authService.getPeril(id, rol!)
            .then(user => res.json(user))
            .catch(error => this.handleError(error, res))
    }
    
}