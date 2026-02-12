Waypoint College Counseling - Quick Start Summary for New Chat
Current Situation
✅ Database & Schema are FIXED and IN SYNC

Supabase PostgreSQL database is set up
schema.prisma is reconciled with database
Seed data is loaded (counselor, students, colleges, subjects)
Convention: camelCase for BOTH field names AND relation names

❌ Frontend & APIs need fixing

Components and API routes still have wrong casing
Need to fix relation names and field names throughout codebase


Schema Convention (camelCase Everything)
Field Names (camelCase):
typescriptuser.firstName        // NOT first_name
user.lastName         // NOT last_name
user.passwordHash     // NOT password_hash
student.userId        // NOT user_id
student.graduationYear // NOT graduation_year
Relation Names (camelCase):
typescript// CORRECT:
student.personalProfile
student.academicProfile
student.user
student.activities
student.achievements
student.transcripts

// WRONG (PascalCase):
student.PersonalProfile  // ❌
student.AcademicProfile  // ❌
student.User             // ❌
student.Activity         // ❌

What Needs Fixing
Search and replace these patterns across app/, lib/, and components/:
Wrong Patterns to Find:

PascalCase relations: PersonalProfile, AcademicProfile, Student, User, Activity, Achievement (when used in include or property access)
snake_case fields: first_name, last_name, password_hash, user_id, student_id, organization_id

Replace With (camelCase):

Relations: personalProfile, academicProfile, student, user, activities, achievements
Fields: firstName, lastName, passwordHash, userId, studentId, organizationId


Complete Relation Mapping
typescript// Student model relations (all camelCase):
student.personalProfile      // PersonalProfile (1-to-1)
student.academicProfile      // AcademicProfile (1-to-1)
student.user                 // User (1-to-1)
student.coordinator          // User (nullable)
student.primaryCoordinator   // User (nullable)
student.transcripts          // Transcript[]
student.activities           // Activity[]
student.achievements         // Achievement[]
student.projectExperiences   // ProjectExperience[]
student.testScores           // TestScore[]
student.targetColleges       // TargetCollege[]
student.collegeApplications  // CollegeApplication[]
student.meetings             // Meeting[]
student.profileGoals         // ProfileGoal[]
student.profileOverride      // ProfileOverride (nullable)
student.changeLogs           // ChangeLog[]

// Other relations:
meeting.student              // Student
meeting.coordinator          // User
application.student          // Student
application.college          // College
activity.student             // Student

Files to Fix (Likely)
Based on typical Next.js structure:

app/(dashboard)/layout.tsx
app/(dashboard)/student/**/*.tsx
app/(dashboard)/coordinator/**/*.tsx
app/(dashboard)/counselor/**/*.tsx
app/api/**/*.ts (all API routes)
lib/auth.ts
lib/utils/**/*.ts
components/**/*.tsx


Tech Stack

Next.js 14.2.35
Prisma 5.22.0 (camelCase convention)
PostgreSQL (Supabase)
TypeScript 5.5.3


Database Connection
envDATABASE_URL="postgresql://postgres.vevjvvodrfpumjgvqynw:Singaravelan321@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres"
```

---

## Admin Account
- Email: `counselor@waypoint.edu`
- Password: `password123`

---

## Start New Chat With:
```
I have the Waypoint college counseling platform with Next.js + Prisma.

DATABASE & SCHEMA ARE FIXED - using camelCase for everything (fields AND relations).

PROBLEM: Frontend components and API routes still have wrong casing:
- Some use PascalCase relations (PersonalProfile) - should be camelCase (personalProfile)  
- Some use snake_case fields (first_name) - should be camelCase (firstName)

NEED: Systematic search and replace across app/, lib/, components/ to fix all casing mismatches.

Schema uses camelCase convention:
- Relations: personalProfile, academicProfile, user, activities, achievements
- Fields: firstName, lastName, userId, graduationYear

Can you help me:
1. Search for all wrong patterns
2. Create find/replace commands to fix them
3. Verify fixes work