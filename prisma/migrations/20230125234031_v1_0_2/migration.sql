/*
  Warnings:

  - You are about to drop the column `colorId` on the `Garment` table. All the data in the column will be lost.
  - Added the required column `company` to the `Garment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Garment` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Color_hex_key";

-- AlterTable
CREATE SEQUENCE garment_id_seq;
ALTER TABLE "Garment" DROP COLUMN "colorId",
ADD COLUMN     "company" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "stock" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "id" SET DEFAULT nextval('garment_id_seq'),
ALTER COLUMN "back_offset" SET DEFAULT 0,
ALTER COLUMN "front_offset" SET DEFAULT 0;
ALTER SEQUENCE garment_id_seq OWNED BY "Garment"."id";
