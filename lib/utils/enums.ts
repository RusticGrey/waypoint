import { 
  UserRole,
  GradeLevel,
  CurriculumType,
  GradingSystemType,
  Semester,
  HonorsLevel,
  AchievementType,
  RecognitionLevel,
  ExperienceType,
  ProjectStatus,
  GoalType,
  GoalStatus,
  ChangeType,
  ChangeAction,
  MeetingType,
  TargetCategory,
  ApplicationStatus,
  ActivityCategory,
} from '@prisma/client';

export const getEnumValues = () => {
  return {
    // Achievement enums
    achievementTypes: Object.values(AchievementType),
    recognitionLevels: Object.values(RecognitionLevel),
    
    // Activity enums
    activityCategories: Object.values(ActivityCategory),
    
    // Project enums
    projectTypes: Object.values(ExperienceType),
    projectStatuses: Object.values(ProjectStatus),
    
    // Academic enums
    gradeLevels: Object.values(GradeLevel),
    curriculumTypes: Object.values(CurriculumType),
    gradingSystemTypes: Object.values(GradingSystemType),
    honorsLevels: Object.values(HonorsLevel),
    semesterTypes: Object.values(Semester),
    
    // Goal enums
    goalTypes: Object.values(GoalType),
    goalStatuses: Object.values(GoalStatus),
    
    // Meeting enums
    meetingTypes: Object.values(MeetingType),
    
    // College application enums
    targetCategories: Object.values(TargetCategory),
    applicationStatuses: Object.values(ApplicationStatus),
    
    // User enums
    userRoles: Object.values(UserRole),
    
    // Change tracking enums
    changeTypes: Object.values(ChangeType),
    changeActions: Object.values(ChangeAction),
  };
};
