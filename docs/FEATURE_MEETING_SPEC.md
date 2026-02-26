### WAYPOINT
College Counseling Platform

### Meeting Management Module
*Complete Functional & Technical Specification*

|             |                                   |
|-------------|-----------------------------------|
| **Version** | 1.5 — Unified Baseline            |
| **Date**    | February 2026                     |
| **Status**  | Phase 1 & 2 Core Verified         |

# 1. Overview
The Meeting Management module is a core pillar of the Waypoint platform, designed to facilitate seamless communication between students and counselors. It manages the entire lifecycle of a counseling session—from availability definition and student booking to collaborative retrospective documentation.

# 2. Scope & Objectives
The module aims to:
*   **Centralize Coordination:** Remove the need for external scheduling tools by integrating directly with counselor calendars.
*   **Automate Logistics:** Handle time-zone conversions, link generation (Zoom/Google Meet), and calendar invites automatically.
*   **Collaborative Record Keeping:** Create a shared, immutable-once-finalized record of every session including discussion points, student sentiment, and actionable next steps.
*   **Historical Integrity:** Provide a searchable, chronological history of all interactions for progress reporting and continuity.

# 3. Implemented Features

## 3.1 Scheduling & Availability
*   **Host Availability:** Counselors define their weekly working hours (e.g., 9-5 Mon-Fri) via a unified `HostAvailabilityView`.
*   **Google Calendar Sync:** Real-time availability is fetched from the host's primary Google Calendar using the **FreeBusy API**. Waypoint respects external events ("Busy" slots) when presenting options to students.
*   **Intelligent Slot Picking:** Normalized 30-minute slots are presented, preventing double-booking and respecting the counselor's defined availability.
*   **Time-Aware States:** Meetings stay in the "Upcoming & Ongoing" section until their exact end time, ensuring join links remain accessible during the entire session.

## 3.2 Conference Integration
*   **OAuth Lifecycle:** Full integration with Google and Zoom. Securely encrypts and refreshes access tokens using AES-256-GCM.
*   **Google Meet:** Automated event creation and participant invitation.
*   **Zoom:** Automated meeting creation if Zoom is the counselor's preferred platform.
*   **Intelligent Fallback:** If a counselor's preferred platform is unavailable or disconnected, the system falls back to the alternate connected provider to ensure the session proceeds.

## 3.3 Collaborative Meeting Notes (The "MeetingNote" System)
*   **1:1 Relationship:** Every `Meeting` is linked to exactly one `MeetingNote` record, ensuring documentation is tied to the specific event.
*   **Counselor Finalization:** A session is only considered "Completed" once the counselor submits formal discussion notes and action items.
*   **Multi-Party Documentation:**
    *   **Counselor Section:** Summary of discussion, decisions made, and a structured list of action items.
    *   **Student Section:** Placeholder for students to add their own feedback, reflections, or follow-up questions.
*   **Role-Based Permissions:** Counselors can edit counselor notes; students can edit student feedback. Both parties have read-only access to the other's finalized sections.
*   **Sentiment Tracking:** Counselors record "Student Mood" as a private observation for historical trend analysis.
*   **Next Meeting Intent:** Counselors specify a "Proposed Next Session" date, which is highlighted to the student as a call-to-action.

## 3.4 Management & Workflows
*   **Real-Time Queue:** Automated background polling (with page-visibility awareness) keeps the meeting request queue synced for both parties.
*   **Timeline Logic:**
    *   **Upcoming:** Chronological order (closest first).
    *   **Past/Completed:** Reverse-chronological order (most recent first).
*   **Strict Deletion:** Students can hide "Cancelled" or "Declined" sessions from their view, but cannot delete "Completed" or "Upcoming" sessions to preserve the counseling record.

---

# 4. Database Schema

### Meeting (Lifecycle Entity)
Tracks the intent and logistics of the scheduled session.
*   `status`: `Upcoming`, `InProgress`, `Completed`, `Cancelled`, `NoShow`.
*   `startTime / endTime`: The definitive time slot.
*   `conferencePlatform`: Zoom or GoogleMeet.
*   `conferenceJoinUrl`: Participant access link.

### MeetingNote (Outcome Entity)
The historical record of the session.
*   `counselorNotes`: Formal summary.
*   `studentNotes`: Student-provided feedback.
*   `actionItems`: String array of tasks.
*   `studentMood`: Qualitative observation badge.
*   `nextMeetingDate`: Target date for follow-up.

---

# 5. Future Growth & Planned Features

## 5.1 Meeting Intelligence (Phase 2)
*   **Recording Retrieval:** Automated fetching of Zoom/Meet recordings.
*   **AI Transcription:** VTT parsing and Claude-powered auto-summary generation.
*   **Task Automation:** Automatic conversion of "Action Items" into platform "Goals."

## 5.2 Analytics & Reporting (Phase 3)
*   **Sentiment Trends:** Visualizing student mood over multiple sessions.
*   **Engagement Metrics:** Tracking session frequency and action item completion rates.
*   **Snapshot Reports:** AI-assisted term reports generated from meeting history.

---
*End of Specification — Unified Documentation*
