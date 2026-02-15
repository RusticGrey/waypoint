import { Prisma } from '@prisma/client';

type StudentWithRelations = Prisma.StudentGetPayload<{
  include: {
    personalProfile: true;
    academicProfile: true;
    transcripts: true;
    activities: true;
    achievements: true;
    projectExperiences: true;
    testScores: true;
  };
}>;

interface DetailedCategoryScore {
  total: number;
  max: number;
  details: string[];
}

interface AcademicDetails extends DetailedCategoryScore {
  gpaScore: number;
  courseRigorScore: number;
  courseBreadthScore: number;
}

interface TestingDetails extends DetailedCategoryScore {
  satScore: number;
  actScore: number;
}

interface ActivitiesDetails extends DetailedCategoryScore {
  quantityScore: number;
  commitmentScore: number;
  diversityScore: number;
}

interface LeadershipDetails extends DetailedCategoryScore {
  rolesScore: number;
  achievementsScore: number;
}

interface AchievementsDetails extends DetailedCategoryScore {
  quantityScore: number;
  recognitionScore: number;
}

interface ProjectsDetails extends DetailedCategoryScore {
  quantityScore: number;
  qualityScore: number;
}

export function analyzeProfileDetailed(student: StudentWithRelations) {
  const academic = analyzeAcademicDetailed(student);
  const testing = analyzeTestingDetailed(student);
  const activities = analyzeActivitiesDetailed(student);
  const leadership = analyzeLeadershipDetailed(student);
  const achievements = analyzeAchievementsDetailed(student);
  const projects = analyzeProjectsDetailed(student);

  // Calculate weighted overall score
  const overallScore = Math.round(
    (academic.total / academic.max) * 30 +
    (testing.total / testing.max) * 20 +
    (activities.total / activities.max) * 20 +
    (leadership.total / leadership.max) * 10 +
    (achievements.total / achievements.max) * 10 +
    (projects.total / projects.max) * 10
  );

  const categoryScores = {
    academic: Math.round((academic.total / academic.max) * 100),
    testing: Math.round((testing.total / testing.max) * 100),
    activities: Math.round((activities.total / activities.max) * 100),
    leadership: Math.round((leadership.total / leadership.max) * 100),
    achievements: Math.round((achievements.total / achievements.max) * 100),
    projects: Math.round((projects.total / projects.max) * 100),
  };

  const strengths = [];
  const weaknesses = [];
  const recommendations = [];

  // Identify strengths (>= 80)
  Object.entries(categoryScores).forEach(([key, score]) => {
    if (score >= 80) {
      strengths.push(`Strong ${key} profile with ${score}/100 score`);
    } else if (score < 60) {
      weaknesses.push(`${key.charAt(0).toUpperCase() + key.slice(1)} needs improvement (${score}/100)`);
    }
  });

  // Generate recommendations
  if (categoryScores.academic < 80) {
    recommendations.push("Focus on maintaining high grades and taking more rigorous courses (AP, IB, Honors)");
  }
  if (categoryScores.testing < 60) {
    recommendations.push("Take standardized tests (SAT/ACT) and aim for scores in the top 25th percentile");
  }
  if (categoryScores.activities < 70) {
    recommendations.push("Join more extracurricular activities and commit to them long-term (2+ years)");
  }
  if (categoryScores.leadership < 60) {
    recommendations.push("Pursue leadership positions in your activities - captain, president, or founder roles");
  }
  if (categoryScores.achievements < 60) {
    recommendations.push("Participate in competitions and apply for awards at local, state, or national levels");
  }
  if (categoryScores.projects < 60) {
    recommendations.push("Start independent projects, research, or internships in your area of interest");
  }

  // Determine college readiness
  let collegeReadiness = 'Early Development';
  if (overallScore >= 85) collegeReadiness = 'Highly Competitive';
  else if (overallScore >= 70) collegeReadiness = 'Competitive';
  else if (overallScore >= 50) collegeReadiness = 'Developing';

  return {
    overallScore,
    categoryScores,
    categoryDetails: {
      academic,
      testing,
      activities,
      leadership,
      achievements,
      projects,
    },
    strengths,
    weaknesses,
    recommendations,
    collegeReadiness,
  };
}

