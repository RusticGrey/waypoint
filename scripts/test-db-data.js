const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
  const data = await prisma.collegeRankingData.findMany({
    where: { 
      collegeId: { in: ['massachusetts-institute-of-technology', 'carnegie-mellon-university'] }
    }
  });

  console.log("Total records for MIT/CMU:", data.length);
  const approved = data.filter(d => d.approvedAt !== null);
  console.log("Approved records:", approved.length);
  
  if (approved.length > 0) {
      console.log("Sample Rankings JSON keys:", Object.keys(approved[0].rankings || {}));
      console.log("Sample Subject Rankings:", JSON.stringify(approved[0].rankings?.rankings_comprehensive?.subject_and_specialty_rankings));
  } else if (data.length > 0) {
      console.log("Data exists but not approved. Sample Subject Rankings:", JSON.stringify(data[0].rankings?.rankings_comprehensive?.subject_and_specialty_rankings));
  }
}

test().finally(() => prisma.$disconnect());
