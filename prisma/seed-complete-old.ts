// import "dotenv/config";
// import { config } from "dotenv";
// config({ path: ".env.local", override: true });

// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcryptjs";

// const prisma = new PrismaClient();


// async function main() {
//   console.log('🌱 Starting comprehensive database seed...');

//   // 0. Organization
//   const org = await prisma.organization.upsert({
//     where: { id: "waypoint" },
//     update: {},
//     create: {
//       id: "waypoint",
//       name: "Waypoint Counseling Organization",
//     },
//   });
//   console.log("✓ Organization:", org.name);

//       // 1. Create Counselor
//   const counselorPassword = await bcrypt.hash('password123', 10);
//   const counselor = await prisma.user.upsert({
//     where: { email: 'counselor@waypoint.edu' },
//     update: {},
//     create: {
//       email: 'counselor@waypoint.edu',
//       password_hash: counselorPassword,
//       first_name: 'Sarah',
//       last_name: 'Johnson',
//       role: 'counselor',
//       organization_id: "waypoint",
//     },
//   });
//   console.log('✅ Created counselor');

//   // 2. Create Coordinator
//   const coordinatorPassword = await bcrypt.hash('password123', 10);
//   const coordinator = await prisma.user.upsert({
//     where: { email: 'coordinator@waypoint.edu' },
//     update: {},
//     create: {
//       email: 'coordinator@waypoint.edu',
//       password_hash: coordinatorPassword,
//       first_name: 'Michael',
//       last_name: 'Chen',
//       role: 'coordinator',
//       organization_id: "waypoint",
//     },
//   });
//   console.log('✅ Created coordinator');

//   // 3. Create Sample Students with Diverse Backgrounds
//   const studentPassword = await bcrypt.hash('password123', 10);

//   // Student 1: US High School, Strong Profile
//   const student1 = await prisma.user.create({
//     data: {
//       email: 'emma.wilson@waypoint.edu',
//       password_hash: studentPassword,
//       first_name: 'Emma',
//       last_name: 'Wilson',
//       role: 'student',
//       organization_id: "waypoint",
//       student: {
//         create: {
//           graduation_year: 2028,
//           current_grade: "ninth",
//           personal_profile: {
//             create: {
//               phone: '+1-555-0101',
//               date_of_birth: new Date('2007-03-15'),
//               current_school: 'Lincoln High School',
//               school_location: 'Boston, MA',
//             },
//           },
//           academic_profile: {
//             create: {
//               curriculum_type: 'US_High_School',
//               grading_system_type: 'Percentage',
//               current_gpa: '95.5',
//             },
//           },
//         },
//       },
//     },
//     
//     // This include is critical to access student1.student below
//     include: {
//       student: true,
//     },
//   });

//   // Add transcripts for Student 1
//   await prisma.transcript.createMany({
//     data: [
//       { student_id: student1.student!.user_id, course_name: 'AP Calculus BC', grade_level: 'twelfth', semester: 'Fall', grade_value: 'A', honors_level: 'AP' },
//       { student_id: student1.student!.user_id, course_name: 'AP Physics 1', grade_level: 'eleventh', semester: 'Full_Year', grade_value: 'A-', honors_level: 'AP' },
//       { student_id: student1.student!.user_id, course_name: 'AP English Literature', grade_level: 'twelfth', semester: 'Fall', grade_value: 'A', honors_level: 'AP' },
//       { student_id: student1.student!.user_id, course_name: 'AP US History', grade_level: 'eleventh', semester: 'Full_Year', grade_value: 'A', honors_level: 'AP' },
//       { student_id: student1.student!.user_id, course_name: 'Chemistry', grade_level: 'tenth', semester: 'Full_Year', grade_value: 'A', honors_level: 'Honors' },
//     ],
//   });

//   // Add activities for Student 1
//   await prisma.activity.createMany({
//     data: [
//       {
//         student_id: student1.student!.user_id,
//         activity_name: 'Debate Team',
//         category: 'Academic',
//         role: 'Team Captain',
//         grade_levels: ['tenth', 'eleventh', 'twelfth'],
//         hours_per_week: 8,
//         weeks_per_year: 36,
//         description: 'Led team to state championship, mentored junior debaters',
//       },
//       {
//         student_id: student1.student!.user_id,
//         activity_name: 'Community Food Bank',
//         category: 'Community_Service',
//         role: 'Volunteer Coordinator',
//         grade_levels: ['ninth', 'tenth', 'eleventh', 'twelfth'],
//         hours_per_week: 4,
//         weeks_per_year: 48,
//         description: 'Organized weekly food distribution, recruited 50+ volunteers',
//       },
//       {
//         student_id: student1.student!.user_id,
//         activity_name: 'School Newspaper',
//         category: 'Leadership',
//         role: 'Editor-in-Chief',
//         grade_levels: ['eleventh', 'twelfth'],
//         hours_per_week: 6,
//         weeks_per_year: 32,
//         description: 'Managed team of 15 writers, increased readership by 40%',
//       },
//     ],
//   });

