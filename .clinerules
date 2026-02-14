# Waypoint College Counseling Platform - Claude Code Rules

## Project Overview
Next.js 14 college counseling platform with Prisma ORM, PostgreSQL (Supabase), and NextAuth authentication.

## Tech Stack
- Next.js 14.2.35 (App Router)
- Prisma 5.22.0 (camelCase convention)
- PostgreSQL via Supabase
- NextAuth 4.24.10
- TypeScript 5.5.3
- Tailwind CSS 3.4.1
- React Hook Form + Zod validation

## Critical Conventions

### Prisma Schema (camelCase Everything)
**Field Names:** camelCase
- firstName, lastName, passwordHash
- userId, studentId, organizationId
- graduationYear, currentGrade

**Relation Names:** camelCase
- student.personalProfile (NOT PersonalProfile)
- student.academicProfile (NOT AcademicProfile)
- student.user, student.activities, student.achievements
- meeting.student, meeting.coordinator

### File Naming
- Components: PascalCase (StudentProfile.tsx)
- Utils/Hooks: camelCase (useStudent.ts)
- API Routes: kebab-case folders, route.ts files

### Code Style
- Use TypeScript strict mode
- Async/await over promises
- Server components by default, 'use client' only when needed
- Error boundaries for all data fetching

## Database
- Dev DB: Supabase (same as production for pilot)
- Connection: See .env.local
- Admin: counselor@waypoint.edu / password123

## Enums Usage
- Leverage Enums wherever possible instead of local variables for dropdown in user interface.

## Common Tasks

### Adding a New Feature
1. Update Prisma schema if needed
2. Run: prisma migrate dev --name feature_name
3. Update API routes in app/api/
4. Create/update components in app/(dashboard)/
5. Test locally with npm run dev

### Fixing Prisma Errors
- "Unknown field": Check relation names are camelCase
- "Type mismatch": Regenerate client with: prisma generate
- Schema drift: Run: prisma migrate status

### Before Committing
- npm run build (must succeed)
- Check TypeScript: npx tsc --noEmit
- Test authentication flow
- Verify all CRUD operations work

## Project Structure
```
app/
├── (auth)/login/          # Authentication
├── (dashboard)/
│   ├── student/           # Student features
│   ├── coordinator/       # Coordinator features  
│   └── counselor/         # Admin features
└── api/                   # API routes

components/
├── ui/                    # Reusable UI components
└── forms/onboarding/      # 7-step onboarding wizard

lib/
├── auth.ts               # NextAuth config
├── prisma.ts             # Prisma client
└── utils/                # Helper functions

prisma/
├── schema.prisma         # Database schema (SOURCE OF TRUTH)
└── migrations/           # Migration history
```

## Key Models
- User (counselor/coordinator/student)
- Student (extends User)
- PersonalProfile, AcademicProfile
- Activity, Achievement, ProjectExperience
- TestScore, Transcript
- College, CollegeApplication
- Meeting, ProfileGoal, ProfileOverride

## Don't
- Never use PascalCase for Prisma relation names
- Never use snake_case for field names
- Don't edit migrations after they're applied
- Don't use 'prisma db push' in production
- Never commit .env files (use .env.example)

## Do
- Always run 'prisma generate' after schema changes
- Use server-side validation on all API routes
- Include error handling in all async functions
- Test with multiple user roles
- Keep components small and focused
