/*
  Warnings:

  - You are about to drop the column `pallet_id` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the column `size_id` on the `Tag` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[size_id,pallet_id]` on the table `Tags` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `printer_id` to the `Pallet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Design" DROP CONSTRAINT "Design_print_id_fkey";

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_pallet_id_fkey";

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_size_id_fkey";

-- AlterTable
ALTER TABLE "Design" ALTER COLUMN "print_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Garment" ADD COLUMN     "tag" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Pallet" ADD COLUMN     "printer_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "pallet_id",
DROP COLUMN "size_id";

-- CreateTable
CREATE TABLE "Printer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Printer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tags_size_id_pallet_id_key" ON "Tags"("size_id", "pallet_id");

-- AddForeignKey
ALTER TABLE "Design" ADD CONSTRAINT "Design_print_id_fkey" FOREIGN KEY ("print_id") REFERENCES "Print"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pallet" ADD CONSTRAINT "Pallet_printer_id_fkey" FOREIGN KEY ("printer_id") REFERENCES "Printer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