//   // Add achievements for Student 1
//   await prisma.achievement.createMany({
//     data: [
//       {
//         student_id: student1.student!.user_id,
//         title: 'National Merit Semifinalist',
//         achievement_type: 'Academic',
//         organization: 'National Merit Scholarship Corporation',
//         recognition_level: 'National',
//         grade_level: 'twelfth',
//         date_achieved: new Date('2024-09-15'),
//       },
//       {
//         student_id: student1.student!.user_id,
//         title: 'State Debate Champion',
//         achievement_type: 'Leadership',
//         organization: 'Massachusetts Debate League',
//         recognition_level: 'State',
//         grade_level: 'eleventh',
//         date_achieved: new Date('2024-03-20'),
//       },
//     ],
//   });

//   // Add test scores for Student 1
//   await prisma.testScore.createMany({
//     data: [
//       {
//         student_id: student1.student!.user_id,
//         test_type: 'SAT',
//         test_date: new Date('2024-10-05'),
//         composite_score: 1520,
//         math_score: 780,
//         reading_writing_score: 740,
//       },
//     ],
//   });

//   console.log('✅ Created Student 1: Emma Wilson (US High School, Strong)');

//   // Student 2: IB Curriculum, Moderate Profile
//   const student2 = await prisma.user.create({
//     data: {
//       email: 'raj.patel@waypoint.edu',
//       password_hash: studentPassword,
//       first_name: 'Raj',
//       last_name: 'Patel',
//       role: 'student',
//       organization_id: 'waypoint',
//       student: {
//         create: {
//           graduation_year: 2028,
//           current_grade: "ninth",
//           primary_coordinator_id: coordinator.id,
//           personal_profile: {
//             create: {
//               phone: '+91-98765-43210',
//               date_of_birth: new Date('2007-07-22'),
//               current_school: 'International Academy',
//               school_location: 'Mumbai, India',
//             },
//           },
//           academic_profile: {
//             create: {
//               curriculum_type: 'IB',
//               grading_system_type: 'IB_Scale',
//               current_gpa: '38',
//             },
//           },
//         },
//       },
//     },
//     
//     // This include is critical to access student1.student below
//     include: {
//       student: true,
//     },
//   });

//   await prisma.transcript.createMany({
//     data: [
//       { student_id: student2.student!.user_id, course_name: 'Mathematics AA HL', grade_level: 'twelfth', semester: 'Fall', grade_value: '7', honors_level: 'IB_HL' },
//       { student_id: student2.student!.user_id, course_name: 'Physics HL', grade_level: 'eleventh', semester: 'Full_Year', grade_value: '6', honors_level: 'IB_HL' },
//       { student_id: student2.student!.user_id, course_name: 'English Language & Literature', grade_level: 'twelfth', semester: 'Fall', grade_value: '6', honors_level: 'IB' },
//       { student_id: student2.student!.user_id, course_name: 'Economics HL', grade_level: 'eleventh', semester: 'Full_Year', grade_value: '6', honors_level: 'IB_HL' },
//     ],
//   });

//   await prisma.activity.createMany({
//     data: [
//       {
//         student_id: student2.student!.user_id,
//         activity_name: 'Robotics Club',
//         category: 'Academic',
//         role: 'Team Member',
//         grade_levels: ['tenth', 'eleventh', 'twelfth'],
//         hours_per_week: 6,
//         weeks_per_year: 40,
//         description: 'Built competition robots, competed in regional tournaments',
//       },
//       {
//         student_id: student2.student!.user_id,
//         activity_name: 'Cricket Team',
//         category: 'Athletics',
//         role: 'Vice Captain',
//         grade_levels: ['ninth', 'tenth', 'eleventh', 'twelfth'],
//         hours_per_week: 10,
//         weeks_per_year: 36,
//         description: 'Played as opening batsman, led team to district finals',
//       },
//     ],
//   });

