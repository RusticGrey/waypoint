/*
  Warnings:

  - You are about to drop the `ProspectBooking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProspectEvent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProspectEventCounselor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProspectTimeslot` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProspectBooking" DROP CONSTRAINT "ProspectBooking_completed_by_fkey";

-- DropForeignKey
ALTER TABLE "ProspectBooking" DROP CONSTRAINT "ProspectBooking_timeslot_id_fkey";

-- DropForeignKey
ALTER TABLE "ProspectEvent" DROP CONSTRAINT "ProspectEvent_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "ProspectEventCounselor" DROP CONSTRAINT "ProspectEventCounselor_counselor_id_fkey";

-- DropForeignKey
ALTER TABLE "ProspectEventCounselor" DROP CONSTRAINT "ProspectEventCounselor_event_id_fkey";

-- DropForeignKey
ALTER TABLE "ProspectTimeslot" DROP CONSTRAINT "ProspectTimeslot_event_id_fkey";

-- DropTable
DROP TABLE "ProspectBooking";

-- DropTable
DROP TABLE "ProspectEvent";

-- DropTable
DROP TABLE "ProspectEventCounselor";

-- DropTable
DROP TABLE "ProspectTimeslot";

-- CreateTable
CREATE TABLE "PublicEvent" (
    "id" TEXT NOT NULL,
    "organization_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "location" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "header_text" TEXT DEFAULT 'YOUR GLOBAL FUTURE STARTS HERE',
    "subheader_text" TEXT DEFAULT 'Schedule your FREE 30-minute consultation',
    "slot_duration" INTEGER NOT NULL DEFAULT 30,
    "success_message" TEXT,
    "footer_content" JSONB,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PublicEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventAssignment" (
    "id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "counselor_id" TEXT NOT NULL,

    CONSTRAINT "EventAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventSlot" (
    "id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL DEFAULT 30,
    "capacity" INTEGER NOT NULL DEFAULT 1,
    "booked_count" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "EventSlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventSignup" (
    "id" TEXT NOT NULL,
    "slot_id" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "prospect_name" TEXT NOT NULL,
    "prospect_email" TEXT,
    "prospect_phone" TEXT NOT NULL,
    "student_grade" TEXT,
    "status" "BookingStatus" NOT NULL DEFAULT 'Confirmed',
    "completed_at" TIMESTAMP(3),
    "completed_by" TEXT,
    "counselor_notes" TEXT,
    "did_attend" BOOLEAN,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventSignup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EventAssignment_event_id_counselor_id_key" ON "EventAssignment"("event_id", "counselor_id");

-- CreateIndex
CREATE INDEX "EventSlot_event_id_start_time_idx" ON "EventSlot"("event_id", "start_time");

-- CreateIndex
CREATE INDEX "EventSignup_slot_id_idx" ON "EventSignup"("slot_id");

-- AddForeignKey
ALTER TABLE "PublicEvent" ADD CONSTRAINT "PublicEvent_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventAssignment" ADD CONSTRAINT "EventAssignment_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "PublicEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventAssignment" ADD CONSTRAINT "EventAssignment_counselor_id_fkey" FOREIGN KEY ("counselor_id") REFERENCES "Counselor"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventSlot" ADD CONSTRAINT "EventSlot_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "PublicEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventSignup" ADD CONSTRAINT "EventSignup_slot_id_fkey" FOREIGN KEY ("slot_id") REFERENCES "EventSlot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventSignup" ADD CONSTRAINT "EventSignup_completed_by_fkey" FOREIGN KEY ("completed_by") REFERENCES "Counselor"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
