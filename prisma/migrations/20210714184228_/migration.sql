/*
  Warnings:

  - You are about to drop the `Degustations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Degustations`;

-- CreateTable
CREATE TABLE `Note` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `note` VARCHAR(191),
    `picture` VARCHAR(191),
    `date` DATETIME(3),
    `creatorId` INTEGER NOT NULL,

    INDEX `creatorId`(`creatorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Note` ADD FOREIGN KEY (`creatorId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
