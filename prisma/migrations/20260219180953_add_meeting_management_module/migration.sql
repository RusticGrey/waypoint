-- CreateEnum
CREATE TYPE "MeetingRequestStatus" AS ENUM ('Pending', 'Accepted', 'Declined', 'ChangeSuggested', 'Cancelled');

-- CreateEnum
CREATE TYPE "ScheduledMeetingStatus" AS ENUM ('Upcoming', 'InProgress', 'Completed', 'Cancelled', 'NoShow');

-- CreateEnum
CREATE TYPE "ProcessingStatus" AS ENUM ('Pending', 'Processing', 'Completed', 'Failed');

-- CreateEnum
CREATE TYPE "ActionItemPriority" AS ENUM ('Low', 'Medium', 'High', 'Critical');

-- CreateEnum
CREATE TYPE "ActionItemStatus" AS ENUM ('Open', 'InProgress', 'Completed', 'Cancelled');

-- CreateEnum
CREATE TYPE "PreferredConference" AS ENUM ('Zoom', 'GoogleMeet');

-- CreateTable
CREATE TABLE "ScheduledMeeting" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "host_id" TEXT NOT NULL,
    "meeting_type" "MeetingType" NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "timezone" TEXT NOT NULL DEFAULT 'UTC',
    "status" "ScheduledMeetingStatus" NOT NULL DEFAULT 'Upcoming',
    "conference_platform" "PreferredConference",
    "conference_id" TEXT,
    "conference_join_url" TEXT,
    "conference_host_url" TEXT,
    "google_calendar_event_id" TEXT,
    "agenda" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ScheduledMeeting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MeetingRequest" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "host_id" TEXT NOT NULL,
    "requested_start" TIMESTAMP(3) NOT NULL,
    "requested_end" TIMESTAMP(3) NOT NULL,
    "meeting_type" "MeetingType" NOT NULL,
    "student_note" TEXT,
    "status" "MeetingRequestStatus" NOT NULL DEFAULT 'Pending',
    "host_note" TEXT,
    "suggested_start" TIMESTAMP(3),
    "suggested_end" TIMESTAMP(3),
    "scheduled_meeting_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MeetingRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserIntegrationConfig" (
    "user_id" TEXT NOT NULL,
    "preferred_conference" "PreferredConference" NOT NULL DEFAULT 'Zoom',
    "google_access_token" TEXT,
    "google_refresh_token" TEXT,
    "google_token_expiry" TIMESTAMP(3),
    "google_calendar_id" TEXT,
    "google_connected" BOOLEAN NOT NULL DEFAULT false,
    "zoom_access_token" TEXT,
    "zoom_refresh_token" TEXT,
    "zoom_token_expiry" TIMESTAMP(3),
    "zoom_user_id" TEXT,
    "zoom_connected" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserIntegrationConfig_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "MeetingRecording" (
    "id" TEXT NOT NULL,
    "scheduled_meeting_id" TEXT NOT NULL,
    "zoom_recording_id" TEXT,
    "vtt_storage_url" TEXT,
    "raw_transcript" TEXT,
    "duration_seconds" INTEGER,
    "transcription_status" "ProcessingStatus" NOT NULL DEFAULT 'Pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MeetingRecording_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MeetingIntelligence" (
    "id" TEXT NOT NULL,
    "scheduled_meeting_id" TEXT NOT NULL,
    "llm_provider" TEXT NOT NULL DEFAULT 'claude-sonnet',
    "summary" TEXT,
    "detailed_notes" TEXT,
    "generation_status" "ProcessingStatus" NOT NULL DEFAULT 'Pending',
    "generated_at" TIMESTAMP(3),
    "reviewed_by_host_id" TEXT,
    "reviewed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MeetingIntelligence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MeetingActionItem" (
    "id" TEXT NOT NULL,
    "scheduled_meeting_id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "assigned_by_host_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "due_date" TIMESTAMP(3),
    "priority" "ActionItemPriority" NOT NULL DEFAULT 'Medium',
    "status" "ActionItemStatus" NOT NULL DEFAULT 'Open',
    "completed_at" TIMESTAMP(3),
    "student_note" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MeetingActionItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentProgressReport" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "overall_summary" TEXT,
    "academic_progress" TEXT,
    "extracurricular_progress" TEXT,
    "college_readiness" TEXT,
    "action_plan" TEXT,
    "counselor_observations" TEXT,
    "llm_provider" TEXT,
    "last_generated_at" TIMESTAMP(3),
    "last_updated_by_host_id" TEXT,
    "version" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentProgressReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentProgressSnapshot" (
    "id" TEXT NOT NULL,
    "report_id" TEXT NOT NULL,
    "snapshot_content" TEXT NOT NULL,
    "triggered_by" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StudentProgressSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MeetingRequest_scheduled_meeting_id_key" ON "MeetingRequest"("scheduled_meeting_id");

-- CreateIndex
CREATE UNIQUE INDEX "MeetingRecording_scheduled_meeting_id_key" ON "MeetingRecording"("scheduled_meeting_id");

-- CreateIndex
CREATE UNIQUE INDEX "MeetingIntelligence_scheduled_meeting_id_key" ON "MeetingIntelligence"("scheduled_meeting_id");

-- CreateIndex
CREATE UNIQUE INDEX "StudentProgressReport_student_id_key" ON "StudentProgressReport"("student_id");

-- AddForeignKey
ALTER TABLE "ScheduledMeeting" ADD CONSTRAINT "ScheduledMeeting_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduledMeeting" ADD CONSTRAINT "ScheduledMeeting_host_id_fkey" FOREIGN KEY ("host_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetingRequest" ADD CONSTRAINT "MeetingRequest_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetingRequest" ADD CONSTRAINT "MeetingRequest_host_id_fkey" FOREIGN KEY ("host_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetingRequest" ADD CONSTRAINT "MeetingRequest_scheduled_meeting_id_fkey" FOREIGN KEY ("scheduled_meeting_id") REFERENCES "ScheduledMeeting"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserIntegrationConfig" ADD CONSTRAINT "UserIntegrationConfig_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetingRecording" ADD CONSTRAINT "MeetingRecording_scheduled_meeting_id_fkey" FOREIGN KEY ("scheduled_meeting_id") REFERENCES "ScheduledMeeting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetingIntelligence" ADD CONSTRAINT "MeetingIntelligence_scheduled_meeting_id_fkey" FOREIGN KEY ("scheduled_meeting_id") REFERENCES "ScheduledMeeting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetingActionItem" ADD CONSTRAINT "MeetingActionItem_scheduled_meeting_id_fkey" FOREIGN KEY ("scheduled_meeting_id") REFERENCES "ScheduledMeeting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetingActionItem" ADD CONSTRAINT "MeetingActionItem_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetingActionItem" ADD CONSTRAINT "MeetingActionItem_assigned_by_host_id_fkey" FOREIGN KEY ("assigned_by_host_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentProgressReport" ADD CONSTRAINT "StudentProgressReport_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentProgressSnapshot" ADD CONSTRAINT "StudentProgressSnapshot_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "StudentProgressReport"("id") ON DELETE CASCADE ON UPDATE CASCADE;
