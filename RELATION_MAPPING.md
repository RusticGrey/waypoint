# Prisma Relation Names - camelCase Convention

## Student Relations (from Student model)
```typescript
student.personalProfile      // PersonalProfile (1-to-1)
student.academicProfile      // AcademicProfile (1-to-1)
student.transcripts          // Transcript[] (1-to-many)
student.activities           // Activity[] (1-to-many)
student.achievements         // Achievement[] (1-to-many)
student.projectExperiences   // ProjectExperience[] (1-to-many)
student.testScores           // TestScore[] (1-to-many)
student.targetColleges       // TargetCollege[] (1-to-many)
student.collegeApplications  // CollegeApplication[] (1-to-many)
student.meetings             // Meeting[] (1-to-many)
student.profileGoals         // ProfileGoal[] (1-to-many)
student.profileOverride      // ProfileOverride (1-to-1, nullable)
student.changeLogs           // ChangeLog[] (1-to-many)
student.user                 // User (1-to-1)
student.coordinator          // User (nullable)
student.primaryCoordinator   // User (nullable)
```

## Include Syntax
```typescript
// CORRECT:
include: {
  personalProfile: true,
  academicProfile: true,
  user: true,
  activities: true,
  achievements: true
}

// WRONG (PascalCase):
include: {
  PersonalProfile: true,  // ❌
  AcademicProfile: true,  // ❌
  User: true,             // ❌
}
```

## Other Model Relations

### Meeting
```typescript
meeting.student       // Student
meeting.coordinator   // User
```

### CollegeApplication
```typescript
application.student   // Student
application.college   // College
```

### Activity, Achievement, etc.
```typescript
activity.student      // Student
achievement.student   // Student
transcript.student    // Student
```

## Field Names (All camelCase)
```typescript
user.firstName        // not first_name
user.lastName         // not last_name  
user.passwordHash     // not password_hash
user.organizationId   // not organization_id

student.graduationYear     // not graduation_year
student.currentGrade       // not current_grade
student.coordinatorId      // not coordinator_id
student.userId             // not user_id
```