function analyzeAcademicDetailed(student: StudentWithRelations): AcademicDetails {
  const details: string[] = [];
  let gpaScore = 0;
  let courseRigorScore = 0;
  let courseBreadthScore = 0;

  // GPA Score (max 40 points)
  const gpa = student.academicProfile?.currentGpa;
  if (gpa) {
    const gpaNum = parseFloat(gpa);
    if (gpaNum >= 3.9) {
      gpaScore = 40;
      details.push(`Excellent GPA (${gpa}) = 40/40 points`);
    } else if (gpaNum >= 3.7) {
      gpaScore = 35;
      details.push(`Strong GPA (${gpa}) = 35/40 points`);
    } else if (gpaNum >= 3.5) {
      gpaScore = 30;
      details.push(`Good GPA (${gpa}) = 30/40 points`);
    } else if (gpaNum >= 3.0) {
      gpaScore = 25;
      details.push(`Average GPA (${gpa}) = 25/40 points`);
    } else {
      gpaScore = 15;
      details.push(`GPA (${gpa}) = 15/40 points`);
    }
  } else {
    details.push('No GPA provided = 0/40 points');
  }

  // Course Rigor (max 30 points)
  const transcripts = student.transcripts || [];
  const apCourses = transcripts.filter(t => t.honorsLevel === 'AP').length;
  const ibCourses = transcripts.filter(t => t.honorsLevel === 'IB' || t.honorsLevel === 'IB_HL' || t.honorsLevel === 'IB_SL').length;
  const honorsCourses = transcripts.filter(t => t.honorsLevel === 'Honors').length;

  courseRigorScore = Math.min(30, apCourses * 3 + ibCourses * 3 + honorsCourses * 2);
  
  if (apCourses > 0 || ibCourses > 0 || honorsCourses > 0) {
    details.push(`Course rigor: ${apCourses} AP, ${ibCourses} IB, ${honorsCourses} Honors = ${courseRigorScore}/30 points`);
  } else {
    details.push('No advanced courses yet = 0/30 points');
  }

  // Course Breadth (max 30 points)
  const totalCourses = transcripts.length;
  if (totalCourses >= 20) {
    courseBreadthScore = 30;
    details.push(`Excellent course breadth (${totalCourses} courses) = 30/30 points`);
  } else if (totalCourses >= 15) {
    courseBreadthScore = 25;
    details.push(`Good course breadth (${totalCourses} courses) = 25/30 points`);
  } else if (totalCourses >= 10) {
    courseBreadthScore = 20;
    details.push(`Moderate course breadth (${totalCourses} courses) = 20/30 points`);
  } else {
    courseBreadthScore = Math.min(20, totalCourses * 2);
    details.push(`Course breadth (${totalCourses} courses) = ${courseBreadthScore}/30 points`);
  }

  const total = gpaScore + courseRigorScore + courseBreadthScore;
  
  return {
    gpaScore,
    courseRigorScore,
    courseBreadthScore,
    total,
    max: 100,
    details,
  };
}

function analyzeTestingDetailed(student: StudentWithRelations): TestingDetails {
  const details: string[] = [];
  let satScore = 0;
  let actScore = 0;

  const tests = student.testScores || [];
  const satTests = tests.filter(t => t.testType === 'SAT');
  const actTests = tests.filter(t => t.testType === 'ACT');

  // SAT scoring (max 50 points)
  if (satTests.length > 0) {
    const bestSAT = Math.max(...satTests.map(t => t.compositeScore || 0));
    if (bestSAT >= 1500) {
      satScore = 50;
      details.push(`Excellent SAT score (${bestSAT}) = 50/50 points`);
    } else if (bestSAT >= 1450) {
      satScore = 45;
      details.push(`Strong SAT score (${bestSAT}) = 45/50 points`);
    } else if (bestSAT >= 1400) {
      satScore = 40;
      details.push(`Good SAT score (${bestSAT}) = 40/50 points`);
    } else if (bestSAT >= 1300) {
      satScore = 30;
      details.push(`Average SAT score (${bestSAT}) = 30/50 points`);
    } else {
      satScore = 20;
      details.push(`SAT score (${bestSAT}) = 20/50 points`);
    }
  }

  // ACT scoring (max 50 points)
  if (actTests.length > 0) {
    const bestACT = Math.max(...actTests.map(t => t.compositeScore || 0));
    if (bestACT >= 34) {
      actScore = 50;
      details.push(`Excellent ACT score (${bestACT}) = 50/50 points`);
    } else if (bestACT >= 32) {
      actScore = 45;
      details.push(`Strong ACT score (${bestACT}) = 45/50 points`);
    } else if (bestACT >= 30) {
      actScore = 40;
      details.push(`Good ACT score (${bestACT}) = 40/50 points`);
    } else if (bestACT >= 27) {
      actScore = 30;
      details.push(`Average ACT score (${bestACT}) = 30/50 points`);
    } else {
      actScore = 20;
      details.push(`ACT score (${bestACT}) = 20/50 points`);
    }
  }

  if (satTests.length === 0 && actTests.length === 0) {
    details.push('No standardized test scores yet = 0/100 points');
  }

  const total = Math.max(satScore, actScore); // Take the better of SAT or ACT

  return {
    satScore,
    actScore,
    total,
    max: 50,
    details,
  };
}

