/*
  Warnings:

  - You are about to drop the column `urlImage` on the `Proyecto` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Proyecto" DROP COLUMN "urlImage",
ADD COLUMN     "idImagen" INTEGER;

-- CreateTable
CREATE TABLE "Imagenes" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Imagenes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Proyecto" ADD CONSTRAINT "Proyecto_idImagen_fkey" FOREIGN KEY ("idImagen") REFERENCES "Imagenes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
