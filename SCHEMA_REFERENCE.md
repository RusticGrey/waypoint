# Waypoint Database Schema Reference

Complete reference for the Waypoint database schema, including models, relations, enums, and camelCase conventions.

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
    coordinator: true,               // Coordinator (User) relation
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

// Access relations with camelCase:
student.personalProfile.currentSchool
student.academicProfile.currentGpa
student.user.firstName
student.activities.map(a => a.activityName)
student.achievements.map(a => a.title)
```

```typescript
// ❌ WRONG - Never use PascalCase:
student.PersonalProfile     // ❌ DON'T DO THIS
student.AcademicProfile     // ❌ DON'T DO THIS
student.User               // ❌ DON'T DO THIS
student.Activities         // ❌ DON'T DO THIS
student.Achievements       // ❌ DON'T DO THIS
```

### Field Names (MUST use camelCase)

```typescript
// ✅ CORRECT - All fields use camelCase:
const user = {
  id: "uuid",
  organizationId: "uuid",      // ✅ camelCase
  email: "user@example.com",
  passwordHash: "hashed",      // ✅ camelCase (not password_hash)
  role: "student",
  firstName: "John",           // ✅ camelCase (not first_name)
  lastName: "Doe",             // ✅ camelCase (not last_name)
  createdAt: new Date()
};

