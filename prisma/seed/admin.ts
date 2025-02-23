import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function seedAdmin() {
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || "admin123", 10);
  
  const admin = await prisma.admin.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: process.env.ADMIN_USERNAME || "admin",
      password: hashedPassword,
    },

  });

  console.log('Admin seeded:', admin.username);
  
  return admin;
}
