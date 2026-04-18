# Admin Management Feature

Admin Management covers the high-level system controls and data management tasks restricted to Counselors with the `isAdmin` flag enabled.

## 1. User Management
Admins have full control over the user directory (`app/(dashboard)/counselor/manage-users/`).
- **Create Counselors**: Set up new staff accounts with email and password.
- **Create Students**: Manually register students and assign them to specific graduation years.
- **Counselor Assignment**: Assign or reassign students to counselors to manage workload distribution.
- **Organization Visibility**: Admins can see all users within their organization, whereas standard counselors only see their assigned caseload.

## 2. College Database Management
Waypoint maintains a centralized database of colleges (`app/(dashboard)/admin/colleges/`).
- **Data Points**: Manage acceptance rates, rankings (US News), and average test scores (GPA/SAT/ACT).
- **Control**: Admins can add new colleges or deactivate existing ones to update the options available to students.

## 3. Curriculum & Subject Management
To ensure clean data in transcripts, admins manage the available subjects per curriculum (`app/(dashboard)/admin/subjects/`).
- **Curriculum Types**: Supports CBSE, ICSE, IB, CAIE, State Board, US High School, and others.
- **Dynamic Forms**: When a student selects a curriculum, the transcript form is automatically populated with the relevant subject list managed here.

## 4. Organization-wide Analytics
The Admin Dashboard provides a bird's-eye view of the entire operation:
- **Global Stats**: Total student count, average profile completion, and application submission rates.
- **Monitoring**: Identify students who "Need Attention" (low profile completion) across the whole organization.
- **System Health**: Overview of upcoming meetings and deadlines organization-wide.

## 5. Security & Authorization
Access to these features is protected at multiple levels:
- **Middleware**: Routes starting with `/counselor/manage-users` or `/admin/` are redirected if `token.isAdmin` is false.
- **API Protection**: API routes perform a server-side check on the user's `isAdmin` status before executing sensitive operations.
- **UI Gating**: Administrative links and buttons are hidden from standard counselors using the `session.user.isAdmin` flag.

## Technical Implementation
- **Models**: `User`, `Student`, `Counselor`, `College`, `Subject`, `Organization`.
- **API Routes**: `/api/counselor/users/`, `/api/colleges/`, `/api/subjects/`.
