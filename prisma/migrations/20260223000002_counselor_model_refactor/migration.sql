-- 1. Create Counselor table
CREATE TABLE "Counselor" (
    "user_id" TEXT NOT NULL,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Counselor_pkey" PRIMARY KEY ("user_id")
);

-- 2. Populate Counselor table from existing Users with counselor role
INSERT INTO "Counselor" ("user_id", "is_admin")
SELECT "id", "is_admin" FROM "User" WHERE "role" = 'counselor';

-- 3. Rename ScheduledMeeting to Meeting (Logistics)
-- First, drop the old Meeting table (we will recreate it as MeetingNote)
-- Wait, let's rename them to avoid name collisions.
ALTER TABLE "Meeting" RENAME TO "MeetingNote_old";
ALTER TABLE "ScheduledMeeting" RENAME TO "Meeting";

-- 4. Recreate MeetingNote table with the right structure and migrate data from MeetingNote_old
CREATE TABLE "MeetingNote" (
    "id" TEXT NOT NULL,
    "meeting_id" TEXT, -- Will link to Meeting later
    "student_id" TEXT NOT NULL,
    "counselor_id" TEXT NOT NULL,
    "meeting_date" TIMESTAMP(3) NOT NULL,
    "duration_minutes" INTEGER,
    "meeting_type" "MeetingType" NOT NULL DEFAULT 'Regular',
    "topics_discussed" TEXT[],
    "notes" TEXT,
    "action_items" TEXT[],
    "next_meeting_date" TIMESTAMP(3),
    "student_mood" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MeetingNote_pkey" PRIMARY KEY ("id")
);

-- Migrate data from MeetingNote_old to MeetingNote
-- Note: 'counselor_id' in MeetingNote_old was already renamed from 'associate_id' in a previous migration.
INSERT INTO "MeetingNote" ("id", "student_id", "counselor_id", "meeting_date", "duration_minutes", "meeting_type", "topics_discussed", "notes", "action_items", "next_meeting_date", "student_mood", "created_at", "updated_at")
SELECT "id", "student_id", "counselor_id", "meeting_date", "duration_minutes", "meeting_type", "topics_discussed", "notes", "action_items", "next_meeting_date", "student_mood", "created_at", "updated_at" 
FROM "MeetingNote_old";

DROP TABLE "MeetingNote_old";

-- 5. Rename UserIntegrationConfig to CounselorSettings
ALTER TABLE "UserIntegrationConfig" RENAME TO "CounselorSettings";

-- 6. Update Constraints and Foreign Keys
-- User table cleanup
ALTER TABLE "User" DROP COLUMN "is_admin";

-- Counselor relation
ALTER TABLE "Counselor" ADD CONSTRAINT "Counselor_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CounselorSettings relation
ALTER TABLE "CounselorSettings" DROP CONSTRAINT IF EXISTS "UserIntegrationConfig_user_id_fkey";
ALTER TABLE "CounselorSettings" ADD CONSTRAINT "CounselorSettings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Counselor"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CounselorAvailability relation
ALTER TABLE "CounselorAvailability" DROP CONSTRAINT IF EXISTS "CounselorAvailability_counselor_id_fkey";
ALTER TABLE "CounselorAvailability" ADD CONSTRAINT "CounselorAvailability_counselor_id_fkey" FOREIGN KEY ("counselor_id") REFERENCES "Counselor"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Student relation
ALTER TABLE "Student" DROP CONSTRAINT IF EXISTS "Student_counselor_id_fkey";
ALTER TABLE "Student" ADD CONSTRAINT "Student_counselor_id_fkey" FOREIGN KEY ("counselor_id") REFERENCES "Counselor"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Meeting (formerly ScheduledMeeting) relations
-- Note: host_id in ScheduledMeeting (now Meeting) already points to User.id. 
-- We should update it to point to Counselor.user_id if we want strictness, 
-- but technically they are the same UUID.
ALTER TABLE "Meeting" DROP CONSTRAINT IF EXISTS "ScheduledMeeting_host_id_fkey";
ALTER TABLE "Meeting" ADD CONSTRAINT "Meeting_host_id_fkey" FOREIGN KEY ("host_id") REFERENCES "Counselor"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Meeting" DROP CONSTRAINT IF EXISTS "ScheduledMeeting_student_id_fkey";
ALTER TABLE "Meeting" ADD CONSTRAINT "Meeting_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- MeetingRequest relations
ALTER TABLE "MeetingRequest" DROP CONSTRAINT IF EXISTS "MeetingRequest_host_id_fkey";
ALTER TABLE "MeetingRequest" ADD CONSTRAINT "MeetingRequest_host_id_fkey" FOREIGN KEY ("host_id") REFERENCES "Counselor"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "MeetingRequest" DROP CONSTRAINT IF EXISTS "MeetingRequest_scheduled_meeting_id_fkey";
ALTER TABLE "MeetingRequest" ADD CONSTRAINT "MeetingRequest_scheduled_meeting_id_fkey" FOREIGN KEY ("scheduled_meeting_id") REFERENCES "Meeting"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- MeetingNote relations
ALTER TABLE "MeetingNote" ADD CONSTRAINT "MeetingNote_counselor_id_fkey" FOREIGN KEY ("counselor_id") REFERENCES "Counselor"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "MeetingNote" ADD CONSTRAINT "MeetingNote_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Add index
CREATE UNIQUE INDEX "MeetingNote_meeting_id_key" ON "MeetingNote"("meeting_id");

-- ProfileOverride & Comment
ALTER TABLE "ProfileOverride" DROP CONSTRAINT IF EXISTS "ProfileOverride_overridden_by_fkey";
ALTER TABLE "ProfileOverride" ADD CONSTRAINT "ProfileOverride_overridden_by_fkey" FOREIGN KEY ("overridden_by") REFERENCES "Counselor"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "ProfileComment" DROP CONSTRAINT IF EXISTS "ProfileComment_user_id_fkey";
ALTER TABLE "ProfileComment" ADD CONSTRAINT "ProfileComment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Counselor"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
