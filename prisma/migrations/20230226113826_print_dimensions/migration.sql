/*
  Warnings:

  - You are about to drop the column `index` on the `Product` table. All the data in the column will be lost.
  - Added the required column `height` to the `Print` table without a default value. This is not possible if the table is not empty.
  - Added the required column `width` to the `Print` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Garment" ALTER COLUMN "price" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Print" ADD COLUMN     "height" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "width" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "index";
