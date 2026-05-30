/*
  Warnings:

  - You are about to drop the `generation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "generation";

-- CreateTable
CREATE TABLE "Generation" (
    "id" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Generation_pkey" PRIMARY KEY ("id")
);
