-- CreateEnum
CREATE TYPE "ChangeType" AS ENUM ('Profile_Update', 'Goal_Progress', 'New_Addition', 'Improvement', 'Milestone');

-- CreateEnum
CREATE TYPE "ChangeAction" AS ENUM ('Created', 'Updated', 'Deleted', 'Completed');

-- CreateTable
CREATE TABLE "ChangeLog" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "change_type" "ChangeType" NOT NULL,
    "entity_type" TEXT NOT NULL,
    "entity_id" TEXT,
    "action" "ChangeAction" NOT NULL,
    "field_name" TEXT,
    "old_value" TEXT,
    "new_value" TEXT,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChangeLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ChangeLog_student_id_idx" ON "ChangeLog"("student_id");

-- CreateIndex
CREATE INDEX "ChangeLog_created_at_idx" ON "ChangeLog"("created_at");

-- AddForeignKey
ALTER TABLE "ChangeLog" ADD CONSTRAINT "ChangeLog_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
