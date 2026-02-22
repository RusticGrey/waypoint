### WAYPOINT
College Counseling Platform

### Meeting Management Module
*Technical Specification for Coding Agent*

|             |                                   |
|-------------|-----------------------------------|
| **Version** | 1.2 — Phased Implementation Plan |
| **Date**    | February 2026                     |
| **Status**  | Phase 1 Ready for Implementation  |

# 1. How to Use This Document
Feed this specification document alongside the project context files to your coding agent. This document describes the complete vision but breaks down implementation into distinct phases.

**Current Focus: PHASE 1 (Scheduling)**.
The agent should focus on implementing Phase 1 requirements first. Future phases (Intelligence, Progress Reports) are documented here for architectural context but should not be implemented until Phase 1 is complete and verified.

**Git Workflow & Version Control:**
- **Repository:** Use git for version control.
- **Commit Strategy:** Create a distinct commit block for each feature or phase of changes.
- **Workflow:** Implement code -> Verification by User -> Commit changes -> Open new block for next phase.
- **Constraint:** Do not commit until the user has verified the implementation works as expected.

### Required Context Files
- **SCHEMA_REFERENCE.md** — Existing database schema
- **PROJECT_CONTEXT.md** — Current feature status
- **DEVELOPMENT.md** — Setup and code conventions
- **README.md** — Project structure

# 2. Implementation Phases

## Phase 1: Scheduling (Current Focus)
**Goal:** Enable students to book 30-minute slots with their coordinators/counselors.
**Key Features:**
*   **Availability:** Coordinators/Counselors set availability (e.g., 9-5 weekdays).
*   **Video Provider:** Coordinators/Counselors connect and select Zoom or Google Meet.
*   **Student Booking:** Students select a host, pick a 30-min slot (via calendar view), and send a request.
*   **Request Flow:** Requests start as `Pending`. Host accepts -> meeting invite sent (Calendar event created).
*   **Views:** Tabular view for requests, Calendar view for availability/slots.

## Phase 2: Meeting Intelligence (Future)
**Goal:** Automate meeting minutes and action item extraction.
**Key Features:**
*   Zoom/Meet recording processing.
*   Transcription (VTT parsing).
*   AI generation of summaries and detailed notes.
*   Action item extraction and assignment.

## Phase 3: Progress Reporting (Future)
**Goal:** Track student progress over time.
**Key Features:**
*   AI-generated student progress reports based on meeting history.
*   Manual counselor observations.
*   Report history and snapshots.

---

# 3. Architecture Decisions (Phase 1 & Beyond)

| **Decision**               | **Choice & Reason**                                                                                                |
|----------------------------|--------------------------------------------------------------------------------------------------------------------|
| Scheduling source of truth | Google Calendar FreeBusy API. Real calendar = real availability. Prevents double-booking from external changes.    |
| Google Calendar connection | Mandatory for all hosts (counselors + coordinators) before scheduling feature activates. Hard gate — no bypass.    |
| Video conferencing         | Zoom (primary) + Google Meet (supported).                                                                          |
| Recording & transcription  | **(Phase 2)** Zoom Cloud Recording / VTT.                                                                          |
| Intelligence generation    | **(Phase 2)** Anthropic Claude Sonnet (default).                                                                   |
| Email notifications        | Nodemailer via SMTP.                                                                                               |

# 4. Database Schema Changes
*Strict Constraint: Only implement database changes & migrations for the CURRENT PHASE (Phase 1).*

## 4.1 New Enums (Phase 1 Only)
Add to `prisma/schema.prisma`:

| **Enum Name**          | **Values**                                              | **Purpose**                               |
|------------------------|---------------------------------------------------------|-------------------------------------------|
| MeetingRequestStatus   | Pending, Accepted, Declined, ChangeSuggested, Cancelled | Negotiation workflow state                |
| ScheduledMeetingStatus | Upcoming, InProgress, Completed, Cancelled, NoShow      | Lifecycle of a confirmed meeting          |
| PreferredConference    | Zoom, GoogleMeet                                        | Per-host conference platform preference   |

*(Do not add ProcessingStatus, ActionItemPriority, or ActionItemStatus in Phase 1)*

## 4.2 New Models — Scheduling (Phase 1)
### ScheduledMeeting
Thin scheduling record. Google Calendar is the availability source of truth.

| **Field**             | **Type**                                  | **Description**                                                              |
|-----------------------|-------------------------------------------|------------------------------------------------------------------------------|
| id                    | String @id @default(uuid())               | Primary key                                                                  |
| studentId             | String                                    | FK → Student.userId (cascade delete)                                         |
| hostId                | String                                    | FK → User.id (cascade delete)                                                |
| meetingType           | MeetingType                               | Reuses existing MeetingType enum                                             |
| startTime             | DateTime                                  | Meeting start (store in UTC)                                                 |
| endTime               | DateTime                                  | Meeting end (store in UTC)                                                   |
| timezone              | String @default("UTC")                    | Host timezone for display formatting                                         |
| status                | ScheduledMeetingStatus @default(Upcoming) | Lifecycle state                                                              |
| conferencePlatform    | PreferredConference?                      | Which platform was used                                                      |
| conferenceId          | String?                                   | Platform identifier (Zoom ID / GCal Event ID)                                |
| conferenceJoinUrl     | String?                                   | Participant join URL                                                         |
| conferenceHostUrl     | String?                                   | Host start URL (Zoom only)                                                   |
| googleCalendarEventId | String?                                   | GCal event ID                                                                |
| agenda                | String?                                   | Pre-meeting agenda text                                                      |
| createdAt / updatedAt | DateTime                                  | Standard timestamps                                                          |

