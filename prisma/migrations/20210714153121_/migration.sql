-- AlterTable
ALTER TABLE `Degustations` MODIFY `note` VARCHAR(191),
    MODIFY `picture` VARCHAR(191),
    MODIFY `date` DATETIME(3);

-- AlterTable
ALTER TABLE `User` MODIFY `first_name` VARCHAR(191),
    MODIFY `last_name` VARCHAR(191);
