/*
  Warnings:

  - You are about to drop the `_CaveToPublicWine` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_CaveToPublicWine` DROP FOREIGN KEY `_CaveToPublicWine_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_CaveToPublicWine` DROP FOREIGN KEY `_CaveToPublicWine_ibfk_2`;

-- DropTable
DROP TABLE `_CaveToPublicWine`;