//   await prisma.projectExperience.create({
//     data: {
//       student_id: student2.student!.user_id,
//       title: 'Renewable Energy Research Project',
//       experience_type: 'Research',
//       organization: 'School Science Department',
//       role_title: 'Lead Researcher',
//       start_date: new Date('2024-01-15'),
//       end_date: new Date('2024-06-30'),
//       is_ongoing: false,
//       description: 'Studied solar panel efficiency in tropical climates, presented findings at school symposium',
//     },
//   });

//   console.log('✅ Created Student 2: Raj Patel (IB, Moderate)');

//   // Student 3: CBSE, Developing Profile
//   const student3 = await prisma.user.create({
//     data: {
//       email: 'priya.sharma@waypoint.edu',
//       password_hash: studentPassword,
//       first_name: 'Priya',
//       last_name: 'Sharma',
//       role: 'student',
//       organization_id: 'waypoint',
//       student: {
//         create: {
//           graduation_year: 2028,
//           current_grade: "ninth",
//           personal_profile: {
//             create: {
//               phone: '+91-99888-77665',
//               date_of_birth: new Date('2008-01-10'),
//               current_school: 'Delhi Public School',
//               school_location: 'New Delhi, India',
//             },
//           },
//           academic_profile: {
//             create: {
//               curriculum_type: 'CBSE',
//               grading_system_type: 'Percentage',
//               current_gpa: '82.5',
//             },
//           },
//         },
//       },
//     },
//     
//     // This include is critical to access student1.student below
//     include: {
//       student: true,
//     },
//   });

//   await prisma.transcript.createMany({
//     data: [
//       { student_id: student3.student!.user_id, course_name: 'Mathematics', grade_level: 'twelfth', semester: 'Fall', grade_value: '85', honors_level: 'Regular' },
//       { student_id: student3.student!.user_id, course_name: 'Physics', grade_level: 'eleventh', semester: 'Full_Year', grade_value: '80', honors_level: 'Regular' },
//       { student_id: student3.student!.user_id, course_name: 'English', grade_level: 'twelfth', semester: 'Fall', grade_value: '88', honors_level: 'Regular' },
//       { student_id: student3.student!.user_id, course_name: 'Computer Science', grade_level: 'eleventh', semester: 'Full_Year', grade_value: '90', honors_level: 'Regular' },
//     ],
//   });

//   await prisma.activity.createMany({
//     data: [
//       {
//         student_id: student3.student!.user_id,
//         activity_name: 'Art Club',
//         category: 'Arts_Music',
//         role: null,
//         grade_levels: ['tenth', 'eleventh'],
//         hours_per_week: 3,
//         weeks_per_year: 30,
//         description: 'Participated in painting and sketching activities',
//       },
//       {
//         student_id: student3.student!.user_id,
//         activity_name: 'Environmental Club',
//         category: 'Community_Service',
//         role: null,
//         grade_levels: ['eleventh', 'twelfth'],
//         hours_per_week: 2,
//         weeks_per_year: 24,
//         description: 'Organized tree planting drives in local community',
//       },
//     ],
//   });

//   console.log('✅ Created Student 3: Priya Sharma (CBSE, Developing)');

//   // Student 4: CAIE (A-Levels), Strong Profile with Letter Grades
//   const student4 = await prisma.user.create({
//     data: {
//       email: 'james.martinez@waypoint.edu',
//       password_hash: studentPassword,
//       first_name: 'James',
//       last_name: 'Martinez',
//       role: 'student',
//       organization_id: 'waypoint',
//       student: {
//         create: {
//           graduation_year: 2028,
//           current_grade: "ninth",
//           primary_coordinator_id: coordinator.id,
//           personal_profile: {
//             create: {
//               phone: '+44-7700-900123',
//               date_of_birth: new Date('2007-05-18'),
//               current_school: 'Westminster Academy',
//               school_location: 'London, UK',
//             },
//           },
//           academic_profile: {
//             create: {
//               curriculum_type: 'CAIE',
//               grading_system_type: 'Letter_Grade',
//               current_gpa: 'A',
//             },
//           },
//         },
//       },
//     },
//     
//     // This include is critical to access student1.student below
//     include: {
//       student: true,
//     },
//   });

