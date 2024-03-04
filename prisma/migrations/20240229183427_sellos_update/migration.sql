/*
  Warnings:

  - You are about to drop the column `url` on the `Sello` table. All the data in the column will be lost.

*/
-- AlterTable
CREATE SEQUENCE linea_order_seq;
ALTER TABLE "Linea" ALTER COLUMN "order" SET DEFAULT nextval('linea_order_seq');
ALTER SEQUENCE linea_order_seq OWNED BY "Linea"."order";

-- AlterTable
ALTER TABLE "Sello" DROP COLUMN "url";
