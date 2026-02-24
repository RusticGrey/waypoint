# Unified Counselor Role Spec (Single Role + Admin Flag)

## 1. Overview
This specification outlines the architectural pivot to a **Single Role Model**. Instead of distinct `Counselor` and `Counselor` roles, all staff members will be defined as `Counselor`. Administrative capabilities (managing users, viewing organization-wide data) will be controlled by an `isAdmin` flag on the user record.

## 2. Terminology
- **Role:** Everyone is a **Counselor**.
- **Admin:** A Counselor with `isAdmin = true`.
- **Caseload:** The students assigned to a specific Counselor.

## 3. Database Changes (Prisma Schema)
### 3.1. User Model
- **Add Field:** `isAdmin Boolean @default(false) @map("is_admin")`
- **Update Enum:** `UserRole` will only contain `counselor` and `student`. (Remove `counselor` and `counselor`).

### 3.2. Student Model
- **Rename Field:** `counselorId` (formerly `counselorId`) -> `counselorId`.
- **Rename Field:** `primaryCounselorId` -> `primaryCounselorId`.
- **Relation:** Update `counselor` relation to `counselor`.

### 3.3. Availability Model
- **Rename Model:** `CounselorAvailability` -> `CounselorAvailability`.
- **Rename Field:** `counselorId` -> `counselorId`.

### 3.4. Other Models (Meeting, ProfileOverride)
- **Rename Field:** `counselorId` -> `counselorId`.

## 4. Migration Logic
1.  **Add `isAdmin` column.**
2.  **Migrate Roles:**
    - If `role` == 'counselor': Set `isAdmin = true`.
    - If `role` == 'counselor' (or 'counselor'): Set `role = 'counselor'`, `isAdmin = false`.
3.  **Rename Columns:** `counselor_id` -> `counselor_id`.

## 5. API Restructuring
- **Unified Route Namespace:** `app/api/counselor/*` (already done, but needs variable renaming).
- **Logic Update:**
    - Remove role checks for `'counselor'`.
    - Replace with: `if (session.user.role !== 'counselor') return 401`.
    - **Visibility Check:**
        - If `session.user.isAdmin`: Return ALL students.
        - If `!session.user.isAdmin`: Return students where `counselorId == session.user.id`.
- **Manage Users (`api/counselor/users`)**:
    - Strict check: `if (!session.user.isAdmin) return 403`.

## 6. Frontend Integration
### 6.1. Auth & Middleware
- Update types to include `isAdmin` in Session.
- Middleware: Allow `counselor` role to access `/counselor/*`.

### 6.2. Dashboard (`app/(dashboard)/counselor/page.tsx`)
- **Title:** "Counselor Dashboard" (for everyone).
- **Data Fetching:**
    - If `!isAdmin`: Filter by `counselorId`.
- **UI Elements:**
    - Hide "Manage Users" button if `!isAdmin`.
    - Show "My Students" vs "All Students" label based on `isAdmin`.

### 6.3. Student Detail
- Permission Check: If `!isAdmin`, ensure `student.counselorId === user.id`.

## 7. Global Renaming
- Codebase refactor to replace `counselor` variables with `counselor` where appropriate (e.g. `counselorId`, `assignedCounselor`).
- UI labels: "Assigned Counselor" -> "Assigned Counselor".

## 8. Implementation Checklist
- [ ] Update Prisma Schema (Add `isAdmin`, rename fields).
- [ ] Create and run Migration (SQL to map roles to flags).
- [ ] Update NextAuth Types (`types/next-auth.d.ts`).
- [ ] Refactor API Logic (Use `isAdmin` for permissions).
- [ ] Refactor UI Components (Hide Admin features).
- [ ] Rename variables and fields in code (`counselor` -> `counselor`).
