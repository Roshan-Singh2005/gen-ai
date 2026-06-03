-- CreateTable
CREATE TABLE "blackListToken" (
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "blackListToken_token_key" ON "blackListToken"("token");
