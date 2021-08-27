/*
  Warnings:

  - You are about to drop the `_CaveToPrivateWine` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `caveId` to the `PrivateWine` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_CaveToPrivateWine` DROP FOREIGN KEY `_CaveToPrivateWine_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_CaveToPrivateWine` DROP FOREIGN KEY `_CaveToPrivateWine_ibfk_2`;

-- AlterTable
ALTER TABLE `PrivateWine` ADD COLUMN `caveId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_CaveToPrivateWine`;

-- AddForeignKey
ALTER TABLE `PrivateWine` ADD FOREIGN KEY (`caveId`) REFERENCES `Cave`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
