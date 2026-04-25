/*
  Warnings:

  - You are about to drop the `like` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `submission` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "like" DROP CONSTRAINT "like_userId_fkey";

-- DropForeignKey
ALTER TABLE "like" DROP CONSTRAINT "like_websiteId_fkey";

-- DropForeignKey
ALTER TABLE "submission" DROP CONSTRAINT "submission_reviewedById_fkey";

-- DropForeignKey
ALTER TABLE "submission" DROP CONSTRAINT "submission_submittedById_fkey";

-- AlterTable
ALTER TABLE "website" ADD COLUMN     "thumbnail" TEXT;

-- DropTable
DROP TABLE "like";

-- DropTable
DROP TABLE "submission";

-- DropEnum
DROP TYPE "SubmissionStatus";

-- CreateTable
CREATE TABLE "category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "websiteCategory" (
    "websiteId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "websiteCategory_pkey" PRIMARY KEY ("websiteId","categoryId")
);

-- CreateIndex
CREATE UNIQUE INDEX "category_name_key" ON "category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "category_slug_key" ON "category"("slug");

-- CreateIndex
CREATE INDEX "websiteCategory_categoryId_idx" ON "websiteCategory"("categoryId");

-- AddForeignKey
ALTER TABLE "websiteCategory" ADD CONSTRAINT "websiteCategory_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "website"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "websiteCategory" ADD CONSTRAINT "websiteCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
