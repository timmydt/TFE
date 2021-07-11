/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[mail]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `User.username_unique` ON `User`(`username`);

-- CreateIndex
CREATE UNIQUE INDEX `User.mail_unique` ON `User`(`mail`);
