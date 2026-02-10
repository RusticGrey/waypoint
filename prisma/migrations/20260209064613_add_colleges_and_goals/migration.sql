-- CreateEnum
CREATE TYPE "GoalType" AS ENUM ('Academic', 'Testing', 'Activity', 'Achievement', 'Project', 'Other');

-- CreateEnum
CREATE TYPE "GoalStatus" AS ENUM ('Not_Started', 'In_Progress', 'Completed', 'Deferred', 'Cancelled');

-- CreateEnum
CREATE TYPE "TargetCategory" AS ENUM ('Reach', 'Match', 'Safety');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('Not_Started', 'Planning', 'Researching', 'Preparing', 'In_Progress', 'Submitted', 'Accepted', 'Rejected', 'Waitlisted', 'Deferred', 'Withdrawn');

-- CreateTable
CREATE TABLE "College" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'United States',
    "acceptance_rate" DOUBLE PRECISION,
    "avg_gpa" DOUBLE PRECISION,
    "avg_sat" INTEGER,
    "avg_act" INTEGER,
    "ranking_us_news" INTEGER,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "College_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TargetCollege" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "college_id" TEXT NOT NULL,
    "category" "TargetCategory" NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 5,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'Planning',
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TargetCollege_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfileGoal" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "goal_type" "GoalType" NOT NULL,
    "category" TEXT NOT NULL,
    "target_value" TEXT NOT NULL,
    "current_value" TEXT,
    "deadline" TIMESTAMP(3),
    "status" "GoalStatus" NOT NULL DEFAULT 'Not_Started',
    "priority" INTEGER NOT NULL DEFAULT 5,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "completed_at" TIMESTAMP(3),

    CONSTRAINT "ProfileGoal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "College_country_idx" ON "College"("country");

-- CreateIndex
CREATE INDEX "College_ranking_us_news_idx" ON "College"("ranking_us_news");

-- CreateIndex
CREATE INDEX "TargetCollege_student_id_idx" ON "TargetCollege"("student_id");

-- CreateIndex
CREATE INDEX "TargetCollege_college_id_idx" ON "TargetCollege"("college_id");

-- CreateIndex
CREATE UNIQUE INDEX "TargetCollege_student_id_college_id_key" ON "TargetCollege"("student_id", "college_id");

-- CreateIndex
CREATE INDEX "ProfileGoal_student_id_idx" ON "ProfileGoal"("student_id");

-- CreateIndex
CREATE INDEX "ProfileGoal_status_idx" ON "ProfileGoal"("status");

-- AddForeignKey
ALTER TABLE "TargetCollege" ADD CONSTRAINT "TargetCollege_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TargetCollege" ADD CONSTRAINT "TargetCollege_college_id_fkey" FOREIGN KEY ("college_id") REFERENCES "College"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileGoal" ADD CONSTRAINT "ProfileGoal_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
