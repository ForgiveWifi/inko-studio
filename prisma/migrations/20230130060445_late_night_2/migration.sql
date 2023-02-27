/*
  Warnings:

  - The primary key for the `Print` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Design" DROP CONSTRAINT "Design_print_id_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_print_id_fkey";

-- AlterTable
ALTER TABLE "Design" ALTER COLUMN "print_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Print" DROP CONSTRAINT "Print_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Print_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "print_id_seq";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "print_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_print_id_fkey" FOREIGN KEY ("print_id") REFERENCES "Print"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Design" ADD CONSTRAINT "Design_print_id_fkey" FOREIGN KEY ("print_id") REFERENCES "Print"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
