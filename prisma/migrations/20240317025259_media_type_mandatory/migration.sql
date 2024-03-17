/*
  Warnings:

  - Made the column `mediaType` on table `Multimedia` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Multimedia" ALTER COLUMN "mediaType" SET NOT NULL;
