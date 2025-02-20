/*
  Warnings:

  - Added the required column `direccion` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numeroCel` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "direccion" TEXT NOT NULL,
ADD COLUMN     "numeroCel" INTEGER NOT NULL;
