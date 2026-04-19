/*
  Warnings:

  - You are about to drop the column `curriculum_type` on the `AcademicProfile` table. All the data in the column will be lost.
  - You are about to drop the column `grading_system_type` on the `AcademicProfile` table. All the data in the column will be lost.
  - You are about to drop the column `other_curriculum_name` on the `AcademicProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AcademicProfile" DROP COLUMN "curriculum_type",
DROP COLUMN "grading_system_type",
DROP COLUMN "other_curriculum_name";

-- AlterTable
ALTER TABLE "Transcript" ADD COLUMN     "curriculum_type" "CurriculumType",
ADD COLUMN     "grading_system_type" "GradingSystemType",
ADD COLUMN     "other_curriculum_name" TEXT;
