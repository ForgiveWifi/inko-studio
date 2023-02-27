/*
  Warnings:

  - You are about to drop the column `pallet_id` on the `Garment` table. All the data in the column will be lost.
  - You are about to drop the column `company` on the `Style` table. All the data in the column will be lost.
  - Added the required column `brand` to the `Style` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Garment" DROP CONSTRAINT "Garment_pallet_id_fkey";

-- AlterTable
ALTER TABLE "Garment" DROP COLUMN "pallet_id",
ADD COLUMN     "palletId" TEXT;

-- AlterTable
ALTER TABLE "Style" DROP COLUMN "company",
ADD COLUMN     "brand" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Garment" ADD CONSTRAINT "Garment_palletId_fkey" FOREIGN KEY ("palletId") REFERENCES "Pallet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
