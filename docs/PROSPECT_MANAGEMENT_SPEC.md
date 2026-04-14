# Event Management Specification (formerly Prospect Management)

The Event Management module allows Engage College Counselling to host public booking events (offsite meets, school fairs, consultations) where prospective students or parents can sign up for defined timeslots. This system is entirely independent of the internal student/counselor meeting architecture.

## 1. Database Architecture (Streamlined)

Four primary models handle the public signup flow:

- **PublicEvent:** The top-level container for an event (e.g., "Mumbai Matunga Fair").
- **EventAssignment:** A join model linking Counselors to a specific PublicEvent.
- **EventSlot:** Generated 15/30/60-minute blocks based on event duration and counselor capacity.
- **EventSignup:** The record created when a public user successfully books a slot.

### Prisma Schema Definition

```prisma
model PublicEvent {
  id              String   @id @default(uuid())
  organizationId  String   @map("organization_id")
  title           String
  description     String?  @db.Text
  location        String
  startDate       DateTime @map("start_date")
  endDate         DateTime @map("end_date")
  slotDuration    Int      @default(30) @map("slot_duration")

  // Custom Branding for the public 1-pager
  headerText    String? @map("header_text") @default("YOUR GLOBAL FUTURE STARTS HERE")
  subheaderText String? @map("subheader_text") @default("Schedule your FREE consultation")

  isActive  Boolean  @default(true) @map("is_active")
  createdAt DateTime @default(now()) @map("created_at")
  
  slots        EventSlot[]
  assignments  EventAssignment[]
}

model EventAssignment {
  id          String @id @default(uuid())
  eventId     String @map("event_id")
  counselorId String @map("counselor_id")

  event     PublicEvent @relation(fields: [eventId], references: [id], onDelete: Cascade)
  counselor Counselor   @relation(fields: [counselorId], references: [userId], onDelete: Cascade)
}

model EventSlot {
  id          String   @id @default(uuid())
  eventId     String   @map("event_id")
  startTime   DateTime @map("start_time")
  duration    Int      @default(30)
  capacity    Int      @default(1)
  bookedCount Int      @default(0) @map("booked_count")
  isActive    Boolean  @default(true) @map("is_active")

  event   PublicEvent   @relation(fields: [eventId], references: [id], onDelete: Cascade)
  signups EventSignup[]
}

model EventSignup {
  id            String @id @default(uuid())
  slotId        String @map("slot_id")
  duration      Int
  prospectName  String @map("prospect_name")
  prospectEmail String? @map("prospect_email")
  prospectPhone String @map("prospect_phone")
  studentGrade  String? @map("student_grade")
  status        BookingStatus @default(Confirmed)

  // Management/On-site tracking
  completedAt    DateTime? @map("completed_at")
  completedBy    String?   @map("completed_by")
  counselorNotes String?   @map("counselor_notes") @db.Text
  didAttend      Boolean?  @map("did_attend")

  slot                 EventSlot  @relation(fields: [slotId], references: [id], onDelete: Cascade)
  completedByCounselor Counselor? @relation(fields: [completedBy], references: [userId])
}
```

## 2. API Endpoints

### Counselor API (`/api/counselor/events/`)
- `POST /events`: Create event + bulk generate slots.
- `GET /events`: List all events for the organization.
- `GET /events/[eventId]`: Detail view of a specific event and its signups.
- `PATCH /events/[eventId]`: Update event details or branding.
- `PATCH /bookings/[signupId]/complete`: Mark a consultation as complete with notes/attendance.

### Public API (`/api/public/events/`)
- `GET /[eventId]`: Publicly fetch event info + available active slots.
- `POST /[eventId]`: Submit a signup for a specific slot (Transaction-protected).

## 3. User Interface

### Public Booking Page (`/book/[eventId]`)
- **Mobile-First:** Single-column layout optimized for QR code landing.
- **Day Selector:** Horizontal picker for multi-day events.
- **Branded Experience:** High-visibility "ENGAGE" header and success frameworks.
- **Simplified Form:** Requires only Name and Phone; Email/Grade are optional.

### Counselor Dashboard (`/counselor/events`)
- **Event List:** Overview cards with slot usage and counselor assignments.
- **Live Dashboard:** Real-time, mobile-responsive linear schedule for on-site fair management.
- **Quick Completion:** One-tap "Mark Complete" flow with attendance tracking.
