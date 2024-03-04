/*
  Warnings:

  - You are about to drop the column `urlIcon` on the `Linea` table. All the data in the column will be lost.
  - You are about to drop the column `urlImage` on the `Linea` table. All the data in the column will be lost.
  - You are about to drop the column `urlIcon` on the `Programa` table. All the data in the column will be lost.
  - You are about to drop the column `urlImage` on the `Programa` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Linea" DROP COLUMN "urlIcon",
DROP COLUMN "urlImage",
ADD COLUMN     "idImagen" INTEGER;

-- AlterTable
ALTER TABLE "Programa" DROP COLUMN "urlIcon",
DROP COLUMN "urlImage",
ADD COLUMN     "idImagen" INTEGER;

-- AddForeignKey
ALTER TABLE "Programa" ADD CONSTRAINT "Programa_idImagen_fkey" FOREIGN KEY ("idImagen") REFERENCES "Imagen"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Linea" ADD CONSTRAINT "Linea_idImagen_fkey" FOREIGN KEY ("idImagen") REFERENCES "Imagen"("id") ON DELETE SET NULL ON UPDATE CASCADE;
