interface Student {
  currentGrade: string;
  academicProfile?: {
    currentGpa?: number;
    curriculumType: string;
  };
  transcripts: any[];
  activities?: any[];
  achievements?: any[];
  projectExperiences?: any[];
  testScores?: any[];
}

interface StrengthAnalysis {
  overallScore: number;
  categoryScores: {
    academic: number;
    testing: number;
    activity: number;
    leadership: number;
    achievement: number;
    projects: number;
  };
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  collegeReadiness: 'Needs Work' | 'Developing' | 'Competitive' | 'Highly Competitive';
}

export function analyzeProfileStrength(student: Student): StrengthAnalysis {
  const scores = {
    academic: calculateAcademicScore(student),
    testing: calculateTestingScore(student),
    activities: calculateActivitiesScore(student),
    leadership: calculateLeadershipScore(student),
    achievements: calculateAchievementsScore(student),
    projects: calculateProjectsScore(student),
  };

  const overallScore = Math.round(
    (scores.academic * 0.30) +
    (scores.testing * 0.20) +
    (scores.activities * 0.20) +
    (scores.leadership * 0.10) +
    (scores.achievements * 0.10) +
    (scores.projects * 0.10)
  );

  const strengths = identifyStrengths(scores);
  const weaknesses = identifyWeaknesses(scores);
  const recommendations = generateRecommendations(student, scores);
  const collegeReadiness = determineReadiness(overallScore);

  return {
    overallScore,
    categoryScores: scores,
    strengths,
    weaknesses,
    recommendations,
    collegeReadiness,
  };
}

function calculateAcademicScore(student: Student): number {
  let score = 0;
  
  const gpa = student.academicProfile?.currentGpa;
  if (gpa) {
    if (gpa >= 3.9) score += 40;
    else if (gpa >= 3.7) score += 35;
    else if (gpa >= 3.5) score += 30;
    else if (gpa >= 3.3) score += 25;
    else score += 20;
  }
  
  const transcripts = student.transcripts || [];
  const apCount = transcripts.filter(t => t.honorsLevel === 'AP').length;
  const ibCount = transcripts.filter(t => t.honorsLevel?.includes('IB')).length;
  const honorsCount = transcripts.filter(t => t.honorsLevel === 'Honors').length;
  
  const rigorScore = Math.min(30, (apCount * 3) + (ibCount * 3) + (honorsCount * 2));
  score += rigorScore;
  
  const courseCount = transcripts.length;
  if (courseCount >= 20) score += 30;
  else if (courseCount >= 15) score += 25;
  else if (courseCount >= 10) score += 20;
  else score += (courseCount * 2);
  
  return Math.min(100, score);
}

function calculateTestingScore(student: Student): number {
  const testScores = student.testScores || [];
  if (testScores.length === 0) return 0;
  
  let maxScore = 0;
  
  testScores.forEach(test => {
    let score = 0;
    
    if (test.testType === 'SAT' && test.compositeScore) {
      const sat = test.compositeScore;
      if (sat >= 1500) score = 100;
      else if (sat >= 1450) score = 90;
      else if (sat >= 1400) score = 80;
      else if (sat >= 1350) score = 70;
      else if (sat >= 1300) score = 60;
      else score = 50;
    } else if (test.testType === 'ACT' && test.compositeScore) {
      const act = test.compositeScore;
      if (act >= 34) score = 100;
      else if (act >= 32) score = 90;
      else if (act >= 30) score = 80;
      else if (act >= 28) score = 70;
      else if (act >= 26) score = 60;
      else score = 50;
    }
    
    maxScore = Math.max(maxScore, score);
  });
  
  return maxScore;
}

function calculateActivitiesScore(student: Student): number {
  const activities = student.activities || [];
  if (activities.length === 0) return 0;
  
  let score = 0;
  
  if (activities.length >= 8) score += 30;
  else if (activities.length >= 5) score += 25;
  else if (activities.length >= 3) score += 20;
  else score += (activities.length * 6);
  
  const totalHours = activities.reduce((sum, a) => 
    sum + (a.hoursPerWeek * a.weeksPerYear), 0
  );
  if (totalHours >= 1000) score += 40;
  else if (totalHours >= 600) score += 35;
  else if (totalHours >= 400) score += 30;
  else score += Math.min(30, totalHours / 20);
  
  const categories = new Set(activities.map((a: any) => a.category));
  score += Math.min(30, categories.size * 6);
  
  return Math.min(100, score);
}

