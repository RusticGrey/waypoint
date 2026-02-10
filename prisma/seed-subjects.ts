import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding subjects...');

  const subjects = [
    // CBSE subjects
    { subject_name: 'Mathematics', curriculum_type: 'CBSE' },
    { subject_name: 'Physics', curriculum_type: 'CBSE' },
    { subject_name: 'Chemistry', curriculum_type: 'CBSE' },
    { subject_name: 'Biology', curriculum_type: 'CBSE' },
    { subject_name: 'English', curriculum_type: 'CBSE' },
    { subject_name: 'Hindi', curriculum_type: 'CBSE' },
    { subject_name: 'Computer Science', curriculum_type: 'CBSE' },
    { subject_name: 'Economics', curriculum_type: 'CBSE' },
    { subject_name: 'Business Studies', curriculum_type: 'CBSE' },
    { subject_name: 'Accountancy', curriculum_type: 'CBSE' },

    // State Board subjects
    { subject_name: 'Mathematics', curriculum_type: 'State_Board' },
    { subject_name: 'Physics', curriculum_type: 'State_Board' },
    { subject_name: 'Chemistry', curriculum_type: 'State_Board' },
    { subject_name: 'Biology', curriculum_type: 'State_Board' },
    { subject_name: 'English', curriculum_type: 'State_Board' },
    { subject_name: 'Computer Science', curriculum_type: 'State_Board' },

    // IB subjects
    { subject_name: 'Mathematics AA HL', curriculum_type: 'IB' },
    { subject_name: 'Mathematics AI HL', curriculum_type: 'IB' },
    { subject_name: 'Physics HL', curriculum_type: 'IB' },
    { subject_name: 'Chemistry HL', curriculum_type: 'IB' },
    { subject_name: 'Biology HL', curriculum_type: 'IB' },
    { subject_name: 'English Language & Literature', curriculum_type: 'IB' },
    { subject_name: 'Economics HL', curriculum_type: 'IB' },
    { subject_name: 'Business Management', curriculum_type: 'IB' },

    // US High School subjects
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
  ];

  for (const subject of subjects) {
    await prisma.subject.upsert({
      where: {
        subject_name_curriculum_type: {
          subject_name: subject.subject_name,
          curriculum_type: subject.curriculum_type,
        },
      },
      update: {},
      create: subject,
    });
  }

  console.log('✅ Subjects seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
