# Waypoint Development Guide

## Quick Start

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database (Supabase)
- Git for version control

### Initial Setup

```bash
# Clone the repository
git clone https://github.com/RusticGrey/waypoint.git
cd waypoint

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local
# Edit .env.local with your database credentials and secrets

# Generate Prisma Client
npx prisma generate

# Apply database migrations
npx prisma migrate dev

# Optional: Seed the database with initial data
npx tsx prisma/seed.ts
npx tsx prisma/seed-colleges.ts
npx tsx prisma/seed-subjects.ts

# Start development server
npm run dev
```

Visit http://localhost:3000 in your browser.

## Environment Variables

### Development (.env.local)

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/waypoint_dev"

# NextAuth (generate with: openssl rand -base64 32)
NEXTAUTH_SECRET="your-generated-secret-here"
NEXTAUTH_URL="http://localhost:3000"
```

### Production (Vercel)

```env
DATABASE_URL="postgresql://user:password@host:5432/waypoint_prod"
NEXTAUTH_SECRET="your-production-secret"
NEXTAUTH_URL="https://waypoint-pilot.vercel.app"
```

**Important**: Never commit `.env.local` or `.env` files. Use `.env.example` as a template.

## Development Workflow

### Running the Development Server

```bash
npm run dev
```

The application will be available at http://localhost:3000. Changes to files will automatically reload.

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `.next` directory. Always run this locally before pushing to ensure no build errors.

```bash
npm start
```

Runs the production build locally for testing.

### TypeScript Type Checking

```bash
npx tsc --noEmit
```

Verify all TypeScript types without generating output files.

### Code Linting

```bash
npm run lint
```

Runs ESLint to check code quality and style.

## Database Commands

### Prisma Studio (Database GUI)

```bash
npx prisma studio
```

Opens an interactive database viewer/editor at http://localhost:5555.

### Generate Prisma Client

```bash
npx prisma generate
```

Run this after modifying `prisma/schema.prisma` to regenerate the Prisma Client.

### Database Migrations

```bash
# Create and apply a new migration
npx prisma migrate dev --name migration_name

# Check migration status
npx prisma migrate status

# Rollback to previous migration (dev only)
npx prisma migrate resolve --rolled-back "migration_name"

# Reset database (dev only, destructive)
npx prisma migrate reset
```

### Seed Database

```bash
# Run all seed scripts
npx tsx prisma/seed.ts           # Initial users and organizations
npx tsx prisma/seed-colleges.ts  # 64 US colleges
npx tsx prisma/seed-subjects.ts  # Curriculum subjects
```

## Code Conventions

### Prisma Relations (camelCase - CRITICAL)

```typescript
// ✅ CORRECT:
const student = await prisma.student.findUnique({
  where: { userId: id },
  include: {
    personalProfile: true,
    academicProfile: true,
    activities: true,
    achievements: true,
    projectExperiences: true
  }
});

// Access relations:
student.personalProfile.currentSchool
student.user.firstName
student.activities.map(a => a.activityName)
```

```typescript
// ❌ WRONG (will cause errors):
student.PersonalProfile  // Don't use PascalCase
student.AcademicProfile
```

### Field Names (camelCase - CRITICAL)

```typescript
// ✅ CORRECT:
user.firstName
user.lastName
user.passwordHash
user.organizationId
student.userId
student.graduationYear
student.currentGrade

// ❌ WRONG:
user.first_name       // Don't use snake_case in code
user.password_hash
student.user_id
```

### File Organization

```
app/
├── (auth)/login/              # Authentication pages
├── (dashboard)/               # Protected routes
│   ├── student/              # Student portal
│   ├── coordinator/          # Coordinator features
│   └── counselor/            # Admin features
└── api/                      # API routes

components/
├── ui/                       # Reusable UI components (Button, Card, Input, etc.)
├── forms/                    # Form components
│   └── onboarding/           # 7-step onboarding forms
└── coordinator/              # Coordinator-specific components

lib/
├── auth.ts                   # NextAuth configuration
├── prisma.ts                 # Prisma client singleton
├── api-helpers/              # Helper functions for API routes
├── hooks/                    # Custom React hooks
└── utils/                    # Utility functions

prisma/
├── schema.prisma             # Database schema
├── migrations/               # Migration files
└── seed*.ts                  # Seed scripts
```

### Component Naming

- **Components**: PascalCase (`StudentProfile.tsx`, `OnboardingWizard.tsx`)
- **Utilities**: camelCase (`useStudent.ts`, `profileStrength.ts`)
- **API Routes**: kebab-case folders with `route.ts` (`app/api/student/profile/route.ts`)
- **Hooks**: camelCase with `use` prefix (`useEnums.ts`, `useStudent.ts`)

## Debugging

### Enable Debug Logging

```bash
# Prisma debug logs
DEBUG=prisma:* npm run dev

# NextAuth debug logs
DEBUG=next-auth:* npm run dev
```

### Prisma Studio

```bash
npx prisma studio
```

Open the interactive database viewer to inspect and modify data directly.

### Browser DevTools

Use your browser's Developer Tools for:
- Network inspection (API calls)
- Console logs and errors
- React DevTools (install extension)
- Next.js DevTools (built-in)

### VS Code Debugging

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js",
      "type": "node",
      "request": "attach",
      "port": 9229,
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}
```

