import { PrismaClient, TaskStatus } from '@prisma/client';
import { faker } from '@faker-js/faker'; // gera dados aleatórios

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Limpando dados antigos...');
  await prisma.task.deleteMany();
  await prisma.user.deleteMany();

  console.log('🌱 Criando usuários fictícios...');

  // Cria 5 usuários com tarefas aleatórias
  for (let i = 0; i < 5; i++) {
    const user = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        image: faker.image.avatar(),
        tasks: {
          create: Array.from({ length: faker.number.int({ min: 2, max: 5 }) }).map(() => ({
            title: faker.lorem.sentence(),
            description: faker.lorem.paragraph(),
            status: faker.helpers.arrayElement([
              TaskStatus.PENDING,
              TaskStatus.IN_PROGRESS,
              TaskStatus.COMPLETED,
            ]),
          })),
        },
      },
    });

    console.log(`✅ Usuário criado: ${user.name}`);
  }

  console.log('✅ Seed finalizado!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
