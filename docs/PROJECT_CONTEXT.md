# Waypoint College Counseling Platform - Project Context

## Current Status

✅ **Deployment**: Live on Vercel (https://waypoint-pilot.vercel.app)
✅ **Database**: PostgreSQL via Supabase (production-ready)
✅ **Core Features**: All features fully functional
✅ **Unified Role Model**: Integrated Counselor and Counselor roles into a single `counselor` role with `isAdmin` flag.

## Production Information

| Property | Value |
|----------|-------|
| **Live URL** | https://waypoint-pilot.vercel.app |
| **Database** | Supabase PostgreSQL |
| **Hosting** | Vercel |
| **Admin Email** | counselor@waypoint.edu |
| **Admin Password** | password123 |
| **Deployment** | Automatic on `main` branch push |

## Completed Features

### Student Portal (Fully Implemented)
- ✅ **7-Step Onboarding Wizard**
  - Personal Information, Academic Profile, Transcripts, Activities, Achievements, Projects, Review.
- ✅ **Profile Management**
  - Comprehensive profile view and section-based editing.
- ✅ **College Application & Test Tracking**
- ✅ **Target College List**
- ✅ **Goals & Progress Tracking**
- ✅ **Profile Strength Analysis**
- ✅ **Student Dashboard**

### Unified Counselor Features (Refactored)
Waypoint uses a flattened staff hierarchy. Everyone advising students is a **Counselor**.

- ✅ **Caseload Management**
  - Standard Counselors see only their assigned students.
  - Admin Counselors see all students organization-wide.
- ✅ **Meeting Logs**
  - Unified meeting management for all counselors.
- ✅ **Profile Override**
- ✅ **Unified Dashboard**
  - Dynamic stats based on role (caseload vs organization-wide).
- ✅ **Admin Functions (Restricted to Admin Counselors)**
  - User management (Create student/counselor accounts).
  - Organization-wide stats and global student view.
  - Subject/Curriculum management.
  - College Database Management.

## Database Schema Highlights

### Key Models
1. **User** - Authentication, role (`counselor` | `student`), and `isAdmin` flag.
2. **Student** - Profile data linked to an assigned `counselorId`.
3. **Meeting** - Logs of interactions between students and counselors.
4. **CounselorAvailability** - Working hours for student scheduling.

### Enums
- **UserRole**: `counselor`, `student` (integrated previous `counselor` role).

## Code Architecture

### Permissions & RBAC
- **Authentication**: NextAuth with JWT.
- **Authorization**: Middleware and API routes check `isAdmin` for administrative features.
- **Data Scoping**: Repository layer filters by `counselorId` for non-admin users.

### File Naming Conventions
- **Components**: PascalCase.
- **Utilities**: camelCase.
- **API Routes**: kebab-case.

---

**Last Updated**: February 23, 2026
**Version**: 3.0 (Unified Role Release)
