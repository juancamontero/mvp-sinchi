/*
  Warnings:

  - You are about to drop the `Imagenes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Proyecto" DROP CONSTRAINT "Proyecto_idImagen_fkey";

-- DropTable
DROP TABLE "Imagenes";

-- CreateTable
CREATE TABLE "Imagen" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Imagen_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Proyecto" ADD CONSTRAINT "Proyecto_idImagen_fkey" FOREIGN KEY ("idImagen") REFERENCES "Imagen"("id") ON DELETE SET NULL ON UPDATE CASCADE;
