-- CreateEnum
CREATE TYPE "StudentPhase" AS ENUM ('Onboarding', 'Profile_Building', 'College_Applications');

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "phase" "StudentPhase" NOT NULL DEFAULT 'Onboarding';
