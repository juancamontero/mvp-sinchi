-- DropForeignKey
ALTER TABLE "Proyecto" DROP CONSTRAINT "Proyecto_idPrograma_fkey";

-- AlterTable
ALTER TABLE "Imagen" ADD COLUMN     "proyectoId" INTEGER;

-- AlterTable
ALTER TABLE "Proyecto" ADD COLUMN     "antecedentes" TEXT,
ADD COLUMN     "imagenId" INTEGER,
ADD COLUMN     "programaId" INTEGER;

-- CreateTable
CREATE TABLE "ImagenActores" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "subTitle" TEXT,
    "url" TEXT NOT NULL,
    "proyectoId" INTEGER,

    CONSTRAINT "ImagenActores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MapasUbicacion" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "subTitle" TEXT,
    "url" TEXT NOT NULL,
    "proyectoId" INTEGER,

    CONSTRAINT "MapasUbicacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImagenDescripcion" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "subTitle" TEXT,
    "url" TEXT NOT NULL,
    "proyectoId" INTEGER,

    CONSTRAINT "ImagenDescripcion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImagenAntecedentes" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "subTitle" TEXT,
    "url" TEXT NOT NULL,
    "proyectoId" INTEGER,

    CONSTRAINT "ImagenAntecedentes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ImagenActores" ADD CONSTRAINT "ImagenActores_proyectoId_fkey" FOREIGN KEY ("proyectoId") REFERENCES "Proyecto"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MapasUbicacion" ADD CONSTRAINT "MapasUbicacion_proyectoId_fkey" FOREIGN KEY ("proyectoId") REFERENCES "Proyecto"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImagenDescripcion" ADD CONSTRAINT "ImagenDescripcion_proyectoId_fkey" FOREIGN KEY ("proyectoId") REFERENCES "Proyecto"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImagenAntecedentes" ADD CONSTRAINT "ImagenAntecedentes_proyectoId_fkey" FOREIGN KEY ("proyectoId") REFERENCES "Proyecto"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proyecto" ADD CONSTRAINT "Proyecto_programaId_fkey" FOREIGN KEY ("programaId") REFERENCES "Programa"("id") ON DELETE SET NULL ON UPDATE CASCADE;
