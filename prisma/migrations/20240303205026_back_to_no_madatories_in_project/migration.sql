-- DropForeignKey
ALTER TABLE "Proyecto" DROP CONSTRAINT "Proyecto_idAtutor_fkey";

-- DropForeignKey
ALTER TABLE "Proyecto" DROP CONSTRAINT "Proyecto_idLinea_fkey";

-- DropForeignKey
ALTER TABLE "Proyecto" DROP CONSTRAINT "Proyecto_idPrograma_fkey";

-- AlterTable
ALTER TABLE "Proyecto" ALTER COLUMN "idLinea" DROP NOT NULL,
ALTER COLUMN "idPrograma" DROP NOT NULL,
ALTER COLUMN "idAtutor" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Proyecto" ADD CONSTRAINT "Proyecto_idAtutor_fkey" FOREIGN KEY ("idAtutor") REFERENCES "Autor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proyecto" ADD CONSTRAINT "Proyecto_idLinea_fkey" FOREIGN KEY ("idLinea") REFERENCES "Linea"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proyecto" ADD CONSTRAINT "Proyecto_idPrograma_fkey" FOREIGN KEY ("idPrograma") REFERENCES "Programa"("id") ON DELETE SET NULL ON UPDATE CASCADE;
