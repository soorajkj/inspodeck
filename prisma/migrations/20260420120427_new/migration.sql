/*
  Warnings:

  - You are about to drop the column `image` on the `website` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `website` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `website` table. All the data in the column will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `font` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `page` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tech` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `website_category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `website_font` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `website_page` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `website_tech` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[baseUrl]` on the table `website` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `baseUrl` to the `website` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `website` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "website_category" DROP CONSTRAINT "website_category_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "website_category" DROP CONSTRAINT "website_category_websiteId_fkey";

-- DropForeignKey
ALTER TABLE "website_font" DROP CONSTRAINT "website_font_fontId_fkey";

-- DropForeignKey
ALTER TABLE "website_font" DROP CONSTRAINT "website_font_websiteId_fkey";

-- DropForeignKey
ALTER TABLE "website_page" DROP CONSTRAINT "website_page_pageId_fkey";

-- DropForeignKey
ALTER TABLE "website_page" DROP CONSTRAINT "website_page_websiteId_fkey";

-- DropForeignKey
ALTER TABLE "website_tech" DROP CONSTRAINT "website_tech_techId_fkey";

-- DropForeignKey
ALTER TABLE "website_tech" DROP CONSTRAINT "website_tech_websiteId_fkey";

-- DropIndex
DROP INDEX "website_url_key";

-- AlterTable
ALTER TABLE "website" ADD COLUMN "baseUrl" TEXT;
ALTER TABLE "website" ADD COLUMN "icon" TEXT;
ALTER TABLE "website" ADD COLUMN "name" TEXT;

-- Backfill data
UPDATE "website" SET "baseUrl" = split_part("url", '/', 3) WHERE "baseUrl" IS NULL;
UPDATE "website" SET "name" = "title" WHERE "name" IS NULL;

-- Set NOT NULL now that data is backfilled
ALTER TABLE "website" ALTER COLUMN "baseUrl" SET NOT NULL;
ALTER TABLE "website" ALTER COLUMN "name" SET NOT NULL;

-- Drop old columns
ALTER TABLE "website" DROP COLUMN "image";
ALTER TABLE "website" DROP COLUMN "title";
ALTER TABLE "website" DROP COLUMN "url";

-- DropTable
DROP TABLE "category";

-- DropTable
DROP TABLE "font";

-- DropTable
DROP TABLE "page";

-- DropTable
DROP TABLE "tech";

-- DropTable
DROP TABLE "website_category";

-- DropTable
DROP TABLE "website_font";

-- DropTable
DROP TABLE "website_page";

-- DropTable
DROP TABLE "website_tech";

-- CreateIndex
CREATE UNIQUE INDEX "website_baseUrl_key" ON "website"("baseUrl");

-- CreateIndex
CREATE INDEX "website_createdAt_idx" ON "website"("createdAt");
