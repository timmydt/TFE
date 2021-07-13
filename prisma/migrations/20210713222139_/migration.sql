/*
  Warnings:

  - You are about to drop the `Notes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `admin` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isPublic` to the `Wine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `admin` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `Wine` ADD COLUMN `best_before` DATE,
    ADD COLUMN `food` VARCHAR(191),
    ADD COLUMN `grapes` VARCHAR(191),
    ADD COLUMN `isPublic` BOOLEAN NOT NULL,
    ADD COLUMN `maker` VARCHAR(191),
    ADD COLUMN `picture` VARCHAR(191),
    ADD COLUMN `year` INTEGER;

-- DropTable
DROP TABLE `Notes`;

-- CreateTable
CREATE TABLE `Degustations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `note` VARCHAR(191) NOT NULL,
    `picture` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
