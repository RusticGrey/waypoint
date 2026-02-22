/*
  Warnings:

  - You are about to drop the `MeetingActionItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MeetingIntelligence` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MeetingRecording` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentProgressReport` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentProgressSnapshot` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MeetingActionItem" DROP CONSTRAINT "MeetingActionItem_assigned_by_host_id_fkey";

-- DropForeignKey
ALTER TABLE "MeetingActionItem" DROP CONSTRAINT "MeetingActionItem_scheduled_meeting_id_fkey";

-- DropForeignKey
ALTER TABLE "MeetingActionItem" DROP CONSTRAINT "MeetingActionItem_student_id_fkey";

-- DropForeignKey
ALTER TABLE "MeetingIntelligence" DROP CONSTRAINT "MeetingIntelligence_scheduled_meeting_id_fkey";

-- DropForeignKey
ALTER TABLE "MeetingRecording" DROP CONSTRAINT "MeetingRecording_scheduled_meeting_id_fkey";

-- DropForeignKey
ALTER TABLE "StudentProgressReport" DROP CONSTRAINT "StudentProgressReport_student_id_fkey";

-- DropForeignKey
ALTER TABLE "StudentProgressSnapshot" DROP CONSTRAINT "StudentProgressSnapshot_report_id_fkey";

-- DropTable
DROP TABLE "MeetingActionItem";

-- DropTable
DROP TABLE "MeetingIntelligence";

-- DropTable
DROP TABLE "MeetingRecording";

-- DropTable
DROP TABLE "StudentProgressReport";

-- DropTable
DROP TABLE "StudentProgressSnapshot";

-- DropEnum
DROP TYPE "ActionItemPriority";

-- DropEnum
DROP TYPE "ActionItemStatus";

-- DropEnum
DROP TYPE "ProcessingStatus";
