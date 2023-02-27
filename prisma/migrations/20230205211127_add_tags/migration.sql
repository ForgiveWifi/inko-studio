/*
  Warnings:

  - You are about to drop the column `tag_id` on the `Design` table. All the data in the column will be lost.
  - You are about to drop the column `tagId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[design_id]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `design_id` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Design" DROP CONSTRAINT "Design_tag_id_fkey";

-- AlterTable
ALTER TABLE "Design" DROP COLUMN "tag_id";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "tagId";

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "design_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Tags" (
    "id" TEXT NOT NULL,
    "size_id" TEXT NOT NULL,
    "pallet_id" TEXT NOT NULL,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_design_id_key" ON "Tag"("design_id");

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_design_id_fkey" FOREIGN KEY ("design_id") REFERENCES "Design"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tags" ADD CONSTRAINT "Tags_size_id_fkey" FOREIGN KEY ("size_id") REFERENCES "Size"("size") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tags" ADD CONSTRAINT "Tags_pallet_id_fkey" FOREIGN KEY ("pallet_id") REFERENCES "Pallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
