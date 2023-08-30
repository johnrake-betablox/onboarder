/*
  Warnings:

  - Added the required column `category` to the `Step` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Step" ADD COLUMN     "category" TEXT NOT NULL;