function calculateLeadershipScore(student: Student): number {
  const activities = student.activities || [];
  const achievements = student.achievements || [];
  
  let score = 0;
  
  const leadershipRoles = activities.filter(a => 
    a.role && (
      a.role.toLowerCase().includes('president') ||
      a.role.toLowerCase().includes('captain') ||
      a.role.toLowerCase().includes('lead') ||
      a.role.toLowerCase().includes('founder') ||
      a.role.toLowerCase().includes('chair')
    )
  );
  score += Math.min(60, leadershipRoles.length * 15);
  
  const leadershipAchievements = achievements.filter((a: any) => 
    a.achievementType === 'Leadership'
  );
  score += Math.min(40, leadershipAchievements.length * 10);
  
  return Math.min(100, score);
}

function calculateAchievementsScore(student: Student): number {
  const achievements = student.achievements || [];
  if (achievements.length === 0) return 0;
  
  let score = 0;
  
  if (achievements.length >= 10) score += 30;
  else if (achievements.length >= 5) score += 25;
  else if (achievements.length >= 3) score += 20;
  else score += (achievements.length * 6);
  
  achievements.forEach((a: any) => {
    const level = a.recognitionLevel;
    if (level === 'International') score += 15;
    else if (level === 'National') score += 12;
    else if (level === 'State') score += 10;
    else if (level === 'City' || level === 'District') score += 7;
    else if (level === 'Inter_School') score += 5;
    else score += 3;
  });
  
  return Math.min(100, score);
}

function calculateProjectsScore(student: Student): number {
  const projects = student.projectExperiences || [];
  if (projects.length === 0) return 0;
  
  let score = 0;
  
  if (projects.length >= 5) score += 40;
  else if (projects.length >= 3) score += 30;
  else if (projects.length >= 2) score += 20;
  else score += 15;
  
  const hasResearch = projects.some((p: any) => p.experienceType === 'Research');
  const hasInternship = projects.some((p: any) => p.experienceType === 'Internship');
  const hasIndependent = projects.some((p: any) => p.experienceType === 'Independent_Project');
  
  if (hasResearch) score += 25;
  if (hasInternship) score += 20;
  if (hasIndependent) score += 15;
  
  return Math.min(100, score);
}

function identifyStrengths(scores: any): string[] {
  const strengths: string[] = [];
  
  Object.entries(scores).forEach(([key, value]) => {
    if ((value as number) >= 80) {
      strengths.push(formatCategoryName(key));
    }
  });
  
  return strengths;
}

function identifyWeaknesses(scores: any): string[] {
  const weaknesses: string[] = [];
  
  Object.entries(scores).forEach(([key, value]) => {
    if ((value as number) < 60) {
      weaknesses.push(formatCategoryName(key));
    }
  });
  
  return weaknesses;
}

function generateRecommendations(student: Student, scores: any): string[] {
  const recs: string[] = [];
  
  if (scores.testing < 70) {
    recs.push("Take SAT/ACT and aim for scores above 1400 SAT or 30 ACT");
  }
  
  if (scores.activities < 70) {
    const activityCount = student.activities?.length || 0;
    if (activityCount < 3) {
      recs.push("Join at least 3-5 meaningful extracurricular activities");
    } else {
      recs.push("Increase commitment hours in your existing activities");
    }
  }
  
  if (scores.leadership < 60) {
    recs.push("Seek leadership positions in your activities or start a new initiative");
  }
  
  if (scores.achievements < 60) {
    recs.push("Participate in competitions or pursue recognition for your work");
  }
  
  if (scores.projects < 60) {
    recs.push("Undertake an independent research project or internship");
  }
  
  if (scores.academic < 80) {
    const apCount = student.transcripts?.filter(t => t.honorsLevel === 'AP').length || 0;
    if (apCount < 5) {
      recs.push("Take more AP or IB courses to demonstrate academic rigor");
    }
  }
  
  return recs;
}

function determineReadiness(score: number): 'Needs Work' | 'Developing' | 'Competitive' | 'Highly Competitive' {
  if (score >= 85) return 'Highly Competitive';
  if (score >= 70) return 'Competitive';
  if (score >= 50) return 'Developing';
  return 'Needs Work';
}

function formatCategoryName(key: string): string {
  return key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');
}
