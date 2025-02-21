import { Request, Response } from "express";
import { CustomError } from "../../domain";
import { ResultadoService } from "../services/resultado.service";

export class ResultadoController {
    constructor(public readonly resultadoService: ResultadoService) {}

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        console.log(`${error}`);
        return res.status(500).json({ error: "Internal Server Error" });
    };

    getResultados = (req: Request, res: Response) => {
        const id = +req.body.user.id;
        this.resultadoService
            .getResultados(id)
            .then((user) => res.json(user))
            .catch((error) => this.handleError(error, res));
    };
    postResultado = (req: Request, res: Response) => {
        const id = +req.body.user.id;
        const { resultado } = req.body;
        const obj = {
            calificacion: resultado.calificacion,
            cantPreguntas: resultado.cantPreguntas,
            preguntasCorrectas: resultado.preguntasCorrectas,
            tema: resultado.tema,
        };
        this.resultadoService
            .postResultados(id, obj)
            .then((user) => res.json(user))
            .catch((error) => this.handleError(error, res));
    };
}