function analyzeActivitiesDetailed(student: StudentWithRelations): ActivitiesDetails {
  const details: string[] = [];
  const activities = student.activities || [];
  
  // Quantity score (max 30 points)
  let quantityScore = 0;
  if (activities.length >= 8) {
    quantityScore = 30;
    details.push(`Excellent activity count (${activities.length} activities) = 30/30 points`);
  } else if (activities.length >= 5) {
    quantityScore = 25;
    details.push(`Good activity count (${activities.length} activities) = 25/30 points`);
  } else if (activities.length >= 3) {
    quantityScore = 20;
    details.push(`Moderate activity count (${activities.length} activities) = 20/30 points`);
  } else {
    quantityScore = activities.length * 7;
    details.push(`Activity count (${activities.length} activities) = ${quantityScore}/30 points`);
  }

  // Commitment score (max 40 points) - based on total hours
  const totalHours = activities.reduce((sum, a) => sum + (a.hoursPerWeek * a.weeksPerYear), 0);
  let commitmentScore = 0;
  if (totalHours >= 1000) {
    commitmentScore = 40;
    details.push(`Exceptional time commitment (${totalHours} total hours) = 40/40 points`);
  } else if (totalHours >= 600) {
    commitmentScore = 35;
    details.push(`Strong time commitment (${totalHours} total hours) = 35/40 points`);
  } else if (totalHours >= 400) {
    commitmentScore = 30;
    details.push(`Good time commitment (${totalHours} total hours) = 30/40 points`);
  } else {
    commitmentScore = Math.min(30, Math.round(totalHours / 15));
    details.push(`Time commitment (${totalHours} total hours) = ${commitmentScore}/40 points`);
  }

  // Diversity score (max 30 points)
  const categories = new Set(activities.map(a => a.category));
  const diversityScore = Math.min(30, categories.size * 6);
  details.push(`Activity diversity (${categories.size} different categories) = ${diversityScore}/30 points`);

  const total = quantityScore + commitmentScore + diversityScore;

  return {
    quantityScore,
    commitmentScore,
    diversityScore,
    total,
    max: 100,
    details,
  };
}

function analyzeLeadershipDetailed(student: StudentWithRelations): LeadershipDetails {
  const details: string[] = [];
  const activities = student.activities || [];
  const achievements = student.achievements || [];

  // Leadership roles score (max 60 points)
  const leadershipRoles = activities.filter(a => 
    a.role && (
      a.role.toLowerCase().includes('president') ||
      a.role.toLowerCase().includes('captain') ||
      a.role.toLowerCase().includes('founder') ||
      a.role.toLowerCase().includes('director') ||
      a.role.toLowerCase().includes('head')
    )
  );
  const rolesScore = Math.min(60, leadershipRoles.length * 15);
  
  if (leadershipRoles.length > 0) {
    details.push(`Leadership roles (${leadershipRoles.length}) = ${rolesScore}/60 points`);
    leadershipRoles.forEach(role => {
      details.push(`  → ${role.role} in ${role.activityName}`);
    });
  } else {
    details.push('No leadership positions yet = 0/60 points');
  }

  // Leadership achievements (max 40 points)
  const leadershipAchievements = achievements.filter(a => 
    a.achievementType === 'Leadership'
  );
  const achievementsScore = Math.min(40, leadershipAchievements.length * 10);
  
  if (leadershipAchievements.length > 0) {
    details.push(`Leadership achievements (${leadershipAchievements.length}) = ${achievementsScore}/40 points`);
  } else {
    details.push('No leadership achievements yet = 0/40 points');
  }

  const total = rolesScore + achievementsScore;

  return {
    rolesScore,
    achievementsScore,
    total,
    max: 100,
    details,
  };
}

