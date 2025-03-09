import { PrismaClient, UserType } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function seedUsers() {
  if (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_USERNAME) {
    throw new Error(
      'ADMIN_PASSWORD and ADMIN_USERNAME must be set in environment variables'
    );
  }

  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

  const user = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: process.env.ADMIN_USERNAME,
      password: hashedPassword,
      type: UserType.ADMIN,
    },
  });

  console.log('User seeded:', user.username);

  return user;
}
