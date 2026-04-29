import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const templates = [
  {
    name: 'US News Overall Ranking',
    section: 'overall',
    sourceType: 'us_news',
    promptTemplate: `Extract the following institution information from this US News college profile HTML:
- name: Official name of the college
- ranking: National University ranking number (as an integer)
- institutionType: e.g., Private, Public
- yearFounded: The year the institution was founded (as an integer)
- religiousAffiliation: Any religious affiliation (or "None")
- academicCalendar: e.g., Semester, Quarter
- setting: e.g., Urban, Suburban, Rural
- totalEnrollment: Total number of students (as an integer)

HTML Content:
{{html}}

Return ONLY valid JSON with these keys. No markdown, no explanations.`,
    outputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        ranking: { type: 'number' },
        institutionType: { type: 'string' },
        yearFounded: { type: 'number' },
        religiousAffiliation: { type: 'string' },
        academicCalendar: { type: 'string' },
        setting: { type: 'string' },
        totalEnrollment: { type: 'number' },
      },
      required: ['name', 'ranking']
    },
    fields: ['name', 'ranking', 'institutionType', 'yearFounded', 'totalEnrollment'],
  },
  {
    name: 'US News Admissions Stats',
    section: 'admissions',
    sourceType: 'us_news',
    promptTemplate: `Extract the following admissions data from this US News college profile HTML:
- acceptanceRate: The percentage of applicants accepted (as a float, e.g., 0.15 for 15%)
- applicationDeadline: The regular decision deadline (string)
- earlyDecisionDeadline: The ED deadline (if present)
- satRange: The 25th-75th percentile SAT score range (string, e.g., "1450-1560")
- actRange: The 25th-75th percentile ACT score range (string, e.g., "33-35")
- avgGpa: Average high school GPA (float)
- applicationFee: Cost to apply (number)
- commonAppAccepted: Whether they accept Common App (boolean)

HTML Content:
{{html}}

Return ONLY valid JSON with these keys. No markdown.`,
    outputSchema: {
      type: 'object',
      properties: {
        acceptanceRate: { type: 'number' },
        applicationDeadline: { type: 'string' },
        earlyDecisionDeadline: { type: 'string' },
        satRange: { type: 'string' },
        actRange: { type: 'string' },
        avgGpa: { type: 'number' },
        applicationFee: { type: 'number' },
        commonAppAccepted: { type: 'boolean' },
      },
      required: ['acceptanceRate']
    },
    fields: ['acceptanceRate', 'applicationDeadline', 'satRange', 'actRange', 'avgGpa'],
  },
  {
    name: 'US News Academic Info',
    section: 'academics',
    sourceType: 'us_news',
    promptTemplate: `Extract the following academic data from this US News college profile HTML:
- studentFacultyRatio: e.g., "12:1"
- classSizeUnder20: Percentage of classes with fewer than 20 students (float)
- retentionRate: Percentage of freshmen who return (float)
- graduationRate4Year: 4-year graduation rate (float)
- popularMajors: Array of the most popular majors (string array)
- studyAbroadProgram: Whether they have study abroad (boolean)

HTML Content:
{{html}}

Return ONLY valid JSON.`,
    outputSchema: {
      type: 'object',
      properties: {
        studentFacultyRatio: { type: 'string' },
        classSizeUnder20: { type: 'number' },
        retentionRate: { type: 'number' },
        graduationRate4Year: { type: 'number' },
        popularMajors: { type: 'array', items: { type: 'string' } },
        studyAbroadProgram: { type: 'boolean' },
      }
    },
    fields: ['studentFacultyRatio', 'retentionRate', 'graduationRate4Year', 'popularMajors'],
  },
  {
    name: 'US News Financial Data',
    section: 'finance',
    sourceType: 'us_news',
    promptTemplate: `Extract the following financial information from this US News college profile HTML:
- tuitionAndFees: Total tuition and fees (number)
- roomAndBoard: Cost for housing and meals (number)
- avgNeedBasedAid: Average need-based scholarship or grant (number)
- pctStudentsWithAid: Percentage of students receiving financial aid (float)
- totalEndowment: Total institutional endowment (string, e.g., "$1.2 Billion")

HTML Content:
{{html}}

Return ONLY valid JSON.`,
    outputSchema: {
      type: 'object',
      properties: {
        tuitionAndFees: { type: 'number' },
        roomAndBoard: { type: 'number' },
        avgNeedBasedAid: { type: 'number' },
        pctStudentsWithAid: { type: 'number' },
        totalEndowment: { type: 'string' },
      }
    },
    fields: ['tuitionAndFees', 'roomAndBoard', 'avgNeedBasedAid', 'totalEndowment'],
  }
];

export async function seedTemplates() {
  console.log('Seeding extraction templates (DataSourcePrompt)...');
  
  // 1. Ensure US News ranking source exists (Self-Sufficient Seed)
  const usNews = await prisma.datasource.upsert({
    where: { name: 'us_news' },
    update: { displayName: 'US News' },
    create: { 
      id: 'us-news',
      name: 'us_news', 
      displayName: 'US News', 
      baseUrl: 'https://www.usnews.com/best-colleges', 
      isActive: true 
    }
  });

  const promptModel = prisma.dataSourcePrompt;

  for (const template of templates) {
    await promptModel.upsert({
      where: {
        dataSourceId_version: {
          dataSourceId: usNews.id,
          version: 1,
        },
      },
      update: {
        promptText: template.promptTemplate,
        isActive: true
      },
      create: {
        dataSourceId: usNews.id,
        promptText: template.promptTemplate,
        version: 1,
        isActive: true
      },
    });
  }
  console.log('Extraction templates seeded ✓');
}

if (require.main === module) {
  seedTemplates()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
