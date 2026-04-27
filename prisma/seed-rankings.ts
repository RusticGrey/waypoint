import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seed() {
  // 1. Seed Majors
  const majors = [
    { name: 'Computer Science', category: 'STEM' },
    { name: 'Engineering', category: 'STEM' },
    { name: 'Business', category: 'Professional' },
    { name: 'Biology', category: 'STEM' },
    { name: 'Psychology', category: 'Social Sciences' },
    { name: 'Economics', category: 'Social Sciences' },
    { name: 'Mathematics', category: 'STEM' },
    { name: 'Physics', category: 'STEM' },
    { name: 'Chemistry', category: 'STEM' },
    { name: 'Art History', category: 'Humanities' },
  ];

  for (const m of majors) {
    await prisma.major.upsert({
      where: { name: m.name },
      update: {},
      create: m,
    });
  }
  console.log('Majors seeded!');

  // 2. Create US News Ranking Source
  const usNews = await prisma.rankingSource.upsert({
    where: { name: 'us_news' },
    update: {},
    create: {
      name: 'us_news',
      displayName: 'US News',
      baseUrl: 'https://www.usnews.com/best-colleges',
      isActive: true,
    },
  });

  // 3. Map existing colleges to US News (Example)
  const mit = await prisma.college.findUnique({ where: { name: 'Massachusetts Institute of Technology' } });
  if (mit) {
    await prisma.rankingSourceCollege.upsert({
      where: {
        rankingSourceId_collegeId: {
          rankingSourceId: usNews.id,
          collegeId: mit.id,
        },
      },
      update: {},
      create: {
        rankingSourceId: usNews.id,
        collegeId: mit.id,
        sourceProfileUrl: 'https://www.usnews.com/best-colleges/mit-2178',
        sections: {
          rankings: '#rankings',
          admissions: '#admissions',
          financials: '#paying-for-college',
        },
      },
    });
  }

  console.log('College Rankings Source & Mapping Seeded!');
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
