Waypoint College Counseling Platform - Complete Specification

Executive Summary
A comprehensive college counseling platform for high school students applying to colleges, with support for coordinators (student advisors) and counselors (administrators). Tracks student profiles, college applications, test scores, and provides profile strength analysis.

Functional Specifications

1. User Roles & Authentication
Three User Types:

- Students: Complete profiles, track applications, manage test scores
- Coordinators: Manage assigned students, log meetings, view progress
- Counselors: System admins, create users, assign coordinators, override profile scores

Authentication:

Email/password login via NextAuth
Role-based access control
Middleware-protected routes
Session management with JWT


2. Student Features
2.1 Onboarding (7-Step Wizard)

Personal Information

Name, DOB, phone
Current school, location
Parent contact (name, email, phone)


Academic Profile

Curriculum type (CBSE, IB, US High School, CAIE, State Board, ICSE, Other)
Grading system (Marks/100, Percentage, IB Scale, Letter Grade, Other)
Current GPA/marks


Transcript Entry

Course name, grade level, semester
Grade value (adapts to grading system)
Credits, honors level (Standard, Honors, AP, IB HL, IB SL)
Board exam indicator
Dynamic subject selection based on curriculum


Activities

Activity name, category (Academic, Arts/Music, Athletics, Community Service, Cultural, Leadership, Other)
Role, grade levels involved
Hours per week, weeks per year
Description


Achievements

Type (Award/Honor, Competition, Leadership, Social Impact, Extracurricular)
Title, organization
Grade level, date achieved
Description, metrics
Recognition level (School, Inter-School, District, City, State, National, International)
Verifiable link


Projects & Research

Type (Academic Project, Independent Project, Research, Internship, Summer Program, Work Experience)
Title, organization, location
Start/end dates, ongoing status
Role, description, outcomes
Skills learned, project link
Mentor contact info
Status (Completed, In Progress, Planned)


Review & Complete

Summary of all entered data
Profile completion percentage
Submit to finalize onboarding



### 2.2 Profile Management

View Complete Profile: All sections on one page
Edit Individual Sections:

Personal Info
Academic Profile
Transcripts (add/edit/delete)
Activities (add/edit/delete)
Achievements (add/edit/delete)
Projects (add/edit/delete)


Change History: Automatic logging of all profile changes
Profile Strength Analysis:

Scores across 6 categories
Academic Excellence (GPA, rigor, board exams)
Leadership & Impact (roles, recognition)
Research & Innovation (projects, outcomes)
Extracurricular Depth (activities, hours)
Achievement Record (awards, competition results)
Overall Profile Strength
Point-by-point transparency showing what contributes to each score



### 2.3 College Applications

Add Applications:

Select college from 64 pre-seeded colleges
Categorize as Safety/Match/Reach
Application status (11 states: Not Started, Planning, Researching, Preparing, In Progress, Submitted, Under Review, Deferred, Accepted, Rejected, Waitlisted, Withdrawn)
Application deadline, decision deadline
Document status tracking:

Essay status (Not Started, In Progress, Complete)
Supplements status
Recommendation status (Not Requested, Requested, Submitted)
Test scores sent (checkbox)


Application portal link
Notes


View & Manage:

Statistics overview:

Total applications
By category (Safety/Match/Reach counts)
By status (Submitted/In Progress/Not Started)
Decisions (Accepted/Rejected/Waitlisted/Pending)


Deadline tracker:

Next 5 upcoming deadlines
Color-coded urgency (Red: <7 days, Yellow: <14 days, Green: >14 days)
Sorted by date


Filter by category and status
Edit/delete applications
Application table view with all details



### 2.4 Test Scores

Add Test Scores:

Test type (SAT, ACT, AP, IB, Other)
Test date
Composite score
Section scores:

SAT: Math (200-800), Reading & Writing (200-800)
ACT: Math, English, Reading, Science (1-36 each)


Essay score (optional)


View & Manage:

Best SAT score display
Best ACT score display
Grouped by test type
Show all attempts with dates
Edit/delete scores



2.5 Target Colleges

Build College List:

Search from 64 pre-seeded US colleges
Categorize as Safety/Match/Reach
Set priority
Add notes


View List: Organized by category

2.6 Goals & Progress

Set profile improvement goals
Track progress toward goals
Categorize by type (Academic, Testing, Activity, Achievement, Project, Other)

2.7 Dashboard

Quick stats (applications, acceptances, active goals, activities count)
Upcoming deadlines (next 5)
Application progress bars
Quick action cards (Edit Profile, Applications, Analysis)


3. Coordinator Features
3.1 Student Management

View all assigned students
Student list with:

Name, email, grade level
Graduation year
Profile completion percentage
Number of target colleges
Last meeting date



