-- AlterTable
ALTER TABLE `Note` ADD COLUMN `rating` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `PrivateWine` ADD COLUMN `quantity` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `rating` INTEGER NOT NULL DEFAULT 0;
