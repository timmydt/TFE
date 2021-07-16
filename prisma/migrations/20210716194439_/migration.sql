-- CreateTable
CREATE TABLE `_AuthorizedCaves` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AuthorizedCaves_AB_unique`(`A`, `B`),
    INDEX `_AuthorizedCaves_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_AuthorizedCaves` ADD FOREIGN KEY (`A`) REFERENCES `Cave`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AuthorizedCaves` ADD FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
