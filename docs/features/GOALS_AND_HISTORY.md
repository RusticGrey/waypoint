# Goals & History Feature

Waypoint ensures students stay on track through a combination of goal setting and a complete audit trail of their progress.

## 1. Profile Goals
Students can set specific, time-bound targets to improve their application profiles (`app/(dashboard)/student/goals/`).

- **Goal Types**: Academic, Testing, Activity, Achievement, Project, or Other.
- **Status Lifecycle**: `Not Started` → `In Progress` → `Completed`. Goals can also be `Deferred` or `Cancelled`.
- **Prioritization**: Goals can be ranked by priority (1-10) to help students focus.
- **Progress Tracking**: Students can update "Current Value" vs "Target Value" (e.g., 1400 SAT vs 1500 SAT).

## 2. Change Log (Audit Trail)
To maintain data integrity and support counselor review, every major change is logged (`app/(dashboard)/student/history/`).

- **Automated Logging**: Changes to profile sections (Activities, Achievements, etc.) and goals are automatically recorded.
- **Details Captured**:
  - **Type**: Profile Update, Milestone, New Addition, etc.
  - **Action**: Created, Updated, Deleted.
  - **Values**: Captures both Old Value and New Value for transparency.
  - **Description**: A human-readable summary of what changed.

## 3. Student Phase History
The system tracks the student's journey through high school. As students move from `Onboarding` to `Profile Building` to `College Applications`, these transitions are recorded to give counselors context on the student's progress.

## Technical Implementation
- **Goal Model**: `ProfileGoal` with Zod validation for status transitions.
- **ChangeLog Model**: Designed as an immutable ledger.
- **API Helper**: `lib/api-helpers/change-log.ts` contains shared logic for creating log entries from various API routes.
- **Frontend**: The History page provides a reverse-chronological timeline of all student activity.
