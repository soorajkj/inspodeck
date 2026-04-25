ALTER TABLE "website" ADD COLUMN "baseUrl" TEXT;

UPDATE "website"
SET "baseUrl" = split_part("url", '/', 3);

ALTER TABLE "website"
ALTER COLUMN "baseUrl" SET NOT NULL;