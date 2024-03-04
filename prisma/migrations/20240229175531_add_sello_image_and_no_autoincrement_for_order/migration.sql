-- AlterTable
ALTER TABLE "Linea" ALTER COLUMN "order" DROP DEFAULT;
DROP SEQUENCE "Linea_order_seq";

-- AlterTable
ALTER TABLE "Programa" ALTER COLUMN "order" DROP DEFAULT;
DROP SEQUENCE "Programa_order_seq";

-- AlterTable
ALTER TABLE "Sello" ADD COLUMN     "idImagen" INTEGER,
ALTER COLUMN "order" DROP DEFAULT;
DROP SEQUENCE "Sello_order_seq";

-- AddForeignKey
ALTER TABLE "Sello" ADD CONSTRAINT "Sello_idImagen_fkey" FOREIGN KEY ("idImagen") REFERENCES "Imagen"("id") ON DELETE SET NULL ON UPDATE CASCADE;
