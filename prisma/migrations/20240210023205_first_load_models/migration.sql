-- CreateTable
CREATE TABLE "Convenio" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Convenio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Autor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Autor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Region" (
    "id" SERIAL NOT NULL,
    "cod" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sello" (
    "id" SERIAL NOT NULL,
    "order" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Sello_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Programa" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "order" SERIAL NOT NULL,
    "description" TEXT DEFAULT '',

    CONSTRAINT "Programa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Linea" (
    "id" SERIAL NOT NULL,
    "order" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "description" TEXT DEFAULT '',
    "purpose" TEXT DEFAULT '',
    "millestone1" TEXT DEFAULT '',
    "millestone2" TEXT DEFAULT '',
    "millestone3" TEXT DEFAULT '',

    CONSTRAINT "Linea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proyecto" (
    "id" SERIAL NOT NULL,
    "idLinea" INTEGER,
    "idPrograma" INTEGER,
    "idAtutor" INTEGER,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "year" INTEGER NOT NULL DEFAULT 2022,
    "name" TEXT NOT NULL,
    "objetivo" TEXT DEFAULT '',
    "products" TEXT DEFAULT '',
    "places" TEXT DEFAULT '',

    CONSTRAINT "Proyecto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ConvenioToProyecto" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_LineaToPrograma" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ProyectoToRegion" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ProyectoToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ProyectoToSello" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Convenio_name_key" ON "Convenio"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Autor_email_key" ON "Autor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Region_name_key" ON "Region"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Sello_name_key" ON "Sello"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Programa_name_key" ON "Programa"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Linea_name_key" ON "Linea"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ConvenioToProyecto_AB_unique" ON "_ConvenioToProyecto"("A", "B");

-- CreateIndex
CREATE INDEX "_ConvenioToProyecto_B_index" ON "_ConvenioToProyecto"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LineaToPrograma_AB_unique" ON "_LineaToPrograma"("A", "B");

-- CreateIndex
CREATE INDEX "_LineaToPrograma_B_index" ON "_LineaToPrograma"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProyectoToRegion_AB_unique" ON "_ProyectoToRegion"("A", "B");

-- CreateIndex
CREATE INDEX "_ProyectoToRegion_B_index" ON "_ProyectoToRegion"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProyectoToTag_AB_unique" ON "_ProyectoToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_ProyectoToTag_B_index" ON "_ProyectoToTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProyectoToSello_AB_unique" ON "_ProyectoToSello"("A", "B");

-- CreateIndex
CREATE INDEX "_ProyectoToSello_B_index" ON "_ProyectoToSello"("B");

-- AddForeignKey
ALTER TABLE "Proyecto" ADD CONSTRAINT "Proyecto_idLinea_fkey" FOREIGN KEY ("idLinea") REFERENCES "Linea"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proyecto" ADD CONSTRAINT "Proyecto_idPrograma_fkey" FOREIGN KEY ("idPrograma") REFERENCES "Programa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proyecto" ADD CONSTRAINT "Proyecto_idAtutor_fkey" FOREIGN KEY ("idAtutor") REFERENCES "Autor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConvenioToProyecto" ADD CONSTRAINT "_ConvenioToProyecto_A_fkey" FOREIGN KEY ("A") REFERENCES "Convenio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConvenioToProyecto" ADD CONSTRAINT "_ConvenioToProyecto_B_fkey" FOREIGN KEY ("B") REFERENCES "Proyecto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LineaToPrograma" ADD CONSTRAINT "_LineaToPrograma_A_fkey" FOREIGN KEY ("A") REFERENCES "Linea"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LineaToPrograma" ADD CONSTRAINT "_LineaToPrograma_B_fkey" FOREIGN KEY ("B") REFERENCES "Programa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProyectoToRegion" ADD CONSTRAINT "_ProyectoToRegion_A_fkey" FOREIGN KEY ("A") REFERENCES "Proyecto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProyectoToRegion" ADD CONSTRAINT "_ProyectoToRegion_B_fkey" FOREIGN KEY ("B") REFERENCES "Region"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProyectoToTag" ADD CONSTRAINT "_ProyectoToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Proyecto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProyectoToTag" ADD CONSTRAINT "_ProyectoToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProyectoToSello" ADD CONSTRAINT "_ProyectoToSello_A_fkey" FOREIGN KEY ("A") REFERENCES "Proyecto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProyectoToSello" ADD CONSTRAINT "_ProyectoToSello_B_fkey" FOREIGN KEY ("B") REFERENCES "Sello"("id") ON DELETE CASCADE ON UPDATE CASCADE;
