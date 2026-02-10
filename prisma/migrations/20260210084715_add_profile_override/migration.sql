-- CreateTable
CREATE TABLE "ProfileOverride" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "override_score" INTEGER NOT NULL,
    "override_reason" TEXT NOT NULL,
    "overridden_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProfileOverride_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProfileOverride_student_id_key" ON "ProfileOverride"("student_id");

-- CreateIndex
CREATE INDEX "ProfileOverride_student_id_idx" ON "ProfileOverride"("student_id");

-- CreateIndex
CREATE INDEX "ProfileOverride_overridden_by_idx" ON "ProfileOverride"("overridden_by");

-- AddForeignKey
ALTER TABLE "ProfileOverride" ADD CONSTRAINT "ProfileOverride_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileOverride" ADD CONSTRAINT "ProfileOverride_overridden_by_fkey" FOREIGN KEY ("overridden_by") REFERENCES "User"("id") ON UPDATE CASCADE;