Run with: `NODE_OPTIONS='--inspect' npm run dev`

## Testing

### Manual Testing Checklist

See [TESTING_CHECKLIST.md](TESTING_CHECKLIST.md) for comprehensive testing procedures.

### Key Test Scenarios

1. **Authentication**
   - Login with student/coordinator/counselor credentials
   - Verify role-based access control
   - Test logout and session persistence

2. **Student Onboarding**
   - Complete all 7 steps
   - Verify data persistence
   - Test editing each section independently

3. **Profile Management**
   - Add/edit/delete activities, achievements, projects
   - Verify change log entries
   - Check profile completion percentage

4. **College Applications**
   - Add applications from college list
   - Update application status
   - Verify deadline tracking

5. **Coordinator Features**
   - View assigned students
   - Log meetings
   - Override profile scores

6. **Admin Features**
   - Create new users
   - Assign students to coordinators
   - Manage subject/curriculum

## Deployment

### Vercel Deployment (Automatic)

The application automatically deploys to Vercel when code is pushed to the `main` branch.

### Pre-Deployment Checklist

```bash
# 1. Verify build succeeds
npm run build

# 2. Check TypeScript
npx tsc --noEmit

# 3. Run linter
npm run lint

# 4. Test locally
npm run dev
# (test at http://localhost:3000)

# 5. Run through TESTING_CHECKLIST.md

# 6. Commit and push
git add .
git commit -m "feature: description"
git push origin main

# Vercel deploys automatically
```

### Environment Variables in Vercel

1. Go to Vercel project settings
2. Navigate to "Environment Variables"
3. Add:
   - `DATABASE_URL` (production database)
   - `NEXTAUTH_SECRET` (production secret)
   - `NEXTAUTH_URL` (production URL)

### Rollback on Vercel

1. Go to Deployments
2. Click "Redeploy" on a previous successful deployment
3. Or revert code changes and push to `main`

## Troubleshooting

### "Prisma Client not found"

```bash
npx prisma generate
```

### "Unknown field" or relation errors

**Cause**: Using PascalCase instead of camelCase for Prisma relations.

**Solution**: Check code for:
```typescript
// ❌ WRONG
student.PersonalProfile
student.AcademicProfile
student.User

// ✅ CORRECT
student.personalProfile
student.academicProfile
student.user
```

### "Column does not exist"

**Cause**: Schema changes not applied to database.

**Solution**:
```bash
npx prisma migrate dev --name add_missing_field
```

### Database connection fails

**Cause**: Invalid `DATABASE_URL` or database unavailable.

**Solution**:
1. Verify `DATABASE_URL` in `.env.local`
2. Test connection: `psql $DATABASE_URL`
3. Check if Supabase is accessible
4. Verify firewall/network settings

### Build fails on Vercel

**Debug**:
1. Check Vercel build logs
2. Run locally: `npm run build`
3. Verify environment variables are set
4. Check for missing dependencies
5. Ensure migrations are up to date

### "next build" hangs or is very slow

**Cause**: Large node_modules or missing build cache.

**Solution**:
```bash
rm -rf node_modules .next
npm install
npm run build
```

### TypeError: Cannot read property 'xyz' of undefined

**Cause**: Missing `include` statement in Prisma query.

**Solution**: Ensure related data is included:
```typescript
// ❌ Missing include
const student = await prisma.student.findUnique({
  where: { userId: id }
});

// ✅ Include related data
const student = await prisma.student.findUnique({
  where: { userId: id },
  include: { personalProfile: true }
});
```

## Performance Optimization

### Prisma Query Optimization

```typescript
// ❌ N+1 Query Problem
const students = await prisma.student.findMany();
for (const student of students) {
  const profile = await prisma.personalProfile.findUnique({
    where: { studentId: student.userId }
  });
}

// ✅ Use include to fetch in one query
const students = await prisma.student.findMany({
  include: { personalProfile: true }
});
```

### Lazy Loading

```typescript
// Load related data on demand
const student = await prisma.student.findUnique({
  where: { userId: id }
});

const activities = await student.activities();
```

### Pagination

```typescript
const students = await prisma.student.findMany({
  skip: (page - 1) * pageSize,
  take: pageSize
});
```

## Security

### Password Hashing

All passwords are hashed with bcrypt:

```typescript
import bcrypt from 'bcrypt';

const hashedPassword = await bcrypt.hash(password, 10);
const isValid = await bcrypt.compare(password, hashedPassword);
```

### API Route Validation

Always validate input on the server:

```typescript
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(2)
});

const result = schema.safeParse(body);
if (!result.success) {
  return Response.json({ error: result.error }, { status: 400 });
}
```

### Session Management

NextAuth handles session security automatically. Always use:

```typescript
const session = await getServerSession(authOptions);
if (!session) {
  return Response.json({ error: 'Unauthorized' }, { status: 401 });
}
```

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)

---

**Last Updated**: February 15, 2026
