# Prisma Schema Reference - camelCase Convention

## Student Relations
```typescript
// CORRECT (camelCase):
student.personalProfile
student.academicProfile
student.user
student.coordinator
student.activities
student.achievements
student.projectExperiences
student.transcripts
student.testScores
student.collegeApplications
student.targetColleges
student.meetings
student.profileGoals
student.profileOverride
student.changeLogs

// WRONG (PascalCase):
student.PersonalProfile  // ❌
student.AcademicProfile  // ❌
student.User             // ❌
```

## Field Names (camelCase)
```typescript
// CORRECT:
user.firstName
user.lastName
user.passwordHash
user.organizationId
student.userId
student.graduationYear
student.currentGrade

// WRONG (snake_case):
user.first_name       // ❌
user.password_hash    // ❌
student.user_id       // ❌
```

## Include Syntax
```typescript
// CORRECT:
const student = await prisma.student.findUnique({
  where: { userId: id },
  include: {
    personalProfile: true,
    academicProfile: true,
    user: true,
    activities: true,
    achievements: true
  }
});

// Access relations:
student.personalProfile.currentSchool
student.user.firstName
student.activities.map(a => a.activityName)
```

## Common Models

- User: email, firstName, lastName, role
- Student: graduationYear, currentGrade
- PersonalProfile: currentSchool, parentEmail
- AcademicProfile: curriculumType, currentGpa
- Activity: activityName, category, hoursPerWeek
- Achievement: title, recognitionLevel
- CollegeApplication: targetCategory, applicationStatus
- TestScore: testType, compositeScore, sectionScores
