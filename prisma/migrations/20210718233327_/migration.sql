/*
  Warnings:

  - A unique constraint covering the columns `[recoverPasswordToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `User.recoverPasswordToken_unique` ON `User`(`recoverPasswordToken`);
