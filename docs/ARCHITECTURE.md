# System Architecture

Waypoint is a multi-tenant college counseling platform built on the **Next.js 14 (App Router)** framework. It follows a modular architecture that separates concerns between data models, API services, and role-based frontend dashboards.

## 🏗️ Technical Stack

| Component | Technology |
|---|---|
| Framework | Next.js 14.2 (App Router) |
| Database | PostgreSQL (hosted on Supabase) |
| ORM | Prisma 5.22 |
| Authentication | NextAuth.js 4.24 |
| Styling | Tailwind CSS 3.4 + `@tailwindcss/typography` |
| UI Components | Radix UI + Custom `ux` design system |
| Language | TypeScript 5.5 |

## 📦 Key Directories

- `app/`: Contains the App Router routes, split into groups:
    - `(auth)/`: Authentication flows (Login/Logout).
    - `(dashboard)/`: The primary application area, protected by role-based middleware.
        - `student/`: Student-specific feature pages.
        - `counselor/`: Staff-specific management pages.
        - `admin/`: Organization-wide configuration (Colleges, Subjects).
        - `settings/`: **Unified User Settings hub** for managing personal profiles and preferences.
- `components/`: Reusable UI components.
    - `ui/`: Primitive atoms (Buttons, Cards, Badges) consuming `lib/ux.ts` tokens.
    - `meetings/`: Feature-specific scheduling and calendar components.
- `lib/`: Shared logic and utilities.
    - `ux.ts`: **Global Design System tokens** (Typography, Colors, Spacing).
    - `meetings/`: Core logic for Zoom and Google Calendar integrations.
    - `utils/`: Algorithmic helpers (Profile scoring, data analysis).
- `prisma/`: Database schema and migration history.

## 🔐 Auth & Authorization

Waypoint uses a role-based access control (RBAC) system. 
- **Roles**: `student` and `counselor`.
- **Admin Flag**: The `isAdmin` boolean on the `Counselor` model unlocks organizational management features.
- **Middleware**: Routes are gated at the edge based on the JWT token contents.

## ⚙️ Design System (`lib/ux.ts`)

To maintain visual consistency, all pages must consume styles from the centralized `ux` object. 
- **Typography**: Semantic headers (`ux.text.heading`) and body text.
- **Surface**: Standardized card containers and background shades.
- **Interaction**: Unified button variants and form input styles.

## 🌐 Global Timezone Strategy

All time-based data is stored as UTC in the database. 
- **User Preference**: Every `User` record contains a `timezone` string (e.g., `America/New_York`).
- **Translation**: The frontend and calendar integration layers use the user's preferred timezone to format all schedules, booking slots, and calendar invites, ensuring absolute clarity for global users.