const student = {
  userId: "uuid",              // ✅ camelCase (not user_id)
  graduationYear: 2025,        // ✅ camelCase
  currentGrade: "eleventh",    // ✅ camelCase
  primaryCoordinatorId: "uuid",
  profileCompletionPct: 75,    // ✅ camelCase
  coordinatorId: "uuid"
};
```

```typescript
// ❌ WRONG - Never use snake_case:
user.password_hash    // ❌ DON'T DO THIS
user.first_name       // ❌ DON'T DO THIS
student.user_id       // ❌ DON'T DO THIS
student.graduation_year  // ❌ DON'T DO THIS
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
  role           UserRole  // counselor | coordinator | student
  firstName      String
  lastName       String
  createdAt      DateTime @default(now())

  // Relations
  organization   Organization @relation(fields: [organizationId], references: [id])
  student        Student?     @relation("UserToStudent")
  meetings       Meeting[]    @relation("CoordinatorMeetings")
  meetingLogs    MeetingLog[]
  comments       ProfileComment[]
  overrides      ProfileOverride[]
  students       Student[]    // Coordinator's students
}
```

#### Student
Extends User for student-specific data.

```typescript
model Student {
  userId               String  @id
  graduationYear       Int
  currentGrade         GradeLevel  // ninth | tenth | eleventh | twelfth
  primaryCoordinatorId String?
  profileCompletionPct Int     @default(0)
  coordinatorId        String?

  // Relations
  user                 User @relation("UserToStudent", fields: [userId], references: [id])
  coordinator          User? @relation(fields: [coordinatorId], references: [id])
  personalProfile      PersonalProfile?
  academicProfile      AcademicProfile?
  activities           Activity[]
  achievements         Achievement[]
  transcripts          Transcript[]
  testScores           TestScore[]
  projectExperiences   ProjectExperience[]
  collegeApplications  CollegeApplication[]
  targetColleges       TargetCollege[]
  meetings             Meeting[]
  meetingLogs          MeetingLog[]
  profileGoals         ProfileGoal[]
  changeLogs           ChangeLog[]
  profileOverride      ProfileOverride?
}
```

#### Organization
Multi-tenancy support (organization/school).

```typescript
model Organization {
  id            String   @id @default(uuid())
  name          String
  logoUrl       String?
  primaryColor  String   @default("#3B82F6")
  createdAt     DateTime @default(now())

  users User[]
}
```

### Student Profile Models

#### PersonalProfile
Personal information (1-to-1 with Student).

```typescript
model PersonalProfile {
  studentId      String  @id
  preferredName  String?
  phone          String?
  dateOfBirth    DateTime?
  currentSchool  String?
  schoolLocation String?
  parentName     String  @default("")
  parentEmail    String  @default("")
  parentPhone    String  @default("")
  createdAt      DateTime @default(now())

  student Student @relation(fields: [studentId], references: [userId])
}
```

#### AcademicProfile
Academic information (1-to-1 with Student).

```typescript
model AcademicProfile {
  studentId         String
  curriculumType    CurriculumType  // CBSE | ICSE | IB | CAIE | State_Board | US_High_School | Other
  gradingSystemType GradingSystemType  // Marks_Out_Of_100 | Percentage | IB_Scale | Letter_Grade | Other
  currentGpa        String?
  createdAt         DateTime @default(now())

  student Student @relation(fields: [studentId], references: [userId])
}
```

#### Transcript
Course grades and academic records.

```typescript
model Transcript {
  id          String
  studentId   String
  courseName  String
  gradeLevel  GradeLevel  // ninth | tenth | eleventh | twelfth
  semester    Semester    // Fall | Spring | Full_Year
  gradeValue  String      // e.g., "A", "90", "8.5"
  honorsLevel HonorsLevel @default(Standard)  // Standard | Honors | AP | IB_HL | IB_SL
  isBoardExam Boolean     @default(false)
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt

  student Student @relation(fields: [studentId], references: [userId])

  @@unique([studentId, courseName, gradeLevel, semester])
}
```

### Activity & Achievement Models

#### Activity
Extracurricular activities.

```typescript
model Activity {
  id           String
  studentId    String
  activityName String
  category     ActivityCategory  // Academic | Arts_Music | Athletics | Community_Service | Cultural | Leadership | Other
  role         String?
  gradeLevel   GradeLevel
  hoursPerWeek Int
  weeksPerYear Int
  description  String?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  student Student @relation(fields: [studentId], references: [userId])
}
```

#### Achievement
Awards, honors, and recognitions.

```typescript
model Achievement {
  id               String
  studentId        String
  achievementType  AchievementType  // Award_Honor | Competition | Leadership | Social_Impact | Extracurricular
  title            String
  organization     String?
  gradeLevel       GradeLevel?
  dateAchieved     DateTime?
  description      String?
  recognitionLevel RecognitionLevel?  // School | Inter_School | District | City | State | National | International
  verifiableLink   String?
  metrics          String?
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt

  student Student @relation(fields: [studentId], references: [userId])
}
```

#### ProjectExperience
Research, internships, and projects.

```typescript
model ProjectExperience {
  id             String
  studentId      String
  title          String
  experienceType ExperienceType  // Academic_Project | Independent_Project | Research | Internship | Summer_Program | Work_Experience | Volunteer_Project
  organization   String?
  roleTitle      String?
  startDate      DateTime
  endDate        DateTime?
  isOngoing      Boolean @default(false)
  description    String?
  createdAt      DateTime @default(now())

  student Student @relation(fields: [studentId], references: [userId])
}
```

### College Application Models

#### College
University database (64 pre-seeded).

```typescript
model College {
  id            String
  name          String  @unique
  country       String  @default("United States")
  acceptanceRate Float?
  avgGpa        Float?
  avgSat        Int?
  avgAct        Int?
  rankingUsNews Int?
  isActive      Boolean @default(true)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  applications  CollegeApplication[]
  targetColleges TargetCollege[]
}
```

#### TargetCollege
Student's target college list.

```typescript
model TargetCollege {
  id             String
  studentId      String
  collegeId      String
  targetCategory TargetCategory  // Reach | Match | Safety
  priority       Int?

  student Student @relation(fields: [studentId], references: [userId])
  college College @relation(fields: [collegeId], references: [id])

  @@unique([studentId, collegeId])
}
```

#### CollegeApplication
Application tracking.

```typescript
model CollegeApplication {
  id                   String
  studentId            String
  collegeId            String
  targetCategory       TargetCategory  // Reach | Match | Safety
  applicationStatus    ApplicationStatus  // Not_Started | Planning | Researching | Preparing | In_Progress | Submitted | Accepted | Rejected | Waitlisted | Withdrawn | Deferred
  applicationDeadline  DateTime?
  decisionDeadline     DateTime?
  essayStatus          String @default("Not Started")
  supplementsStatus    String @default("Not Started")
  recommendationStatus String @default("Not Requested")
  testScoresSent       Boolean @default(false)
  applicationPortalLink String?
  notes                String?
  decisionReceivedDate DateTime?
  createdAt            DateTime @default(now())
  updatedAt            DateTime @updatedAt

  college College @relation(fields: [collegeId], references: [id])
  student Student @relation(fields: [studentId], references: [userId])

  @@unique([studentId, collegeId])
}
```

#### TestScore
Standardized test scores.

```typescript
model TestScore {
  id                   String
  studentId            String
  testType             String  // SAT | ACT | AP | IB | Duolingo
  testDate             DateTime
  compositeScore       Int
  mathScore            Int?
  englishScore         Int?
  scienceScore         Int?
  readingWritingScore  Int?
  createdAt            DateTime @default(now())

  student Student @relation(fields: [studentId], references: [userId])
}
```

### Meeting & Goals Models

#### Meeting
Coordinator meeting logs.

```typescript
model Meeting {
  id              String
  studentId       String
  coordinatorId   String
  meetingDate     DateTime
  durationMinutes Int?
  meetingType     MeetingType @default(Regular)  // Initial | Regular | Check_In | Goal_Review | Application_Review | Crisis | Final
  topicsDiscussed String[]
  notes           String?
  actionItems     String[]
  nextMeetingDate DateTime?
  studentMood     String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  user    User @relation("CoordinatorMeetings", fields: [coordinatorId], references: [id])
  student Student @relation(fields: [studentId], references: [userId])
}
```

#### ProfileGoal
Student goals and progress.

```typescript
model ProfileGoal {
  id           String
  studentId    String
  goalType     GoalType  // Academic | Testing | Activity | Achievement | Project | Other
  category     String
  targetValue  String
  currentValue String
  deadline     DateTime?
  completedAt  DateTime?
  priority     Int?
  notes        String?
  status       GoalStatus @default(Not_Started)  // Not_Started | In_Progress | Completed | Deferred | Cancelled
  createdAt    DateTime @default(now())

  student Student @relation(fields: [studentId], references: [userId])
}
```

### Audit & Override Models

#### ProfileOverride
Coordinator/counselor profile strength overrides.

```typescript
model ProfileOverride {
  id             String  @unique
  studentId      String  @unique
  overrideScore  Int
  overrideReason String
  overriddenBy   String  // User ID of coordinator/counselor
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  coordinator User @relation(fields: [overriddenBy], references: [id])
  student     Student @relation(fields: [studentId], references: [userId])
}
```

#### ChangeLog
Audit trail of all changes.

```typescript
model ChangeLog {
  id          String
  studentId   String
  changeType  ChangeType  // Profile_Update | Goal_Progress | New_Addition | Improvement | Milestone
  entityType  String      // Type of entity changed (e.g., "Activity", "Achievement")
  entityId    String?     // ID of the changed entity
  action      ChangeAction  // Created | Updated | Deleted | Completed
  fieldName   String?     // Which field was changed
  oldValue    String?
  newValue    String?
  description String
  createdAt   DateTime @default(now())

  student Student @relation(fields: [studentId], references: [userId])
}
```

#### MeetingLog
Meeting history (deprecated, use Meeting).

```typescript
model MeetingLog {
  id        String
  meetingId String?
  userId    String
  studentId String
  logEntry  String
  createdAt DateTime @default(now())

  user    User @relation(fields: [userId], references: [id])
  student Student @relation(fields: [studentId], references: [userId])
}
```

#### ProfileComment
Comments on student profiles.

```typescript
model ProfileComment {
  id        String
  userId    String
  content   String
  createdAt DateTime @default(now())

  user User @relation(fields: [userId], references: [id])
}
```

### Utility Models

#### Subject
Available courses per curriculum.

```typescript
model Subject {
  id             String
  subjectName    String
  curriculumType CurriculumType

  @@unique([subjectName, curriculumType])
}
```

## Enums Reference

### UserRole
```typescript
enum UserRole {
  counselor
  coordinator
  student
}
```

### GradeLevel
```typescript
enum GradeLevel {
  ninth
  tenth
  eleventh
  twelfth
}
```

### CurriculumType
```typescript
enum CurriculumType {
  CBSE
  ICSE
  IB
  CAIE
  State_Board
  US_High_School
  Other
}
```

### GradingSystemType
```typescript
enum GradingSystemType {
  Marks_Out_Of_100
  Percentage
  IB_Scale
  Letter_Grade
  Other
}
```

### Semester
```typescript
enum Semester {
  Fall
  Spring
  Full_Year
}
```

### HonorsLevel
```typescript
enum HonorsLevel {
  Standard
  Honors
  AP
  IB_HL
  IB_SL
}
```

### AchievementType
```typescript
enum AchievementType {
  Award_Honor
  Competition
  Leadership
  Social_Impact
  Extracurricular
}
```

### RecognitionLevel
```typescript
enum RecognitionLevel {
  School
  Inter_School
  District
  City
  State
  National
  International
}
```

### ExperienceType
```typescript
enum ExperienceType {
  Academic_Project
  Independent_Project
  Research
  Internship
  Summer_Program
  Work_Experience
  Volunteer_Project
}
```

### ActivityCategory
```typescript
enum ActivityCategory {
  Academic
  Arts_Music
  Athletics
  Community_Service
  Cultural
  Leadership
  Other
}
```

### GoalType
```typescript
enum GoalType {
  Academic
  Testing
  Activity
  Achievement
  Project
  Other
}
```

### GoalStatus
```typescript
enum GoalStatus {
  Not_Started
  In_Progress
  Completed
  Deferred
  Cancelled
}
```

### TargetCategory
```typescript
enum TargetCategory {
  Reach
  Match
  Safety
}
```

### ApplicationStatus
```typescript
enum ApplicationStatus {
  Not_Started
  Planning
  Researching
  Preparing
  In_Progress
  Submitted
  Accepted
  Rejected
  Waitlisted
  Deferred
  Withdrawn
}
```

### ChangeType
```typescript
enum ChangeType {
  Profile_Update
  Goal_Progress
  New_Addition
  Improvement
  Milestone
}
```

### ChangeAction
```typescript
enum ChangeAction {
  Created
  Updated
  Deleted
  Completed
}
```

### MeetingType
```typescript
enum MeetingType {
  Initial
  Regular
  Check_In
  Goal_Review
  Application_Review
  Crisis
  Final
}
```

## Common Query Patterns

### Fetch Complete Student Profile
```typescript
const student = await prisma.student.findUnique({
  where: { userId: studentId },
  include: {
    user: true,
    personalProfile: true,
    academicProfile: true,
    transcripts: true,
    activities: true,
    achievements: true,
    projectExperiences: true,
    testScores: true,
    collegeApplications: {
      include: { college: true }
    },
    targetColleges: {
      include: { college: true }
    },
    meetings: true,
    profileGoals: true,
    profileOverride: true,
    changeLogs: true
  }
});
```

### Fetch Coordinator's Students
```typescript
const students = await prisma.student.findMany({
  where: { coordinatorId: coordinatorId },
  include: {
    user: true,
    personalProfile: true,
    academicProfile: true
  }
});
```

### Create Achievement with ChangeLog
```typescript
await prisma.achievement.create({
  data: {
    studentId,
    achievementType: "Award_Honor",
    title: "National Science Olympiad",
    recognitionLevel: "National",
    dateAchieved: new Date()
  }
});