//   await prisma.transcript.createMany({
//     data: [
//       { student_id: student4.student!.user_id, course_name: 'Mathematics', grade_level: 'twelfth', semester: 'Fall', grade_value: 'A*', honors_level: 'Regular' },
//       { student_id: student4.student!.user_id, course_name: 'Physics', grade_level: 'eleventh', semester: 'Full_Year', grade_value: 'A', honors_level: 'Regular' },
//       { student_id: student4.student!.user_id, course_name: 'Chemistry', grade_level: 'twelfth', semester: 'Fall', grade_value: 'A', honors_level: 'Regular' },
//       { student_id: student4.student!.user_id, course_name: 'Economics', grade_level: 'eleventh', semester: 'Full_Year', grade_value: 'A*', honors_level: 'Regular' },
//     ],
//   });

//   await prisma.activity.createMany({
//     data: [
//       {
//         student_id: student4.student!.user_id,
//         activity_name: 'Model United Nations',
//         category: 'Leadership',
//         role: 'Secretary General',
//         grade_levels: ['eleventh', 'twelfth'],
//         hours_per_week: 8,
//         weeks_per_year: 32,
//         description: 'Organized international MUN conference with 200+ delegates',
//       },
//       {
//         student_id: student4.student!.user_id,
//         activity_name: 'School Orchestra',
//         category: 'Arts_Music',
//         role: 'First Violin',
//         grade_levels: ['ninth', 'tenth', 'eleventh', 'twelfth'],
//         hours_per_week: 5,
//         weeks_per_year: 40,
//         description: 'Performed in concerts across Europe, awarded distinction',
//       },
//     ],
//   });

//   await prisma.achievement.createMany({
//     data: [
//       {
//         student_id: student4.student!.user_id,
//         title: 'European Youth Parliament Delegate',
//         achievement_type: 'Leadership',
//         organization: 'EYP UK',
//         recognition_level: 'International',
//         grade_level: 'eleventh',
//         date_achieved: new Date('2024-07-10'),
//       },
//     ],
//   });

//   console.log('✅ Created Student 4: James Martinez (CAIE/A-Levels, Strong)');

//   // Student 5: State Board, Early Development
//   const student5 = await prisma.user.create({
//     data: {
//       email: 'ananya.reddy@waypoint.edu',
//       password_hash: studentPassword,
//       first_name: 'Ananya',
//       last_name: 'Reddy',
//       role: 'student',
//       organization_id: 'waypoint',
//       student: {
//         create: { 
//           graduation_year: 2028,
//           current_grade: "ninth",
//           personal_profile: {
//             create: {
//               phone: '+91-98123-45678',
//               date_of_birth: new Date('2008-11-05'),
//               current_school: 'Karnataka State School',
//               school_location: 'Bangalore, India',
//             },
//           },
//           academic_profile: {
//             create: {
//               curriculum_type: 'State_Board',
//               grading_system_type: 'Marks_Out_Of_100',
//               current_gpa: '75',
//             },
//           },
//         },
//       },
//     },
//     
//     // This include is critical to access student1.student below
//     include: {
//       student: true,
//     },
//   });

//   await prisma.transcript.createMany({
//     data: [
//       { student_id: student5.student!.user_id, course_name: 'Mathematics', grade_level: 'tenth', semester: 'Full_Year', grade_value: '78', honors_level: 'Regular' },
//       { student_id: student5.student!.user_id, course_name: 'English', grade_level: 'tenth', semester: 'Full_Year', grade_value: '80', honors_level: 'Regular' },
//       { student_id: student5.student!.user_id, course_name: 'Physics', grade_level: 'tenth', semester: 'Full_Year', grade_value: '72', honors_level: 'Regular' },
//     ],
//   });

//   await prisma.activity.createMany({
//     data: [
//       {
//         student_id: student5.student!.user_id,
//         activity_name: 'Dance Club',
//         category: 'Arts_Music',
//         role: null,
//         grade_levels: ['ninth', 'tenth'],
//         hours_per_week: 4,
//         weeks_per_year: 28,
//         description: 'Classical Indian dance training and school performances',
//       },
//     ],
//   });

//   console.log('✅ Created Student 5: Ananya Reddy (State Board, Early Development)');

