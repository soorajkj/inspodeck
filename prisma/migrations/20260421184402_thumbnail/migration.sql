/*
  Warnings:

  - You are about to drop the `like` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `submission` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `thumbnail` to the `website` table without a default value. This is not possible if the table is not empty.
  - Made the column `icon` on table `website` required. This step will fail if there are existing NULL values in that column.

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
ALTER TABLE "website" ADD COLUMN     "thumbnail" TEXT NOT NULL,
ALTER COLUMN "icon" SET NOT NULL;

-- DropTable
DROP TABLE "like";

-- DropTable
DROP TABLE "submission";

-- DropEnum
DROP TYPE "SubmissionStatus";
