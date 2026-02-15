# Waypoint College Counseling Platform

A comprehensive web platform for high school students to manage college applications, track academic achievements, and receive personalized college counseling from coordinators and counselors.

## Quick Facts

- **Status**: ✅ Deployed to Vercel (production-ready)
- **URL**: https://waypoint-pilot.vercel.app
- **Tech Stack**: Next.js 14, Prisma ORM, PostgreSQL (Supabase), TypeScript, Tailwind CSS, NextAuth
- **Admin Login**: counselor@waypoint.edu / password123

## Key Features

### For Students
- 7-step onboarding wizard with comprehensive profile setup
- Complete profile management (personal, academic, activities, achievements, projects)
- College application tracking with deadline management
- Test score management (SAT, ACT, AP, IB)
- Target college list organization (Reach/Match/Safety)
- Profile strength analysis with detailed recommendations
- Goals tracking and progress monitoring
- Complete change history and audit trail

### For Coordinators
- Student dashboard and progress tracking
- Meeting logging and history
- Student profile viewing with full details
- Profile strength override capability
- Application deadline tracking across assigned students

### For Counselors (Admin)
- User management (create coordinators and students)
- System administration and organization oversight
- Access to all student data
- Profile override authority
- Global analytics and statistics

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database (Supabase)
- Environment variables configured

### Installation

```bash
# Clone the repository
git clone https://github.com/RusticGrey/waypoint.git
cd waypoint

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your database credentials

# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed the database (optional)
npx tsx prisma/seed.ts
npx tsx prisma/seed-colleges.ts
npx tsx prisma/seed-subjects.ts

# Start development server
npm run dev
```

Visit http://localhost:3000 to access the application.

## Project Structure

```
app/
├── (auth)/login/              # Authentication routes
├── (dashboard)/
│   ├── student/               # Student portal (profile, applications, etc.)
│   ├── coordinator/           # Coordinator dashboard
│   └── counselor/             # Admin/counselor features
└── api/                       # API routes for all features

components/
├── ui/                        # Reusable UI components
└── forms/onboarding/          # 7-step onboarding wizard

lib/
├── auth.ts                    # NextAuth configuration
├── prisma.ts                  # Prisma client singleton
└── utils/                     # Helper functions

prisma/
├── schema.prisma              # Database schema (SOURCE OF TRUTH)
├── migrations/                # Migration history
└── seed*.ts                   # Database seeding scripts
```

## Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend | Next.js (App Router) | 14.2.35 |
| UI Framework | React | 18.3.1 |
| Language | TypeScript | 5.5.3 |
| Styling | Tailwind CSS | 3.4.1 |
| Database ORM | Prisma | 5.22.0 |
| Database | PostgreSQL (Supabase) | - |
| Authentication | NextAuth.js | 4.24.10 |
| Password Hashing | bcrypt | 5.1.1 |
| Validation | React Hook Form + Zod | - |

## Database

### Models (20 total)
User, Student, PersonalProfile, AcademicProfile, Transcript, Activity, Achievement, ProjectExperience, TestScore, College, TargetCollege, CollegeApplication, Meeting, MeetingLog, ProfileGoal, ProfileOverride, ProfileComment, ChangeLog, Subject, Organization

### Enums (17 total)
UserRole, GradeLevel, CurriculumType, GradingSystemType, Semester, HonorsLevel, AchievementType, RecognitionLevel, ExperienceType, ActivityCategory, GoalType, GoalStatus, TargetCategory, ApplicationStatus, ChangeType, ChangeAction, MeetingType

See [SCHEMA_REFERENCE.md](SCHEMA_REFERENCE.md) for detailed schema information.

## Development

### Common Commands

```bash
npm run dev              # Start development server
npm run build           # Build for production
npm start               # Run production build

npx prisma studio      # Open Prisma Studio (database GUI)
npx prisma generate    # Regenerate Prisma Client
npx tsc --noEmit       # Check TypeScript types
npm run lint           # Run ESLint
```

### Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:password@host:5432/database

# NextAuth
NEXTAUTH_SECRET=<generated_secret>
NEXTAUTH_URL=http://localhost:3000  # dev
# NEXTAUTH_URL=https://waypoint-pilot.vercel.app  # production
```

## Documentation

- [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md) - Current status, features, and known issues
- [DEVELOPMENT.md](DEVELOPMENT.md) - Setup, deployment, and troubleshooting
- [SCHEMA_REFERENCE.md](SCHEMA_REFERENCE.md) - Database schema and camelCase convention guide
- [TESTING_CHECKLIST.md](TESTING_CHECKLIST.md) - Complete testing checklist
- [PROJECT_SPECIFICATION.md](PROJECT_SPECIFICATION.md) - Detailed functional and technical specifications

## Code Conventions

### Prisma Relations (camelCase)
```typescript
// CORRECT:
student.personalProfile
student.academicProfile
student.activities
student.achievements
student.projectExperiences

// WRONG:
student.PersonalProfile  // ❌ Don't use PascalCase
```

### Field Names (camelCase)
```typescript
// CORRECT:
user.firstName
user.passwordHash
student.graduationYear
student.currentGrade

// WRONG:
user.first_name         // ❌ Use camelCase, not snake_case
```

### File Naming
- Components: PascalCase (`StudentProfile.tsx`)
- Utilities: camelCase (`useStudent.ts`)
- API Routes: kebab-case folders with `route.ts`

## Deployment

The application is deployed on Vercel with automatic deployments from the `main` branch.

```bash
# Build locally first
npm run build

# If successful, push to GitHub
git push origin main

# Vercel automatically deploys
```

## Testing

See [TESTING_CHECKLIST.md](TESTING_CHECKLIST.md) for comprehensive testing procedures covering:
- Authentication and authorization
- Student features (onboarding, profile, applications)
- Coordinator features (student management, meetings)
- Counselor features (user management, admin functions)
- Data integrity and security

## Support

For bugs or questions, please use the `/reportbug` command to report issues.

## License

All rights reserved. Waypoint College Counseling Platform.

---

**Last Updated**: February 15, 2026
