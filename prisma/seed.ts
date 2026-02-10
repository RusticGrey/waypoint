import "dotenv/config";
import { config } from "dotenv";
config({ path: ".env.local", override: true });

import { 
  PrismaClient, 
  UserRole, 
  GradeLevel, 
  CurriculumType, 
  GradingSystemType, 
  Semester, 
  HonorsLevel, 
  ActivityCategory, // Essential for type safety
  AchievementType, 
  RecognitionLevel,
  ExperienceType,
  ProjectStatus,
  TargetCategory,
  ApplicationStatus
} from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting full database seed for Waypoint...');

// ====================================================================

// BASE. Seed Subjects for Different Curricula
  console.log('🌱 Seeding subjects...');
  
  const ALL_SUBJECTS = [
    // CBSE
    { subject_name: 'Mathematics', curriculum_type: 'CBSE' },
    { subject_name: 'Physics', curriculum_type: 'CBSE' },
    { subject_name: 'Chemistry', curriculum_type: 'CBSE' },
    { subject_name: 'Biology', curriculum_type: 'CBSE' },
    { subject_name: 'English', curriculum_type: 'CBSE' },
    { subject_name: 'Hindi', curriculum_type: 'CBSE' },
    { subject_name: 'Computer Science', curriculum_type: 'CBSE' },
    { subject_name: 'Economics', curriculum_type: 'CBSE' },
    { subject_name: 'Business Studies', curriculum_type: 'CBSE' },
    
    // State Board
    { subject_name: 'Mathematics', curriculum_type: 'State_Board' },
    { subject_name: 'Physics', curriculum_type: 'State_Board' },
    { subject_name: 'Chemistry', curriculum_type: 'State_Board' },
    { subject_name: 'English', curriculum_type: 'State_Board' },
    { subject_name: 'Computer Science', curriculum_type: 'State_Board' },
    
    // IB
    { subject_name: 'Mathematics AA HL', curriculum_type: 'IB' },
    { subject_name: 'Mathematics AI HL', curriculum_type: 'IB' },
    { subject_name: 'Physics HL', curriculum_type: 'IB' },
    { subject_name: 'Chemistry HL', curriculum_type: 'IB' },
    { subject_name: 'Biology HL', curriculum_type: 'IB' },
    { subject_name: 'English Language & Literature', curriculum_type: 'IB' },
    { subject_name: 'Economics HL', curriculum_type: 'IB' },
    { subject_name: 'Business Management', curriculum_type: 'IB' },
    
    // US High School
    { subject_name: 'Algebra I', curriculum_type: 'US_High_School' },
    { subject_name: 'Algebra II', curriculum_type: 'US_High_School' },
    { subject_name: 'Geometry', curriculum_type: 'US_High_School' },
    { subject_name: 'Pre-Calculus', curriculum_type: 'US_High_School' },
    { subject_name: 'AP Calculus AB', curriculum_type: 'US_High_School' },
    { subject_name: 'AP Calculus BC', curriculum_type: 'US_High_School' },
    { subject_name: 'AP Physics 1', curriculum_type: 'US_High_School' },
    { subject_name: 'AP Chemistry', curriculum_type: 'US_High_School' },
    { subject_name: 'AP Biology', curriculum_type: 'US_High_School' },
    { subject_name: 'English 9', curriculum_type: 'US_High_School' },
    { subject_name: 'English 10', curriculum_type: 'US_High_School' },
    { subject_name: 'AP English Language', curriculum_type: 'US_High_School' },
    { subject_name: 'AP English Literature', curriculum_type: 'US_High_School' },
    { subject_name: 'World History', curriculum_type: 'US_High_School' },
    { subject_name: 'AP US History', curriculum_type: 'US_High_School' },
    
    // CAIE (A-Levels)
    { subject_name: 'Mathematics', curriculum_type: 'CAIE' },
    { subject_name: 'Physics', curriculum_type: 'CAIE' },
    { subject_name: 'Chemistry', curriculum_type: 'CAIE' },
    { subject_name: 'Biology', curriculum_type: 'CAIE' },
    { subject_name: 'Economics', curriculum_type: 'CAIE' },
    { subject_name: 'English Literature', curriculum_type: 'CAIE' },
    { subject_name: 'Computer Science', curriculum_type: 'CAIE' },
  ];

 // Delete existing subjects first
  await prisma.subject.deleteMany({});
  
  // for (const subject of ALL_SUBJECTS) {
  //   await prisma.subject.upsert({
  //     where: {
  //       subject_name_curriculum_type: {
  //         subject_name: subject.subject_name,
  //         curriculum_type: subject.curriculum_type,
  //       },
  //     },
  //     update: {},
  //     create: subject,
  //   });
  // }
    
  // Create all subjects
  for (const subject of ALL_SUBJECTS) {
    await prisma.subject.create({
      data: {
        subject_name: subject.subject_name,
        
        // Explicitly cast the string to the Enum type
        curriculum_type: subject.curriculum_type as CurriculumType,
      },
    });
  }

  console.log(`✅ Seeded ${ALL_SUBJECTS.length} subjects for all curricula`);

