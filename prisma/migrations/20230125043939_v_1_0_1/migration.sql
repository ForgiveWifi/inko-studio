/*
  Warnings:

  - You are about to drop the `_PrintToProduct` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[designId]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updated_at` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `designId` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_PrintToProduct" DROP CONSTRAINT "_PrintToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_PrintToProduct" DROP CONSTRAINT "_PrintToProduct_B_fkey";

-- AlterTable
CREATE SEQUENCE print_id_seq;
ALTER TABLE "Print" ALTER COLUMN "id" SET DEFAULT nextval('print_id_seq');
ALTER SEQUENCE print_id_seq OWNED BY "Print"."id";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "designId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_PrintToProduct";

-- CreateIndex
CREATE UNIQUE INDEX "Tag_designId_key" ON "Tag"("designId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_printId_fkey" FOREIGN KEY ("printId") REFERENCES "Print"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
