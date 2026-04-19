-- AlterTable
ALTER TABLE "AcademicProfile" ADD COLUMN     "other_curriculum_name" TEXT;

-- AlterTable
ALTER TABLE "PersonalProfile" ADD COLUMN     "citizenship" TEXT,
ADD COLUMN     "residency" TEXT;

-- AlterTable
ALTER TABLE "TestScore" ADD COLUMN     "comments" TEXT,
ADD COLUMN     "test_name" TEXT;
