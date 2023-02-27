/*
  Warnings:

  - Added the required column `index` to the `Style` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Color" ADD COLUMN     "index" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "Garment" ADD COLUMN     "archived" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Print" ADD COLUMN     "tag_id" TEXT;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "archived" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Style" ADD COLUMN     "back_image" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "description" TEXT,
ADD COLUMN     "front_image" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "index" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Print" ADD CONSTRAINT "Print_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "Tag"("id") ON DELETE SET NULL ON UPDATE CASCADE;