3.2 Meeting Logs

Log Meetings:

Select student
Meeting date, duration (minutes)
Meeting type (Initial, Regular, Check-In, Goal Review, Application Review, Crisis, Final)
Topics discussed (multiple selection)
Notes
Action items
Next meeting date
Student mood


View History:

All meetings sorted by date
Filter by student
View meeting details



3.3 Profile Override

Override student profile strength score
Provide reason for override
Display override prominently on student profile
Track who made override and when

3.4 Student Detail View

Complete student profile visibility
Profile strength score with override capability
Meeting history
Application status

3.5 Dashboard

Total students count
Upcoming meetings
Upcoming student deadlines (across all students, next 10)
Application statistics across students


4. Counselor Features
4.1 User Management

Create Users:

Coordinators (with email/password)
Students (with email/password)


Assign Students to Coordinators
View All Users: Sortable table

4.2 System Administration

View all students (global view)
Search/filter students
Student statistics overview
Access to all coordinator features

4.3 Profile Override

Same capability as coordinators
Admin-level override authority


Technical Specifications
Tech Stack
Frontend:

Next.js 14.2.35 (App Router)
React 18.3.1
TypeScript 5.5.3
Tailwind CSS 3.4.1

Backend:

Next.js API Routes
NextAuth 4.24.10 for authentication

Database:

** PostgreSQL (via Supabase)
** Prisma 5.22.0 as ORM

Authentication:

NextAuth with Credentials provider
bcrypt 5.1.1 for password hashing
JWT-based sessions


Database Schema
20 Models:

User - Core user table

id, email, password_hash, role
first_name, last_name
organization_id
created_at


Student - Extends User for students

user_id (FK to User)
graduation_year, current_grade
coordinator_id, primary_coordinator_id
profile_completion_pct


PersonalProfile - Student personal info

student_id (1-to-1 with Student)
preferred_name, date_of_birth, phone
current_school, school_location
parent_name, parent_email, parent_phone


AcademicProfile - Academic details

student_id (1-to-1)
curriculum_type, grading_system_type
current_gpa


Transcript - Course grades

student_id, course_name
grade_level, semester, grade_value
credits, honors_level
is_board_exam


Activity - Extracurriculars

student_id, activity_name, category
role, grade_levels (JSON)
hours_per_week, weeks_per_year
description


Achievement - Awards/honors

student_id, achievement_type
title, organization
grade_level, date_achieved
description, metrics
recognition_level, verifiable_link


ProjectExperience - Research/projects

student_id, experience_type
title, organization, location
start_date, end_date, is_ongoing
role_title, description, outcomes
skills_learned (JSON), project_link
mentor_name, mentor_email
status


TestScore - Standardized tests

student_id, test_type, test_name
test_date, composite_score
section_scores (JSON)


College - University database

id, name, country
acceptance_rate, avg_gpa, avg_sat, avg_act
ranking_us_news, is_active


TargetCollege - Student's college list

student_id, college_id
category (Safety/Match/Reach)
priority, status, notes


CollegeApplication - Application tracking

student_id, college_id
target_category, application_status
application_deadline, decision_deadline
essay_status, supplements_status
recommendation_status, test_scores_sent
application_portal_link, notes
decision_received_date


Meeting - Coordinator meetings

student_id, coordinator_id
meeting_date, duration_minutes
meeting_type, topics_discussed (Array)
notes, action_items (Array)
next_meeting_date, student_mood


MeetingLog - Meeting history (deprecated, use Meeting)

Similar to Meeting


ProfileGoal - Student goals

student_id, goal_type, category
target_value, current_value
deadline, status, priority
notes, completed_at


ProfileOverride - Counselor overrides

student_id (unique)
override_score, override_reason
overridden_by (FK to User)


ProfileComment - Profile comments

student_id, author_id
comment_text, section
is_private


ChangeLog - Audit trail

student_id, change_type, entity_type
entity_id, action
field_name, old_value, new_value
description


Subject - Available courses

curriculum_type, subject_name
is_default


Organization - Multi-tenancy support

name, logo_url, primary_color



18 Enums:

UserRole, GradeLevel, CurriculumType, GradingSystemType
Semester, HonorsLevel, ActivityCategory, AchievementType
RecognitionLevel, ExperienceType, ProjectStatus
GoalType, GoalStatus, TargetCategory, ApplicationStatus
MeetingType, ChangeType, ChangeAction


