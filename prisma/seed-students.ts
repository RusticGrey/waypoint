import "dotenv/config";
import { config } from "dotenv";
// config({ path: ".env.local", override: true });

import { 
  PrismaClient, 
  UserRole, 
  GradeLevel, 
  CurriculumType, 
  GradingSystemType, 
  Semester, 
  HonorsLevel, 
  ActivityCategory
} from "@prisma/client";

import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Students for Waypoint...');

  const commonPassword = await bcrypt.hash('password123', 10);

  // --- IDEMPOTENT STUDENT HELPER (Updated for camelCase Mapping) ---
  const upsertStudent = async (
    email: string,
    firstName: string,
    lastName: string,
    gradYear: number,
    grade: GradeLevel,
    curriculum: CurriculumType,
    grading: GradingSystemType,
    gpa: string,
    school: string,
    loc: string,
    coordId?: string
  ) => {
    return await prisma.user.upsert({
      where: { email },
      update: {
        firstName,
        lastName,
        student: {
          update: {
            graduationYear: gradYear,
            currentGrade: grade,
            coordinatorId: coordId,
          }
        }
      }, 
      create: {
        email,
        passwordHash: commonPassword, // Corrected property name
        firstName,
        lastName,
        role: UserRole.student,
        organizationId: "waypoint",
        student: {
          create: {
            graduationYear: gradYear,
            currentGrade: grade,
            coordinatorId: coordId,
            personalProfile: {
              create: { currentSchool: school, schoolLocation: loc }
            },
            academicProfile: {
              create: { 
                curriculumType: curriculum, 
                gradingSystemType: grading, 
                currentGpa: gpa 
              }
            }
          }
        }
      },
      include: { student: true }
    });
  };

  // 1. Get Coordinator for relations
  const coordinator = await prisma.user.findFirst({
    where: { role: UserRole.coordinator }
  });

  // 2. Create/Update the 5 Students
  const s1 = await upsertStudent('emma.wilson@waypoint.edu', 'Emma', 'Wilson', 2028, GradeLevel.ninth, CurriculumType.US_High_School, GradingSystemType.Percentage, '95.5', 'Lincoln High School', 'Boston, MA');
  const s2 = await upsertStudent('raj.patel@waypoint.edu', 'Raj', 'Patel', 2028, GradeLevel.ninth, CurriculumType.IB, GradingSystemType.IB_Scale, '38', 'International Academy', 'Mumbai, India', coordinator?.id);
  const s3 = await upsertStudent('priya.sharma@waypoint.edu', 'Priya', 'Sharma', 2028, GradeLevel.ninth, CurriculumType.CBSE, GradingSystemType.Percentage, '82.5', 'Delhi Public School', 'New Delhi, India');
  const s4 = await upsertStudent('james.martinez@waypoint.edu', 'James', 'Martinez', 2028, GradeLevel.ninth, CurriculumType.CAIE, GradingSystemType.Letter_Grade, 'A', 'Westminster Academy', 'London, UK', coordinator?.id);
  const s5 = await upsertStudent('ananya.reddy@waypoint.edu', 'Ananya', 'Reddy', 2028, GradeLevel.ninth, CurriculumType.State_Board, GradingSystemType.Marks_Out_Of_100, '75', 'Karnataka State School', 'Bangalore, India');

  console.log('✅ Synchronized 5 Students');

  // 3. Activity Seeding
  const allActivities = [
    { studentId: s1.student!.userId, activityName: 'Debate Team', category: ActivityCategory.Academic, role: 'Team Captain', gradeLevel: GradeLevel.twelfth, hoursPerWeek: 8, weeksPerYear: 36 },
  ];

  for (const act of allActivities) {
    await prisma.activity.upsert({
      where: {
        // Ensure you have a unique constraint on [studentId, activityName] in schema.prisma
        id: `${act.studentId}-${act.activityName}`.toLowerCase().replace(/\s+/g, '-')
      },
      update: act,
      create: {
        id: `${act.studentId}-${act.activityName}`.toLowerCase().replace(/\s+/g, '-'),
        ...act
      }
    });
  }
  console.log('✅ Synchronized Activities');
        
  // 4. Transcript Seeding
  const allTranscripts = [
    { studentId: s1.student!.userId, courseName: 'AP Calculus BC', gradeLevel: GradeLevel.ninth, semester: Semester.Fall, gradeValue: 'A', honorsLevel: HonorsLevel.AP },
  ];

  for (const tran of allTranscripts) {
    await prisma.transcript.upsert({
      where: {
        // Ensure you have a unique constraint on [studentId, courseName, gradeLevel, semester]
        id: `${tran.studentId}-${tran.courseName}`.toLowerCase().replace(/\s+/g, '-')
      },
      update: tran,
      create: {
        id: `${tran.studentId}-${tran.courseName}`.toLowerCase().replace(/\s+/g, '-'),
        ...tran
      }
    });
  }
  console.log('✅ Synchronized Transcripts');

  console.log('🎉 Seed Successful!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
});