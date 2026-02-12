# Waypoint College Counseling Platform - Project Context

## Original Requirements
- College counseling platform for students, coordinators, and counselors
- Student onboarding with 7-step wizard
- Profile management with multiple sections
- Application tracking system
- Test scores management
- Profile strength analysis with transparency
- Counselor override system
- Meeting logging for coordinators

## Tech Stack
- Next.js 14.2.35
- Prisma 5.22.0 (PostgreSQL via Supabase)
- NextAuth for authentication
- TypeScript
- Tailwind CSS

## Database
- **Development DB**: Supabase (existing, seeded with 5 students + 64 colleges)
- **Production DB**: Supabase (fresh, migrations applied)
- Connection String: postgresql://postgres.vevjvvodrfpumjgvqynw:Singaravelan321@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres

## Completed Features (100% Working Before Deployment Attempt)

### ✅ Authentication System
- NextAuth with credential provider
- Role-based access (student/coordinator/counselor)
- Middleware protection for routes

### ✅ Student Onboarding (7 Steps)
- Personal info (name, DOB, school, parent contact)
- Academic profile (curriculum type, grading system, GPA)
- Transcript entry (dynamic based on grading system)
- Activities (with hours/week calculation)
- Achievements (with recognition levels)
- Projects/Research experiences
- Review and complete

### ✅ Profile System
- View complete profile with all sections
- Edit each section individually:
  - Personal Info
  - Academic Profile
  - Transcripts (add/edit/delete)
  - Activities (add/edit/delete)
  - Achievements (add/edit/delete)
  - Projects (add/edit/delete)

### ✅ Profile Strength Analysis
- Detailed scoring across 6 categories
- Point-by-point transparency
- Shows which items contribute to score
- Academic Excellence, Leadership, Research, etc.

### ✅ Counselor Override System
- Counselors can override profile strength scores
- Reason tracking
- Display on student profile
- Admin audit trail

### ✅ Coordinator Features
- View assigned students
- Dashboard with student stats
- Log meetings with students
- View meeting history
- Student detail view with override capability

### ✅ Counselor Admin Panel
- Create coordinators
- Create students
- Assign students to coordinators
- Manage all users
- View all students

### ✅ Application Tracking
- Add/edit/delete college applications
- Track by category (Safety/Match/Reach)
- Application status tracking (11 states)
- Deadline management (application + decision)
- Document status (essays, supplements, recommendations)
- Statistics overview (by category, status, decisions)
- Deadline tracker with color-coded urgency
- Filter by category and status

### ✅ Test Scores Management
- Add/edit/delete test scores
- Support for SAT, ACT, AP, IB, Other
- Section scores (SAT: Math + R&W, ACT: all 4 sections)
- Best score display
- Grouped by test type

### ✅ Target Colleges
- Add colleges to target list
- Categorize as Safety/Match/Reach
- 64 colleges pre-seeded

### ✅ Change History
- Automatic logging of profile changes
- Track what changed, when, by whom
- Display on student history page

### ✅ Goals System
- Set profile goals
- Track progress
- Categorize by type

## Database Schema (20 Models, 18 Enums)

### Main Models
- User (counselor/coordinator/student roles)
- Student (extends User for students)
- PersonalProfile, AcademicProfile
- Transcript, Activity, Achievement, ProjectExperience
- TestScore, ProfileGoal, ChangeLog
- College, TargetCollege, CollegeApplication
- Meeting, MeetingLog
- ProfileOverride, ProfileComment
- Organization, Subject

### Key Relations (CURRENT ISSUE)
**Schema uses PascalCase:** `PersonalProfile`, `AcademicProfile`, `Student`, `User`
**Code uses camelCase:** `personal_profile`, `academic_profile`, `student`, `user`

## Current Status: BROKEN

### What Happened
1. Everything was working perfectly in dev
2. Attempted production deployment to Vercel
3. Changed Prisma schema relations from PascalCase to camelCase
4. This broke ALL queries across the app
5. Attempted to revert but dependency issues crept in
6. Now getting "Unknown field" errors everywhere

### Immediate Issues
1. **Prisma relation name mismatch**: Schema has PascalCase, code has camelCase
2. **Import errors**: Some files importing `bcryptjs` instead of `bcrypt`
3. **Dev server runs** but pages crash on load
4. **Not logged in** (admin account exists in DB: admin@waypoint.edu / Admin@2024!)

### Files Known to Have Issues
- `app/(dashboard)/layout.tsx` - uses `personal_profile`, `academic_profile`
- `app/(dashboard)/coordinator/meetings/page.tsx` - uses `student`, `user`
- `app/(dashboard)/coordinator/page.tsx` - uses `user`, `meetings`, `target_colleges`
- `app/(dashboard)/counselor/page.tsx` - uses `user`, `academic_profile`
- All student detail pages
- All API routes that query relations

## What Needs to Happen

### Option 1: Fix Code to Match Schema (Recommended)
- Find all `.ts` and `.tsx` files
- Replace `personal_profile` → `PersonalProfile`
- Replace `academic_profile` → `AcademicProfile`
- Replace relation names to PascalCase across ALL files
- Keep field names as snake_case (those are correct)

### Option 2: Fix Schema to Match Code
- Revert to camelCase relations in schema
- Regenerate Prisma Client
- No database migration needed (relations are code-only)

## File Structure
```
waypoint/
├── app/
│   ├── (auth)/
│   │   └── login/
│   ├── (dashboard)/
│   │   ├── layout.tsx (NEEDS FIX)
│   │   ├── student/ (profile, onboarding, applications, test-scores, etc.)
│   │   ├── coordinator/ (dashboard, meetings, students)
│   │   └── counselor/ (dashboard, manage-users, students)
│   └── api/ (all working before schema change)
├── components/
│   ├── ui/ (button, card, input, select, progress-bar)
│   └── forms/onboarding/ (7-step wizard components)
├── lib/
│   ├── auth.ts
│   ├── prisma.ts
│   └── utils/ (profile-strength, change-log, etc.)
├── prisma/
│   ├── schema.prisma (CURRENT ISSUE: PascalCase relations)
│   ├── schema.backup.prisma (might not exist)
│   └── migrations/ (6 migrations applied)
└── package.json (dependencies locked to working versions)
```

## Environment Variables
```env
DATABASE_URL=postgresql://postgres.vevjvvodrfpumjgvqynw:Singaravelan321@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres
NEXTAUTH_SECRET=[generated]
NEXTAUTH_URL=http://localhost:3000 (dev) or https://waypoint.vercel.app (prod)
```

## Next Steps (In Projects Mode)
1. Search all files for relation name usage
2. Create comprehensive find/replace list
3. Fix all PascalCase/camelCase mismatches
4. Test login → student dashboard → all pages
5. Build for production locally
6. Deploy to Vercel with correct build config
7. Seed admin account in production
8. Test production deployment

## Success Criteria
- ✅ Login works
- ✅ All dashboards load (student/coordinator/counselor)
- ✅ Student onboarding works
- ✅ Profile editing works
- ✅ Applications page works
- ✅ Test scores page works
- ✅ npm run build succeeds
- ✅ Production deployment works