### MeetingRequest
Waypoint negotiation layer.

| **Field**             | **Type**                               | **Description**                               |
|-----------------------|----------------------------------------|-----------------------------------------------|
| id                    | String @id @default(uuid())            | Primary key                                   |
| studentId             | String                                 | FK → Student.userId (cascade delete)          |
| hostId                | String                                 | FK → User.id (cascade delete)                 |
| requestedStart        | DateTime                               | Student-requested start time                  |
| requestedEnd          | DateTime                               | Student-requested end time                    |
| meetingType           | MeetingType                            | Type of counseling session                    |
| studentNote           | String?                                | Optional note from student (max 500 chars)    |
| status                | MeetingRequestStatus @default(Pending) | Current negotiation state                     |
| hostNote              | String?                                | Host note when declining or suggesting change |
| suggestedStart        | DateTime?                              | Host counter-proposal start                   |
| suggestedEnd          | DateTime?                              | Host counter-proposal end                     |
| scheduledMeetingId    | String? @unique                        | FK → ScheduledMeeting.id (set when accepted)  |
| createdAt / updatedAt | DateTime                               | Standard timestamps                           |

### UserIntegrationConfig (Phase 1)
One record per host. Stores OAuth tokens.

| **Field**             | **Type**                                       | **Description**                                           |
|-----------------------|------------------------------------------------|-----------------------------------------------------------|
| userId                | String @id                                     | FK → User.id (cascade delete).                            |
| preferredConference   | PreferredConference @default(Zoom)             | Host's default conference platform                        |
| googleAccessToken     | String?                                        | Encrypted Google OAuth access token                       |
| googleRefreshToken    | String?                                        | Encrypted Google OAuth refresh token                      |
| googleTokenExpiry     | DateTime?                                      | Expiry timestamp for auto-refresh                         |
| googleCalendarId      | String?                                        | Which GCal calendar to write events to (default: primary) |
| googleConnected       | Boolean @default(false)                        | True once OAuth exchange completes                        |
| zoomAccessToken       | String?                                        | Encrypted Zoom OAuth access token                         |
| zoomRefreshToken      | String?                                        | Encrypted Zoom OAuth refresh token                        |
| zoomTokenExpiry       | DateTime?                                      | Expiry timestamp for auto-refresh                         |
| zoomUserId            | String?                                        | Zoom user identifier                                      |
| zoomConnected         | Boolean @default(false)                        | True once OAuth exchange completes                        |
| createdAt / updatedAt | DateTime                                       | Standard timestamps                                       |

## 4.3 New Models — Intelligence & Reporting (Phase 2 & 3 - DO NOT IMPLEMENT)
*The following models are listed for reference only. Do NOT add them to the schema in Phase 1.*

*   **MeetingRecording** (Phase 2)
*   **MeetingIntelligence** (Phase 2)
*   **MeetingActionItem** (Phase 2)
*   **StudentProgressReport** (Phase 3)
*   **StudentProgressSnapshot** (Phase 3)

## 4.4 Relations (Phase 1 Only)
Add relations to `User` and `Student` models corresponding only to Phase 1 models (`ScheduledMeeting`, `MeetingRequest`, `UserIntegrationConfig`).

# 5. Environment Variables (Phase 1)
| **Variable**              | **Required** |
|---------------------------|--------------|
| GOOGLE_CLIENT_ID          | Yes          |
| GOOGLE_CLIENT_SECRET      | Yes          |
| GOOGLE_REDIRECT_URI       | Yes          |
| ZOOM_CLIENT_ID            | Yes          |
| ZOOM_CLIENT_SECRET        | Yes          |
| ZOOM_REDIRECT_URI         | Yes          |
| TOKEN_ENCRYPTION_KEY      | Yes          |
| SMTP_HOST                 | Yes          |
| SMTP_PORT                 | Yes          |
| SMTP_USER                 | Yes          |
| SMTP_PASS                 | Yes          |
| SMTP_FROM                 | Yes          |
| NEXT_PUBLIC_ENABLE_MEETINGS | Yes (true/false) |

*Phase 2/3 variables (LLM_PROVIDER, ANTHROPIC_API_KEY, etc.) can be added later.*

# 6. Components & Pages (Phase 1 Focus)

## 6.1 API Routes (Phase 1)
*   `app/api/auth/google/...` - Google OAuth
*   `app/api/auth/zoom/...` - Zoom OAuth
*   `app/api/integrations/...` - Status, Preferences, FreeBusy (Google Calendar)
*   `app/api/meetings/requests/...` - CRUD for Meeting Requests
*   `app/api/meetings/scheduled/...` - CRUD for Scheduled Meetings

