# Data Model Reference

Waypoint uses **Prisma ORM** with a PostgreSQL database. The schema is organized to support a multi-tenant structure and comprehensive student tracking.

## Critical Convention: camelCase
All Prisma relations and field names MUST use **camelCase**. This is enforced throughout the application logic.

```typescript
// ✅ CORRECT
student.personalProfile
user.firstName

// ❌ WRONG
student.PersonalProfile
user.first_name
```

## Core Models

### Organization
The top-level entity. Every user belongs to one organization.
- `id`: UUID
- `name`: String
- `logoUrl`: Optional branding
- `primaryColor`: Default hex code for UI

### User
Authentication and identity.
- `id`: UUID
- `email`: Unique identifier
- `passwordHash`: bcrypt hash
- `role`: `student` | `counselor`
- `firstName`, `lastName`
- `organizationId`: FK to Organization

### Counselor
Extends the User model for staff-specific functionality.
- `userId`: PK (relation to User)
- `isAdmin`: Boolean flag for admin privileges
- `caseload`: Relation to assigned `Student` records

### Student
Extends the User model for student-specific tracking.
- `userId`: PK (relation to User)
- `graduationYear`: Int
- `currentGrade`: Enum (`ninth`, `tenth`, etc.)
- `phase`: `Onboarding` | `Profile_Building` | `College_Applications`
- `profileCompletionPct`: Int (0-100)
- `counselorId`: FK to Counselor (assigned advisor)

## Student Profile Models
A student's profile is split into specialized models for scalability:
- **PersonalProfile**: Parent contact, school name, phone.
- **AcademicProfile**: Curriculum type, grading system, current GPA.
- **Transcript**: Individual course records with grades and honors level.
- **Activity**: Extracurriculars with hours/weeks commitment.
- **Achievement**: Awards and recognition with scale (School to International).
- **ProjectExperience**: Research, internships, and independent projects.

## College Prep Models
- **College**: Central database of institutions (Pre-seeded with 64 US colleges).
- **CollegeApplication**: Tracking the status (11 states), deadlines, and requirements for a specific student-college pair.
- **TargetCollege**: A student's categorized list (Reach/Match/Safety).
- **TestScore**: Standardized test results (SAT, ACT, AP, IB).

## Engagement Models
- **Meeting**: Scheduled sessions with video links and status tracking.
- **MeetingRequest**: Pending requests from students before they are scheduled.
- **MeetingNote**: Collaborative documentation of a session (notes, action items, mood).
- **ProfileGoal**: Specific improvement targets set by/for the student.
- **ChangeLog**: Immutable audit trail of profile modifications.

## Event Management Models
- **PublicEvent**: Metadata for public consultation events.
- **EventSlot**: Generated time blocks for booking.
- **EventAssignment**: Link between Counselors and a PublicEvent.
- **EventSignup**: Record of a prospective student booking a slot.

## Key Enums
Waypoint leverages Enums extensively for data consistency:
- `UserRole`, `StudentPhase`, `GradeLevel`, `CurriculumType`, `GradingSystemType`, `HonorsLevel`, `AchievementType`, `RecognitionLevel`, `ExperienceType`, `ApplicationStatus`, `GoalType`, `GoalStatus`, `TargetCategory`, `ActivityCategory`, `MeetingType`.
