-- AlterTable
ALTER TABLE "CounselorSettings" ADD COLUMN     "buffer_time" INTEGER NOT NULL DEFAULT 15,
ADD COLUMN     "default_meeting_duration" INTEGER NOT NULL DEFAULT 30;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "notifications_enabled" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "timezone" TEXT NOT NULL DEFAULT 'UTC';
