import { PrismaClient, Prisma, TaskStatus } from '@prisma/client';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Lucas Rodrigues Cunha',
    email: 'lucas@email.com',
    password: 'lFn/w29.CPi8',
    tasks: {
      create: [
        {
          title: 'Estudar documentação do Prisma',
          description: 'Revisar relações e migrations para melhorar o backend.',
          status: TaskStatus.IN_PROGRESS,
        },
        {
          title: 'Atualizar portfólio pessoal',
          description: 'Adicionar novos projetos e melhorar a seção de contatos.',
          status: TaskStatus.PENDING,
        },
        {
          title: 'Configurar ambiente Docker',
          description: 'Criar containers para Postgres e Redis em desenvolvimento.',
          status: TaskStatus.COMPLETED,
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
          title: 'Planejar cronograma de estudos',
          description: 'Organizar as próximas 4 semanas de estudos de programação.',
          status: TaskStatus.PENDING,
        },
        {
          title: 'Finalizar design do aplicativo',
          description: 'Concluir a interface do app no Figma e revisar com o time.',
          status: TaskStatus.IN_PROGRESS,
        },
      ],
    },
  },
];

export async function main() {
  console.log('🌱 Limpando dados antigos...');
  await prisma.task.deleteMany();
  await prisma.user.deleteMany();

  console.log('🌱 Inserindo novos dados...');
  for (const u of userData) {
    await prisma.user.create({ data: u });
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