## 6.2 Pages (Phase 1)
*   `app/(dashboard)/student/meetings/page.tsx` - Booking UI, Request List
*   `app/(dashboard)/coordinator/meetings/page.tsx` - Request Queue, Calendar View
*   `app/(dashboard)/coordinator/meetings/setup/page.tsx` - Integration Setup
*   *(Same for Counselor)*

## 6.3 Components (Phase 1)
*   **CalendarView.tsx** - Week grid showing GCal availability.
*   **BookingModal.tsx** - For students to request a slot.
*   **MeetingRequestQueue.tsx** - For hosts to manage pending requests.
*   **ScheduledMeetingCard.tsx** - Display confirmed meetings.
*   **IntegrationSetupCard.tsx** - Connect Google/Zoom.
*   **MeetingGate.tsx** - Protect routes requiring integrations.
*   **FeatureFlagGate** - *New Requirement:* All meeting-related UI (sidebar links, dashboard widgets) must check `process.env.NEXT_PUBLIC_ENABLE_MEETINGS === 'true'`. If false, hide the entry points completely.

# 7. Core Logic (Phase 1)

## 7.1 Google Calendar Integration
*   OAuth flow to connect account.
*   `getFreeBusy` to fetch availability for the CalendarView.
*   `createEvent` to book the meeting on the host's calendar (source of truth).

## 7.2 Zoom Integration
*   OAuth flow to connect account.
*   `createZoomMeeting` to generate meeting links if Zoom is selected.

## 7.3 Conference Factory
*   Central logic to decide whether to create a Zoom meeting or Google Meet event based on host preference.
*   Called when a host **Accepts** a meeting request.

## 7.4 Request Workflow
1.  **Student** sees available slots (GCal FreeBusy).
2.  **Student** creates `MeetingRequest` (Status: Pending).
3.  **Host** views Request Queue.
4.  **Host** accepts request:
    *   System calls Conference Factory.
    *   Creates Zoom/Meet link.
    *   Creates GCal event.
    *   Creates `ScheduledMeeting` record.
    *   Updates `MeetingRequest` to Accepted.
    *   Sends confirmation emails.

# 8. Implementation Steps (Phase 1)

**Workflow Rule:** Execute each step, verify with user, then commit changes before moving to the next.

1.  **Feature Flag:** Add `NEXT_PUBLIC_ENABLE_MEETINGS=true` to `.env.local`. Wrap UI entry points.
    *   *User Verification:* Check flag toggles UI.
    *   *Git:* `git add . && git commit -m "feat(meetings): add feature flag and UI gate"`

2.  **Schema (Phase 1):** Update `prisma/schema.prisma` with Phase 1 models/enums only. Run migration.
    *   *User Verification:* Verify DB schema changes.
    *   *Git:* `git add . && git commit -m "feat(meetings): add phase 1 schema"`

3.  **Auth & Integrations:** Implement OAuth flows (`lib/utils/tokenEncryption.ts`, `lib/meetings/googleCalendar.ts`, `lib/meetings/zoom.ts`).
    *   *User Verification:* Verify token encryption and OAuth redirect/callback.
    *   *Git:* `git add . && git commit -m "feat(meetings): implement google and zoom oauth"`

4.  **Setup UI:** Build `IntegrationSetupCard` and `MeetingGate`.
    *   *User Verification:* Verify host can connect/disconnect integrations.
    *   *Git:* `git add . && git commit -m "feat(meetings): add integration setup ui"`

5.  **Availability:** Implement `CalendarView` fetching data from `getFreeBusy`.
    *   *User Verification:* Verify calendar grid shows correct GCal busy slots.
    *   *Git:* `git add . && git commit -m "feat(meetings): implement availability view"`

6.  **Booking Flow:** Implement `BookingModal` and `POST /api/meetings/requests`.
    *   *User Verification:* Verify student can submit request.
    *   *Git:* `git add . && git commit -m "feat(meetings): implement booking flow"`

7.  **Host Management:** Implement `MeetingRequestQueue` and `PATCH /api/meetings/requests/[id]`.
    *   *User Verification:* Verify host can see/manage requests.
    *   *Git:* `git add . && git commit -m "feat(meetings): implement request management"`

8.  **Confirmation:** Implement `ScheduledMeeting` creation and email notifications.
    *   *User Verification:* Verify GCal event creation and emails.
    *   *Git:* `git add . && git commit -m "feat(meetings): implement confirmation and notifications"`

# 9. Verification (Phase 1)
*   [ ] Host can connect Google Calendar and Zoom.
*   [ ] Student can see Host's real GCal availability.
*   [ ] Student can submit a request.
*   [ ] Host receives email and sees request in dashboard.
*   [ ] Host accepting request creates GCal event and Zoom/Meet link.
*   [ ] Both parties receive confirmation details.

---
*End of Phase 1 Specification*
