const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
  let allColleges = [];
  try {
    allColleges = await prisma.$queryRaw`SELECT id, name, aliases FROM "College"`;
    console.log("Raw SQL success, colleges count:", allColleges.length);
    const uchicago = allColleges.find(c => c.id === 'university-of-chicago');
    console.log("UChicago raw record:", uchicago);
  } catch (e) {
    console.error("Raw SQL failed:", e);
  }

  const inputName = "uchicago";
  const inputLower = inputName.toLowerCase().trim();
  const match = allColleges.find(c => {
    let aliases = [];
    if (Array.isArray(c.aliases)) aliases = c.aliases;
    else if (typeof c.aliases === 'string') {
      aliases = c.aliases.replace(/[{}]/g, '').split(',').map(s => s.trim().replace(/^"|"$/g, ''));
    }
    
    return c.name.toLowerCase() === inputLower || 
           aliases.some(a => a.toLowerCase() === inputLower) ||
           c.name.toLowerCase().includes(inputLower);
  });

  console.log("Match result:", match ? match.name : "NOT FOUND");
}

test().finally(() => prisma.$disconnect());
