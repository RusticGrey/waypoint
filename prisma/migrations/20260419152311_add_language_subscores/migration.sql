/*
  Warnings:

  - You are about to drop the `AcademicProfile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AcademicProfile" DROP CONSTRAINT "AcademicProfile_student_id_fkey";

-- AlterTable
ALTER TABLE "TestScore" ADD COLUMN     "listening_score" INTEGER,
ADD COLUMN     "speaking_score" INTEGER,
ADD COLUMN     "writing_score" INTEGER;

-- DropTable
DROP TABLE "AcademicProfile";
