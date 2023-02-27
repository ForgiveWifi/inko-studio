/*
  Warnings:

  - You are about to drop the column `tag` on the `Garment` table. All the data in the column will be lost.
  - You are about to drop the column `pallet_id` on the `Style` table. All the data in the column will be lost.
  - Added the required column `pallet_id` to the `Garment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `height` to the `Style` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Style` table without a default value. This is not possible if the table is not empty.
  - Added the required column `width` to the `Style` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tags_id` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Style" DROP CONSTRAINT "Style_pallet_id_fkey";

-- AlterTable
ALTER TABLE "Garment" DROP COLUMN "tag",
ADD COLUMN     "pallet_id" TEXT NOT NULL,
ADD COLUMN     "tagId" TEXT,
ADD COLUMN     "tags_id" TEXT;

-- AlterTable
ALTER TABLE "Printer" ADD COLUMN     "index" SERIAL NOT NULL;

-- AlterTable
CREATE SEQUENCE style_index_seq;
ALTER TABLE "Style" DROP COLUMN "pallet_id",
ADD COLUMN     "height" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "width" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "index" SET DEFAULT nextval('style_index_seq');
ALTER SEQUENCE style_index_seq OWNED BY "Style"."index";

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "tags_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Garment" ADD CONSTRAINT "Garment_pallet_id_fkey" FOREIGN KEY ("pallet_id") REFERENCES "Pallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Garment" ADD CONSTRAINT "Garment_tags_id_fkey" FOREIGN KEY ("tags_id") REFERENCES "Tags"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Garment" ADD CONSTRAINT "Garment_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_tags_id_fkey" FOREIGN KEY ("tags_id") REFERENCES "Tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
