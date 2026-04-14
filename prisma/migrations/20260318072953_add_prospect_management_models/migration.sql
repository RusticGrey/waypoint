-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('Confirmed', 'Cancelled', 'NoShow', 'Completed');

-- CreateTable
CREATE TABLE "ProspectEvent" (
    "id" TEXT NOT NULL,
    "organization_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "location" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "header_text" TEXT DEFAULT 'YOUR GLOBAL FUTURE STARTS HERE',
    "subheader_text" TEXT DEFAULT 'Schedule your FREE 30-minute consultation',
    "success_message" TEXT,
    "footer_content" JSONB,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProspectEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProspectEventCounselor" (
    "id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "counselor_id" TEXT NOT NULL,

    CONSTRAINT "ProspectEventCounselor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProspectTimeslot" (
    "id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL DEFAULT 30,
    "capacity" INTEGER NOT NULL DEFAULT 1,
    "booked_count" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "ProspectTimeslot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProspectBooking" (
    "id" TEXT NOT NULL,
    "timeslot_id" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "prospect_name" TEXT NOT NULL,
    "prospect_email" TEXT NOT NULL,
    "prospect_phone" TEXT,
    "student_grade" TEXT,
    "status" "BookingStatus" NOT NULL DEFAULT 'Confirmed',
    "completed_at" TIMESTAMP(3),
    "completed_by" TEXT,
    "counselor_notes" TEXT,
    "did_attend" BOOLEAN,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProspectBooking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProspectEventCounselor_event_id_counselor_id_key" ON "ProspectEventCounselor"("event_id", "counselor_id");

-- CreateIndex
CREATE INDEX "ProspectTimeslot_event_id_start_time_idx" ON "ProspectTimeslot"("event_id", "start_time");

-- CreateIndex
CREATE INDEX "ProspectBooking_timeslot_id_idx" ON "ProspectBooking"("timeslot_id");

-- AddForeignKey
ALTER TABLE "ProspectEvent" ADD CONSTRAINT "ProspectEvent_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProspectEventCounselor" ADD CONSTRAINT "ProspectEventCounselor_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "ProspectEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProspectEventCounselor" ADD CONSTRAINT "ProspectEventCounselor_counselor_id_fkey" FOREIGN KEY ("counselor_id") REFERENCES "Counselor"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProspectTimeslot" ADD CONSTRAINT "ProspectTimeslot_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "ProspectEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProspectBooking" ADD CONSTRAINT "ProspectBooking_timeslot_id_fkey" FOREIGN KEY ("timeslot_id") REFERENCES "ProspectTimeslot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProspectBooking" ADD CONSTRAINT "ProspectBooking_completed_by_fkey" FOREIGN KEY ("completed_by") REFERENCES "Counselor"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
