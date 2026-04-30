# Student Lifecycle

The Waypoint experience is structured around a 3-phase lifecycle. This ensures that students are focused on the right activities at the right time in their college counseling journey.

## The 3 Phases

### 1. Onboarding
**Goal**: Establish the baseline data for the student profile.
- **Trigger**: New account creation.
- **Experience**: The student is locked into the **6-Step Onboarding Wizard** (`/onboarding`).
- **Data Collected**: Personal info, academic/curriculum baseline, historical transcripts, test scores, initial extracurricular activities, and achievements.
- **Transition**: Moves to **Profile Building** automatically once the profile is 100% complete (verified via `lib/utils/profile-completion.ts`).

### 2. Profile Building
**Goal**: Strengthen the application through activities, research, and academic improvement.
- **Experience**: Access to the full **Student Dashboard**, Profile Analysis tools, and Goal tracking.
- **Focus**: Improving "Profile Strength" scores, completing counselor-assigned goals, and refining the college wishlist.
- **Transition**: Moves to **College Applications** when a counselor manually flips the switch in the Student Detail view.

### 3. College Applications
**Goal**: Manage institutional applications and deadlines.
- **Experience**: Full access to **Application Tracking** modules.
- **Focus**: Finalizing the college list, tracking application status (Submitted, Waitlisted, Accepted, etc.), and managing specific institutional deadlines.

---

## Technical Enforcement

### Phase Enforcement (Navigation)
The platform uses the `Student.phase` field (enum) to control access via `app/(dashboard)/student/layout.tsx` and `app/(dashboard)/layout.tsx`:
- If `phase === 'Onboarding'`, the student is redirected to `/onboarding`.
- Layout-level checks ensure the side navigation and dashboard elements are adjusted or hidden for students in the onboarding phase.
- Post-onboarding, the system forces a refresh/navigation to the main dashboard to initialize stats and state.

### Transition Logic
1. **Automatic (Onboarding → Profile Building)**: 
   - Managed in `app/(dashboard)/student/layout.tsx`. 
   - If a student reaches 100% completion while in the `Onboarding` phase, the system auto-updates them to `Profile_Building`.
2. **Manual (Profile Building → College Applications)**: 
   - Managed via `PATCH /api/counselor/students/[studentId]/phase`.
   - Restricted to Counselor roles.

### Data Schema
Found in `prisma/schema.prisma`:
```prisma
enum StudentPhase {
  Onboarding
  Profile_Building
  College_Applications
}
```

## Counselor Visualization
Counselors see the student's current phase as a prominent badge on the Student Roster and the Student Detail page, allowing them to quickly identify which stage of the journey each student is in.
