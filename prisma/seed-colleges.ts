import "dotenv/config";
import { config } from "dotenv";
// config({ path: ".env.local", override: true });

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const TOP_COLLEGES = [
  // Ivy League
  { name: "Harvard University", acceptanceRate: 0.033, avgGpa: 4.18, avgSat: 1520, avgAct: 34, rankingUsNews: 3, country: "United States" },
  { name: "Princeton University", acceptanceRate: 0.039, avgGpa: 3.95, avgSat: 1515, avgAct: 34, rankingUsNews: 1, country: "United States" },
  { name: "Yale University", acceptanceRate: 0.045, avgGpa: 4.14, avgSat: 1515, avgAct: 34, rankingUsNews: 5, country: "United States" },
  { name: "Columbia University", acceptanceRate: 0.038, avgGpa: 4.15, avgSat: 1520, avgAct: 34, rankingUsNews: 12, country: "United States" },
  { name: "University of Pennsylvania", acceptanceRate: 0.063, avgGpa: 3.90, avgSat: 1500, avgAct: 34, rankingUsNews: 6, country: "United States" },
  { name: "Brown University", acceptanceRate: 0.052, avgGpa: 4.08, avgSat: 1505, avgAct: 34, rankingUsNews: 9, country: "United States" },
  { name: "Dartmouth College", acceptanceRate: 0.063, avgGpa: 4.11, avgSat: 1500, avgAct: 34, rankingUsNews: 12, country: "United States" },
  { name: "Cornell University", acceptanceRate: 0.087, avgGpa: 4.07, avgSat: 1480, avgAct: 33, rankingUsNews: 12, country: "United States" },
  
  // Top Tech
  { name: "Massachusetts Institute of Technology", acceptanceRate: 0.033, avgGpa: 4.17, avgSat: 1540, avgAct: 35, rankingUsNews: 2, country: "United States" },
  { name: "Stanford University", acceptanceRate: 0.035, avgGpa: 3.96, avgSat: 1520, avgAct: 34, rankingUsNews: 3, country: "United States" },
  { name: "California Institute of Technology", acceptanceRate: 0.034, avgGpa: 4.19, avgSat: 1560, avgAct: 35, rankingUsNews: 7, country: "United States" },
  
  // Top Public
  { name: "University of California, Berkeley", acceptanceRate: 0.112, avgGpa: 3.90, avgSat: 1430, avgAct: 33, rankingUsNews: 20, country: "United States" },
  { name: "University of California, Los Angeles", acceptanceRate: 0.089, avgGpa: 3.93, avgSat: 1435, avgAct: 32, rankingUsNews: 20, country: "United States" },
  { name: "University of Michigan", acceptanceRate: 0.176, avgGpa: 3.90, avgSat: 1435, avgAct: 33, rankingUsNews: 21, country: "United States" },
  { name: "University of Virginia", acceptanceRate: 0.191, avgGpa: 4.32, avgSat: 1442, avgAct: 33, rankingUsNews: 24, country: "United States" },
  { name: "University of North Carolina at Chapel Hill", acceptanceRate: 0.168, avgGpa: 4.70, avgSat: 1410, avgAct: 31, rankingUsNews: 29, country: "United States" },
  
  // Other Top Universities
  { name: "Duke University", acceptanceRate: 0.056, avgGpa: 4.13, avgSat: 1530, avgAct: 34, rankingUsNews: 7, country: "United States" },
  { name: "Northwestern University", acceptanceRate: 0.070, avgGpa: 4.10, avgSat: 1510, avgAct: 34, rankingUsNews: 9, country: "United States" },
  { name: "Johns Hopkins University", acceptanceRate: 0.076, avgGpa: 3.93, avgSat: 1520, avgAct: 34, rankingUsNews: 9, country: "United States" },
  { name: "University of Chicago", acceptanceRate: 0.053, avgGpa: 4.48, avgSat: 1535, avgAct: 34, rankingUsNews: 6, country: "United States" },
  { name: "Vanderbilt University", acceptanceRate: 0.063, avgGpa: 3.91, avgSat: 1515, avgAct: 34, rankingUsNews: 18, country: "United States" },
  { name: "Rice University", acceptanceRate: 0.085, avgGpa: 3.96, avgSat: 1520, avgAct: 34, rankingUsNews: 15, country: "United States" },
  { name: "Carnegie Mellon University", acceptanceRate: 0.113, avgGpa: 3.90, avgSat: 1510, avgAct: 34, rankingUsNews: 24, country: "United States" },
  { name: "Emory University", acceptanceRate: 0.113, avgGpa: 3.90, avgSat: 1470, avgAct: 33, rankingUsNews: 24, country: "United States" },
  { name: "Georgetown University", acceptanceRate: 0.120, avgGpa: 4.01, avgSat: 1480, avgAct: 33, rankingUsNews: 22, country: "United States" },
  { name: "University of Southern California", acceptanceRate: 0.093, avgGpa: 3.88, avgSat: 1470, avgAct: 33, rankingUsNews: 28, country: "United States" },
  
  // Top Liberal Arts
  { name: "Williams College", acceptanceRate: 0.085, avgGpa: 3.95, avgSat: 1490, avgAct: 33, rankingUsNews: 1, country: "United States" },
  { name: "Amherst College", acceptanceRate: 0.075, avgGpa: 3.96, avgSat: 1495, avgAct: 33, rankingUsNews: 2, country: "United States" },
  { name: "Swarthmore College", acceptanceRate: 0.067, avgGpa: 4.05, avgSat: 1485, avgAct: 33, rankingUsNews: 4, country: "United States" },
  { name: "Pomona College", acceptanceRate: 0.067, avgGpa: 3.95, avgSat: 1490, avgAct: 33, rankingUsNews: 3, country: "United States" },
  
  // International - United Kingdom
  { name: "University of Oxford", acceptanceRate: 0.138, avgGpa: null, avgSat: null, avgAct: null, rankingUsNews: null, country: "United Kingdom" },
  { name: "University of Cambridge", acceptanceRate: 0.166, avgGpa: null, avgSat: null, avgAct: null, rankingUsNews: null, country: "United Kingdom" },
  { name: "University of London", acceptanceRate: 0.225, avgGpa: null, avgSat: null, avgAct: null, rankingUsNews: null, country: "United Kingdom" },
  { name: "Imperial College London", acceptanceRate: 0.142, avgGpa: null, avgSat: null, avgAct: null, rankingUsNews: null, country: "United Kingdom" },
  { name: "University College London (UCL)", acceptanceRate: 0.175, avgGpa: null, avgSat: null, avgAct: null, rankingUsNews: null, country: "United Kingdom" },
  { name: "London School of Economics and Political Science (LSE)", acceptanceRate: 0.106, avgGpa: null, avgSat: null, avgAct: null, rankingUsNews: null, country: "United Kingdom" },
  { name: "University of Manchester", acceptanceRate: 0.242, avgGpa: null, avgSat: null, avgAct: null, rankingUsNews: null, country: "United Kingdom" },
  { name: "University of Edinburgh", acceptanceRate: 0.266, avgGpa: null, avgSat: null, avgAct: null, rankingUsNews: null, country: "United Kingdom" },
  
  // International - Germany
  { name: "Heidelberg University", acceptanceRate: 0.236, avgGpa: null, avgSat: null, avgAct: null, rankingUsNews: null, country: "Germany" },
  { name: "Ludwig Maximilians University Munich", acceptanceRate: 0.237, avgGpa: null, avgSat: null, avgAct: null, rankingUsNews: null, country: "Germany" },
  { name: "Technical University of Munich (TUM)", acceptanceRate: 0.166, avgGpa: null, avgSat: null, avgAct: null, rankingUsNews: null, country: "Germany" },
  { name: "University of Berlin", acceptanceRate: 0.271, avgGpa: null, avgSat: null, avgAct: null, rankingUsNews: null, country: "Germany" },
  { name: "University of Bonn", acceptanceRate: 0.255, avgGpa: null, avgSat: null, avgAct: null, rankingUsNews: null, country: "Germany" },
  
  // International - Netherlands
  { name: "University of Amsterdam", acceptanceRate: 0.211, avgGpa: null, avgSat: null, avgAct: null, rankingUsNews: null, country: "Netherlands" },
  { name: "University of Utrecht", acceptanceRate: 0.195, avgGpa: null, avgSat: null, avgAct: null, rankingUsNews: null, country: "Netherlands" },
  { name: "Leiden University", acceptanceRate: 0.182, avgGpa: null, avgSat: null, avgAct: null, rankingUsNews: null, country: "Netherlands" },
  { name: "Erasmus University Rotterdam", acceptanceRate: 0.214, avgGpa: null, avgSat: null, avgAct: null, rankingUsNews: null, country: "Netherlands" },
  { name: "University of Groningen", acceptanceRate: 0.226, avgGpa: null, avgSat: null, avgAct: null, rankingUsNews: null, country: "Netherlands" },
  
  // International - Australia
  { name: "University of Melbourne", acceptanceRate: 0.322, avgGpa: null, avgSat: null, avgAct: null, rankingUsNews: null, country: "Australia" },
  { name: "Australian National University (ANU)", acceptanceRate: 0.341, avgGpa: null, avgSat: null, avgAct: null, rankingUsNews: null, country: "Australia" },
  { name: "University of Sydney", acceptanceRate: 0.386, avgGpa: null, avgSat: null, avgAct: null, rankingUsNews: null, country: "Australia" },
  { name: "University of New South Wales (UNSW)", acceptanceRate: 0.453, avgGpa: null, avgSat: null, avgAct: null, rankingUsNews: null, country: "Australia" },
  { name: "University of Queensland", acceptanceRate: 0.516, avgGpa: null, avgSat: null, avgAct: null, rankingUsNews: null, country: "Australia" },
  { name: "Monash University", acceptanceRate: 0.676, avgGpa: null, avgSat: null, avgAct: null, rankingUsNews: null, country: "Australia" },
  
  // International - Canada
  { name: "University of Toronto", acceptanceRate: 0.156, avgGpa: null, avgSat: null, avgAct: null, rankingUsNews: null, country: "Canada" },
  { name: "McGill University", acceptanceRate: 0.211, avgGpa: null, avgSat: null, avgAct: null, rankingUsNews: null, country: "Canada" },
  { name: "University of British Columbia (UBC)", acceptanceRate: 0.336, avgGpa: null, avgSat: null, avgAct: null, rankingUsNews: null, country: "Canada" },
  { name: "McMaster University", acceptanceRate: 0.355, avgGpa: null, avgSat: null, avgAct: null, rankingUsNews: null, country: "Canada" },
  { name: "University of Alberta", acceptanceRate: 0.476, avgGpa: null, avgSat: null, avgAct: null, rankingUsNews: null, country: "Canada" },
  { name: "Simon Fraser University", acceptanceRate: 0.531, avgGpa: null, avgSat: null, avgAct: null, rankingUsNews: null, country: "Canada" },
  
  // International - Singapore
  { name: "National University of Singapore (NUS)", acceptanceRate: 0.054, avgGpa: null, avgSat: null, avgAct: null, rankingUsNews: null, country: "Singapore" },
  { name: "Nanyang Technological University (NTU)", acceptanceRate: 0.083, avgGpa: null, avgSat: null, avgAct: null, rankingUsNews: null, country: "Singapore" },
  { name: "Singapore Management University (SMU)", acceptanceRate: 0.156, avgGpa: null, avgSat: null, avgAct: null, rankingUsNews: null, country: "Singapore" },
];

async function main() {
  console.log('🌱 Seeding colleges...');
  
  for (const college of TOP_COLLEGES) {
    // Generate a simple ID from the name if your model doesn't auto-generate it
    const collegeId = college.name.toLowerCase().replace(/\s+/g, '-');
    
    await prisma.college.upsert({
      where: { id: collegeId },
      update: college,
      create: {
        id: collegeId,
        ...college,
      },
    });
  }
  
  console.log(`✓ Synchronized ${TOP_COLLEGES.length} colleges`);
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
