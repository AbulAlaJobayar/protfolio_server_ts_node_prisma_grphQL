/*
  Warnings:

  - You are about to drop the `exprience` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "exprience" DROP CONSTRAINT "exprience_userId_fkey";

-- DropTable
DROP TABLE "exprience";

-- CreateTable
CREATE TABLE "experience" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "experience_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "experience" ADD CONSTRAINT "experience_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
