/*
  Warnings:

  - Made the column `idLinea` on table `Proyecto` required. This step will fail if there are existing NULL values in that column.
  - Made the column `idPrograma` on table `Proyecto` required. This step will fail if there are existing NULL values in that column.
  - Made the column `idAtutor` on table `Proyecto` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Proyecto" DROP CONSTRAINT "Proyecto_idAtutor_fkey";

-- DropForeignKey
ALTER TABLE "Proyecto" DROP CONSTRAINT "Proyecto_idLinea_fkey";

-- DropForeignKey
ALTER TABLE "Proyecto" DROP CONSTRAINT "Proyecto_idPrograma_fkey";

-- AlterTable
ALTER TABLE "Proyecto" ALTER COLUMN "idLinea" SET NOT NULL,
ALTER COLUMN "idPrograma" SET NOT NULL,
ALTER COLUMN "idAtutor" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Proyecto" ADD CONSTRAINT "Proyecto_idAtutor_fkey" FOREIGN KEY ("idAtutor") REFERENCES "Autor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proyecto" ADD CONSTRAINT "Proyecto_idLinea_fkey" FOREIGN KEY ("idLinea") REFERENCES "Linea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proyecto" ADD CONSTRAINT "Proyecto_idPrograma_fkey" FOREIGN KEY ("idPrograma") REFERENCES "Programa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
