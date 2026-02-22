### WAYPOINT
College Counseling Platform

### Meeting Management Module
*Technical Specification (Updated Phase 1 Complete)*

|             |                                   |
|-------------|-----------------------------------|
| **Version** | 1.3 — Phase 1 Final Baseline      |
| **Date**    | February 2026                     |
| **Status**  | Phase 1 Complete & Verified       |

# 1. Overview
This document serves as the final specification and implementation record for **Phase 1: Scheduling** of the Meeting Management module. Future phases (Intelligence and Progress Reports) are planned for implementation after the successful pilot of Phase 1.

# 2. Implemented Features (Phase 1)

## 2.1 Scheduling & Availability
*   **Host Availability:** Coordinators and Counselors can define their weekly working hours (e.g., 9-5 Mon-Fri) via a unified `HostAvailabilityView`.
*   **Google Calendar Sync:** Real-time availability is fetched from the host's primary Google Calendar using the **FreeBusy API**. Waypoint respects external events when presenting slots to students.
*   **30-Minute Slots:** All scheduling is normalized to 30-minute increments.
*   **Double-Booking Prevention:** Students are prevented from requesting overlapping meetings with different hosts or within their own confirmed schedule.

## 2.2 Conference Integration
*   **Google Calendar:** Automated event creation upon meeting acceptance. Includes optional **Google Meet** link generation.
*   **Zoom:** Full OAuth integration. Meeting links are generated automatically if Zoom is the host's preferred platform.
*   **Intelligent Fallback:** If a host prefers Zoom but hasn't connected their account, the system automatically falls back to Google Meet (if Google is connected) to ensure the meeting can proceed.

## 2.3 Management & Workflows
*   **Request Queue:** Unified real-time queue for hosts (Coordinators see their own; Counselors see all organization-wide) with 30-second automatic polling.
*   **Status Transparency:** Requests and meetings are clearly tagged for students: `Pending`, `Confirmed`, `Declined`, or `Cancelled`.
*   **Cancellation Flow:** Full cleanup of database records and external calendar events (GCal/Zoom) upon cancellation by either party.
*   **Rescheduling:** Both students and hosts can reschedule. Confirmed meetings revert to "Pending" status for the new time to ensure host approval and slot availability.

## 2.4 User Experience (UI/UX)
*   **Smart Navigation:** Context-aware back buttons (`router.back()`) preserve dashboard states (e.g., List vs. Calendar view).
*   **Student Dashboard:** Focused "Next Meeting" card showing only the immediate upcoming session details.
*   **Time-Aware Actions:** "Join Meeting" buttons activate only during the scheduled window (starting 10 minutes before).
*   **Theme Visibility:** High-contrast font schemes ensure visibility across different display modes.

---

# 3. Database Schema Baseline (Phase 1)

### ScheduledMeeting
| **Field**             | **Type**                                  | **Description**                               |
|-----------------------|-------------------------------------------|-----------------------------------------------|
| id                    | String (UUID)                             | PK                                            |
| studentId             | String                                    | FK → Student                                  |
| hostId                | String                                    | FK → User                                     |
| status                | ScheduledMeetingStatus                    | Upcoming, InProgress, Completed, Cancelled    |
| startTime / endTime   | DateTime                                  | Meeting duration                              |
| conferencePlatform    | PreferredConference?                      | Zoom or GoogleMeet                            |
| conferenceJoinUrl     | String?                                   | Participant URL                               |
| googleCalendarEventId | String?                                   | GCal link for cleanup                         |

### MeetingRequest
| **Field**             | **Type**                               | **Description**                               |
|-----------------------|----------------------------------------|-----------------------------------------------|
| id                    | String (UUID)                          | PK                                            |
| status                | MeetingRequestStatus                   | Pending, Accepted, Declined, Cancelled        |
| requestedStart/End    | DateTime                               | Student's proposed slot                       |
| studentNote / hostNote| String?                                | Communication between parties                 |
| googleCalendarEventId | String?                                | Tentative GCal event for slot blocking        |

---

# 4. Environment Configuration
The module is controlled by a global feature flag:
`NEXT_PUBLIC_ENABLE_MEETINGS="true"`

Key Integration Variables:
*   `GOOGLE_CLIENT_ID` / `SECRET` / `REDIRECT_URI`
*   `ZOOM_CLIENT_ID` / `SECRET` / `REDIRECT_URI`
*   `TOKEN_ENCRYPTION_KEY` (AES-256-GCM)

---

# 5. Future Phases

## Phase 2: Meeting Intelligence
*   Automatic Zoom/Meet recording retrieval.
*   VTT transcription parsing.
*   AI-generated summaries and action item extraction using Claude.

## Phase 3: Progress Reporting
*   Historical tracking of student progress.
*   Counselor observations and snapshots.
*   AI-assisted report generation based on meeting history.

---
*End of Specification — Phase 1 Verified Baseline*
