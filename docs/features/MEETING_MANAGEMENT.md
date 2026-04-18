# Meeting Management Feature

The Meeting Management module handles internal scheduling, availability tracking, and integrated video conferencing between students and counselors.

## 1. Availability System
Counselors define their weekly working hours in the **Meeting Setup** section of their **Settings** (`/settings`). 
- **Timezone-Aware**: Counselor availability is stored in the database. When students view availability, the system automatically translates the counselor's hours into the student's preferred timezone for booking.
- **Buffer Times**: Counselors can set a "Buffer Time" (e.g., 15 mins) that the system automatically enforces between back-to-back meetings.

## 2. Booking Flow
Students book meetings from their dashboard (`/student/meetings`).
- **Real-Time Slots**: The system calculates available 30-minute slots by intersecting the counselor's defined hours with their existing "Busy" times in Google Calendar and the internal database.
- **High-Density Calendar**: A specialized grid allows students to view the full day (6 AM - 11 PM) at a glance, with all times automatically adjusted to their local timezone preference.
- **Explicit Labels**: The booking UI prominently displays "Showing in [Student Timezone]" to ensure absolute clarity.

## 3. Meeting Lifecycle
1.  **Request**: Student submits a `MeetingRequest`. The system creates a "Tentative" block on the counselor's Google Calendar using the student's explicit timezone for the invite payload.
2.  **Approval**: Counselor accepts the request from their dashboard.
3.  **Scheduling**: On acceptance, the system finalizes the Google Calendar event, generates a unique Zoom/Meet link, and sends a confirmation invite with correct timezone metadata.
4.  **Completion**: After the meeting, counselors log notes and action items.

## 4. Documentation & Cards
- **Meeting Cards**: Every session displayed on the dashboard includes an explicit timezone label (e.g., "PST" or "IST") to ensure both parties are looking at the correct local times.
- **Details Pages**: Time and date information on all meeting detail pages are dynamically formatted based on the current user's profile settings.

## Technical Implementation
-   **Core Model**: `Meeting`, `MeetingRequest`, `User.timezone`, `CounselorSettings`.
-   **API Routes**: `/api/meetings/*`, `/api/user/settings/*`.
-   **Helper**: `lib/meetings/googleCalendar.ts`, `lib/meetings/conferenceFactory.ts`.
