/*
  Warnings:

  - You are about to drop the column `metrics` on the `Achievement` table. All the data in the column will be lost.
  - You are about to drop the column `verifiable_link` on the `Achievement` table. All the data in the column will be lost.
  - You are about to drop the column `grade_levels` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `action_items` on the `MeetingLog` table. All the data in the column will be lost.
  - You are about to drop the column `coordinator_id` on the `MeetingLog` table. All the data in the column will be lost.
  - You are about to drop the column `duration_minutes` on the `MeetingLog` table. All the data in the column will be lost.
  - You are about to drop the column `meeting_date` on the `MeetingLog` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `MeetingLog` table. All the data in the column will be lost.
  - You are about to drop the column `parent_email` on the `PersonalProfile` table. All the data in the column will be lost.
  - You are about to drop the column `parent_name` on the `PersonalProfile` table. All the data in the column will be lost.
  - You are about to drop the column `parent_phone` on the `PersonalProfile` table. All the data in the column will be lost.
  - You are about to drop the column `preferred_name` on the `PersonalProfile` table. All the data in the column will be lost.
  - You are about to drop the column `author_id` on the `ProfileComment` table. All the data in the column will be lost.
  - You are about to drop the column `comment_text` on the `ProfileComment` table. All the data in the column will be lost.
  - You are about to drop the column `is_private` on the `ProfileComment` table. All the data in the column will be lost.
  - You are about to drop the column `section` on the `ProfileComment` table. All the data in the column will be lost.
  - You are about to drop the column `student_id` on the `ProfileComment` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `ProfileComment` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `ProfileGoal` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `ProjectExperience` table. All the data in the column will be lost.
  - You are about to drop the column `mentor_email` on the `ProjectExperience` table. All the data in the column will be lost.
  - You are about to drop the column `mentor_name` on the `ProjectExperience` table. All the data in the column will be lost.
  - You are about to drop the column `outcomes` on the `ProjectExperience` table. All the data in the column will be lost.
  - You are about to drop the column `project_link` on the `ProjectExperience` table. All the data in the column will be lost.
  - You are about to drop the column `skills_learned` on the `ProjectExperience` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `ProjectExperience` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `ProjectExperience` table. All the data in the column will be lost.
  - You are about to drop the column `is_default` on the `Subject` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `TargetCollege` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `TargetCollege` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `TargetCollege` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `TargetCollege` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `TargetCollege` table. All the data in the column will be lost.
  - You are about to drop the column `section_scores` on the `TestScore` table. All the data in the column will be lost.
  - You are about to drop the column `test_name` on the `TestScore` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `TestScore` table. All the data in the column will be lost.
  - You are about to drop the column `credits` on the `Transcript` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `College` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[student_id,college_id]` on the table `CollegeApplication` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[student_id,course_name,grade_level,semester]` on the table `Transcript` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `grade_level` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `category` on the `Activity` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `log_entry` to the `MeetingLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `MeetingLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `ProfileComment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `ProfileComment` table without a default value. This is not possible if the table is not empty.
  - Made the column `current_value` on table `ProfileGoal` required. This step will fail if there are existing NULL values in that column.
  - Made the column `curriculum_type` on table `Subject` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `target_category` to the `TargetCollege` table without a default value. This is not possible if the table is not empty.
  - Made the column `composite_score` on table `TestScore` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "MeetingLog" DROP CONSTRAINT "MeetingLog_coordinator_id_fkey";

-- DropForeignKey
ALTER TABLE "MeetingLog" DROP CONSTRAINT "MeetingLog_student_id_fkey";

-- DropForeignKey
ALTER TABLE "ProfileComment" DROP CONSTRAINT "ProfileComment_author_id_fkey";

-- DropForeignKey
ALTER TABLE "ProfileComment" DROP CONSTRAINT "ProfileComment_student_id_fkey";

-- DropForeignKey
ALTER TABLE "ProfileOverride" DROP CONSTRAINT "ProfileOverride_overridden_by_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_primary_coordinator_id_fkey";

-- DropIndex
DROP INDEX "ChangeLog_created_at_idx";

-- DropIndex
DROP INDEX "ChangeLog_student_id_idx";

-- DropIndex
DROP INDEX "College_country_idx";

-- DropIndex
DROP INDEX "College_ranking_us_news_idx";

-- DropIndex
DROP INDEX "CollegeApplication_application_status_idx";

-- DropIndex
DROP INDEX "CollegeApplication_college_id_idx";

-- DropIndex
DROP INDEX "CollegeApplication_student_id_idx";

-- DropIndex
DROP INDEX "Meeting_coordinator_id_idx";

-- DropIndex
DROP INDEX "Meeting_meeting_date_idx";

-- DropIndex
DROP INDEX "Meeting_student_id_idx";

-- DropIndex
DROP INDEX "ProfileComment_author_id_idx";

-- DropIndex
DROP INDEX "ProfileComment_student_id_idx";

-- DropIndex
DROP INDEX "ProfileGoal_status_idx";

-- DropIndex
DROP INDEX "ProfileGoal_student_id_idx";

-- DropIndex
DROP INDEX "ProfileOverride_overridden_by_idx";

-- DropIndex
DROP INDEX "ProfileOverride_student_id_idx";

-- DropIndex
DROP INDEX "TargetCollege_college_id_idx";

-- DropIndex
DROP INDEX "TargetCollege_student_id_idx";

-- AlterTable
ALTER TABLE "Achievement" DROP COLUMN "metrics",
DROP COLUMN "verifiable_link";

-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "grade_levels",
ADD COLUMN     "grade_level" "GradeLevel" NOT NULL,
DROP COLUMN "category",
ADD COLUMN     "category" "ActivityCategory" NOT NULL;

-- AlterTable
ALTER TABLE "CollegeApplication" ALTER COLUMN "application_status" DROP DEFAULT;

-- AlterTable
ALTER TABLE "MeetingLog" DROP COLUMN "action_items",
DROP COLUMN "coordinator_id",
DROP COLUMN "duration_minutes",
DROP COLUMN "meeting_date",
DROP COLUMN "notes",
ADD COLUMN     "log_entry" TEXT NOT NULL,
ADD COLUMN     "meeting_id" TEXT,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PersonalProfile" DROP COLUMN "parent_email",
DROP COLUMN "parent_name",
DROP COLUMN "parent_phone",
DROP COLUMN "preferred_name";

-- AlterTable
ALTER TABLE "ProfileComment" DROP COLUMN "author_id",
DROP COLUMN "comment_text",
DROP COLUMN "is_private",
DROP COLUMN "section",
DROP COLUMN "student_id",
DROP COLUMN "updated_at",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProfileGoal" DROP COLUMN "updated_at",
ALTER COLUMN "current_value" SET NOT NULL,
ALTER COLUMN "priority" DROP NOT NULL,
ALTER COLUMN "priority" DROP DEFAULT;

-- AlterTable
ALTER TABLE "ProjectExperience" DROP COLUMN "location",
DROP COLUMN "mentor_email",
DROP COLUMN "mentor_name",
DROP COLUMN "outcomes",
DROP COLUMN "project_link",
DROP COLUMN "skills_learned",
DROP COLUMN "status",
DROP COLUMN "updated_at";

-- AlterTable
ALTER TABLE "Subject" DROP COLUMN "is_default",
ALTER COLUMN "curriculum_type" SET NOT NULL;

-- AlterTable
ALTER TABLE "TargetCollege" DROP COLUMN "category",
DROP COLUMN "created_at",
DROP COLUMN "notes",
DROP COLUMN "status",
DROP COLUMN "updated_at",
ADD COLUMN     "target_category" "TargetCategory" NOT NULL,
ALTER COLUMN "priority" DROP NOT NULL,
ALTER COLUMN "priority" DROP DEFAULT;

-- AlterTable
ALTER TABLE "TestScore" DROP COLUMN "section_scores",
DROP COLUMN "test_name",
DROP COLUMN "updated_at",
ADD COLUMN     "english_score" INTEGER,
ADD COLUMN     "math_score" INTEGER,
ADD COLUMN     "reading_writing_score" INTEGER,
ADD COLUMN     "science_score" INTEGER,
ALTER COLUMN "composite_score" SET NOT NULL;

-- AlterTable
ALTER TABLE "Transcript" DROP COLUMN "credits";

-- DropEnum
DROP TYPE "ProjectStatus";

-- CreateIndex
CREATE UNIQUE INDEX "College_name_key" ON "College"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CollegeApplication_student_id_college_id_key" ON "CollegeApplication"("student_id", "college_id");

-- CreateIndex
CREATE UNIQUE INDEX "Transcript_student_id_course_name_grade_level_semester_key" ON "Transcript"("student_id", "course_name", "grade_level", "semester");

-- AddForeignKey
ALTER TABLE "MeetingLog" ADD CONSTRAINT "MeetingLog_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetingLog" ADD CONSTRAINT "MeetingLog_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileOverride" ADD CONSTRAINT "ProfileOverride_overridden_by_fkey" FOREIGN KEY ("overridden_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileComment" ADD CONSTRAINT "ProfileComment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
