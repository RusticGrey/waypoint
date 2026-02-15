# Development Guide

## Setup
```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your database URL

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed database
npx tsx prisma/seed.ts
npx tsx prisma/seed-colleges.ts
npx tsx prisma/seed-subjects.ts

# Start dev server
npm run dev
```

## Common Commands
```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm start               # Run production build

# Database
npx prisma studio       # Open database GUI
npx prisma generate     # Regenerate Prisma Client
npx prisma migrate dev  # Create and apply migration
npx prisma migrate status # Check migration status

# Code Quality
npx tsc --noEmit       # Check TypeScript
npm run lint           # Run ESLint
```

## Environment Variables
```env
# DEV

DATABASE_URL="postgresql://postgres.mxqnoigscjzmeusieccb:Singaravelan321@aws-1-ap-south-1.pooler.supabase.com:5432/postgres"
NEXTAUTH_SECRET="dvoM71GGJ+cd3Zc/QzxQE12tJy0OK5878R/jQSyUTyg="
NEXTAUTH_URL="http://localhost:3000"
```
```env
# PRODUCTION
DATABASE_URL="postgresql://postgres.vevjvvodrfpumjgvqynw:Singaravelan321@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres"
NEXTAUTH_SECRET="o0KYLT9YT1nwlh91z4Lc3AtCaQX8GfQJy6mVkzyjpaA="
NEXTAUTH_URL="https://waypoint-pilot.vercel.app"

```

## Testing Checklist

- [ ] Login works for all roles
- [ ] Student onboarding completes
- [ ] Profile editing saves correctly
- [ ] Applications CRUD works
- [ ] Test scores CRUD works
- [ ] No console errors
- [ ] Build succeeds

## Deployment
```bash
# Build locally first
npm run build

# If successful, push to GitHub
git push origin main

# Vercel auto-deploys
```

## Troubleshooting

**Prisma Client not found**
```bash
npx prisma generate
```

**Migration failed**
```bash
npx prisma migrate status
npx prisma migrate resolve --applied "migration_name"
```

**Build fails on Vercel**
- Check build logs in Vercel dashboard
- Verify all dependencies in package.json
- Ensure environment variables are set
