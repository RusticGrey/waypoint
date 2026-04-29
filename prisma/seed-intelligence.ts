import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

export async function seedIntelligence(pOverride?: PrismaClient) {
  const p = pOverride || prisma;
  console.log('🧠 Seeding College Intelligence Data (Deltas)...');
  
  // Vercel-friendly absolute path resolution
  const seedsDir = path.resolve(process.cwd(), 'prisma', 'seeds');
  console.log(`📂 Checking for deltas in: ${seedsDir}`);

  if (!fs.existsSync(seedsDir)) {
    console.warn(`⚠️ Seeds directory not found at ${seedsDir}. Creating it...`);
    fs.mkdirSync(seedsDir, { recursive: true });
    return;
  }

  // Find all intelligence files (Handle both legacy base file and new versioned deltas)
  const files = fs.readdirSync(seedsDir)
    .filter(f => (f.startsWith('intelligence-delta-') || f === 'intelligence-data.json') && f.endsWith('.json'))
    .sort((a, b) => {
      if (a === 'intelligence-data.json') return -1;
      if (b === 'intelligence-data.json') return 1;
      const tsA = parseInt(a.split('-')[2]);
      const tsB = parseInt(b.split('-')[2]);
      return tsA - tsB;
    });

  if (files.length === 0) {
    console.log('✨ No intelligence data files found. Skipping seed.');
    return;
  }

  console.log(`📂 Found ${files.length} intelligence file(s). Processing...`);

  for (const file of files) {
    console.log(`📄 Applying delta: ${file}`);
    const data = JSON.parse(fs.readFileSync(path.join(seedsDir, file), 'utf8'));

    // 1. Seed Colleges (UPSERT BY NAME to prevent ID conflicts between environments)
    for (const college of data.colleges) {
      // Robust mapping of optional fields that might not exist in target DB yet
      const updateData: any = {
        country: college.country,
      };
      
      const createData: any = {
        // If the college is brand new, use the name as ID to keep it human-readable and consistent
        id: college.id || college.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        name: college.name,
        country: college.country,
        isActive: true
      };

      // Handle schema resilience: Only set shortName if the client model supports it
      // Use try-catch for runtime safety on production environments with older schema
      try {
        (updateData as any).shortName = college.shortName || college.aliases?.[0];
        (createData as any).shortName = college.shortName || college.aliases?.[0];
      } catch (e) {
        console.warn(`⚠️ skipping shortName for ${college.name} - column might not exist yet.`);
      }

      await (p as any).college.upsert({
        where: { name: college.name },
        update: updateData,
        create: createData
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

    // 3. Seed Data Sources
    for (const source of data.sources) {
      await (p as any).dataSource.upsert({
        where: { name: source.name },
        update: {
          displayName: source.displayName,
          baseUrl: source.baseUrl,
          isActive: source.isActive
        },
        create: {
          id: source.id.includes('-') ? source.id : source.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
          name: source.name,
          displayName: source.displayName,
          baseUrl: source.baseUrl,
          isActive: source.isActive
        }
      });
    }

    // 4. Seed Verified Insights (RESOLVE LOCAL IDs)
    for (const ranking of data.rankingData) {
      // NATURAL KEY RESOLUTION: Map name to local environment ID
      let localCollegeId = ranking.collegeId;
      if (ranking.collegeName) {
        const localCol = await (p as any).college.findUnique({ where: { name: ranking.collegeName } });
        if (localCol) localCollegeId = localCol.id;
      }

      // SOURCE RESOLUTION: Map source name to local environment ID
      let localSourceId = ranking.rankingSourceId;
      const sourceInfo = data.sources.find((s: any) => s.id === ranking.rankingSourceId);
      if (sourceInfo) {
        const localSource = await (p as any).dataSource.findUnique({ where: { name: sourceInfo.name } });
        if (localSource) localSourceId = localSource.id;
      }

      if (!localCollegeId || !localSourceId) {
        console.warn(`⚠️ Skipping insight for ${ranking.collegeName || localCollegeId} - could not resolve IDs.`);
        continue;
      }

      await (p as any).collegeInsight.upsert({
        where: {
          collegeId_dataSourceId_academicYear: {
            collegeId: localCollegeId,
            dataSourceId: localSourceId,
            academicYear: ranking.academicYear
          }
        },
        update: {
          data: {
            rankings: ranking.rankings,
            cost_of_attendance: ranking.cost_of_attendance,
            admissions_data: ranking.admissions_data,
            acceptance_rate: ranking.acceptance_rate,
            // Include anything else present in ranking.data if it exists (for schema flexibility)
            ...(ranking.data || {})
          },
          status: 'approved',
          extractionMethod: ranking.extractionMethod || 'LLM',
          llmModelUsed: ranking.llmModelUsed,
          approvedAt: ranking.approvedAt || new Date()
        },
        create: {
          // Do NOT force ranking.id to prevent P2002 unique constraint errors on Vercel/Prod
          collegeId: localCollegeId,
          dataSourceId: localSourceId,
          academicYear: ranking.academicYear,
          data: {
            rankings: ranking.rankings,
            cost_of_attendance: ranking.cost_of_attendance,
            admissions_data: ranking.admissions_data,
            acceptance_rate: ranking.acceptance_rate,
            ...(ranking.data || {})
          },
          status: 'approved',
          extractionMethod: ranking.extractionMethod || 'LLM',
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
