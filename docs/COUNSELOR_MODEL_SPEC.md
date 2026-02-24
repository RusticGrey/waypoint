# Counselor Model Extraction & Meeting Nomenclature Refactor

## 1. Overview
This specification details the extraction of counselor-specific data into a dedicated `Counselor` model and the normalization of meeting-related terminology. This refactor simplifies the `User` model and creates a clean lifecycle for meetings.

## 2. Terminology & Model Mapping

| Old Model/Field | New Model/Field | Description |
|-----------------|-----------------|-------------|
| `User.isAdmin` | `Counselor.isAdmin` | Permission flag moved to role-specific model. |
| `Meeting` | `Meeting` | The confirmed calendar event. |
| `Meeting` | `MeetingNote` | Retrospective notes/outcomes of a Meeting. |
| `CounselorSettings` | `CounselorSettings` | Zoom/Google tokens and preferences. |
| `User.students` | `Counselor.caseload` | The counselor's assigned students. |

## 3. Database Changes (Prisma Schema)

### 3.1. `User` Model (Simplified)
- Remove `isAdmin`.
- Remove relations: `meetings`, `meetingLogs`, `comments`, `overrides`, `students`, `meetings`, `hostMeetingRequests`, `integrationConfig`, `availabilities`.
- Add relation: `counselor Counselor?`.

### 3.2. `Counselor` Model (New)
```prisma
model Counselor {
  userId         String      @id @map("user_id")
  isAdmin        Boolean     @default(false) @map("is_admin")
  
  // Relations
  user           User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  caseload       Student[]   @relation("CounselorCaseload")
  meetings       Meeting[]   @relation("CounselorMeetings")
  meetingNotes   MeetingNote[]
  availabilities CounselorAvailability[]
  settings       CounselorSettings?
  
  // Audit/Social
  comments       ProfileComment[]
  overrides      ProfileOverride[]
}
```

### 3.3. `Meeting` Model (was `Meeting`)
- Rename table and model.
- FK `hostId` points to `Counselor.userId`.
- Relation: `note MeetingNote?`.

### 3.4. `MeetingNote` Model (was `Meeting`)
- Rename table and model.
- Add FK `meetingId` (1-to-1 with `Meeting`).
- FK `counselorId` points to `Counselor.userId`.

### 3.5. `CounselorSettings` Model (was `CounselorSettings`)
- Rename table and model.
- FK `userId` points to `Counselor.userId`.

## 4. Migration Plan (SQL)
1.  **Create New Tables**: `Counselor`, `Meeting`, `MeetingNote`, `CounselorSettings`.
2.  **Data Transfer**:
    *   Initialize `Counselor` records for all `User` where `role == 'counselor'`.
    *   Transfer `is_admin` values.
3.  **Update Foreign Keys**:
    *   Update `Student.counselor_id` to point to `Counselor`.
    *   Update `Meeting` (new) and `MeetingNote` (new) host/counselor IDs.
4.  **Cleanup**: Drop old tables and columns.

## 5. API & UI Refactor
- All staff-facing code must use `session.user.counselor` or check `counselor.isAdmin`.
- Standardize on `meeting` for events and `meetingNote` for retrospective data.
- Standardize on `caseload` for student lists.
