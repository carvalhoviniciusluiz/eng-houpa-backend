/*
  Warnings:

  - Made the column `description` on table `products` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `products` MODIFY `description` TEXT NOT NULL,
    MODIFY `ref` VARCHAR(50) NULL,
    MODIFY `price` DECIMAL(12, 2) NULL;
