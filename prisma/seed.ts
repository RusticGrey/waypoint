import "dotenv/config";
import { config } from "dotenv";
// config({ path: ".env.local", override: true });

import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Core Infrastructure (Org & Counselor)...');

  // 1. Seed Organization
  // Using upsert to ensure the ID 'waypoint' is maintained and values are current
  const org = await prisma.organization.upsert({
    where: { id: "waypoint" },
    update: {
      name: "Waypoint Counseling Organization",
      primaryColor: "#3B82F6", // Mapped field from primary_color
    },
    create: {
      id: "waypoint",
      name: "Waypoint Counseling Organization",
      primaryColor: "#3B82F6",
    },
  });
  console.log(`✓ Organization: ${org.name}`);

  // 2. Seed One Counselor
  const counselorPassword = await bcrypt.hash('password123', 10);
  const counselor = await prisma.User.upsert({
    where: { email: 'counselor@waypoint.edu' },
    update: {
      firstName: 'Sarah', // Mapped field from first_name
      lastName: 'Johnson', // Mapped field from last_name
      passwordHash: counselorPassword, // Mapped field from password_hash
    },
    create: {
      email: 'counselor@waypoint.edu',
      passwordHash: counselorPassword,
      firstName: 'Sarah',
      lastName: 'Johnson',
      role: UserRole.counselor,
      organizationId: "waypoint", // Mapped field from organization_id
    },
  });
  console.log(`✅ Counselor Created: ${counselor.firstName} ${counselor.lastName}`);

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