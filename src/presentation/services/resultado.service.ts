import { prisma } from "../../data/postgres";
import { CustomError } from "../../domain";

interface resultado {
    cantPreguntas: number;
    preguntasCorrectas: number;
    calificacion: number;
    tema: string;
}

export class ResultadoService {
    public async getResultados(UserId: number) {
        const resultados = await prisma.resultados.findMany({
            where: {
                id_usuario: UserId,
            },
        });

        return resultados;
    }

    public async postResultados(UserId: number, obj: resultado) {
        const resultado = await prisma.resultados.create({
            data: {
                id_usuario: UserId,
                cantPreguntas: obj.cantPreguntas,
                preguntasCorrectas: obj.preguntasCorrectas,
                calificacion: obj.calificacion,
                tema: obj.tema,
            },
        });

        return resultado
    }
}
