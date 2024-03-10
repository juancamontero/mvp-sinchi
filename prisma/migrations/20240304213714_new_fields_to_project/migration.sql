-- AlterTable
ALTER TABLE "Proyecto" ADD COLUMN     "actores" TEXT,
ADD COLUMN     "beneficiarios" TEXT,
ADD COLUMN     "descripcion" TEXT,
ADD COLUMN     "roleInvestigador" TEXT,
ALTER COLUMN "objetivo" DROP DEFAULT,
ALTER COLUMN "products" DROP DEFAULT,
ALTER COLUMN "places" DROP DEFAULT;
