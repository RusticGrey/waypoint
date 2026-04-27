import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

export async function seedIntelligence(pOverride?: PrismaClient) {
  const p = pOverride || prisma;
  console.log('🧠 Seeding College Intelligence Data (Deltas)...');
  
  const seedsDir = path.join(__dirname, 'seeds');
  if (!fs.existsSync(seedsDir)) {
    console.warn(`⚠️ No seeds directory found at ${seedsDir}.`);
    return;
  }

  // Find all delta files and sort them by timestamp
  const files = fs.readdirSync(seedsDir)
    .filter(f => f.startsWith('intelligence-delta-') && f.endsWith('.json'))
    .sort((a, b) => {
      const tsA = parseInt(a.split('-')[2]);
      const tsB = parseInt(b.split('-')[2]);
      return tsA - tsB;
    });

  if (files.length === 0) {
    console.log('✨ No delta files found. Skipping intelligence seed.');
    return;
  }

  console.log(`📂 Found ${files.length} delta file(s). Processing...`);

  for (const file of files) {
    console.log(`📄 Applying delta: ${file}`);
    const data = JSON.parse(fs.readFileSync(path.join(seedsDir, file), 'utf8'));

    // 1. Seed Colleges (Upsert ensures new colleges are created)
    for (const college of data.colleges) {
      await p.college.upsert({
        where: { id: college.id },
        update: {
          aliases: college.aliases,
          country: college.country,
          name: college.name
        },
        create: {
          id: college.id,
          name: college.name,
          aliases: college.aliases,
          country: college.country,
          isActive: true
        }
      });
    }

    // 2. Seed Knowledge Glossary
    for (const term of data.glossary) {
      const glossaryModel = (p as any).knowledgeGlossary || (p as any).KnowledgeGlossary;
      if (!glossaryModel) continue;

      await glossaryModel.upsert({
        where: { term: term.term },
        update: {
          expansion: term.expansion,
          category: term.category,
          context: term.context
        },
        create: {
          term: term.term,
          expansion: term.expansion,
          category: term.category,
          context: term.context
        }
      });
    }

    // 3. Seed Ranking Sources
    for (const source of data.sources) {
      await p.rankingSource.upsert({
        where: { name: source.name },
        update: {
          displayName: source.displayName,
          baseUrl: source.baseUrl,
          isActive: source.isActive
        },
        create: {
          id: source.id,
          name: source.name,
          displayName: source.displayName,
          baseUrl: source.baseUrl,
          isActive: source.isActive
        }
      });
    }

    // 4. Seed Verified Ranking Data
    for (const ranking of data.rankingData) {
      await p.collegeRankingData.upsert({
        where: {
          collegeId_rankingSourceId_academicYear: {
            collegeId: ranking.collegeId,
            rankingSourceId: ranking.rankingSourceId,
            academicYear: ranking.academicYear
          }
        },
        update: {
          acceptance_rate: ranking.acceptance_rate,
          rankings: ranking.rankings,
          cost_of_attendance: ranking.cost_of_attendance,
          admissions_data: ranking.admissions_data,
          fieldsPresent: ranking.fieldsPresent,
          extractionMethod: ranking.extractionMethod,
          llmModelUsed: ranking.llmModelUsed,
          approvedAt: ranking.approvedAt || new Date()
        },
        create: {
          id: ranking.id,
          collegeId: ranking.collegeId,
          rankingSourceId: ranking.rankingSourceId,
          academicYear: ranking.academicYear,
          acceptance_rate: ranking.acceptance_rate,
          rankings: ranking.rankings,
          cost_of_attendance: ranking.cost_of_attendance,
          admissions_data: ranking.admissions_data,
          fieldsPresent: ranking.fieldsPresent,
          extractionMethod: ranking.extractionMethod,
          llmModelUsed: ranking.llmModelUsed,
          approvedAt: ranking.approvedAt || new Date()
        }
      });
    }
  }

  console.log('✅ College Intelligence deltas applied successfully!');
}

async function main() {
  await seedIntelligence();
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
