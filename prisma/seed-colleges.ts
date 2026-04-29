import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const TOP_COLLEGES = [
  {
    "name": "Yale University",
    "shortName": null,
    "acceptanceRate": 0.045,
    "avgGpa": 4.14,
    "avgSat": 1515,
    "avgAct": 34,
    "country": "United States"
  },
  {
    "name": "University of Groningen",
    "shortName": null,
    "acceptanceRate": 0.226,
    "avgGpa": null,
    "avgSat": null,
    "avgAct": null,
    "country": "Netherlands"
  },
  {
    "name": "University of Sydney",
    "shortName": null,
    "acceptanceRate": 0.386,
    "avgGpa": null,
    "avgSat": null,
    "avgAct": null,
    "country": "Australia"
  },
  {
    "name": "University of Michigan",
    "shortName": null,
    "acceptanceRate": 0.176,
    "avgGpa": 3.9,
    "avgSat": 1435,
    "avgAct": 33,
    "country": "United States"
  },
  {
    "name": "Rice University",
    "shortName": null,
    "acceptanceRate": 0.085,
    "avgGpa": 3.96,
    "avgSat": 1520,
    "avgAct": 34,
    "country": "United States"
  },
  {
    "name": "University of North Carolina at Chapel Hill",
    "shortName": null,
    "acceptanceRate": 0.168,
    "avgGpa": 4.7,
    "avgSat": 1410,
    "avgAct": 31,
    "country": "United States"
  },
  {
    "name": "Harvard University",
    "shortName": null,
    "acceptanceRate": 0.033,
    "avgGpa": 4.18,
    "avgSat": 1520,
    "avgAct": 34,
    "country": "United States"
  },
  {
    "name": "University College London (UCL)",
    "shortName": null,
    "acceptanceRate": 0.175,
    "avgGpa": null,
    "avgSat": null,
    "avgAct": null,
    "country": "United Kingdom"
  },
  {
    "name": "Carnegie Mellon University",
    "shortName": "CMU",
    "acceptanceRate": 0.113,
    "avgGpa": 3.9,
    "avgSat": 1510,
    "avgAct": 34,
    "country": "United States"
  },
  {
    "name": "University of Virginia",
    "shortName": null,
    "acceptanceRate": 0.191,
    "avgGpa": 4.32,
    "avgSat": 1442,
    "avgAct": 33,
    "country": "United States"
  },
  {
    "name": "University of Amsterdam",
    "shortName": null,
    "acceptanceRate": 0.211,
    "avgGpa": null,
    "avgSat": null,
    "avgAct": null,
    "country": "Netherlands"
  },
  {
    "name": "Northwestern University",
    "shortName": null,
    "acceptanceRate": 0.07,
    "avgGpa": 4.1,
    "avgSat": 1510,
    "avgAct": 34,
    "country": "United States"
  },
  {
    "name": "University of Utrecht",
    "shortName": null,
    "acceptanceRate": 0.195,
    "avgGpa": null,
    "avgSat": null,
    "avgAct": null,
    "country": "Netherlands"
  },
  {
    "name": "Imperial College London",
    "shortName": null,
    "acceptanceRate": 0.142,
    "avgGpa": null,
    "avgSat": null,
    "avgAct": null,
    "country": "United Kingdom"
  },
  {
    "name": "Cornell University",
    "shortName": null,
    "acceptanceRate": 0.087,
    "avgGpa": 4.07,
    "avgSat": 1480,
    "avgAct": 33,
    "country": "United States"
  },
  {
    "name": "Stanford University",
    "shortName": null,
    "acceptanceRate": 0.035,
    "avgGpa": 3.96,
    "avgSat": 1520,
    "avgAct": 34,
    "country": "United States"
  },
  {
    "name": "Heidelberg University",
    "shortName": null,
    "acceptanceRate": 0.236,
    "avgGpa": null,
    "avgSat": null,
    "avgAct": null,
    "country": "Germany"
  },
  {
    "name": "Princeton University",
    "shortName": null,
    "acceptanceRate": 0.039,
    "avgGpa": 3.95,
    "avgSat": 1515,
    "avgAct": 34,
    "country": "United States"
  },
  {
    "name": "London School of Economics and Political Science (LSE)",
    "shortName": null,
    "acceptanceRate": 0.106,
    "avgGpa": null,
    "avgSat": null,
    "avgAct": null,
    "country": "United Kingdom"
  },
  {
    "name": "Ludwig Maximilians University Munich",
    "shortName": null,
    "acceptanceRate": 0.237,
    "avgGpa": null,
    "avgSat": null,
    "avgAct": null,
    "country": "Germany"
  },
  {
    "name": "University of California, Berkeley",
    "shortName": null,
    "acceptanceRate": 0.112,
    "avgGpa": 3.9,
    "avgSat": 1430,
    "avgAct": 33,
    "country": "United States"
  },
  {
    "name": "Emory University",
    "shortName": null,
    "acceptanceRate": 0.113,
    "avgGpa": 3.9,
    "avgSat": 1470,
    "avgAct": 33,
    "country": "United States"
  },
  {
    "name": "Georgetown University",
    "shortName": null,
    "acceptanceRate": 0.12,
    "avgGpa": 4.01,
    "avgSat": 1480,
    "avgAct": 33,
    "country": "United States"
  },
  {
    "name": "University of Southern California",
    "shortName": null,
    "acceptanceRate": 0.093,
    "avgGpa": 3.88,
    "avgSat": 1470,
    "avgAct": 33,
    "country": "United States"
  },
  {
    "name": "Leiden University",
    "shortName": null,
    "acceptanceRate": 0.182,
    "avgGpa": null,
    "avgSat": null,
    "avgAct": null,
    "country": "Netherlands"
  },
  {
    "name": "University of Manchester",
    "shortName": null,
    "acceptanceRate": 0.242,
    "avgGpa": null,
    "avgSat": null,
    "avgAct": null,
    "country": "United Kingdom"
  },
  {
    "name": "Erasmus University Rotterdam",
    "shortName": null,
    "acceptanceRate": 0.214,
    "avgGpa": null,
    "avgSat": null,
    "avgAct": null,
    "country": "Netherlands"
  },
  {
    "name": "Dartmouth College",
    "shortName": null,
    "acceptanceRate": 0.063,
    "avgGpa": 4.11,
    "avgSat": 1500,
    "avgAct": 34,
    "country": "United States"
  },
  {
    "name": "University of California, Los Angeles",
    "shortName": null,
    "acceptanceRate": 0.089,
    "avgGpa": 3.93,
    "avgSat": 1435,
    "avgAct": 32,
    "country": "United States"
  },
  {
    "name": "Technical University of Munich (TUM)",
    "shortName": null,
    "acceptanceRate": 0.166,
    "avgGpa": null,
    "avgSat": null,
    "avgAct": null,
    "country": "Germany"
  },
  {
    "name": "Australian National University (ANU)",
    "shortName": null,
    "acceptanceRate": 0.341,
    "avgGpa": null,
    "avgSat": 1500,
    "avgAct": 34,
    "country": "Australia"
  },
  {
    "name": "University of Melbourne",
    "shortName": null,
    "acceptanceRate": 0.322,
    "avgGpa": null,
    "avgSat": null,
    "avgAct": null,
    "country": "Australia"
  },
  {
    "name": "University of New South Wales (UNSW)",
    "shortName": null,
    "acceptanceRate": 0.453,
    "avgGpa": null,
    "avgSat": null,
    "avgAct": null,
    "country": "Australia"
  },
  {
    "name": "Columbia University",
    "shortName": null,
    "acceptanceRate": 0.038,
    "avgGpa": 4.15,
    "avgSat": 1520,
    "avgAct": 34,
    "country": "United States"
  },
  {
    "name": "Williams College",
    "shortName": null,
    "acceptanceRate": 0.085,
    "avgGpa": 3.95,
    "avgSat": 1490,
    "avgAct": 33,
    "country": "United States"
  },
  {
    "name": "Amherst College",
    "shortName": null,
    "acceptanceRate": 0.075,
    "avgGpa": 3.96,
    "avgSat": 1495,
    "avgAct": 33,
    "country": "United States"
  },
  {
    "name": "Pomona College",
    "shortName": null,
    "acceptanceRate": 0.067,
    "avgGpa": 3.95,
    "avgSat": 1490,
    "avgAct": 33,
    "country": "United States"
  },
  {
    "name": "University of Oxford",
    "shortName": null,
    "acceptanceRate": 0.138,
    "avgGpa": null,
    "avgSat": null,
    "avgAct": null,
    "country": "United Kingdom"
  },
  {
    "name": "University of Cambridge",
    "shortName": null,
    "acceptanceRate": 0.166,
    "avgGpa": null,
    "avgSat": null,
    "avgAct": null,
    "country": "United Kingdom"
  },
  {
    "name": "University of Pennsylvania",
    "shortName": null,
    "acceptanceRate": 0.063,
    "avgGpa": 3.9,
    "avgSat": 1500,
    "avgAct": 34,
    "country": "United States"
  },
  {
    "name": "University of Edinburgh",
    "shortName": null,
    "acceptanceRate": 0.266,
    "avgGpa": null,
    "avgSat": null,
    "avgAct": null,
    "country": "United Kingdom"
  },
  {
    "name": "Swarthmore College",
    "shortName": null,
    "acceptanceRate": 0.067,
    "avgGpa": 4.05,
    "avgSat": 1485,
    "avgAct": 33,
    "country": "United States"
  },
  {
    "name": "University of London",
    "shortName": null,
    "acceptanceRate": 0.225,
    "avgGpa": null,
    "avgSat": null,
    "avgAct": null,
    "country": "United Kingdom"
  },
  {
    "name": "Brown University",
    "shortName": null,
    "acceptanceRate": 0.052,
    "avgGpa": 4.08,
    "avgSat": 1505,
    "avgAct": 34,
    "country": "United States"
  },
  {
    "name": "Purdue University",
    "shortName": null,
    "acceptanceRate": null,
    "avgGpa": null,
    "avgSat": null,
    "avgAct": null,
    "country": "United States"
  },
  {
    "name": "University of Queensland",
    "shortName": null,
    "acceptanceRate": 0.516,
    "avgGpa": null,
    "avgSat": null,
    "avgAct": null,
    "country": "Australia"
  },
  {
    "name": "University of Chicago",
    "shortName": "UChicago",
    "acceptanceRate": 0.053,
    "avgGpa": 4.48,
    "avgSat": 1535,
    "avgAct": 34,
    "country": "United States"
  },
  {
    "name": "California Institute of Technology",
    "shortName": null,
    "acceptanceRate": 0.034,
    "avgGpa": 4.19,
    "avgSat": 1560,
    "avgAct": 35,
    "country": "United States"
  },
  {
    "name": "Duke University",
    "shortName": null,
    "acceptanceRate": 0.056,
    "avgGpa": 4.13,
    "avgSat": 1530,
    "avgAct": 34,
    "country": "United States"
  },
  {
    "name": "Monash University",
    "shortName": null,
    "acceptanceRate": 0.676,
    "avgGpa": null,
    "avgSat": null,
    "avgAct": null,
    "country": "Australia"
  },
  {
    "name": "University of Toronto",
    "shortName": null,
    "acceptanceRate": 0.156,
    "avgGpa": null,
    "avgSat": null,
    "avgAct": null,
    "country": "Canada"
  },
  {
    "name": "McGill University",
    "shortName": null,
    "acceptanceRate": 0.211,
    "avgGpa": null,
    "avgSat": null,
    "avgAct": null,
    "country": "Canada"
  },
  {
    "name": "University of British Columbia (UBC)",
    "shortName": null,
    "acceptanceRate": 0.336,
    "avgGpa": null,
    "avgSat": null,
    "avgAct": null,
    "country": "Canada"
  },
  {
    "name": "McMaster University",
    "shortName": null,
    "acceptanceRate": 0.355,
    "avgGpa": null,
    "avgSat": null,
    "avgAct": null,
    "country": "Canada"
  },
  {
    "name": "University of Alberta",
    "shortName": null,
    "acceptanceRate": 0.476,
    "avgGpa": null,
    "avgSat": null,
    "avgAct": null,
    "country": "Canada"
  },
  {
    "name": "Simon Fraser University",
    "shortName": null,
    "acceptanceRate": 0.531,
    "avgGpa": null,
    "avgSat": null,
    "avgAct": null,
    "country": "Canada"
  },
  {
    "name": "National University of Singapore (NUS)",
    "shortName": null,
    "acceptanceRate": 0.054,
    "avgGpa": null,
    "avgSat": null,
    "avgAct": null,
    "country": "Singapore"
  },
  {
    "name": "University of Berlin",
    "shortName": null,
    "acceptanceRate": 0.271,
    "avgGpa": null,
    "avgSat": null,
    "avgAct": null,
    "country": "Germany"
  },
  {
    "name": "University of Bonn",
    "shortName": null,
    "acceptanceRate": 0.255,
    "avgGpa": null,
    "avgSat": null,
    "avgAct": null,
    "country": "Germany"
  },
  {
    "name": "Nanyang Technological University (NTU)",
    "shortName": null,
    "acceptanceRate": 0.083,
    "avgGpa": null,
    "avgSat": null,
    "avgAct": null,
    "country": "Singapore"
  },
  {
    "name": "Singapore Management University (SMU)",
    "shortName": null,
    "acceptanceRate": 0.156,
    "avgGpa": null,
    "avgSat": null,
    "avgAct": null,
    "country": "Singapore"
  },
  {
    "name": "Massachusetts Institute of Technology",
    "shortName": "MIT",
    "acceptanceRate": 0.033,
    "avgGpa": 4.17,
    "avgSat": 1540,
    "avgAct": 35,
    "country": "United States"
  },
  {
    "name": "Johns Hopkins University",
    "shortName": null,
    "acceptanceRate": 0.076,
    "avgGpa": 3.93,
    "avgSat": 1520,
    "avgAct": 34,
    "country": "United States"
  },
  {
    "name": "Vanderbilt University",
    "shortName": null,
    "acceptanceRate": 0.063,
    "avgGpa": 3.91,
    "avgSat": 1515,
    "avgAct": 34,
    "country": "United States"
  },
  {
    "name": "Ashoka University",
    "shortName": null,
    "acceptanceRate": 10,
    "avgGpa": null,
    "avgSat": null,
    "avgAct": null,
    "country": "India"
  },
  {
    "name": "Davidson College",
    "shortName": null,
    "acceptanceRate": null,
    "avgGpa": null,
    "avgSat": null,
    "avgAct": null,
    "country": "United States"
  },
  {
    "name": "University of Wisconsin, Madison",
    "shortName": null,
    "acceptanceRate": null,
    "avgGpa": null,
    "avgSat": null,
    "avgAct": null,
    "country": "United States"
  },
  {
    "name": "University of Illinois, Urbana Champaign",
    "shortName": null,
    "acceptanceRate": null,
    "avgGpa": null,
    "avgSat": null,
    "avgAct": null,
    "country": "United States"
  }
];

async function main() {
  console.log("🌱 Seeding colleges...");

  for (const college of TOP_COLLEGES) {
    const collegeId = college.name.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");

    await prisma.college.upsert({
      where: { name: college.name },
      update: {
        ...college,
        id: collegeId // Ensure ID is also updated to the slugified format
      },
      create: {
        id: collegeId,
        ...college,
      },
    });
  }

  console.log("✓ Synchronized " + TOP_COLLEGES.length + " colleges");
}

main().catch((e) => {
  console.error("❌ Seed error:", e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});