/*
  Warnings:

  - The primary key for the `Color` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Design` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Garment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `back_offset` on the `Garment` table. All the data in the column will be lost.
  - You are about to drop the column `company` on the `Garment` table. All the data in the column will be lost.
  - You are about to drop the column `front_offset` on the `Garment` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Garment` table. All the data in the column will be lost.
  - You are about to drop the column `palletId` on the `Garment` table. All the data in the column will be lost.
  - You are about to drop the column `style` on the `Garment` table. All the data in the column will be lost.
  - The primary key for the `Pallet` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `quantity` on the `Print` table. All the data in the column will be lost.
  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `garmentId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `printId` on the `Product` table. All the data in the column will be lost.
  - The primary key for the `Tag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `designId` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the column `palletId` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the `_ColorToGarment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_DesignToPrint` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[design_id]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `print_id` to the `Design` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color_id` to the `Garment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pallet_id` to the `Garment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `style_id` to the `Garment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `garment_id` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `print_id` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sku` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `design_id` to the `Tag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pallet_id` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Garment" DROP CONSTRAINT "Garment_palletId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_garmentId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_printId_fkey";

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_id_fkey";

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_palletId_fkey";

-- DropForeignKey
ALTER TABLE "_ColorToGarment" DROP CONSTRAINT "_ColorToGarment_A_fkey";

-- DropForeignKey
ALTER TABLE "_ColorToGarment" DROP CONSTRAINT "_ColorToGarment_B_fkey";

-- DropForeignKey
ALTER TABLE "_DesignToPrint" DROP CONSTRAINT "_DesignToPrint_A_fkey";

-- DropForeignKey
ALTER TABLE "_DesignToPrint" DROP CONSTRAINT "_DesignToPrint_B_fkey";

-- DropIndex
DROP INDEX "Tag_designId_key";

-- AlterTable
ALTER TABLE "Color" DROP CONSTRAINT "Color_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Color_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Color_id_seq";

-- AlterTable
ALTER TABLE "Design" DROP CONSTRAINT "Design_pkey",
ADD COLUMN     "print_id" INTEGER NOT NULL,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Design_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Garment" DROP CONSTRAINT "Garment_pkey",
DROP COLUMN "back_offset",
DROP COLUMN "company",
DROP COLUMN "front_offset",
DROP COLUMN "name",
DROP COLUMN "palletId",
DROP COLUMN "style",
ADD COLUMN     "color_id" TEXT NOT NULL,
ADD COLUMN     "pallet_id" TEXT NOT NULL,
ADD COLUMN     "style_id" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Garment_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "garment_id_seq";

-- AlterTable
ALTER TABLE "Pallet" DROP CONSTRAINT "Pallet_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Pallet_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Pallet_id_seq";

-- AlterTable
ALTER TABLE "Print" DROP COLUMN "quantity";

-- AlterTable
ALTER TABLE "Product" DROP CONSTRAINT "Product_pkey",
DROP COLUMN "garmentId",
DROP COLUMN "printId",
ADD COLUMN     "garment_id" TEXT NOT NULL,
ADD COLUMN     "print_id" INTEGER NOT NULL,
ADD COLUMN     "sku" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Product_id_seq";

-- AlterTable
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_pkey",
DROP COLUMN "designId",
DROP COLUMN "palletId",
ADD COLUMN     "design_id" TEXT NOT NULL,
ADD COLUMN     "pallet_id" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Tag_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Tag_id_seq";

-- DropTable
DROP TABLE "_ColorToGarment";

-- DropTable
DROP TABLE "_DesignToPrint";

-- CreateTable
CREATE TABLE "Style" (
    "sku" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "pallet_id" TEXT NOT NULL,
    "front_offset" INTEGER NOT NULL DEFAULT 0,
    "back_offset" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Style_pkey" PRIMARY KEY ("sku")
);

-- CreateIndex
CREATE UNIQUE INDEX "Style_sku_key" ON "Style"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_design_id_key" ON "Tag"("design_id");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_garment_id_fkey" FOREIGN KEY ("garment_id") REFERENCES "Garment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_print_id_fkey" FOREIGN KEY ("print_id") REFERENCES "Print"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_pallet_id_fkey" FOREIGN KEY ("pallet_id") REFERENCES "Pallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_design_id_fkey" FOREIGN KEY ("design_id") REFERENCES "Design"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Design" ADD CONSTRAINT "Design_print_id_fkey" FOREIGN KEY ("print_id") REFERENCES "Print"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Garment" ADD CONSTRAINT "Garment_style_id_fkey" FOREIGN KEY ("style_id") REFERENCES "Style"("sku") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Garment" ADD CONSTRAINT "Garment_color_id_fkey" FOREIGN KEY ("color_id") REFERENCES "Color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Garment" ADD CONSTRAINT "Garment_pallet_id_fkey" FOREIGN KEY ("pallet_id") REFERENCES "Pallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Style" ADD CONSTRAINT "Style_pallet_id_fkey" FOREIGN KEY ("pallet_id") REFERENCES "Pallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
