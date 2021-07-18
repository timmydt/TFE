-- AlterTable
ALTER TABLE `User` ADD COLUMN `recoverPasswordDate` DATE,
    ADD COLUMN `recoverPasswordToken` VARCHAR(191);