// Automatically log the change
await prisma.changeLog.create({
  data: {
    studentId,
    changeType: "New_Addition",
    entityType: "Achievement",
    action: "Created",
    description: "Added achievement: National Science Olympiad"
  }
});
```

## Database Constraints

### Unique Constraints
- `User.email` - Email must be unique
- `College.name` - College names must be unique
- `Subject` - Combination of subjectName and curriculumType must be unique
- `TargetCollege` - Student can only target each college once
- `CollegeApplication` - Student can only apply to each college once
- `Transcript` - Unique combination of studentId, courseName, gradeLevel, semester
- `ProfileOverride` - Each student can have only one override (1-to-1)

### Foreign Keys
- All student-related data cascades on student deletion
- All college relations cascade on college deletion
- User deletion cascades all related data

## Performance Notes

### Indexes (Implicit via Relations)
- `Student.coordinatorId` - For coordinator's student list queries
- `User.organizationId` - For org-level data
- All foreign key fields automatically indexed

### N+1 Query Prevention
Always use `include` to fetch related data in a single query:

```typescript
// ❌ BAD - Multiple queries
const activities = await prisma.activity.findMany({ where: { studentId } });
for (const activity of activities) {
  const student = await prisma.student.findUnique({ where: { userId: activity.studentId } });
}

// ✅ GOOD - Single query
const activities = await prisma.activity.findMany({
  where: { studentId },
  include: { student: true }
});
```

---

**Last Updated**: February 15, 2026
**Version**: 2.0 (Complete Reference)
