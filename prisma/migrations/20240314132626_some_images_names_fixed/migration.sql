/*
  Warnings:

  - You are about to drop the `ImagenActores` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ImagenActores" DROP CONSTRAINT "ImagenActores_proyectoId_fkey";

-- DropTable
DROP TABLE "ImagenActores";

-- CreateTable
CREATE TABLE "ImagenIndicadores" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "subTitle" TEXT,
    "url" TEXT,
    "order" INTEGER DEFAULT 0,
    "proyectoId" INTEGER,

    CONSTRAINT "ImagenIndicadores_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ImagenIndicadores" ADD CONSTRAINT "ImagenIndicadores_proyectoId_fkey" FOREIGN KEY ("proyectoId") REFERENCES "Proyecto"("id") ON DELETE SET NULL ON UPDATE CASCADE;
