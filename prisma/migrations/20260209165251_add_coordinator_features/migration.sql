-- CreateEnum
CREATE TYPE "MeetingType" AS ENUM ('Initial', 'Regular', 'Check_In', 'Goal_Review', 'Application_Review', 'Crisis', 'Final');

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "coordinator_id" TEXT;

-- CreateTable
CREATE TABLE "Meeting" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "coordinator_id" TEXT NOT NULL,
    "meeting_date" TIMESTAMP(3) NOT NULL,
    "duration_minutes" INTEGER,
    "meeting_type" "MeetingType" NOT NULL DEFAULT 'Regular',
    "topics_discussed" TEXT[],
    "notes" TEXT,
    "action_items" TEXT[],
    "next_meeting_date" TIMESTAMP(3),
    "student_mood" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Meeting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfileComment" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "comment_text" TEXT NOT NULL,
    "section" TEXT,
    "is_private" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProfileComment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Meeting_student_id_idx" ON "Meeting"("student_id");

-- CreateIndex
CREATE INDEX "Meeting_coordinator_id_idx" ON "Meeting"("coordinator_id");

-- CreateIndex
CREATE INDEX "Meeting_meeting_date_idx" ON "Meeting"("meeting_date");

-- CreateIndex
CREATE INDEX "ProfileComment_student_id_idx" ON "ProfileComment"("student_id");

-- CreateIndex
CREATE INDEX "ProfileComment_author_id_idx" ON "ProfileComment"("author_id");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_coordinator_id_fkey" FOREIGN KEY ("coordinator_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meeting" ADD CONSTRAINT "Meeting_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meeting" ADD CONSTRAINT "Meeting_coordinator_id_fkey" FOREIGN KEY ("coordinator_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileComment" ADD CONSTRAINT "ProfileComment_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileComment" ADD CONSTRAINT "ProfileComment_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
