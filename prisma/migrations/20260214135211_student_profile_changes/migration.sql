-- AlterTable
ALTER TABLE "PersonalProfile" ADD COLUMN     "parent_email" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "parent_name" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "parent_phone" TEXT NOT NULL DEFAULT '';