const TOP_COLLEGES = [
  // Ivy League
  { name: "Harvard University", acceptance_rate: 0.033, avg_gpa: 4.18, avg_sat: 1520, avg_act: 34, ranking_us_news: 3, country: "United States" },
  { name: "Princeton University", acceptance_rate: 0.039, avg_gpa: 3.95, avg_sat: 1515, avg_act: 34, ranking_us_news: 1, country: "United States" },
  { name: "Yale University", acceptance_rate: 0.045, avg_gpa: 4.14, avg_sat: 1515, avg_act: 34, ranking_us_news: 5, country: "United States" },
  { name: "Columbia University", acceptance_rate: 0.038, avg_gpa: 4.15, avg_sat: 1520, avg_act: 34, ranking_us_news: 12, country: "United States" },
  { name: "University of Pennsylvania", acceptance_rate: 0.063, avg_gpa: 3.90, avg_sat: 1500, avg_act: 34, ranking_us_news: 6, country: "United States" },
  { name: "Brown University", acceptance_rate: 0.052, avg_gpa: 4.08, avg_sat: 1505, avg_act: 34, ranking_us_news: 9, country: "United States" },
  { name: "Dartmouth College", acceptance_rate: 0.063, avg_gpa: 4.11, avg_sat: 1500, avg_act: 34, ranking_us_news: 12, country: "United States" },
  { name: "Cornell University", acceptance_rate: 0.087, avg_gpa: 4.07, avg_sat: 1480, avg_act: 33, ranking_us_news: 12, country: "United States" },
  
  // Top Tech
  { name: "Massachusetts Institute of Technology", acceptance_rate: 0.033, avg_gpa: 4.17, avg_sat: 1540, avg_act: 35, ranking_us_news: 2, country: "United States" },
  { name: "Stanford University", acceptance_rate: 0.035, avg_gpa: 3.96, avg_sat: 1520, avg_act: 34, ranking_us_news: 3, country: "United States" },
  { name: "California Institute of Technology", acceptance_rate: 0.034, avg_gpa: 4.19, avg_sat: 1560, avg_act: 35, ranking_us_news: 7, country: "United States" },
  
  // Top Public
  { name: "University of California, Berkeley", acceptance_rate: 0.112, avg_gpa: 3.90, avg_sat: 1430, avg_act: 33, ranking_us_news: 20, country: "United States" },
  { name: "University of California, Los Angeles", acceptance_rate: 0.089, avg_gpa: 3.93, avg_sat: 1435, avg_act: 32, ranking_us_news: 20, country: "United States" },
  { name: "University of Michigan", acceptance_rate: 0.176, avg_gpa: 3.90, avg_sat: 1435, avg_act: 33, ranking_us_news: 21, country: "United States" },
  { name: "University of Virginia", acceptance_rate: 0.191, avg_gpa: 4.32, avg_sat: 1442, avg_act: 33, ranking_us_news: 24, country: "United States" },
  { name: "University of North Carolina at Chapel Hill", acceptance_rate: 0.168, avg_gpa: 4.70, avg_sat: 1410, avg_act: 31, ranking_us_news: 29, country: "United States" },
  
  // Other Top Universities
  { name: "Duke University", acceptance_rate: 0.056, avg_gpa: 4.13, avg_sat: 1530, avg_act: 34, ranking_us_news: 7, country: "United States" },
  { name: "Northwestern University", acceptance_rate: 0.070, avg_gpa: 4.10, avg_sat: 1510, avg_act: 34, ranking_us_news: 9, country: "United States" },
  { name: "Johns Hopkins University", acceptance_rate: 0.076, avg_gpa: 3.93, avg_sat: 1520, avg_act: 34, ranking_us_news: 9, country: "United States" },
  { name: "University of Chicago", acceptance_rate: 0.053, avg_gpa: 4.48, avg_sat: 1535, avg_act: 34, ranking_us_news: 6, country: "United States" },
  { name: "Vanderbilt University", acceptance_rate: 0.063, avg_gpa: 3.91, avg_sat: 1515, avg_act: 34, ranking_us_news: 18, country: "United States" },
  { name: "Rice University", acceptance_rate: 0.085, avg_gpa: 3.96, avg_sat: 1520, avg_act: 34, ranking_us_news: 15, country: "United States" },
  { name: "Carnegie Mellon University", acceptance_rate: 0.113, avg_gpa: 3.90, avg_sat: 1510, avg_act: 34, ranking_us_news: 24, country: "United States" },
  { name: "Emory University", acceptance_rate: 0.113, avg_gpa: 3.90, avg_sat: 1470, avg_act: 33, ranking_us_news: 24, country: "United States" },
  { name: "Georgetown University", acceptance_rate: 0.120, avg_gpa: 4.01, avg_sat: 1480, avg_act: 33, ranking_us_news: 22, country: "United States" },
  { name: "University of Southern California", acceptance_rate: 0.093, avg_gpa: 3.88, avg_sat: 1470, avg_act: 33, ranking_us_news: 28, country: "United States" },
  
  // Top Liberal Arts
  { name: "Williams College", acceptance_rate: 0.085, avg_gpa: 3.95, avg_sat: 1490, avg_act: 33, ranking_us_news: 1, country: "United States" },
  { name: "Amherst College", acceptance_rate: 0.075, avg_gpa: 3.96, avg_sat: 1495, avg_act: 33, ranking_us_news: 2, country: "United States" },
  { name: "Swarthmore College", acceptance_rate: 0.067, avg_gpa: 4.05, avg_sat: 1485, avg_act: 33, ranking_us_news: 4, country: "United States" },
  { name: "Pomona College", acceptance_rate: 0.067, avg_gpa: 3.95, avg_sat: 1490, avg_act: 33, ranking_us_news: 3, country: "United States" },
  
  // International
  { name: "University of Oxford", acceptance_rate: 0.138, avg_gpa: null, avg_sat: null, avg_act: null, ranking_us_news: null, country: "United Kingdom" },
  { name: "University of Cambridge", acceptance_rate: 0.166, avg_gpa: null, avg_sat: null, avg_act: null, ranking_us_news: null, country: "United Kingdom" },
];
  
