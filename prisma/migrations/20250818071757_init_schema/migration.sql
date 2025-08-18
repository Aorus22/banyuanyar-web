-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "public"."NewsStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "avatar" TEXT,
    "role" "public"."UserRole" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."VillageProfile" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT,
    "name" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VillageProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."GovernmentOfficial" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "photoUrl" TEXT,
    "bio" TEXT,
    "socialMedia" JSONB,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GovernmentOfficial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."NewsCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "color" TEXT NOT NULL DEFAULT '#000000',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NewsCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."News" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "authorId" INTEGER,
    "categoryId" INTEGER,
    "status" "public"."NewsStatus" NOT NULL DEFAULT 'DRAFT',
    "publishedAt" TIMESTAMP(3),
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Event" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "location" TEXT,
    "organizer" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Gallery" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "eventDate" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Gallery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Document" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "filename" TEXT NOT NULL,
    "fileSize" BIGINT,
    "fileType" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TourismCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TourismCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TourismPackage" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL(10,2),
    "duration" TEXT,
    "maxParticipants" INTEGER,
    "categoryId" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TourismPackage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TourismHouse" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "location" TEXT,
    "contactPerson" TEXT,
    "contactPhone" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TourismHouse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Umkm" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "ownerName" TEXT,
    "description" TEXT,
    "address" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "socialMedia" JSONB,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Umkm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UmkmProduct" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "unit" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "umkmId" INTEGER NOT NULL,

    CONSTRAINT "UmkmProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Media" (
    "id" SERIAL NOT NULL,
    "description" TEXT,
    "fileName" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" INTEGER NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "public"."User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VillageProfile_key_key" ON "public"."VillageProfile"("key");

-- CreateIndex
CREATE UNIQUE INDEX "NewsCategory_slug_key" ON "public"."NewsCategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "News_slug_key" ON "public"."News"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "TourismCategory_name_key" ON "public"."TourismCategory"("name");

-- CreateIndex
CREATE INDEX "Media_entityType_entityId_idx" ON "public"."Media"("entityType", "entityId");

-- AddForeignKey
ALTER TABLE "public"."News" ADD CONSTRAINT "News_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."News" ADD CONSTRAINT "News_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."NewsCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TourismPackage" ADD CONSTRAINT "TourismPackage_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."TourismCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UmkmProduct" ADD CONSTRAINT "UmkmProduct_umkmId_fkey" FOREIGN KEY ("umkmId") REFERENCES "public"."Umkm"("id") ON DELETE CASCADE ON UPDATE CASCADE;
