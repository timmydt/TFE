/*
  Warnings:

  - You are about to drop the `Wine` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CaveToWine` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_CaveToWine` DROP FOREIGN KEY `_CaveToWine_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_CaveToWine` DROP FOREIGN KEY `_CaveToWine_ibfk_2`;

-- DropTable
DROP TABLE `Wine`;

-- DropTable
DROP TABLE `_CaveToWine`;

-- CreateTable
CREATE TABLE `PrivateWine` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `best_before` DATE,
    `food` VARCHAR(191),
    `grapes` VARCHAR(191),
    `maker` VARCHAR(191),
    `picture` VARCHAR(191),
    `year` INTEGER,
    `creatorId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PublicWine` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `food` VARCHAR(191),
    `grapes` VARCHAR(191),
    `maker` VARCHAR(191),
    `picture` VARCHAR(191),
    `year` INTEGER,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CaveToPrivateWine` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CaveToPrivateWine_AB_unique`(`A`, `B`),
    INDEX `_CaveToPrivateWine_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_CaveToPrivateWine` ADD FOREIGN KEY (`A`) REFERENCES `Cave`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CaveToPrivateWine` ADD FOREIGN KEY (`B`) REFERENCES `PrivateWine`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
