-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('image', 'video');

-- CreateTable
CREATE TABLE "Multimedia" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "mediaType" "MediaType" NOT NULL,
    "subTitle" TEXT,
    "url" TEXT,
    "order" INTEGER DEFAULT 0,
    "proyectoId" INTEGER,

    CONSTRAINT "Multimedia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Multimedia_mediaType_idx" ON "Multimedia"("mediaType");

-- AddForeignKey
ALTER TABLE "Multimedia" ADD CONSTRAINT "Multimedia_proyectoId_fkey" FOREIGN KEY ("proyectoId") REFERENCES "Proyecto"("id") ON DELETE SET NULL ON UPDATE CASCADE;
