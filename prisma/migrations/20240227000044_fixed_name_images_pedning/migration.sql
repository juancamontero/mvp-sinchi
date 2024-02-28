/*
  Warnings:

  - You are about to drop the `Imagen` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Proyecto" DROP CONSTRAINT "Proyecto_idImagen_fkey";

-- DropTable
DROP TABLE "Imagen";

-- CreateTable
CREATE TABLE "Imagenes" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Imagenes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Proyecto" ADD CONSTRAINT "Proyecto_idImagen_fkey" FOREIGN KEY ("idImagen") REFERENCES "Imagenes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
