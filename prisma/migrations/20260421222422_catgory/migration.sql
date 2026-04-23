-- CreateTable
CREATE TABLE "category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
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
CREATE INDEX "websiteCategory_categoryId_idx" ON "websiteCategory"("categoryId");

-- AddForeignKey
ALTER TABLE "websiteCategory" ADD CONSTRAINT "websiteCategory_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "website"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "websiteCategory" ADD CONSTRAINT "websiteCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
