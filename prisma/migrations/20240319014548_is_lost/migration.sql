/*
  Warnings:

  - Added the required column `is_lost` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "items" ADD COLUMN     "is_lost" BOOLEAN NOT NULL;