//   // 4. Seed Subjects for Different Curricula
//   console.log('🌱 Seeding subjects...');
//   
//   const subjects = [
//     // CBSE
//     { subject_name: 'Mathematics', curriculum_type: 'CBSE' },
//     { subject_name: 'Physics', curriculum_type: 'CBSE' },
//     { subject_name: 'Chemistry', curriculum_type: 'CBSE' },
//     { subject_name: 'Biology', curriculum_type: 'CBSE' },
//     { subject_name: 'English', curriculum_type: 'CBSE' },
//     { subject_name: 'Hindi', curriculum_type: 'CBSE' },
//     { subject_name: 'Computer Science', curriculum_type: 'CBSE' },
//     { subject_name: 'Economics', curriculum_type: 'CBSE' },
//     { subject_name: 'Business Studies', curriculum_type: 'CBSE' },
//     
//     // State Board
//     { subject_name: 'Mathematics', curriculum_type: 'State_Board' },
//     { subject_name: 'Physics', curriculum_type: 'State_Board' },
//     { subject_name: 'Chemistry', curriculum_type: 'State_Board' },
//     { subject_name: 'English', curriculum_type: 'State_Board' },
//     { subject_name: 'Computer Science', curriculum_type: 'State_Board' },
//     
//     // IB
//     { subject_name: 'Mathematics AA HL', curriculum_type: 'IB' },
//     { subject_name: 'Mathematics AI HL', curriculum_type: 'IB' },
//     { subject_name: 'Physics HL', curriculum_type: 'IB' },
//     { subject_name: 'Chemistry HL', curriculum_type: 'IB' },
//     { subject_name: 'Biology HL', curriculum_type: 'IB' },
//     { subject_name: 'English Language & Literature', curriculum_type: 'IB' },
//     { subject_name: 'Economics HL', curriculum_type: 'IB' },
//     { subject_name: 'Business Management', curriculum_type: 'IB' },
//     
//     // US High School
//     { subject_name: 'Algebra I', curriculum_type: 'US_High_School' },
//     { subject_name: 'Algebra II', curriculum_type: 'US_High_School' },
//     { subject_name: 'Geometry', curriculum_type: 'US_High_School' },
//     { subject_name: 'Pre-Calculus', curriculum_type: 'US_High_School' },
//     { subject_name: 'AP Calculus AB', curriculum_type: 'US_High_School' },
//     { subject_name: 'AP Calculus BC', curriculum_type: 'US_High_School' },
//     { subject_name: 'AP Physics 1', curriculum_type: 'US_High_School' },
//     { subject_name: 'AP Chemistry', curriculum_type: 'US_High_School' },
//     { subject_name: 'AP Biology', curriculum_type: 'US_High_School' },
//     { subject_name: 'English 9', curriculum_type: 'US_High_School' },
//     { subject_name: 'English 10', curriculum_type: 'US_High_School' },
//     { subject_name: 'AP English Language', curriculum_type: 'US_High_School' },
//     { subject_name: 'AP English Literature', curriculum_type: 'US_High_School' },
//     { subject_name: 'World History', curriculum_type: 'US_High_School' },
//     { subject_name: 'AP US History', curriculum_type: 'US_High_School' },
//     
//     // CAIE (A-Levels)
//     { subject_name: 'Mathematics', curriculum_type: 'CAIE' },
//     { subject_name: 'Physics', curriculum_type: 'CAIE' },
//     { subject_name: 'Chemistry', curriculum_type: 'CAIE' },
//     { subject_name: 'Biology', curriculum_type: 'CAIE' },
//     { subject_name: 'Economics', curriculum_type: 'CAIE' },
//     { subject_name: 'English Literature', curriculum_type: 'CAIE' },
//     { subject_name: 'Computer Science', curriculum_type: 'CAIE' },
//   ];

//   for (const subject of subjects) {
//     await prisma.subject.upsert({
//       where: {
//         subject_name_curriculum_type: {
//           subject_name: subject.subject_name,
//           curriculum_type: subject.curriculum_type,
//         },
//       },
//       update: {},
//       create: subject,
//     });
//   }

//   console.log('✅ Seeded subjects for all curricula');

//   console.log('🎉 Database seeded successfully!');
//   console.log('\n📝 Test Accounts:');
//   console.log('Counselor: counselor@waypoint.edu / password123');
//   console.log('Coordinator: coordinator@waypoint.edu / password123');
//   console.log('Students:');
//   console.log('  - emma.wilson@waypoint.edu (US High School, Strong)');
//   console.log('  - raj.patel@waypoint.edu (IB, Moderate)');
//   console.log('  - priya.sharma@waypoint.edu (CBSE, Developing)');
//   console.log('  - james.martinez@waypoint.edu (CAIE/A-Levels, Strong)');
//   console.log('  - ananya.reddy@waypoint.edu (State Board, Early Development)');
// }

// main()
//   .catch((e) => {
//     console.error('❌ Seed error:', e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
