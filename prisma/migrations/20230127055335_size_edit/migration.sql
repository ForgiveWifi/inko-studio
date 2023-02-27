/*
  Warnings:

  - You are about to drop the column `order` on the `Size` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `Tag` table. All the data in the column will be lost.
  - Added the required column `index` to the `Size` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size_id` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Size" DROP COLUMN "order",
ADD COLUMN     "index" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "size",
ADD COLUMN     "size_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_size_id_fkey" FOREIGN KEY ("size_id") REFERENCES "Size"("size") ON DELETE RESTRICT ON UPDATE CASCADE;
