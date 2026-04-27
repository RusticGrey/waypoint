import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedGenericTemplate() {
  console.log('🌱 Seeding Generic Extraction Template...');

  const genericPrompt = `
    Extract all structured facts from this college document. 
    Return a clean JSON object containing any relevant metrics found.
    
    Look for and extract information including but not limited to:
    - Rankings (National, Regional, Subject-specific)
    - Admissions stats (Acceptance rate, SAT/ACT ranges, GPA averages, deadlines)
    - Academic info (Student-faculty ratio, popular majors, graduation rates)
    - Financial data (Tuition, fees, room and board, average financial aid package, percentage receiving aid)
    - Campus life (Total enrollment, diversity stats, housing availability)
    - Any other specific institutional facts mentioned.

    Guidelines:
    - ALWAYS include a "collegeName" field if identified.
    - Use clear, descriptive keys in camelCase.
    - If a section or field is missing, simply omit it from the JSON.
    - Return ONLY valid JSON. No preamble, no markdown formatting.
    
    Example Output Format:
    {
      "collegeName": "Example University",
      "acceptanceRate": "15%",
      "tuition": "$55,000",
      "ranking": "Top 10"
    }
  `;

  await (prisma as any).extractionTemplate.upsert({
    where: { 
      section_sourceType_version: {
        section: 'generic',
        sourceType: 'all',
        version: 1
      }
    },
    update: {
      promptTemplate: genericPrompt,
      isActive: true
    },
    create: {
      name: 'Generic Fact Extractor',
      section: 'generic',
      sourceType: 'all',
      version: 1,
      promptTemplate: genericPrompt,
      outputSchema: {},
      isActive: true
    }
  });

  console.log('✅ Generic Extraction Template seeded.');
}
