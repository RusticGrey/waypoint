# Event Management Feature

The Event Management module allows organizations to host public booking events (e.g., school fairs, consultations) where prospective students can sign up for one-on-one consultations.

## 1. Public Booking Page
Every event has a unique, public-facing landing page (`/book/[eventId]`).
- **Mobile-First**: Optimized for QR code scanning at physical events.
- **Date Selector**: Supports multi-day events with horizontal scrolling.
- **Simplified Form**: Minimizes friction by requiring only essential details (Name, Phone).
- **Slot Status**: Real-time indication of `AVAILABLE` vs. `BOOKED` slots.

## 2. Event Creation & Configuration
Counselors with appropriate permissions can create events via the Counselor Dashboard.
- **Slot Generation**: Automatically generates 15, 30, or 60-minute blocks based on event duration.
- **Counselor Assignment**: Multiple counselors can be assigned to a single event to increase capacity.
- **Custom Branding**: Configurable header text, subheaders, and success messages per event.

## 3. Live Event Dashboard
A specialized "Live" view (`app/(dashboard)/counselor/events/live/`) is available for on-site management:
- **Linear Schedule**: Shows a chronological list of all signups for the current day.
- **One-Tap Completion**: Allows counselors to quickly mark a consultation as "Complete" and log brief notes/attendance.
- **Capacity Tracking**: Real-time monitoring of slot usage.

## 4. Prospect Pipeline
Unlike internal meetings, event signups track **Prospective Students** who may not yet have an account.
- **Transition**: The system collects contact info that can be used to follow up and convert prospects into enrolled students.

## Technical Implementation
- **Core Models**: `PublicEvent`, `EventSlot`, `EventAssignment`, `EventSignup`.
- **API Routes**:
  - Counselor: `/api/counselor/events/*`
  - Public: `/api/public/events/*`
- **Transactions**: Slot booking uses database transactions to prevent overbooking during high-traffic events.
