-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "account" TEXT NOT NULL,
    "creator" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "images" TEXT[],
    "garmentId" INTEGER NOT NULL,
    "designs" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "printId" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "account" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "palletId" INTEGER NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Design" (
    "id" INTEGER NOT NULL,
    "placement" TEXT NOT NULL DEFAULT 'Front Center',
    "art_file" TEXT NOT NULL,
    "art_url" TEXT NOT NULL,
    "thumbnail_url" TEXT NOT NULL,
    "underbase" BOOLEAN NOT NULL DEFAULT true,
    "x_offset" INTEGER NOT NULL DEFAULT 0,
    "y_offset" INTEGER NOT NULL DEFAULT 0,
    "width" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "height" DOUBLE PRECISION NOT NULL DEFAULT 1,

    CONSTRAINT "Design_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Garment" (
    "id" INTEGER NOT NULL,
    "style" TEXT NOT NULL,
    "colorId" INTEGER NOT NULL,
    "size" TEXT NOT NULL,
    "palletId" INTEGER NOT NULL,

    CONSTRAINT "Garment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Color" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "hex" TEXT NOT NULL,
    "dark" BOOLEAN NOT NULL,

    CONSTRAINT "Color_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pallet" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "width" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Pallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Print" (
    "id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "Print_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DesignToPrint" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_PrintToProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DesignToPrint_AB_unique" ON "_DesignToPrint"("A", "B");

-- CreateIndex
CREATE INDEX "_DesignToPrint_B_index" ON "_DesignToPrint"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PrintToProduct_AB_unique" ON "_PrintToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_PrintToProduct_B_index" ON "_PrintToProduct"("B");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_garmentId_fkey" FOREIGN KEY ("garmentId") REFERENCES "Garment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_palletId_fkey" FOREIGN KEY ("palletId") REFERENCES "Pallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_id_fkey" FOREIGN KEY ("id") REFERENCES "Design"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Garment" ADD CONSTRAINT "Garment_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "Color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Garment" ADD CONSTRAINT "Garment_palletId_fkey" FOREIGN KEY ("palletId") REFERENCES "Pallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DesignToPrint" ADD CONSTRAINT "_DesignToPrint_A_fkey" FOREIGN KEY ("A") REFERENCES "Design"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DesignToPrint" ADD CONSTRAINT "_DesignToPrint_B_fkey" FOREIGN KEY ("B") REFERENCES "Print"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PrintToProduct" ADD CONSTRAINT "_PrintToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Print"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PrintToProduct" ADD CONSTRAINT "_PrintToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
