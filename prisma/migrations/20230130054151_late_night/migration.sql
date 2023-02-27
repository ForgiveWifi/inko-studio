/*
  Warnings:

  - You are about to drop the column `designs` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Design" ALTER COLUMN "width" DROP DEFAULT,
ALTER COLUMN "height" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "designs";
