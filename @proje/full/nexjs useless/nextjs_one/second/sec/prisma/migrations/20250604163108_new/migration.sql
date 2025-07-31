-- CreateTable
CREATE TABLE "username" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "username_username_key" ON "username"("username");
