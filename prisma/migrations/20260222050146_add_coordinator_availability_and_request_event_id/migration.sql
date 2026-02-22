-- AlterTable
ALTER TABLE "MeetingRequest" ADD COLUMN     "google_calendar_event_id" TEXT;

-- CreateTable
CREATE TABLE "CoordinatorAvailability" (
    "id" TEXT NOT NULL,
    "coordinator_id" TEXT NOT NULL,
    "day_of_week" INTEGER NOT NULL,
    "start_time" TEXT NOT NULL,
    "end_time" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoordinatorAvailability_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CoordinatorAvailability_coordinator_id_day_of_week_key" ON "CoordinatorAvailability"("coordinator_id", "day_of_week");

-- AddForeignKey
ALTER TABLE "CoordinatorAvailability" ADD CONSTRAINT "CoordinatorAvailability_coordinator_id_fkey" FOREIGN KEY ("coordinator_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
