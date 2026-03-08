import { prisma } from './index';

async function main() {
  const topics = await prisma.topic.findMany({
    where: { status: 'PUBLISHED' },
    select: { id: true, slug: true, universe: true, subWorld: true, title: true },
  });
  topics.forEach(t => console.log(JSON.stringify(t)));
  await prisma.$disconnect();
}

main();
