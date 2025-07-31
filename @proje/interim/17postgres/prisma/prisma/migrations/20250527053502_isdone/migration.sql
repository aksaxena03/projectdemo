/*
  Warnings:

  - Added the required column `isdone` to the `todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "todo" ADD COLUMN     "isdone" BOOLEAN NOT NULL;
