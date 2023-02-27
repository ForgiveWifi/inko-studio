/*
  Warnings:

  - You are about to drop the column `palletId` on the `Garment` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `Garment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[size_id,style_id,color_id]` on the table `Garment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `size_id` to the `Garment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Garment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Garment" DROP CONSTRAINT "Garment_palletId_fkey";

-- AlterTable
ALTER TABLE "Garment" DROP COLUMN "palletId",
DROP COLUMN "size",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "size_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Size" (
    "size" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "Size_pkey" PRIMARY KEY ("size")
);

-- CreateIndex
CREATE UNIQUE INDEX "Size_size_key" ON "Size"("size");

-- CreateIndex
CREATE UNIQUE INDEX "Garment_size_id_style_id_color_id_key" ON "Garment"("size_id", "style_id", "color_id");

-- AddForeignKey
ALTER TABLE "Garment" ADD CONSTRAINT "Garment_size_id_fkey" FOREIGN KEY ("size_id") REFERENCES "Size"("size") ON DELETE RESTRICT ON UPDATE CASCADE;
