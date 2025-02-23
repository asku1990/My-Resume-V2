import { PrismaClient } from '@prisma/client';
import { seedAdmin } from './seed/admin';

const prisma = new PrismaClient();

async function main() {
  await seedAdmin();
  // Add other seed functions here as needed
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 