/*
  Warnings:

  - You are about to drop the column `customer` on the `Image` table. All the data in the column will be lost.
  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `description` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Product` table. All the data in the column will be lost.
  - Added the required column `account` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `account` to the `Print` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Print` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stripe` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Image" DROP COLUMN "customer",
ADD COLUMN     "account" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Print" ADD COLUMN     "account" TEXT NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP CONSTRAINT "Product_pkey",
DROP COLUMN "description",
DROP COLUMN "id",
DROP COLUMN "name",
ADD COLUMN     "stripe" TEXT NOT NULL,
ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("sku");
