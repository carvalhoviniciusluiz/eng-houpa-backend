import { PrismaClient } from '@prisma/client';
import { generateProductList, generateUserList } from './data';
const prisma = new PrismaClient();

const main = async () => {
  await prisma.user.createMany({
    data: generateUserList()
  });

  const userList = await prisma.user.findMany();

  await prisma.product.createMany({
    data: generateProductList(userList.map(user => ({ id: user.id })))
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