function analyzeAchievementsDetailed(student: StudentWithRelations): AchievementsDetails {
  const details: string[] = [];
  const achievements = student.achievements || [];

  // Quantity score (max 30 points)
  let quantityScore = 0;
  if (achievements.length >= 10) {
    quantityScore = 30;
    details.push(`Excellent achievement count (${achievements.length} awards) = 30/30 points`);
  } else if (achievements.length >= 5) {
    quantityScore = 25;
    details.push(`Good achievement count (${achievements.length} awards) = 25/30 points`);
  } else if (achievements.length >= 3) {
    quantityScore = 20;
    details.push(`Moderate achievement count (${achievements.length} awards) = 20/30 points`);
  } else {
    quantityScore = achievements.length * 7;
    details.push(`Achievement count (${achievements.length} awards) = ${quantityScore}/30 points`);
  }

  // Recognition level score (max 70 points)
  const recognitionPoints: Record<string, number> = {
    'International': 15,
    'National': 12,
    'State': 10,
    'City': 7,
    'District': 5,
    'Inter_School': 4,
    'School': 3,
  };

  let recognitionScore = 0;
  const recognitionBreakdown: Record<string, number> = {};
  
  achievements.forEach(a => {
    if (a.recognitionLevel) {
      const points = recognitionPoints[a.recognitionLevel] || 3;
      recognitionScore += points;
      recognitionBreakdown[a.recognitionLevel] = (recognitionBreakdown[a.recognitionLevel] || 0) + 1;
    }
  });

  recognitionScore = Math.min(70, recognitionScore);
  
  Object.entries(recognitionBreakdown).forEach(([level, count]) => {
    details.push(`  → ${count} ${level.replace('_', ' ')} level award(s)`);
  });
  
  if (achievements.length > 0) {
    details.push(`Recognition score = ${recognitionScore}/70 points`);
  } else {
    details.push('Recognition score = 0/70 points');
  }

  const total = quantityScore + recognitionScore;

  return {
    quantityScore,
    recognitionScore,
    total,
    max: 100,
    details,
  };
}

function analyzeProjectsDetailed(student: StudentWithRelations): ProjectsDetails {
  const details: string[] = [];
  const projects = student.projectExperiences || [];

  // Quantity score (max 40 points)
  let quantityScore = 0;
  if (projects.length >= 5) {
    quantityScore = 40;
    details.push(`Excellent project count (${projects.length} projects) = 40/40 points`);
  } else if (projects.length >= 3) {
    quantityScore = 30;
    details.push(`Good project count (${projects.length} projects) = 30/40 points`);
  } else if (projects.length >= 2) {
    quantityScore = 20;
    details.push(`Moderate project count (${projects.length} projects) = 20/40 points`);
  } else if (projects.length === 1) {
    quantityScore = 15;
    details.push(`Project count (${projects.length} project) = 15/40 points`);
  } else {
    details.push('No projects yet = 0/40 points');
  }

  // Quality score (max 60 points) - based on type
  const qualityPoints: Record<string, number> = {
    'Research': 25,
    'Internship': 20,
    'Independent_Project': 15,
    'Volunteer_Project': 12,
    'Other': 10,
  };

  let qualityScore = 0;
  const projectBreakdown: Record<string, number> = {};

  projects.forEach(p => {
    const points = qualityPoints[p.experienceType] || 10;
    qualityScore += points;
    projectBreakdown[p.experienceType] = (projectBreakdown[p.experienceType] || 0) + 1;
  });

  qualityScore = Math.min(60, qualityScore);

  Object.entries(projectBreakdown).forEach(([type, count]) => {
    details.push(`  → ${count} ${type.replace('_', ' ')} project(s)`);
  });
  
  if (projects.length > 0) {
    details.push(`Project quality score = ${qualityScore}/60 points`);
  } else {
    details.push('Project quality score = 0/60 points');
  }

  const total = quantityScore + qualityScore;

  return {
    quantityScore,
    qualityScore,
    total,
    max: 100,
    details,
  };
}


