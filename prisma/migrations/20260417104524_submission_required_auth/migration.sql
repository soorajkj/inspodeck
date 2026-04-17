/*
  Warnings:

  - Made the column `submittedById` on table `submission` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "submission" DROP CONSTRAINT "submission_submittedById_fkey";

-- AlterTable
ALTER TABLE "submission" ALTER COLUMN "submittedById" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "submission" ADD CONSTRAINT "submission_submittedById_fkey" FOREIGN KEY ("submittedById") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
