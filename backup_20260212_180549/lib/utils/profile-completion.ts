interface Student {
  PersonalProfile: any;
  AcademicProfile: any;
  Transcript: any[];
  Activity?: any[];
  TestScore?: any[];
  Achievement?: any[];
  ProjectExperience?: any[];
}

export function calculateProfileCompletion(student: Student): {
  percentage: number;
  breakdown: {
    personal: number;
    academic: number;
    Transcript: number;
    Activity: number;
    testScores: number;
    Achievement: number;
    projects: number;
  };
} {
  const weights = {
    personal: 15,
    academic: 15,
    Transcript: 25,
    Activity: 20,
    testScores: 10,
    Achievement: 10,
    projects: 5,
  };

  let score = 0;
  const breakdown = {
    personal: 0,
    academic: 0,
    Transcript: 0,
    Activity: 0,
    testScores: 0,
    Achievement: 0,
    projects: 0,
  };

  // Personal profile (15%)
  if (student.PersonalProfile) {
    const hasRequired = 
      student.PersonalProfile.current_school &&
      student.PersonalProfile.parent_name &&
      student.PersonalProfile.parent_email;
    
    if (hasRequired) {
      score += weights.personal;
      breakdown.personal = 100;
    }
  }

  // Academic profile (15%)
  if (student.AcademicProfile) {
    score += weights.academic;
    breakdown.academic = 100;
  }

  // Transcripts (25%) - Target: 15+ courses
  const transcriptCount = student.Transcript?.length || 0;
  const transcriptScore = Math.min(transcriptCount / 15, 1) * weights.Transcript;
  score += transcriptScore;
  breakdown.Transcript = Math.round((transcriptCount / 15) * 100);

  // Activities (20%) - Target: 5+ activities
  const activityCount = student.Activity?.length || 0;
  const activityScore = Math.min(activityCount / 5, 1) * weights.Activity;
  score += activityScore;
  breakdown.Activity = Math.round((activityCount / 5) * 100);

  // Test scores (10%) - Target: 1+ test
  const testScoreCount = student.TestScore?.length || 0;
  if (testScoreCount > 0) {
    score += weights.testScores;
    breakdown.testScores = 100;
  }

  // Achievements (10%) - Target: 3+ achievements
  const achievementCount = student.Achievement?.length || 0;
  const achievementScore = Math.min(achievementCount / 3, 1) * weights.Achievement;
  score += achievementScore;
  breakdown.Achievement = Math.round((achievementCount / 3) * 100);

  // Projects (5%) - Target: 1+ project
  const projectCount = student.ProjectExperience?.length || 0;
  if (projectCount > 0) {
    score += weights.projects;
    breakdown.projects = 100;
  }

  return {
    percentage: Math.round(score),
    breakdown,
  };
}
