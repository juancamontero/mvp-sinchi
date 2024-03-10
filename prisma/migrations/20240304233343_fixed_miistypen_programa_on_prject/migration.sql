/*
  Warnings:

  - You are about to drop the column `imagenId` on the `Proyecto` table. All the data in the column will be lost.
  - You are about to drop the column `programaId` on the `Proyecto` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Proyecto" DROP CONSTRAINT "Proyecto_programaId_fkey";

-- AlterTable
ALTER TABLE "Proyecto" DROP COLUMN "imagenId",
DROP COLUMN "programaId";

-- AddForeignKey
ALTER TABLE "Proyecto" ADD CONSTRAINT "Proyecto_idPrograma_fkey" FOREIGN KEY ("idPrograma") REFERENCES "Programa"("id") ON DELETE SET NULL ON UPDATE CASCADE;
