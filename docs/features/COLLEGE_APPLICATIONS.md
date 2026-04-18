# College Applications Feature

Waypoint provides a robust system for tracking the lifecycle of college applications and managing standardized test scores.

## 1. Target College List
Students can maintain a curated list of institutions they are interested in (`app/(dashboard)/student/colleges/`).
- **Database**: 64+ US colleges are pre-seeded in the system.
- **Categorization**: Colleges are grouped into **Reach**, **Match**, and **Safety** categories.
- **Priority**: Students can rank colleges within their list.

## 2. Application Tracking
Once a student decides to apply, the `CollegeApplication` model tracks every detail:
- **11 Lifecycle Statuses**: Including `Planning`, `In Progress`, `Submitted`, `Accepted`, `Waitlisted`, and `Rejected`.
- **Document Tracking**: Separate status tracking for Essays, Supplements, and Recommendation Letters.
- **Links & Notes**: Centralized place for application portal links and personal notes.

## 3. Deadline Management
The **Deadline Tracker** (`components/dashboard/DeadlineTracker.tsx`) provides high-visibility urgency:
- **Red**: Deadline in < 7 days.
- **Yellow**: Deadline in 7-14 days.
- **Green**: Deadline in > 14 days.
- **Automatic Sorting**: Applications are sorted by the nearest upcoming deadline.

## 4. Test Score Management
Students can log multiple attempts for various standardized tests (`app/(dashboard)/student/test-scores/`):
- **Supported Tests**: SAT, ACT, AP, IB, Duolingo.
- **Section Scores**: Detailed breakdown (e.g., SAT Math vs. Reading/Writing).
- **Super-scoring**: The system identifies the best scores across attempts for analysis.

## Technical Implementation
- **Models**: `College`, `CollegeApplication`, `TargetCollege`, `TestScore`.
- **API Routes**: `/api/student/applications/`, `/api/student/test-scores/`.
- **Dashboard Widgets**: Dynamic stat cards show total applications, submissions, and acceptance rates.
