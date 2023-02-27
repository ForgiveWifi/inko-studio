/*
  Warnings:

  - You are about to drop the column `art_file` on the `Design` table. All the data in the column will be lost.
  - You are about to drop the column `art_url` on the `Design` table. All the data in the column will be lost.
  - Added the required column `image_id` to the `Design` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Design" DROP COLUMN "art_file",
DROP COLUMN "art_url",
ADD COLUMN     "image_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Garment" ADD COLUMN     "price" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Style" ADD COLUMN     "scale" INTEGER NOT NULL DEFAULT 20;

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "customer" TEXT NOT NULL,
    "art_file" TEXT NOT NULL,
    "art_url" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Design" ADD CONSTRAINT "Design_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
