# Student Profile Feature

The Student Profile is the heart of the Waypoint platform. It manages a comprehensive set of data points required for global college applications.

> **Crucial Concept**: The student journey is managed through a **3-Phase Lifecycle** (Onboarding → Profile Building → College Applications). See [STUDENT_LIFECYCLE.md](../STUDENT_LIFECYCLE.md) for full details.

## 1. Onboarding Wizard
When a new student first logs in, they are directed to a **6-Step Onboarding Wizard** (`app/(dashboard)/onboarding/`):

1. **Personal Information**: Basic identity and parent/guardian contact details.
2. **Transcripts**: Academic history including curriculum type (IB, CBSE, etc.), grading system, and course-by-course breakdown.
3. **Test Scores**: Standardized testing results (SAT, ACT, AP, etc.).
4. **Activities**: Extracurricular involvement with time commitment tracking.
5. **Achievements**: Awards, honors, and recognition.
6. **Projects & Experiences**: Independent work, internships, or summer programs.

## 2. Profile Management
Once onboarding is complete, students can view their full profile in a centralized dashboard (`app/(dashboard)/student/profile/`).

- **Sectional Editing**: Each part of the profile (Personal, Academic, Activities, etc.) can be edited independently.
- **Data Persistence**: All changes are immediately persisted to the specialized profile models in the database.

## 3. Completion Tracking
Waypoint calculates a **Profile Completion Percentage** (`lib/utils/profile-completion.ts`) based on the data provided:
- **Personal Information**: 15%.
- **Transcripts & Academic**: 40% (Target: 5+ courses + curriculum details).
- **Test Scores**: 10%.
- **Activities/Achievements**: 15% each.
- **Projects**: 5%.

## 4. Phase Transitions
A student's journey is tracked through three phases (`StudentPhase` enum):
1. **Onboarding**: Initial data collection.
2. **Profile Building**: Focus on strengthening activities and academics (Triggered automatically at 100% completion).
3. **College Applications**: Focus on specific institution deadlines and tracking.

## Technical Implementation
- **Form Handling**: Uses `react-hook-form` with `zod` for validation.
- **API Routes**: `/api/onboarding/*` for initial setup and `/api/student/profile/*` for subsequent updates.
- **Components**: Found in `components/forms/onboarding/`.
- **Navigation & Routing**: Layout-level enforcement ensures students in the `Onboarding` phase are routed to the wizard. Post-completion navigation is managed via `NavClientComponent` and student dashboard stats triggers.
