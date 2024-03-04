-- AlterTable
ALTER TABLE "Convenio" ADD COLUMN     "idImagen" INTEGER;

-- AddForeignKey
ALTER TABLE "Convenio" ADD CONSTRAINT "Convenio_idImagen_fkey" FOREIGN KEY ("idImagen") REFERENCES "Imagen"("id") ON DELETE SET NULL ON UPDATE CASCADE;
