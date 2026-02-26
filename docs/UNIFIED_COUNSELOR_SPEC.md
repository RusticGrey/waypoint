# Unified Counselor Role Spec (Single Role + Admin Flag)

## 1. Overview
The project has successfully pivoted to a **Single Role Model** for staff members. Instead of distinct roles for coordinators and associates, all counseling staff are defined as **Counselor**. Administrative capabilities (managing users, viewing organization-wide data) are controlled by an `isAdmin` flag on the user record.

## 2. Terminology
- **Role:** Everyone is a **Counselor** (staff side).
- **Admin:** A Counselor with `isAdmin = true`.
- **Caseload:** The students assigned to a specific Counselor.

## 3. Database Implementation
### 3.1. User & Counselor Model
- **`isAdmin` Field:** Added to the `Counselor` model to toggle administrative access.
- **Unified Role:** `UserRole` enum now only contains `counselor` and `student`.

### 3.2. Student Model
- **Unified FK:** `counselorId` serves as the primary link between a student and their assigned staff member.
- **Standardized Relation:** `counselor` relation points to the unified `Counselor` model.

### 3.3. Availability & Meetings
- **Consolidated Models:** All meeting and availability logic is now strictly bound to the `Counselor` entity.
- **Renaming:** Legacy `coordinator` or `associate` references have been standardized to `counselor` across the schema.

## 4. API & Security
- **Namespace:** All counselor-side APIs are located under `app/api/counselor/*`.
- **Authorization:** 
    - `if (session.user.role !== 'counselor')` -> Unauthorized.
- **Admin Visibility:**
    - Admins see organization-wide student lists and global meeting queues.
    - Non-admins see their own caseload and personalized meeting queues.
- **Manage Users:** Restricted to `if (!session.user.isAdmin) return 403`.

## 5. Frontend Architecture
### 5.1. Auth Integration
- NextAuth session object includes `isAdmin` and `id` for immediate permission checking.
- Middleware handles route-level protection for the `/counselor/*` path.

### 5.2. Unified Dashboard
- **Location:** `app/(dashboard)/counselor/page.tsx`.
- **Context-Aware UI:** 
    - Admins see "All Students" vs "My Students" toggles.
    - Non-admins land directly on their personal caseload view.
    - Sensitive administrative buttons (Manage Users) are hidden for non-admins.

## 6. Global Refactoring
- All variable names (e.g. `assignedCounselorId`), folder paths, and UI labels have been verified and standardized to use "Counselor."

## 7. Implementation Checklist
- [x] Update Prisma Schema (Add `isAdmin`, consolidate models).
- [x] Create and run Migration (SQL to map roles to flags).
- [x] Update NextAuth Types (`types/next-auth.d.ts`).
- [x] Refactor API Logic (Use `isAdmin` for global vs local data fetching).
- [x] Refactor UI Components (Contextual display based on `isAdmin`).
- [x] Standardize global naming conventions.

---
*Status: Implemented & Verified*
