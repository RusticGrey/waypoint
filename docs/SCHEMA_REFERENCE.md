# Waypoint Database Schema Reference

Complete reference for the Waypoint database schema, including models, relations, enums, and camelCase conventions.

## Unified Counselor Model (Role + Admin Flag)

Waypoint uses a flattened staff hierarchy. All staff members who advise students have the `counselor` role. Administrative capabilities are enabled via the `isAdmin` flag.

- **Counselor (Standard)**: Manages their assigned caseload of students.
- **Counselor (Admin)**: Can manage users, view organization-wide stats, and access all students.

## Critical Convention: camelCase for Relations and Fields

All Prisma relations and field names use **camelCase**. This is enforced throughout the codebase.

### Prisma Relations (MUST use camelCase)

```typescript
// ✅ CORRECT - All relations use camelCase:
const student = await prisma.student.findUnique({
  where: { userId: id },
  include: {
    user: true,                      // User relation
    personalProfile: true,           // PersonalProfile relation
    academicProfile: true,           // AcademicProfile relation
    counselor: true,                 // Counselor (User) relation
    activities: true,                // Activity[] relation
    achievements: true,              // Achievement[] relation
    projectExperiences: true,        // ProjectExperience[] relation
    transcripts: true,               // Transcript[] relation
    testScores: true,                // TestScore[] relation
    collegeApplications: true,       // CollegeApplication[] relation
    targetColleges: true,            // TargetCollege[] relation
    meetings: true,                  // Meeting[] relation
    profileGoals: true,              // ProfileGoal[] relation
    profileOverride: true,           // ProfileOverride relation
    changeLogs: true                 // ChangeLog[] relation
  }
});
```

## Database Models

### Core User Models

#### User
Authentication and role management.

```typescript
model User {
  id             String   @id @default(uuid())
  organizationId String
  email          String   @unique
  passwordHash   String
  role           UserRole // counselor | student
  isAdmin        Boolean  @default(false)
  firstName      String
  lastName       String
  createdAt      DateTime @default(now())

  // Relations
  organization   Organization @relation(fields: [organizationId], references: [id])
  student        Student?     @relation("UserToStudent")
  meetings       Meeting[]    @relation("CounselorMeetings")
  students       Student[]    // Counselor's caseload
  availabilities CounselorAvailability[]
}
```

#### Student
Extends User for student-specific data.

```typescript
model Student {
  userId               String  @id
  graduationYear       Int
  currentGrade         GradeLevel
  primaryCounselorId   String?
  counselorId          String? // Assigned Counselor
  profileCompletionPct Int     @default(0)
  phase                StudentPhase @default(Onboarding)

  // Relations
  user                 User @relation("UserToStudent", fields: [userId], references: [id])
  counselor            User? @relation(fields: [counselorId], references: [id])
}
```

### Meeting & Goals Models

#### Meeting
Counselor meeting logs.

```typescript
model Meeting {
  id              String
  studentId       String
  counselorId     String
  meetingDate     DateTime
  meetingType     MeetingType
  // ...
  user            User @relation("CounselorMeetings", fields: [counselorId], references: [id])
  student         Student @relation(fields: [studentId], references: [userId])
}
```

#### CounselorAvailability
Defines when a Counselor is available for student bookings.

```typescript
model CounselorAvailability {
  id            String  @id @default(uuid())
  counselorId   String
  dayOfWeek     Int     // 0-6
  startTime     String  // "09:00"
  endTime       String  // "17:00"
  isActive      Boolean @default(true)

  counselor     User @relation(fields: [counselorId], references: [id])
}
```

## Enums Reference

### UserRole
```typescript
enum UserRole {
  counselor
  student
}
```

## Common Query Patterns

### Fetch Counselor's Caseload
```typescript
// For Standard Counselors
const students = await prisma.student.findMany({
  where: { counselorId: session.user.id }
});

// For Admin Counselors (Organization-wide)
const allStudents = await prisma.student.findMany({
  where: { user: { organizationId: session.user.organizationId } }
});
```

---

**Last Updated**: February 23, 2026
**Version**: 3.0 (Unified Role Model)
