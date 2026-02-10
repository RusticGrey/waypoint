-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('counselor', 'coordinator', 'student');

-- CreateEnum
CREATE TYPE "GradeLevel" AS ENUM ('ninth', 'tenth', 'eleventh', 'twelfth');

-- CreateEnum
CREATE TYPE "CurriculumType" AS ENUM ('CBSE', 'ICSE', 'IB', 'CAIE', 'State_Board', 'US_High_School', 'Other');

-- CreateEnum
CREATE TYPE "GradingSystemType" AS ENUM ('Marks_Out_Of_100', 'Percentage', 'IB_Scale', 'Letter_Grade', 'Other');

-- CreateEnum
CREATE TYPE "Semester" AS ENUM ('Fall', 'Spring', 'Full_Year');

-- CreateEnum
CREATE TYPE "HonorsLevel" AS ENUM ('Standard', 'Honors', 'AP', 'IB_HL', 'IB_SL');

-- CreateEnum
CREATE TYPE "AchievementType" AS ENUM ('Award_Honor', 'Competition', 'Leadership', 'Social_Impact', 'Extracurricular');

-- CreateEnum
CREATE TYPE "RecognitionLevel" AS ENUM ('School', 'Inter_School', 'District', 'City', 'State', 'National', 'International');

-- CreateEnum
CREATE TYPE "ExperienceType" AS ENUM ('Academic_Project', 'Independent_Project', 'Research', 'Internship', 'Summer_Program', 'Work_Experience');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('Completed', 'In_Progress', 'Planned');

-- CreateEnum
CREATE TYPE "ActivityCategory" AS ENUM ('Academic', 'Arts_Music', 'Athletics', 'Community_Service', 'Cultural', 'Leadership', 'Other');


-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo_url" TEXT,
    "primary_color" TEXT NOT NULL DEFAULT '#3B82F6',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "organization_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "user_id" TEXT NOT NULL,
    "graduation_year" INTEGER NOT NULL,
    "current_grade" "GradeLevel" NOT NULL,
    "primary_coordinator_id" TEXT,
    "profile_completion_pct" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "PersonalProfile" (
    "student_id" TEXT NOT NULL,
    "preferred_name" TEXT,
    "date_of_birth" TIMESTAMP(3),
    "phone" TEXT,
    "current_school" TEXT,
    "school_location" TEXT,
    "parent_name" TEXT,
    "parent_email" TEXT,
    "parent_phone" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PersonalProfile_pkey" PRIMARY KEY ("student_id")
);

-- CreateTable
CREATE TABLE "AcademicProfile" (
    "student_id" TEXT NOT NULL,
    "curriculum_type" "CurriculumType" NOT NULL,
    "grading_system_type" "GradingSystemType" NOT NULL,
    "current_gpa" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AcademicProfile_pkey" PRIMARY KEY ("student_id")
);

-- CreateTable
CREATE TABLE "Transcript" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "course_name" TEXT NOT NULL,
    "grade_level" "GradeLevel" NOT NULL,
    "semester" "Semester" NOT NULL,
    "grade_value" TEXT NOT NULL,
    "credits" DOUBLE PRECISION,
    "honors_level" "HonorsLevel" NOT NULL DEFAULT 'Standard',
    "is_board_exam" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transcript_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "activity_name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "role" TEXT,
    "grade_levels" JSONB NOT NULL,
    "hours_per_week" INTEGER NOT NULL,
    "weeks_per_year" INTEGER NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestScore" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "test_type" TEXT NOT NULL,
    "test_name" TEXT NOT NULL,
    "test_date" TIMESTAMP(3) NOT NULL,
    "composite_score" INTEGER,
    "section_scores" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TestScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Achievement" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "achievement_type" "AchievementType" NOT NULL,
    "title" TEXT NOT NULL,
    "organization" TEXT,
    "grade_level" "GradeLevel",
    "date_achieved" TIMESTAMP(3),
    "description" TEXT,
    "metrics" TEXT,
    "recognition_level" "RecognitionLevel",
    "verifiable_link" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectExperience" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "experience_type" "ExperienceType" NOT NULL,
    "title" TEXT NOT NULL,
    "organization" TEXT,
    "location" TEXT,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "is_ongoing" BOOLEAN NOT NULL DEFAULT false,
    "role_title" TEXT,
    "description" TEXT,
    "outcomes" TEXT,
    "skills_learned" JSONB,
    "project_link" TEXT,
    "mentor_name" TEXT,
    "mentor_email" TEXT,
    "status" "ProjectStatus" NOT NULL DEFAULT 'Completed',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectExperience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MeetingLog" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "coordinator_id" TEXT NOT NULL,
    "meeting_date" TIMESTAMP(3) NOT NULL,
    "duration_minutes" INTEGER NOT NULL,
    "notes" TEXT NOT NULL,
    "action_items" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MeetingLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" TEXT NOT NULL,
    "curriculum_type" "CurriculumType",
    "subject_name" TEXT NOT NULL,
    "is_default" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- -- CreateTable
-- CREATE TABLE "ActivityCategory" (
--     "id" TEXT NOT NULL,
--     "category_name" TEXT NOT NULL,
--     "is_default" BOOLEAN NOT NULL DEFAULT false,

--     CONSTRAINT "ActivityCategory_pkey" PRIMARY KEY ("id")
-- );

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_subject_name_curriculum_type_key" ON "Subject"("subject_name", "curriculum_type");

-- -- CreateIndex
-- CREATE UNIQUE INDEX "ActivityCategory_category_name_key" ON "ActivityCategory"("category_name");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_primary_coordinator_id_fkey" FOREIGN KEY ("primary_coordinator_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalProfile" ADD CONSTRAINT "PersonalProfile_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademicProfile" ADD CONSTRAINT "AcademicProfile_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transcript" ADD CONSTRAINT "Transcript_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestScore" ADD CONSTRAINT "TestScore_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Achievement" ADD CONSTRAINT "Achievement_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectExperience" ADD CONSTRAINT "ProjectExperience_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetingLog" ADD CONSTRAINT "MeetingLog_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetingLog" ADD CONSTRAINT "MeetingLog_coordinator_id_fkey" FOREIGN KEY ("coordinator_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
