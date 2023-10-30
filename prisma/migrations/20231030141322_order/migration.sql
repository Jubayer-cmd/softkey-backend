/*
  Warnings:

  - You are about to drop the column `orderDate` on the `order` table. All the data in the column will be lost.
  - Added the required column `address` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postcode` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order" DROP COLUMN "orderDate",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "note" TEXT,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "postcode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "product" ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "order_product" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "order_product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "order_product" ADD CONSTRAINT "order_product_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_product" ADD CONSTRAINT "order_product_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
