# WayPoint Testing Checklist

## Test Environment
- [Y] Database: Connected and migrations current
- [Y] Server: Running on localhost:3000
- [ ] Browser: Chrome/Firefox/Safari tested
- [Y] Test accounts created and accessible

## Authentication & Authorization

### Login/Logout
- [Y] Counselor can login (counselor@pilot.com / password123)
- [Y] Coordinator can login (coordinator@pilot.com / coordinator123)
- [Y] Student can login (student@test.com / student123)
- [Y] Invalid credentials show error
- [Y] Logout redirects to login page
- [Y] Session persists on refresh

### Role-Based Access
- [ ] Counselor cannot access /student routes
- [ ] Coordinator cannot access /student routes
- [Y] Student cannot access /coordinator routes
- [Y] Student cannot access /counselor routes
- [Y] Middleware redirects correctly

## Student Features

### Onboarding (6 Steps)
- [Y] Step 1: Personal info saves correctly
- [Y] Step 2: Academic profile saves
- [Y] Step 3: Transcripts save with course picklist
- [Y] Step 4: Activities save with time tracking
- [ ] Step 5: Achievements save with date pickers
- [ ] Step 6: Projects save and redirect to dashboard
- [ ] Can navigate back/forward between steps
- [ ] Data persists when going back
- [ ] Onboarding completion updates profile_completion_pct
- [ ] Cannot access dashboard until onboarding complete

### Dashboard
- [ ] Shows profile strength score
- [ ] Shows profile completion percentage
- [ ] Stats cards display correct counts
- [ ] Profile summary shows correct info
- [ ] Recent activity displays

### Profile Analysis
- [ ] Overall score calculates correctly
- [ ] Category scores display
- [ ] Strengths identified (scores >= 80)
- [ ] Weaknesses identified (scores < 60)
- [ ] Recommendations appear
- [ ] College readiness level displays

### Goals
- [ ] Can create new goal
- [ ] Goals list displays
- [ ] Can update goal status
- [ ] Completed goals move to completed section
- [ ] Can delete goals
- [ ] Priority sorting works

### Target Colleges
- [ ] Can add colleges from search
- [ ] Colleges categorized (Reach/Match/Safety)
- [ ] Can remove colleges
- [ ] Summary stats update
- [ ] College details display

### Profile History
- [ ] Change log displays
- [ ] Filters work (All, New Additions, Milestones, etc.)
- [ ] Timeline grouped by date
- [ ] Icons and colors display correctly

### My Profile
- [ ] All sections display correctly
- [ ] Personal info shows
- [ ] Academic info shows
- [ ] Transcripts table shows
- [ ] Activities list shows
- [ ] Achievements list shows
- [ ] Projects list shows

## Coordinator Features

### Dashboard
- [ ] Stats cards show correct numbers
- [ ] Students table displays assigned students
- [ ] Profile completion bars work
- [ ] "View Profile" links work
- [ ] Shows only assigned students

### Student Profile Viewer
- [ ] Profile strength displays
- [ ] All student info visible
- [ ] Goals display
- [ ] Colleges display
- [ ] Recent meetings display
- [ ] Recommendations show
- [ ] "Log Meeting" button works

### Meetings
- [ ] Meetings dashboard shows stats
- [ ] Upcoming meetings display
- [ ] Past meetings display
- [ ] Can create new meeting
- [ ] Meeting form saves correctly
- [ ] Topics and action items save
- [ ] Meetings appear in history

## Counselor Features

### Dashboard
- [ ] Organization stats display
- [ ] All students visible
- [ ] Profile completion tracking
- [ ] Can view any student profile

### Manage Users
- [ ] Stats cards show correct counts
- [ ] Can create coordinator account
- [ ] Can create student account
- [ ] New accounts can login
- [ ] Can assign coordinator to student
- [ ] Assignment dropdown updates
- [ ] Can delete users
- [ ] Coordinators table shows student counts

### Student Profile Viewer
- [ ] Same as coordinator viewer
- [ ] Shows assigned coordinator
- [ ] Shows all meetings

### Manage Courses
- [ ] Can select curriculum
- [ ] Courses list for curriculum
- [ ] Can add new course
- [ ] Course appears in list
- [ ] Students see new courses in transcript form

## Data Integrity

### Profile Completion
- [ ] Calculation is accurate
- [ ] Updates when data added
- [ ] Percentage displays correctly

### Profile Strength
- [ ] Score calculation accurate
- [ ] Category scores make sense
- [ ] Recommendations are relevant
- [ ] Readiness level appropriate

### Change Log
- [ ] Logs when goals created
- [ ] Logs when goals updated
- [ ] Logs when goals completed
- [ ] Descriptions are clear

## UI/UX

### Navigation
- [ ] All nav links work
- [ ] Active page highlighted
- [ ] Logo returns to appropriate dashboard
- [ ] Logout works from all pages

### Forms
- [ ] All required fields validated
- [ ] Error messages clear
- [ ] Success feedback provided
- [ ] Can cancel/go back
- [ ] Date pickers work
- [ ] Dropdowns populate correctly

### Responsive Design
- [ ] Works on desktop (1920px)
- [ ] Works on laptop (1366px)
- [ ] Works on tablet (768px)
- [ ] Works on mobile (375px)
- [ ] Tables scroll horizontally if needed

### Loading States
- [ ] Forms show loading state
- [ ] Buttons disable during submit
- [ ] No duplicate submissions

### Error Handling
- [ ] API errors show user-friendly messages
- [ ] 404 pages exist
- [ ] Network errors handled gracefully

## Performance

### Page Load Times
- [ ] Dashboard loads < 2 seconds
- [ ] Student profile loads < 2 seconds
- [ ] Forms submit < 1 second

### Database Queries
- [ ] No N+1 queries
- [ ] Appropriate indexes exist
- [ ] Includes/joins used efficiently

## Security

### Authentication
- [ ] Passwords hashed (bcrypt)
- [ ] Session tokens secure
- [ ] Cannot access others' data

### Authorization
- [ ] Coordinators only see assigned students
- [ ] Students only see own data
- [ ] Counselors see org-wide data only

### Data Validation
- [ ] Server-side validation exists
- [ ] SQL injection prevented (using Prisma)
- [ ] XSS prevented

## Edge Cases

### Empty States
- [ ] No students assigned shows message
- [ ] No goals shows message
- [ ] No meetings shows message
- [ ] No colleges shows message

### Data Limits
- [ ] Can add 50+ activities
- [ ] Can add 20+ colleges
- [ ] Can add 100+ transcripts
- [ ] Long text truncates properly

### Concurrent Users
- [ ] Two coordinators don't interfere
- [ ] Student updates don't affect others
- [ ] Meeting logs don't conflict

## Browser Compatibility
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

## Deployment Readiness
- [ ] Environment variables documented
- [ ] Database migrations tested
- [ ] Seed data scripts work
- [ ] Production build compiles
- [ ] No console errors in production

---

## Bug Tracking

### Found Bugs
1. 
2. 
3. 

### Fixed Bugs
1. 
2. 
3. 

---

## Notes
- Test with realistic data (not just test accounts)
- Test error paths, not just happy paths
- Test with different user roles
- Test with slow network (throttle in DevTools)
