import { Prisma } from '@prisma/client';

type StudentWithRelations = Prisma.StudentGetPayload<{
  include: {
    PersonalProfile: true;
    AcademicProfile: true;
    Transcript: true;
    Activity: true;
    Achievement: true;
    ProjectExperience: true;
    TestScore: true;
  };
}>;

interface DetailedCategoryScore {
  total: number;
  max: number;
  details: string[];
}

interface AcademicDetails extends DetailedCategoryScore {
  gpa_score: number;
  course_rigor_score: number;
  course_breadth_score: number;
}

interface TestingDetails extends DetailedCategoryScore {
  sat_score: number;
  act_score: number;
}

interface ActivitiesDetails extends DetailedCategoryScore {
  quantity_score: number;
  commitment_score: number;
  diversity_score: number;
}

interface LeadershipDetails extends DetailedCategoryScore {
  roles_score: number;
  achievements_score: number;
}

interface AchievementsDetails extends DetailedCategoryScore {
  quantity_score: number;
  recognition_score: number;
}

interface ProjectsDetails extends DetailedCategoryScore {
  quantity_score: number;
  quality_score: number;
}

export function analyzeProfileDetailed(student: StudentWithRelations) {
  const academic = analyzeAcademicDetailed(student);
  const testing = analyzeTestingDetailed(student);
  const activities = analyzeActivitiesDetailed(student);
  const leadership = analyzeLeadershipDetailed(student);
  const achievements = analyzeAchievementsDetailed(student);
  const projects = analyzeProjectsDetailed(student);

  // Calculate weighted overall score
  const overall_score = Math.round(
    (academic.total / academic.max) * 30 +
    (testing.total / testing.max) * 20 +
    (activities.total / activities.max) * 20 +
    (leadership.total / leadership.max) * 10 +
    (achievements.total / achievements.max) * 10 +
    (projects.total / projects.max) * 10
  );

  const category_scores = {
    academic: Math.round((academic.total / academic.max) * 100),
    testing: Math.round((testing.total / testing.max) * 100),
    Activity: Math.round((activities.total / activities.max) * 100),
    leadership: Math.round((leadership.total / leadership.max) * 100),
    Achievement: Math.round((achievements.total / achievements.max) * 100),
    projects: Math.round((projects.total / projects.max) * 100),
  };

  const strengths = [];
  const weaknesses = [];
  const recommendations = [];

  // Identify strengths (>= 80)
  Object.entries(category_scores).forEach(([key, score]) => {
    if (score >= 80) {
      strengths.push(`Strong ${key} profile with ${score}/100 score`);
    } else if (score < 60) {
      weaknesses.push(`${key.charAt(0).toUpperCase() + key.slice(1)} needs improvement (${score}/100)`);
    }
  });

  // Generate recommendations
  if (category_scores.academic < 80) {
    recommendations.push("Focus on maintaining high grades and taking more rigorous courses (AP, IB, Honors)");
  }
  if (category_scores.testing < 60) {
    recommendations.push("Take standardized tests (SAT/ACT) and aim for scores in the top 25th percentile");
  }
  if (category_scores.Activity < 70) {
    recommendations.push("Join more extracurricular activities and commit to them long-term (2+ years)");
  }
  if (category_scores.leadership < 60) {
    recommendations.push("Pursue leadership positions in your activities - captain, president, or founder roles");
  }
  if (category_scores.Achievement < 60) {
    recommendations.push("Participate in competitions and apply for awards at local, state, or national levels");
  }
  if (category_scores.projects < 60) {
    recommendations.push("Start independent projects, research, or internships in your area of interest");
  }

  // Determine college readiness
  let college_readiness = 'Early Development';
  if (overall_score >= 85) college_readiness = 'Highly Competitive';
  else if (overall_score >= 70) college_readiness = 'Competitive';
  else if (overall_score >= 50) college_readiness = 'Developing';

  return {
    overall_score,
    category_scores,
    category_details: {
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
    college_readiness,
  };
}

function analyzeAcademicDetailed(student: StudentWithRelations): AcademicDetails {
  const details: string[] = [];
  let gpa_score = 0;
  let course_rigor_score = 0;
  let course_breadth_score = 0;

  // GPA Score (max 40 points)
  const gpa = student.AcademicProfile?.current_gpa;
  if (gpa) {
    const gpaNum = parseFloat(gpa);
    if (gpaNum >= 3.9) {
      gpa_score = 40;
      details.push(`Excellent GPA (${gpa}) = 40/40 points`);
    } else if (gpaNum >= 3.7) {
      gpa_score = 35;
      details.push(`Strong GPA (${gpa}) = 35/40 points`);
    } else if (gpaNum >= 3.5) {
      gpa_score = 30;
      details.push(`Good GPA (${gpa}) = 30/40 points`);
    } else if (gpaNum >= 3.0) {
      gpa_score = 25;
      details.push(`Average GPA (${gpa}) = 25/40 points`);
    } else {
      gpa_score = 15;
      details.push(`GPA (${gpa}) = 15/40 points`);
    }
  } else {
    details.push('No GPA provided = 0/40 points');
  }

  // Course Rigor (max 30 points)
  const transcripts = student.Transcript || [];
  const apCourses = transcripts.filter(t => t.honors_level === 'AP').length;
  const ibCourses = transcripts.filter(t => t.honors_level === 'IB' || t.honors_level === 'IB_HL' || t.honors_level === 'IB_SL').length;
  const honorsCourses = transcripts.filter(t => t.honors_level === 'Honors').length;

  course_rigor_score = Math.min(30, apCourses * 3 + ibCourses * 3 + honorsCourses * 2);
  
  if (apCourses > 0 || ibCourses > 0 || honorsCourses > 0) {
    details.push(`Course rigor: ${apCourses} AP, ${ibCourses} IB, ${honorsCourses} Honors = ${course_rigor_score}/30 points`);
  } else {
    details.push('No advanced courses yet = 0/30 points');
  }

  // Course Breadth (max 30 points)
  const totalCourses = transcripts.length;
  if (totalCourses >= 20) {
    course_breadth_score = 30;
    details.push(`Excellent course breadth (${totalCourses} courses) = 30/30 points`);
  } else if (totalCourses >= 15) {
    course_breadth_score = 25;
    details.push(`Good course breadth (${totalCourses} courses) = 25/30 points`);
  } else if (totalCourses >= 10) {
    course_breadth_score = 20;
    details.push(`Moderate course breadth (${totalCourses} courses) = 20/30 points`);
  } else {
    course_breadth_score = Math.min(20, totalCourses * 2);
    details.push(`Course breadth (${totalCourses} courses) = ${course_breadth_score}/30 points`);
  }

  const total = gpa_score + course_rigor_score + course_breadth_score;
  
  return {
    gpa_score,
    course_rigor_score,
    course_breadth_score,
    total,
    max: 100,
    details,
  };
}

function analyzeTestingDetailed(student: StudentWithRelations): TestingDetails {
  const details: string[] = [];
  let sat_score = 0;
  let act_score = 0;

  const tests = student.TestScore || [];
  const satTests = tests.filter(t => t.test_type === 'SAT');
  const actTests = tests.filter(t => t.test_type === 'ACT');

  // SAT scoring (max 50 points)
  if (satTests.length > 0) {
    const bestSAT = Math.max(...satTests.map(t => t.composite_score || 0));
    if (bestSAT >= 1500) {
      sat_score = 50;
      details.push(`Excellent SAT score (${bestSAT}) = 50/50 points`);
    } else if (bestSAT >= 1450) {
      sat_score = 45;
      details.push(`Strong SAT score (${bestSAT}) = 45/50 points`);
    } else if (bestSAT >= 1400) {
      sat_score = 40;
      details.push(`Good SAT score (${bestSAT}) = 40/50 points`);
    } else if (bestSAT >= 1300) {
      sat_score = 30;
      details.push(`Average SAT score (${bestSAT}) = 30/50 points`);
    } else {
      sat_score = 20;
      details.push(`SAT score (${bestSAT}) = 20/50 points`);
    }
  }

  // ACT scoring (max 50 points)
  if (actTests.length > 0) {
    const bestACT = Math.max(...actTests.map(t => t.composite_score || 0));
    if (bestACT >= 34) {
      act_score = 50;
      details.push(`Excellent ACT score (${bestACT}) = 50/50 points`);
    } else if (bestACT >= 32) {
      act_score = 45;
      details.push(`Strong ACT score (${bestACT}) = 45/50 points`);
    } else if (bestACT >= 30) {
      act_score = 40;
      details.push(`Good ACT score (${bestACT}) = 40/50 points`);
    } else if (bestACT >= 27) {
      act_score = 30;
      details.push(`Average ACT score (${bestACT}) = 30/50 points`);
    } else {
      act_score = 20;
      details.push(`ACT score (${bestACT}) = 20/50 points`);
    }
  }

  if (satTests.length === 0 && actTests.length === 0) {
    details.push('No standardized test scores yet = 0/100 points');
  }

  const total = Math.max(sat_score, act_score); // Take the better of SAT or ACT

  return {
    sat_score,
    act_score,
    total,
    max: 50,
    details,
  };
}

function analyzeActivitiesDetailed(student: StudentWithRelations): ActivitiesDetails {
  const details: string[] = [];
  const activities = student.Activity || [];
  
  // Quantity score (max 30 points)
  let quantity_score = 0;
  if (activities.length >= 8) {
    quantity_score = 30;
    details.push(`Excellent activity count (${activities.length} activities) = 30/30 points`);
  } else if (activities.length >= 5) {
    quantity_score = 25;
    details.push(`Good activity count (${activities.length} activities) = 25/30 points`);
  } else if (activities.length >= 3) {
    quantity_score = 20;
    details.push(`Moderate activity count (${activities.length} activities) = 20/30 points`);
  } else {
    quantity_score = activities.length * 7;
    details.push(`Activity count (${activities.length} activities) = ${quantity_score}/30 points`);
  }

  // Commitment score (max 40 points) - based on total hours
  const totalHours = activities.reduce((sum, a) => sum + (a.hours_per_week * a.weeks_per_year), 0);
  let commitment_score = 0;
  if (totalHours >= 1000) {
    commitment_score = 40;
    details.push(`Exceptional time commitment (${totalHours} total hours) = 40/40 points`);
  } else if (totalHours >= 600) {
    commitment_score = 35;
    details.push(`Strong time commitment (${totalHours} total hours) = 35/40 points`);
  } else if (totalHours >= 400) {
    commitment_score = 30;
    details.push(`Good time commitment (${totalHours} total hours) = 30/40 points`);
  } else {
    commitment_score = Math.min(30, Math.round(totalHours / 15));
    details.push(`Time commitment (${totalHours} total hours) = ${commitment_score}/40 points`);
  }

  // Diversity score (max 30 points)
  const categories = new Set(activities.map(a => a.category));
  const diversity_score = Math.min(30, categories.size * 6);
  details.push(`Activity diversity (${categories.size} different categories) = ${diversity_score}/30 points`);

  const total = quantity_score + commitment_score + diversity_score;

  return {
    quantity_score,
    commitment_score,
    diversity_score,
    total,
    max: 100,
    details,
  };
}

function analyzeLeadershipDetailed(student: StudentWithRelations): LeadershipDetails {
  const details: string[] = [];
  const activities = student.Activity || [];
  const achievements = student.Achievement || [];

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
  const roles_score = Math.min(60, leadershipRoles.length * 15);
  
  if (leadershipRoles.length > 0) {
    details.push(`Leadership roles (${leadershipRoles.length}) = ${roles_score}/60 points`);
    leadershipRoles.forEach(role => {
      details.push(`  → ${role.role} in ${role.activity_name}`);
    });
  } else {
    details.push('No leadership positions yet = 0/60 points');
  }

  // Leadership achievements (max 40 points)
  const leadershipAchievements = achievements.filter(a => 
    a.achievement_type === 'Leadership'
  );
  const achievements_score = Math.min(40, leadershipAchievements.length * 10);
  
  if (leadershipAchievements.length > 0) {
    details.push(`Leadership achievements (${leadershipAchievements.length}) = ${achievements_score}/40 points`);
  } else {
    details.push('No leadership achievements yet = 0/40 points');
  }

  const total = roles_score + achievements_score;

  return {
    roles_score,
    achievements_score,
    total,
    max: 100,
    details,
  };
}

function analyzeAchievementsDetailed(student: StudentWithRelations): AchievementsDetails {
  const details: string[] = [];
  const achievements = student.Achievement || [];

  // Quantity score (max 30 points)
  let quantity_score = 0;
  if (achievements.length >= 10) {
    quantity_score = 30;
    details.push(`Excellent achievement count (${achievements.length} awards) = 30/30 points`);
  } else if (achievements.length >= 5) {
    quantity_score = 25;
    details.push(`Good achievement count (${achievements.length} awards) = 25/30 points`);
  } else if (achievements.length >= 3) {
    quantity_score = 20;
    details.push(`Moderate achievement count (${achievements.length} awards) = 20/30 points`);
  } else {
    quantity_score = achievements.length * 7;
    details.push(`Achievement count (${achievements.length} awards) = ${quantity_score}/30 points`);
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

  let recognition_score = 0;
  const recognitionBreakdown: Record<string, number> = {};
  
  achievements.forEach(a => {
    if (a.recognition_level) {
      const points = recognitionPoints[a.recognition_level] || 3;
      recognition_score += points;
      recognitionBreakdown[a.recognition_level] = (recognitionBreakdown[a.recognition_level] || 0) + 1;
    }
  });

  recognition_score = Math.min(70, recognition_score);
  
  Object.entries(recognitionBreakdown).forEach(([level, count]) => {
    details.push(`  → ${count} ${level.replace('_', ' ')} level award(s)`);
  });
  
  if (achievements.length > 0) {
    details.push(`Recognition score = ${recognition_score}/70 points`);
  } else {
    details.push('Recognition score = 0/70 points');
  }

  const total = quantity_score + recognition_score;

  return {
    quantity_score,
    recognition_score,
    total,
    max: 100,
    details,
  };
}

function analyzeProjectsDetailed(student: StudentWithRelations): ProjectsDetails {
  const details: string[] = [];
  const projects = student.ProjectExperience || [];

  // Quantity score (max 40 points)
  let quantity_score = 0;
  if (projects.length >= 5) {
    quantity_score = 40;
    details.push(`Excellent project count (${projects.length} projects) = 40/40 points`);
  } else if (projects.length >= 3) {
    quantity_score = 30;
    details.push(`Good project count (${projects.length} projects) = 30/40 points`);
  } else if (projects.length >= 2) {
    quantity_score = 20;
    details.push(`Moderate project count (${projects.length} projects) = 20/40 points`);
  } else if (projects.length === 1) {
    quantity_score = 15;
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

  let quality_score = 0;
  const projectBreakdown: Record<string, number> = {};

  projects.forEach(p => {
    const points = qualityPoints[p.experience_type] || 10;
    quality_score += points;
    projectBreakdown[p.experience_type] = (projectBreakdown[p.experience_type] || 0) + 1;
  });

  quality_score = Math.min(60, quality_score);

  Object.entries(projectBreakdown).forEach(([type, count]) => {
    details.push(`  → ${count} ${type.replace('_', ' ')} project(s)`);
  });
  
  if (projects.length > 0) {
    details.push(`Project quality score = ${quality_score}/60 points`);
  } else {
    details.push('Project quality score = 0/60 points');
  }

  const total = quantity_score + quality_score;

  return {
    quantity_score,
    quality_score,
    total,
    max: 100,
    details,
  };
}
