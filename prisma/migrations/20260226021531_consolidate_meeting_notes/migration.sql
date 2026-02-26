-- Delete orphan MeetingNote records where meeting_id is NULL before making it required
DELETE FROM "MeetingNote" WHERE "meeting_id" IS NULL;

-- AlterTable
ALTER TABLE "CounselorSettings" RENAME CONSTRAINT "UserIntegrationConfig_pkey" TO "CounselorSettings_pkey";

-- AlterTable
ALTER TABLE "Meeting" RENAME CONSTRAINT "ScheduledMeeting_pkey" TO "Meeting_pkey";

-- AlterTable
ALTER TABLE "MeetingNote" ADD COLUMN     "counselor_notes" TEXT,
ADD COLUMN     "recording_url" TEXT,
ADD COLUMN     "student_notes" TEXT,
ADD COLUMN     "summary_ai" TEXT,
ADD COLUMN     "transcript_url" TEXT,
ALTER COLUMN "meeting_id" SET NOT NULL,
ALTER COLUMN "updated_at" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "MeetingNote" ADD CONSTRAINT "MeetingNote_meeting_id_fkey" FOREIGN KEY ("meeting_id") REFERENCES "Meeting"("id") ON DELETE CASCADE ON UPDATE CASCADE;
