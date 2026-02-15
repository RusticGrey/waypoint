interface Student {
  personalProfile?: any;
  academicProfile?: any;
  transcripts?: any[];
  activities?: any[];
  testScores?: any[];
  achievements?: any[];
  projectExperiences?: any[];
}

export function calculateProfileCompletion(student: Student): {
  percentage: number;
  breakdown: {
    personal: number;
    academic: number;
    transcripts: number;
    activities: number;
    testScores: number;
    achievements: number;
    projects: number;
  };
} {
  const weights = {
    personal: 15,
    academic: 15,
    transcripts: 25,
    testScores: 10,
    activities: 15,
    achievements: 15,
    projects: 5,
  };

  let score = 0;
  const breakdown = {
    personal: 0,
    academic: 0,
    transcripts: 0,
    activities: 0,
    testScores: 0,
    achievements: 0,
    projects: 0,
  };

  // Personal profile (15%)
  if (student.personalProfile) {
    const hasRequired =
      student.personalProfile.currentSchool &&
      student.personalProfile.parentName &&
      student.personalProfile.parentEmail;

    if (hasRequired) {
      score += weights.personal;
      breakdown.personal = 100;
    }
  }

  // Academic profile (15%)
  if (student.academicProfile) {
    score += weights.academic;
    breakdown.academic = 100;
  }

  // Transcripts (20%) - Target: 5+ courses
  const transcriptCount = student.transcripts?.length || 0;
  const transcriptScore = Math.min(transcriptCount / 5, 1) * weights.transcripts;
  score += transcriptScore;
  breakdown.transcripts = Math.round((transcriptCount / 5) * 100);

    // Test scores (10%) - Target: 1+ test
  const testScoreCount = student.testScores?.length || 0;
  if (testScoreCount >= 0) {
    score += weights.testScores;
    breakdown.testScores = 100;
  }

  // Activities (15%) - Target: 3+ activities
  const activityCount = student.activities?.length || 0;
  const activityScore = Math.min(activityCount / 3, 1) * weights.activities;
  score += activityScore;
  breakdown.activities = Math.round((activityCount / 3) * 100);

  // Achievements (15%) - Target: 3+ achievements
  const achievementCount = student.achievements?.length || 0;
  const achievementScore = Math.min(achievementCount / 3, 1) * weights.achievements;
  score += achievementScore;
  breakdown.achievements = Math.round((achievementCount / 3) * 100);

  // Projects (5%) - Target: 1+ project
  const projectCount = student.projectExperiences?.length || 0;
  if (projectCount >= 1) {
    score += weights.projects;
    breakdown.projects = 100;
  }

  return {
    percentage: Math.round(score),
    breakdown,
  };
}
