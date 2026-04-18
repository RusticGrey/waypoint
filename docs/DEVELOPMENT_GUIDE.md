# Development Guide

## Local Setup

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database (Recommended: Supabase)
- Git

### Installation
1. **Clone the repo**:
   ```bash
   git clone https://github.com/RusticGrey/waypoint.git
   cd waypoint
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Environment Variables**:
   Copy `.env.example` to `.env.local` and fill in the values.
   ```bash
   cp .env.example .env.local
   ```
4. **Database Initialization**:
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```
5. **Seeding (Optional)**:
   ```bash
   npx tsx prisma/seed.ts           # Basic users & organizations
   npx tsx prisma/seed-colleges.ts  # 64 US college database
   npx tsx prisma/seed-subjects.ts  # Curriculum-based subjects
   ```

### Running the App
```bash
npm run dev
```
Visit `http://localhost:3000`.

## Environment Variables Reference
| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string. |
| `NEXTAUTH_SECRET` | Secret for JWT signing. |
| `NEXTAUTH_URL` | Base URL of the app (e.g., http://localhost:3000). |
| `NEXT_PUBLIC_ENABLE_MEETINGS` | Feature flag to toggle meeting management ('true'/'false'). |
| `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` | Config for Nodemailer email service. |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | For Google Calendar integration. |
| `ZOOM_CLIENT_ID`, `ZOOM_CLIENT_SECRET` | For Zoom integration. |

## Development Workflow

### Database Changes
1. Modify `prisma/schema.prisma`.
2. Run `npx prisma migrate dev --name <description>`.
3. Run `npx prisma generate` to update the client.

### Coding Standards
- **Strict Mode**: TypeScript strict mode is enabled.
- **Async/Await**: Prefer over `.then()` chains.
- **Server Components**: Use by default; use `'use client'` only when React hooks are needed.
- **Pre-commit checks**:
  - `npm run build` (Must succeed)
  - `npx tsc --noEmit` (No type errors)

## Deployment
Waypoint is designed to be hosted on **Vercel**.
1. Connect your repository to Vercel.
2. Configure environment variables in the Vercel dashboard.
3. Push to `main` branch for automatic deployment.
