import "dotenv/config";
import { config } from "dotenv";
// config({ path: ".env.local", override: true });

import { PrismaClient, CurriculumType } from '@prisma/client';

// Initialize the Prisma Client
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting subject seeding...');

  const subjects = [
    // CBSE
    { subjectName: 'Mathematics', curriculumType: 'CBSE' },
    { subjectName: 'Physics', curriculumType: 'CBSE' },
    { subjectName: 'Chemistry', curriculumType: 'CBSE' },
    { subjectName: 'Biology', curriculumType: 'CBSE' },
    { subjectName: 'English', curriculumType: 'CBSE' },
    { subjectName: 'Hindi', curriculumType: 'CBSE' },
    { subjectName: 'Computer Science', curriculumType: 'CBSE' },
    { subjectName: 'Economics', curriculumType: 'CBSE' },
    { subjectName: 'Business Studies', curriculumType: 'CBSE' },
    
    // ICSE 
    { subjectName: 'English Language', curriculumType: 'ICSE' },
    { subjectName: 'Literature in English', curriculumType: 'ICSE' },
    { subjectName: 'History & Civics', curriculumType: 'ICSE' },
    { subjectName: 'Geography', curriculumType: 'ICSE' },
    { subjectName: 'Hindi', curriculumType: 'ICSE' },
    { subjectName: 'Mathematics', curriculumType: 'ICSE' },
    { subjectName: 'Physics', curriculumType: 'ICSE' },
    { subjectName: 'Chemistry', curriculumType: 'ICSE' },
    { subjectName: 'Biology', curriculumType: 'ICSE' },
    { subjectName: 'Economics', curriculumType: 'ICSE' },
    { subjectName: 'Commercial Studies', curriculumType: 'ICSE' },
    { subjectName: 'Environmental Science', curriculumType: 'ICSE' },
    { subjectName: 'Computer Applications', curriculumType: 'ICSE' },
    { subjectName: 'Economic Applications', curriculumType: 'ICSE' },
    { subjectName: 'Commercial Applications', curriculumType: 'ICSE' },
    { subjectName: 'Physical Education', curriculumType: 'ICSE' },
    { subjectName: 'Art', curriculumType: 'ICSE' },
    { subjectName: 'Robotics & Artificial Intelligence', curriculumType: 'ICSE' },        
    
    // State Board
    { subjectName: 'Mathematics', curriculumType: 'State_Board' },
    { subjectName: 'Physics', curriculumType: 'State_Board' },
    { subjectName: 'Chemistry', curriculumType: 'State_Board' },
    { subjectName: 'English', curriculumType: 'State_Board' },
    { subjectName: 'Computer Science', curriculumType: 'State_Board' },
    
    // IB
    { subjectName: 'Mathematics AA HL', curriculumType: 'IB' },
    { subjectName: 'Mathematics AI HL', curriculumType: 'IB' },
    { subjectName: 'Physics HL', curriculumType: 'IB' },
    { subjectName: 'Chemistry HL', curriculumType: 'IB' },
    { subjectName: 'Biology HL', curriculumType: 'IB' },
    { subjectName: 'English Language & Literature', curriculumType: 'IB' },
    { subjectName: 'Economics HL', curriculumType: 'IB' },
    { subjectName: 'Business Management', curriculumType: 'IB' },
    
    // US High School
    { subjectName: 'Algebra I', curriculumType: 'US_High_School' },
    { subjectName: 'Algebra II', curriculumType: 'US_High_School' },
    { subjectName: 'Geometry', curriculumType: 'US_High_School' },
    { subjectName: 'Pre-Calculus', curriculumType: 'US_High_School' },
    { subjectName: 'AP Calculus AB', curriculumType: 'US_High_School' },
    { subjectName: 'AP Calculus BC', curriculumType: 'US_High_School' },
    { subjectName: 'AP Physics 1', curriculumType: 'US_High_School' },
    { subjectName: 'AP Chemistry', curriculumType: 'US_High_School' },
    { subjectName: 'AP Biology', curriculumType: 'US_High_School' },
    { subjectName: 'English 9', curriculumType: 'US_High_School' },
    { subjectName: 'English 10', curriculumType: 'US_High_School' },
    { subjectName: 'AP English Language', curriculumType: 'US_High_School' },
    { subjectName: 'AP English Literature', curriculumType: 'US_High_School' },
    { subjectName: 'World History', curriculumType: 'US_High_School' },
    { subjectName: 'AP US History', curriculumType: 'US_High_School' },
    
    // CAIE (A-Levels)
    { subjectName: 'Mathematics', curriculumType: 'CAIE' },
    { subjectName: 'Physics', curriculumType: 'CAIE' },
    { subjectName: 'Chemistry', curriculumType: 'CAIE' },
    { subjectName: 'Biology', curriculumType: 'CAIE' },
    { subjectName: 'Economics', curriculumType: 'CAIE' },
    { subjectName: 'English Literature', curriculumType: 'CAIE' },
    { subjectName: 'Computer Science', curriculumType: 'CAIE' },
        
    // OTHER
    { subjectName: 'Physics', curriculumType: 'Other' },
    { subjectName: 'Chemistry', curriculumType: 'Other' },
    { subjectName: 'Biology', curriculumType: 'Other' },
    { subjectName: 'Mathematics', curriculumType: 'Other' },
    { subjectName: 'Computer Science', curriculumType: 'Other' },
    { subjectName: 'Accounts', curriculumType: 'Other' },
    { subjectName: 'Commerce', curriculumType: 'Other' },
    { subjectName: 'Economics', curriculumType: 'Other' },
    { subjectName: 'Business Studies', curriculumType: 'Other' },
    { subjectName: 'Political Science', curriculumType: 'Other' },
    { subjectName: 'History', curriculumType: 'Other' },
    { subjectName: 'Sociology', curriculumType: 'Other' },
    { subjectName: 'Psychology', curriculumType: 'Other' },
    { subjectName: 'Legal Studies', curriculumType: 'Other' },        
  ];

  for (const subject of subjects) {
    // Note: ensure 'subject' is lowercase here to match Prisma Client's convention 
    // for a model named 'Subject'
    await prisma.subject.upsert({
      where: {
        subjectName_curriculumType: {
          subjectName: subject.subjectName,
          curriculumType: subject.curriculumType as CurriculumType,
        },
      },
      update: {},
      create: {
        subjectName: subject.subjectName,
        curriculumType: subject.curriculumType as CurriculumType,
      },
    });
  }
    
  console.log('✅ Subjects seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });