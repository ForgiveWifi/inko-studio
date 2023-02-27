/*
  Warnings:

  - The `size` column on the `Garment` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[name]` on the table `Color` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[hex]` on the table `Color` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `back_offset` to the `Garment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `front_offset` to the `Garment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Garment" DROP CONSTRAINT "Garment_colorId_fkey";

-- AlterTable
ALTER TABLE "Garment" ADD COLUMN     "back_offset" INTEGER NOT NULL,
ADD COLUMN     "front_offset" INTEGER NOT NULL,
DROP COLUMN "size",
ADD COLUMN     "size" TEXT[];

-- CreateTable
CREATE TABLE "_ColorToGarment" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ColorToGarment_AB_unique" ON "_ColorToGarment"("A", "B");

-- CreateIndex
CREATE INDEX "_ColorToGarment_B_index" ON "_ColorToGarment"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Color_name_key" ON "Color"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Color_hex_key" ON "Color"("hex");

-- AddForeignKey
ALTER TABLE "_ColorToGarment" ADD CONSTRAINT "_ColorToGarment_A_fkey" FOREIGN KEY ("A") REFERENCES "Color"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ColorToGarment" ADD CONSTRAINT "_ColorToGarment_B_fkey" FOREIGN KEY ("B") REFERENCES "Garment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
