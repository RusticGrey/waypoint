-- CreateTable
CREATE TABLE "CollegeApplication" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "college_id" TEXT NOT NULL,
    "target_category" "TargetCategory" NOT NULL,
    "application_status" "ApplicationStatus" NOT NULL DEFAULT 'Not_Started',
    "application_deadline" TIMESTAMP(3),
    "decision_deadline" TIMESTAMP(3),
    "essay_status" TEXT NOT NULL DEFAULT 'Not Started',
    "supplements_status" TEXT NOT NULL DEFAULT 'Not Started',
    "recommendation_status" TEXT NOT NULL DEFAULT 'Not Requested',
    "test_scores_sent" BOOLEAN NOT NULL DEFAULT false,
    "application_portal_link" TEXT,
    "notes" TEXT,
    "decision_received_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CollegeApplication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CollegeApplication_student_id_idx" ON "CollegeApplication"("student_id");

-- CreateIndex
CREATE INDEX "CollegeApplication_college_id_idx" ON "CollegeApplication"("college_id");

-- CreateIndex
CREATE INDEX "CollegeApplication_application_status_idx" ON "CollegeApplication"("application_status");

-- AddForeignKey
ALTER TABLE "CollegeApplication" ADD CONSTRAINT "CollegeApplication_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollegeApplication" ADD CONSTRAINT "CollegeApplication_college_id_fkey" FOREIGN KEY ("college_id") REFERENCES "College"("id") ON DELETE CASCADE ON UPDATE CASCADE;