Key Relations (CRITICAL - Use PascalCase)
typescript// Student has:
Student.PersonalProfile (1-to-1)
Student.AcademicProfile (1-to-1)
Student.Transcript[] (1-to-many)
Student.Activity[] (1-to-many)
Student.Achievement[] (1-to-many)
Student.ProjectExperience[] (1-to-many)
Student.TestScore[] (1-to-many)
Student.TargetCollege[] (1-to-many)
Student.CollegeApplication[] (1-to-many)
Student.Meeting[] (1-to-many)
Student.ProfileGoal[] (1-to-many)
Student.ProfileOverride (1-to-1, nullable)
Student.ChangeLog[] (1-to-many)
Student.User (1-to-1) - the user account
Student.coordinator (nullable) - assigned coordinator
```

---

### File Structure
```
waypoint/
├── app/
│   ├── (auth)/
│   │   └── login/page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   ├── student/
│   │   │   ├── page.tsx (dashboard)
│   │   │   ├── onboarding/page.tsx
│   │   │   ├── profile/page.tsx
│   │   │   ├── applications/page.tsx
│   │   │   ├── test-scores/page.tsx
│   │   │   ├── colleges/page.tsx
│   │   │   ├── goals/page.tsx
│   │   │   ├── history/page.tsx
│   │   │   ├── analysis/page.tsx
│   │   │   └── edit/
│   │   │       ├── personal/page.tsx
│   │   │       ├── academic/page.tsx
│   │   │       ├── transcripts/page.tsx
│   │   │       ├── activities/page.tsx
│   │   │       ├── achievements/page.tsx
│   │   │       └── projects/page.tsx
│   │   ├── coordinator/
│   │   │   ├── page.tsx (dashboard)
│   │   │   ├── meetings/
│   │   │   │   ├── page.tsx
│   │   │   │   └── new/page.tsx
│   │   │   └── students/[studentId]/page.tsx
│   │   └── counselor/
│   │       ├── page.tsx (dashboard)
│   │       ├── manage-users/page.tsx
│   │       └── students/[studentId]/page.tsx
│   └── api/
│       ├── auth/[...nextauth]/route.ts
│       ├── enums/route.ts
│       ├── colleges/route.ts
│       ├── subjects/route.ts
│       ├── onboarding/ (7 endpoints)
│       ├── student/ (15+ endpoints)
│       ├── coordinator/ (4 endpoints)
│       └── counselor/ (3 endpoints)
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   └── progress-bar.tsx
│   └── forms/onboarding/
│       ├── OnboardingWizard.tsx
│       ├── PersonalProfileForm.tsx
│       ├── AcademicProfileForm.tsx
│       ├── TranscriptForm.tsx
│       ├── ActivityForm.tsx
│       ├── AchievementForm.tsx
│       └── ProjectForm.tsx
├── lib/
│   ├── auth.ts
│   ├── prisma.ts
│   ├── hooks/useEnums.ts
│   └── utils/
│       ├── profile-strength.ts
│       ├── profile-analysis-detailed.ts
│       ├── profile-completion.ts
│       └── change-log.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/ (6 migrations)
├── middleware.ts
├── next.config.js
├── package.json
└── tsconfig.json

Environment Variables
env# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_SECRET="..." (generate with: openssl rand -base64 32)
NEXTAUTH_URL="http://localhost:3000" (dev) or production URL

Current Status & Known Issues
✅ What Works:

All features listed above were 100% functional
Database seeded with:

1 counselor (admin@waypoint.edu / Admin@2024!)
5 sample students (diverse curricula)
64 US colleges
Sample data across all models



❌ Current Issue:

Prisma relation name mismatch
Schema uses PascalCase (correct): PersonalProfile, Student, User
Code uses camelCase (wrong): personal_profile, student, user
Causes "Unknown field" errors throughout app
Occurred during production deployment attempt

🔧 Fix Needed:

Update ALL code files to use PascalCase relation names
Keep scalar fields as snake_case (student_id, user_id, etc.)
Files affected: app/, lib/, components/ (all .ts and .tsx)


Production Deployment Plan
Database:

Supabase PostgreSQL (already set up)
Production URL: postgresql://postgres.vevjvvodrfpumjgvqynw:Singaravelan321@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres
Migrations: 6 migrations applied
Seed: Admin account created

Hosting:

Vercel
Environment variables configured
Build command: prisma generate && next build

Remaining Steps:

Fix relation names in code
Test locally (npm run dev)
Build locally (npm run build)
Deploy to Vercel (vercel --prod)
Test production deployment


Summary
This is a complete, production-ready college counseling platform with comprehensive features for students, coordinators, and counselors. The only blocker is fixing the Prisma relation name casing throughout the codebase to match the schema's PascalCase convention.
Start new chat with: "I need to fix Prisma relation names from camelCase to PascalCase throughout the Waypoint college counseling codebase. The schema is correct (PascalCase), but the code uses camelCase. Need systematic fixes across app/, lib/, and components/ folders."