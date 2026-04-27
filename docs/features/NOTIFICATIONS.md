# Communications Module

The Communications module enables automated email and in-app notifications to keep students, counselors, and parents informed about key milestones and events.

## Overview

Communications in Waypoint serve two primary purposes:
1. **Formal Email Communications**: Welcome emails for new users and monthly progress reports to parents
2. **Real-time Notifications**: In-app push notifications and chat-like updates via PWA mobile app for students and counselors

## 1. Email Communications (Formal)

### 1.1 Welcome Email
**Trigger**: When a new user (student or counselor) is created
- **Recipient**: New user's email address
- **Content**: Login credentials, onboarding instructions, quick start guide
- **Sent via**: Email service provider (SendGrid/AWS SES)
- **Status Tracking**: Logged in `EmailLog` table

### 1.2 Monthly Parent Report
**Trigger**: Scheduled monthly (configurable date/time)
- **Recipient**: Parent email address (from PersonalProfile)
- **Content**:
  - Profile completion percentage
  - Milestones achieved this month
  - Current goals and progress
  - Upcoming deadlines
  - Latest counselor notes
  - Recommended next steps/action items
- **Customization**: Counselors can customize per-student (optional)
- **Status Tracking**: Logged in `EmailLog` table

## 2. In-App Notifications (Real-time)

Real-time notifications appear in the PWA mobile app and web dashboard. These are primary communication channel for student-counselor interactions.

### 2.1 Meeting-Related Notifications
- **Meeting Requested**: Student → Counselor (when student requests meeting)
- **Meeting Confirmed**: Counselor → Student (when counselor accepts request)
- **Meeting Declined**: Counselor → Student (when counselor declines request)

### 2.2 Action Item Notifications
- **Action Items Created**: Counselor → Student (when action items logged after meeting)
- Includes action item details and deadlines

### 2.3 Profile & Progress Notifications
- **Phase Change Ready**: System → Student + Counselor (when student eligible for phase transition)
- **Profile Milestone**: System → Counselor (at 25%, 50%, 75%, 100% completion)

### 2.4 Goal-Related Notifications
- **Goal Update**: System → Both (when goal progress updated)
- **Goal Completed**: System → Both (when goal marked complete)

## 3. Database Schema

### User Extensions
- `PersonalProfile.parentEmail`: Parent email address (already exists)
- `PersonalProfile.parentName`: Parent name (already exists)

### New Models

#### Notification
Stores in-app notifications with read/unread tracking.
```prisma
model Notification {
  id String @id @default(cuid())
  recipientId String @map("recipient_id")
  type NotificationType  // Enum: MeetingRequested, ActionItemsCreated, etc.
  title String
  message String
  actionUrl String?      // Link to related resource (meeting, goal, etc.)
  isRead Boolean @default(false)
  createdAt DateTime @default(now())
  user User @relation(fields: [recipientId], references: [id], onDelete: Cascade)
  
  @@index([recipientId, isRead])
  @@index([createdAt])
}

enum NotificationType {
  MeetingRequested
  MeetingConfirmed
  MeetingDeclined
  ActionItemsCreated
  PhaseChangeReady
  ProfileMilestone
  GoalUpdate
  GoalCompleted
}
```

#### EmailLog
Audit trail for all sent emails.
```prisma
model EmailLog {
  id String @id @default(cuid())
  recipientId String @map("recipient_id")
  recipientEmail String @map("recipient_email")
  emailType EmailType      // Enum: WelcomeEmail, MonthlyParentReport
  status EmailStatus       // Enum: Pending, Sent, Failed
  sentAt DateTime? @map("sent_at")
  failureReason String?    // Error details if failed
  createdAt DateTime @default(now())
  user User @relation(fields: [recipientId], references: [id], onDelete: Cascade)
  
  @@index([createdAt])
  @@index([recipientEmail])
}

enum EmailType {
  WelcomeEmail
  MonthlyParentReport
}

enum EmailStatus {
  Pending
  Sent
  Failed
}
```

## 4. Implementation Architecture

### Service Layer (`lib/communications/`)
- **emailService.ts**: Email provider integration, template rendering, sending logic
- **notificationService.ts**: In-app notification creation, retrieval, read status tracking
- **emailTemplates.ts**: Welcome email and parent report HTML templates

### API Routes

#### Notification Endpoints
- `GET /api/notifications` - Fetch user's notifications (paginated)
  - Query params: `limit`, `offset`, `unreadOnly`
  - Response: Array of notifications with unread count
- `PUT /api/notifications/:id/read` - Mark notification as read
- `GET /api/notifications/unread-count` - Get count of unread notifications
- `DELETE /api/notifications/:id` - Delete individual notification
- `POST /api/notifications/mark-all-read` - Mark all as read

#### Email Endpoints (Admin/Internal)
- `POST /api/communications/send-welcome-email` - Trigger welcome email for new user
  - Internal use only, called during user creation
- `GET /api/communications/email-logs` - View email history (admin only)
  - Filters: date range, recipient, email type, status
- `POST /api/communications/send-parent-report/:studentId` - Manual trigger parent report
  - For immediate sending outside of schedule
- `PUT /api/communications/monthly-report-config` - Configure monthly report settings (admin)
  - Start date, frequency, enable/disable per organization

