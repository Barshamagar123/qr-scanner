/*
  Warnings:

  - You are about to drop the `qrs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `qrs` DROP FOREIGN KEY `qrs_userId_fkey`;

-- DropTable
DROP TABLE `qrs`;

-- CreateTable
CREATE TABLE `QR` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `qrCodeId` VARCHAR(191) NOT NULL,
    `data` TEXT NOT NULL,
    `encrypted` TEXT NOT NULL,
    `hash` TEXT NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `scanned` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `QR_qrCodeId_key`(`qrCodeId`),
    UNIQUE INDEX `QR_userId_key`(`userId`),
    INDEX `QR_qrCodeId_idx`(`qrCodeId`),
    INDEX `QR_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `QR` ADD CONSTRAINT `QR_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
