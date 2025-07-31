/*
  Warnings:

  - Made the column `city` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "user" ALTER COLUMN "city" SET NOT NULL;

-- CreateTable
CREATE TABLE "todo" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "todo" TEXT NOT NULL,

    CONSTRAINT "todo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "todo_todo_key" ON "todo"("todo");
