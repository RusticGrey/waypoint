const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Starting Incremental Intelligence Export...');

  const statePath = path.join(__dirname, '.sync-state.json');
  let lastExport = 0;
  if (fs.existsSync(statePath)) {
    lastExport = JSON.parse(fs.readFileSync(statePath, 'utf8')).lastExportTimestamp;
  }
  
  const lastDate = new Date(lastExport);
  console.log(`📅 Looking for changes since: ${lastDate.toISOString()}`);

  // 1. Fetch NEW Glossary terms
  const glossary = await prisma.knowledgeGlossary.findMany({
    where: { updatedAt: { gt: lastDate } }
  });

  // 2. Fetch ALL Ranking Sources (usually small, keep synced)
  const sources = await prisma.rankingSource.findMany();

  // 3. Fetch NEWLY Approved Ranking Data
  const rankingData = await prisma.collegeRankingData.findMany({
    where: { 
      approvedAt: { not: null, gt: lastDate }
    },
  });

  // 4. Fetch specific colleges affected by this delta
  const collegeIds = [...new Set(rankingData.map(r => r.collegeId))];
  const colleges = await prisma.college.findMany({
    where: { 
      OR: [
        { id: { in: collegeIds } },
        { updatedAt: { gt: lastDate } }
      ]
    },
    select: { id: true, name: true, aliases: true, country: true }
  });

  if (glossary.length === 0 && rankingData.length === 0 && colleges.length === 0) {
    console.log('✨ No new intelligence data to export.');
    return;
  }

  const payload = {
    timestamp: Date.now(),
    glossary,
    sources,
    rankingData,
    colleges
  };

  const filename = `intelligence-delta-${Date.now()}.json`;
  const outputPath = path.join(__dirname, '../prisma/seeds', filename);
  fs.writeFileSync(outputPath, JSON.stringify(payload, null, 2));

  // Update state
  fs.writeFileSync(statePath, JSON.stringify({ lastExportTimestamp: Date.now() }, null, 2));

  console.log(`✅ Successfully generated delta file: ${filename}`);
  console.log(`   - New Glossary terms: ${glossary.length}`);
  console.log(`   - Updated Colleges: ${colleges.length}`);
  console.log(`   - New Verified Data: ${rankingData.length}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
