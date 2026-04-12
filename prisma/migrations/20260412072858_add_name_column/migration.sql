/*
  Warnings:

  - Added the required column `name` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN "name" TEXT NOT NULL DEFAULT 'temp';
UPDATE "user" SET "name" = 'default_name' WHERE "name" = 'temp';
ALTER TABLE "user" ALTER COLUMN "name" DROP DEFAULT;
