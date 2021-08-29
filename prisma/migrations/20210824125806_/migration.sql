-- CreateTable
CREATE TABLE `_CaveToPublicWine` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CaveToPublicWine_AB_unique`(`A`, `B`),
    INDEX `_CaveToPublicWine_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_CaveToPublicWine` ADD FOREIGN KEY (`A`) REFERENCES `Cave`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CaveToPublicWine` ADD FOREIGN KEY (`B`) REFERENCES `PublicWine`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
