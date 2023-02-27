/*
  Warnings:

  - You are about to drop the column `tagId` on the `Garment` table. All the data in the column will be lost.
  - Added the required column `index` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Garment" DROP CONSTRAINT "Garment_tagId_fkey";

-- AlterTable
ALTER TABLE "Garment" DROP COLUMN "tagId";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "index" INTEGER NOT NULL;
