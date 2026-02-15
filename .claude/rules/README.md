# Waypoint College Counseling Platform

A comprehensive college counseling platform for high school students, coordinators, and counselors.

## Features

- **Student Portal**: Profile management, college applications, test scores
- **Coordinator Dashboard**: Student oversight, meeting logs, progress tracking
- **Counselor Admin**: User management, system administration

## Tech Stack

- Next.js 14 (App Router)
- Prisma ORM
- PostgreSQL (Supabase)
- TypeScript
- Tailwind CSS

## Quick Start
```bash
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

Visit http://localhost:3000

## Documentation

- [Development Guide](DEVELOPMENT.md)
- [Project Context](PROJECT_CONTEXT.md)
- [Schema Reference](SCHEMA_REFERENCE.md)

## Deployment

Deployed on Vercel with automatic deployments from `main` branch.

## Admin Access

- Email: counselor@waypoint.edu
- Password: password123 (change in production!)