console.log('Seeding colleges...');
  
  // Delete existing colleges first
  await prisma.college.deleteMany({});
  
  // Create all colleges
  for (const college of TOP_COLLEGES) {
    await prisma.college.create({
      data: college,
    });
  }
  
console.log(`✅ Seeded ${TOP_COLLEGES.length} colleges`);

    
//=======================================================================
    
  // 0. Organization
  const org = await prisma.organization.upsert({
    where: { id: "waypoint" },
    update: {},
    create: {
      id: "waypoint",
      name: "Waypoint Counseling Organization",
      primary_color: "#3B82F6",
    },
  });

  const commonPassword = await bcrypt.hash('password123', 10);

  // 1. Staff Users
  const counselor = await prisma.user.upsert({
    where: { email: 'counselor@waypoint.edu' },
    update: {},
    create: {
      email: 'counselor@waypoint.edu',
      password_hash: commonPassword,
      first_name: 'Sarah',
      last_name: 'Johnson',
      role: UserRole.counselor,
      organization_id: "waypoint",
    },
  });

  const coordinator = await prisma.user.upsert({
    where: { email: 'coordinator@waypoint.edu' },
    update: {},
    create: {
      email: 'coordinator@waypoint.edu',
      password_hash: commonPassword,
      first_name: 'Michael',
      last_name: 'Chen',
      role: UserRole.coordinator,
      organization_id: "waypoint",
    },
  });

  // --- IDEMPOTENT STUDENT HELPER ---
  const upsertStudent = async (email: string, firstName: string, lastName: string, gradYear: number, grade: GradeLevel, curriculum: CurriculumType, grading: GradingSystemType, gpa: string, school: string, loc: string, coordId?: string) => {
    return await prisma.user.upsert({
      where: { email },
      update: {}, 
      create: {
        email,
        password_hash: commonPassword,
        first_name: firstName,
        last_name: lastName,
        role: UserRole.student,
        organization_id: "waypoint",
        student: {
          create: {
            graduation_year: gradYear,
            current_grade: grade,
            primary_coordinator_id: coordId,
            personal_profile: {
              create: { current_school: school, school_location: loc }
            },
            academic_profile: {
              create: { curriculum_type: curriculum, grading_system_type: grading, current_gpa: gpa }
            }
          }
        }
      },
      include: { student: true }
    });
  };

  // 2. Create/Update the 5 Students [cite: 5, 6, 8, 10]
  const s1 = await upsertStudent('emma.wilson@waypoint.edu', 'Emma', 'Wilson', 2028, GradeLevel.ninth, CurriculumType.US_High_School, GradingSystemType.Percentage, '95.5', 'Lincoln High School', 'Boston, MA');
  const s2 = await upsertStudent('raj.patel@waypoint.edu', 'Raj', 'Patel', 2028, GradeLevel.ninth, CurriculumType.IB, GradingSystemType.IB_Scale, '38', 'International Academy', 'Mumbai, India', coordinator.id);
  const s3 = await upsertStudent('priya.sharma@waypoint.edu', 'Priya', 'Sharma', 2028, GradeLevel.ninth, CurriculumType.CBSE, GradingSystemType.Percentage, '82.5', 'Delhi Public School', 'New Delhi, India');
  const s4 = await upsertStudent('james.martinez@waypoint.edu', 'James', 'Martinez', 2028, GradeLevel.ninth, CurriculumType.CAIE, GradingSystemType.Letter_Grade, 'A', 'Westminster Academy', 'London, UK', coordinator.id);
  const s5 = await upsertStudent('ananya.reddy@waypoint.edu', 'Ananya', 'Reddy', 2028, GradeLevel.ninth, CurriculumType.State_Board, GradingSystemType.Marks_Out_Of_100, '75', 'Karnataka State School', 'Bangalore, India');

  console.log('✅ Synchronized 5 Students');

 // 3. Activity Seeding (Explicit Casting to Enum)
  const allActivities = [
    { student_id: s1.student!.user_id, activity_name: 'Debate Team', category: ActivityCategory.Academic, role: 'Team Captain', grade_levels: ['tenth', 'eleventh', 'twelfth'], hours_per_week: 8, weeks_per_year: 36 },
    { student_id: s2.student!.user_id, activity_name: 'Robotics Club', category: ActivityCategory.Academic, role: 'Team Member', grade_levels: ['tenth', 'eleventh', 'twelfth'], hours_per_week: 6, weeks_per_year: 40 },
    { student_id: s3.student!.user_id, activity_name: 'Art Club', category: ActivityCategory.Arts_Music, role: null, grade_levels: ['tenth', 'eleventh'], hours_per_week: 3, weeks_per_year: 30 },
  ];

  for (const act of allActivities) {
    const existing = await prisma.activity.findFirst({
      where: { student_id: act.student_id, activity_name: act.activity_name }
    });
    if (!existing) {
      await prisma.activity.create({
        data: {
          ...act,
          grade_levels: act.grade_levels as any // Explicit cast for Json field
        }
      });
    }
  }
  console.log('✅ Synchronized Activities');
        
  // Add transcripts
  const allTranscripts = [
      { student_id: s1.student!.user_id, course_name: 'AP Calculus BC', grade_level: GradeLevel.ninth, semester: Semester.Fall, grade_value: 'A', honors_level: HonorsLevel.AP },
      { student_id: s1.student!.user_id, course_name: 'AP Physics 1', grade_level: GradeLevel.eleventh, semester: Semester.Full_Year, grade_value: 'A-', honors_level: HonorsLevel.AP },
      { student_id: s1.student!.user_id, course_name: 'AP English Literature', grade_level: GradeLevel.twelfth, semester: Semester.Fall, grade_value: 'A', honors_level: HonorsLevel.AP },
      { student_id: s1.student!.user_id, course_name: 'AP US History', grade_level: GradeLevel.eleventh, semester: Semester.Full_Year, grade_value: 'A', honors_level: HonorsLevel.AP },
      { student_id: s1.student!.user_id, course_name: 'Chemistry', grade_level: GradeLevel.tenth, semester: Semester.Full_Year, grade_value: 'A', honors_level: HonorsLevel.Honors },
  ];

  for (const tran of allTranscripts) {
    const existing = await prisma.transcript.findFirst({
      where: {  student_id: tran.student_id, course_name: tran.course_name }
    });
    if (!existing) {
      await prisma.transcript.create({
        data: {
          ...tran
        }
      });
    }
  }
  console.log('✅ Synchronized Transcripts');
        

  console.log('🎉 Seed Successful! All systems go for Waypoint.');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
});