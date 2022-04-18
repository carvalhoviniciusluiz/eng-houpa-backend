-- DropIndex
DROP INDEX `products_name_ref_idx` ON `products`;

-- CreateTable
CREATE TABLE `product_pictures` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted` DATETIME(3) NULL,
    `product_id` VARCHAR(191) NULL,
    `imagePath` VARCHAR(191) NULL,
    `cover` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `products_name_idx` ON `products`(`name`);

-- AddForeignKey
ALTER TABLE `product_pictures` ADD CONSTRAINT `product_pictures_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
