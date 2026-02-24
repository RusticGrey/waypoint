-- AlterEnum
BEGIN;
CREATE TYPE "UserRole_new" AS ENUM ('counselor', 'associate', 'student');
ALTER TABLE "User" ALTER COLUMN "role" TYPE "UserRole_new" USING (
  CASE 
    WHEN "role"::text = 'coordinator' THEN 'associate'::"UserRole_new" 
    ELSE "role"::text::"UserRole_new" 
  END
);
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "UserRole_old";
COMMIT;

-- Rename columns to preserve data
ALTER TABLE "Meeting" RENAME COLUMN "coordinator_id" TO "associate_id";
ALTER TABLE "Student" RENAME COLUMN "coordinator_id" TO "associate_id";
ALTER TABLE "Student" RENAME COLUMN "primary_coordinator_id" TO "primary_associate_id";

-- Rename table to preserve data
ALTER TABLE "CoordinatorAvailability" RENAME TO "AssociateAvailability";
ALTER TABLE "AssociateAvailability" RENAME COLUMN "coordinator_id" TO "associate_id";

-- Update constraints
-- Drop old foreign keys
ALTER TABLE "AssociateAvailability" DROP CONSTRAINT IF EXISTS "CoordinatorAvailability_coordinator_id_fkey";
ALTER TABLE "Meeting" DROP CONSTRAINT IF EXISTS "Meeting_coordinator_id_fkey";
ALTER TABLE "Student" DROP CONSTRAINT IF EXISTS "Student_coordinator_id_fkey";

-- Add new foreign keys
ALTER TABLE "Student" ADD CONSTRAINT "Student_associate_id_fkey" FOREIGN KEY ("associate_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Meeting" ADD CONSTRAINT "Meeting_associate_id_fkey" FOREIGN KEY ("associate_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AssociateAvailability" ADD CONSTRAINT "AssociateAvailability_associate_id_fkey" FOREIGN KEY ("associate_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Rename indices and primary keys
ALTER INDEX IF EXISTS "CoordinatorAvailability_coordinator_id_day_of_week_key" RENAME TO "AssociateAvailability_associate_id_day_of_week_key";
ALTER TABLE "AssociateAvailability" RENAME CONSTRAINT "CoordinatorAvailability_pkey" TO "AssociateAvailability_pkey";
