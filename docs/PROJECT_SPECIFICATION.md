# Waypoint College Counseling Platform - Complete Specification

## Executive Summary

Waypoint is a production-ready web application for comprehensive college counseling. It serves three user roles: students managing their college applications and academic profiles, coordinators overseeing student progress, and counselors administering the system.

**Status**: ✅ Live on Vercel | **Database**: PostgreSQL (Supabase) | **Hosting**: Vercel (auto-deploy)

---

## Table of Contents

1. [Functional Specifications](#functional-specifications)
2. [Technical Architecture](#technical-architecture)
3. [Database Schema](#database-schema)
4. [API Endpoints](#api-endpoints)
5. [Code Conventions](#code-conventions)
6. [Deployment & Operations](#deployment--operations)

---

## Functional Specifications

### User Roles & Authentication

#### Three User Types

| Role | Purpose | Key Features |
|------|---------|--------------|
| **Student** | Manage college prep profile and applications | Onboarding wizard, profile management, application tracking, goal setting |
| **Coordinator** | Oversee assigned students | Student dashboard, meeting logs, profile overrides, deadline tracking |
| **Counselor** | System administration | User management, global view, admin overrides |

#### Authentication System
- Email/password login via NextAuth
- bcrypt password hashing (10 rounds)
- JWT-based session management
- Role-based access control (RBAC) via middleware
- Protected routes with automatic redirection

---

### Student Features

#### 1. 7-Step Onboarding Wizard

**Step 1: Personal Information**
- Full name, preferred name
- Date of birth
- Phone number
- Current school name and location
- Parent/guardian contact (name, email, phone)

**Step 2: Academic Profile**
- Curriculum type (CBSE, ICSE, IB, CAIE, State Board, US High School, Other)
- Grading system (Marks/100, Percentage, IB Scale, Letter Grade, Other)
- Current GPA/marks
- Dynamically loads appropriate subjects based on curriculum

**Step 3: Transcripts**
- Course name (from subject picklist)
- Grade level (9th, 10th, 11th, 12th)
- Semester (Fall, Spring, Full Year)
- Grade value (adapts to selected grading system)
- Honors level (Standard, Honors, AP, IB HL, IB SL)
- Board exam indicator (checkbox)
- Add unlimited courses

**Step 4: Activities**
- Activity name and category (Academic, Arts/Music, Athletics, Community Service, Cultural, Leadership, Other)
- Role in activity
- Grade levels involved
- Hours per week and weeks per year
- Description and notes

**Step 5: Achievements**
- Achievement type (Award/Honor, Competition, Leadership, Social Impact, Extracurricular)
- Title and organization
- Grade level and date achieved
- Description and metrics
- Recognition level (School → International scale)
- Verifiable link (optional)

**Step 6: Projects & Research**
- Experience type (Academic Project, Independent Project, Research, Internship, Summer Program, Work Experience, Volunteer Project)
- Title, organization, location
- Start/end dates, ongoing status
- Role title and description
- Outcomes, skills learned
- Project link and mentor contact
- Status tracking

**Step 7: Review & Completion**
- Summary of all entered data
- Profile completion percentage (0-100%)
- Submit to finalize onboarding

#### 2. Profile Management
- **View Complete Profile**: All sections on one page with clean organization
- **Edit Individual Sections**: Students can update any section independently without re-entering all data
- **Real-Time Completion Tracking**: Automatic percentage calculation based on sections filled
- **Student Phase Tracking**: Tracks student journey through Onboarding, Profile Building, and College Applications
- **Full Change History**: Every modification logged with timestamp and change details
- **Profile Strength Analysis**: Instant feedback on college readiness

#### 3. College Application Tracking

**Application Management**
- Select from 64 pre-seeded US colleges
- Categorize as Safety, Match, or Reach
- Track application status through 11 states:
  - Not Started, Planning, Researching, Preparing
  - In Progress, Submitted, Under Review
  - Accepted, Rejected, Waitlisted, Deferred, Withdrawn
- Set application and decision deadlines
- Track documents:
  - Essay status (Not Started, In Progress, Complete)
  - Supplements status
  - Recommendation status (Not Requested, Requested, Submitted)
  - Test scores sent (checkbox)
- Add application portal link and notes

**Application Dashboard**
- Statistics overview (total, by category, by status)
- Deadline tracker with color-coded urgency:
  - Red: Less than 7 days
  - Yellow: 7-14 days
  - Green: More than 14 days
- Application table with all details
- Filter and sort capabilities

#### 4. Test Score Management
- Support for multiple test types (SAT, ACT, AP, IB, Duolingo)
- Composite score and section scores:
  - SAT: Math (200-800), Reading & Writing (200-800)
  - ACT: Math, English, Reading, Science (1-36 each)
- Test date tracking
- Best score highlighting
- Multiple attempts tracking
- Essay scores (optional)

#### 5. Target College List
- Search from 64 college database
- Categorize as Reach, Match, or Safety
- Priority ranking
- Summary statistics by category
- Quick notes for each college

#### 6. Goals & Progress Tracking
- Create improvement goals with:
  - Goal type (Academic, Testing, Activity, Achievement, Project, Other)
  - Target and current values
  - Deadline dates
  - Priority levels
- Status management (Not Started, In Progress, Completed, Deferred, Cancelled)
- Automatic change log entries
- Visual progress tracking

#### 7. Profile Strength Analysis

**Six-Category Scoring System**

| Category | Factors | Max Score |
|----------|---------|-----------|
| **Academic Excellence** | GPA/marks, course rigor, board exams, honors level | 20 |
| **Leadership & Impact** | Leadership roles, recognition levels, social impact | 20 |
| **Research & Innovation** | Research projects, internships, innovation indicators | 15 |
| **Extracurricular Depth** | Activity count, hours per week, sustained involvement | 15 |
| **Achievement Record** | Awards, competitions, national/international recognition | 20 |
| **Overall Strength** | Holistic profile assessment | 10 |

**Analysis Components**
- Point-by-point transparency (what contributes to each score)
- Identified strengths (scores ≥ 80)
- Identified weaknesses (scores < 60)
- Personalized recommendations for improvement
- College readiness level determination (Competitive, Strong, Developing, Emerging)

#### 8. Student Dashboard
- Profile completion percentage
- Current profile strength score
- Quick statistics:
  - Total applications (with breakdown by status)
  - Upcoming deadlines (next 5)
  - Active goals count
  - Total activities/achievements
- Application progress visualization
- Upcoming deadlines with color-coded urgency
- Quick action cards for common tasks

---

### Coordinator Features

#### 1. Student Management Dashboard
- List of assigned students with:
  - Student name and email
  - Grade level and graduation year
  - Profile completion percentage
  - Target college count
  - Last meeting date
  - Quick view profile link

#### 2. Meeting Logs
- **Log Meeting**:
  - Select student
  - Meeting date and duration
  - Meeting type (Initial, Regular, Check-In, Goal Review, Application Review, Crisis, Final)
  - Topics discussed (multiple selection from enum)
  - Notes (free text)
  - Action items (list)
  - Next meeting date
  - Student mood/engagement level
  
- **View History**:
  - All meetings sorted by date
  - Filter by student
  - View detailed meeting information

#### 3. Profile Override Capability
- Override student's profile strength score
- Provide reason for override
- Prominent override display on student profile
- Audit trail (who, when, why)
- Can be reviewed by counselors

#### 4. Student Detail View
- Complete student profile visibility
- Profile strength with override option
- Meeting history with details
- Application status overview
- Goal tracking
- Change history
- Recommendations based on profile analysis

#### 5. Coordinator Dashboard
- Total assigned students count
- Upcoming meetings (next 5)
- Upcoming student deadlines (across all assigned students, sorted by date)
- Application statistics:
  - Total applications across students
  - By status (submitted, in progress, not started)
  - By decision (accepted, rejected, waitlisted, pending)

---

### Counselor/Admin Features

#### 1. User Management
- **Create Users**:
  - Create new coordinator accounts with email and password
  - Create new student accounts with email and password
  - Automatic account activation and login capability
  
- **Assign Students**:
  - Assign students to specific coordinators
  - View coordinator-student relationships
  - Reassign students as needed
  
- **User Directory**:
  - Sortable table of all users
  - Filter by role
  - View user details
  - Delete users if needed

#### 2. System Administration
- **Global Student View**: Access all students in the organization
- **Search & Filter**: Find students by name, email, graduation year
- **Organization Statistics**:
  - Total students count
  - Total coordinators count
  - Profile completion average
  - Application submission rate
  - Acceptance rate statistics
- **Profile Override Authority**: Same capabilities as coordinators plus system-wide override visibility

#### 3. Subject/Curriculum Management
- **Manage Subjects**: Add/remove subjects per curriculum type
- **Curriculum Support**: Automatically populates transcript forms based on student's curriculum selection
- **Subject Organization**: Subjects unique per curriculum (CBSE, IB, ICSE, etc.)

#### 4. College Database Management
- **Manage Colleges**: Centralized database of 64+ US colleges
- **Edit Details**: Update acceptance rates, rankings, and other statistics
- **Add New**: Add new colleges to the system as needed

#### 5. Counselor Dashboard
- Organization-wide statistics
- Key metrics:
  - Total students
  - Students in onboarding
  - Average profile strength score
  - Application submission rate
  - Students with active coordinators
- Quick access to user management
- System health indicators

---

## Technical Architecture

### Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Frontend** | Next.js 14 (App Router) | 14.2.35 |
| **UI Framework** | React | 18.3.1 |
| **Language** | TypeScript | 5.5.3 |
| **Styling** | Tailwind CSS | 3.4.1 |
| **Database ORM** | Prisma | 5.22.0 |
| **Database** | PostgreSQL (Supabase) | Latest |
| **Authentication** | NextAuth.js | 4.24.10 |
| **Password Hashing** | bcrypt | 5.1.1 |
| **Form Validation** | Zod | Latest |
| **Form Management** | React Hook Form | Latest |

### Architecture Overview

```
┌─────────────────────────────────────────┐
│        Browser (Client)                 │
│     React + TypeScript + Tailwind       │
└────────────┬────────────────────────────┘
             │ HTTP/HTTPS
┌────────────▼────────────────────────────┐
│     Next.js 14 Server (App Router)      │
├─────────────────────────────────────────┤
│  Authentication (NextAuth)              │
│  Middleware (RBAC)                      │
│  API Routes (RESTful)                   │
│  Server Components & Data Fetching      │
└────────────┬────────────────────────────┘
             │ SQL
┌────────────▼────────────────────────────┐
│   Prisma ORM Client                     │
└────────────┬────────────────────────────┘
             │ PostgreSQL Protocol
┌────────────▼────────────────────────────┐
│  PostgreSQL (Supabase)                  │
│  - 20 Models                            │
│  - 17 Enums                             │
│  - Audit Trail & Change Logs            │
└─────────────────────────────────────────┘
```

### Project Structure

```
waypoint/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx              # Login page
│   │   └── layout.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx                  # Dashboard layout with nav
│   │   ├── student/                    # Student portal
│   │   │   ├── page.tsx                # Dashboard
│   │   │   ├── onboarding/             # 7-step wizard
│   │   │   ├── profile/                # View full profile
│   │   │   ├── applications/           # College applications
│   │   │   ├── test-scores/            # Test score management
│   │   │   ├── colleges/               # Target colleges
│   │   │   ├── goals/                  # Goals tracking
│   │   │   ├── analysis/               # Profile strength analysis
│   │   │   ├── history/                # Change history
│   │   │   └── edit/                   # Edit individual sections
│   │   ├── coordinator/                # Coordinator portal
│   │   │   ├── page.tsx                # Dashboard
│   │   │   ├── meetings/               # Meeting management
│   │   │   └── students/               # Student management
│   │   └── counselor/                  # Admin portal
│   │       ├── page.tsx                # Dashboard
│   │       ├── manage-users/           # User management
│   │       └── students/               # Global student view
│   └── api/
│       ├── auth/[...nextauth]/         # NextAuth routes
│       ├── enums/                      # Enum values endpoint
│       ├── colleges/                   # College database
│       ├── subjects/                   # Subject management
│       ├── onboarding/                 # Onboarding endpoints
│       ├── student/                    # Student data endpoints
│       ├── coordinator/                # Coordinator endpoints
│       └── counselor/                  # Admin endpoints
├── components/
│   ├── ui/                             # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   └── progress-bar.tsx
│   ├── forms/onboarding/               # Onboarding wizard forms
│   │   ├── OnboardingWizard.tsx
│   │   ├── PersonalProfileForm.tsx
│   │   ├── AcademicProfileForm.tsx
│   │   ├── TranscriptForm.tsx
│   │   ├── ActivityForm.tsx
│   │   ├── AchievementForm.tsx
│   │   └── ProjectForm.tsx
│   └── dashboard/                      # Dashboard components
│       └── StudentFullProfile.tsx
├── lib/
│   ├── auth.ts                         # NextAuth configuration
│   ├── prisma.ts                       # Prisma client singleton
│   ├── api-helpers/                    # API helper functions
│   │   ├── change-log.ts               # Change log utilities
│   │   └── profile.ts                  # Profile utilities
│   ├── hooks/
│   │   └── useEnums.ts                 # Enum values hook
│   ├── utils/
│   │   ├── profile-strength.ts         # Profile scoring algorithm
│   │   ├── profile-analysis-detailed.ts # Detailed analysis
│   │   ├── profile-completion.ts       # Completion percentage
│   │   └── change-log.ts               # Change log formatting
│   └── validations/                    # Zod schemas
│       ├── student.ts
│       └── activity.ts
├── prisma/
│   ├── schema.prisma                   # Database schema (SOURCE OF TRUTH)
│   ├── migrations/                     # Migration history
│   ├── seed.ts                         # Initial seed data
│   ├── seed-colleges.ts                # 64 US colleges
│   ├── seed-students.ts                # Sample students
│   └── seed-subjects.ts                # Curriculum subjects
├── types/
│   └── next-auth.d.ts                  # NextAuth type extensions
├── middleware.ts                       # RBAC middleware
├── next.config.js                      # Next.js configuration
├── tailwind.config.ts                  # Tailwind configuration
├── tsconfig.json                       # TypeScript configuration
└── package.json                        # Dependencies
```

---

## Database Schema

See [SCHEMA_REFERENCE.md](SCHEMA_REFERENCE.md) for complete schema details.

### Models Overview (20 Total)

**Core**: User, Student, Organization
**Profile**: PersonalProfile, AcademicProfile, Transcript
**Activities**: Activity, Achievement, ProjectExperience
**College Prep**: College, TargetCollege, CollegeApplication, TestScore
**Coordination**: Meeting, MeetingLog, ProfileGoal, ProfileOverride, ProfileComment
**Admin**: ChangeLog, Subject

### Enums (18 Total)

UserRole, StudentPhase, GradeLevel, CurriculumType, GradingSystemType, Semester, HonorsLevel, AchievementType, RecognitionLevel, ExperienceType, ActivityCategory, GoalType, GoalStatus, TargetCategory, ApplicationStatus, ChangeType, ChangeAction, MeetingType

### Database Constraints

- Unique: User.email, College.name, Subject (subjectName + curriculumType)
- One-to-One: Student-PersonalProfile, Student-AcademicProfile, Student-ProfileOverride
- One-to-Many: All other relations
- Cascading Deletes: Student deletion cascades all related data

---

## API Endpoints

### Authentication
- `POST /api/auth/[...nextauth]/` - NextAuth routes (login, logout, callback)

### Enums & Reference
- `GET /api/enums/` - All enum values for dropdowns
- `GET /api/colleges/` - College database search
- `GET /api/subjects/` - Available subjects by curriculum

### Student Endpoints
- `GET/POST /api/student/profile/` - Profile operations
- `GET/POST /api/student/personal/` - Personal info
- `GET/POST /api/student/academic/` - Academic profile
- `GET/POST/DELETE /api/student/transcripts/` - Transcript management
- `GET/POST/DELETE /api/student/activities/[id]/` - Activity CRUD
- `GET/POST/DELETE /api/student/achievements/` - Achievement CRUD
- `GET/POST/DELETE /api/student/projects/` - Project CRUD
- `GET/POST /api/student/test-scores/` - Test score management
- `GET/POST /api/student/applications/` - Application tracking
- `GET/POST /api/student/target-colleges/` - Target college list
- `GET/POST /api/student/goals/` - Goal management
- `GET /api/student/profile-analysis/` - Profile strength analysis
- `GET /api/student/changelog/` - Change history
- `GET /api/student/dashboard-stats/` - Dashboard statistics

### Onboarding Endpoints
- `GET /api/onboarding/status/` - Onboarding progress
- `POST /api/onboarding/personal/` - Save personal info
- `POST /api/onboarding/academic/` - Save academic profile
- `POST /api/onboarding/transcripts/` - Save transcripts
- `POST /api/onboarding/activities/` - Save activities
- `POST /api/onboarding/achievements/` - Save achievements
- `POST /api/onboarding/projects/` - Save projects
- `POST /api/onboarding/test-scores/` - Save test scores
- `POST /api/onboarding/complete/` - Complete onboarding

### Coordinator Endpoints
- `GET /api/coordinator/students/` - List assigned students
- `GET /api/coordinator/students/[studentId]` - Student details
- `POST /api/coordinator/meetings/` - Log meeting
- `GET /api/coordinator/dashboard-stats/` - Coordinator dashboard stats
- `POST /api/coordinator/profile-override/[studentId]` - Override profile score

### Counselor Endpoints
- `GET/POST /api/counselor/users/` - User management
- `POST /api/counselor/assign-coordinator/[studentId]` - Assign student
- `GET /api/counselor/coordinators/` - List coordinators

---

## Code Conventions

### Critical: camelCase for Prisma Relations

See [SCHEMA_REFERENCE.md](SCHEMA_REFERENCE.md) for complete convention guide.

**Relations (MUST use camelCase)**:
```typescript
student.personalProfile    // ✅ CORRECT
student.academicProfile    // ✅ CORRECT
student.activities         // ✅ CORRECT
student.PersonalProfile    // ❌ WRONG - Never PascalCase
```

**Field Names (MUST use camelCase)**:
```typescript
user.firstName             // ✅ CORRECT (not first_name)
user.passwordHash          // ✅ CORRECT (not password_hash)
student.graduationYear     // ✅ CORRECT (not graduation_year)
```

### File Naming
- **Components**: PascalCase (`StudentProfile.tsx`, `OnboardingWizard.tsx`)
- **Utilities**: camelCase (`useStudent.ts`, `profileStrength.ts`)
- **API Routes**: kebab-case folders with `route.ts` (`app/api/student/profile/route.ts`)

### Code Style
- Use TypeScript strict mode
- Async/await over `.then()` chains
- Server components by default, `'use client'` only when needed
- Error boundaries for data fetching
- Zod for runtime validation on API routes
- Always include error handling

---

## Deployment & Operations

### Environment

**Production**: https://waypoint-pilot.vercel.app
**Database**: Supabase PostgreSQL
**Hosting**: Vercel (auto-deploy from `main` branch)
**Admin**: counselor@waypoint.edu / password123

### Pre-Deployment Checklist

```bash
# 1. Build
npm run build

# 2. Type checking
npx tsc --noEmit

# 3. Linting
npm run lint

# 4. Test locally
npm run dev
# Test all features at http://localhost:3000

# 5. Run TESTING_CHECKLIST.md

# 6. Commit and push
git add .
git commit -m "feature: description"
git push origin main

# Vercel automatically deploys
```

### Database Migrations

```bash
# Create new migration
npx prisma migrate dev --name feature_name

# Check status
npx prisma migrate status

# Push schema only (dev)
npx prisma db push

# Production: Always use migrate
```

### Seed Data

```bash
# Initial users and data
npx tsx prisma/seed.ts

# 64 US colleges
npx tsx prisma/seed-colleges.ts

# Curriculum subjects
npx tsx prisma/seed-subjects.ts
```

### Troubleshooting

| Issue | Solution |
|-------|----------|
| "Prisma Client not found" | `npx prisma generate` |
| "Unknown field" error | Check using camelCase for relations |
| "Column does not exist" | Run `npx prisma migrate dev` |
| Build fails | Run locally: `npm run build` |

---

## Known Limitations & Future Enhancements

### Not Yet Implemented
- Email notifications
- PDF report generation
- File upload for documents
- Advanced analytics
- Mobile app
- Real-time features
- Messaging system
- Parent portal

### Potential Improvements
- Export student data (CSV, PDF)
- Batch user import
- Custom profile questions
- Video integration
- Document management
- Integration with college portals

---

## Support & Resources

- [Development Guide](DEVELOPMENT.md)
- [Database Schema Reference](SCHEMA_REFERENCE.md)
- [Testing Checklist](TESTING_CHECKLIST.md)
- [Project Context](PROJECT_CONTEXT.md)

---

**Last Updated**: February 16, 2026
**Version**: 2.1 (Production)
**Deployment Status**: ✅ Live on Vercel