### Integration Points

The following existing features trigger communications:

1. **User Creation** (`app/api/auth/register` or user creation endpoint)
   - → Send welcome email

2. **Meeting Request Creation** (`app/api/meetings/request`)
   - → Create notification for counselor

3. **Meeting Acceptance** (`app/api/meetings/accept`)
   - → Create notification for student

4. **Action Items Logging** (`app/api/meetings/complete`)
   - → Create notification for student with action items

5. **Phase Change Eligibility** (profile completion check)
   - → Create notification for student and counselor

6. **Profile Completion Milestones** (profile strength tracking)
   - → Create notification for assigned counselor at 25%, 50%, 75%, 100%

7. **Scheduled Job** (cron/scheduled task)
   - → Generate and send monthly parent reports on configured date

### UI Components

#### Navigation
- **NotificationBell**: Badge in navbar showing unread count, opens dropdown
- **NotificationCenter**: Dropdown menu showing recent notifications (5-10 most recent)
  - Each notification shows title, message, timestamp, action link
  - Mark as read/unread on hover
  - Click navigates to related resource

#### Dashboard
- **NotificationList**: Full page view of all notifications
  - Filtering by type, date, read/unread
  - Bulk actions (mark all read, delete, etc.)

#### Admin Panel
- **CommunicationSettings** (`/counselor/communications/`)
  - Configure monthly parent report schedule
  - View email delivery logs
  - Manually trigger reports for specific students
  - Download delivery reports

## 5. Parent Report Template

```
Subject: [Student Name]'s Monthly Progress Report - [Month, Year]

Dear [Parent Name],

We hope this email finds you well. Here's a summary of [Student Name]'s progress this month in their college counseling journey.

📊 Profile Status
- Overall Completion: X%
- Current Phase: [Onboarding / Profile Building / College Applications]

✅ Milestones Achieved This Month
- [Milestone 1]
- [Milestone 2]
- [Milestone 3]

🎯 Active Goals
- [Goal 1]: [Progress]
- [Goal 2]: [Progress]

📅 Upcoming Deadlines
- [Application Deadline]: [Date]
- [Test Date]: [Date]

💬 Counselor's Note
[Latest message from assigned counselor]

📝 Recommended Next Steps
1. [Action Item 1]
2. [Action Item 2]
3. [Action Item 3]

Questions? Reply to this email or contact [Counselor Name] at [Email/Phone].

Best regards,
Waypoint College Counseling Team
```

## 6. Configuration & Admin Control

### Email Configuration
- Email provider credentials stored in environment variables
- Configurable sender email and name
- HTML email templates in `lib/communications/emailTemplates.ts`

### Monthly Report Settings
Admin controls available at `/counselor/communications/`:
- Enable/disable monthly reports globally
- Configure send date (1st, 15th, 28th, or custom)
- Configure send time (timezone-aware)
- Per-organization settings

### Notification Preferences (Future)
- Users can optionally disable specific notification types
- Counselors can control bulk notification volume
- Opt-out per communication channel

## 7. Technical Implementation Notes

### Email Provider
- **Recommendation**: SendGrid or AWS SES for reliability and deliverability
- **Alternative**: Resend for modern email infrastructure
- Store API keys securely in environment variables
- Implement retry logic for failed sends
- Track bounces and suppressions

### Notifications
- Use WebSocket or Server-Sent Events (SSE) for real-time updates
- Fallback to polling if WebSocket unavailable
- Optimize for mobile (PWA considerations)
- Implement notification badges/unread counts
- Archive old notifications after 90 days (configurable)

### Error Handling
- Graceful degradation if email service unavailable
- Log all errors to database and monitoring service
- Implement exponential backoff for retries
- Admin alerts for persistent failures

## 8. Development Phases

### Phase 1: Core Infrastructure
- Add database models (Notification, EmailLog)
- Implement email service integration
- Create welcome email flow
- Create notification creation/retrieval APIs

### Phase 2: Integration
- Integrate notifications into meeting workflows
- Trigger notifications from existing feature endpoints
- Implement notification UI components

### Phase 3: Parent Reports
- Implement monthly parent report generation
- Set up scheduled job for automatic sending
- Add admin configuration panel

### Phase 4: Polish & Optimization
- Implement notification preferences
- Add notification filtering/search
- Implement notification archive/cleanup
- Performance optimization for notification queries

### Phase 5: Analytics & Future Channels
- Add communication analytics dashboard
- Track email open rates, click rates
- Implement WhatsApp as optional secondary channel
- Add SMS support

## 9. Open Questions (To Be Resolved Tomorrow)

1. Which email provider? (SendGrid, AWS SES, Resend)
2. Should parent reports be customizable by counselor or fully automated?
3. Notification retention period? (30/60/90 days)
4. Include WhatsApp for parent reports as secondary channel?
5. Allow users to configure notification preferences?
6. Monthly report send date? (1st, 15th, 28th, configurable)

---

**Status**: ⏸️ PAUSED. The database schema has been updated with `Notification` and `EmailLog` models, but further API and UI development is paused until explicit approval. Priority is currently on College Rankings.
**Last Updated**: April 26, 2026
