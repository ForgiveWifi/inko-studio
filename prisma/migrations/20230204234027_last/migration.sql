/*
  Warnings:

  - You are about to drop the column `tag_id` on the `Print` table. All the data in the column will be lost.
  - You are about to drop the column `design_id` on the `Tag` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Print" DROP CONSTRAINT "Print_tag_id_fkey";

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_design_id_fkey";

-- DropIndex
DROP INDEX "Tag_design_id_key";

-- AlterTable
ALTER TABLE "Design" ADD COLUMN     "tag_id" TEXT;

-- AlterTable
ALTER TABLE "Print" DROP COLUMN "tag_id";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "tagId" TEXT,
ADD COLUMN     "tag_id" TEXT;

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "design_id";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "Tag"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Design" ADD CONSTRAINT "Design_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "Tag"("id") ON DELETE SET NULL ON UPDATE CASCADE;
