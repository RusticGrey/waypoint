const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
  const data = await prisma.collegeRankingData.findMany({
    where: { 
      collegeId: 'duke-university'
    }
  });

  if (data.length > 0) {
      console.log("Duke Rankings JSON keys:", Object.keys(data[0].rankings || {}));
      console.log("Duke Admissions Engine:", JSON.stringify(data[0].rankings?.admissions_engine, null, 2));
      console.log("Duke Supplementary Insights:", JSON.stringify(data[0].rankings?.supplementary_admissions_insights, null, 2));
  } else {
      console.log("Duke not found");
  }
}

test().finally(() => prisma.$disconnect());
