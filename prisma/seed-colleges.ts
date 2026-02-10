import "dotenv/config";
import { config } from "dotenv";
config({ path: ".env.local", override: true });

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const TOP_COLLEGES = [
  // Ivy League
  { name: "Harvard University", acceptance_rate: 0.033, avg_gpa: 4.18, avg_sat: 1520, avg_act: 34, ranking_us_news: 3, country: "United States" },
  { name: "Princeton University", acceptance_rate: 0.039, avg_gpa: 3.95, avg_sat: 1515, avg_act: 34, ranking_us_news: 1, country: "United States" },
  { name: "Yale University", acceptance_rate: 0.045, avg_gpa: 4.14, avg_sat: 1515, avg_act: 34, ranking_us_news: 5, country: "United States" },
  { name: "Columbia University", acceptance_rate: 0.038, avg_gpa: 4.15, avg_sat: 1520, avg_act: 34, ranking_us_news: 12, country: "United States" },
  { name: "University of Pennsylvania", acceptance_rate: 0.063, avg_gpa: 3.90, avg_sat: 1500, avg_act: 34, ranking_us_news: 6, country: "United States" },
  { name: "Brown University", acceptance_rate: 0.052, avg_gpa: 4.08, avg_sat: 1505, avg_act: 34, ranking_us_news: 9, country: "United States" },
  { name: "Dartmouth College", acceptance_rate: 0.063, avg_gpa: 4.11, avg_sat: 1500, avg_act: 34, ranking_us_news: 12, country: "United States" },
  { name: "Cornell University", acceptance_rate: 0.087, avg_gpa: 4.07, avg_sat: 1480, avg_act: 33, ranking_us_news: 12, country: "United States" },
  
  // Top Tech
  { name: "Massachusetts Institute of Technology", acceptance_rate: 0.033, avg_gpa: 4.17, avg_sat: 1540, avg_act: 35, ranking_us_news: 2, country: "United States" },
  { name: "Stanford University", acceptance_rate: 0.035, avg_gpa: 3.96, avg_sat: 1520, avg_act: 34, ranking_us_news: 3, country: "United States" },
  { name: "California Institute of Technology", acceptance_rate: 0.034, avg_gpa: 4.19, avg_sat: 1560, avg_act: 35, ranking_us_news: 7, country: "United States" },
  
  // Top Public
  { name: "University of California, Berkeley", acceptance_rate: 0.112, avg_gpa: 3.90, avg_sat: 1430, avg_act: 33, ranking_us_news: 20, country: "United States" },
  { name: "University of California, Los Angeles", acceptance_rate: 0.089, avg_gpa: 3.93, avg_sat: 1435, avg_act: 32, ranking_us_news: 20, country: "United States" },
  { name: "University of Michigan", acceptance_rate: 0.176, avg_gpa: 3.90, avg_sat: 1435, avg_act: 33, ranking_us_news: 21, country: "United States" },
  { name: "University of Virginia", acceptance_rate: 0.191, avg_gpa: 4.32, avg_sat: 1442, avg_act: 33, ranking_us_news: 24, country: "United States" },
  { name: "University of North Carolina at Chapel Hill", acceptance_rate: 0.168, avg_gpa: 4.70, avg_sat: 1410, avg_act: 31, ranking_us_news: 29, country: "United States" },
  
  // Other Top Universities
  { name: "Duke University", acceptance_rate: 0.056, avg_gpa: 4.13, avg_sat: 1530, avg_act: 34, ranking_us_news: 7, country: "United States" },
  { name: "Northwestern University", acceptance_rate: 0.070, avg_gpa: 4.10, avg_sat: 1510, avg_act: 34, ranking_us_news: 9, country: "United States" },
  { name: "Johns Hopkins University", acceptance_rate: 0.076, avg_gpa: 3.93, avg_sat: 1520, avg_act: 34, ranking_us_news: 9, country: "United States" },
  { name: "University of Chicago", acceptance_rate: 0.053, avg_gpa: 4.48, avg_sat: 1535, avg_act: 34, ranking_us_news: 6, country: "United States" },
  { name: "Vanderbilt University", acceptance_rate: 0.063, avg_gpa: 3.91, avg_sat: 1515, avg_act: 34, ranking_us_news: 18, country: "United States" },
  { name: "Rice University", acceptance_rate: 0.085, avg_gpa: 3.96, avg_sat: 1520, avg_act: 34, ranking_us_news: 15, country: "United States" },
  { name: "Carnegie Mellon University", acceptance_rate: 0.113, avg_gpa: 3.90, avg_sat: 1510, avg_act: 34, ranking_us_news: 24, country: "United States" },
  { name: "Emory University", acceptance_rate: 0.113, avg_gpa: 3.90, avg_sat: 1470, avg_act: 33, ranking_us_news: 24, country: "United States" },
  { name: "Georgetown University", acceptance_rate: 0.120, avg_gpa: 4.01, avg_sat: 1480, avg_act: 33, ranking_us_news: 22, country: "United States" },
  { name: "University of Southern California", acceptance_rate: 0.093, avg_gpa: 3.88, avg_sat: 1470, avg_act: 33, ranking_us_news: 28, country: "United States" },
  
  // Top Liberal Arts
  { name: "Williams College", acceptance_rate: 0.085, avg_gpa: 3.95, avg_sat: 1490, avg_act: 33, ranking_us_news: 1, country: "United States" },
  { name: "Amherst College", acceptance_rate: 0.075, avg_gpa: 3.96, avg_sat: 1495, avg_act: 33, ranking_us_news: 2, country: "United States" },
  { name: "Swarthmore College", acceptance_rate: 0.067, avg_gpa: 4.05, avg_sat: 1485, avg_act: 33, ranking_us_news: 4, country: "United States" },
  { name: "Pomona College", acceptance_rate: 0.067, avg_gpa: 3.95, avg_sat: 1490, avg_act: 33, ranking_us_news: 3, country: "United States" },
  
  // International
  { name: "University of Oxford", acceptance_rate: 0.138, avg_gpa: null, avg_sat: null, avg_act: null, ranking_us_news: null, country: "United Kingdom" },
  { name: "University of Cambridge", acceptance_rate: 0.166, avg_gpa: null, avg_sat: null, avg_act: null, ranking_us_news: null, country: "United Kingdom" },
];

async function main() {
  console.log('Seeding colleges...');
  
  // Delete existing colleges first
  await prisma.college.deleteMany({});
  
  // Create all colleges
  for (const college of TOP_COLLEGES) {
    await prisma.college.create({
      data: college,
    });
  }
  
  console.log(`✓ Seeded ${TOP_COLLEGES.length} colleges`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
