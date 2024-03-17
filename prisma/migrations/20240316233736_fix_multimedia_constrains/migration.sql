/*
  Warnings:

  - Made the column `title` on table `Multimedia` required. This step will fail if there are existing NULL values in that column.
  - Made the column `proyectoId` on table `Multimedia` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Multimedia" DROP CONSTRAINT "Multimedia_proyectoId_fkey";

-- AlterTable
ALTER TABLE "Multimedia" ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "mediaType" DROP NOT NULL,
ALTER COLUMN "proyectoId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Multimedia" ADD CONSTRAINT "Multimedia_proyectoId_fkey" FOREIGN KEY ("proyectoId") REFERENCES "Proyecto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
