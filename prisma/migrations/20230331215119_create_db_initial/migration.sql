-- CreateTable
CREATE TABLE "subscribedUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "subscribedUser_email_key" ON "subscribedUser"("email");
