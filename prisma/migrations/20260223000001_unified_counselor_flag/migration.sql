-- Add isAdmin column first
ALTER TABLE "User" ADD COLUMN "is_admin" BOOLEAN NOT NULL DEFAULT false;

-- Update isAdmin flag based on current counselor role
UPDATE "User" SET "is_admin" = true WHERE "role" = 'counselor';

-- AlterEnum (Merge associate into counselor)
BEGIN;
CREATE TYPE "UserRole_new" AS ENUM ('counselor', 'student');
ALTER TABLE "User" ALTER COLUMN "role" TYPE "UserRole_new" USING (
  CASE 
    WHEN "role"::text = 'associate' THEN 'counselor'::"UserRole_new" 
    ELSE "role"::text::"UserRole_new" 
  END
);
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "UserRole_old";
COMMIT;

-- Rename columns to preserve data
ALTER TABLE "Meeting" RENAME COLUMN "associate_id" TO "counselor_id";
ALTER TABLE "Student" RENAME COLUMN "associate_id" TO "counselor_id";
ALTER TABLE "Student" RENAME COLUMN "primary_associate_id" TO "primary_counselor_id";

-- Rename table to preserve data
ALTER TABLE "AssociateAvailability" RENAME TO "CounselorAvailability";
ALTER TABLE "CounselorAvailability" RENAME COLUMN "associate_id" TO "counselor_id";

-- Update constraints
ALTER TABLE "CounselorAvailability" DROP CONSTRAINT IF EXISTS "AssociateAvailability_associate_id_fkey";
ALTER TABLE "Meeting" DROP CONSTRAINT IF EXISTS "Meeting_associate_id_fkey";
ALTER TABLE "Student" DROP CONSTRAINT IF EXISTS "Student_associate_id_fkey";

-- Add new foreign keys
ALTER TABLE "Student" ADD CONSTRAINT "Student_counselor_id_fkey" FOREIGN KEY ("counselor_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Meeting" ADD CONSTRAINT "Meeting_counselor_id_fkey" FOREIGN KEY ("counselor_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "CounselorAvailability" ADD CONSTRAINT "CounselorAvailability_counselor_id_fkey" FOREIGN KEY ("counselor_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Rename indices and primary keys
ALTER INDEX IF EXISTS "AssociateAvailability_associate_id_day_of_week_key" RENAME TO "CounselorAvailability_counselor_id_day_of_week_key";
ALTER TABLE "CounselorAvailability" RENAME CONSTRAINT "AssociateAvailability_pkey" TO "CounselorAvailability_pkey";
