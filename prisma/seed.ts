import "dotenv/config";
import { config } from "dotenv";
// config({ path: ".env.local", override: true });

import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Core Infrastructure (Org & Counselors)...');

  // 1. Seed Organization
  const org = await prisma.organization.upsert({
    where: { id: "engage" },
    update: {
      name: "Engage Counseling Organization",
      primaryColor: "#3B82F6",
    },
    create: {
      id: "waypoint",
      name: "Engage Counseling Organization",
      primaryColor: "#3B82F6",
    },
  });
  console.log(`✓ Organization: ${org.name}`);

  const commonPassword = await bcrypt.hash('password123', 10);

  // 2. Helper to seed counselors
  const seedCounselor = async (email: string, firstName: string, lastName: string, isAdmin: boolean) => {
    return await prisma.user.upsert({
      where: { email },
      update: {
        firstName,
        lastName,
        role: UserRole.counselor,
        isAdmin,
        passwordHash: commonPassword,
      },
      create: {
        email,
        passwordHash: commonPassword,
        firstName,
        lastName,
        role: UserRole.counselor,
        isAdmin,
        organizationId: "waypoint",
      },
    });
  };

  // Seed Counselors
  const admin = await seedCounselor('counselor@waypoint.edu', 'Sarah', 'Johnson', true);
  console.log(`✅ Admin Counselor Created: ${admin.firstName} ${admin.lastName}`);

  const c1 = await seedCounselor('indu.karthik@waypoint.edu', 'Indu', 'Karthik', false);
  console.log(`✅ Counselor Created: ${c1.firstName} ${c1.lastName}`);

  const c2 = await seedCounselor('lavanya.rajesh@waypoint.edu', 'Lavanya', 'Rajesh', false);
  console.log(`✅ Counselor Created: ${c2.firstName} ${c2.lastName}`);

  console.log('🎉 Core seeding complete.');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
