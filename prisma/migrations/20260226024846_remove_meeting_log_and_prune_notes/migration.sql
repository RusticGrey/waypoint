/*
  Warnings:

  - You are about to drop the column `duration_minutes` on the `MeetingNote` table. All the data in the column will be lost.
  - You are about to drop the column `meeting_date` on the `MeetingNote` table. All the data in the column will be lost.
  - You are about to drop the column `meeting_type` on the `MeetingNote` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `MeetingNote` table. All the data in the column will be lost.
  - You are about to drop the column `topics_discussed` on the `MeetingNote` table. All the data in the column will be lost.
  - You are about to drop the `MeetingLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MeetingLog" DROP CONSTRAINT "MeetingLog_student_id_fkey";

-- DropForeignKey
ALTER TABLE "MeetingLog" DROP CONSTRAINT "MeetingLog_user_id_fkey";

-- AlterTable
ALTER TABLE "MeetingNote" DROP COLUMN "duration_minutes",
DROP COLUMN "meeting_date",
DROP COLUMN "meeting_type",
DROP COLUMN "notes",
DROP COLUMN "topics_discussed";

-- DropTable
DROP TABLE "MeetingLog";
