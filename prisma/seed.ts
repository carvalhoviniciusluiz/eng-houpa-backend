import { PrismaClient } from '@prisma/client';
import { generateUserList } from './data';
const prisma = new PrismaClient();

const main = async () => {
  await prisma.user.createMany({
    data: generateUserList()
  });
};

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
