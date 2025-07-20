import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Lucas Rodrigues Cunha',
    email: 'lucas@email.com',
    password: 'lFn/w29.CPi8',
    tasks: {
      create: [
        {
          title: 'Join the Prisma Discord',
          description: 'Entre no servidor oficial do Prisma no Discord para interagir com a comunidade e receber atualizações.',
          completed: true,
        },
        {
          title: 'Prisma on YouTube',
          description: 'Assista aos vídeos tutoriais e novidades sobre Prisma no canal oficial do YouTube.',
          // completed será false por padrão
        },
      ],
    },
  },
  {
    name: 'Maria Aparecida Rodrigues Cunha',
    email: 'maria@email.com',
    password: 'lFn/w29.CPi8',
    tasks: {
      create: [
        {
          title: 'Follow Prisma on Twitter',
          description: 'Siga o perfil oficial do Prisma no Twitter para receber dicas e notícias em tempo real.',
          completed: true,
        },
      ],
    },
  },
];

export async function main() {
  console.log('🌱 Seeding database...');
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
  console.log('✅ Seed completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
