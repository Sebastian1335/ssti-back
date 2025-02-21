-- CreateEnum
CREATE TYPE "rol" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "rol" "rol" NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE "resultados" (
    "id" SERIAL NOT NULL,
    "tema" TEXT NOT NULL,
    "cantPreguntas" INTEGER NOT NULL,
    "preguntasCorrectas" INTEGER NOT NULL,
    "calificacion" DOUBLE PRECISION NOT NULL,
    "id_usuario" INTEGER NOT NULL,

    CONSTRAINT "resultados_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "resultados" ADD CONSTRAINT "resultados_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
